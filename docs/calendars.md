# Calendar Entities

The AniList integration provides up to 4 calendar entities. Two are public (no authentication required); two require an authenticated AniList account.

---

## Calendar Entities

| Entity ID | Name | Description | Auth Required |
|---|---|---|---|
| `calendar.anilist_airing_calendar` | Airing Calendar | All episodes within the configured airing window | No |
| `calendar.anilist_season_calendar` | Season Calendar | Current season and next season anime episodes | No |
| `calendar.anilist_watchlist_calendar` | Watchlist Calendar | Airing episodes filtered to the user's anime watchlist | Yes |
| `calendar.anilist_manga_calendar` | Manga Calendar | Manga reading list entries as all-day events | Yes |

---

## Event Format

All calendar entities produce standard Home Assistant `CalendarEvent` objects with the following fields: `summary`, `start`, `end`, `description`, and `uid`.

### Airing Calendar Events

Events represent individual episode airings within the configured `airing_window_days` (default: 7 days).

- **summary**: `"Title -- Episode X"` or `"Title -- Episode X of Y"` when total episode count is known
- **start**: UTC datetime of the episode's scheduled airing time
- **end**: `start` + episode duration (from AniList API, or 24 minutes as fallback)
- **description**: Episode number line followed by the AniList site URL

```
Episode 24 of 28
https://anilist.co/anime/163146
```

### Season Calendar Events

Events represent the next airing episode for each anime in the current and next season.

- **summary**: `"Title -- Episode X"` or `"Title -- Episode X of Y"`
- **start**: UTC datetime of the next episode's scheduled airing
- **end**: `start` + episode duration (from AniList API, or 24 minutes as fallback)
- **description**: Includes a season label (`[Current Season]` or `[Next Season]`), the anime's average score, and the AniList site URL

```
[Current Season] Episode 24 of 28
Score: 91
https://anilist.co/anime/163146
```

### Watchlist Calendar Events

Events use the same format as the Airing Calendar, but the schedule is filtered to only include anime present on the authenticated user's watchlist with an allowed status.

- **summary**: `"Title -- Episode X"` or `"Title -- Episode X of Y"`
- **start**: UTC datetime of the episode's scheduled airing time
- **end**: `start` + episode duration (from AniList API, or 24 minutes as fallback)
- **description**: Episode number line followed by the AniList site URL

Filtering is controlled by the `watchlist_statuses` option (default: `["CURRENT", "REPEATING"]`).

### Manga Calendar Events

Events represent manga entries from the user's reading list. These are displayed as all-day events on the date the entry was last updated.

- **summary**: `"Title -- Ch. X"` or `"Title -- Ch. X of Y"` when total chapter count is known
- **start**: All-day date (the `updated_at` timestamp converted to a date)
- **end**: `start` + 1 day
- **description**: Chapter progress, volume progress, reading status, and the AniList site URL

```
Chapters: 140
Volumes: 14
Status: CURRENT
https://anilist.co/manga/105778
```

Filtering is controlled by the `manga_statuses` option (default: `["CURRENT", "REPEATING"]`).

---

## Calendar Reminders

The `calendar_reminder_offset` option controls pre-event reminders for airing and season calendar events.

| Value | Behavior |
|---|---|
| `0` (default) | No reminder is attached to events |
| `> 0` | A `CalendarAlarm` is attached, triggering the specified number of minutes before the event start |

Reminders require Home Assistant 2024.3 or later (which introduced `CalendarAlarm` support). On older versions, the offset setting is silently ignored.

Manga calendar events do not include reminders because they are all-day events representing past reading activity.

---

## Configuration

Calendar entity creation is controlled by several integration options:

### Visibility Options

| Option | Default | Effect |
|---|---|---|
| `show_airing_calendar` | `true` | When `false`, `calendar.anilist_airing_calendar` is not created |
| `show_season_calendar` | `true` | When `false`, `calendar.anilist_season_calendar` is not created |

The Watchlist Calendar and Manga Calendar are only created when the integration is set up with authentication. There is no separate toggle to disable them.

### Filtering Options

| Option | Default | Applies To |
|---|---|---|
| `watchlist_statuses` | `["CURRENT", "REPEATING"]` | Watchlist Calendar -- only anime with a matching list status are included |
| `manga_statuses` | `["CURRENT", "REPEATING"]` | Manga Calendar -- only manga with a matching list status are included |

Valid status values for both options: `CURRENT`, `REPEATING`, `COMPLETED`, `PAUSED`, `DROPPED`, `PLANNING`.

### Other Relevant Options

| Option | Default | Effect |
|---|---|---|
| `airing_window_days` | `7` | Number of days into the future to fetch airing schedule data (affects Airing Calendar and Watchlist Calendar) |
| `title_language` | `romaji` | Title language used in event summaries (`romaji`, `english`, or `native`) |
| `media_formats` | `[]` (all) | When set, only anime matching these formats appear (`TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC`) |
| `excluded_genres` | `[]` | Genres to exclude from results |
| `include_adult` | `false` | Whether to include adult-rated anime |
