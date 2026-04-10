# AniList for Home Assistant

Bring your anime and manga tracking into your Home Assistant dashboard.

## What you get

- **Custom Lovelace Card** with 5 views (Airing, Watchlist, Manga, Season, Profile)
- **Grid & List Layouts** — switch between cover grids and list rows per view
- **HD Cover Images** — configurable quality (small / medium / large)
- **Smart Score System** — user, average, or auto-detect scores on covers or inline
- **WebSocket API** — full data access bypassing the 16 KB sensor attribute limit
- **13 Sensor Entities** — watch counts, scores, hours watched, top genre, and more
- **4 Calendar Entities** — airing schedule, season, watchlist, manga
- **Visual Card Editor** — configure everything through the UI
- **Automation Events** — get notified when new episodes air
- **Theme Integration** — automatically adapts to your HA theme
- **Scroll Control** — pixel-perfect visible items, scroll-snap, fade indicators
- **i18n** — English and German translations, with Japanese support in the card frontend only

## Authentication

- **With AniList Account** (OAuth2) — full access to watchlist, manga, profile, and stats
- **Public Data Only** — airing schedule and season data without an account

## Card Views

| View | Description |
|------|-------------|
| Airing | Upcoming episodes with countdown timers |
| Watchlist | Your anime list with progress, next-episode countdowns, and cover scores |
| Manga | Manga reading list with chapter/volume progress |
| Season | Current & next season anime browser with genre/format filters |
| Profile | Stats, genre charts, and favourite anime |

## Key Configuration Options

| Option | Description |
|--------|-------------|
| `layout_mode` | `grid` (covers) or `list` (rows) — per view |
| `cover_quality` | `small`, `medium`, or `large` (HD) |
| `score_position` | Badge placement: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `inline`, `none` |
| `score_source` | `user`, `average`, or `auto` |
| `visible_items` | Pixel-perfect scroll height based on item count |
| `scroll_snap` | Snap to item boundaries |
| `card_opacity` | Background-only opacity (text/images stay fully visible) |

The card and all frontend resources are installed and registered automatically — no manual Lovelace resource setup needed.

See the [full documentation](https://github.com/S1CK/ha-anilist.co) for all configuration options and examples.
