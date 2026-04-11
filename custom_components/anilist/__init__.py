"""AniList Home Assistant Integration."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import AniListClient
from .const import CONF_ACCESS_TOKEN, DOMAIN, PLATFORMS
from .coordinator import AniListConfigEntry, AniListCoordinator
from .websocket_api import async_register_websocket_commands

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
    await hass.http.async_register_static_paths(
        [StaticPathConfig("/anilist-card", str(CARD_DIR), False)]
    )

    # Auto-register as a Lovelace resource so users don't have to.
    # The correct key is LOVELACE_DATA (since HA 2024+), which holds a
    # LovelaceData object with a .resources attribute. Older HA versions
    # used a dict at hass.data["lovelace"].
    try:
        from homeassistant.components.lovelace.const import LOVELACE_DATA
        lovelace_data = hass.data.get(LOVELACE_DATA)
    except ImportError:
        lovelace_data = hass.data.get("lovelace")

    if lovelace_data is None:
        _LOGGER.warning(
            "Lovelace not available — add '%s' as a module resource manually "
            "under Settings > Dashboards > Resources.",
            CARD_URL,
        )
        return

    # Modern HA: LovelaceData object with .resources attribute
    # Older HA: plain dict with "resources" key
    resources = getattr(lovelace_data, "resources", None)
    if resources is None and isinstance(lovelace_data, dict):
        resources = lovelace_data.get("resources")

    if resources is None:
        _LOGGER.warning(
            "Lovelace resources storage not available (YAML mode?) — "
            "add '%s' as a module resource manually.",
            CARD_URL,
        )
        return

    # Ensure the storage collection is loaded before we read from it
    if hasattr(resources, "async_load") and not getattr(resources, "loaded", True):
        try:
            await resources.async_load()
        except Exception as err:  # noqa: BLE001
            _LOGGER.debug("Could not load resource collection: %s", err)

    try:
        # Check if already registered (avoid duplicates on reload)
        for item in resources.async_items():
            if item.get("url") == CARD_URL:
                _LOGGER.debug("AniList card already registered as resource")
                return

        await resources.async_create_item(
            {"res_type": "module", "url": CARD_URL}
        )
        _LOGGER.info(
            "Registered AniList Lovelace card resource: %s (reload your browser)",
            CARD_URL,
        )
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning(
            "Could not auto-register card resource (%s) — "
            "add '%s' manually under Settings > Dashboards > Resources.",
            err,
            CARD_URL,
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

    # Register WebSocket commands and frontend card (only once)
    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {}
    if "ws_registered" not in hass.data[DOMAIN]:
        async_register_websocket_commands(hass)
        hass.data[DOMAIN]["ws_registered"] = True
    if "card_registered" not in hass.data[DOMAIN]:
        await _register_card(hass)
        hass.data[DOMAIN]["card_registered"] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: AniListConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        # Clean up domain data when the last entry is unloaded
        remaining = hass.config_entries.async_entries(DOMAIN)
        if not any(e.entry_id != entry.entry_id for e in remaining):
            hass.data.pop(DOMAIN, None)
    return unload_ok
