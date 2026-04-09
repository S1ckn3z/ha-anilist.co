# AniList for Home Assistant

[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][release-badge]][release-url]
[![License][license-badge]][license-url]

A full-featured Home Assistant integration for [AniList.co](https://anilist.co) that brings your anime and manga tracking data into your smart home dashboard. Includes a custom Lovelace card with 5 views, a visual editor, and full theme support.

## Features

- **Airing Schedule** — See upcoming episodes with countdown timers
- **Watchlist** — Track your currently watching anime with progress bars
- **Manga Reading List** — Track your manga with chapter/volume progress
- **Season Overview** — Browse current and next season anime
- **Profile Stats** — Display your AniList stats, genres, and favourites
- **4 Calendar Entities** — Airing, season, watchlist, and manga calendars
- **13 Sensor Entities** — Counts, scores, watch time, top genres, and more
- **Custom Lovelace Card** — Built with Lit 3.x, responsive, themeable
- **Visual Card Editor** — Configure everything through the UI
- **OAuth2 Authentication** — Secure login, or use public-only mode
- **i18n** — Card UI available in English, German, and Japanese
- **HA Theme Integration** — Automatically adapts to your HA theme colors

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Integration Options](#integration-options)
- [Lovelace Card](#lovelace-card)
  - [Card Views](#card-views)
  - [Card Configuration Reference](#card-configuration-reference)
  - [Visual Editor](#visual-editor)
  - [YAML Examples](#yaml-examples)
- [Sensors](#sensors)
- [Calendars](#calendars)
- [Automations](#automations)
- [FAQ](#faq)
- [Contributing](#contributing)

---

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots in the top-right corner and select **Custom repositories**
3. Add `https://github.com/S1CK/ha-anilist.co` with category **Integration**
4. Search for **AniList** and click **Install**
5. Restart Home Assistant

The Lovelace card is bundled with the integration and registers automatically — no manual resource setup needed.

### Manual

1. Download `anilist.zip` from the [latest release](https://github.com/S1CK/ha-anilist.co/releases)
2. Extract to your HA `config/custom_components/anilist/` directory
3. Restart Home Assistant

The card frontend is included in the integration and will be registered as a Lovelace resource on first load. If you use YAML mode for Lovelace, add this resource manually:

```yaml
resources:
  - url: /anilist-card/anilist-card.js
    type: module
```

---

## Setup

### With AniList Account (Full Features)

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Sign in with AniList account (OAuth2)**
4. Authorize with your AniList credentials
5. All sensors and calendars will be created automatically

### Public Data Only (No Account)

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Public data only (no account required)**
4. Airing schedule and season data will be available (no watchlist/profile)

---

## Integration Options

After setup, click the gear icon on the AniList integration card to configure:

| Option | Default | Description |
|--------|---------|-------------|
| `update_interval` | `15` | Data refresh interval in minutes (5-60) |
| `title_language` | `romaji` | Anime title language: `romaji`, `english`, `native` |
| `include_adult` | `false` | Include adult-rated content |
| `airing_window_days` | `7` | How many days ahead to show in airing schedule (1-14) |
| `media_formats` | all | Filter by format: `TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC` |
| `excluded_genres` | none | Genres to exclude from season data |
| `score_format` | `POINT_10` | Score display: `POINT_10`, `POINT_100`, `POINT_5`, `SMILEY` |
| `watchlist_statuses` | `CURRENT, REPEATING` | Which anime statuses to include in calendar |
| `manga_statuses` | `CURRENT, REPEATING` | Which manga statuses to include in calendar |
| `show_airing_calendar` | `true` | Enable the airing schedule calendar entity |
| `show_season_calendar` | `true` | Enable the season calendar entity |
| `calendar_reminder_offset` | `0` | Calendar reminder offset in minutes (0 = no reminder) |

---

## Lovelace Card

The AniList card appears as **"AniList"** in the card picker when adding a new card to your dashboard.

### Card Views

| View | Description | Auth Required |
|------|-------------|:------------:|
| `airing` | Upcoming episode list with countdown timers | No |
| `watchlist` | Your anime watchlist with cover art grid and progress | Yes |
| `manga` | Your manga reading list with chapter/volume tracking | Yes |
| `season` | Current season anime browser with scores and formats | No |
| `profile` | Your AniList profile with stats, genres, and favourites | Yes |

### Card Configuration Reference

#### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | *required* | Must be `custom:anilist-card` |
| `view` | string | `airing` | Card view: `airing`, `watchlist`, `season`, `profile`, `manga` |
| `title` | string | auto | Custom card title (auto-generated from view name if omitted) |
| `max_items` | number | `5` | Global max items to display |
| `max_airing` | number | — | Override max items for airing view |
| `max_watchlist` | number | — | Override max items for watchlist view |
| `max_season` | number | — | Override max items for season view |
| `max_manga` | number | — | Override max items for manga view |

#### Display

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_cover` | boolean | `true` | Show cover images |
| `cover_size` | string | `medium` | Cover image size: `small` (40x56), `medium` (48x68), `large` (64x90) |
| `show_countdown` | boolean | `true` | Show countdown timer (airing view) |
| `countdown_format` | string | `relative` | Countdown style: `relative` (5h 30m), `absolute` (Apr 10, 14:00), `both` |
| `show_progress` | boolean | `true` | Show episode/chapter progress |
| `show_progress_bar` | boolean | `true` | Show visual progress bar |
| `score_display` | string | `number` | Score style: `stars`, `bar`, `number`, `none` |
| `show_badges` | boolean | `true` | Show status badges on covers |
| `show_search` | boolean | `false` | Show search/filter input |
| `show_tooltips` | boolean | `false` | Show details on hover |
| `link_target` | string | `anilist` | Click behavior: `anilist` (open in new tab), `ha_more_info`, `none` |
| `sort_by` | string | `time` | Airing sort order: `time`, `title`, `score` |
| `card_padding` | string | `normal` | Inner spacing: `compact`, `normal`, `relaxed` |

#### Airing Extras

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_duration` | boolean | `false` | Show episode duration (e.g. 24min) |
| `show_genres` | boolean | `false` | Show genre tags |
| `show_average_score` | boolean | `false` | Show community score |
| `show_format_badge` | boolean | `false` | Show format badge (TV, Movie, OVA) |

#### Watchlist / Manga

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `watchlist_statuses` | string[] | all | Statuses to show: `CURRENT`, `PLANNING`, `COMPLETED`, `PAUSED`, `DROPPED` |
| `show_status_tabs` | boolean | `true` | Show tab buttons to switch between statuses |
| `overflow_mode` | string | `scroll` | `scroll` = scrollbar at fixed height, `limit` = cut at max_items |
| `scroll_height` | number | `400` | Max height in px when `overflow_mode` is `scroll` |

#### Season

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `genre_filter` | string[] | `[]` | Only show anime matching these genres |
| `format_filter` | string[] | `[]` | Only show anime matching these formats (TV, MOVIE, etc.) |
| `show_next_season` | boolean | `false` | Include next season anime |

#### Profile

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_avatar` | boolean | `true` | Show user avatar image |
| `show_username` | boolean | `true` | Show username |
| `show_anime_stats` | boolean | `true` | Show anime statistics (count, episodes, hours, score) |
| `show_manga_stats` | boolean | `true` | Show manga statistics (count, chapters, score) |
| `show_genre_chart` | boolean | `true` | Show top genres visualization |
| `chart_type` | string | `bar` | Genre chart style: `bar`, `donut`, `tags` |
| `show_favourites` | boolean | `true` | Show favourite anime list |

#### Styling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `accent_color` | string | — | Primary accent color (hex). Falls back to HA `--primary-color` |
| `secondary_color` | string | — | Secondary accent color (hex). Falls back to HA `--accent-color` |
| `card_background` | string | — | Card background color (hex/rgba) |
| `card_opacity` | number | `100` | Card opacity (0-100) |
| `border_color` | string | — | Card border color |
| `border_width` | number | — | Card border width in px |
| `border_radius` | number | — | Card border radius in px |

### Visual Editor

The card includes a full visual editor with three tabs:

- **General** — View selection, title, padding, click behavior, covers, search, tooltips
- **[View Name]** — Dynamic tab that changes based on the selected view, showing only relevant settings
- **Colors** — Accent color, secondary color, background, opacity, borders

The middle tab label updates to show the current view name (e.g. "Watchlist", "Profile") and displays only the settings that apply to that specific view.

### YAML Examples

**Basic airing card:**

```yaml
type: custom:anilist-card
view: airing
max_items: 10
```

**Watchlist with all statuses and scrollbar:**

```yaml
type: custom:anilist-card
view: watchlist
show_status_tabs: true
watchlist_statuses:
  - CURRENT
  - PLANNING
  - COMPLETED
  - PAUSED
  - DROPPED
overflow_mode: scroll
scroll_height: 500
score_display: stars
```

**Manga reading list:**

```yaml
type: custom:anilist-card
view: manga
show_status_tabs: true
overflow_mode: scroll
scroll_height: 400
show_progress_bar: true
```

**Season with filters:**

```yaml
type: custom:anilist-card
view: season
max_season: 20
genre_filter:
  - Action
  - Fantasy
format_filter:
  - TV
show_next_season: true
```

**Minimal profile:**

```yaml
type: custom:anilist-card
view: profile
show_avatar: true
show_username: true
show_anime_stats: true
show_manga_stats: false
show_genre_chart: true
chart_type: donut
show_favourites: false
```

**Custom styled card:**

```yaml
type: custom:anilist-card
view: airing
accent_color: "#FF6B6B"
secondary_color: "#4ECDC4"
card_background: "#1a1a2e"
card_opacity: 90
border_radius: 16
border_width: 2
border_color: "#FF6B6B"
card_padding: compact
```

**Full dashboard with all views (sections layout):**

```yaml
views:
  - title: AniList
    type: sections
    max_columns: 4
    sections:
      - cards:
          - type: custom:anilist-card
            view: airing
            max_items: 10
            show_countdown: true
      - cards:
          - type: custom:anilist-card
            view: watchlist
            overflow_mode: scroll
      - cards:
          - type: custom:anilist-card
            view: season
            max_season: 15
      - cards:
          - type: custom:anilist-card
            view: profile
            chart_type: bar
```

---

## Sensors

All sensors are created under the `sensor.anilist_*` namespace.

### Public Sensors (No Authentication Required)

| Entity ID | Description | Unit | Attributes |
|-----------|-------------|------|------------|
| `sensor.anilist_airing_today` | Anime airing today | anime | `season_anime` list |
| `sensor.anilist_episodes_this_week` | Episodes in airing window | episodes | `airing_schedule` list, `next_airing` |
| `sensor.anilist_next_episode_title` | Title of next airing anime | — | — |
| `sensor.anilist_next_episode_time` | Timestamp of next episode | timestamp | — |

### Authenticated Sensors

| Entity ID | Description | Unit | Attributes |
|-----------|-------------|------|------------|
| `sensor.anilist_watching_count` | Currently watching count | anime | `watchlist` list |
| `sensor.anilist_manga_reading_count` | Currently reading count | manga | `manga_list` list |
| `sensor.anilist_total_anime_watched` | Total anime count | anime | — |
| `sensor.anilist_total_episodes_watched` | Total episodes watched | episodes | — |
| `sensor.anilist_total_hours_watched` | Total watch time | hours | — |
| `sensor.anilist_anime_mean_score` | Average anime score | — | — |
| `sensor.anilist_manga_mean_score` | Average manga score | — | — |
| `sensor.anilist_chapters_read` | Total chapters read | chapters | — |
| `sensor.anilist_top_genre` | Top genre by watch count | — | `top_genres`, `favourite_anime`, `viewer_name`, `viewer_avatar` |

### Sensor Attributes (used by the card)

The card reads data from sensor attributes. Key attribute structures:

**`airing_schedule`** (on `episodes_this_week` sensor):
```json
[
  {
    "media_id": 12345,
    "title": "Anime Title",
    "episode": 5,
    "airing_at": "2026-04-10T14:00:00+00:00",
    "cover_image": "https://...",
    "site_url": "https://anilist.co/anime/12345",
    "duration": 24
  }
]
```

**`watchlist`** (on `watching_count` sensor):
```json
[
  {
    "media_id": 12345,
    "title": "Anime Title",
    "status": "CURRENT",
    "progress": 5,
    "episodes": 12,
    "score": 85,
    "cover_image": "https://...",
    "site_url": "https://anilist.co/anime/12345"
  }
]
```

**`manga_list`** (on `manga_reading_count` sensor):
```json
[
  {
    "media_id": 67890,
    "title": "Manga Title",
    "status": "CURRENT",
    "progress": 42,
    "progress_volumes": 5,
    "chapters": 200,
    "volumes": 20,
    "score": 90,
    "cover_image": "https://...",
    "site_url": "https://anilist.co/manga/67890"
  }
]
```

---

## Calendars

| Entity ID | Description | Auth Required |
|-----------|-------------|:------------:|
| `calendar.anilist_airing_calendar` | All episodes in the airing window | No |
| `calendar.anilist_season_calendar` | Current and next season anime | No |
| `calendar.anilist_watchlist_calendar` | Filtered to your watchlist statuses | Yes |
| `calendar.anilist_manga_calendar` | Your manga reading list | Yes |

Calendar entities work with any HA calendar card and can be used in automations.

---

## Automations

### Notify When an Episode Airs

The integration fires an `anilist_episode_airing` event when an episode in your airing window has aired.

```yaml
automation:
  - alias: "AniList: New episode notification"
    trigger:
      - platform: event
        event_type: anilist_episode_airing
    action:
      - service: notify.mobile_app
        data:
          title: "New Episode Available"
          message: "{{ trigger.event.data.title }} - Episode {{ trigger.event.data.episode }}"
          data:
            image: "{{ trigger.event.data.cover_image }}"
            clickAction: "{{ trigger.event.data.site_url }}"
```

### Daily Airing Summary

```yaml
automation:
  - alias: "AniList: Daily airing summary"
    trigger:
      - platform: time
        at: "08:00:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.anilist_airing_today
        above: 0
    action:
      - service: notify.mobile_app
        data:
          title: "Anime Today"
          message: "{{ states('sensor.anilist_airing_today') }} anime airing today"
```

---

## FAQ

### The card shows "No episodes in the coming days"

- Make sure the AniList integration is set up and running (check **Settings > Devices & Services**)
- Check if sensor entities exist under **Developer Tools > States** (search for `sensor.anilist_`)
- The airing window defaults to 7 days — increase it in the integration options if needed

### The card shows "No profile stats available"

- Profile data requires OAuth2 authentication — set up the integration with your AniList account
- Public-only mode does not provide watchlist, manga, or profile data

### Cover images are not loading

- AniList serves images from `s4.anilist.co` — make sure your network allows access
- Check your browser console for CORS or CSP errors

### The visual editor doesn't show all options

- The editor shows settings dynamically based on the selected view
- Switch the view in the **General** tab to see view-specific settings in the middle tab

### How do I use multiple cards on one page?

- Add multiple `custom:anilist-card` instances, each with a different `view`
- Use the HA **Sections** view type with `max_columns: 4` for a dashboard layout

### Sensor attributes exceed 16KB warning

- This is a HA recorder warning — attributes are still accessible from the state machine
- It only means the attributes are not stored in long-term history
- The card reads from current state, not history, so it works fine

### How do I clear the card cache?

- Press **Ctrl+Shift+R** (or Cmd+Shift+R on Mac) in your browser
- Alternatively, append `?v=2` to the resource URL temporarily

---

## Requirements

- Home Assistant **2024.1.0** or newer
- HACS **2.0.5** or newer (for HACS installation)
- An AniList account (optional — public data works without one)

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Install dependencies: `npm install`
4. Make your changes
5. Build the card: `npm run build`
6. Test in a local HA instance
7. Submit a pull request

### Development

```bash
# Install dependencies
npm install

# Build the card (one-time)
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

The card source is in `src/card/` and builds to `www/anilist-card/anilist-card.js`.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://github.com/hacs/integration
[release-badge]: https://img.shields.io/github/v/release/S1CK/ha-anilist.co
[release-url]: https://github.com/S1CK/ha-anilist.co/releases
[license-badge]: https://img.shields.io/github/license/S1CK/ha-anilist.co
[license-url]: https://github.com/S1CK/ha-anilist.co/blob/main/LICENSE
