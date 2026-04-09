# Frontend Reference -- AniList Card

Technical documentation of the TypeScript/Lit Lovelace card internals.

Source files live under `src/card/`.

---

## 1. Interfaces (types.ts)

### AniListCardConfig

The main configuration object for the card. All fields except `type` are optional.

| Field | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | (required) | Must be `"custom:anilist-card"` |
| **General** | | | |
| `view` | `"airing" \| "watchlist" \| "season" \| "profile" \| "manga"` | `"airing"` | Active view |
| `title` | `string` | (auto from view) | Custom card title |
| `max_items` | `number` | `5` | Global fallback max items |
| `max_airing` | `number` | -- | Override max for airing view |
| `max_watchlist` | `number` | -- | Override max for watchlist view |
| `max_season` | `number` | -- | Override max for season view |
| `max_manga` | `number` | -- | Override max for manga view |
| **Display** | | | |
| `show_cover` | `boolean` | `true` | Show cover images |
| `cover_size` | `"small" \| "medium" \| "large"` | `"medium"` | Cover image dimensions |
| `show_countdown` | `boolean` | `true` | Show airing countdown |
| `countdown_format` | `"relative" \| "absolute" \| "both"` | `"relative"` | Countdown display style |
| `show_progress` | `boolean` | `true` | Show episode/chapter progress |
| `show_progress_bar` | `boolean` | `true` | Show visual progress bar |
| `score_display` | `"stars" \| "bar" \| "number" \| "none"` | `"number"` | Score visualization mode |
| `show_badges` | `boolean` | `true` | Show status badges |
| `show_search` | `boolean` | `false` | Show search input |
| `show_tooltips` | `boolean` | `false` | Show hover tooltips |
| `link_target` | `"anilist" \| "none" \| "ha_more_info"` | `"anilist"` | Click behavior |
| `sort_by` | `"time" \| "title" \| "score"` | `"time"` | Sort order for airing view |
| `card_padding` | `"compact" \| "normal" \| "relaxed"` | `"normal"` | Card spacing (8px / 12px / 16px) |
| **Airing extras** | | | |
| `show_duration` | `boolean` | `false` | Show episode duration in minutes |
| `show_genres` | `boolean` | `false` | Show genre chips (up to 3) |
| `show_average_score` | `boolean` | `false` | Show average score percentage |
| `show_format_badge` | `boolean` | `false` | Show format badge (TV/Movie/OVA) |
| **Watchlist / Manga** | | | |
| `watchlist_statuses` | `string[]` | `["CURRENT", "PLANNING", "COMPLETED", "PAUSED", "DROPPED"]` | Visible status filters |
| `show_status_tabs` | `boolean` | `true` | Show status tab bar |
| `overflow_mode` | `"scroll" \| "limit"` | `"scroll"` | List overflow handling |
| `scroll_height` | `number` | `400` | Max height in px when overflow_mode is scroll |
| **Profile** | | | |
| `show_avatar` | `boolean` | `true` | Show user avatar |
| `show_username` | `boolean` | `true` | Show username |
| `show_anime_stats` | `boolean` | `true` | Show anime statistics grid |
| `show_manga_stats` | `boolean` | `true` | Show manga statistics grid |
| `show_genre_chart` | `boolean` | `true` | Show genre visualization |
| `show_favourites` | `boolean` | `true` | Show favourite anime list |
| `chart_type` | `"bar" \| "donut" \| "tags"` | `"bar"` | Genre chart visualization type |
| **Season** | | | |
| `genre_filter` | `string[]` | `[]` | Filter by genres (empty = all) |
| `format_filter` | `string[]` | `[]` | Filter by format (TV, MOVIE, OVA, etc.) |
| `show_next_season` | `boolean` | `false` | Include next season entries |
| **Colors** | | | |
| `accent_color` | `string` | -- | Override accent color |
| `secondary_color` | `string` | -- | Override secondary color |
| `card_background` | `string` | -- | Override card background |
| `card_opacity` | `number` | -- | Card opacity (0-100, mapped to 0-1) |
| `border_color` | `string` | -- | Override border color |
| `border_width` | `number` | -- | Border width in px |
| `border_radius` | `number` | -- | Border radius in px |
| **Legacy** | | | |
| `link_to_anilist` | `boolean` | `true` | Deprecated. Mapped to `link_target: "none"` when `false` |

### HomeAssistant

Minimal type for the HA frontend host object.

| Field | Type | Description |
|---|---|---|
| `states` | `Record<string, HassEntity>` | All entity states |
| `language` | `string` | Active HA language code |
| `locale` | `{ language: string }` | Locale object |

### HassEntity

| Field | Type | Description |
|---|---|---|
| `entity_id` | `string` | Entity identifier |
| `state` | `string` | Current state value |
| `attributes` | `Record<string, unknown>` | Extra state attributes |
| `last_changed` | `string` | ISO timestamp |
| `last_updated` | `string` | ISO timestamp |

### AiringAnime

Data shape from the `airing_schedule` sensor attribute.

| Field | Type | Required | Description |
|---|---|---|---|
| `media_id` | `number` | yes | AniList media ID |
| `title` | `string` | yes | Anime title |
| `episode` | `number` | yes | Episode number |
| `airing_at` | `string` | yes | ISO or Unix timestamp of airing |
| `cover_image` | `string` | no | Cover image URL |
| `site_url` | `string` | no | AniList page URL |
| `duration` | `number` | no | Episode duration in minutes |
| `genres` | `string[]` | no | Genre tags |
| `average_score` | `number` | no | Average score (0-100) |
| `format` | `string` | no | Media format (TV, MOVIE, OVA, etc.) |

### WatchlistAnime

Data shape from the `watchlist` sensor attribute.

| Field | Type | Required | Description |
|---|---|---|---|
| `media_id` | `number` | yes | AniList media ID |
| `title` | `string` | yes | Anime title |
| `status` | `string` | yes | Watch status (CURRENT, PLANNING, etc.) |
| `progress` | `number` | yes | Episodes watched |
| `episodes` | `number` | no | Total episode count |
| `score` | `number` | no | User score |
| `cover_image` | `string` | no | Cover image URL |
| `site_url` | `string` | no | AniList page URL |

### MangaItem

Data shape from the `manga_list` sensor attribute.

| Field | Type | Required | Description |
|---|---|---|---|
| `media_id` | `number` | yes | AniList media ID |
| `title` | `string` | yes | Manga title |
| `status` | `string` | yes | Reading status |
| `progress` | `number` | yes | Chapters read |
| `progress_volumes` | `number` | yes | Volumes read |
| `chapters` | `number` | no | Total chapters |
| `volumes` | `number` | no | Total volumes |
| `score` | `number` | no | User score |
| `cover_image` | `string` | no | Cover image URL |
| `site_url` | `string` | no | AniList page URL |

### SeasonAnime

Data shape from the `season_anime` sensor attribute.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `number` | yes | AniList media ID |
| `title` | `string` | yes | Anime title |
| `average_score` | `number` | no | Average score (0-100) |
| `episodes` | `number` | no | Total episodes |
| `format` | `string` | no | Media format |
| `genres` | `string[]` | no | Genre tags |
| `cover_image` | `string` | no | Cover image URL |
| `site_url` | `string` | no | AniList page URL |
| `next_airing_episode` | `{ airing_at: string; episode: number }` | no | Next airing info |

### ViewerInfo

| Field | Type | Description |
|---|---|---|
| `username` | `string?` | AniList username |
| `avatar` | `string?` | Avatar URL |
| `site_url` | `string?` | Profile URL |

### UserProfile

| Field | Type | Description |
|---|---|---|
| `username` | `string?` | AniList username |
| `avatar` | `string?` | Avatar URL |
| `site_url` | `string?` | Profile URL |
| `anime_count` | `number?` | Total anime watched |
| `episodes_watched` | `number?` | Total episodes |
| `hours_watched` | `number?` | Total hours |
| `mean_score` | `number?` | Mean score |
| `top_genres` | `string[]?` | Top genres list |
| `favourite_anime` | `{ title: string; site_url?: string; cover?: string }[]?` | Favourite anime |

---

## 2. Card Component (anilist-card.ts)

### Class: AniListCard

Extends `LitElement`. Registered as `anilist-card` custom element.

#### Properties

| Property | Decorator | Type | Description |
|---|---|---|---|
| `hass` | `@property({ attribute: false })` | `HomeAssistant` | HA host object, set by HA framework |
| `_config` | `@state()` | `AniListCardConfig` | Merged configuration |
| `_activeTab` | `@state()` | `string` | Active status tab, default `"CURRENT"` |
| `_searchQuery` | `@state()` | `string` | Current search filter text, default `""` |
| `_tick` | (private) | `ReturnType<typeof setInterval>` | 60-second update interval handle |

#### Static Methods

**`getConfigElement()`** -- Returns a new `anilist-card-editor` element for the visual editor.

**`getStubConfig()`** -- Returns `{ type: "custom:anilist-card", view: "airing", max_items: 5 }`. Used by HA when adding a new card.

#### Lifecycle

**`setConfig(config)`** -- Merges user config over the full set of defaults:

```
view: "airing"
max_items: 5
show_cover: true
cover_size: "medium"
show_countdown: true
countdown_format: "relative"
show_progress: true
show_progress_bar: true
score_display: "number"
show_badges: true
show_search: false
show_tooltips: false
link_target: "anilist"
sort_by: "time"
card_padding: "normal"
show_duration: false
show_genres: false
show_average_score: false
show_format_badge: false
watchlist_statuses: ["CURRENT", "PLANNING", "COMPLETED", "PAUSED", "DROPPED"]
show_status_tabs: true
genre_filter: []
format_filter: []
show_next_season: false
chart_type: "bar"
overflow_mode: "scroll"
scroll_height: 400
show_avatar: true
show_username: true
show_anime_stats: true
show_manga_stats: true
show_genre_chart: true
show_favourites: true
link_to_anilist: true
```

Legacy compat: if `link_to_anilist === false` and no explicit `link_target`, sets `link_target` to `"none"`.

**`connectedCallback()`** -- Calls `super.connectedCallback()`, then starts a 60-second `setInterval` that calls `this.requestUpdate()` to keep countdowns fresh.

**`disconnectedCallback()`** -- Calls `super.disconnectedCallback()`, then `clearInterval` on the timer.

#### Render Methods

| Method | View | Output |
|---|---|---|
| `render()` | all | Main card shell: header (brand dot, title, AniList link), content area, delegates to view renderer |
| `_renderSearch()` | all | Search input bar (shown when `show_search` is true) |
| `_renderEmpty(messageKey)` | all | Empty-state icon and translated message |
| `_renderStatusTabs(statuses)` | watchlist, manga | Horizontal pill-style tab bar for status filtering |
| `_renderAiring()` | airing | Vertical list of airing items with cover, title, episode, countdown, badges |
| `_renderWatchlist()` | watchlist | Status tabs (optional) + grid of watchlist items |
| `_renderWatchlistGrid(items)` | watchlist | CSS grid with covers, scores, progress bars |
| `_renderSeason()` | season | Scrollable vertical list of season entries with score/format chips |
| `_renderManga()` | manga | Status tabs (optional) + grid of manga items |
| `_renderMangaGrid(items)` | manga | CSS grid with covers, scores, chapter progress |
| `_renderProfile()` | profile | Avatar, username, stat tiles, genre chart, favourites |
| `_renderGenreChart(genres)` | profile | Bar chart, donut (conic-gradient), or tag chips depending on `chart_type` |
| `_statTile(label, value)` | profile | Single stat tile with value and label |

#### Data Extraction Methods

All data extraction methods follow the same entity discovery pattern: scan `this.hass.states` for entities whose `entity_id` starts with `sensor.anilist_`, then read specific attribute arrays from `entity.attributes`.

| Method | Attribute Key | Returns | Notes |
|---|---|---|---|
| `_getAiringItems()` | `airing_schedule` | `AiringAnime[]` | Falls back to simple sensors (`sensor.anilist_next_airing_anime`, etc.). Sorts by `sort_by` config. Sliced to `_maxFor("airing")`. |
| `_getWatchlistItems()` | `watchlist` | `WatchlistAnime[]` | Raw list, filtering done by caller |
| `_getSeasonItems()` | `season_anime` | `SeasonAnime[]` | Applies `genre_filter` and `format_filter`. Sliced to `_maxFor("season")`. |
| `_getMangaItems()` | `manga_list` | `MangaItem[]` | Raw list, filtering done by caller |

The profile view does not use an extraction method. Instead it reads individual sensor states directly (e.g., `sensor.anilist_total_anime_watched`, `sensor.anilist_anime_mean_score`) and reads `top_genres`, `favourite_anime`, `viewer_name`, and `viewer_avatar` from `sensor.anilist_top_genre` attributes.

#### Helper Methods

**`_t(key: string): string`** -- Translates a key using the current HA language. Falls back to English if the language is not supported or the key is missing.

**`_lang(): string`** -- Returns the first two characters of `this.hass.language`, defaulting to `"en"`.

**`_padding(): string`** -- Returns CSS padding value based on `card_padding`: `"compact"` = `"8px"`, `"relaxed"` = `"16px"`, default `"12px"`.

**`_coverDims(): { w: number; h: number }`** -- Returns pixel dimensions based on `cover_size`: `"small"` = 40x56, `"large"` = 64x90, default (medium) = 48x68.

**`_maxFor(view: string): number`** -- Returns the max item count for a view. Checks view-specific overrides (`max_airing`, `max_watchlist`, `max_season`, `max_manga`) first, falls back to `max_items` (default 5).

**`_shouldLink(): boolean`** -- Returns `true` if `link_target === "anilist"`.

**`_handleClick(url?: string)`** -- Opens `url` in a new tab via `window.open` if `_shouldLink()` is true and a URL is provided.

**`_hostStyle(): string`** -- Builds an inline `style` string of CSS custom property overrides from color config fields. Maps `card_opacity` from 0-100 range to 0-1.

**`_matchesSearch(title: string): boolean`** -- Returns `true` if `_searchQuery` is empty or `title` contains the query (case-insensitive).

**`_defaultTitle(view: string): string`** -- Maps view names to i18n keys: `airing` -> `next_episodes`, `watchlist` -> `watching`, `season` -> `this_season`, `profile` -> `profile`, `manga` -> `manga`.

#### Module-Level Helpers

**`countdown(isoOrTs, format, lang)`** -- Computes countdown string from an ISO date or Unix timestamp. Handles relative (`5h 30m`, `2d 3h`), absolute (locale-formatted date), or both formats. Returns the "aired" translation when the time has passed.

**`getEntityState(hass, entityId)`** -- Safe accessor that returns `hass.states[entityId]?.state ?? ""`.

**`renderScore(score, display)`** -- Returns a Lit template for score display: stars badge, progress bar, or plain number. Returns `nothing` for `"none"` or missing score.

---

## 3. Editor Component (anilist-card-editor.ts)

### Class: AniListCardEditor

Extends `LitElement`. Registered as `anilist-card-editor` custom element.

#### Properties

| Property | Decorator | Type | Description |
|---|---|---|---|
| `hass` | `@property({ attribute: false })` | `HomeAssistant` | HA host object |
| `_config` | `@state()` | `AniListCardConfig` | Working copy of the config |
| `_tab` | `@state()` | `EditorTab` | Active editor tab: `"general"`, `"view"`, or `"colors"` |

#### Editor Tabs

The editor has 3 tabs. The middle tab label changes dynamically to match the selected view name.

**General tab** (`_renderGeneral`):
- View selector (airing, watchlist, season, profile, manga)
- Title text input
- Card spacing selector
- Click action selector
- Show cover toggle (with conditional cover size selector)
- Show search toggle
- Show tooltips toggle

**View tab** (`_renderViewSettings`):
Renders view-specific settings based on the current `view` value:

- **Airing** (`_renderAiringSettings`): max items, sort by, countdown toggle + format, badges, duration, genres, average score, format badge
- **Watchlist** (`_renderWatchlistSettings`): max items, overflow mode (+ scroll height), score display, progress toggles, status tabs toggle, status checkbox group
- **Season** (`_renderSeasonSettings`): max items, next season toggle, score display, genre filter (comma-separated text), format filter (comma-separated text)
- **Profile** (`_renderProfileSettings`): avatar, username, anime stats, manga stats, genre chart (+ chart type), favourites toggles
- **Manga** (`_renderMangaSettings`): max items, overflow mode (+ scroll height), score display, progress toggles, status tabs toggle, status checkbox group

**Colors tab** (`_renderColors`):
- Accent color, secondary color, card background (color picker + text input)
- Card opacity slider (0-100)
- Border color (color picker + text input)
- Border width (number, 0-10)
- Border radius (number, 0-30)

#### Form Helpers

| Method | Signature | Renders |
|---|---|---|
| `_select` | `(key, label, options)` | `<select>` dropdown |
| `_text` | `(key, label)` | Text `<input>` |
| `_number` | `(key, label, min, max)` | Number `<input>` with min/max |
| `_toggle` | `(key, label)` | Toggle switch (checkbox styled as slider) |
| `_color` | `(key, label)` | Color picker + text input side by side |
| `_slider` | `(key, label, min, max)` | Range `<input>` with current value in label |

#### Event Dispatch

All config changes flow through `_set(key, value)`, which creates a shallow copy of the config with the updated field, then calls `_dispatch()`. The dispatch method fires a `config-changed` CustomEvent:

```typescript
new CustomEvent("config-changed", {
  detail: { config: this._config },
  bubbles: true,
  composed: true,
})
```

This is the standard HA Lovelace editor protocol.

---

## 4. CSS Custom Properties

The card defines custom properties on `:host` that map to HA theme variables. Users can override them via the card config color fields.

| Card Variable | HA Theme Fallback | Default | Description |
|---|---|---|---|
| `--al-accent` | `--primary-color` | `#3DB4F2` | Primary accent (links, highlights, active tabs) |
| `--al-secondary` | `--accent-color` | `#C063FF` | Secondary accent (gradients, genre chips) |
| `--al-card-bg` | `--ha-card-background`, `--card-background-color` | `#1A1A2E` | Card background |
| `--al-card-bg2` | `--secondary-background-color` | `#16213E` | Header and nested element background |
| `--al-text` | `--primary-text-color` | `#E8E8E8` | Primary text |
| `--al-sub` | `--secondary-text-color` | `#9B9B9B` | Subtitle/secondary text |
| `--al-border-color` | `--divider-color` | `rgba(61,180,242,0.15)` | Border color |
| `--al-border-width` | -- | `1px` | Border width |
| `--al-border-radius` | -- | `12px` | Border radius |
| `--al-card-opacity` | -- | `1` | Card opacity (config value 0-100 mapped to 0.0-1.0) |

---

## 5. i18n

### Supported Languages

- `en` -- English
- `de` -- German
- `ja` -- Japanese

Language is detected from `this.hass.language` (first 2 characters). Falls back to `en`.

### Translation Keys

| Key | en | de | ja |
|---|---|---|---|
| `next_episodes` | Next Episodes | Nachste Episoden | Next no Episode |
| `watching` | Currently Watching | Schaue ich gerade | Viewing |
| `this_season` | This Season | Diese Season | Konki |
| `profile` | AniList Profile | AniList Profil | AniList Profile |
| `manga` | Manga Reading | Manga Leseliste | Reading |
| `no_episodes` | No episodes in the coming days. | Keine Episoden in den nachsten Tagen. | Kongo no Episode ha arimasen. |
| `no_watchlist` | No anime in the watchlist. | Keine Anime in der Watchlist. | Watch list ni Anime ga arimasen. |
| `no_season` | No season data available. | Keine Season-Daten verfugbar. | Season data ga arimasen. |
| `no_profile` | No profile stats available. | Keine Profil-Statistiken verfugbar. | Profile toukei ga arimasen. |
| `no_manga` | No manga in the list. | Keine Manga in der Liste. | List ni Manga ga arimasen. |
| `auth_only` | Only for logged-in users. | Nur fur eingeloggte Nutzer. | Login user nomi. |
| `episode` | Episode | Episode | Episode |
| `ep` | Ep. | Ep. | Wa |
| `aired` | Aired | Ausgestrahlt | Housou zumi |
| `anime` | Anime | Anime | Anime |
| `episodes` | Episodes | Episoden | Episode |
| `hours` | Hours | Stunden | Jikan |
| `score_avg` | Avg Score | O Score | Heikin Score |
| `watching_now` | Watching | Schaue ich | Viewing |
| `chapters` | Chapters | Kapitel | Shou |
| `volumes` | Volumes | Bande | Kan |
| `manga_count` | Manga | Manga | Manga |
| `manga_score` | Manga Score | Manga Score | Manga Score |
| `top_genres` | Top Genres | Top Genres | Top Genre |
| `favourites` | Favourites | Favoriten | Okiniiri |
| `search_placeholder` | Search... | Suchen... | Kensaku... |
| `current` | Current | Aktuell | Viewing |
| `planning` | Planning | Geplant | Yotei |
| `completed` | Completed | Abgeschlossen | Kanryou |
| `paused` | Paused | Pausiert | Ichiji teishi |
| `dropped` | Dropped | Abgebrochen | Chuudan |
| `next_season_label` | Next Season | Nachste Season | Raiki |

---

## 6. Card Registration

At the bottom of `anilist-card.ts`, the card registers itself with the Home Assistant custom card registry:

```typescript
(window as unknown as Record<string, unknown>)["customCards"] =
  (window as unknown as Record<string, unknown[]>)["customCards"] || [];
(
  (window as unknown as Record<string, unknown[]>)["customCards"] as Array<{
    type: string;
    name: string;
    description: string;
    preview: boolean;
  }>
).push({
  type: "anilist-card",
  name: "AniList",
  description: "AniList anime & manga tracker card with airing, watchlist, season, profile and manga views.",
  preview: true,
});
```

This causes HA to:

- List the card in the "Add Card" picker under the name "AniList"
- Show a live preview in the card picker (because `preview: true`)
- Associate `type: "anilist-card"` with the `custom:anilist-card` element

The custom element itself is registered via:

```typescript
customElements.define("anilist-card", AniListCard);
```

The editor element is registered in `anilist-card-editor.ts`:

```typescript
customElements.define("anilist-card-editor", AniListCardEditor);
```

The card's `getConfigElement()` static method returns a new editor element, which HA calls when opening the visual card editor.
