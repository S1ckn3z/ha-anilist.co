"""Tests for the AniList WebSocket API (websocket_api.py)."""
from __future__ import annotations

import time
from unittest.mock import MagicMock

import pytest

from tests.conftest import _make_media

from custom_components.anilist.coordinator import (
    AiringEntry,
    AniListData,
    MangaEntry,
    UserStats,
    WatchlistEntry,
)
from custom_components.anilist.websocket_api import (
    _cover_images,
    _paginate,
    _resolve_coordinator,
    _serialize_airing,
    _serialize_manga,
    _serialize_season_anime,
    _serialize_watchlist,
    _title_dict,
    ws_airing_schedule,
    ws_manga,
    ws_profile,
    ws_watchlist,
)


# ---------------------------------------------------------------------------
# Helpers for mock hass / connection / coordinator
# ---------------------------------------------------------------------------


def _mock_connection():
    conn = MagicMock()
    conn.send_result = MagicMock()
    conn.send_error = MagicMock()
    conn.user = MagicMock()
    conn.user.is_admin = True
    return conn


def _mock_hass_with_entries(entries):
    """Create a mock hass with the given config entries."""
    hass = MagicMock()
    hass.config_entries.async_get_entry = MagicMock(
        side_effect=lambda eid: next((e for e in entries if e.entry_id == eid), None)
    )
    hass.config_entries.async_entries = MagicMock(return_value=entries)
    return hass


def _mock_config_entry(entry_id="test_entry", domain="anilist", data=None):
    entry = MagicMock()
    entry.entry_id = entry_id
    entry.domain = domain
    entry.options = data or {"score_format": "POINT_10"}
    return entry


def _mock_coordinator(data=None, options=None):
    coord = MagicMock()
    coord.data = data
    entry = MagicMock()
    entry.options = options or {"score_format": "POINT_10"}
    coord.config_entry = entry
    return coord


# ---------------------------------------------------------------------------
# _resolve_coordinator tests
# ---------------------------------------------------------------------------


class TestResolveCoordinator:
    """Tests for _resolve_coordinator."""

    def test_auto_discovery_single_entry(self):
        """Test auto-detection when exactly one anilist entry exists."""
        coord = _mock_coordinator(data=AniListData())
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1})
        assert result is coord
        conn.send_error.assert_not_called()

    def test_error_when_multiple_entries_no_entry_id(self):
        """Test error when multiple entries exist and no entry_id specified."""
        entry1 = _mock_config_entry(entry_id="e1")
        entry2 = _mock_config_entry(entry_id="e2")
        hass = _mock_hass_with_entries([entry1, entry2])
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1})
        assert result is None
        conn.send_error.assert_called_once()
        error_args = conn.send_error.call_args[0]
        assert error_args[1] == "ambiguous"

    def test_error_when_no_entries(self):
        """Test error when no anilist entries exist."""
        hass = _mock_hass_with_entries([])
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1})
        assert result is None
        conn.send_error.assert_called_once()
        error_args = conn.send_error.call_args[0]
        assert error_args[1] == "not_found"

    def test_explicit_entry_id(self):
        """Test resolving with an explicit entry_id."""
        coord = _mock_coordinator(data=AniListData())
        entry = _mock_config_entry(entry_id="my_entry")
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1, "entry_id": "my_entry"})
        assert result is coord

    def test_explicit_entry_id_not_found(self):
        """Test error when specified entry_id doesn't exist."""
        hass = _mock_hass_with_entries([])
        hass.config_entries.async_get_entry = MagicMock(return_value=None)
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1, "entry_id": "nonexistent"})
        assert result is None
        conn.send_error.assert_called_once()
        assert conn.send_error.call_args[0][1] == "not_found"

    def test_data_not_ready(self):
        """Test error when coordinator data is None."""
        coord = _mock_coordinator(data=None)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        result = _resolve_coordinator(hass, conn, {"id": 1})
        assert result is None
        conn.send_error.assert_called_once()
        assert conn.send_error.call_args[0][1] == "not_ready"


# ---------------------------------------------------------------------------
# _paginate tests
# ---------------------------------------------------------------------------


class TestPaginate:
    """Tests for _paginate."""

    def test_no_pagination(self):
        """Test default behavior without limit/offset."""
        items = [1, 2, 3, 4, 5]
        page, total, offset = _paginate(items, {})
        assert page == [1, 2, 3, 4, 5]
        assert total == 5
        assert offset == 0

    def test_with_limit(self):
        """Test pagination with limit only."""
        items = [1, 2, 3, 4, 5]
        page, total, offset = _paginate(items, {"limit": 3})
        assert page == [1, 2, 3]
        assert total == 5
        assert offset == 0

    def test_with_offset(self):
        """Test pagination with offset only."""
        items = [1, 2, 3, 4, 5]
        page, total, offset = _paginate(items, {"offset": 2})
        assert page == [3, 4, 5]
        assert total == 5
        assert offset == 2

    def test_with_limit_and_offset(self):
        """Test pagination with both limit and offset."""
        items = [1, 2, 3, 4, 5]
        page, total, offset = _paginate(items, {"limit": 2, "offset": 1})
        assert page == [2, 3]
        assert total == 5
        assert offset == 1

    def test_offset_beyond_list(self):
        """Test offset beyond the list length returns empty."""
        items = [1, 2, 3]
        page, total, offset = _paginate(items, {"offset": 10})
        assert page == []
        assert total == 3


# ---------------------------------------------------------------------------
# Serializer tests
# ---------------------------------------------------------------------------


class TestSerializers:
    """Tests for serializer functions."""

    def test_title_dict(self):
        media = _make_media(1, "Test")
        result = _title_dict(media)
        assert result["romaji"] == "Test"
        assert result["english"] == "Test EN"
        assert result["native"] == "Test JP"

    def test_cover_images(self):
        media = _make_media(1)
        result = _cover_images(media)
        assert result["small"] == "m.jpg"
        assert result["medium"] == "l.jpg"
        assert result["large"] == "xl.jpg"
        assert result["color"] == "#aaa"

    def test_serialize_airing(self):
        entry = AiringEntry(
            id=1, airing_at=1700000000, time_until_airing=3600,
            episode=5, media_id=100,
            media=_make_media(100, "Show X", genres=["Action"], format="TV"),
        )
        result = _serialize_airing(entry)
        assert result["media_id"] == 100
        assert result["episode"] == 5
        assert result["airing_at"] == 1700000000
        assert result["title"]["romaji"] == "Show X"
        assert result["genres"] == ["Action"]
        assert result["format"] == "TV"
        assert "cover_images" in result

    def test_serialize_watchlist(self):
        entry = WatchlistEntry(
            id=1, media_id=10, status="CURRENT", score=8.5, progress=5,
            notes=None, updated_at=1000,
            media=_make_media(10, "Watching Show",
                              nextAiringEpisode={"airingAt": 1700000000, "episode": 6}),
        )
        result = _serialize_watchlist(entry)
        assert result["media_id"] == 10
        assert result["status"] == "CURRENT"
        assert result["score"] == 8.5
        assert result["progress"] == 5
        assert result["next_airing_episode"]["episode"] == 6
        assert result["title"]["romaji"] == "Watching Show"

    def test_serialize_watchlist_no_next_episode(self):
        entry = WatchlistEntry(
            id=1, media_id=10, status="COMPLETED", score=9.0, progress=12,
            notes=None, updated_at=1000,
            media=_make_media(10, "Done Show"),
        )
        result = _serialize_watchlist(entry)
        assert result["next_airing_episode"] is None

    def test_serialize_manga(self):
        entry = MangaEntry(
            id=1, media_id=20, status="CURRENT", score=7.5, progress=30,
            progress_volumes=3, notes=None, updated_at=2000,
            media=_make_media(20, "Manga X", chapters=100, volumes=10),
        )
        result = _serialize_manga(entry)
        assert result["media_id"] == 20
        assert result["status"] == "CURRENT"
        assert result["progress"] == 30
        assert result["progress_volumes"] == 3
        assert result["chapters"] == 100
        assert result["volumes"] == 10

    def test_serialize_season_anime(self):
        media = _make_media(
            50, "Season Show",
            popularity=5000,
            studios={"nodes": [{"id": 1, "name": "Studio X"}]},
            nextAiringEpisode={"airingAt": 1700000000, "episode": 3},
            bannerImage="banner.jpg",
            startDate={"year": 2025, "month": 1, "day": 1},
        )
        result = _serialize_season_anime(media)
        assert result["id"] == 50
        assert result["title"]["romaji"] == "Season Show"
        assert result["popularity"] == 5000
        assert result["studios"][0]["name"] == "Studio X"
        assert result["next_airing_episode"]["episode"] == 3
        assert result["banner_image"] == "banner.jpg"


# ---------------------------------------------------------------------------
# WebSocket command handler tests
# ---------------------------------------------------------------------------


class TestWsAiringSchedule:
    """Tests for ws_airing_schedule command."""

    @pytest.mark.asyncio
    async def test_returns_airing_data(self):
        """Test ws_airing_schedule returns serialized airing data."""
        now = int(time.time())
        entries = [
            AiringEntry(id=1, airing_at=now + 3600, time_until_airing=3600,
                        episode=5, media_id=100, media=_make_media(100, "Show A")),
        ]
        data = AniListData(airing_schedule=entries)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_airing_schedule(hass, conn, {"id": 1, "type": "anilist/airing_schedule"})

        conn.send_result.assert_called_once()
        result = conn.send_result.call_args[0][1]
        assert result["total"] == 1
        assert result["items"][0]["media_id"] == 100


# ---------------------------------------------------------------------------
# Admin-gated WebSocket command tests (C3 security fix)
# ---------------------------------------------------------------------------


class TestWsAdminGating:
    """Test that watchlist, manga, and profile require admin."""

    def test_ws_watchlist_has_require_admin(self):
        """Verify ws_watchlist is decorated with @require_admin."""
        assert getattr(ws_watchlist, "_require_admin", False) is True

    def test_ws_manga_has_require_admin(self):
        """Verify ws_manga is decorated with @require_admin."""
        assert getattr(ws_manga, "_require_admin", False) is True

    def test_ws_profile_has_require_admin(self):
        """Verify ws_profile is decorated with @require_admin."""
        assert getattr(ws_profile, "_require_admin", False) is True

    def test_ws_airing_schedule_does_not_require_admin(self):
        """Verify ws_airing_schedule does NOT require admin (public data)."""
        assert getattr(ws_airing_schedule, "_require_admin", False) is False


class TestWsWatchlist:
    """Tests for ws_watchlist command."""

    @pytest.mark.asyncio
    async def test_returns_not_authenticated_when_no_watchlist(self):
        """Test ws_watchlist returns error when watchlist data is None."""
        data = AniListData(watchlist=None)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_watchlist(hass, conn, {"id": 1, "type": "anilist/watchlist"})

        conn.send_error.assert_called_once()
        error_args = conn.send_error.call_args[0]
        assert error_args[1] == "not_authenticated"

    @pytest.mark.asyncio
    async def test_returns_watchlist_data(self):
        """Test ws_watchlist returns serialized watchlist."""
        entries = [
            WatchlistEntry(
                id=1, media_id=10, status="CURRENT", score=8.0, progress=5,
                notes=None, updated_at=1000, media=_make_media(10, "Watching"),
            ),
        ]
        data = AniListData(watchlist=entries)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_watchlist(hass, conn, {"id": 1, "type": "anilist/watchlist"})

        conn.send_result.assert_called_once()
        result = conn.send_result.call_args[0][1]
        assert result["total"] == 1
        assert result["items"][0]["media_id"] == 10
        assert "score_format" in result

    @pytest.mark.asyncio
    async def test_filters_by_status(self):
        """Test ws_watchlist filters by status parameter."""
        entries = [
            WatchlistEntry(id=1, media_id=10, status="CURRENT", score=8.0,
                           progress=5, notes=None, updated_at=1000,
                           media=_make_media(10)),
            WatchlistEntry(id=2, media_id=11, status="COMPLETED", score=9.0,
                           progress=12, notes=None, updated_at=2000,
                           media=_make_media(11)),
        ]
        data = AniListData(watchlist=entries)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_watchlist(
            hass, conn,
            {"id": 1, "type": "anilist/watchlist", "status": "CURRENT"},
        )

        result = conn.send_result.call_args[0][1]
        assert result["total"] == 1
        assert result["items"][0]["media_id"] == 10


class TestWsManga:
    """Tests for ws_manga command."""

    @pytest.mark.asyncio
    async def test_returns_not_authenticated_when_no_manga(self):
        """Test ws_manga returns error when manga_list is None."""
        data = AniListData(manga_list=None)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_manga(hass, conn, {"id": 1, "type": "anilist/manga"})

        conn.send_error.assert_called_once()
        assert conn.send_error.call_args[0][1] == "not_authenticated"


class TestWsProfile:
    """Tests for ws_profile command."""

    @pytest.mark.asyncio
    async def test_returns_profile_data(self, sample_user_stats, sample_viewer):
        """Test ws_profile returns profile, stats, and favourites."""
        data = AniListData(
            user_stats=sample_user_stats,
            viewer=sample_viewer,
        )
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_profile(hass, conn, {"id": 1, "type": "anilist/profile"})

        conn.send_result.assert_called_once()
        result = conn.send_result.call_args[0][1]
        assert result["viewer"]["name"] == "TestUser"
        assert result["stats"]["anime_count"] == 150
        assert result["is_authenticated"] is True
        assert len(result["top_genres"]) == 5
        assert len(result["favourite_anime"]) == 1

    @pytest.mark.asyncio
    async def test_returns_unauthenticated_profile(self):
        """Test ws_profile returns empty stats when not authenticated."""
        data = AniListData(user_stats=None, viewer=None)
        coord = _mock_coordinator(data=data)
        entry = _mock_config_entry()
        entry.runtime_data = coord
        hass = _mock_hass_with_entries([entry])
        conn = _mock_connection()

        await ws_profile(hass, conn, {"id": 1, "type": "anilist/profile"})

        result = conn.send_result.call_args[0][1]
        assert result["is_authenticated"] is False
        assert result["stats"] == {}
