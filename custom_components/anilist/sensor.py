"""Sensor platform for the AniList integration."""
from __future__ import annotations

import time
from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DEFAULT_SCORE_FORMAT,
    DEFAULT_TITLE_LANGUAGE,
    DOMAIN,
    OPT_SCORE_FORMAT,
    OPT_TITLE_LANGUAGE,
)
from .coordinator import AiringEntry, AniListConfigEntry, AniListCoordinator, AniListData


# ---------------------------------------------------------------------------
# Helpers
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


def _next_airing_entry(data: AniListData) -> AiringEntry | None:
    now = time.time()
    future = [e for e in data.airing_schedule if e.airing_at > now]
    return min(future, key=lambda e: e.airing_at) if future else None


def _count_airing_today(data: AniListData) -> int:
    today = datetime.now(tz=timezone.utc).date()
    return sum(
        1
        for e in data.airing_schedule
        if datetime.fromtimestamp(e.airing_at, tz=timezone.utc).date() == today
    )


def _format_score(score: float, score_format: str) -> str | float | None:
    """Format a raw AniList meanScore (0–100 scale) to the configured display format."""
    if not score:
        return None  # unscored
    if score_format == "POINT_100":
        return round(score, 1)          # 89.1 → 89.1
    if score_format == "POINT_5":
        return round(score / 20, 1)     # 89.1 → 4.5
    if score_format == "SMILEY":
        if score >= 75:
            return "😊"
        if score >= 50:
            return "😐"
        return "😞"
    # Default: POINT_10
    return round(score / 10, 1)         # 89.1 → 8.9


# ---------------------------------------------------------------------------
# Value functions
# ---------------------------------------------------------------------------


def _next_episode_title(data: AniListData, lang: str) -> str | None:
    entry = _next_airing_entry(data)
    return _get_title(entry.media, lang) if entry else None


def _next_episode_time(data: AniListData, _lang: str) -> datetime | None:
    entry = _next_airing_entry(data)
    return (
        datetime.fromtimestamp(entry.airing_at, tz=timezone.utc) if entry else None
    )


def _watching_count(data: AniListData, _lang: str) -> int | None:
    if data.watchlist is None:
        return None
    return sum(1 for e in data.watchlist if e.status == "CURRENT")


def _manga_reading_count(data: AniListData, _lang: str) -> int | None:
    if data.manga_list is None:
        return None
    return sum(1 for e in data.manga_list if e.status == "CURRENT")


def _total_anime_watched(data: AniListData, _lang: str) -> int | None:
    return data.user_stats.anime_count if data.user_stats else None


def _total_episodes_watched(data: AniListData, _lang: str) -> int | None:
    return data.user_stats.episodes_watched if data.user_stats else None


def _total_hours_watched(data: AniListData, _lang: str) -> float | None:
    if not data.user_stats:
        return None
    return round(data.user_stats.minutes_watched / 60, 1)


def _anime_mean_score(data: AniListData, _lang: str) -> float | None:
    return data.user_stats.anime_mean_score if data.user_stats else None


def _manga_mean_score(data: AniListData, _lang: str) -> float | None:
    return data.user_stats.manga_mean_score if data.user_stats else None


def _chapters_read(data: AniListData, _lang: str) -> int | None:
    return data.user_stats.chapters_read if data.user_stats else None


def _top_genre(data: AniListData, _lang: str) -> str | None:
    if not data.user_stats or not data.user_stats.top_genres:
        return None
    return data.user_stats.top_genres[0]


# ---------------------------------------------------------------------------
# Attribute functions (for extra_state_attributes)
# ---------------------------------------------------------------------------


def _attrs_airing_schedule(data: AniListData, lang: str) -> dict[str, Any] | None:
    entries = [
        {
            "media_id": e.media_id,
            "title": _get_title(e.media, lang),
            "episode": e.episode,
            "airing_at": datetime.fromtimestamp(e.airing_at, tz=timezone.utc).isoformat(),
            "cover_image": (e.media.get("coverImage") or {}).get("medium"),
            "site_url": e.media.get("siteUrl"),
            "duration": e.media.get("duration"),
        }
        for e in data.airing_schedule
    ]
    next_entry = _next_airing_entry(data)
    return {
        "airing_schedule": entries,
        "next_airing": {
            "title": _get_title(next_entry.media, lang),
            "episode": next_entry.episode,
            "airing_at": datetime.fromtimestamp(next_entry.airing_at, tz=timezone.utc).isoformat(),
            "cover_image": (next_entry.media.get("coverImage") or {}).get("medium"),
            "site_url": next_entry.media.get("siteUrl"),
        } if next_entry else None,
    }


def _attrs_watchlist(data: AniListData, lang: str) -> dict[str, Any] | None:
    if data.watchlist is None:
        return None
    return {
        "watchlist": [
            {
                "media_id": e.media_id,
                "title": _get_title(e.media, lang),
                "status": e.status,
                "progress": e.progress,
                "episodes": e.media.get("episodes"),
                "score": e.score,
                "cover_image": (e.media.get("coverImage") or {}).get("medium"),
                "site_url": e.media.get("siteUrl"),
            }
            for e in data.watchlist
        ],
    }


def _attrs_season_anime(data: AniListData, lang: str) -> dict[str, Any] | None:
    entries = [
        {
            "id": m.get("id"),
            "title": _get_title(m, lang),
            "average_score": m.get("averageScore"),
            "episodes": m.get("episodes"),
            "format": m.get("format"),
            "genres": m.get("genres", []),
            "cover_image": (m.get("coverImage") or {}).get("medium"),
            "site_url": m.get("siteUrl"),
            "next_airing_episode": m.get("nextAiringEpisode"),
        }
        for m in (data.season_anime or [])
    ]
    return {"season_anime": entries}


def _attrs_manga_list(data: AniListData, lang: str) -> dict[str, Any] | None:
    if data.manga_list is None:
        return None
    return {
        "manga_list": [
            {
                "media_id": e.media_id,
                "title": _get_title(e.media, lang),
                "status": e.status,
                "progress": e.progress,
                "progress_volumes": e.progress_volumes,
                "chapters": e.media.get("chapters"),
                "volumes": e.media.get("volumes"),
                "score": e.score,
                "cover_image": (e.media.get("coverImage") or {}).get("medium"),
                "site_url": e.media.get("siteUrl"),
            }
            for e in data.manga_list
        ],
    }


def _attrs_top_genre(data: AniListData, _lang: str) -> dict[str, Any] | None:
    stats = data.user_stats
    if not stats:
        return None
    viewer = data.viewer or {}
    return {
        "top_genres": stats.top_genres,
        "favourite_anime": [
            {
                "title": (m.get("title") or {}).get("romaji", "Unknown"),
                "site_url": m.get("siteUrl"),
                "cover": (m.get("coverImage") or {}).get("medium"),
            }
            for m in stats.favourite_anime
        ],
        "viewer_name": viewer.get("name"),
        "viewer_avatar": (viewer.get("avatar") or {}).get("medium"),
    }


# ---------------------------------------------------------------------------
# Entity descriptions
# ---------------------------------------------------------------------------


@dataclass(kw_only=True)
class AniListSensorEntityDescription(SensorEntityDescription):
    """Extended description with a typed value extractor."""

    value_fn: Callable[[AniListData, str], Any] = lambda _data, _lang: None
    attrs_fn: Callable[[AniListData, str], dict[str, Any] | None] | None = None
    requires_auth: bool = False


SENSOR_DESCRIPTIONS: tuple[AniListSensorEntityDescription, ...] = (
    # ── Public sensors ──────────────────────────────────────────────────
    AniListSensorEntityDescription(
        key="airing_today",
        translation_key="airing_today",
        icon="mdi:television-play",
        native_unit_of_measurement="anime",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data, _lang: _count_airing_today(data),
        attrs_fn=_attrs_season_anime,
    ),
    AniListSensorEntityDescription(
        key="episodes_this_week",
        translation_key="episodes_this_week",
        icon="mdi:calendar-week",
        native_unit_of_measurement="episodes",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data, _lang: len(data.airing_schedule),
        attrs_fn=_attrs_airing_schedule,
    ),
    AniListSensorEntityDescription(
        key="next_episode_title",
        translation_key="next_episode_title",
        icon="mdi:television-shimmer",
        value_fn=_next_episode_title,
    ),
    AniListSensorEntityDescription(
        key="next_episode_time",
        translation_key="next_episode_time",
        icon="mdi:clock-start",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_next_episode_time,
    ),
    # ── Auth-only sensors ────────────────────────────────────────────────
    AniListSensorEntityDescription(
        key="watching_count",
        translation_key="watching_count",
        icon="mdi:eye",
        native_unit_of_measurement="anime",
        state_class=SensorStateClass.MEASUREMENT,
        requires_auth=True,
        value_fn=_watching_count,
        attrs_fn=_attrs_watchlist,
    ),
    AniListSensorEntityDescription(
        key="manga_reading_count",
        translation_key="manga_reading_count",
        icon="mdi:book-open-page-variant",
        native_unit_of_measurement="manga",
        state_class=SensorStateClass.MEASUREMENT,
        requires_auth=True,
        value_fn=_manga_reading_count,
        attrs_fn=_attrs_manga_list,
    ),
    AniListSensorEntityDescription(
        key="total_anime_watched",
        translation_key="total_anime_watched",
        icon="mdi:television-classic",
        native_unit_of_measurement="anime",
        state_class=SensorStateClass.TOTAL,
        requires_auth=True,
        value_fn=_total_anime_watched,
    ),
    AniListSensorEntityDescription(
        key="total_episodes_watched",
        translation_key="total_episodes_watched",
        icon="mdi:play-circle-outline",
        native_unit_of_measurement="episodes",
        state_class=SensorStateClass.TOTAL,
        requires_auth=True,
        value_fn=_total_episodes_watched,
    ),
    AniListSensorEntityDescription(
        key="total_hours_watched",
        translation_key="total_hours_watched",
        icon="mdi:clock-outline",
        native_unit_of_measurement="h",
        device_class=SensorDeviceClass.DURATION,
        state_class=SensorStateClass.TOTAL,
        requires_auth=True,
        value_fn=_total_hours_watched,
    ),
    AniListSensorEntityDescription(
        key="anime_mean_score",
        translation_key="anime_mean_score",
        icon="mdi:star-half-full",
        state_class=SensorStateClass.MEASUREMENT,
        requires_auth=True,
        value_fn=_anime_mean_score,
    ),
    AniListSensorEntityDescription(
        key="manga_mean_score",
        translation_key="manga_mean_score",
        icon="mdi:star-half-full",
        state_class=SensorStateClass.MEASUREMENT,
        requires_auth=True,
        value_fn=_manga_mean_score,
    ),
    AniListSensorEntityDescription(
        key="chapters_read",
        translation_key="chapters_read",
        icon="mdi:book-check",
        native_unit_of_measurement="chapters",
        state_class=SensorStateClass.TOTAL,
        requires_auth=True,
        value_fn=_chapters_read,
    ),
    AniListSensorEntityDescription(
        key="top_genre",
        translation_key="top_genre",
        icon="mdi:tag-multiple",
        requires_auth=True,
        value_fn=_top_genre,
        attrs_fn=_attrs_top_genre,
    ),
)


# ---------------------------------------------------------------------------
# Platform setup
# ---------------------------------------------------------------------------


async def async_setup_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up AniList sensor entities from a config entry."""
    coordinator: AniListCoordinator = entry.runtime_data
    is_authenticated = coordinator.client.is_authenticated

    async_add_entities(
        AniListSensor(coordinator, description)
        for description in SENSOR_DESCRIPTIONS
        if not description.requires_auth or is_authenticated
    )


# ---------------------------------------------------------------------------
# Sensor entity
# ---------------------------------------------------------------------------


class AniListSensor(CoordinatorEntity[AniListCoordinator], SensorEntity):
    """A sensor entity backed by the AniList coordinator."""

    entity_description: AniListSensorEntityDescription
    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: AniListCoordinator,
        description: AniListSensorEntityDescription,
    ) -> None:
        super().__init__(coordinator)
        self.entity_description = description
        self._attr_unique_id = (
            f"{coordinator.config_entry.entry_id}_{description.key}"
        )
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, coordinator.config_entry.entry_id)},
            name="AniList",
            entry_type=DeviceEntryType.SERVICE,
            manufacturer="AniList",
            configuration_url="https://anilist.co",
        )

    def _lang(self) -> str:
        return self.coordinator.config_entry.options.get(
            OPT_TITLE_LANGUAGE, DEFAULT_TITLE_LANGUAGE
        )

    def _score_format(self) -> str:
        return self.coordinator.config_entry.options.get(
            OPT_SCORE_FORMAT, DEFAULT_SCORE_FORMAT
        )

    @property
    def native_value(self) -> Any:
        value = self.entity_description.value_fn(self.coordinator.data, self._lang())
        # Format score sensors if applicable
        if self.entity_description.key in ("anime_mean_score", "manga_mean_score"):
            return _format_score(value or 0.0, self._score_format())
        return value

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        if self.entity_description.attrs_fn is None:
            return None
        return self.entity_description.attrs_fn(self.coordinator.data, self._lang())
