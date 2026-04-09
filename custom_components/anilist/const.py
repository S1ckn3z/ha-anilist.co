"""Constants for the AniList integration."""
from __future__ import annotations

import logging
from typing import Final

from homeassistant.const import Platform

DOMAIN: Final = "anilist"
LOGGER: Final = logging.getLogger(__name__)

# Platforms
PLATFORMS: Final[list[Platform]] = [Platform.CALENDAR, Platform.SENSOR]

# API endpoints
ANILIST_GRAPHQL_URL: Final = "https://graphql.anilist.co"
OAUTH2_AUTHORIZE_URL: Final = "https://anilist.co/api/v2/oauth/authorize"
OAUTH2_TOKEN_URL: Final = "https://anilist.co/api/v2/oauth/token"

# Config entry data keys
CONF_ACCESS_TOKEN: Final = "access_token"
CONF_USER_ID: Final = "user_id"
CONF_USER_NAME: Final = "user_name"

# Options keys
OPT_UPDATE_INTERVAL: Final = "update_interval"
OPT_TITLE_LANGUAGE: Final = "title_language"
OPT_INCLUDE_ADULT: Final = "include_adult"
OPT_WATCHLIST_STATUSES: Final = "watchlist_statuses"
OPT_SHOW_SEASON_CALENDAR: Final = "show_season_calendar"
OPT_SHOW_AIRING_CALENDAR: Final = "show_airing_calendar"

# Default option values
DEFAULT_UPDATE_INTERVAL: Final = 15  # minutes
DEFAULT_TITLE_LANGUAGE: Final = "romaji"
DEFAULT_INCLUDE_ADULT: Final = False
DEFAULT_WATCHLIST_STATUSES: Final[list[str]] = ["CURRENT", "REPEATING"]
DEFAULT_SHOW_SEASON_CALENDAR: Final = True
DEFAULT_SHOW_AIRING_CALENDAR: Final = True

# AniList season mapping (month → MediaSeason enum value)
MONTH_TO_SEASON: Final[dict[int, str]] = {
    1: "WINTER",
    2: "WINTER",
    3: "WINTER",
    4: "SPRING",
    5: "SPRING",
    6: "SPRING",
    7: "SUMMER",
    8: "SUMMER",
    9: "SUMMER",
    10: "FALL",
    11: "FALL",
    12: "FALL",
}

# Rate limit: stop sending requests when this many remain in the current window
RATE_LIMIT_BUFFER: Final = 5

# How many days ahead to fetch the airing schedule
AIRING_WINDOW_DAYS: Final = 7

# Fallback episode duration when the API doesn't provide one (minutes)
DEFAULT_EPISODE_DURATION: Final = 24
