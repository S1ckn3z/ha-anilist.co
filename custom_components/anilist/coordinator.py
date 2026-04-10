"""DataUpdateCoordinator for the AniList integration."""
from __future__ import annotations

import time
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import AniListAuthError, AniListClient, AniListError, AniListRateLimitError
from .const import (
    DEFAULT_AIRING_WINDOW_DAYS,
    DEFAULT_EXCLUDED_GENRES,
    DEFAULT_INCLUDE_ADULT,
    DEFAULT_MEDIA_FORMATS,
    DEFAULT_UPDATE_INTERVAL,
    DOMAIN,
    EVENT_EPISODE_AIRING,
    LOGGER,
    MONTH_TO_SEASON,
    OPT_AIRING_WINDOW_DAYS,
    OPT_EXCLUDED_GENRES,
    OPT_INCLUDE_ADULT,
    OPT_MEDIA_FORMATS,
    OPT_UPDATE_INTERVAL,
    SEASON_ORDER,
)


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------


@dataclass
class AiringEntry:
    """A single episode airing event from AniList's AiringSchedule."""

    id: int
    airing_at: int        # Unix timestamp (seconds)
    time_until_airing: int
    episode: int
    media_id: int
    media: dict[str, Any]


@dataclass
class WatchlistEntry:
    """A single entry from the authenticated user's anime list."""

    id: int
    media_id: int
    status: str           # CURRENT, PLANNING, COMPLETED, DROPPED, PAUSED, REPEATING
    score: float
    progress: int
    notes: str | None
    updated_at: int
    media: dict[str, Any]


@dataclass
class MangaEntry:
    """A single entry from the authenticated user's manga list."""

    id: int
    media_id: int
    status: str
    score: float
    progress: int          # chapters read
    progress_volumes: int  # volumes read
    notes: str | None
    updated_at: int
    media: dict[str, Any]


@dataclass
class UserStats:
    """Aggregated statistics from the user's AniList profile."""

    anime_count: int
    episodes_watched: int
    minutes_watched: int
    anime_mean_score: float
    top_genres: list[str]           # top genre names (by watch count) — legacy compat
    genre_stats: list[dict[str, Any]]  # full [{genre, count}, ...] from API
    manga_count: int
    chapters_read: int
    volumes_read: int
    manga_mean_score: float
    favourite_anime: list[dict[str, Any]]


@dataclass
class AniListData:
    """All data collected during a single coordinator update cycle."""

    airing_schedule: list[AiringEntry] = field(default_factory=list)
    season_anime: list[dict[str, Any]] = field(default_factory=list)
    next_season_anime: list[dict[str, Any]] = field(default_factory=list)
    watchlist: list[WatchlistEntry] | None = None   # None when not authenticated
    manga_list: list[MangaEntry] | None = None      # None when not authenticated
    user_stats: UserStats | None = None             # None when not authenticated
    viewer: dict[str, Any] | None = None            # None when not authenticated


# Typed config entry — modern HA 2024+ pattern
type AniListConfigEntry = ConfigEntry[AniListCoordinator]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _get_current_season_year() -> tuple[str, int]:
    """Return the current AniList MediaSeason and calendar year (UTC)."""
    now = datetime.now(tz=timezone.utc)
    return MONTH_TO_SEASON[now.month], now.year


def _get_next_season_year() -> tuple[str, int]:
    """Return the next AniList MediaSeason and year (UTC)."""
    now = datetime.now(tz=timezone.utc)
    current = MONTH_TO_SEASON[now.month]
    current_idx = SEASON_ORDER.index(current)
    next_idx = (current_idx + 1) % 4
    year = now.year + 1 if next_idx == 0 else now.year
    return SEASON_ORDER[next_idx], year


def _get_airing_window(days: int = DEFAULT_AIRING_WINDOW_DAYS) -> tuple[int, int]:
    """Return (now_ts, future_ts) unix timestamps for the airing schedule query."""
    now = int(time.time()) - 1
    return now, now + (days * 24 * 3600) + 1


def _get_title(media: dict[str, Any]) -> str:
    """Return a title with romaji → english → native fallback."""
    title = media.get("title") or {}
    return (
        title.get("romaji")
        or title.get("english")
        or title.get("native")
        or "Unknown"
    )


def _parse_airing_schedule(schedule_block: dict[str, Any]) -> list[AiringEntry]:
    """Parse the Page>airingSchedules block from an API response."""
    entries: list[AiringEntry] = []
    for item in schedule_block.get("airingSchedules", []):
        if not item.get("media"):
            continue
        entries.append(
            AiringEntry(
                id=item["id"],
                airing_at=item["airingAt"],
                time_until_airing=item.get("timeUntilAiring", 0),
                episode=item["episode"],
                media_id=item["mediaId"],
                media=item["media"],
            )
        )
    return entries


def _parse_watchlist(watchlist_block: dict[str, Any]) -> list[WatchlistEntry]:
    """Flatten all lists from a MediaListCollection response block."""
    entries: list[WatchlistEntry] = []
    for lst in watchlist_block.get("lists", []):
        for entry in lst.get("entries", []):
            if not entry.get("media"):
                continue
            entries.append(
                WatchlistEntry(
                    id=entry["id"],
                    media_id=entry["mediaId"],
                    status=entry.get("status", "CURRENT"),
                    score=entry.get("score", 0.0),
                    progress=entry.get("progress", 0),
                    notes=entry.get("notes"),
                    updated_at=entry.get("updatedAt", 0),
                    media=entry["media"],
                )
            )
    return entries


def _parse_manga_list(manga_block: dict[str, Any]) -> list[MangaEntry]:
    """Flatten all lists from a manga MediaListCollection response block."""
    entries: list[MangaEntry] = []
    for lst in manga_block.get("lists", []):
        for entry in lst.get("entries", []):
            if not entry.get("media"):
                continue
            entries.append(
                MangaEntry(
                    id=entry["id"],
                    media_id=entry["mediaId"],
                    status=entry.get("status", "CURRENT"),
                    score=entry.get("score", 0.0),
                    progress=entry.get("progress", 0),
                    progress_volumes=entry.get("progressVolumes", 0),
                    notes=entry.get("notes"),
                    updated_at=entry.get("updatedAt", 0),
                    media=entry["media"],
                )
            )
    return entries


def _parse_user_stats(user_block: dict[str, Any]) -> UserStats:
    """Parse the User statistics and favourites block."""
    stats = user_block.get("statistics", {})
    anime_stats = stats.get("anime", {})
    manga_stats = stats.get("manga", {})
    favs = user_block.get("favourites", {})

    genre_stats_raw = [
        {"genre": g["genre"], "count": g.get("count", 0)}
        for g in anime_stats.get("genres", [])
        if g.get("genre")
    ]
    top_genres = [g["genre"] for g in genre_stats_raw][:5]

    return UserStats(
        anime_count=anime_stats.get("count", 0),
        episodes_watched=anime_stats.get("episodesWatched", 0),
        minutes_watched=anime_stats.get("minutesWatched", 0),
        anime_mean_score=anime_stats.get("meanScore", 0.0),
        top_genres=top_genres,
        genre_stats=genre_stats_raw,
        manga_count=manga_stats.get("count", 0),
        chapters_read=manga_stats.get("chaptersRead", 0),
        volumes_read=manga_stats.get("volumesRead", 0),
        manga_mean_score=manga_stats.get("meanScore", 0.0),
        favourite_anime=favs.get("anime", {}).get("nodes", []),
    )


# ---------------------------------------------------------------------------
# Coordinator
# ---------------------------------------------------------------------------


class AniListCoordinator(DataUpdateCoordinator[AniListData]):
    """Coordinator that manages all AniList data fetches."""

    config_entry: AniListConfigEntry

    def __init__(
        self,
        hass: HomeAssistant,
        entry: AniListConfigEntry,
        client: AniListClient,
    ) -> None:
        super().__init__(
            hass,
            LOGGER,
            name=DOMAIN,
            config_entry=entry,
            update_interval=timedelta(
                minutes=entry.options.get(OPT_UPDATE_INTERVAL, DEFAULT_UPDATE_INTERVAL)
            ),
        )
        self.client = client
        self._viewer: dict[str, Any] | None = None
        # Tracks IDs of airing entries for which we have already fired an event
        self._fired_airing_ids: set[int] = set()

    async def _async_setup(self) -> None:
        """One-time setup: fetch the viewer's identity."""
        if not self.client.is_authenticated:
            return
        try:
            self._viewer = await self.client.get_viewer()
            LOGGER.debug(
                "AniList authenticated as '%s' (id=%s)",
                self._viewer.get("name"),
                self._viewer.get("id"),
            )
        except AniListAuthError as err:
            raise ConfigEntryAuthFailed("AniList token is invalid or revoked") from err

    # ------------------------------------------------------------------
    # Schedule pagination
    # ------------------------------------------------------------------

    async def _fetch_all_schedule_pages(
        self,
        first_schedule_block: dict[str, Any],
        airing_at_greater: int,
        airing_at_lesser: int,
    ) -> list[AiringEntry]:
        """Collect all airing schedule entries across all pages."""
        entries = _parse_airing_schedule(first_schedule_block)
        page_info = first_schedule_block.get("pageInfo", {})
        page = 2

        while page_info.get("hasNextPage"):
            LOGGER.debug("Fetching airing schedule page %d", page)
            raw = await self.client.fetch_schedule_page(
                airing_at_greater=airing_at_greater,
                airing_at_lesser=airing_at_lesser,
                page=page,
            )
            schedule_block = raw.get("schedule", {})
            entries.extend(_parse_airing_schedule(schedule_block))
            page_info = schedule_block.get("pageInfo", {})
            page += 1

        return entries

    # ------------------------------------------------------------------
    # Airing events (polling-based)
    # ------------------------------------------------------------------

    def _fire_new_airing_events(self, data: AniListData) -> None:
        """Fire HA events for episodes that have aired since the last update."""
        now = time.time()
        for entry in data.airing_schedule:
            if entry.airing_at > now:
                continue  # Not yet aired
            if entry.id in self._fired_airing_ids:
                continue  # Already fired in a previous update cycle
            self._fired_airing_ids.add(entry.id)
            self.hass.bus.async_fire(
                EVENT_EPISODE_AIRING,
                {
                    "media_id": entry.media_id,
                    "title": _get_title(entry.media),
                    "episode": entry.episode,
                    "aired_at": datetime.fromtimestamp(
                        entry.airing_at, tz=timezone.utc
                    ).isoformat(),
                    "cover_image": (entry.media.get("coverImage") or {}).get("medium"),
                    "site_url": entry.media.get("siteUrl"),
                },
            )

    # ------------------------------------------------------------------
    # Filtering helpers
    # ------------------------------------------------------------------

    def _apply_filters(
        self,
        schedule: list[AiringEntry],
        season_anime: list[dict[str, Any]],
        next_season_anime: list[dict[str, Any]],
    ) -> tuple[list[AiringEntry], list[dict[str, Any]], list[dict[str, Any]]]:
        """Apply format and genre filters from options."""
        opts = self.config_entry.options
        allowed_formats: list[str] = opts.get(OPT_MEDIA_FORMATS, DEFAULT_MEDIA_FORMATS)
        excluded_genres: list[str] = opts.get(OPT_EXCLUDED_GENRES, DEFAULT_EXCLUDED_GENRES)

        if allowed_formats:
            schedule = [
                e for e in schedule
                if e.media.get("format") in allowed_formats
            ]

        if excluded_genres:
            excluded = set(excluded_genres)
            season_anime = [
                a for a in season_anime
                if not excluded.intersection(a.get("genres") or [])
            ]
            next_season_anime = [
                a for a in next_season_anime
                if not excluded.intersection(a.get("genres") or [])
            ]

        return schedule, season_anime, next_season_anime

    # ------------------------------------------------------------------
    # Main update
    # ------------------------------------------------------------------

    async def _async_update_data(self) -> AniListData:
        """Fetch all required data in minimal API calls."""
        opts = self.config_entry.options
        season, season_year = _get_current_season_year()
        next_season, next_season_year = _get_next_season_year()
        window_days = opts.get(OPT_AIRING_WINDOW_DAYS, DEFAULT_AIRING_WINDOW_DAYS)
        include_adult = opts.get(OPT_INCLUDE_ADULT, DEFAULT_INCLUDE_ADULT)
        now_ts, end_ts = _get_airing_window(window_days)

        try:
            if self.client.is_authenticated and self._viewer:
                # ── Request 1: watchlist + schedule (p.1) + both seasons ──
                raw = await self.client.fetch_combined_data(
                    user_name=self._viewer["name"],
                    airing_at_greater=now_ts,
                    airing_at_lesser=end_ts,
                    season=season,
                    season_year=season_year,
                    next_season=next_season,
                    next_season_year=next_season_year,
                    include_adult=include_adult,
                )
                # ── Request 2: user stats + favourites + manga list ──
                stats_raw = await self.client.fetch_user_stats_and_manga(
                    user_name=self._viewer["name"]
                )

                schedule = await self._fetch_all_schedule_pages(
                    raw.get("schedule", {}), now_ts, end_ts
                )
                season_anime = raw.get("seasonMedia", {}).get("media", [])
                next_season_anime = raw.get("nextSeasonMedia", {}).get("media", [])
                schedule, season_anime, next_season_anime = self._apply_filters(
                    schedule, season_anime, next_season_anime
                )

                user_node = stats_raw.get("Viewer") or {}
                manga_block = stats_raw.get("mangaList") or {}

                data = AniListData(
                    airing_schedule=schedule,
                    season_anime=season_anime,
                    next_season_anime=next_season_anime,
                    watchlist=_parse_watchlist(raw.get("watchlist", {})),
                    manga_list=_parse_manga_list(manga_block),
                    user_stats=_parse_user_stats(user_node) if user_node else None,
                    viewer=self._viewer,
                )
                self._fire_new_airing_events(data)
                return data

            # ── Unauthenticated path ──
            raw = await self.client.fetch_public_data(
                airing_at_greater=now_ts,
                airing_at_lesser=end_ts,
                season=season,
                season_year=season_year,
                next_season=next_season,
                next_season_year=next_season_year,
                include_adult=include_adult,
            )
            schedule = await self._fetch_all_schedule_pages(
                raw.get("schedule", {}), now_ts, end_ts
            )
            season_anime = raw.get("seasonMedia", {}).get("media", [])
            next_season_anime = raw.get("nextSeasonMedia", {}).get("media", [])
            schedule, season_anime, next_season_anime = self._apply_filters(
                schedule, season_anime, next_season_anime
            )

            data = AniListData(
                airing_schedule=schedule,
                season_anime=season_anime,
                next_season_anime=next_season_anime,
            )
            self._fire_new_airing_events(data)
            return data

        except AniListAuthError as err:
            raise ConfigEntryAuthFailed("AniList token invalid or expired") from err
        except AniListRateLimitError as err:
            raise UpdateFailed(retry_after=err.retry_after) from err
        except AniListError as err:
            raise UpdateFailed(f"AniList API error: {err}") from err
