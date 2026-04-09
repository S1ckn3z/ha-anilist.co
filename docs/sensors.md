# Sensor Entities

The AniList integration provides 13 sensor entities. Four are available without authentication (public API); nine require an authenticated AniList account.

---

## Public Sensors (No Auth Required)

These sensors use the AniList public GraphQL API and do not require a user account.

| Entity ID | Name | Description | Unit | Device Class | State Class | Attributes |
|---|---|---|---|---|---|---|
| `sensor.anilist_airing_today` | Airing Today | Count of anime episodes airing today (UTC) | `anime` | -- | `MEASUREMENT` | `season_anime` list |
| `sensor.anilist_episodes_this_week` | Episodes This Week | Total episode count within the configured airing window | `episodes` | -- | `MEASUREMENT` | `airing_schedule` list, `next_airing` object |
| `sensor.anilist_next_episode_title` | Next Episode Title | Title of the next airing anime (per title language setting) | -- | -- | -- | -- |
| `sensor.anilist_next_episode_time` | Next Episode Time | Timestamp of the next upcoming episode | -- | `TIMESTAMP` | -- | -- |

---

## Authenticated Sensors

These sensors require a valid AniList OAuth token. They are created only when the integration is set up with authentication.

| Entity ID | Name | Description | Unit | Device Class | State Class | Attributes |
|---|---|---|---|---|---|---|
| `sensor.anilist_watching_count` | Watching Count | Number of anime currently being watched (status = CURRENT) | `anime` | -- | `MEASUREMENT` | `watchlist` list |
| `sensor.anilist_manga_reading_count` | Manga Reading Count | Number of manga currently being read (status = CURRENT) | `manga` | -- | `MEASUREMENT` | `manga_list` list |
| `sensor.anilist_total_anime_watched` | Total Anime Watched | Lifetime count of anime on the user's list | `anime` | -- | `TOTAL` | -- |
| `sensor.anilist_total_episodes_watched` | Total Episodes Watched | Lifetime count of episodes watched | `episodes` | -- | `TOTAL` | -- |
| `sensor.anilist_total_hours_watched` | Total Hours Watched | Lifetime watch time in hours | `h` | `DURATION` | `TOTAL` | -- |
| `sensor.anilist_anime_mean_score` | Anime Mean Score | Average score across all anime on the user's list | -- | -- | `MEASUREMENT` | -- |
| `sensor.anilist_manga_mean_score` | Manga Mean Score | Average score across all manga on the user's list | -- | -- | `MEASUREMENT` | -- |
| `sensor.anilist_chapters_read` | Chapters Read | Lifetime count of manga chapters read | `chapters` | -- | `TOTAL` | -- |
| `sensor.anilist_top_genre` | Top Genre | Name of the user's most-watched genre | -- | -- | -- | `top_genres` list, `favourite_anime` list, `viewer_name`, `viewer_avatar` |

---

## Attribute Structures

Sensors with extra state attributes expose structured data. Below are JSON examples for each attribute type.

### airing_schedule (array)

Exposed by `sensor.anilist_episodes_this_week`.

```json
[
  {
    "media_id": 163146,
    "title": "Frieren: Beyond Journey's End",
    "episode": 24,
    "airing_at": "2026-04-10T17:00:00+00:00",
    "cover_image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx163146.jpg",
    "site_url": "https://anilist.co/anime/163146",
    "duration": 24
  }
]
```

### next_airing (object)

Exposed by `sensor.anilist_episodes_this_week`. Contains the single nearest upcoming episode.

```json
{
  "title": "Frieren: Beyond Journey's End",
  "episode": 24,
  "airing_at": "2026-04-10T17:00:00+00:00",
  "cover_image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx163146.jpg",
  "site_url": "https://anilist.co/anime/163146"
}
```

### watchlist (array)

Exposed by `sensor.anilist_watching_count`.

```json
[
  {
    "media_id": 163146,
    "title": "Frieren: Beyond Journey's End",
    "status": "CURRENT",
    "progress": 20,
    "episodes": 28,
    "score": 9,
    "cover_image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx163146.jpg",
    "site_url": "https://anilist.co/anime/163146"
  }
]
```

### manga_list (array)

Exposed by `sensor.anilist_manga_reading_count`.

```json
[
  {
    "media_id": 105778,
    "title": "Chainsaw Man",
    "status": "CURRENT",
    "progress": 140,
    "progress_volumes": 14,
    "chapters": null,
    "volumes": null,
    "score": 8,
    "cover_image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx105778.jpg",
    "site_url": "https://anilist.co/manga/105778"
  }
]
```

### season_anime (array)

Exposed by `sensor.anilist_airing_today`.

```json
[
  {
    "id": 163146,
    "title": "Frieren: Beyond Journey's End",
    "average_score": 91,
    "episodes": 28,
    "format": "TV",
    "genres": ["Adventure", "Drama", "Fantasy"],
    "cover_image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx163146.jpg",
    "site_url": "https://anilist.co/anime/163146",
    "next_airing_episode": {
      "airingAt": 1744304400,
      "episode": 24
    }
  }
]
```

### top_genres (string array)

Exposed by `sensor.anilist_top_genre`.

```json
["Action", "Fantasy", "Adventure", "Drama", "Comedy"]
```

### favourite_anime (array)

Exposed by `sensor.anilist_top_genre`.

```json
[
  {
    "title": "Steins;Gate",
    "site_url": "https://anilist.co/anime/9253",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx9253.jpg"
  }
]
```

### viewer_name and viewer_avatar

Exposed by `sensor.anilist_top_genre`.

- `viewer_name` -- string, the authenticated user's AniList display name.
- `viewer_avatar` -- string (URL), the user's avatar image URL.

---

## Score Formatting

The `sensor.anilist_anime_mean_score` and `sensor.anilist_manga_mean_score` sensors display their values according to the integration's `score_format` option. AniList stores raw scores on a 0--100 scale internally. The configured format determines how the state value is presented:

| Score Format | Conversion | Example (raw 89.1) |
|---|---|---|
| `POINT_10` (default) | Divide by 10, round to 1 decimal | `8.9` |
| `POINT_100` | No conversion, round to 1 decimal | `89.1` |
| `POINT_5` | Divide by 20, round to 1 decimal | `4.5` |
| `SMILEY` | Mapped to text: >=75 happy, >=50 neutral, <50 sad | (text string) |

When the score is zero or unset, the sensor returns `None` (unavailable).

---

## Device Info

All 13 sensor entities belong to a single Home Assistant device:

| Property | Value |
|---|---|
| Name | `AniList` |
| Entry Type | `SERVICE` |
| Manufacturer | `AniList` |
| Configuration URL | `https://anilist.co` |
| Identifiers | `(anilist, <config_entry_id>)` |
