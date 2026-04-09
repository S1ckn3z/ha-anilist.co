# AniList for Home Assistant

Bring your anime and manga tracking into your Home Assistant dashboard.

## What you get

- **Custom Lovelace Card** with 5 views (Airing, Watchlist, Manga, Season, Profile)
- **13 Sensor Entities** — watch counts, scores, hours watched, top genre, and more
- **4 Calendar Entities** — airing schedule, season, watchlist, manga
- **Visual Card Editor** — configure everything through the UI
- **Automation Events** — get notified when new episodes air
- **Theme Integration** — automatically adapts to your HA theme

## Authentication

- **With AniList Account** (OAuth2) — full access to watchlist, manga, profile, and stats
- **Public Data Only** — airing schedule and season data without an account

## Card Views

| View | Description |
|------|-------------|
| Airing | Upcoming episodes with countdown timers |
| Watchlist | Your anime list with progress tracking |
| Manga | Manga reading list with chapter/volume progress |
| Season | Current season anime browser |
| Profile | Stats, genres, and favourites |

The card and all frontend resources are installed and registered automatically — no manual Lovelace resource setup needed.

See the [full documentation](https://github.com/S1CK/ha-anilist.co) for configuration options and examples.
