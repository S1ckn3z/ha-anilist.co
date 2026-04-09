"""Calendar platform for the AniList integration."""
from __future__ import annotations

import datetime
import time
from typing import Any

import homeassistant.util.dt as dt_util
from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DEFAULT_EPISODE_DURATION,
    DEFAULT_TITLE_LANGUAGE,
    DEFAULT_WATCHLIST_STATUSES,
    DOMAIN,
    OPT_SHOW_AIRING_CALENDAR,
    OPT_SHOW_SEASON_CALENDAR,
    OPT_TITLE_LANGUAGE,
    OPT_WATCHLIST_STATUSES,
)
from .coordinator import AiringEntry, AniListConfigEntry, AniListCoordinator, AniListData


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------


def _get_title(media: dict[str, Any], language: str) -> str:
    """Return the anime title in the requested language with fallback chain."""
    title = media.get("title") or {}
    return (
        title.get(language)
        or title.get("romaji")
        or title.get("english")
        or title.get("native")
        or "Unknown"
    )


def _airing_entry_to_event(entry: AiringEntry, language: str) -> CalendarEvent:
    """Convert an AiringEntry to a CalendarEvent."""
    duration_min = entry.media.get("duration") or DEFAULT_EPISODE_DURATION
    start_dt = dt_util.utc_from_timestamp(entry.airing_at)
    end_dt = start_dt + datetime.timedelta(minutes=duration_min)

    title = _get_title(entry.media, language)
    total_eps = entry.media.get("episodes")
    ep_suffix = f" of {total_eps}" if total_eps else ""

    return CalendarEvent(
        uid=str(entry.id),
        summary=f"{title} — Episode {entry.episode}{ep_suffix}",
        start=start_dt,
        end=end_dt,
        description=(
            f"Episode {entry.episode}{ep_suffix}\n"
            f"{entry.media.get('siteUrl', '')}"
        ),
    )


def _get_language(entry: AniListConfigEntry) -> str:
    return entry.options.get(OPT_TITLE_LANGUAGE, DEFAULT_TITLE_LANGUAGE)


def _make_device_info(entry: AniListConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="AniList",
        entry_type=DeviceEntryType.SERVICE,
        manufacturer="AniList",
        configuration_url="https://anilist.co",
    )


# ---------------------------------------------------------------------------
# Platform setup
# ---------------------------------------------------------------------------


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up AniList calendar entities from a config entry."""
    coordinator: AniListCoordinator = entry.runtime_data
    options = entry.options
    entities: list[CalendarEntity] = []

    if options.get(OPT_SHOW_AIRING_CALENDAR, True):
        entities.append(AiringCalendarEntity(coordinator, entry))

    if options.get(OPT_SHOW_SEASON_CALENDAR, True):
        entities.append(SeasonCalendarEntity(coordinator, entry))

    if coordinator.client.is_authenticated:
        entities.append(WatchlistCalendarEntity(coordinator, entry))

    async_add_entities(entities)


# ---------------------------------------------------------------------------
# Airing Calendar — all upcoming episodes (next 7 days)
# ---------------------------------------------------------------------------


class AiringCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing every airing episode in the next 7 days."""

    _attr_has_entity_name = True
    _attr_translation_key = "airing_calendar"

    def __init__(
        self,
        coordinator: AniListCoordinator,
        entry: AniListConfigEntry,
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_airing_calendar"
        self._attr_device_info = _make_device_info(entry)

    @property
    def event(self) -> CalendarEvent | None:
        """Return the next upcoming airing episode."""
        now = time.time()
        upcoming = [
            e for e in self.coordinator.data.airing_schedule if e.airing_at > now
        ]
        if not upcoming:
            return None
        return _airing_entry_to_event(
            min(upcoming, key=lambda e: e.airing_at),
            _get_language(self._entry),
        )

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        """Return all airing events that overlap the requested date range."""
        lang = _get_language(self._entry)
        events: list[CalendarEvent] = []
        for entry in self.coordinator.data.airing_schedule:
            ev = _airing_entry_to_event(entry, lang)
            if ev.end > start_date and ev.start < end_date:
                events.append(ev)
        return events


# ---------------------------------------------------------------------------
# Season Calendar — one event per season anime (next episode)
# ---------------------------------------------------------------------------


class SeasonCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing each current-season anime's next episode time."""

    _attr_has_entity_name = True
    _attr_translation_key = "season_calendar"

    def __init__(
        self,
        coordinator: AniListCoordinator,
        entry: AniListConfigEntry,
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_season_calendar"
        self._attr_device_info = _make_device_info(entry)

    def _season_events(self, lang: str) -> list[CalendarEvent]:
        """Build CalendarEvent objects from the season anime list."""
        events: list[CalendarEvent] = []
        for anime in self.coordinator.data.season_anime:
            nae = anime.get("nextAiringEpisode")
            if not nae:
                continue
            airing_at = nae.get("airingAt")
            if not airing_at:
                continue
            duration_min = anime.get("duration") or DEFAULT_EPISODE_DURATION
            start_dt = dt_util.utc_from_timestamp(airing_at)
            end_dt = start_dt + datetime.timedelta(minutes=duration_min)
            title = _get_title(anime, lang)
            episode = nae.get("episode", "?")
            total_eps = anime.get("episodes")
            ep_suffix = f" of {total_eps}" if total_eps else ""
            events.append(
                CalendarEvent(
                    uid=f"season_{anime['id']}_{episode}",
                    summary=f"{title} — Episode {episode}{ep_suffix}",
                    start=start_dt,
                    end=end_dt,
                    description=(
                        f"Episode {episode}{ep_suffix}\n"
                        f"Score: {anime.get('averageScore', 'N/A')}\n"
                        f"{anime.get('siteUrl', '')}"
                    ),
                )
            )
        return events

    @property
    def event(self) -> CalendarEvent | None:
        """Return the nearest upcoming season anime episode."""
        now_dt = dt_util.utcnow()
        upcoming = [
            e for e in self._season_events(_get_language(self._entry))
            if e.start >= now_dt
        ]
        return min(upcoming, key=lambda e: e.start) if upcoming else None

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        """Return season anime events that overlap the requested date range."""
        return [
            e
            for e in self._season_events(_get_language(self._entry))
            if e.end > start_date and e.start < end_date
        ]


# ---------------------------------------------------------------------------
# Watchlist Calendar — filtered to the user's own list
# ---------------------------------------------------------------------------


class WatchlistCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing airing episodes filtered to the user's watchlist."""

    _attr_has_entity_name = True
    _attr_translation_key = "watchlist_calendar"

    def __init__(
        self,
        coordinator: AniListCoordinator,
        entry: AniListConfigEntry,
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_watchlist_calendar"
        self._attr_device_info = _make_device_info(entry)

    def _allowed_statuses(self) -> set[str]:
        statuses = self._entry.options.get(
            OPT_WATCHLIST_STATUSES, DEFAULT_WATCHLIST_STATUSES
        )
        return set(statuses)

    def _watchlist_media_ids(self) -> set[int]:
        """Return media IDs whose watchlist status is in the allowed set."""
        data: AniListData = self.coordinator.data
        if not data.watchlist:
            return set()
        allowed = self._allowed_statuses()
        return {e.media_id for e in data.watchlist if e.status in allowed}

    def _watchlist_events(self, lang: str) -> list[CalendarEvent]:
        """Build CalendarEvents from airing entries that are on the watchlist."""
        allowed_ids = self._watchlist_media_ids()
        events: list[CalendarEvent] = []
        for entry in self.coordinator.data.airing_schedule:
            if entry.media_id not in allowed_ids:
                continue
            events.append(_airing_entry_to_event(entry, lang))
        return events

    @property
    def event(self) -> CalendarEvent | None:
        """Return the next upcoming watchlist episode."""
        now = time.time()
        lang = _get_language(self._entry)
        upcoming = [
            e
            for e in self.coordinator.data.airing_schedule
            if e.airing_at > now and e.media_id in self._watchlist_media_ids()
        ]
        if not upcoming:
            return None
        return _airing_entry_to_event(
            min(upcoming, key=lambda e: e.airing_at), lang
        )

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        """Return watchlist airing events that overlap the requested date range."""
        lang = _get_language(self._entry)
        return [
            e
            for e in self._watchlist_events(lang)
            if e.end > start_date and e.start < end_date
        ]
