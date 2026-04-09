"""AniList GraphQL API client."""
from __future__ import annotations

import asyncio
import time
from typing import Any

import aiohttp

from .const import ANILIST_GRAPHQL_URL, LOGGER, RATE_LIMIT_BUFFER

# ---------------------------------------------------------------------------
# GraphQL Queries
# ---------------------------------------------------------------------------

QUERY_VIEWER = """
query WhoAmI {
  Viewer {
    id
    name
    avatar { large medium }
    bannerImage
    mediaListOptions { scoreFormat }
  }
}
"""

QUERY_PUBLIC = """
query PublicData(
  $airingAt_greater: Int
  $airingAt_lesser: Int
  $season: MediaSeason
  $seasonYear: Int
  $nextSeason: MediaSeason
  $nextSeasonYear: Int
  $isAdult: Boolean
) {
  schedule: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    airingSchedules(
      airingAt_greater: $airingAt_greater
      airingAt_lesser: $airingAt_lesser
      sort: TIME
    ) {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
      media {
        id
        title { romaji english native }
        episodes
        duration
        format
        coverImage { large medium color }
        genres
        isAdult
        siteUrl
      }
    }
  }
  seasonMedia: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    media(
      season: $season
      seasonYear: $seasonYear
      type: ANIME
      sort: POPULARITY_DESC
      isAdult: $isAdult
    ) {
      id
      title { romaji english native }
      status
      season
      seasonYear
      episodes
      duration
      format
      genres
      averageScore
      popularity
      coverImage { extraLarge large medium color }
      bannerImage
      startDate { year month day }
      endDate { year month day }
      nextAiringEpisode { id airingAt timeUntilAiring episode }
      studios(isMain: true) { nodes { id name } }
      siteUrl
    }
  }
  nextSeasonMedia: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    media(
      season: $nextSeason
      seasonYear: $nextSeasonYear
      type: ANIME
      sort: POPULARITY_DESC
      isAdult: $isAdult
    ) {
      id
      title { romaji english native }
      status
      season
      seasonYear
      episodes
      duration
      format
      genres
      averageScore
      popularity
      coverImage { extraLarge large medium color }
      bannerImage
      startDate { year month day }
      endDate { year month day }
      nextAiringEpisode { id airingAt timeUntilAiring episode }
      studios(isMain: true) { nodes { id name } }
      siteUrl
    }
  }
}
"""

QUERY_COMBINED = """
query CombinedData(
  $userName: String
  $airingAt_greater: Int
  $airingAt_lesser: Int
  $season: MediaSeason
  $seasonYear: Int
  $nextSeason: MediaSeason
  $nextSeasonYear: Int
  $isAdult: Boolean
) {
  watchlist: MediaListCollection(userName: $userName, type: ANIME) {
    user { id name mediaListOptions { scoreFormat } }
    lists {
      name
      isCustomList
      status
      entries {
        id
        mediaId
        status
        score
        progress
        repeat
        notes
        updatedAt
        media {
          id
          title { romaji english native }
          episodes
          duration
          status
          format
          coverImage { large medium color }
          nextAiringEpisode { id airingAt timeUntilAiring episode }
          siteUrl
        }
      }
    }
  }
  schedule: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    airingSchedules(
      airingAt_greater: $airingAt_greater
      airingAt_lesser: $airingAt_lesser
      sort: TIME
    ) {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
      media {
        id
        title { romaji english native }
        duration
        format
        genres
        coverImage { medium color }
        isAdult
        siteUrl
      }
    }
  }
  seasonMedia: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    media(
      season: $season
      seasonYear: $seasonYear
      type: ANIME
      sort: POPULARITY_DESC
      isAdult: $isAdult
    ) {
      id
      title { romaji english native }
      status
      season
      seasonYear
      episodes
      duration
      format
      genres
      averageScore
      coverImage { extraLarge large medium color }
      startDate { year month day }
      endDate { year month day }
      nextAiringEpisode { id airingAt timeUntilAiring episode }
      siteUrl
    }
  }
  nextSeasonMedia: Page(page: 1, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    media(
      season: $nextSeason
      seasonYear: $nextSeasonYear
      type: ANIME
      sort: POPULARITY_DESC
      isAdult: $isAdult
    ) {
      id
      title { romaji english native }
      status
      season
      seasonYear
      episodes
      duration
      format
      genres
      averageScore
      coverImage { extraLarge large medium color }
      startDate { year month day }
      endDate { year month day }
      nextAiringEpisode { id airingAt timeUntilAiring episode }
      siteUrl
    }
  }
}
"""

# Standalone query for airing schedule pagination (pages 2+)
QUERY_SCHEDULE_PAGE = """
query SchedulePage(
  $airingAt_greater: Int
  $airingAt_lesser: Int
  $page: Int
) {
  schedule: Page(page: $page, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    airingSchedules(
      airingAt_greater: $airingAt_greater
      airingAt_lesser: $airingAt_lesser
      sort: TIME
    ) {
      id
      airingAt
      timeUntilAiring
      episode
      mediaId
      media {
        id
        title { romaji english native }
        duration
        format
        genres
        coverImage { medium color }
        isAdult
        siteUrl
      }
    }
  }
}
"""

# User statistics, favourites, and manga list in one request (auth-only).
# Uses Viewer (authenticated user) for statistics/favourites to ensure
# full data access, and userName for the manga list.
QUERY_USER_STATS_AND_MANGA = """
query UserStatsAndManga($userName: String) {
  Viewer {
    statistics {
      anime {
        count
        episodesWatched
        minutesWatched
        meanScore
        genres(sort: COUNT_DESC) { genre count }
      }
      manga {
        count
        chaptersRead
        volumesRead
        meanScore
      }
    }
    favourites {
      anime(perPage: 5) {
        nodes {
          id
          title { romaji english native }
          coverImage { medium }
          siteUrl
        }
      }
      manga(perPage: 5) {
        nodes {
          id
          title { romaji english native }
          coverImage { medium }
          siteUrl
        }
      }
    }
  }
  mangaList: MediaListCollection(userName: $userName, type: MANGA) {
    lists {
      name
      isCustomList
      status
      entries {
        id
        mediaId
        status
        score
        progress
        progressVolumes
        repeat
        notes
        updatedAt
        media {
          id
          title { romaji english native }
          chapters
          volumes
          status
          format
          coverImage { large medium color }
          siteUrl
        }
      }
    }
  }
}
"""


# ---------------------------------------------------------------------------
# Exceptions
# ---------------------------------------------------------------------------


class AniListError(Exception):
    """Base exception for AniList API errors."""


class AniListAuthError(AniListError):
    """Raised when authentication fails (invalid or expired token)."""


class AniListRateLimitError(AniListError):
    """Raised when the API rate limit has been exceeded."""

    def __init__(self, retry_after: int = 60) -> None:
        self.retry_after = retry_after
        super().__init__(f"Rate limit exceeded — retry after {retry_after}s")


# ---------------------------------------------------------------------------
# Client
# ---------------------------------------------------------------------------


class AniListClient:
    """Async HTTP client for the AniList GraphQL API."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        access_token: str | None = None,
    ) -> None:
        self._session = session
        self._token = access_token

    @property
    def is_authenticated(self) -> bool:
        """Return True if an access token is configured."""
        return bool(self._token)

    async def query(
        self,
        query: str,
        variables: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Execute a GraphQL query and return the data payload."""
        headers: dict[str, str] = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if self._token:
            headers["Authorization"] = f"Bearer {self._token}"

        payload: dict[str, Any] = {"query": query}
        if variables:
            payload["variables"] = variables

        try:
            async with self._session.post(
                ANILIST_GRAPHQL_URL,
                json=payload,
                headers=headers,
            ) as resp:
                remaining = int(resp.headers.get("X-RateLimit-Remaining", 90))
                reset_ts = int(resp.headers.get("X-RateLimit-Reset", 0))

                if resp.status == 429:
                    retry_after = int(resp.headers.get("Retry-After", 60))
                    raise AniListRateLimitError(retry_after=retry_after)

                if resp.status == 403:
                    raise AniListError("AniList API returned 403 Forbidden")

                resp.raise_for_status()

                if remaining < RATE_LIMIT_BUFFER and reset_ts:
                    sleep_secs = max(0.0, reset_ts - time.time()) + 1.0
                    LOGGER.debug(
                        "Rate limit budget low (%d remaining), sleeping %.1fs",
                        remaining, sleep_secs,
                    )
                    await asyncio.sleep(sleep_secs)

                body = await resp.json(content_type=None)

                if "errors" in body:
                    errors: list[dict[str, Any]] = body["errors"]
                    LOGGER.debug("AniList API errors: %s", errors)
                    if any(e.get("status") in (401, 403) for e in errors):
                        raise AniListAuthError(str(errors))
                    raise AniListError(str(errors))

                return body.get("data", {})

        except (aiohttp.ClientError, asyncio.TimeoutError) as err:
            raise AniListError(f"Network error: {err}") from err

    async def get_viewer(self) -> dict[str, Any]:
        """Return the authenticated user's profile."""
        result = await self.query(QUERY_VIEWER)
        viewer = result.get("Viewer")
        if not viewer:
            raise AniListAuthError("Viewer query returned no data")
        return viewer

    async def fetch_public_data(
        self,
        airing_at_greater: int,
        airing_at_lesser: int,
        season: str,
        season_year: int,
        next_season: str,
        next_season_year: int,
        include_adult: bool = False,
    ) -> dict[str, Any]:
        """Fetch public airing schedule + current and next season anime."""
        return await self.query(
            QUERY_PUBLIC,
            variables={
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "season": season,
                "seasonYear": season_year,
                "nextSeason": next_season,
                "nextSeasonYear": next_season_year,
                "isAdult": include_adult if include_adult else False,
            },
        )

    async def fetch_combined_data(
        self,
        user_name: str,
        airing_at_greater: int,
        airing_at_lesser: int,
        season: str,
        season_year: int,
        next_season: str,
        next_season_year: int,
        include_adult: bool = False,
    ) -> dict[str, Any]:
        """Fetch watchlist + schedule + current and next season in one request."""
        return await self.query(
            QUERY_COMBINED,
            variables={
                "userName": user_name,
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "season": season,
                "seasonYear": season_year,
                "nextSeason": next_season,
                "nextSeasonYear": next_season_year,
                "isAdult": include_adult if include_adult else False,
            },
        )

    async def fetch_schedule_page(
        self,
        airing_at_greater: int,
        airing_at_lesser: int,
        page: int,
    ) -> dict[str, Any]:
        """Fetch a single page of the airing schedule (pagination, page 2+)."""
        return await self.query(
            QUERY_SCHEDULE_PAGE,
            variables={
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "page": page,
            },
        )

    async def fetch_user_stats_and_manga(
        self,
        user_name: str,
    ) -> dict[str, Any]:
        """Fetch user statistics, favourites, and manga list."""
        return await self.query(
            QUERY_USER_STATS_AND_MANGA,
            variables={"userName": user_name},
        )
