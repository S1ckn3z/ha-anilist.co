# Lovelace Card

The AniList card is a custom Lovelace card for Home Assistant built with Lit 3.x. It provides five distinct views for browsing airing schedules, watchlists, manga lists, seasonal anime, and user profiles. A built-in visual editor with three tabs makes configuration straightforward without writing YAML.

## Card Views

| View | Key | Description | Auth Required |
|------|-----|-------------|---------------|
| Airing | `airing` | Shows currently airing anime with episode countdown timers and next-episode info. Default view. | No |
| Watchlist | `watchlist` | Displays the authenticated user's anime watchlist with progress tracking, status tabs, and score display. | Yes |
| Manga | `manga` | Shows the authenticated user's manga reading list with chapter progress and status filtering. | Yes |
| Season | `season` | Lists anime from the current broadcast season, sortable and filterable by genre and format. | No |
| Profile | `profile` | Displays the authenticated user's AniList profile with statistics, genre charts, and favourites. | Yes |

Views that require authentication will show a message prompting the user to configure an AniList account in the integration settings if no token is available.

---

## Card Configuration Reference

### General

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Card type | `type` | string | _(required)_ | Must be `custom:anilist-card` |
| View | `view` | string | `airing` | Active view: `airing`, `watchlist`, `season`, `profile`, `manga` |
| Title | `title` | string | _(auto)_ | Card header text. When omitted, automatically derived from the active view name. |
| Max items | `max_items` | number | `5` | Global default for maximum items displayed across all views |
| Max airing | `max_airing` | number | _(max_items)_ | Override max items for the airing view |
| Max watchlist | `max_watchlist` | number | _(max_items)_ | Override max items for the watchlist view |
| Max season | `max_season` | number | _(max_items)_ | Override max items for the season view |
| Max manga | `max_manga` | number | _(max_items)_ | Override max items for the manga view |
| Config Entry ID | `entry_id` | string | — | Config Entry ID for multi-account setups. Optional — automatically detected when only one AniList account is configured. |

### Display

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Show cover | `show_cover` | bool | `true` | Display cover art thumbnails |
| Cover size | `cover_size` | string | `medium` | Thumbnail dimensions: `small` (40x56px), `medium` (48x68px), `large` (64x90px) |
| Show countdown | `show_countdown` | bool | `true` | Display episode airing countdown |
| Countdown format | `countdown_format` | string | `relative` | Countdown style: `relative` ("in 2h 30m"), `absolute` ("Sat 20:00"), `both` |
| Show progress | `show_progress` | bool | `true` | Display episode/chapter progress text (e.g., "5/12") |
| Show progress bar | `show_progress_bar` | bool | `true` | Display a visual progress bar beneath entries |
| Score display | `score_display` | string | `number` | How scores are rendered: `stars`, `bar`, `number`, `none` |
| Show badges | `show_badges` | bool | `true` | Display status and format badges on entries |
| Show search | `show_search` | bool | `false` | Enable the search/filter input field |
| Show tooltips | `show_tooltips` | bool | `false` | Show hover tooltips with additional media details |
| Link target | `link_target` | string | `anilist` | Click behavior: `anilist` (open AniList page), `none` (no action), `ha_more_info` (open HA more-info dialog) |
| ~~Link to AniList~~ | `link_to_anilist` | bool | — | **Deprecated.** Use `link_target` instead. Will be removed in a future release. |
| Sort by | `sort_by` | string | `time` | Sort order for entries: `time`, `title`, `score` |
| Card padding | `card_padding` | string | `normal` | Internal spacing: `compact`, `normal`, `relaxed` |

### Layout & Display

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Layout mode | `layout_mode` | string | _(view default)_ | `"grid"` or `"list"` — Grid shows cover cards in a responsive grid, List shows horizontal rows. Default: `list` for airing/season, `grid` for watchlist/manga. |
| Cover quality | `cover_quality` | string | `"large"` | Cover image resolution: `"small"`, `"medium"`, `"large"` (HD). Controls the AniList CDN image size fetched — higher quality means larger downloads. |
| Score position | `score_position` | string | `"top-right"` | Score badge position on cover cards: `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`, `"inline"` (next to title), `"none"` (hidden). Works on all views. |
| Score source | `score_source` | string | `"auto"` | Which score to display: `"user"` (your personal rating), `"average"` (community average), `"auto"` (smart selection — see Score Display section below). |
| Show next airing | `show_next_airing` | bool | `true` | Show next episode countdown badge on watchlist/manga covers. Only visible for currently airing anime that have a scheduled next episode. |

### Airing Extras

These options only apply when the active view is `airing`.

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Show duration | `show_duration` | bool | `false` | Display episode duration in minutes |
| Show genres | `show_genres` | bool | `false` | Display genre tags on airing entries |
| Show average score | `show_average_score` | bool | `false` | Display the community average score |
| Show format badge | `show_format_badge` | bool | `false` | Display the media format (TV, ONA, etc.) as a badge |

### Watchlist and Manga

These options apply to the `watchlist` and `manga` views.

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Watchlist statuses | `watchlist_statuses` | string[] | all 5 statuses | Which statuses to include: `CURRENT`, `PLANNING`, `COMPLETED`, `DROPPED`, `PAUSED` |
| Show status tabs | `show_status_tabs` | bool | `true` | Display clickable tabs to filter by status |
| Overflow mode | `overflow_mode` | string | `scroll` | Behavior when items exceed the visible area: `scroll` (scrollable container), `limit` (truncate to max items) |
| Scroll height | `scroll_height` | number | `400` | Maximum height in pixels for the scrollable container (only applies when `overflow_mode` is `scroll`) |
| Visible items | `visible_items` | number | — | Number of visible items/rows before scrolling starts. When set, the card auto-calculates the container height using a ResizeObserver for pixel-perfect sizing. Overrides `scroll_height`. |
| Scroll snap | `scroll_snap` | bool | `true` | When `visible_items` is set: snap scroll to item boundaries so items are never half-cut at the container edge. |
| Scroll fade | `scroll_fade` | bool | `true` | When `visible_items` is set: show a gradient fade at the scroll edge to indicate more content is available below. |

### Season

These options only apply when the active view is `season`.

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Genre filter | `genre_filter` | string[] | `[]` | Only show anime matching these genres (empty = show all) |
| Format filter | `format_filter` | string[] | `[]` | Only show anime matching these formats: `TV`, `TV_SHORT`, `MOVIE`, `SPECIAL`, `OVA`, `ONA`, `MUSIC` (empty = show all) |
| Show next season | `show_next_season` | bool | `false` | Include a preview section for the upcoming season |

### Profile

These options only apply when the active view is `profile`.

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Show avatar | `show_avatar` | bool | `true` | Display the user's profile avatar |
| Show username | `show_username` | bool | `true` | Display the username |
| Show anime stats | `show_anime_stats` | bool | `true` | Display anime statistics (total watched, mean score, etc.) |
| Show manga stats | `show_manga_stats` | bool | `true` | Display manga statistics (total read, chapters, etc.) |
| Show genre chart | `show_genre_chart` | bool | `true` | Display a chart of top genres |
| Chart type | `chart_type` | string | `bar` | Genre chart visualization: `bar`, `donut`, `tags` |
| Show favourites | `show_favourites` | bool | `true` | Display the user's favourite anime and manga |

### Styling

All styling options are optional. When omitted, values are inherited from the active Home Assistant theme.

| Option | Key | Type | Default | Description |
|--------|-----|------|---------|-------------|
| Accent color | `accent_color` | string | _(HA theme)_ | Primary accent color (CSS color value) |
| Secondary color | `secondary_color` | string | _(HA theme)_ | Secondary accent color (CSS color value) |
| Card background | `card_background` | string | _(HA theme)_ | Card background color or CSS gradient |
| Card opacity | `card_opacity` | number | `100` | Background opacity, 0 (fully transparent) to 100 (fully opaque) |
| Border color | `border_color` | string | _(none)_ | Card border color (CSS color value) |
| Border width | `border_width` | number | _(none)_ | Card border width in pixels |
| Border radius | `border_radius` | number | _(none)_ | Card corner radius in pixels |

### Score Display

All scores displayed on the card use a normalized **0-10 scale** with a single decimal digit, shown as a star badge (e.g., **&#9733;8.5**).

The `score_source` option controls which score is shown:

| score_source | Behavior |
|--------------|----------|
| `"user"` | Always shows your personal AniList rating. Displays nothing if you have not rated the entry. |
| `"average"` | Always shows the community average score from AniList. |
| `"auto"` | **Smart selection per view.** Airing and Season views always show the community average score. Watchlist and Manga views show your personal score if you have rated the entry (score > 0); otherwise, they fall back to the community average. |

The `score_position` option works on **all views** (airing, watchlist, season, manga). In `"grid"` layout mode the badge is overlaid on the cover image at the chosen corner. In `"list"` layout mode, `"inline"` places the score next to the title text; other positions are mapped to `"inline"` automatically. Set to `"none"` to hide scores entirely.

---

## Visual Editor

The card includes a graphical configuration editor accessible from the Lovelace UI editor. The editor is organized into three tabs.

### Tab 1: General

Contains the core settings shared across all views:

- View selector (dropdown with all 5 views)
- Card title
- Max items (global and per-view overrides)
- Display toggles (cover, countdown, progress, badges, search, tooltips)
- Cover size selector
- Countdown format
- Score display mode
- Link target
- Sort order
- Card padding

### Tab 2: Dynamic View Settings

The label and content of this tab change based on the currently selected view:

| Selected View | Tab Label | Settings Shown |
|---------------|-----------|----------------|
| Airing | Airing | show_duration, show_genres, show_average_score, show_format_badge |
| Watchlist | Watchlist | watchlist_statuses, show_status_tabs, overflow_mode, scroll_height |
| Manga | Manga | watchlist_statuses (for manga), show_status_tabs, overflow_mode, scroll_height |
| Season | Season | genre_filter, format_filter, show_next_season |
| Profile | Profile | show_avatar, show_username, show_anime_stats, show_manga_stats, show_genre_chart, chart_type, show_favourites |

### Tab 3: Colors

Contains all styling options:

- Accent color picker
- Secondary color picker
- Card background color picker
- Card opacity slider (0-100)
- Border color picker
- Border width number input
- Border radius number input

---

## YAML Examples

### Basic Airing Card

```yaml
type: custom:anilist-card
view: airing
```

### Watchlist with All Statuses and Scroll

```yaml
type: custom:anilist-card
view: watchlist
title: My Anime List
watchlist_statuses:
  - CURRENT
  - PLANNING
  - COMPLETED
  - DROPPED
  - PAUSED
show_status_tabs: true
overflow_mode: scroll
scroll_height: 500
max_watchlist: 20
show_progress: true
show_progress_bar: true
score_display: stars
```

### Manga Reading List

```yaml
type: custom:anilist-card
view: manga
title: Currently Reading
watchlist_statuses:
  - CURRENT
  - PLANNING
max_manga: 10
show_progress: true
show_progress_bar: true
overflow_mode: scroll
scroll_height: 400
```

### Season with Genre and Format Filters

```yaml
type: custom:anilist-card
view: season
title: This Season
max_season: 15
genre_filter:
  - Action
  - Fantasy
  - Sci-Fi
format_filter:
  - TV
  - ONA
show_next_season: true
sort_by: score
```

### Minimal Profile

```yaml
type: custom:anilist-card
view: profile
show_avatar: true
show_username: true
show_anime_stats: true
show_manga_stats: false
show_genre_chart: false
show_favourites: false
```

### Custom Styled Card

```yaml
type: custom:anilist-card
view: airing
title: Airing Tonight
max_airing: 8
accent_color: "#02A9FF"
secondary_color: "#EF5A8E"
card_background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
card_opacity: 95
border_color: "#02A9FF"
border_width: 1
border_radius: 12
cover_size: large
show_countdown: true
countdown_format: both
card_padding: relaxed
```

### Watchlist with List Layout, Inline Scores, and Scroll

```yaml
type: custom:anilist-card
view: watchlist
title: Watching Now
layout_mode: list
score_position: inline
score_source: auto
watchlist_statuses:
  - CURRENT
  - PAUSED
show_status_tabs: true
visible_items: 6
scroll_snap: true
scroll_fade: true
max_watchlist: 30
show_progress: true
show_progress_bar: true
score_display: number
```

### Airing with Cover Badges and HD Covers

```yaml
type: custom:anilist-card
view: airing
title: Airing This Week
layout_mode: grid
cover_quality: large
score_position: top-right
score_source: average
show_next_airing: true
max_airing: 12
show_countdown: true
countdown_format: relative
show_badges: true
```

### Full 4-Column Dashboard Layout

Uses Home Assistant's sections view to create a complete AniList dashboard.

```yaml
type: sections
title: AniList Dashboard
sections:
  - type: grid
    cards:
      - type: custom:anilist-card
        view: airing
        title: Airing Schedule
        max_airing: 10
        show_countdown: true
        countdown_format: relative
        cover_size: medium

      - type: custom:anilist-card
        view: watchlist
        title: Watchlist
        max_watchlist: 10
        watchlist_statuses:
          - CURRENT
          - REPEATING
        show_status_tabs: true
        overflow_mode: scroll
        scroll_height: 450
        score_display: number

      - type: custom:anilist-card
        view: season
        title: Spring 2026
        max_season: 12
        format_filter:
          - TV
        sort_by: score
        show_next_season: false

      - type: custom:anilist-card
        view: profile
        show_genre_chart: true
        chart_type: donut
        show_favourites: true
```

---

## Theme Integration

The AniList card inherits its visual appearance from the active Home Assistant theme. The following CSS custom properties are consumed by the card:

| CSS Variable | Usage in Card |
|-------------|---------------|
| `--primary-color` | Default accent color, active tab highlights, progress bar fill |
| `--accent-color` | Alternative accent for interactive elements and hover states |
| `--ha-card-background` | Card background color |
| `--card-background-color` | Fallback card background when `--ha-card-background` is not set |
| `--primary-text-color` | Titles, primary labels, entry names |
| `--secondary-text-color` | Subtitles, episode numbers, countdown text, metadata |
| `--divider-color` | Separators between entries, tab borders |
| `--secondary-background-color` | Status tab backgrounds, badge backgrounds, progress bar track |
| `--primary-font-family` | All text rendering within the card |

### Custom Overrides

The card configuration options `accent_color`, `secondary_color`, `card_background`, `card_opacity`, `border_color`, `border_width`, and `border_radius` take precedence over theme values when specified. This allows per-card customization without affecting other dashboard elements.

For example, a dark-themed dashboard can have one card with a custom blue accent:

```yaml
type: custom:anilist-card
view: airing
accent_color: "#02A9FF"
card_background: "#0d1117"
card_opacity: 90
```

The remaining properties (text colors, dividers, fonts) will still be inherited from the active theme.

---

## Internationalization

The card UI supports automatic language detection based on the Home Assistant instance language setting (`hass.language`). The following languages are supported:

| Language Code | Language |
|---------------|----------|
| `en` | English |
| `de` | German |
| `ja` | Japanese |

The card reads `hass.language` at render time and selects the appropriate translation for all UI strings including view labels, status names, countdown text, empty-state messages, and editor labels. No manual configuration is required -- the card follows whatever language is set in the Home Assistant user profile.

Anime and manga titles follow the `title_language` setting configured in the integration options (romaji, english, or native), which is independent of the card UI language.
