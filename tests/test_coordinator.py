"""Tests for the AniList coordinator parsing and helper functions."""
from __future__ import annotations

import time
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import pytest

from tests.conftest import _make_media

from custom_components.anilist.coordinator import (
    AiringEntry,
    AniListData,
    MangaEntry,
    UserStats,
    WatchlistEntry,
    _get_current_season_year,
    _get_next_season_year,
    _get_title,
    _parse_airing_schedule,
    _parse_manga_list,
    _parse_user_stats,
    _parse_watchlist,
)


# ---------------------------------------------------------------------------
# _parse_airing_schedule
# ---------------------------------------------------------------------------


class TestParseAiringSchedule:
    """Tests for _parse_airing_schedule."""

    def test_parse_valid_data(self):
        """Test parsing a schedule block with valid entries."""
        schedule_block = {
            "airingSchedules": [
                {
                    "id": 1,
                    "airingAt": 1700000000,
                    "timeUntilAiring": 3600,
                    "episode": 5,
                    "mediaId": 100,
                    "media": _make_media(100, "Show A"),
                },
                {
                    "id": 2,
                    "airingAt": 1700003600,
                    "timeUntilAiring": 7200,
                    "episode": 10,
                    "mediaId": 200,
                    "media": _make_media(200, "Show B"),
                },
            ]
        }
        entries = _parse_airing_schedule(schedule_block)
        assert len(entries) == 2
        assert entries[0].id == 1
        assert entries[0].episode == 5
        assert entries[0].media_id == 100
        assert entries[1].id == 2
        assert entries[1].episode == 10

    def test_parse_skips_entries_without_media(self):
        """Test that entries without a media object are skipped."""
        schedule_block = {
            "airingSchedules": [
                {
                    "id": 1,
                    "airingAt": 1700000000,
                    "timeUntilAiring": 3600,
                    "episode": 5,
                    "mediaId": 100,
                    "media": _make_media(100, "Valid"),
                },
                {
                    "id": 2,
                    "airingAt": 1700003600,
                    "timeUntilAiring": 7200,
                    "episode": 10,
                    "mediaId": 200,
                    "media": None,
                },
                {
                    "id": 3,
                    "airingAt": 1700007200,
                    "episode": 1,
                    "mediaId": 300,
                    # No 'media' key at all
                },
            ]
        }
        entries = _parse_airing_schedule(schedule_block)
        assert len(entries) == 1
        assert entries[0].id == 1

    def test_parse_empty_schedules(self):
        """Test parsing an empty schedule block."""
        assert _parse_airing_schedule({}) == []
        assert _parse_airing_schedule({"airingSchedules": []}) == []

    def test_parse_defaults_time_until_airing_to_zero(self):
        """Test that missing timeUntilAiring defaults to 0."""
        schedule_block = {
            "airingSchedules": [
                {
                    "id": 1,
                    "airingAt": 1700000000,
                    "episode": 1,
                    "mediaId": 100,
                    "media": _make_media(100),
                },
            ]
        }
        entries = _parse_airing_schedule(schedule_block)
        assert entries[0].time_until_airing == 0


# ---------------------------------------------------------------------------
# _parse_watchlist
# ---------------------------------------------------------------------------


class TestParseWatchlist:
    """Tests for _parse_watchlist."""

    def test_parse_flattens_multiple_lists(self):
        """Test that entries from multiple lists are flattened."""
        watchlist_block = {
            "lists": [
                {
                    "name": "Watching",
                    "status": "CURRENT",
                    "entries": [
                        {
                            "id": 1, "mediaId": 10, "status": "CURRENT",
                            "score": 8.0, "progress": 5, "notes": None,
                            "updatedAt": 1000, "media": _make_media(10),
                        },
                    ],
                },
                {
                    "name": "Completed",
                    "status": "COMPLETED",
                    "entries": [
                        {
                            "id": 2, "mediaId": 11, "status": "COMPLETED",
                            "score": 9.0, "progress": 12, "notes": "great",
                            "updatedAt": 2000, "media": _make_media(11),
                        },
                        {
                            "id": 3, "mediaId": 12, "status": "COMPLETED",
                            "score": 7.0, "progress": 24, "notes": None,
                            "updatedAt": 3000, "media": _make_media(12),
                        },
                    ],
                },
            ]
        }
        entries = _parse_watchlist(watchlist_block)
        assert len(entries) == 3
        assert entries[0].status == "CURRENT"
        assert entries[1].notes == "great"
        assert entries[2].media_id == 12

    def test_parse_skips_entries_without_media(self):
        """Test that watchlist entries without media are skipped."""
        watchlist_block = {
            "lists": [
                {
                    "name": "Watching",
                    "entries": [
                        {"id": 1, "mediaId": 10, "media": _make_media(10)},
                        {"id": 2, "mediaId": 11, "media": None},
                    ],
                },
            ]
        }
        entries = _parse_watchlist(watchlist_block)
        assert len(entries) == 1

    def test_parse_empty_watchlist(self):
        """Test parsing an empty watchlist."""
        assert _parse_watchlist({}) == []
        assert _parse_watchlist({"lists": []}) == []


# ---------------------------------------------------------------------------
# _parse_manga_list
# ---------------------------------------------------------------------------


class TestParseMangaList:
    """Tests for _parse_manga_list."""

    def test_parse_various_statuses(self):
        """Test parsing manga entries with different statuses."""
        manga_block = {
            "lists": [
                {
                    "name": "Reading",
                    "entries": [
                        {
                            "id": 1, "mediaId": 20, "status": "CURRENT",
                            "score": 8.0, "progress": 50, "progressVolumes": 5,
                            "notes": None, "updatedAt": 1000,
                            "media": _make_media(20, "Manga A"),
                        },
                    ],
                },
                {
                    "name": "Plan to Read",
                    "entries": [
                        {
                            "id": 2, "mediaId": 21, "status": "PLANNING",
                            "score": 0, "progress": 0, "progressVolumes": 0,
                            "notes": None, "updatedAt": 2000,
                            "media": _make_media(21, "Manga B"),
                        },
                    ],
                },
            ]
        }
        entries = _parse_manga_list(manga_block)
        assert len(entries) == 2
        assert entries[0].status == "CURRENT"
        assert entries[0].progress == 50
        assert entries[0].progress_volumes == 5
        assert entries[1].status == "PLANNING"

    def test_parse_empty_manga_list(self):
        """Test parsing an empty manga block."""
        assert _parse_manga_list({}) == []


# ---------------------------------------------------------------------------
# _parse_user_stats
# ---------------------------------------------------------------------------


class TestParseUserStats:
    """Tests for _parse_user_stats."""

    def test_parse_extracts_all_fields(self):
        """Test that all statistics fields are correctly extracted."""
        user_block = {
            "statistics": {
                "anime": {
                    "count": 100,
                    "episodesWatched": 2000,
                    "minutesWatched": 48000,
                    "meanScore": 72.5,
                    "genres": [
                        {"genre": "Action", "count": 50},
                        {"genre": "Comedy", "count": 30},
                        {"genre": "Drama", "count": 25},
                        {"genre": "Romance", "count": 20},
                        {"genre": "Sci-Fi", "count": 15},
                        {"genre": "Fantasy", "count": 10},
                    ],
                },
                "manga": {
                    "count": 30,
                    "chaptersRead": 3000,
                    "volumesRead": 100,
                    "meanScore": 68.0,
                },
            },
            "favourites": {
                "anime": {
                    "nodes": [
                        {"id": 1, "title": {"romaji": "Fav1"}, "coverImage": {"medium": "f.jpg"}, "siteUrl": "u"},
                    ]
                }
            },
        }
        stats = _parse_user_stats(user_block)
        assert stats.anime_count == 100
        assert stats.episodes_watched == 2000
        assert stats.minutes_watched == 48000
        assert stats.anime_mean_score == 72.5
        assert stats.manga_count == 30
        assert stats.chapters_read == 3000
        assert stats.volumes_read == 100
        assert stats.manga_mean_score == 68.0
        assert len(stats.top_genres) == 5  # capped at 5
        assert stats.top_genres[0] == "Action"
        assert len(stats.genre_stats) == 6  # all genres
        assert len(stats.favourite_anime) == 1

    def test_parse_empty_user_block(self):
        """Test parsing with empty/missing data defaults gracefully."""
        stats = _parse_user_stats({})
        assert stats.anime_count == 0
        assert stats.episodes_watched == 0
        assert stats.top_genres == []
        assert stats.favourite_anime == []

    def test_parse_skips_genres_without_name(self):
        """Test that genres without a name are filtered out."""
        user_block = {
            "statistics": {
                "anime": {
                    "genres": [
                        {"genre": "Action", "count": 10},
                        {"genre": None, "count": 5},
                        {"genre": "", "count": 3},
                    ],
                },
            },
        }
        stats = _parse_user_stats(user_block)
        # Only "Action" should be included (None and "" are falsy)
        assert len(stats.genre_stats) == 1
        assert stats.top_genres == ["Action"]


# ---------------------------------------------------------------------------
# _get_current_season_year and _get_next_season_year
# ---------------------------------------------------------------------------


class TestSeasonHelpers:
    """Tests for season calculation functions."""

    @pytest.mark.parametrize("month,expected_season", [
        (1, "WINTER"), (2, "WINTER"), (3, "WINTER"),
        (4, "SPRING"), (5, "SPRING"), (6, "SPRING"),
        (7, "SUMMER"), (8, "SUMMER"), (9, "SUMMER"),
        (10, "FALL"), (11, "FALL"), (12, "FALL"),
    ])
    def test_get_current_season_for_each_month(self, month, expected_season):
        """Test correct season mapping for every month."""
        mock_dt = datetime(2025, month, 15, tzinfo=timezone.utc)
        with patch("custom_components.anilist.coordinator.datetime") as mock_datetime:
            mock_datetime.now.return_value = mock_dt
            mock_datetime.fromtimestamp = datetime.fromtimestamp
            season, year = _get_current_season_year()
            assert season == expected_season
            assert year == 2025

    def test_get_next_season_wraps_fall_to_winter(self):
        """Test FALL -> WINTER with year increment."""
        mock_dt = datetime(2025, 10, 15, tzinfo=timezone.utc)
        with patch("custom_components.anilist.coordinator.datetime") as mock_datetime:
            mock_datetime.now.return_value = mock_dt
            season, year = _get_next_season_year()
            assert season == "WINTER"
            assert year == 2026

    def test_get_next_season_spring_to_summer(self):
        """Test SPRING -> SUMMER, same year."""
        mock_dt = datetime(2025, 4, 15, tzinfo=timezone.utc)
        with patch("custom_components.anilist.coordinator.datetime") as mock_datetime:
            mock_datetime.now.return_value = mock_dt
            season, year = _get_next_season_year()
            assert season == "SUMMER"
            assert year == 2025

    def test_get_next_season_winter_to_spring(self):
        """Test WINTER -> SPRING, same year."""
        mock_dt = datetime(2025, 1, 15, tzinfo=timezone.utc)
        with patch("custom_components.anilist.coordinator.datetime") as mock_datetime:
            mock_datetime.now.return_value = mock_dt
            season, year = _get_next_season_year()
            assert season == "SPRING"
            assert year == 2025

    def test_get_next_season_summer_to_fall(self):
        """Test SUMMER -> FALL, same year."""
        mock_dt = datetime(2025, 7, 15, tzinfo=timezone.utc)
        with patch("custom_components.anilist.coordinator.datetime") as mock_datetime:
            mock_datetime.now.return_value = mock_dt
            season, year = _get_next_season_year()
            assert season == "FALL"
            assert year == 2025


# ---------------------------------------------------------------------------
# _get_title
# ---------------------------------------------------------------------------


class TestGetTitle:
    """Tests for the _get_title helper."""

    def test_returns_romaji_first(self):
        media = {"title": {"romaji": "Romaji", "english": "English", "native": "Native"}}
        assert _get_title(media) == "Romaji"

    def test_fallback_to_english(self):
        media = {"title": {"romaji": None, "english": "English", "native": "Native"}}
        assert _get_title(media) == "English"

    def test_fallback_to_native(self):
        media = {"title": {"english": None, "native": "Native"}}
        assert _get_title(media) == "Native"

    def test_fallback_to_unknown(self):
        media = {"title": {}}
        assert _get_title(media) == "Unknown"

    def test_missing_title_key(self):
        media = {}
        assert _get_title(media) == "Unknown"


# ---------------------------------------------------------------------------
# _fire_new_airing_events (tested via coordinator instance)
# ---------------------------------------------------------------------------


class TestFireNewAiringEvents:
    """Tests for coordinator._fire_new_airing_events logic.

    We test the method by creating a minimal coordinator-like object that has
    the same attributes and calling the method directly.
    """

    def _make_coordinator_stub(self):
        """Create a minimal object that mimics coordinator for _fire_new_airing_events."""
        from custom_components.anilist.coordinator import AniListCoordinator

        stub = object.__new__(AniListCoordinator)
        stub._fired_airing_ids = set()
        stub._fired_airing_times = {}
        stub.hass = MagicMock()
        stub.hass.bus = MagicMock()
        stub.hass.bus.async_fire = MagicMock()
        return stub

    def test_fires_events_for_past_entries(self, sample_airing_entries):
        """Test that events are fired for already-aired episodes."""
        coord = self._make_coordinator_stub()
        data = AniListData(airing_schedule=sample_airing_entries)

        coord._fire_new_airing_events(data)

        # Only the past entry (id=101, airing_at in the past) should fire
        assert coord.hass.bus.async_fire.call_count == 1
        call_args = coord.hass.bus.async_fire.call_args
        assert call_args[0][0] == "anilist_episode_airing"
        assert call_args[0][1]["media_id"] == 1
        assert call_args[0][1]["episode"] == 5

    def test_deduplicates_on_second_call(self, sample_airing_entries):
        """Test that the same entry is not fired twice."""
        coord = self._make_coordinator_stub()
        data = AniListData(airing_schedule=sample_airing_entries)

        coord._fire_new_airing_events(data)
        coord._fire_new_airing_events(data)

        # Should only fire once total
        assert coord.hass.bus.async_fire.call_count == 1

    def test_prunes_old_entries(self):
        """Test that fired IDs older than 24h are pruned."""
        coord = self._make_coordinator_stub()
        now = time.time()

        # Add an old entry (> 24h ago)
        coord._fired_airing_ids.add(999)
        coord._fired_airing_times[999] = now - 90000  # ~25 hours ago

        # Add a recent entry
        coord._fired_airing_ids.add(888)
        coord._fired_airing_times[888] = now - 1000  # recent

        data = AniListData(airing_schedule=[])
        coord._fire_new_airing_events(data)

        assert 999 not in coord._fired_airing_ids
        assert 888 in coord._fired_airing_ids


# ---------------------------------------------------------------------------
# _apply_filters (tested via coordinator instance)
# ---------------------------------------------------------------------------


class TestApplyFilters:
    """Tests for coordinator._apply_filters."""

    def _make_coordinator_stub(self, options=None):
        from custom_components.anilist.coordinator import AniListCoordinator
        stub = object.__new__(AniListCoordinator)
        entry = MagicMock()
        entry.options = options or {}
        stub.config_entry = entry
        return stub

    def test_format_filter(self):
        """Test filtering schedule by media format."""
        coord = self._make_coordinator_stub(options={"media_formats": ["TV"]})
        schedule = [
            AiringEntry(id=1, airing_at=0, time_until_airing=0, episode=1,
                        media_id=1, media=_make_media(1, format="TV")),
            AiringEntry(id=2, airing_at=0, time_until_airing=0, episode=1,
                        media_id=2, media=_make_media(2, format="MOVIE")),
        ]
        season = [_make_media(3, format="TV"), _make_media(4, format="MOVIE")]
        next_season = []

        filtered_sched, filtered_season, filtered_next = coord._apply_filters(
            schedule, season, next_season
        )
        assert len(filtered_sched) == 1
        assert filtered_sched[0].media_id == 1
        # Season anime is also filtered by format
        assert len(filtered_season) == 1
        assert filtered_season[0]["id"] == 3

    def test_genre_exclusion(self):
        """Test filtering season anime by excluded genres."""
        coord = self._make_coordinator_stub(options={"excluded_genres": ["Horror"]})
        schedule = [
            AiringEntry(id=1, airing_at=0, time_until_airing=0, episode=1,
                        media_id=1, media=_make_media(1, genres=["Action"])),
        ]
        season = [
            _make_media(3, genres=["Action", "Comedy"]),
            _make_media(4, genres=["Horror", "Drama"]),
        ]
        next_season = [
            _make_media(5, genres=["Horror"]),
            _make_media(6, genres=["Sci-Fi"]),
        ]

        filtered_sched, filtered_season, filtered_next = coord._apply_filters(
            schedule, season, next_season
        )
        # Schedule is NOT filtered by genre
        assert len(filtered_sched) == 1
        # Horror entries excluded from season lists
        assert len(filtered_season) == 1
        assert len(filtered_next) == 1

    def test_no_filters_applied(self):
        """Test that empty filter options pass everything through."""
        coord = self._make_coordinator_stub(options={})
        schedule = [
            AiringEntry(id=1, airing_at=0, time_until_airing=0, episode=1,
                        media_id=1, media=_make_media(1)),
        ]
        season = [_make_media(2)]
        next_season = [_make_media(3)]

        filtered_sched, filtered_season, filtered_next = coord._apply_filters(
            schedule, season, next_season
        )
        assert len(filtered_sched) == 1
        assert len(filtered_season) == 1
        assert len(filtered_next) == 1


# ---------------------------------------------------------------------------
# _get_airing_window (instance method)
# ---------------------------------------------------------------------------


class TestGetAiringWindow:
    """Tests for coordinator._get_airing_window."""

    def test_uses_last_successful_refresh_for_lookback(self):
        """Test that start_ts considers the last successful refresh."""
        from custom_components.anilist.coordinator import AniListCoordinator

        stub = object.__new__(AniListCoordinator)
        stub.update_interval = MagicMock()
        stub.update_interval.total_seconds.return_value = 900  # 15 min
        now_ts = int(time.time())
        stub._last_successful_refresh = now_ts - 60  # 60 seconds ago

        start_ts, end_ts = stub._get_airing_window(days=7)

        # start_ts should be min(last_refresh - 1, now - lookback)
        assert start_ts <= now_ts
        # end_ts should be approximately now + 7 days
        expected_end = now_ts + (7 * 24 * 3600)
        assert abs(end_ts - expected_end) < 5  # within 5 seconds tolerance
