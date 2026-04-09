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
      isAdult: false
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
      isAdult: false
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

# Standalone query for schedule pagination (pages 2+)
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
        coverImage { medium color }
        isAdult
        siteUrl
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
        """Execute a GraphQL query and return the data payload.

        Handles rate-limit headers and raises typed exceptions for errors.
        """
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
                # Read rate limit info before consuming the body
                remaining = int(resp.headers.get("X-RateLimit-Remaining", 90))
                reset_ts = int(resp.headers.get("X-RateLimit-Reset", 0))

                if resp.status == 429:
                    retry_after = int(resp.headers.get("Retry-After", 60))
                    raise AniListRateLimitError(retry_after=retry_after)

                if resp.status == 403:
                    raise AniListError("AniList API returned 403 Forbidden — API may be unavailable")

                resp.raise_for_status()

                # Proactively throttle when the rate-limit budget runs low
                if remaining < RATE_LIMIT_BUFFER and reset_ts:
                    sleep_secs = max(0.0, reset_ts - time.time()) + 1.0
                    LOGGER.debug(
                        "Rate limit budget low (%d remaining), sleeping %.1fs until reset",
                        remaining,
                        sleep_secs,
                    )
                    await asyncio.sleep(sleep_secs)

                body = await resp.json(content_type=None)

                if "errors" in body:
                    errors: list[dict[str, Any]] = body["errors"]
                    LOGGER.debug("AniList API returned errors: %s", errors)
                    if any(e.get("status") in (401, 403) for e in errors):
                        raise AniListAuthError(str(errors))
                    raise AniListError(str(errors))

                return body.get("data", {})

        except (aiohttp.ClientError, asyncio.TimeoutError) as err:
            raise AniListError(f"Network error communicating with AniList: {err}") from err

    async def get_viewer(self) -> dict[str, Any]:
        """Return the authenticated user's profile via the Viewer query."""
        result = await self.query(QUERY_VIEWER)
        viewer = result.get("Viewer")
        if not viewer:
            raise AniListAuthError(
                "Viewer query returned no data — token may be invalid or revoked"
            )
        return viewer

    async def fetch_public_data(
        self,
        airing_at_greater: int,
        airing_at_lesser: int,
        season: str,
        season_year: int,
    ) -> dict[str, Any]:
        """Fetch public (unauthenticated) airing schedule and season anime."""
        return await self.query(
            QUERY_PUBLIC,
            variables={
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "season": season,
                "seasonYear": season_year,
            },
        )

    async def fetch_combined_data(
        self,
        user_name: str,
        airing_at_greater: int,
        airing_at_lesser: int,
        season: str,
        season_year: int,
    ) -> dict[str, Any]:
        """Fetch watchlist + airing schedule (page 1) + season anime in one request."""
        return await self.query(
            QUERY_COMBINED,
            variables={
                "userName": user_name,
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "season": season,
                "seasonYear": season_year,
            },
        )

    async def fetch_schedule_page(
        self,
        airing_at_greater: int,
        airing_at_lesser: int,
        page: int,
    ) -> dict[str, Any]:
        """Fetch a single page of the airing schedule (used for pagination, page 2+)."""
        return await self.query(
            QUERY_SCHEDULE_PAGE,
            variables={
                "airingAt_greater": airing_at_greater,
                "airingAt_lesser": airing_at_lesser,
                "page": page,
            },
        )
