"""Shared test fixtures for the AniList integration tests."""
from __future__ import annotations

import sys
import time
from types import ModuleType, SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

# ---------------------------------------------------------------------------
# Stub out homeassistant and voluptuous imports before importing our code.
# This lets us unit-test pure logic without a real HA installation.
# ---------------------------------------------------------------------------

def _make_stub_module(name: str, **attrs) -> ModuleType:
    mod = ModuleType(name)
    for k, v in attrs.items():
        setattr(mod, k, v)
    return mod


# Minimal stubs for homeassistant modules used by the integration
_STUBS: dict[str, ModuleType] = {}


def _make_sensor_entity_description():
    """Create a SensorEntityDescription stub that works as a dataclass base."""
    from dataclasses import dataclass, field

    @dataclass(kw_only=True)
    class SensorEntityDescription:
        key: str = ""
        translation_key: str | None = None
        icon: str | None = None
        native_unit_of_measurement: str | None = None
        device_class: str | None = None
        state_class: str | None = None

    return SensorEntityDescription


def _ensure_ha_stubs() -> None:
    """Install minimal HA stubs into sys.modules if HA is not installed."""
    try:
        import homeassistant  # noqa: F401
        return  # HA is available; nothing to stub
    except ImportError:
        pass

    if "homeassistant" in _STUBS:
        return  # already stubbed

    # -- homeassistant package --
    ha = _make_stub_module("homeassistant")
    _STUBS["homeassistant"] = ha
    sys.modules["homeassistant"] = ha

    # homeassistant.const
    class Platform:
        CALENDAR = "calendar"
        SENSOR = "sensor"
    ha_const = _make_stub_module("homeassistant.const", Platform=Platform)
    sys.modules["homeassistant.const"] = ha_const

    # homeassistant.core
    ha_core = _make_stub_module("homeassistant.core", HomeAssistant=MagicMock, callback=lambda fn: fn)
    sys.modules["homeassistant.core"] = ha_core

    # homeassistant.exceptions
    class ConfigEntryAuthFailed(Exception):
        pass
    ha_exc = _make_stub_module("homeassistant.exceptions", ConfigEntryAuthFailed=ConfigEntryAuthFailed)
    sys.modules["homeassistant.exceptions"] = ha_exc

    # homeassistant.config_entries
    ha_ce = _make_stub_module(
        "homeassistant.config_entries",
        ConfigEntry=MagicMock,
        ConfigFlowResult=dict,
        OptionsFlowWithReload=type("OptionsFlowWithReload", (), {
            "async_show_form": lambda self, **kw: {"type": "form", **kw},
            "async_create_entry": lambda self, **kw: {"type": "create_entry", **kw},
        }),
    )
    sys.modules["homeassistant.config_entries"] = ha_ce

    # homeassistant.helpers
    ha_helpers = _make_stub_module("homeassistant.helpers")
    sys.modules["homeassistant.helpers"] = ha_helpers

    # homeassistant.helpers.update_coordinator
    class DataUpdateCoordinator:
        def __init__(self, *args, **kwargs):
            pass
        def __class_getitem__(cls, item):
            return cls
    ha_uc = _make_stub_module(
        "homeassistant.helpers.update_coordinator",
        DataUpdateCoordinator=DataUpdateCoordinator,
        UpdateFailed=type("UpdateFailed", (Exception,), {}),
    )
    sys.modules["homeassistant.helpers.update_coordinator"] = ha_uc

    # homeassistant.helpers.aiohttp_client
    ha_aiohttp = _make_stub_module(
        "homeassistant.helpers.aiohttp_client",
        async_get_clientsession=MagicMock(),
    )
    sys.modules["homeassistant.helpers.aiohttp_client"] = ha_aiohttp

    # homeassistant.helpers.config_entry_oauth2_flow
    class AbstractOAuth2FlowHandler:
        DOMAIN = ""
        VERSION = 1
        hass = None
        context = {}
        def __init_subclass__(cls, **kwargs):
            # Accept domain= keyword argument from subclass declaration
            domain = kwargs.pop("domain", None)
            if domain:
                cls.DOMAIN = domain
            super().__init_subclass__(**kwargs)
        def async_show_menu(self, **kw): return kw
        def async_create_entry(self, **kw): return {"type": "create_entry", **kw}
        def async_abort(self, **kw): return {"type": "abort", **kw}
        async def async_set_unique_id(self, uid): pass
        def _abort_if_unique_id_configured(self, **kw): pass
        def async_update_reload_and_abort(self, entry, **kw): return {"type": "abort", "reason": "reauth_successful", **kw}
        async def async_step_pick_implementation(self, user_input=None): return {"type": "external"}
        def async_show_form(self, **kw): return {"type": "form", **kw}

    ha_oauth = _make_stub_module(
        "homeassistant.helpers.config_entry_oauth2_flow",
        AbstractOAuth2FlowHandler=AbstractOAuth2FlowHandler,
    )
    sys.modules["homeassistant.helpers.config_entry_oauth2_flow"] = ha_oauth

    # homeassistant.helpers.entity_platform
    ha_ep = _make_stub_module(
        "homeassistant.helpers.entity_platform",
        AddConfigEntryEntitiesCallback=MagicMock,
    )
    sys.modules["homeassistant.helpers.entity_platform"] = ha_ep

    # homeassistant.helpers.device_registry
    ha_dr = _make_stub_module(
        "homeassistant.helpers.device_registry",
        DeviceEntryType=SimpleNamespace(SERVICE="service"),
        DeviceInfo=dict,
    )
    sys.modules["homeassistant.helpers.device_registry"] = ha_dr

    # homeassistant.helpers.selector
    _noop_cls = lambda *a, **kw: None
    ha_sel = _make_stub_module(
        "homeassistant.helpers.selector",
        BooleanSelector=_noop_cls,
        NumberSelector=_noop_cls,
        NumberSelectorConfig=_noop_cls,
        NumberSelectorMode=SimpleNamespace(SLIDER="slider"),
        SelectSelector=_noop_cls,
        SelectSelectorConfig=_noop_cls,
        SelectSelectorMode=SimpleNamespace(DROPDOWN="dropdown", LIST="list"),
    )
    sys.modules["homeassistant.helpers.selector"] = ha_sel

    # homeassistant.components — must be a package (has submodules)
    ha_components = _make_stub_module("homeassistant.components")
    ha_components.__path__ = []  # make it a package
    sys.modules["homeassistant.components"] = ha_components

    # homeassistant.components.http
    ha_http = _make_stub_module(
        "homeassistant.components.http",
        StaticPathConfig=MagicMock,
    )
    sys.modules["homeassistant.components.http"] = ha_http

    # homeassistant.components.sensor
    ha_sensor = _make_stub_module(
        "homeassistant.components.sensor",
        SensorDeviceClass=SimpleNamespace(TIMESTAMP="timestamp", DURATION="duration"),
        SensorEntity=type("SensorEntity", (), {}),
        SensorEntityDescription=_make_sensor_entity_description(),
        SensorStateClass=SimpleNamespace(MEASUREMENT="measurement", TOTAL="total"),
    )
    sys.modules["homeassistant.components.sensor"] = ha_sensor

    # homeassistant.components.websocket_api
    def _ws_command(schema):
        def decorator(fn):
            fn._ws_schema = schema
            return fn
        return decorator

    def _require_admin(fn):
        fn._require_admin = True
        return fn

    class ActiveConnection:
        def __init__(self):
            self.user = MagicMock()
            self.send_result = MagicMock()
            self.send_error = MagicMock()

    ha_ws = _make_stub_module(
        "homeassistant.components.websocket_api",
        websocket_command=_ws_command,
        require_admin=_require_admin,
        async_response=lambda fn: fn,
        async_register_command=MagicMock(),
        ActiveConnection=ActiveConnection,
    )
    sys.modules["homeassistant.components.websocket_api"] = ha_ws

    # homeassistant.helpers.update_coordinator — CoordinatorEntity
    class CoordinatorEntity:
        def __init__(self, coordinator):
            self.coordinator = coordinator
        def __class_getitem__(cls, item):
            return cls
    ha_uc_ce = sys.modules["homeassistant.helpers.update_coordinator"]
    ha_uc_ce.CoordinatorEntity = CoordinatorEntity


# Ensure stubs are in place before any test imports
_ensure_ha_stubs()


# ---------------------------------------------------------------------------
# Now import our integration modules
# ---------------------------------------------------------------------------
from custom_components.anilist.api import (  # noqa: E402
    AniListAuthError,
    AniListClient,
    AniListError,
    AniListRateLimitError,
)
from custom_components.anilist.coordinator import (  # noqa: E402
    AiringEntry,
    AniListData,
    MangaEntry,
    UserStats,
    WatchlistEntry,
)


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


def _make_media(media_id: int = 1, title: str = "Test Anime", **overrides) -> dict:
    """Create a minimal media dict."""
    m = {
        "id": media_id,
        "title": {"romaji": title, "english": f"{title} EN", "native": f"{title} JP"},
        "episodes": 12,
        "duration": 24,
        "format": "TV",
        "averageScore": 80,
        "coverImage": {"extraLarge": "xl.jpg", "large": "l.jpg", "medium": "m.jpg", "color": "#aaa"},
        "genres": ["Action", "Comedy"],
        "isAdult": False,
        "siteUrl": f"https://anilist.co/anime/{media_id}",
        "status": "RELEASING",
    }
    m.update(overrides)
    return m


@pytest.fixture
def sample_media():
    """Return a helper that creates media dicts."""
    return _make_media


@pytest.fixture
def sample_airing_entries():
    """Return a list of AiringEntry objects for testing."""
    now = int(time.time())
    return [
        AiringEntry(
            id=101, airing_at=now - 3600, time_until_airing=-3600,
            episode=5, media_id=1, media=_make_media(1, "Past Anime"),
        ),
        AiringEntry(
            id=102, airing_at=now + 3600, time_until_airing=3600,
            episode=6, media_id=2, media=_make_media(2, "Future Anime"),
        ),
        AiringEntry(
            id=103, airing_at=now + 7200, time_until_airing=7200,
            episode=3, media_id=3, media=_make_media(3, "Later Anime"),
        ),
    ]


@pytest.fixture
def sample_watchlist_entries():
    """Return a list of WatchlistEntry objects."""
    return [
        WatchlistEntry(
            id=201, media_id=10, status="CURRENT", score=8.0, progress=5,
            notes=None, updated_at=1000000, media=_make_media(10, "Watching A"),
        ),
        WatchlistEntry(
            id=202, media_id=11, status="CURRENT", score=7.0, progress=3,
            notes="good", updated_at=1000001, media=_make_media(11, "Watching B"),
        ),
        WatchlistEntry(
            id=203, media_id=12, status="COMPLETED", score=9.0, progress=12,
            notes=None, updated_at=1000002, media=_make_media(12, "Completed C"),
        ),
    ]


@pytest.fixture
def sample_manga_entries():
    """Return a list of MangaEntry objects."""
    return [
        MangaEntry(
            id=301, media_id=20, status="CURRENT", score=7.5, progress=30,
            progress_volumes=3, notes=None, updated_at=2000000,
            media=_make_media(20, "Reading Manga A"),
        ),
        MangaEntry(
            id=302, media_id=21, status="PLANNING", score=0, progress=0,
            progress_volumes=0, notes=None, updated_at=2000001,
            media=_make_media(21, "Planning Manga B"),
        ),
    ]


@pytest.fixture
def sample_user_stats():
    """Return a UserStats object."""
    return UserStats(
        anime_count=150,
        episodes_watched=3000,
        minutes_watched=72000,
        anime_mean_score=75.5,
        top_genres=["Action", "Comedy", "Drama", "Fantasy", "Sci-Fi"],
        genre_stats=[
            {"genre": "Action", "count": 50},
            {"genre": "Comedy", "count": 40},
            {"genre": "Drama", "count": 30},
            {"genre": "Fantasy", "count": 20},
            {"genre": "Sci-Fi", "count": 10},
        ],
        manga_count=50,
        chapters_read=5000,
        volumes_read=200,
        manga_mean_score=70.0,
        favourite_anime=[
            {"id": 1, "title": {"romaji": "Fav1"}, "coverImage": {"medium": "fav1.jpg"}, "siteUrl": "url1"},
        ],
    )


@pytest.fixture
def sample_viewer():
    """Return a viewer dict."""
    return {
        "id": 12345,
        "name": "TestUser",
        "avatar": {"large": "avatar_l.jpg", "medium": "avatar_m.jpg"},
        "bannerImage": "banner.jpg",
        "mediaListOptions": {"scoreFormat": "POINT_10"},
    }


@pytest.fixture
def sample_anilist_data(
    sample_airing_entries, sample_watchlist_entries, sample_manga_entries,
    sample_user_stats, sample_viewer,
):
    """Return a fully populated AniListData."""
    return AniListData(
        airing_schedule=sample_airing_entries,
        season_anime=[_make_media(50, "Season A"), _make_media(51, "Season B")],
        next_season_anime=[_make_media(60, "Next Season A")],
        watchlist=sample_watchlist_entries,
        manga_list=sample_manga_entries,
        user_stats=sample_user_stats,
        viewer=sample_viewer,
    )


@pytest.fixture
def mock_aiohttp_session():
    """Return a mock aiohttp.ClientSession."""
    session = MagicMock()
    return session


def make_mock_response(status=200, json_data=None, headers=None):
    """Create a mock aiohttp response context manager."""
    resp = AsyncMock()
    resp.status = status
    resp.headers = headers or {"X-RateLimit-Remaining": "90", "X-RateLimit-Reset": "0"}
    resp.json = AsyncMock(return_value=json_data or {})
    resp.raise_for_status = MagicMock()

    # Make it work as an async context manager
    ctx = AsyncMock()
    ctx.__aenter__ = AsyncMock(return_value=resp)
    ctx.__aexit__ = AsyncMock(return_value=False)
    return ctx, resp
