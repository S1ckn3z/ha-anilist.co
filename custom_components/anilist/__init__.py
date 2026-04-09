"""AniList Home Assistant Integration."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import AniListClient
from .const import CONF_ACCESS_TOKEN, DOMAIN, PLATFORMS
from .coordinator import AniListConfigEntry, AniListCoordinator

_LOGGER = logging.getLogger(__name__)

CARD_URL = "/anilist-card/anilist-card.js"
CARD_DIR = Path(__file__).parent / "www"


def _get_access_token(entry: AniListConfigEntry) -> str | None:
    """Extract the access token from either OAuth2 or legacy entry data."""
    # OAuth2 format: entry.data["token"]["access_token"]
    token_data = entry.data.get("token")
    if isinstance(token_data, dict):
        return token_data.get("access_token")
    # Legacy format: entry.data["access_token"]
    return entry.data.get(CONF_ACCESS_TOKEN)


async def _register_card(hass: HomeAssistant) -> None:
    """Register the custom Lovelace card frontend resource."""
    # Serve the built JS from within the integration directory
    hass.http.register_static_path("/anilist-card", str(CARD_DIR), cache_headers=False)

    # Auto-register as a Lovelace resource so users don't have to
    # This uses the lovelace resource storage collection
    url = CARD_URL
    resources = hass.data.get("lovelace_resources")
    if resources is not None:
        # Check if already registered
        for item in resources.async_items():
            if item.get("url") == url:
                return
        # Register as module resource
        await resources.async_create_item({"res_type": "module", "url": url})
        _LOGGER.debug("Registered AniList card as Lovelace resource: %s", url)
    else:
        _LOGGER.debug(
            "Lovelace resources not available (YAML mode?). "
            "Add '%s' as a module resource manually.",
            url,
        )


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

    # Register the frontend card (only once, even with multiple config entries)
    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {}
    if "card_registered" not in hass.data[DOMAIN]:
        await _register_card(hass)
        hass.data[DOMAIN]["card_registered"] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: AniListConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
