# Installation & Setup

## Requirements

- Home Assistant **2024.1.0** or newer
- HACS **2.0.5** or newer (for HACS installation)
- An AniList.co account (optional — public data works without one)

## HACS Installation (Recommended)

1. Open **HACS** in your Home Assistant instance
2. Click the three-dot menu (top-right) and select **Custom repositories**
3. Add `https://github.com/S1CK/ha-anilist.co` with category **Integration**
4. Search for **AniList** and click **Install**
5. **Restart Home Assistant**

The Lovelace card is bundled with the integration and registers automatically. No manual resource setup is needed.

## Manual Installation

1. Download `anilist.zip` from the [latest release](https://github.com/S1CK/ha-anilist.co/releases)
2. Extract to `config/custom_components/anilist/`
3. **Restart Home Assistant**

The card JS is served from within the integration at `/anilist-card/anilist-card.js` and auto-registers as a Lovelace resource on first load.

### YAML Mode Lovelace

If you use YAML mode for Lovelace dashboards, add the resource manually:

```yaml
resources:
  - url: /anilist-card/anilist-card.js
    type: module
```

## Integration Setup

### With AniList Account (Full Features)

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Sign in with AniList account (OAuth2)**
4. You will be redirected to AniList — authorize the application
5. After authorization, the integration creates all sensors and calendars

This mode provides access to:
- Airing schedule and season data
- Personal watchlist and manga reading list
- Profile statistics, scores, and favourites
- Calendar entities for all data types

### Public Data Only (No Account)

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Public data only (no account required)**

This mode provides:
- Airing schedule data
- Current and next season anime
- Public sensors (airing today, episodes this week, next episode)

Not available in public mode: watchlist, manga list, profile stats, authenticated sensors.

## OAuth2 Application Credentials

The integration uses Home Assistant's built-in OAuth2 flow with application credentials. To use your own AniList API client:

1. Go to [AniList Developer Settings](https://anilist.co/settings/developer)
2. Create a new API client
3. Set the redirect URL to your HA instance: `https://your-ha-instance/auth/external/callback`
4. In HA, go to **Settings > Devices & Services > Application Credentials**
5. Add credentials for the **AniList** domain with your client ID and secret

## Re-Authentication

If your AniList token becomes invalid (e.g., revoked on AniList settings), the integration will show a **Re-authenticate** notification. Click it to restart the OAuth2 flow.

## Uninstalling

1. Go to **Settings > Devices & Services**
2. Find the AniList integration and click the three-dot menu
3. Select **Delete**
4. If installed via HACS, also uninstall from HACS
5. Restart Home Assistant
