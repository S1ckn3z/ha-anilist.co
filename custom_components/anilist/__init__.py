"""AniList Home Assistant Integration."""
from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import AniListClient
from .const import CONF_ACCESS_TOKEN, PLATFORMS
from .coordinator import AniListConfigEntry, AniListCoordinator


def _get_access_token(entry: AniListConfigEntry) -> str | None:
    """Extract the access token from either OAuth2 or legacy entry data."""
    # OAuth2 format: entry.data["token"]["access_token"]
    token_data = entry.data.get("token")
    if isinstance(token_data, dict):
        return token_data.get("access_token")
    # Legacy format: entry.data["access_token"]
    return entry.data.get(CONF_ACCESS_TOKEN)


async def async_setup_entry(hass: HomeAssistant, entry: AniListConfigEntry) -> bool:
    """Set up AniList from a config entry."""
    client = AniListClient(
        session=async_get_clientsession(hass),
        access_token=_get_access_token(entry),
    )

    coordinator = AniListCoordinator(hass, entry, client)

    # Runs _async_setup() then the first poll; raises on auth/connection failure
    await coordinator.async_config_entry_first_refresh()

    # Store the coordinator directly on the entry (modern entry.runtime_data pattern)
    entry.runtime_data = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: AniListConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
