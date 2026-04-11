# Changelog

## [0.4.4] - 2026-04-11

### Fixed
- Card not loading with "Custom element doesn't exist: anilist-card" — Lovelace resource is now registered correctly on setup.
- Fall back to a clear warning with manual-registration instructions if Lovelace storage is unavailable (YAML mode).

## [0.4.3] - 2026-04-11

### Added
- Integration logo shipped directly in the integration (requires HA 2026.3+).

## [0.4.2] - 2026-04-11

### Added
- Project logo.
- Centered logo and badges at the top of the README.

## [0.4.1] - 2026-04-11

### Added
- GitHub issue templates for bug reports and feature requests.
- Release notes now include the changelog directly.
- Single unified CI workflow (validation, tests, build, release).

### Fixed
- Hassfest manifest compliance: removed invalid `homeassistant` field, sorted keys.
- Lowercased selector option keys in all 23 translation files.
- Missing `aiohttp` / `voluptuous` in CI test dependencies.

### Changed
- CI actions now run on Node.js 24.

## [0.4.0] - 2026-04-10

First public beta. Full audit pass and internationalization.

### Added
- Support for 23 languages across backend, card, and editor (en, de, ja, es, fr, it, pt, nl, pl, sv, da, nb, fi, cs, sk, ro, hu, bg, el, tr, uk, ru, hr).
- Automated test suite (123 pytest tests).
- Admin-only gate on WebSocket endpoints for private data (`watchlist`, `manga`, `profile`).
- Season pagination — all season anime, not just the first 50.
- `excluded_genres` option in the options flow.
- Reauth flow now verifies the same AniList account and updates the entry in place.
- `REPEATING` status in the editor, tab labels, and all translations.

### Changed
- Minified card bundle (~27% smaller).
- Score sensors stay numeric; smiley mode moved to an extra attribute.
- Manga calendar now uses HA's timezone helpers.
- `media_formats` option also filters season data.
- Card fallback is entry-aware — no more scanning unrelated sensors when `entry_id` is set.
- HTTP 401 from AniList now triggers reauth instead of a generic error.

### Fixed
- Broken `anilist_episode_airing` event — the lookback window now covers the gap between polls.
- Stale WebSocket cache on failure.
- Profile view missing `siteUrl` in the viewer query.
- Status tabs auto-select the first configured status when `CURRENT` isn't visible.

### Security
- WebSocket API `watchlist`, `manga`, and `profile` endpoints are now admin-only. Previously any authenticated HA user could read private AniList data.

## [0.3.0] - 2026-04-09

- Card v3: HD covers, grid/list layout modes, WebSocket API.

## [0.2.0] - 2026-04-09

- Card v2: visual editor, HACS release readiness.

## [0.1.0] - 2026-04-09

- Initial release: OAuth2, sensors, calendars, Lovelace card.

[0.4.4]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.4
[0.4.3]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.3
[0.4.2]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.2
[0.4.1]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.1
[0.4.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.4.0
[0.3.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.3.0
[0.2.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.2.0
[0.1.0]: https://github.com/S1ckn3z/ha-anilist.co/releases/tag/v0.1.0
