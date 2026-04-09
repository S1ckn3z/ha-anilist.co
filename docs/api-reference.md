# API Reference

Complete Python module reference for the AniList Home Assistant integration (`custom_components/anilist`).

---

## const.py

Integration-wide constants: domain identifier, platform list, API endpoints, configuration keys, default values, and lookup tables.

### Constants

#### Core

```python
DOMAIN: Final = "anilist"
LOGGER: Final = logging.getLogger(__name__)
PLATFORMS: Final[list[Platform]] = [Platform.CALENDAR, Platform.SENSOR]
```

#### API Endpoints

```python
ANILIST_GRAPHQL_URL: Final = "https://graphql.anilist.co"
OAUTH2_AUTHORIZE_URL: Final = "https://anilist.co/api/v2/oauth/authorize"
OAUTH2_TOKEN_URL: Final = "https://anilist.co/api/v2/oauth/token"
```

#### Config Entry Data Keys

```python
CONF_ACCESS_TOKEN: Final = "access_token"
CONF_USER_ID: Final = "user_id"
CONF_USER_NAME: Final = "user_name"
```

#### Options Keys

```python
OPT_UPDATE_INTERVAL: Final = "update_interval"
OPT_TITLE_LANGUAGE: Final = "title_language"
OPT_INCLUDE_ADULT: Final = "include_adult"
OPT_WATCHLIST_STATUSES: Final = "watchlist_statuses"
OPT_SHOW_SEASON_CALENDAR: Final = "show_season_calendar"
OPT_SHOW_AIRING_CALENDAR: Final = "show_airing_calendar"
OPT_AIRING_WINDOW_DAYS: Final = "airing_window_days"
OPT_MEDIA_FORMATS: Final = "media_formats"
OPT_EXCLUDED_GENRES: Final = "excluded_genres"
OPT_SCORE_FORMAT: Final = "score_format"
OPT_MANGA_STATUSES: Final = "manga_statuses"
OPT_CALENDAR_REMINDER_OFFSET: Final = "calendar_reminder_offset"
```

#### Default Option Values

```python
DEFAULT_UPDATE_INTERVAL: Final = 15                              # minutes
DEFAULT_TITLE_LANGUAGE: Final = "romaji"
DEFAULT_INCLUDE_ADULT: Final = False
DEFAULT_WATCHLIST_STATUSES: Final[list[str]] = ["CURRENT", "REPEATING"]
DEFAULT_SHOW_SEASON_CALENDAR: Final = True
DEFAULT_SHOW_AIRING_CALENDAR: Final = True
DEFAULT_AIRING_WINDOW_DAYS: Final = 7
DEFAULT_MEDIA_FORMATS: Final[list[str]] = []                     # empty = all formats
DEFAULT_EXCLUDED_GENRES: Final[list[str]] = []
DEFAULT_SCORE_FORMAT: Final = "POINT_10"
DEFAULT_MANGA_STATUSES: Final[list[str]] = ["CURRENT", "REPEATING"]
DEFAULT_CALENDAR_REMINDER_OFFSET: Final = 0                      # 0 = no reminder
```

#### Media Formats

```python
ALL_MEDIA_FORMATS: Final[list[str]] = [
    "TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC",
]
```

#### Events

```python
EVENT_EPISODE_AIRING: Final = "anilist_episode_airing"
```

Fired on the Home Assistant event bus when a previously unseen airing entry has an `airing_at` timestamp in the past. Event data includes `media_id`, `title`, `episode`, `aired_at`, `cover_image`, and `site_url`.

#### Season Mapping

```python
MONTH_TO_SEASON: Final[dict[int, str]] = {
    1: "WINTER",  2: "WINTER",  3: "WINTER",
    4: "SPRING",  5: "SPRING",  6: "SPRING",
    7: "SUMMER",  8: "SUMMER",  9: "SUMMER",
    10: "FALL",   11: "FALL",   12: "FALL",
}

SEASON_ORDER: Final[list[str]] = ["WINTER", "SPRING", "SUMMER", "FALL"]
```

#### Rate Limiting

```python
RATE_LIMIT_BUFFER: Final = 5
DEFAULT_EPISODE_DURATION: Final = 24
```

`RATE_LIMIT_BUFFER` -- stop sending requests when the `X-RateLimit-Remaining` header drops below this value.

`DEFAULT_EPISODE_DURATION` -- fallback episode duration in minutes when the API does not provide one.

---

## api.py

Async HTTP client for the AniList GraphQL API. Handles authentication, rate limiting, pagination queries, and error classification.

### Classes

#### `AniListError(Exception)`

Base exception for all AniList API errors (network failures, GraphQL errors, HTTP errors).

#### `AniListAuthError(AniListError)`

Raised when authentication fails -- invalid or expired token. Triggered by HTTP 401/403 responses or GraphQL errors with status 401/403.

#### `AniListRateLimitError(AniListError)`

Raised when the API returns HTTP 429 (rate limit exceeded).

```python
def __init__(self, retry_after: int = 60) -> None
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `retry_after` | `int` | `60` | Seconds to wait before retrying. Read from the `Retry-After` header. |

**Attributes:**

- `retry_after: int` -- seconds until the rate limit window resets.

#### `AniListClient`

Async HTTP client wrapping AniList's GraphQL API.

```python
def __init__(
    self,
    session: aiohttp.ClientSession,
    access_token: str | None = None,
) -> None
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `session` | `aiohttp.ClientSession` | *(required)* | aiohttp session for making HTTP requests. |
| `access_token` | `str \| None` | `None` | OAuth2 bearer token. `None` for public-only mode. |

**Properties:**

```python
@property
def is_authenticated(self) -> bool
```

Returns `True` if an access token is configured.

**Methods:**

```python
async def query(
    self,
    query: str,
    variables: dict[str, Any] | None = None,
) -> dict[str, Any]
```

Execute a raw GraphQL query against the AniList API. Returns the `data` payload from the response. Raises `AniListAuthError` on 401/403, `AniListRateLimitError` on 429, and `AniListError` on all other failures. Automatically sleeps when `X-RateLimit-Remaining` drops below `RATE_LIMIT_BUFFER`.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | `str` | *(required)* | GraphQL query string. |
| `variables` | `dict[str, Any] \| None` | `None` | GraphQL variables dict. |

```python
async def get_viewer(self) -> dict[str, Any]
```

Fetch the authenticated user's profile via the `Viewer` query. Returns a dict containing `id`, `name`, `avatar`, `bannerImage`, and `mediaListOptions`. Raises `AniListAuthError` if the viewer query returns no data.

```python
async def fetch_public_data(
    self,
    airing_at_greater: int,
    airing_at_lesser: int,
    season: str,
    season_year: int,
    next_season: str,
    next_season_year: int,
    include_adult: bool = False,
) -> dict[str, Any]
```

Fetch public airing schedule (page 1) plus current and next season anime. Does not require authentication.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `airing_at_greater` | `int` | *(required)* | Unix timestamp -- lower bound for airing window. |
| `airing_at_lesser` | `int` | *(required)* | Unix timestamp -- upper bound for airing window. |
| `season` | `str` | *(required)* | Current AniList `MediaSeason` value (`WINTER`, `SPRING`, `SUMMER`, `FALL`). |
| `season_year` | `int` | *(required)* | Calendar year for the current season. |
| `next_season` | `str` | *(required)* | Next AniList `MediaSeason` value. |
| `next_season_year` | `int` | *(required)* | Calendar year for the next season. |
| `include_adult` | `bool` | `False` | Whether to include adult-rated media. |

```python
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
) -> dict[str, Any]
```

Fetch watchlist, airing schedule (page 1), and both seasons in a single GraphQL request. Requires authentication.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `user_name` | `str` | *(required)* | AniList username for the watchlist query. |
| *(remaining)* | | | Same as `fetch_public_data`. |

```python
async def fetch_schedule_page(
    self,
    airing_at_greater: int,
    airing_at_lesser: int,
    page: int,
) -> dict[str, Any]
```

Fetch a single page of the airing schedule. Used for pagination (pages 2+).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `airing_at_greater` | `int` | *(required)* | Unix timestamp -- lower bound. |
| `airing_at_lesser` | `int` | *(required)* | Unix timestamp -- upper bound. |
| `page` | `int` | *(required)* | Page number to fetch. |

```python
async def fetch_user_stats_and_manga(
    self,
    user_name: str,
) -> dict[str, Any]
```

Fetch user statistics, favourite anime/manga, and the full manga list in one request. Requires authentication (uses `Viewer` for stats/favourites, `userName` for manga list).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `user_name` | `str` | *(required)* | AniList username for the manga list query. |

### Constants

```python
QUERY_VIEWER: str
```
GraphQL query that fetches the authenticated user's profile (`id`, `name`, `avatar`, `bannerImage`, `mediaListOptions.scoreFormat`).

```python
QUERY_PUBLIC: str
```
GraphQL query that fetches the airing schedule (page 1, sorted by time), current season anime, and next season anime. All three blocks include pagination info. Does not require authentication.

```python
QUERY_COMBINED: str
```
GraphQL query that fetches the user's full anime watchlist (`MediaListCollection`), airing schedule (page 1), current season anime, and next season anime in a single request. Requires the `userName` variable.

```python
QUERY_SCHEDULE_PAGE: str
```
Standalone GraphQL query for fetching a single page of the airing schedule. Used for pagination (pages 2+). Accepts `airingAt_greater`, `airingAt_lesser`, and `page` variables.

```python
QUERY_USER_STATS_AND_MANGA: str
```
GraphQL query that fetches user statistics (`anime.count`, `anime.episodesWatched`, `anime.minutesWatched`, `anime.meanScore`, `anime.genres`, `manga.count`, `manga.chaptersRead`, `manga.volumesRead`, `manga.meanScore`), favourite anime/manga (top 5 each), and the full manga list (`MediaListCollection`). Uses `Viewer` for stats/favourites and `userName` for the manga list.

---

## coordinator.py

Data update coordinator and data models. Orchestrates all API calls, parses responses into typed dataclasses, manages schedule pagination, fires airing events, and applies user-configured filters.

### Classes

#### `AiringEntry`

Dataclass representing a single episode airing event from AniList's `AiringSchedule`.

```python
@dataclass
class AiringEntry:
    id: int
    airing_at: int               # Unix timestamp (seconds)
    time_until_airing: int
    episode: int
    media_id: int
    media: dict[str, Any]
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | AniList airing schedule entry ID. |
| `airing_at` | `int` | Unix timestamp (seconds) when the episode airs. |
| `time_until_airing` | `int` | Seconds until the episode airs (from query time). |
| `episode` | `int` | Episode number. |
| `media_id` | `int` | AniList media ID. |
| `media` | `dict[str, Any]` | Raw media object from the API (title, duration, format, coverImage, genres, isAdult, siteUrl). |

#### `WatchlistEntry`

Dataclass representing a single entry from the authenticated user's anime list.

```python
@dataclass
class WatchlistEntry:
    id: int
    media_id: int
    status: str                  # CURRENT, PLANNING, COMPLETED, DROPPED, PAUSED, REPEATING
    score: float
    progress: int
    notes: str | None
    updated_at: int
    media: dict[str, Any]
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | AniList media list entry ID. |
| `media_id` | `int` | AniList media ID. |
| `status` | `str` | List status: `CURRENT`, `PLANNING`, `COMPLETED`, `DROPPED`, `PAUSED`, or `REPEATING`. |
| `score` | `float` | User's score for this entry. |
| `progress` | `int` | Number of episodes watched. |
| `notes` | `str \| None` | User's notes for this entry. |
| `updated_at` | `int` | Unix timestamp of last update. |
| `media` | `dict[str, Any]` | Raw media object from the API. |

#### `MangaEntry`

Dataclass representing a single entry from the authenticated user's manga list.

```python
@dataclass
class MangaEntry:
    id: int
    media_id: int
    status: str
    score: float
    progress: int                # chapters read
    progress_volumes: int        # volumes read
    notes: str | None
    updated_at: int
    media: dict[str, Any]
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | AniList media list entry ID. |
| `media_id` | `int` | AniList media ID. |
| `status` | `str` | List status (same values as `WatchlistEntry`). |
| `score` | `float` | User's score for this entry. |
| `progress` | `int` | Number of chapters read. |
| `progress_volumes` | `int` | Number of volumes read. |
| `notes` | `str \| None` | User's notes for this entry. |
| `updated_at` | `int` | Unix timestamp of last update. |
| `media` | `dict[str, Any]` | Raw media object from the API. |

#### `UserStats`

Dataclass for aggregated statistics from the user's AniList profile.

```python
@dataclass
class UserStats:
    anime_count: int
    episodes_watched: int
    minutes_watched: int
    anime_mean_score: float
    top_genres: list[str]
    manga_count: int
    chapters_read: int
    volumes_read: int
    manga_mean_score: float
    favourite_anime: list[dict[str, Any]]
```

| Field | Type | Description |
|-------|------|-------------|
| `anime_count` | `int` | Total number of anime on the user's list. |
| `episodes_watched` | `int` | Total episodes watched. |
| `minutes_watched` | `int` | Total minutes of anime watched. |
| `anime_mean_score` | `float` | Mean score across all scored anime (0--100 scale). |
| `top_genres` | `list[str]` | Top 5 genre names by watch count. |
| `manga_count` | `int` | Total number of manga on the user's list. |
| `chapters_read` | `int` | Total chapters read. |
| `volumes_read` | `int` | Total volumes read. |
| `manga_mean_score` | `float` | Mean score across all scored manga (0--100 scale). |
| `favourite_anime` | `list[dict[str, Any]]` | Up to 5 favourite anime entries (each with `id`, `title`, `coverImage`, `siteUrl`). |

#### `AniListData`

Dataclass holding all data collected during a single coordinator update cycle.

```python
@dataclass
class AniListData:
    airing_schedule: list[AiringEntry] = field(default_factory=list)
    season_anime: list[dict[str, Any]] = field(default_factory=list)
    next_season_anime: list[dict[str, Any]] = field(default_factory=list)
    watchlist: list[WatchlistEntry] | None = None
    manga_list: list[MangaEntry] | None = None
    user_stats: UserStats | None = None
    viewer: dict[str, Any] | None = None
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `airing_schedule` | `list[AiringEntry]` | `[]` | All airing entries in the configured window. |
| `season_anime` | `list[dict[str, Any]]` | `[]` | Current season anime sorted by popularity. |
| `next_season_anime` | `list[dict[str, Any]]` | `[]` | Next season anime sorted by popularity. |
| `watchlist` | `list[WatchlistEntry] \| None` | `None` | User's anime list. `None` when unauthenticated. |
| `manga_list` | `list[MangaEntry] \| None` | `None` | User's manga list. `None` when unauthenticated. |
| `user_stats` | `UserStats \| None` | `None` | User statistics. `None` when unauthenticated. |
| `viewer` | `dict[str, Any] \| None` | `None` | Viewer profile. `None` when unauthenticated. |

#### `AniListConfigEntry`

Type alias for a config entry whose `runtime_data` is an `AniListCoordinator`.

```python
type AniListConfigEntry = ConfigEntry[AniListCoordinator]
```

#### `AniListCoordinator(DataUpdateCoordinator[AniListData])`

Central coordinator that manages all AniList data fetches. Extends Home Assistant's `DataUpdateCoordinator` with `AniListData` as the data type.

```python
def __init__(
    self,
    hass: HomeAssistant,
    entry: AniListConfigEntry,
    client: AniListClient,
) -> None
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `hass` | `HomeAssistant` | Home Assistant instance. |
| `entry` | `AniListConfigEntry` | The config entry for this integration instance. |
| `client` | `AniListClient` | Configured API client. |

**Instance attributes:**

- `client: AniListClient` -- the API client.
- `config_entry: AniListConfigEntry` -- the config entry.

**Methods:**

```python
async def _async_setup(self) -> None
```

One-time setup hook called before the first data fetch. Fetches the viewer identity if authenticated. Raises `ConfigEntryAuthFailed` if the token is invalid.

```python
async def _fetch_all_schedule_pages(
    self,
    first_schedule_block: dict[str, Any],
    airing_at_greater: int,
    airing_at_lesser: int,
) -> list[AiringEntry]
```

Collects all airing schedule entries across all pages. Parses the first page from `first_schedule_block`, then fetches additional pages while `hasNextPage` is `True`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `first_schedule_block` | `dict[str, Any]` | The `schedule` block from the initial API response (page 1). |
| `airing_at_greater` | `int` | Unix timestamp -- lower bound for the airing window. |
| `airing_at_lesser` | `int` | Unix timestamp -- upper bound for the airing window. |

```python
def _fire_new_airing_events(self, data: AniListData) -> None
```

Fire Home Assistant events (`anilist_episode_airing`) for episodes that have aired since the last update cycle. Tracks already-fired entry IDs in `_fired_airing_ids` to prevent duplicates.

```python
def _apply_filters(
    self,
    schedule: list[AiringEntry],
    season_anime: list[dict[str, Any]],
    next_season_anime: list[dict[str, Any]],
) -> tuple[list[AiringEntry], list[dict[str, Any]], list[dict[str, Any]]]
```

Apply media format and excluded genre filters from the user's options. If `OPT_MEDIA_FORMATS` is non-empty, only schedule entries with a matching format are kept. If `OPT_EXCLUDED_GENRES` is non-empty, season anime with any excluded genre are removed.

```python
async def _async_update_data(self) -> AniListData
```

Main update method called by the coordinator on each polling interval. Executes the appropriate API call path (authenticated or public), handles pagination, applies filters, fires airing events, and returns the assembled `AniListData`. Raises `ConfigEntryAuthFailed` on auth errors, `UpdateFailed` on rate limit or generic API errors.

### Functions

```python
def _get_current_season_year() -> tuple[str, int]
```

Return the current AniList `MediaSeason` and calendar year based on UTC time. Uses the `MONTH_TO_SEASON` mapping.

```python
def _get_next_season_year() -> tuple[str, int]
```

Return the next AniList `MediaSeason` and year. Wraps around from `FALL` to `WINTER` of the following year.

```python
def _get_airing_window(days: int = DEFAULT_AIRING_WINDOW_DAYS) -> tuple[int, int]
```

Return a `(now_ts, future_ts)` tuple of Unix timestamps defining the airing schedule query window.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `days` | `int` | `7` | Number of days into the future for the window. |

```python
def _get_title(media: dict[str, Any]) -> str
```

Extract a display title from a media dict with fallback chain: `romaji` -> `english` -> `native` -> `"Unknown"`.

```python
def _parse_airing_schedule(schedule_block: dict[str, Any]) -> list[AiringEntry]
```

Parse the `Page > airingSchedules` block from an API response into a list of `AiringEntry` objects. Skips entries without a `media` object.

```python
def _parse_watchlist(watchlist_block: dict[str, Any]) -> list[WatchlistEntry]
```

Flatten all lists from a `MediaListCollection` response block into a flat list of `WatchlistEntry` objects.

```python
def _parse_manga_list(manga_block: dict[str, Any]) -> list[MangaEntry]
```

Flatten all lists from a manga `MediaListCollection` response block into a flat list of `MangaEntry` objects.

```python
def _parse_user_stats(user_block: dict[str, Any]) -> UserStats
```

Parse the `Viewer` statistics and favourites block into a `UserStats` object. Extracts top 5 genres by count.

---

## sensor.py

Sensor platform for the AniList integration. Defines 13 sensor entity descriptions, helper functions for computing values and attributes, and the `AniListSensor` entity class.

### Classes

#### `AniListSensorEntityDescription(SensorEntityDescription)`

Extended sensor entity description with typed value extractors.

```python
@dataclass(kw_only=True)
class AniListSensorEntityDescription(SensorEntityDescription):
    value_fn: Callable[[AniListData, str], Any] = lambda _data, _lang: None
    attrs_fn: Callable[[AniListData, str], dict[str, Any] | None] | None = None
    requires_auth: bool = False
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value_fn` | `Callable[[AniListData, str], Any]` | `lambda: None` | Function that computes the sensor's native value. Receives `(data, language)`. |
| `attrs_fn` | `Callable[[AniListData, str], dict[str, Any] \| None] \| None` | `None` | Function that computes `extra_state_attributes`. Receives `(data, language)`. |
| `requires_auth` | `bool` | `False` | If `True`, the sensor is only created for authenticated config entries. |

#### `AniListSensor(CoordinatorEntity[AniListCoordinator], SensorEntity)`

A sensor entity backed by the AniList coordinator.

```python
def __init__(
    self,
    coordinator: AniListCoordinator,
    description: AniListSensorEntityDescription,
) -> None
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `coordinator` | `AniListCoordinator` | The data update coordinator. |
| `description` | `AniListSensorEntityDescription` | The entity description defining this sensor's behavior. |

**Properties:**

- `native_value -> Any` -- computes the sensor value via `description.value_fn`. Applies score formatting for `anime_mean_score` and `manga_mean_score` keys.
- `extra_state_attributes -> dict[str, Any] | None` -- computes extra attributes via `description.attrs_fn`.

**Private methods:**

- `_lang() -> str` -- returns the configured title language from options.
- `_score_format() -> str` -- returns the configured score format from options.

### Constants

#### `SENSOR_DESCRIPTIONS`

```python
SENSOR_DESCRIPTIONS: tuple[AniListSensorEntityDescription, ...]
```

Tuple of 13 sensor entity descriptions:

| Key | Icon | Unit | Auth | Value function | Attributes function |
|-----|------|------|------|----------------|---------------------|
| `airing_today` | `mdi:television-play` | `anime` | No | `_count_airing_today` | `_attrs_season_anime` |
| `episodes_this_week` | `mdi:calendar-week` | `episodes` | No | `len(data.airing_schedule)` | `_attrs_airing_schedule` |
| `next_episode_title` | `mdi:television-shimmer` | -- | No | `_next_episode_title` | -- |
| `next_episode_time` | `mdi:clock-start` | -- (timestamp) | No | `_next_episode_time` | -- |
| `watching_count` | `mdi:eye` | `anime` | Yes | `_watching_count` | `_attrs_watchlist` |
| `manga_reading_count` | `mdi:book-open-page-variant` | `manga` | Yes | `_manga_reading_count` | `_attrs_manga_list` |
| `total_anime_watched` | `mdi:television-classic` | `anime` | Yes | `_total_anime_watched` | -- |
| `total_episodes_watched` | `mdi:play-circle-outline` | `episodes` | Yes | `_total_episodes_watched` | -- |
| `total_hours_watched` | `mdi:clock-outline` | `h` | Yes | `_total_hours_watched` | -- |
| `anime_mean_score` | `mdi:star-half-full` | -- | Yes | `_anime_mean_score` | -- |
| `manga_mean_score` | `mdi:star-half-full` | -- | Yes | `_manga_mean_score` | -- |
| `chapters_read` | `mdi:book-check` | `chapters` | Yes | `_chapters_read` | -- |
| `top_genre` | `mdi:tag-multiple` | -- | Yes | `_top_genre` | `_attrs_top_genre` |

### Functions

#### Helper Functions

```python
def _get_title(media: dict[str, Any], language: str) -> str
```

Extract a display title with fallback chain: `language` -> `romaji` -> `english` -> `native` -> `"Unknown"`.

```python
def _next_airing_entry(data: AniListData) -> AiringEntry | None
```

Return the next upcoming `AiringEntry` (smallest `airing_at` in the future), or `None` if none are upcoming.

```python
def _count_airing_today(data: AniListData) -> int
```

Count how many airing schedule entries fall on today's date (UTC).

```python
def _format_score(score: float, score_format: str) -> str | float | None
```

Format a raw AniList mean score (0--100 scale) to the configured display format. Returns `None` for unscored (zero) values.

| `score_format` | Output example | Description |
|----------------|----------------|-------------|
| `"POINT_100"` | `89.1` | Raw score rounded to 1 decimal. |
| `"POINT_10"` | `8.9` | Score divided by 10, rounded to 1 decimal. |
| `"POINT_5"` | `4.5` | Score divided by 20, rounded to 1 decimal. |
| `"SMILEY"` | `"..."` | Returns a smiley emoji based on threshold (>= 75, >= 50, < 50). |

#### Value Functions

All value functions have the signature `(data: AniListData, lang: str) -> <return_type>`.

```python
def _next_episode_title(data: AniListData, lang: str) -> str | None
```
Title of the next airing episode, or `None`.

```python
def _next_episode_time(data: AniListData, _lang: str) -> datetime | None
```
UTC datetime of the next airing episode, or `None`.

```python
def _watching_count(data: AniListData, _lang: str) -> int | None
```
Count of entries with `status == "CURRENT"` in the watchlist. `None` if unauthenticated.

```python
def _manga_reading_count(data: AniListData, _lang: str) -> int | None
```
Count of entries with `status == "CURRENT"` in the manga list. `None` if unauthenticated.

```python
def _total_anime_watched(data: AniListData, _lang: str) -> int | None
```
Total anime count from user stats. `None` if unauthenticated.

```python
def _total_episodes_watched(data: AniListData, _lang: str) -> int | None
```
Total episodes watched from user stats. `None` if unauthenticated.

```python
def _total_hours_watched(data: AniListData, _lang: str) -> float | None
```
Total hours watched (minutes / 60, rounded to 1 decimal). `None` if unauthenticated.

```python
def _anime_mean_score(data: AniListData, _lang: str) -> float | None
```
Anime mean score from user stats. `None` if unauthenticated.

```python
def _manga_mean_score(data: AniListData, _lang: str) -> float | None
```
Manga mean score from user stats. `None` if unauthenticated.

```python
def _chapters_read(data: AniListData, _lang: str) -> int | None
```
Total chapters read from user stats. `None` if unauthenticated.

```python
def _top_genre(data: AniListData, _lang: str) -> str | None
```
The user's top genre (first entry in `top_genres`). `None` if unauthenticated or empty.

#### Attribute Functions

All attribute functions have the signature `(data: AniListData, lang: str) -> dict[str, Any] | None`.

```python
def _attrs_airing_schedule(data: AniListData, lang: str) -> dict[str, Any] | None
```
Returns `{"airing_schedule": [...], "next_airing": {...} | None}`. Each schedule entry includes `media_id`, `title`, `episode`, `airing_at` (ISO 8601), `cover_image`, `site_url`, and `duration`.

```python
def _attrs_watchlist(data: AniListData, lang: str) -> dict[str, Any] | None
```
Returns `{"watchlist": [...]}` with each entry containing `media_id`, `title`, `status`, `progress`, `episodes`, `score`, `cover_image`, `site_url`. Returns `None` if unauthenticated.

```python
def _attrs_season_anime(data: AniListData, lang: str) -> dict[str, Any] | None
```
Returns `{"season_anime": [...]}` with each entry containing `id`, `title`, `average_score`, `episodes`, `format`, `genres`, `cover_image`, `site_url`, `next_airing_episode`.

```python
def _attrs_manga_list(data: AniListData, lang: str) -> dict[str, Any] | None
```
Returns `{"manga_list": [...]}` with each entry containing `media_id`, `title`, `status`, `progress`, `progress_volumes`, `chapters`, `volumes`, `score`, `cover_image`, `site_url`. Returns `None` if unauthenticated.

```python
def _attrs_top_genre(data: AniListData, _lang: str) -> dict[str, Any] | None
```
Returns `{"top_genres": [...], "favourite_anime": [...], "viewer_name": str, "viewer_avatar": str}`. Returns `None` if unauthenticated.

### Platform Setup

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None
```

Set up AniList sensor entities from a config entry. Creates an `AniListSensor` for each description in `SENSOR_DESCRIPTIONS`, skipping `requires_auth=True` descriptions when the client is unauthenticated.

---

## calendar.py

Calendar platform for the AniList integration. Provides four calendar entities: airing schedule, season anime, watchlist-filtered airing, and manga reading list.

### Classes

#### `AiringCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity)`

Calendar showing every airing episode in the configured airing window.

```python
def __init__(
    self,
    coordinator: AniListCoordinator,
    entry: AniListConfigEntry,
) -> None
```

**Properties:**

- `event -> CalendarEvent | None` -- the next upcoming airing event.

**Methods:**

```python
async def async_get_events(
    self,
    hass: HomeAssistant,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
) -> list[CalendarEvent]
```

Return all airing events that overlap the given time range.

#### `SeasonCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity)`

Calendar showing current and next season anime via their `nextAiringEpisode` data.

```python
def __init__(
    self,
    coordinator: AniListCoordinator,
    entry: AniListConfigEntry,
) -> None
```

**Properties:**

- `event -> CalendarEvent | None` -- the next upcoming season anime episode.

**Methods:**

```python
async def async_get_events(
    self,
    hass: HomeAssistant,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
) -> list[CalendarEvent]
```

Return all season anime events that overlap the given time range.

**Private methods:**

- `_build_events_from_list(anime_list, lang, label, offset) -> list[CalendarEvent]` -- converts a list of anime dicts to calendar events.
- `_all_season_events(lang, offset) -> list[CalendarEvent]` -- combines current and next season events.

#### `WatchlistCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity)`

Calendar showing airing episodes filtered to only media on the user's watchlist. Only created for authenticated entries.

```python
def __init__(
    self,
    coordinator: AniListCoordinator,
    entry: AniListConfigEntry,
) -> None
```

**Properties:**

- `event -> CalendarEvent | None` -- the next upcoming episode for a watchlisted anime.

**Methods:**

```python
async def async_get_events(
    self,
    hass: HomeAssistant,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
) -> list[CalendarEvent]
```

Return watchlist-filtered airing events that overlap the given time range.

**Private methods:**

- `_allowed_media_ids() -> set[int]` -- returns media IDs from the watchlist whose status matches `OPT_WATCHLIST_STATUSES`.

#### `MangaCalendarEntity(CoordinatorEntity[AniListCoordinator], CalendarEntity)`

Calendar showing manga entries as all-day events on their last-updated date. Only created for authenticated entries.

```python
def __init__(
    self,
    coordinator: AniListCoordinator,
    entry: AniListConfigEntry,
) -> None
```

**Properties:**

- `event -> CalendarEvent | None` -- the most recently updated manga entry (on or before today).

**Methods:**

```python
async def async_get_events(
    self,
    hass: HomeAssistant,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
) -> list[CalendarEvent]
```

Return manga events that overlap the given date range.

**Private methods:**

- `_allowed_statuses() -> set[str]` -- returns the set of allowed manga statuses from `OPT_MANGA_STATUSES`.
- `_manga_events(lang) -> list[CalendarEvent]` -- builds all manga calendar events from the current data.

### Functions

```python
def _get_title(media: dict[str, Any], language: str) -> str
```
Extract a display title with the same fallback chain as `sensor._get_title`.

```python
def _get_language(entry: AniListConfigEntry) -> str
```
Return the configured title language from the entry's options.

```python
def _get_reminder_offset(entry: AniListConfigEntry) -> int
```
Return the configured calendar reminder offset (in minutes) from the entry's options.

```python
def _make_device_info(entry: AniListConfigEntry) -> DeviceInfo
```
Build a `DeviceInfo` dict for the AniList service device.

```python
def _build_alarm(offset_minutes: int) -> list | None
```
Build a `CalendarAlarm` list if HA alarm support is available and offset > 0. Returns `None` otherwise.

```python
def _airing_entry_to_event(
    entry: AiringEntry,
    language: str,
    reminder_offset: int = 0,
) -> CalendarEvent
```
Convert an `AiringEntry` to a `CalendarEvent`. Uses `DEFAULT_EPISODE_DURATION` (24 min) as fallback duration. Summary format: `"Title -- Episode N of M"`.

### Platform Setup

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None
```

Set up AniList calendar entities. Creates `AiringCalendarEntity` and `SeasonCalendarEntity` based on options. Creates `WatchlistCalendarEntity` and `MangaCalendarEntity` only for authenticated entries.

---

## config_flow.py

Config flow (setup wizard) and options flow for the AniList integration. Supports OAuth2 login and a public-only mode.

### Classes

#### `AniListConfigFlow(AbstractOAuth2FlowHandler, domain=DOMAIN)`

Handles the config flow for AniList. Supports two modes: OAuth2 (full account login) and public-only (no credentials, airing schedule and season data only).

```python
DOMAIN = "anilist"
VERSION = 1
```

**Properties:**

- `logger` -- returns the integration logger.

**Methods (steps):**

```python
async def async_step_user(
    self,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult
```
Initial step. Shows a menu with two options: `oauth` and `public_only`.

```python
async def async_step_oauth(
    self,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult
```
Initiates the OAuth2 authorization code flow by delegating to `async_step_pick_implementation`.

```python
async def async_step_public_only(
    self,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult
```
Creates a public-only config entry with unique ID `"anilist_public"` and empty data. Aborts if already configured.

```python
async def async_oauth_create_entry(
    self,
    data: dict[str, Any],
) -> ConfigFlowResult
```
Called after successful OAuth2 authorization. Validates the token via a `Viewer` query, sets the unique ID to the user's AniList ID, and creates the config entry with the token, `CONF_USER_ID`, and `CONF_USER_NAME`.

```python
async def async_step_reauth(
    self,
    entry_data: dict[str, Any],
) -> ConfigFlowResult
```
Entry point for re-authentication after token expiry.

```python
async def async_step_reauth_confirm(
    self,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult
```
Shows a confirmation form, then restarts the OAuth2 flow.

```python
@staticmethod
@callback
def async_get_options_flow(config_entry: ConfigEntry) -> AniListOptionsFlow
```
Returns an `AniListOptionsFlow` instance.

#### `AniListOptionsFlow(OptionsFlowWithReload)`

Handles the options flow. Extends `OptionsFlowWithReload` which automatically reloads the integration when options are saved.

```python
async def async_step_init(
    self,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult
```

Presents a form with all configurable options:

| Option key | Selector | Range/Values |
|------------|----------|--------------|
| `update_interval` | `NumberSelector` (slider) | 5--60, step 5 |
| `title_language` | `SelectSelector` (dropdown) | `romaji`, `english`, `native` |
| `include_adult` | `BooleanSelector` | `True` / `False` |
| `watchlist_statuses` | `SelectSelector` (multi, list) | `CURRENT`, `PLANNING`, `COMPLETED`, `DROPPED`, `PAUSED`, `REPEATING` |
| `show_season_calendar` | `BooleanSelector` | `True` / `False` |
| `show_airing_calendar` | `BooleanSelector` | `True` / `False` |
| `airing_window_days` | `NumberSelector` (slider) | 1--14, step 1 |
| `media_formats` | `SelectSelector` (multi, list) | `TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC` |
| `score_format` | `SelectSelector` (dropdown) | `POINT_10`, `POINT_100`, `POINT_5`, `SMILEY` |
| `manga_statuses` | `SelectSelector` (multi, list) | Same as `watchlist_statuses` |
| `calendar_reminder_offset` | `NumberSelector` (slider) | 0--60, step 5, unit `min` |

---

## application_credentials.py

OAuth2 application credentials for the AniList integration. Provides a custom OAuth2 implementation that sends the token exchange as JSON (required by AniList) and handles permanent bearer tokens.

### Constants

```python
AUTHORIZE_URL = "https://anilist.co/api/v2/oauth/authorize"
TOKEN_URL = "https://anilist.co/api/v2/oauth/token"
```

### Classes

#### `AniListOAuth2Implementation(LocalOAuth2Implementation)`

Custom OAuth2 implementation for AniList. Overrides token exchange to use JSON instead of form-encoded bodies, and disables token refresh since AniList issues permanent tokens.

**Methods:**

```python
async def async_resolve_external_data(self, external_data: dict) -> dict
```
Exchange the authorization code for tokens using a JSON POST body. Sends `grant_type`, `client_id`, `client_secret`, `redirect_uri`, and `code`.

```python
async def _async_refresh_token(self, token: dict) -> dict
```
Returns the existing token unchanged. AniList tokens are permanent and do not expire -- this prevents HA from attempting a `refresh_token` grant.

### Functions

```python
async def async_get_authorization_server(
    hass: HomeAssistant,
) -> AuthorizationServer
```

Return the AniList OAuth2 authorization server endpoints (`authorize_url` and `token_url`).

```python
async def async_get_auth_implementation(
    hass: HomeAssistant,
    auth_domain: str,
    credential: ClientCredential,
) -> AniListOAuth2Implementation
```

Return a configured `AniListOAuth2Implementation` instance using the provided client credentials.

| Parameter | Type | Description |
|-----------|------|-------------|
| `hass` | `HomeAssistant` | Home Assistant instance. |
| `auth_domain` | `str` | The authentication domain identifier. |
| `credential` | `ClientCredential` | The stored client ID and secret. |

---

## \_\_init\_\_.py

Integration entry point. Handles setup and teardown of config entries, creates the API client and coordinator, and registers the custom Lovelace card.

### Constants

```python
CARD_URL = "/anilist-card/anilist-card.js"
CARD_DIR = Path(__file__).parent / "www"
```

### Functions

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
) -> bool
```

Set up AniList from a config entry. Performs the following steps:

1. Creates an `AniListClient` with the session and access token (if present).
2. Creates an `AniListCoordinator` and runs `async_config_entry_first_refresh()` (which calls `_async_setup` then the first poll).
3. Stores the coordinator as `entry.runtime_data`.
4. Forwards setup to the `CALENDAR` and `SENSOR` platforms.
5. Registers the custom Lovelace card frontend resource (once per HA instance).

Returns `True` on success.

```python
async def async_unload_entry(
    hass: HomeAssistant,
    entry: AniListConfigEntry,
) -> bool
```

Unload a config entry by unloading the `CALENDAR` and `SENSOR` platforms.

```python
def _get_access_token(entry: AniListConfigEntry) -> str | None
```

Extract the access token from the config entry data. Supports two formats:

- **OAuth2 format:** `entry.data["token"]["access_token"]`
- **Legacy format:** `entry.data["access_token"]`

Returns `None` if no token is found.

```python
async def _register_card(hass: HomeAssistant) -> None
```

Register the custom Lovelace card frontend resource. Serves the built JS from the `www/` directory within the integration and auto-registers it as a Lovelace module resource via the storage collection. Falls back to a debug log message if Lovelace resources are not available (YAML mode).
