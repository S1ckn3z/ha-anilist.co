"""Application credentials for the AniList integration."""
from __future__ import annotations

from homeassistant.components.application_credentials import (
    AuthorizationServer,
    ClientCredential,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.config_entry_oauth2_flow import LocalOAuth2Implementation

AUTHORIZE_URL = "https://anilist.co/api/v2/oauth/authorize"
TOKEN_URL = "https://anilist.co/api/v2/oauth/token"


class AniListOAuth2Implementation(LocalOAuth2Implementation):
    """AniList OAuth2 implementation.

    AniList requires the token exchange to be sent as JSON (not form-encoded),
    which differs from the OAuth2 standard. We override async_resolve_external_data
    to send the correct Content-Type.
    """

    async def async_resolve_external_data(self, external_data: dict) -> dict:
        """Exchange the authorization code for tokens using a JSON body."""
        session = async_get_clientsession(self.hass)
        resp = await session.post(
            TOKEN_URL,
            json={
                "grant_type": "authorization_code",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "redirect_uri": external_data["state"]["redirect_uri"],
                "code": external_data["code"],
            },
        )
        resp.raise_for_status()
        return await resp.json()

    async def _async_refresh_token(self, token: dict) -> dict:
        """AniList tokens do not expire — return the existing token unchanged.

        AniList issues permanent bearer tokens without refresh tokens.
        Overriding this method prevents HA from attempting a refresh_token
        grant that would always fail.
        """
        return token


async def async_get_authorization_server(hass: HomeAssistant) -> AuthorizationServer:
    """Return the AniList OAuth2 authorization server endpoints."""
    return AuthorizationServer(
        authorize_url=AUTHORIZE_URL,
        token_url=TOKEN_URL,
    )


async def async_get_auth_implementation(
    hass: HomeAssistant,
    auth_domain: str,
    credential: ClientCredential,
) -> AniListOAuth2Implementation:
    """Return the custom AniList OAuth2 implementation."""
    return AniListOAuth2Implementation(
        hass,
        auth_domain,
        credential.client_id,
        credential.client_secret,
        AUTHORIZE_URL,
        TOKEN_URL,
    )
