# Development Guide -- AniList HA Integration

---

## 1. Project Structure

```
ha-anilist.co/
├── custom_components/
│   └── anilist/
│       ├── __init__.py              # Integration setup, card registration
│       ├── api.py                   # AniList GraphQL API client
│       ├── application_credentials.py  # OAuth2 credential provider
│       ├── calendar.py              # Calendar entity for airing schedule
│       ├── config_flow.py           # Config flow (OAuth2 + options)
│       ├── const.py                 # Constants (domain, platforms, keys)
│       ├── coordinator.py           # DataUpdateCoordinator for polling
│       ├── manifest.json            # Integration manifest (version, deps)
│       ├── sensor.py                # Sensor entities (airing, watchlist, etc.)
│       ├── strings.json             # UI strings for config flow
│       ├── translations/
│       │   ├── de.json              # German translations
│       │   └── en.json              # English translations
│       └── www/
│           └── anilist-card.js      # Built Lovelace card (output)
├── src/
│   └── card/
│       ├── anilist-card.ts          # Main card component (Lit)
│       ├── anilist-card-editor.ts   # Visual editor component (Lit)
│       └── types.ts                 # TypeScript interfaces
├── www/
│   └── anilist-card/
│       └── anilist-card.js          # Built card (secondary output)
├── docs/
│   ├── index.md                     # User documentation index
│   ├── installation.md              # Installation guide
│   ├── configuration.md             # Configuration reference
│   ├── card.md                      # Card usage guide
│   ├── sensors.md                   # Sensor documentation
│   ├── calendars.md                 # Calendar documentation
│   └── automations.md               # Automation examples
├── .github/
│   └── workflows/
│       ├── validate.yml             # CI validation
│       └── release.yml              # Release automation
├── hacs.json                        # HACS metadata
├── package.json                     # npm package (version, scripts, deps)
├── tsconfig.json                    # TypeScript compiler config
└── rollup.config.mjs               # Rollup bundler config
```

---

## 2. Prerequisites

- **Node.js** (18+ recommended) and **npm**
- **Python 3.12+**
- **Home Assistant** development environment (for testing the integration)
- **Git**

---

## 3. Setup

```bash
git clone https://github.com/S1ckn3z/ha-anilist.co.git
cd ha-anilist.co
npm install
```

This installs the build toolchain (Rollup, TypeScript) and the single runtime dependency (Lit 3.x).

---

## 4. Building

### One-time build

```bash
npm run build
```

Runs `rollup -c rollup.config.mjs`. Compiles TypeScript and bundles all card source files into a single ES module.

### Watch mode

```bash
npm run watch
```

Runs `rollup -c rollup.config.mjs --watch`. Automatically rebuilds when any file under `src/` changes.

### Output locations

The Rollup config produces two identical output files:

| Path | Purpose |
|---|---|
| `custom_components/anilist/www/anilist-card.js` | Shipped with the integration; served by `__init__.py` |
| `www/anilist-card/anilist-card.js` | For manual Lovelace resource registration (YAML mode) |

Both are ES modules with no source maps.

---

## 5. TypeScript Configuration

From `tsconfig.json`:

| Option | Value | Notes |
|---|---|---|
| `target` | `ES2019` | Broad browser support |
| `module` | `ES2020` | Native ES module output |
| `moduleResolution` | `bundler` | Rollup-compatible resolution |
| `experimentalDecorators` | `true` | Required for Lit decorators (@property, @state) |
| `useDefineForClassFields` | `false` | Required for decorator compatibility |
| `strict` | `true` | Full strict mode |
| `noUnusedLocals` | `true` | Error on unused local variables |
| `noUnusedParameters` | `true` | Error on unused function parameters |
| `declaration` | `false` | No .d.ts output |
| `sourceMap` | `false` | No source maps in production |

---

## 6. Code Standards

### Python (custom_components/)

- Follow Home Assistant core conventions
- Type hints on all function signatures and return values
- Use `async`/`await` for all I/O operations
- No external dependencies beyond what HA provides (only `aiohttp` from HA core)
- Use `logging.getLogger(__name__)` for all logging
- snake_case for all identifiers

### TypeScript (src/)

- Lit 3.x with decorators: `@property` for public reactive properties, `@state` for private reactive state
- Strict mode enabled -- no implicit `any`, no unused variables or parameters
- camelCase for all identifiers
- Single runtime dependency: `lit` (no other external libraries)
- All data access through `this.hass.states` -- no direct API calls from the frontend

### CSS

- kebab-case for all class names (e.g., `card-header`, `list-item`, `grid-cover-wrap`)
- Custom properties prefixed with `--al-` for card-specific variables
- Use HA theme variables as fallbacks (e.g., `var(--primary-color, #3DB4F2)`)

### General

- Commit messages in English
- No console.log in production code
- Prefer `const` over `let`; avoid `var`

---

## 7. Testing Locally

### Deploy the integration

Copy the `custom_components/anilist/` directory into your Home Assistant `config/custom_components/` directory. The built JS file at `custom_components/anilist/www/anilist-card.js` is included.

### Card auto-registration

The integration's `__init__.py` automatically registers the card JS as a Lovelace resource on setup. It serves the file from `/anilist-card/anilist-card.js` via `hass.http.register_static_path`. No manual resource configuration is needed in storage mode.

For YAML mode, add the resource manually:

```yaml
lovelace:
  resources:
    - url: /anilist-card/anilist-card.js
      type: module
```

### Force reload after changes

After rebuilding the card JS, clear your browser cache to pick up changes:

- **Hard reload**: Ctrl+Shift+R (or Cmd+Shift+R on macOS)
- Alternatively, open DevTools and check "Disable cache" while DevTools is open

### Inspect sensor data

Use **Developer Tools > States** in the HA UI to inspect sensor entities. Look for entities starting with `sensor.anilist_` and examine their `attributes` for the data arrays (`airing_schedule`, `watchlist`, `season_anime`, `manga_list`).

---

## 8. Release Process

1. **Update version numbers** in both files:
   - `custom_components/anilist/manifest.json` -- `"version"` field
   - `package.json` -- `"version"` field

2. **Build the card**:
   ```bash
   npm run build
   ```

3. **Commit all changes**:
   ```bash
   git add -A
   git commit -m "Release v0.2.1"
   ```

4. **Create a git tag**:
   ```bash
   git tag v0.2.1
   ```

5. **Push the tag**:
   ```bash
   git push origin main
   git push origin v0.2.1
   ```

6. **GitHub Actions** automatically:
   - Runs validation checks (`validate.yml`)
   - Creates a GitHub Release (`release.yml`)
   - Attaches `anilist.zip` containing the full `custom_components/anilist/` directory

HACS picks up new releases automatically based on the git tag.

---

## 9. Contributing

1. **Fork** the repository on GitHub

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**:
   - Edit Python files under `custom_components/anilist/`
   - Edit TypeScript files under `src/card/`
   - Run `npm run build` to compile the card

4. **Test locally** in a Home Assistant instance (see section 7)

5. **Submit a pull request** to the `main` branch with a clear description of your changes
