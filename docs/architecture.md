# System Architecture

This document describes the internal architecture of the AniList Home Assistant
integration, covering data flow, module responsibilities, API usage patterns,
data models, the custom Lovelace card, authentication, and the event system.

---

## 1. System Overview

The AniList integration is a Home Assistant custom integration distributed via
HACS. It consists of two major parts:

- **Python backend** -- a `cloud_polling` integration that communicates with the
  AniList GraphQL API, parses responses into typed dataclasses, and exposes the
  data as HA sensor and calendar entities.
- **TypeScript frontend** -- a custom Lovelace card (`anilist-card`) built with
  Lit 3.x that reads entity state and attributes from the HA state machine and
  renders five distinct views.

Data flows in a single direction: the AniList API is the sole external data
source, the coordinator polls it on a configurable interval, sensors and
calendars reflect the coordinator's data, and the card reads from HA state.

---

## 2. Data Flow Diagram

```
  AniList GraphQL API
  https://graphql.anilist.co
          |
          | POST (JSON)
          v
  AniListClient (api.py)
  - Rate limit handling
  - Error classification
  - Pagination (schedule pages 2+)
          |
          v
  AniListCoordinator (coordinator.py)
  - DataUpdateCoordinator subclass
  - Parses raw dicts into dataclasses
  - Fires anilist_episode_airing events
  - Applies format/genre filters
          |
  +-------+--------+
  |                |
  v                v
Sensors          Calendars
(sensor.py)      (calendar.py)
13 entities      4 entities
  |                |
  v                v
  HA State Machine
  (entity states + attributes)
          |
          v
  AniList Card (anilist-card.ts)
  - Lit 3.x web component
  - 5 views: airing, watchlist, season, profile, manga
  - 60-second refresh timer for countdown updates
```

---

## 3. Module Overview

| Module | File | Purpose |
|--------|------|---------|
| Entry point | `__init__.py` | `async_setup_entry` / `async_unload_entry`, extracts access token from OAuth2 or legacy entry data, registers the custom Lovelace card as a frontend resource |
| API client | `api.py` | `AniListClient` class with GraphQL query execution, rate limit monitoring (`X-RateLimit-Remaining`), auto-sleep when budget is low, custom exception hierarchy (`AniListError`, `AniListAuthError`, `AniListRateLimitError`), all GraphQL query strings |
| Coordinator | `coordinator.py` | `AniListCoordinator` (extends `DataUpdateCoordinator[AniListData]`), typed dataclasses (`AniListData`, `AiringEntry`, `WatchlistEntry`, `MangaEntry`, `UserStats`), schedule pagination, airing event firing, format/genre filtering |
| Config flow | `config_flow.py` | `AniListConfigFlow` (extends `AbstractOAuth2FlowHandler`) with menu step (OAuth2 or public-only), OAuth2 callback with Viewer validation, re-auth flow; `AniListOptionsFlow` (extends `OptionsFlowWithReload`) with 11 configurable options |
| Sensors | `sensor.py` | 13 sensor entities using `SensorEntityDescription` with typed `value_fn` / `attrs_fn` callbacks; 4 public sensors, 9 auth-only sensors; structured data exposed via `extra_state_attributes` |
| Calendars | `calendar.py` | 4 calendar entities: `AiringCalendarEntity`, `SeasonCalendarEntity`, `WatchlistCalendarEntity`, `MangaCalendarEntity`; optional `CalendarAlarm` support (HA 2024.3+) |
| Constants | `const.py` | Domain name, API URLs, OAuth2 endpoints, option keys and defaults, season mapping, rate limit buffer, media format list, event name |
| OAuth2 impl | `application_credentials.py` | `AniListOAuth2Implementation` overriding token exchange to use JSON body (AniList requirement), no-op `_async_refresh_token` (tokens are permanent), `async_get_authorization_server` / `async_get_auth_implementation` hooks |
| Card | `src/card/anilist-card.ts` | Lit 3.x `LitElement` custom element (`anilist-card`), 5 views, i18n (en/de), 60-second countdown refresh, auto-discovers entities by `sensor.anilist_` prefix |
| Card editor | `src/card/anilist-card-editor.ts` | Visual configuration editor for the card in the Lovelace UI |
| Types | `src/card/types.ts` | TypeScript interfaces: `AniListCardConfig`, `HomeAssistant`, `HassEntity`, `AiringAnime`, `WatchlistAnime`, `MangaItem`, `SeasonAnime`, `ViewerInfo`, `UserProfile` |

---

## 4. API Usage Pattern

### Request Strategy

The integration minimizes API calls by batching multiple GraphQL queries using
aliases within a single HTTP POST request.

**Authenticated mode (2 requests per update cycle):**

| Request | Query constant | Data retrieved |
|---------|---------------|----------------|
| 1 | `QUERY_COMBINED` | Anime watchlist (`MediaListCollection`), airing schedule page 1, current season anime, next season anime |
| 2 | `QUERY_USER_STATS_AND_MANGA` | User statistics (anime + manga), favourites (top 5 anime, top 5 manga), manga list (`MediaListCollection`) |

Additional requests are made only when airing schedule pagination is needed
(page 2+ via `QUERY_SCHEDULE_PAGE`).

**Unauthenticated mode (1 request per update cycle):**

| Request | Query constant | Data retrieved |
|---------|---------------|----------------|
| 1 | `QUERY_PUBLIC` | Airing schedule page 1, current season anime, next season anime |

### Rate Limiting

| Parameter | Value |
|-----------|-------|
| AniList limit | 90 requests/minute per IP |
| Safety buffer | 5 remaining (configurable via `RATE_LIMIT_BUFFER`) |
| Default poll interval | 15 minutes |

The rate limiting strategy in `AniListClient.query()`:

1. Every response is inspected for the `X-RateLimit-Remaining` header.
2. When `remaining < RATE_LIMIT_BUFFER` (5), the client sleeps until
   `X-RateLimit-Reset + 1 second` before returning.
3. On HTTP 429, `AniListRateLimitError` is raised with the `Retry-After` value;
   the coordinator converts this to `UpdateFailed(retry_after=...)`.
4. On HTTP 403, a generic `AniListError` is raised.
5. GraphQL-level errors (HTTP 200 with `errors[]`) are inspected: status 401/403
   errors become `AniListAuthError`, others become `AniListError`.

### Pagination

The airing schedule uses server-side pagination (50 items per page). The
coordinator calls `_fetch_all_schedule_pages()` which:

1. Parses page 1 from the batched response.
2. Checks `pageInfo.hasNextPage`.
3. Fetches subsequent pages via `QUERY_SCHEDULE_PAGE` until all pages are
   consumed.

---

## 5. Data Models

All data models are Python dataclasses defined in `coordinator.py`.

### Top-level Container

```
AniListData
+-- airing_schedule: list[AiringEntry]       # always populated
+-- season_anime: list[dict]                 # always populated
+-- next_season_anime: list[dict]            # always populated
+-- watchlist: list[WatchlistEntry] | None   # None when unauthenticated
+-- manga_list: list[MangaEntry] | None      # None when unauthenticated
+-- user_stats: UserStats | None             # None when unauthenticated
+-- viewer: dict | None                      # None when unauthenticated
```

### Entry Dataclasses

```
AiringEntry
+-- id: int                    # AniList airing schedule ID
+-- airing_at: int             # Unix timestamp (seconds)
+-- time_until_airing: int     # Seconds until air time
+-- episode: int               # Episode number
+-- media_id: int              # Media ID
+-- media: dict                # Raw media object (title, coverImage, etc.)

WatchlistEntry
+-- id: int                    # List entry ID
+-- media_id: int              # Media ID
+-- status: str                # CURRENT | PLANNING | COMPLETED | DROPPED | PAUSED | REPEATING
+-- score: float               # User score
+-- progress: int              # Episodes watched
+-- notes: str | None          # User notes
+-- updated_at: int            # Last update timestamp
+-- media: dict                # Raw media object

MangaEntry
+-- id: int                    # List entry ID
+-- media_id: int              # Media ID
+-- status: str                # Same status enum as WatchlistEntry
+-- score: float               # User score
+-- progress: int              # Chapters read
+-- progress_volumes: int      # Volumes read
+-- notes: str | None          # User notes
+-- updated_at: int            # Last update timestamp
+-- media: dict                # Raw media object

UserStats
+-- anime_count: int           # Total anime on list
+-- episodes_watched: int      # Total episodes watched
+-- minutes_watched: int       # Total minutes watched
+-- anime_mean_score: float    # Average anime score (0-100)
+-- top_genres: list[str]      # Top 5 genres by watch count
+-- manga_count: int           # Total manga on list
+-- chapters_read: int         # Total chapters read
+-- volumes_read: int          # Total volumes read
+-- manga_mean_score: float    # Average manga score (0-100)
+-- favourite_anime: list[dict] # Top 5 favourite anime
```

### Typed Config Entry

The integration uses the modern HA 2024+ pattern:

```python
type AniListConfigEntry = ConfigEntry[AniListCoordinator]
```

The coordinator is stored on `entry.runtime_data`, avoiding the legacy
`hass.data[DOMAIN]` dictionary pattern.

---

## 6. Card Architecture

### Overview

The Lovelace card is a Lit 3.x web component registered as `anilist-card`. The
TypeScript source lives in `src/card/` and is compiled to a single JavaScript
bundle at `custom_components/anilist/www/anilist-card.js`. The integration's
`__init__.py` registers this bundle as a Lovelace frontend resource
automatically on first setup.

### Five Views

| View | Config value | Data source (sensor attributes) | Description |
|------|-------------|--------------------------------|-------------|
| Airing | `"airing"` | `airing_schedule` attribute on `episodes_this_week` sensor | Upcoming episode countdown list |
| Watchlist | `"watchlist"` | `watchlist` attribute on `watching_count` sensor | User's anime watch progress |
| Season | `"season"` | `season_anime` attribute on `airing_today` sensor | Current/next season anime grid |
| Profile | `"profile"` | `top_genres`, `favourite_anime` from `top_genre` sensor; individual stat sensors | User statistics dashboard |
| Manga | `"manga"` | `manga_list` attribute on `manga_reading_count` sensor | Manga reading list |

### Entity Discovery

The card auto-discovers entities by scanning `hass.states` for entity IDs
matching the `sensor.anilist_` prefix. It supports both English and German
entity ID variants (e.g., `sensor.anilist_watching_count` and
`sensor.anilist_schaue_ich_gerade`).

### Data Reading Pattern

1. The card reads structured data from sensor `extra_state_attributes` (lists of
   `AiringAnime`, `WatchlistAnime`, `MangaItem`, `SeasonAnime` objects).
2. For scalar values (counts, scores, timestamps), it reads directly from
   `entity.state`.
3. When attribute data is unavailable, it falls back to the simple sensor state.

### Countdown Refresh

A 60-second `setInterval` timer calls `this.requestUpdate()` to re-render
countdown displays without waiting for a full HA state update. This timer is
started in `connectedCallback` and cleared in `disconnectedCallback`.

### Configuration

The card exposes extensive configuration via `AniListCardConfig` (defined in
`types.ts`) including: view selection, display toggles (covers, countdowns,
progress bars, badges, search), per-view item limits, sorting, color theming,
overflow behavior, and genre/format filters.

---

## 7. Authentication Flow

### OAuth2 via HA Application Credentials

The integration uses Home Assistant's built-in `application_credentials`
platform and `AbstractOAuth2FlowHandler` for OAuth2 authorization.

```
1. User registers an API client at https://anilist.co/settings/developer
   - Sets redirect URI to the HA OAuth2 callback URL
   - Receives client_id and client_secret

2. User adds credentials in HA:
   Settings -> Devices & Services -> Application Credentials -> Add
   - Enters client_id and client_secret

3. Config flow presents a menu:
   - "Connect with AniList account" -> starts OAuth2 flow
   - "Use without account" -> creates public-only entry

4. OAuth2 flow (if chosen):
   a. HA opens browser to https://anilist.co/api/v2/oauth/authorize
   b. User authorizes the application on AniList
   c. AniList redirects back to HA with authorization code
   d. AniListOAuth2Implementation.async_resolve_external_data()
      exchanges the code for an access token via JSON POST
      (AniList requires JSON body, not form-encoded)
   e. Config flow validates the token with a Viewer query
   f. ConfigEntry is created with token + user identity

5. Token storage:
   - Token stored in config entry data as entry.data["token"]["access_token"]
   - AniList tokens are permanent (no expiration, no refresh token)
   - _async_refresh_token() returns the existing token unchanged

6. Re-authentication:
   - Triggered when the coordinator raises ConfigEntryAuthFailed
   - Shows reauth_confirm form, then restarts the OAuth2 flow
```

### AniList-Specific OAuth2 Customization

The `AniListOAuth2Implementation` class in `application_credentials.py` makes
two important overrides:

- **Token exchange uses JSON**: AniList's token endpoint requires
  `Content-Type: application/json`, not the standard
  `application/x-www-form-urlencoded`. The `async_resolve_external_data` method
  sends the exchange request via `session.post(..., json={...})`.
- **No token refresh**: AniList issues permanent bearer tokens without refresh
  tokens. The `_async_refresh_token` method returns the existing token dict
  unchanged, preventing HA from attempting a `refresh_token` grant that would
  always fail.

---

## 8. Event System

### anilist_episode_airing Event

The integration fires a Home Assistant event when an episode has aired. This
is a polling-based mechanism checked on every coordinator update cycle.

**Event name:** `anilist_episode_airing`

**Payload:**

| Field | Type | Description |
|-------|------|-------------|
| `media_id` | int | AniList media ID |
| `title` | string | Anime title (romaji with english/native fallback) |
| `episode` | int | Episode number that aired |
| `aired_at` | string | ISO 8601 timestamp of when the episode aired |
| `cover_image` | string or null | URL to the medium-size cover image |
| `site_url` | string or null | URL to the anime's AniList page |

**How it works:**

1. The coordinator maintains a set of already-fired airing IDs
   (`_fired_airing_ids`).
2. After each data update, `_fire_new_airing_events()` iterates through all
   airing schedule entries.
3. For each entry where `airing_at <= now` (the episode has already aired) and
   the ID has not been fired before, it fires the event via
   `hass.bus.async_fire()` and records the ID.
4. Duplicate detection is in-memory only; the set resets on integration reload
   or HA restart.

**Usage example (HA automation):**

```yaml
automation:
  trigger:
    platform: event
    event_type: anilist_episode_airing
  action:
    service: notify.mobile_app
    data:
      title: "{{ trigger.event.data.title }}"
      message: "Episode {{ trigger.event.data.episode }} just aired!"
```
