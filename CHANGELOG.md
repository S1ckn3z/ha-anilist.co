# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-04-10

First public beta release. This version addresses a comprehensive audit of the
codebase and adds full internationalization across 23 languages.

### Added

- **🌍 23-language support** across backend, Lovelace card, and visual editor
  - New languages: Spanish, French, Italian, Portuguese, Dutch, Polish, Swedish,
    Danish, Norwegian, Finnish, Czech, Slovak, Romanian, Hungarian, Bulgarian,
    Greek, Turkish, Ukrainian, Russian, Croatian, Japanese (+ existing English, German)
- **📊 Automated test suite** — 123 pytest tests covering API, coordinator,
  sensors, WebSocket API, and config flow
- **🔐 WebSocket API permission gating** — private endpoints (`watchlist`,
  `manga`, `profile`) now require HA admin
- **📄 Season pagination** — fetches all season anime, not just the first 50
- **⚙️ `excluded_genres` option** in the options flow with free-form multi-select
- **🔁 Improved reauth flow** — verifies same AniList account and updates entry
  in place instead of creating a new one
- **🖊️ Full editor i18n** — all visual editor labels now translatable
- **✅ CI frontend verification** — validate and release workflows now run
  `tsc --noEmit`, `npm run build`, and `git diff --exit-code` to prevent
  shipping stale bundles
- **CHANGELOG.md** — this file

### Changed

- **Bundle minified** via Rollup terser — ~27% size reduction (116 KB → 85 KB)
- **Score sensors always numeric** — smiley mode moved to extra attribute to
  keep `state_class=measurement` valid
- **Manga calendar timezone** now uses HA's `dt_util` helpers instead of
  host-local naive dates
- **`media_formats`** option now applies to both airing schedule and season
  data (previously only airing)
- **Frontend fallback** is now entry-aware: when `entry_id` is configured,
  the card no longer scans unrelated sensor attributes
- **HTTP 401** from AniList is now treated as `AniListAuthError` (triggers
  reauth) instead of a generic network error
- **OAuth token exchange** now uses `async with` context manager
- **`hass.data[DOMAIN]`** is cleaned up on last entry unload

### Fixed

- **📡 Broken `anilist_episode_airing` event** — the lookback window now uses
  `last_successful_refresh + update_interval + 30s` so episodes that air
  between polls are no longer missed
- **Stale WebSocket cache** on failure — per-view cache is cleared, preventing
  outdated data from persisting after WS errors
- **WebSocket admin bypass** via card entity fallback — private views no longer
  fall back to entity attributes when WS is denied
- **Missing `siteUrl`** in `QUERY_VIEWER` — `ws_profile` now returns the
  actual viewer profile URL
- **Dead card options removed** — `score_display`, `show_next_season`, and
  `link_target: ha_more_info` have been deprecated (use `score_position` and
  `score_source` instead)
- **Status tab initialization** — auto-selects first configured status when
  default `CURRENT` is not in the visible list
- **`REPEATING` status** added to editor, card tab labels, and all 23 languages
- **Retry-after kwarg** removed from `UpdateFailed` for compatibility with
  all supported HA versions
- **Manifest.json** now declares `homeassistant: 2025.2.0` minimum version
- **Docs drift** — `docs/automations.md` now references the correct sensor
  attributes (`airing_schedule`, `watchlist`, `manga_list`, `season_anime`)

### Accessibility

- **`aria-label`** on search input
- **`role="button"` + `tabindex="0"` + keyboard handlers** on all clickable
  card items (Enter/Space support for screen readers)

### Security

- **WebSocket API admin gate** — all private endpoints (`anilist/watchlist`,
  `anilist/manga`, `anilist/profile`) are now decorated with
  `@websocket_api.require_admin`. Previously, any authenticated HA user
  could read another user's private AniList data. **[CVE-style fix]**

## [0.3.0] - 2026-04-09

- Card v3 — HD covers, layout modes, WebSocket API, version bump

## [0.2.0] - 2026-04-09

- Card v2, visual editor, HACS release readiness, full documentation

## [0.1.0] - 2026-04-09

- Initial AniList integration with OAuth2 flow
- Phases 4–8: Manga, Stats, Events, Season, Lovelace Card

[0.4.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.0
[0.3.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.3.0
[0.2.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.2.0
[0.1.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.1.0
