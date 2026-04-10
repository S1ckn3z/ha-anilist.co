"""Config flow and options flow for the AniList integration."""
from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlowResult, OptionsFlowWithReload
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.config_entry_oauth2_flow import AbstractOAuth2FlowHandler
from homeassistant.helpers.selector import (
    BooleanSelector,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from .api import AniListAuthError, AniListClient, AniListError
from .const import (
    ALL_MEDIA_FORMATS,
    CONF_USER_ID,
    CONF_USER_NAME,
    DEFAULT_AIRING_WINDOW_DAYS,
    DEFAULT_CALENDAR_REMINDER_OFFSET,
    DEFAULT_EXCLUDED_GENRES,
    DEFAULT_INCLUDE_ADULT,
    DEFAULT_MANGA_STATUSES,
    DEFAULT_MEDIA_FORMATS,
    DEFAULT_SCORE_FORMAT,
    DEFAULT_SHOW_AIRING_CALENDAR,
    DEFAULT_SHOW_SEASON_CALENDAR,
    DEFAULT_TITLE_LANGUAGE,
    DEFAULT_UPDATE_INTERVAL,
    DEFAULT_WATCHLIST_STATUSES,
    DOMAIN,
    LOGGER,
    OPT_AIRING_WINDOW_DAYS,
    OPT_CALENDAR_REMINDER_OFFSET,
    OPT_EXCLUDED_GENRES,
    OPT_INCLUDE_ADULT,
    OPT_MANGA_STATUSES,
    OPT_MEDIA_FORMATS,
    OPT_SCORE_FORMAT,
    OPT_SHOW_AIRING_CALENDAR,
    OPT_SHOW_SEASON_CALENDAR,
    OPT_TITLE_LANGUAGE,
    OPT_UPDATE_INTERVAL,
    OPT_WATCHLIST_STATUSES,
)


class AniListConfigFlow(AbstractOAuth2FlowHandler, domain=DOMAIN):
    """Handle the config flow for AniList.

    Supports two modes:
      - OAuth2: Full AniList account login via authorization code flow.
               Enables watchlist, watch-progress, and write features.
      - Public-only: No credentials required.
               Provides airing schedule and current season data only.
    """

    DOMAIN = DOMAIN
    VERSION = 1

    _reauth_entry: ConfigEntry | None = None

    @property
    def logger(self):  # type: ignore[override]
        return LOGGER

    # ------------------------------------------------------------------
    # Step: user — show menu (OAuth2 or public-only)
    # ------------------------------------------------------------------

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show the initial setup menu."""
        return self.async_show_menu(
            step_id="user",
            menu_options=["oauth", "public_only"],
        )

    # ------------------------------------------------------------------
    # Step: oauth — start the OAuth2 authorization code flow
    # ------------------------------------------------------------------

    async def async_step_oauth(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Initiate OAuth2 authorization.

        Delegates to HA's built-in implementation picker which opens the
        external browser-based authorization step.
        """
        return await self.async_step_pick_implementation(user_input)

    # ------------------------------------------------------------------
    # Step: public_only — set up without an account
    # ------------------------------------------------------------------

    async def async_step_public_only(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create a public-only config entry (no credentials)."""
        await self.async_set_unique_id("anilist_public")
        self._abort_if_unique_id_configured()

        return self.async_create_entry(
            title="AniList (Public)",
            data={},
        )

    # ------------------------------------------------------------------
    # OAuth2 callback — called after successful authorization
    # ------------------------------------------------------------------

    async def async_oauth_create_entry(
        self, data: dict[str, Any]
    ) -> ConfigFlowResult:
        """Create an entry after a successful OAuth2 authorization.

        `data` contains the full token response dict under `data["token"]`.
        We validate the token immediately via the Viewer query so that a
        wrong client-secret / scope mismatch is caught at setup time.
        """
        access_token: str = data["token"]["access_token"]

        client = AniListClient(
            session=async_get_clientsession(self.hass),
            access_token=access_token,
        )
        try:
            viewer = await client.get_viewer()
        except AniListAuthError:
            return self.async_abort(reason="invalid_auth")
        except AniListError:
            return self.async_abort(reason="cannot_connect")

        # Reauth: update existing entry in place
        if self._reauth_entry is not None:
            existing_user_id = self._reauth_entry.data.get(CONF_USER_ID)
            if existing_user_id and str(viewer["id"]) != str(existing_user_id):
                return self.async_abort(reason="account_mismatch")
            return self.async_update_reload_and_abort(
                self._reauth_entry,
                data={**self._reauth_entry.data, **data},
            )

        await self.async_set_unique_id(str(viewer["id"]))
        self._abort_if_unique_id_configured(
            updates={
                "token": data["token"],
                CONF_USER_ID: viewer["id"],
                CONF_USER_NAME: viewer["name"],
            }
        )

        return self.async_create_entry(
            title=viewer["name"],
            data={
                **data,
                CONF_USER_ID: viewer["id"],
                CONF_USER_NAME: viewer["name"],
            },
        )

    # ------------------------------------------------------------------
    # Reauth — triggered when ConfigEntryAuthFailed is raised
    # ------------------------------------------------------------------

    async def async_step_reauth(
        self, entry_data: dict[str, Any]
    ) -> ConfigFlowResult:
        """Start re-authentication after token expiry."""
        self._reauth_entry = self.hass.config_entries.async_get_entry(
            self.context["entry_id"]
        )
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show reauth confirmation and restart OAuth2."""
        if user_input is None:
            return self.async_show_form(step_id="reauth_confirm")
        return await self.async_step_pick_implementation()

    # ------------------------------------------------------------------
    # Options flow wiring
    # ------------------------------------------------------------------

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> AniListOptionsFlow:
        """Create the options flow handler."""
        return AniListOptionsFlow()


class AniListOptionsFlow(OptionsFlowWithReload):
    """Handle the options flow for AniList.

    OptionsFlowWithReload automatically reloads the integration when options
    are saved, so the coordinator is recreated with the updated settings.
    """

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage the integration options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        opts = self.config_entry.options

        schema = vol.Schema(
            {
                vol.Optional(
                    OPT_UPDATE_INTERVAL,
                    default=opts.get(OPT_UPDATE_INTERVAL, DEFAULT_UPDATE_INTERVAL),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=5,
                        max=60,
                        step=5,
                        mode=NumberSelectorMode.SLIDER,
                    )
                ),
                vol.Optional(
                    OPT_TITLE_LANGUAGE,
                    default=opts.get(OPT_TITLE_LANGUAGE, DEFAULT_TITLE_LANGUAGE),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=["romaji", "english", "native"],
                        mode=SelectSelectorMode.DROPDOWN,
                        translation_key="title_language",
                    )
                ),
                vol.Optional(
                    OPT_INCLUDE_ADULT,
                    default=opts.get(OPT_INCLUDE_ADULT, DEFAULT_INCLUDE_ADULT),
                ): BooleanSelector(),
                vol.Optional(
                    OPT_WATCHLIST_STATUSES,
                    default=opts.get(
                        OPT_WATCHLIST_STATUSES, DEFAULT_WATCHLIST_STATUSES
                    ),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=[
                            "CURRENT",
                            "PLANNING",
                            "COMPLETED",
                            "DROPPED",
                            "PAUSED",
                            "REPEATING",
                        ],
                        multiple=True,
                        mode=SelectSelectorMode.LIST,
                        translation_key="watchlist_status",
                    )
                ),
                vol.Optional(
                    OPT_SHOW_SEASON_CALENDAR,
                    default=opts.get(
                        OPT_SHOW_SEASON_CALENDAR, DEFAULT_SHOW_SEASON_CALENDAR
                    ),
                ): BooleanSelector(),
                vol.Optional(
                    OPT_SHOW_AIRING_CALENDAR,
                    default=opts.get(
                        OPT_SHOW_AIRING_CALENDAR, DEFAULT_SHOW_AIRING_CALENDAR
                    ),
                ): BooleanSelector(),
                vol.Optional(
                    OPT_AIRING_WINDOW_DAYS,
                    default=opts.get(OPT_AIRING_WINDOW_DAYS, DEFAULT_AIRING_WINDOW_DAYS),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=1,
                        max=14,
                        step=1,
                        mode=NumberSelectorMode.SLIDER,
                    )
                ),
                vol.Optional(
                    OPT_MEDIA_FORMATS,
                    default=opts.get(OPT_MEDIA_FORMATS, DEFAULT_MEDIA_FORMATS),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=ALL_MEDIA_FORMATS,
                        multiple=True,
                        mode=SelectSelectorMode.LIST,
                        translation_key="media_format",
                    )
                ),
                vol.Optional(
                    OPT_EXCLUDED_GENRES,
                    default=opts.get(OPT_EXCLUDED_GENRES, DEFAULT_EXCLUDED_GENRES),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=[],
                        custom_value=True,
                        multiple=True,
                        mode=SelectSelectorMode.LIST,
                    )
                ),
                vol.Optional(
                    OPT_SCORE_FORMAT,
                    default=opts.get(OPT_SCORE_FORMAT, DEFAULT_SCORE_FORMAT),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=["POINT_10", "POINT_100", "POINT_5", "SMILEY"],
                        mode=SelectSelectorMode.DROPDOWN,
                        translation_key="score_format",
                    )
                ),
                vol.Optional(
                    OPT_MANGA_STATUSES,
                    default=opts.get(OPT_MANGA_STATUSES, DEFAULT_MANGA_STATUSES),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=[
                            "CURRENT",
                            "PLANNING",
                            "COMPLETED",
                            "DROPPED",
                            "PAUSED",
                            "REPEATING",
                        ],
                        multiple=True,
                        mode=SelectSelectorMode.LIST,
                        translation_key="watchlist_status",
                    )
                ),
                vol.Optional(
                    OPT_CALENDAR_REMINDER_OFFSET,
                    default=opts.get(
                        OPT_CALENDAR_REMINDER_OFFSET, DEFAULT_CALENDAR_REMINDER_OFFSET
                    ),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=0,
                        max=60,
                        step=5,
                        mode=NumberSelectorMode.SLIDER,
                        unit_of_measurement="min",
                    )
                ),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema)
