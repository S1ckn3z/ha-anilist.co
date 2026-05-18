# Installation & Setup

## Requirements

- Home Assistant **2025.2.0** or newer
- HACS **2.0.5** or newer (for HACS installation)
- An AniList.co account (optional — public data works without one)

## HACS Installation (Recommended)

1. Open **HACS** in your Home Assistant instance
2. Click the three-dot menu (top-right) and select **Custom repositories**
3. Add `https://github.com/S1ckn3z/ha-anilist.co` with category **Integration**
4. Search for **AniList** and click **Install**
5. **Restart Home Assistant**

The Lovelace card is bundled with the integration and registers automatically. No manual resource setup is needed.

## Manual Installation

1. Download `anilist.zip` from the [latest release](https://github.com/S1ckn3z/ha-anilist.co/releases)
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

AniList requires you to register your own API client. The most common setup error (`invalid_client / Client authentication failed`) comes from the **Redirect URL** not matching exactly — please follow the steps in order.

**1. Create an AniList API client**

- Open [AniList Developer Settings](https://anilist.co/settings/developer) → **Create New Client**
- **Name:** anything you like (e.g. `Home Assistant`)
- **Redirect URL:** for almost all installations, this is **exactly**:

  ```
  https://my.home-assistant.io/redirect/oauth
  ```

  This is the URL Home Assistant uses by default for all OAuth2 integrations (via the built-in [My Home Assistant](https://my.home-assistant.io/) redirector). When you set up the credentials inside HA, the dialog displays this same URL — copy it from there if in doubt.

  > **Advanced:** if you have explicitly removed the `my` integration from your HA config, HA falls back to `<your-ha-url>/auth/external/callback` (replace `<your-ha-url>` with the exact URL you open HA from in your browser — scheme + host + port, no trailing slash).

- Save the client and copy the **Client ID** and **Client Secret**.

**2. Add the integration in Home Assistant**

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Sign in with AniList account (OAuth2)**
4. Paste your **Client ID** and **Client Secret** when prompted
5. You'll be redirected to AniList — authorize the application
6. After authorization, the integration creates all sensors and calendars

This mode provides access to:
- Airing schedule and season data
- Personal watchlist and manga reading list
- Profile statistics, scores, and favourites
- Calendar entities for all data types

> 💡 If you see `{"error":"invalid_client","message":"Client authentication failed"}` on AniList, the Redirect URL on your AniList client doesn't match what HA is sending. Make sure it is set to `https://my.home-assistant.io/redirect/oauth` (or the local fallback noted above).

### Public Data Only (No Account)

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **AniList**
3. Select **Public data only (no account required)**

This mode provides:
- Airing schedule data
- Current and next season anime
- Public sensors (airing today, episodes this week, next episode)

Not available in public mode: watchlist, manga list, profile stats, authenticated sensors.

## Managing OAuth2 Application Credentials

The integration uses Home Assistant's built-in [Application Credentials](https://www.home-assistant.io/integrations/application_credentials/) system. After the first setup, you can view or change your stored client ID/secret under **Settings > Devices & Services > Application Credentials**.

## Re-Authentication

If your AniList token becomes invalid (e.g., revoked on AniList settings), the integration will show a **Re-authenticate** notification. Click it to restart the OAuth2 flow.

## Uninstalling

1. Go to **Settings > Devices & Services**
2. Find the AniList integration and click the three-dot menu
3. Select **Delete**
4. If installed via HACS, also uninstall from HACS
5. Restart Home Assistant
