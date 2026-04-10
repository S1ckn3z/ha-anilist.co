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
    DEFAULT_CALENDAR_REMINDER_OFFSET,
    DEFAULT_EPISODE_DURATION,
    DEFAULT_MANGA_STATUSES,
    DEFAULT_TITLE_LANGUAGE,
    DEFAULT_WATCHLIST_STATUSES,
    DOMAIN,
    OPT_CALENDAR_REMINDER_OFFSET,
    OPT_MANGA_STATUSES,
    OPT_SHOW_AIRING_CALENDAR,
    OPT_SHOW_SEASON_CALENDAR,
    OPT_TITLE_LANGUAGE,
    OPT_WATCHLIST_STATUSES,
)
from .coordinator import (
    AiringEntry,
    AniListConfigEntry,
    AniListCoordinator,
    AniListData,
    MangaEntry,
)

# Try to import CalendarAlarm (available since HA 2024.3)
try:
    from homeassistant.components.calendar import CalendarAlarm
    _HAS_ALARM = True
except ImportError:
    _HAS_ALARM = False


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------


def _get_title(media: dict[str, Any], language: str) -> str:
    title = media.get("title") or {}
    return (
        title.get(language)
        or title.get("romaji")
        or title.get("english")
        or title.get("native")
        or "Unknown"
    )


def _get_language(entry: AniListConfigEntry) -> str:
    return entry.options.get(OPT_TITLE_LANGUAGE, DEFAULT_TITLE_LANGUAGE)


def _get_reminder_offset(entry: AniListConfigEntry) -> int:
    return entry.options.get(OPT_CALENDAR_REMINDER_OFFSET, DEFAULT_CALENDAR_REMINDER_OFFSET)


def _make_device_info(entry: AniListConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="AniList",
        entry_type=DeviceEntryType.SERVICE,
        manufacturer="AniList",
        configuration_url="https://anilist.co",
    )


def _build_alarm(offset_minutes: int) -> list | None:
    """Build a CalendarAlarm list if alarm support is available and offset > 0."""
    if not _HAS_ALARM or offset_minutes <= 0:
        return None
    return [CalendarAlarm(trigger=datetime.timedelta(minutes=-offset_minutes))]


def _airing_entry_to_event(
    entry: AiringEntry,
    language: str,
    reminder_offset: int = 0,
) -> CalendarEvent:
    """Convert an AiringEntry to a CalendarEvent."""
    duration_min = entry.media.get("duration") or DEFAULT_EPISODE_DURATION
    start_dt = dt_util.utc_from_timestamp(entry.airing_at)
    end_dt = start_dt + datetime.timedelta(minutes=duration_min)
    title = _get_title(entry.media, language)
    total_eps = entry.media.get("episodes")
    ep_suffix = f" of {total_eps}" if total_eps else ""

    kwargs: dict[str, Any] = {
        "uid": str(entry.id),
        "summary": f"{title} — Episode {entry.episode}{ep_suffix}",
        "start": start_dt,
        "end": end_dt,
        "description": (
            f"Episode {entry.episode}{ep_suffix}\n"
            f"{entry.media.get('siteUrl', '')}"
        ),
    }
    alarm = _build_alarm(reminder_offset)
    if alarm is not None:
        kwargs["alarm"] = alarm

    return CalendarEvent(**kwargs)


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
        entities.append(MangaCalendarEntity(coordinator, entry))

    async_add_entities(entities)


# ---------------------------------------------------------------------------
# Airing Calendar — all upcoming episodes in the configured window
# ---------------------------------------------------------------------------


class AiringCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing every airing episode in the configured airing window."""

    _attr_has_entity_name = True
    _attr_translation_key = "airing_calendar"

    def __init__(self, coordinator: AniListCoordinator, entry: AniListConfigEntry) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_airing_calendar"
        self._attr_device_info = _make_device_info(entry)

    @property
    def event(self) -> CalendarEvent | None:
        now = time.time()
        upcoming = [e for e in self.coordinator.data.airing_schedule if e.airing_at > now]
        if not upcoming:
            return None
        return _airing_entry_to_event(
            min(upcoming, key=lambda e: e.airing_at),
            _get_language(self._entry),
            _get_reminder_offset(self._entry),
        )

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        lang = _get_language(self._entry)
        offset = _get_reminder_offset(self._entry)
        return [
            _airing_entry_to_event(e, lang, offset)
            for e in self.coordinator.data.airing_schedule
            if dt_util.utc_from_timestamp(e.airing_at) + datetime.timedelta(
                minutes=e.media.get("duration") or DEFAULT_EPISODE_DURATION
            ) > start_date
            and dt_util.utc_from_timestamp(e.airing_at) < end_date
        ]


# ---------------------------------------------------------------------------
# Season Calendar — current + next season
# ---------------------------------------------------------------------------


class SeasonCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing current and next season anime next episode times."""

    _attr_has_entity_name = True
    _attr_translation_key = "season_calendar"

    def __init__(self, coordinator: AniListCoordinator, entry: AniListConfigEntry) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_season_calendar"
        self._attr_device_info = _make_device_info(entry)

    def _build_events_from_list(
        self,
        anime_list: list[dict[str, Any]],
        lang: str,
        label: str,
        offset: int = 0,
    ) -> list[CalendarEvent]:
        events: list[CalendarEvent] = []
        for anime in anime_list:
            nae = anime.get("nextAiringEpisode")
            if not nae or not nae.get("airingAt"):
                continue
            duration_min = anime.get("duration") or DEFAULT_EPISODE_DURATION
            start_dt = dt_util.utc_from_timestamp(nae["airingAt"])
            end_dt = start_dt + datetime.timedelta(minutes=duration_min)
            title = _get_title(anime, lang)
            episode = nae.get("episode", "?")
            total_eps = anime.get("episodes")
            ep_suffix = f" of {total_eps}" if total_eps else ""

            kwargs: dict[str, Any] = {
                "uid": f"{label}_{anime['id']}_{episode}",
                "summary": f"{title} — Episode {episode}{ep_suffix}",
                "start": start_dt,
                "end": end_dt,
                "description": (
                    f"[{label}] Episode {episode}{ep_suffix}\n"
                    f"Score: {anime.get('averageScore', 'N/A')}\n"
                    f"{anime.get('siteUrl', '')}"
                ),
            }
            alarm = _build_alarm(offset)
            if alarm is not None:
                kwargs["alarm"] = alarm
            events.append(CalendarEvent(**kwargs))
        return events

    def _all_season_events(self, lang: str, offset: int) -> list[CalendarEvent]:
        data = self.coordinator.data
        events = self._build_events_from_list(
            data.season_anime, lang, "Current Season", offset
        )
        events += self._build_events_from_list(
            data.next_season_anime, lang, "Next Season", offset
        )
        return events

    @property
    def event(self) -> CalendarEvent | None:
        now_dt = dt_util.utcnow()
        lang = _get_language(self._entry)
        offset = _get_reminder_offset(self._entry)
        upcoming = [e for e in self._all_season_events(lang, offset) if e.start >= now_dt]
        return min(upcoming, key=lambda e: e.start) if upcoming else None

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        lang = _get_language(self._entry)
        offset = _get_reminder_offset(self._entry)
        return [
            e for e in self._all_season_events(lang, offset)
            if e.end > start_date and e.start < end_date
        ]


# ---------------------------------------------------------------------------
# Watchlist Calendar — filtered to the user's own anime list
# ---------------------------------------------------------------------------


class WatchlistCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing airing episodes filtered to the user's watchlist."""

    _attr_has_entity_name = True
    _attr_translation_key = "watchlist_calendar"

    def __init__(self, coordinator: AniListCoordinator, entry: AniListConfigEntry) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_watchlist_calendar"
        self._attr_device_info = _make_device_info(entry)

    def _allowed_media_ids(self) -> set[int]:
        data: AniListData = self.coordinator.data
        if not data.watchlist:
            return set()
        allowed = set(
            self._entry.options.get(OPT_WATCHLIST_STATUSES, DEFAULT_WATCHLIST_STATUSES)
        )
        return {e.media_id for e in data.watchlist if e.status in allowed}

    @property
    def event(self) -> CalendarEvent | None:
        now = time.time()
        lang = _get_language(self._entry)
        offset = _get_reminder_offset(self._entry)
        allowed = self._allowed_media_ids()
        upcoming = [
            e for e in self.coordinator.data.airing_schedule
            if e.airing_at > now and e.media_id in allowed
        ]
        if not upcoming:
            return None
        return _airing_entry_to_event(
            min(upcoming, key=lambda e: e.airing_at), lang, offset
        )

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        lang = _get_language(self._entry)
        offset = _get_reminder_offset(self._entry)
        allowed = self._allowed_media_ids()
        return [
            _airing_entry_to_event(e, lang, offset)
            for e in self.coordinator.data.airing_schedule
            if e.media_id in allowed
            and dt_util.utc_from_timestamp(e.airing_at) < end_date
            and dt_util.utc_from_timestamp(e.airing_at) + datetime.timedelta(
                minutes=e.media.get("duration") or DEFAULT_EPISODE_DURATION
            ) > start_date
        ]


# ---------------------------------------------------------------------------
# Manga Calendar — user's manga reading list
# ---------------------------------------------------------------------------


class MangaCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity):
    """Calendar showing manga entries the user has recently read or is reading."""

    _attr_has_entity_name = True
    _attr_translation_key = "manga_calendar"

    def __init__(self, coordinator: AniListCoordinator, entry: AniListConfigEntry) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_manga_calendar"
        self._attr_device_info = _make_device_info(entry)

    def _allowed_statuses(self) -> set[str]:
        return set(
            self._entry.options.get(OPT_MANGA_STATUSES, DEFAULT_MANGA_STATUSES)
        )

    def _manga_events(self, lang: str) -> list[CalendarEvent]:
        data = self.coordinator.data
        if not data.manga_list:
            return []
        allowed = self._allowed_statuses()
        events: list[CalendarEvent] = []
        for entry in data.manga_list:
            if entry.status not in allowed:
                continue
            if not entry.updated_at:
                continue
            # Show as all-day event on the last-updated date
            updated_date = dt_util.as_local(dt_util.utc_from_timestamp(entry.updated_at)).date()
            title = _get_title(entry.media, lang)
            total_ch = entry.media.get("chapters")
            ch_suffix = f" of {total_ch}" if total_ch else ""
            total_vol = entry.media.get("volumes")
            vol_suffix = f" of {total_vol}" if total_vol else ""
            events.append(
                CalendarEvent(
                    uid=f"manga_{entry.id}_{entry.updated_at}",
                    summary=f"{title} — Ch. {entry.progress}{ch_suffix}",
                    start=updated_date,
                    end=updated_date + datetime.timedelta(days=1),
                    description=(
                        f"Chapters: {entry.progress}{ch_suffix}\n"
                        f"Volumes: {entry.progress_volumes}{vol_suffix}\n"
                        f"Status: {entry.status}\n"
                        f"{entry.media.get('siteUrl', '')}"
                    ),
                )
            )
        return events

    @property
    def event(self) -> CalendarEvent | None:
        lang = _get_language(self._entry)
        events = self._manga_events(lang)
        if not events:
            return None
        today = dt_util.as_local(dt_util.utcnow()).date()
        # Return the most recently updated entry
        past = [e for e in events if isinstance(e.start, datetime.date) and e.start <= today]
        return max(past, key=lambda e: e.start) if past else None

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime.datetime,
        end_date: datetime.datetime,
    ) -> list[CalendarEvent]:
        lang = _get_language(self._entry)
        start_d = start_date.date() if isinstance(start_date, datetime.datetime) else start_date
        end_d = end_date.date() if isinstance(end_date, datetime.datetime) else end_date
        return [
            e for e in self._manga_events(lang)
            if isinstance(e.start, datetime.date)
            and e.start < end_d
            and (e.end if isinstance(e.end, datetime.date) else e.end.date()) > start_d
        ]
