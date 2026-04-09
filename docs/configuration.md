# Integration Options

After adding the AniList integration, click the gear icon on the integration card to configure options.

## Options Reference

| Option | Key | Type | Default | Range | Description |
|--------|-----|------|---------|-------|-------------|
| Update interval | `update_interval` | int | `15` | 5–60 | Data refresh interval in minutes |
| Title language | `title_language` | string | `romaji` | — | Anime title display language |
| Include adult | `include_adult` | bool | `false` | — | Include adult-rated content in results |
| Airing window | `airing_window_days` | int | `7` | 1–14 | Days ahead to fetch for airing schedule |
| Media formats | `media_formats` | list | `[]` (all) | — | Filter by format (empty = show all) |
| Excluded genres | `excluded_genres` | list | `[]` | — | Genres to exclude from season data |
| Score format | `score_format` | string | `POINT_10` | — | Score display format for sensors |
| Watchlist statuses | `watchlist_statuses` | list | `CURRENT, REPEATING` | — | Statuses shown in watchlist calendar |
| Manga statuses | `manga_statuses` | list | `CURRENT, REPEATING` | — | Statuses shown in manga calendar |
| Airing calendar | `show_airing_calendar` | bool | `true` | — | Enable airing schedule calendar entity |
| Season calendar | `show_season_calendar` | bool | `true` | — | Enable season calendar entity |
| Reminder offset | `calendar_reminder_offset` | int | `0` | 0–60 | Calendar reminder offset in minutes |

## Title Language

| Value | Description | Example |
|-------|-------------|---------|
| `romaji` | Romanized Japanese (default) | Shingeki no Kyojin |
| `english` | English title | Attack on Titan |
| `native` | Native script | 進撃の巨人 |

Falls back in order: configured language > romaji > english > native > "Unknown".

## Media Formats

Available format filters (multi-select, empty = all):

| Value | Description |
|-------|-------------|
| `TV` | Standard TV anime series |
| `TV_SHORT` | Short-form TV anime |
| `MOVIE` | Anime films |
| `SPECIAL` | Special episodes |
| `OVA` | Original Video Animation |
| `ONA` | Original Net Animation |
| `MUSIC` | Music videos |

## Score Formats

| Value | Display | Example |
|-------|---------|---------|
| `POINT_10` | 0–10 scale | 8.9 |
| `POINT_100` | 0–100 scale | 89.1 |
| `POINT_5` | 0–5 scale | 4.5 |
| `SMILEY` | Emoji faces | :) |

## Watchlist / Manga Statuses

Available statuses for calendar filtering:

| Value | Description |
|-------|-------------|
| `CURRENT` | Currently watching/reading |
| `PLANNING` | Planned to watch/read |
| `COMPLETED` | Finished |
| `DROPPED` | Dropped |
| `PAUSED` | On hold |
| `REPEATING` | Re-watching/re-reading |
