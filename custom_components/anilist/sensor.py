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
    DEFAULT_TITLE_LANGUAGE,
    DOMAIN,
    OPT_TITLE_LANGUAGE,
)
from .coordinator import AiringEntry, AniListConfigEntry, AniListCoordinator, AniListData


# ---------------------------------------------------------------------------
# Helpers
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


def _next_airing_entry(data: AniListData) -> AiringEntry | None:
    """Return the airing entry with the earliest future timestamp, or None."""
    now = time.time()
    future = [e for e in data.airing_schedule if e.airing_at > now]
    return min(future, key=lambda e: e.airing_at) if future else None


def _count_airing_today(data: AniListData) -> int:
    """Count episodes whose airing timestamp falls on today (UTC)."""
    today = datetime.now(tz=timezone.utc).date()
    return sum(
        1
        for e in data.airing_schedule
        if datetime.fromtimestamp(e.airing_at, tz=timezone.utc).date() == today
    )


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


# ---------------------------------------------------------------------------
# Entity descriptions
# ---------------------------------------------------------------------------


@dataclass(kw_only=True)
class AniListSensorEntityDescription(SensorEntityDescription):
    """Extended description carrying a typed value extractor."""

    # value_fn(data, title_language) → native sensor value
    value_fn: Callable[[AniListData, str], Any] = lambda _data, _lang: None
    requires_auth: bool = False


SENSOR_DESCRIPTIONS: tuple[AniListSensorEntityDescription, ...] = (
    AniListSensorEntityDescription(
        key="airing_today",
        translation_key="airing_today",
        icon="mdi:television-play",
        native_unit_of_measurement="anime",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data, _lang: _count_airing_today(data),
    ),
    AniListSensorEntityDescription(
        key="episodes_this_week",
        translation_key="episodes_this_week",
        icon="mdi:calendar-week",
        native_unit_of_measurement="episodes",
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data, _lang: len(data.airing_schedule),
    ),
    AniListSensorEntityDescription(
        key="watching_count",
        translation_key="watching_count",
        icon="mdi:eye",
        native_unit_of_measurement="anime",
        state_class=SensorStateClass.MEASUREMENT,
        requires_auth=True,
        value_fn=_watching_count,
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

    @property
    def native_value(self) -> Any:
        """Return the current sensor value."""
        lang = self.coordinator.config_entry.options.get(
            OPT_TITLE_LANGUAGE, DEFAULT_TITLE_LANGUAGE
        )
        return self.entity_description.value_fn(self.coordinator.data, lang)
