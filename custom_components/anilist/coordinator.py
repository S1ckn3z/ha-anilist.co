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
    AIRING_WINDOW_DAYS,
    DEFAULT_UPDATE_INTERVAL,
    DOMAIN,
    LOGGER,
    MONTH_TO_SEASON,
    OPT_UPDATE_INTERVAL,
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
class AniListData:
    """All data collected during a single coordinator update cycle."""

    airing_schedule: list[AiringEntry] = field(default_factory=list)
    season_anime: list[dict[str, Any]] = field(default_factory=list)
    watchlist: list[WatchlistEntry] | None = None   # None when not authenticated
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


def _get_airing_window(days: int = AIRING_WINDOW_DAYS) -> tuple[int, int]:
    """Return (now_ts, future_ts) unix timestamps for the airing schedule query.

    Subtract 1 second from now so any episode airing at exactly this moment
    is included; add 1 second to the upper bound for the same reason.
    """
    now = int(time.time()) - 1
    return now, now + (days * 24 * 3600) + 1


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


# ---------------------------------------------------------------------------
# Coordinator
# ---------------------------------------------------------------------------


class AniListCoordinator(DataUpdateCoordinator[AniListData]):
    """Coordinator that manages all AniList data fetches.

    Design goals:
    - Batch all queries into as few HTTP requests as possible (1–2 per update)
    - Respect AniList rate limits via proactive throttling in AniListClient
    - Surface auth failures as ConfigEntryAuthFailed so HA triggers re-auth
    - Surface rate-limit errors as UpdateFailed(retry_after=N) so HA backs off
    """

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

    async def _async_setup(self) -> None:
        """One-time setup called before the first poll.

        Fetches the viewer's identity so the username is available for
        subsequent MediaListCollection queries without an extra API call.
        """
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

    async def _fetch_all_schedule_pages(
        self,
        first_schedule_block: dict[str, Any],
        airing_at_greater: int,
        airing_at_lesser: int,
    ) -> list[AiringEntry]:
        """Collect all airing schedule entries across all pages.

        The first page is already fetched as part of the combined/public query.
        Additional pages are fetched individually until hasNextPage is False.
        """
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

    async def _async_update_data(self) -> AniListData:
        """Fetch all required data in minimal API calls.

        Authenticated path:  1+ requests (combined watchlist + schedule + season,
                             then extra schedule pages if hasNextPage)
        Unauthenticated path: 1+ requests (schedule + season, then extra schedule pages)
        """
        season, season_year = _get_current_season_year()
        now_ts, week_ts = _get_airing_window(AIRING_WINDOW_DAYS)

        try:
            if self.client.is_authenticated and self._viewer:
                raw = await self.client.fetch_combined_data(
                    user_name=self._viewer["name"],
                    airing_at_greater=now_ts,
                    airing_at_lesser=week_ts,
                    season=season,
                    season_year=season_year,
                )
                schedule = await self._fetch_all_schedule_pages(
                    raw.get("schedule", {}), now_ts, week_ts
                )
                return AniListData(
                    airing_schedule=schedule,
                    season_anime=raw.get("seasonMedia", {}).get("media", []),
                    watchlist=_parse_watchlist(raw.get("watchlist", {})),
                    viewer=self._viewer,
                )

            raw = await self.client.fetch_public_data(
                airing_at_greater=now_ts,
                airing_at_lesser=week_ts,
                season=season,
                season_year=season_year,
            )
            schedule = await self._fetch_all_schedule_pages(
                raw.get("schedule", {}), now_ts, week_ts
            )
            return AniListData(
                airing_schedule=schedule,
                season_anime=raw.get("seasonMedia", {}).get("media", []),
                watchlist=None,
                viewer=None,
            )

        except AniListAuthError as err:
            raise ConfigEntryAuthFailed("AniList token invalid or expired") from err
        except AniListRateLimitError as err:
            raise UpdateFailed(retry_after=err.retry_after) from err
        except AniListError as err:
            raise UpdateFailed(f"AniList API error: {err}") from err
