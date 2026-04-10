"""Tests for the AniList sensor helpers (sensor.py)."""
from __future__ import annotations

import time
from datetime import datetime, timezone
from unittest.mock import patch

import pytest

from tests.conftest import _make_media

from custom_components.anilist.coordinator import AiringEntry, AniListData, WatchlistEntry, MangaEntry
from custom_components.anilist.sensor import (
    _count_airing_today,
    _format_score,
    _get_title,
    _next_airing_entry,
    _MAX_ATTR_ITEMS,
    _attrs_airing_schedule,
    _attrs_watchlist,
    _attrs_season_anime,
    _attrs_manga_list,
)


# ---------------------------------------------------------------------------
# _format_score
# ---------------------------------------------------------------------------


class TestFormatScore:
    """Tests for _format_score."""

    def test_point_10(self):
        """POINT_10 divides by 10."""
        assert _format_score(89.1, "POINT_10") == 8.9

    def test_point_100(self):
        """POINT_100 returns the raw score rounded."""
        assert _format_score(89.1, "POINT_100") == 89.1

    def test_point_5(self):
        """POINT_5 divides by 20."""
        assert _format_score(89.1, "POINT_5") == 4.5

    def test_smiley_returns_numeric(self):
        """SMILEY mode uses the POINT_10 numeric path (keeps numeric for state)."""
        result = _format_score(80.0, "SMILEY")
        assert result == 8.0
        assert isinstance(result, float)

    def test_zero_score_returns_none(self):
        """Unscored (0) returns None."""
        assert _format_score(0, "POINT_10") is None

    def test_none_like_score_returns_none(self):
        """Falsy score returns None."""
        assert _format_score(0.0, "POINT_100") is None

    def test_point_10_rounding(self):
        """Test rounding for POINT_10."""
        assert _format_score(75.0, "POINT_10") == 7.5
        assert _format_score(100.0, "POINT_10") == 10.0

    def test_point_5_rounding(self):
        """Test various values for POINT_5."""
        assert _format_score(100.0, "POINT_5") == 5.0
        assert _format_score(20.0, "POINT_5") == 1.0


# ---------------------------------------------------------------------------
# _count_airing_today
# ---------------------------------------------------------------------------


class TestCountAiringToday:
    """Tests for _count_airing_today."""

    def test_counts_entries_for_today(self):
        """Test counting entries that air today (UTC)."""
        now = time.time()
        today_start = datetime.now(tz=timezone.utc).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        today_ts = int(today_start.timestamp()) + 3600  # 1 AM today

        entries = [
            AiringEntry(id=1, airing_at=today_ts, time_until_airing=0,
                        episode=1, media_id=1, media=_make_media(1)),
            AiringEntry(id=2, airing_at=today_ts + 7200, time_until_airing=0,
                        episode=2, media_id=2, media=_make_media(2)),
            AiringEntry(id=3, airing_at=today_ts + 86400 * 2, time_until_airing=0,
                        episode=3, media_id=3, media=_make_media(3)),  # 2 days from now
        ]
        data = AniListData(airing_schedule=entries)
        assert _count_airing_today(data) == 2

    def test_count_zero_when_none_today(self):
        """Test zero count when no entries air today."""
        far_future = int(time.time()) + 86400 * 10
        entries = [
            AiringEntry(id=1, airing_at=far_future, time_until_airing=0,
                        episode=1, media_id=1, media=_make_media(1)),
        ]
        data = AniListData(airing_schedule=entries)
        assert _count_airing_today(data) == 0

    def test_count_with_empty_schedule(self):
        """Test zero count with empty schedule."""
        data = AniListData(airing_schedule=[])
        assert _count_airing_today(data) == 0


# ---------------------------------------------------------------------------
# _next_airing_entry
# ---------------------------------------------------------------------------


class TestNextAiringEntry:
    """Tests for _next_airing_entry."""

    def test_returns_soonest_future_entry(self, sample_airing_entries):
        """Test that the entry with the smallest future airing_at is returned."""
        data = AniListData(airing_schedule=sample_airing_entries)
        entry = _next_airing_entry(data)
        assert entry is not None
        # Entry 102 (airing_at = now + 3600) is sooner than 103 (now + 7200)
        assert entry.id == 102

    def test_returns_none_when_no_future(self):
        """Test None when all entries are in the past."""
        past = int(time.time()) - 7200
        entries = [
            AiringEntry(id=1, airing_at=past, time_until_airing=-7200,
                        episode=1, media_id=1, media=_make_media(1)),
        ]
        data = AniListData(airing_schedule=entries)
        assert _next_airing_entry(data) is None

    def test_returns_none_with_empty_schedule(self):
        """Test None with empty schedule."""
        data = AniListData(airing_schedule=[])
        assert _next_airing_entry(data) is None


# ---------------------------------------------------------------------------
# Value functions return None for missing auth data
# ---------------------------------------------------------------------------


class TestAuthSensorValues:
    """Test that auth-only sensor value functions return None when data is missing."""

    def test_watching_count_none_without_watchlist(self):
        from custom_components.anilist.sensor import _watching_count
        data = AniListData(watchlist=None)
        assert _watching_count(data, "romaji") is None

    def test_manga_reading_count_none_without_manga(self):
        from custom_components.anilist.sensor import _manga_reading_count
        data = AniListData(manga_list=None)
        assert _manga_reading_count(data, "romaji") is None

    def test_total_anime_watched_none_without_stats(self):
        from custom_components.anilist.sensor import _total_anime_watched
        data = AniListData(user_stats=None)
        assert _total_anime_watched(data, "romaji") is None

    def test_total_episodes_watched_none_without_stats(self):
        from custom_components.anilist.sensor import _total_episodes_watched
        data = AniListData(user_stats=None)
        assert _total_episodes_watched(data, "romaji") is None

    def test_total_hours_watched_none_without_stats(self):
        from custom_components.anilist.sensor import _total_hours_watched
        data = AniListData(user_stats=None)
        assert _total_hours_watched(data, "romaji") is None

    def test_anime_mean_score_none_without_stats(self):
        from custom_components.anilist.sensor import _anime_mean_score
        data = AniListData(user_stats=None)
        assert _anime_mean_score(data, "romaji") is None

    def test_manga_mean_score_none_without_stats(self):
        from custom_components.anilist.sensor import _manga_mean_score
        data = AniListData(user_stats=None)
        assert _manga_mean_score(data, "romaji") is None

    def test_chapters_read_none_without_stats(self):
        from custom_components.anilist.sensor import _chapters_read
        data = AniListData(user_stats=None)
        assert _chapters_read(data, "romaji") is None

    def test_top_genre_none_without_stats(self):
        from custom_components.anilist.sensor import _top_genre
        data = AniListData(user_stats=None)
        assert _top_genre(data, "romaji") is None


# ---------------------------------------------------------------------------
# _get_title (sensor version with language preference)
# ---------------------------------------------------------------------------


class TestSensorGetTitle:
    """Tests for the sensor's _get_title with language parameter."""

    def test_preferred_language(self):
        media = {"title": {"romaji": "Romaji", "english": "English", "native": "Native"}}
        assert _get_title(media, "english") == "English"

    def test_fallback_to_romaji(self):
        media = {"title": {"romaji": "Romaji", "english": None, "native": "Native"}}
        assert _get_title(media, "english") == "Romaji"

    def test_fallback_to_unknown(self):
        media = {"title": {}}
        assert _get_title(media, "romaji") == "Unknown"


# ---------------------------------------------------------------------------
# Attribute functions cap at _MAX_ATTR_ITEMS
# ---------------------------------------------------------------------------


class TestAttributeCapping:
    """Test that attribute functions cap lists at _MAX_ATTR_ITEMS (25)."""

    def test_airing_schedule_attrs_capped(self):
        """Test airing_schedule attribute list is capped at 25."""
        now = int(time.time())
        entries = [
            AiringEntry(id=i, airing_at=now + i * 60, time_until_airing=i * 60,
                        episode=i, media_id=i, media=_make_media(i, f"Show {i}"))
            for i in range(1, 40)
        ]
        data = AniListData(airing_schedule=entries)
        attrs = _attrs_airing_schedule(data, "romaji")
        assert len(attrs["airing_schedule"]) == _MAX_ATTR_ITEMS
        assert attrs["total_count"] == 39

    def test_watchlist_attrs_capped(self):
        """Test watchlist attribute list is capped at 25."""
        entries = [
            WatchlistEntry(
                id=i, media_id=i, status="CURRENT", score=8.0, progress=i,
                notes=None, updated_at=1000, media=_make_media(i, f"Anime {i}"),
            )
            for i in range(1, 40)
        ]
        data = AniListData(watchlist=entries)
        attrs = _attrs_watchlist(data, "romaji")
        assert len(attrs["watchlist"]) == _MAX_ATTR_ITEMS
        assert attrs["total_count"] == 39

    def test_season_anime_attrs_capped(self):
        """Test season_anime attribute list is capped at 25."""
        season = [_make_media(i, f"Season {i}") for i in range(1, 40)]
        data = AniListData(season_anime=season)
        attrs = _attrs_season_anime(data, "romaji")
        assert len(attrs["season_anime"]) == _MAX_ATTR_ITEMS
        assert attrs["total_count"] == 39

    def test_manga_list_attrs_capped(self):
        """Test manga_list attribute list is capped at 25."""
        entries = [
            MangaEntry(
                id=i, media_id=i, status="CURRENT", score=7.0, progress=i,
                progress_volumes=1, notes=None, updated_at=1000,
                media=_make_media(i, f"Manga {i}"),
            )
            for i in range(1, 40)
        ]
        data = AniListData(manga_list=entries)
        attrs = _attrs_manga_list(data, "romaji")
        assert len(attrs["manga_list"]) == _MAX_ATTR_ITEMS
        assert attrs["total_count"] == 39

    def test_watchlist_attrs_none_when_no_watchlist(self):
        """Test watchlist attrs return None when watchlist is None."""
        data = AniListData(watchlist=None)
        assert _attrs_watchlist(data, "romaji") is None

    def test_manga_attrs_none_when_no_manga(self):
        """Test manga attrs return None when manga_list is None."""
        data = AniListData(manga_list=None)
        assert _attrs_manga_list(data, "romaji") is None
