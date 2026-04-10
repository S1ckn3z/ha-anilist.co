"""Tests for the AniList config flow (config_flow.py)."""
from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from custom_components.anilist.api import AniListAuthError, AniListError


# ---------------------------------------------------------------------------
# Config flow tests
# ---------------------------------------------------------------------------


class TestAniListConfigFlow:
    """Tests for the AniList config flow."""

    def _make_flow(self):
        """Create a config flow instance with mocked hass."""
        from custom_components.anilist.config_flow import AniListConfigFlow

        flow = AniListConfigFlow()
        flow.hass = MagicMock()
        flow.context = {}
        return flow

    @pytest.mark.asyncio
    async def test_step_user_shows_menu(self):
        """Test async_step_user shows a menu with oauth and public_only."""
        flow = self._make_flow()
        result = await flow.async_step_user()

        # The stub returns a dict with menu_options
        assert "menu_options" in result
        assert "oauth" in result["menu_options"]
        assert "public_only" in result["menu_options"]

    @pytest.mark.asyncio
    async def test_step_public_only_creates_entry(self):
        """Test public_only creates an entry with unique ID."""
        flow = self._make_flow()
        result = await flow.async_step_public_only()

        assert result["type"] == "create_entry"
        assert result["title"] == "AniList (Public)"
        assert result["data"] == {}

    @pytest.mark.asyncio
    async def test_oauth_create_entry_success(self):
        """Test async_oauth_create_entry creates an entry with viewer data."""
        flow = self._make_flow()
        viewer_data = {"id": 42, "name": "TestUser"}

        with patch(
            "custom_components.anilist.config_flow.AniListClient"
        ) as MockClient:
            mock_instance = AsyncMock()
            mock_instance.get_viewer = AsyncMock(return_value=viewer_data)
            MockClient.return_value = mock_instance

            with patch(
                "custom_components.anilist.config_flow.async_get_clientsession"
            ):
                data = {"token": {"access_token": "test_token"}}
                result = await flow.async_oauth_create_entry(data)

        assert result["type"] == "create_entry"
        assert result["title"] == "TestUser"
        assert result["data"]["user_id"] == 42
        assert result["data"]["user_name"] == "TestUser"

    @pytest.mark.asyncio
    async def test_oauth_create_entry_aborts_on_auth_error(self):
        """Test async_oauth_create_entry aborts when authentication fails."""
        flow = self._make_flow()

        with patch(
            "custom_components.anilist.config_flow.AniListClient"
        ) as MockClient:
            mock_instance = AsyncMock()
            mock_instance.get_viewer = AsyncMock(side_effect=AniListAuthError("bad"))
            MockClient.return_value = mock_instance

            with patch(
                "custom_components.anilist.config_flow.async_get_clientsession"
            ):
                data = {"token": {"access_token": "bad_token"}}
                result = await flow.async_oauth_create_entry(data)

        assert result["type"] == "abort"
        assert result["reason"] == "invalid_auth"

    @pytest.mark.asyncio
    async def test_oauth_create_entry_aborts_on_connection_error(self):
        """Test async_oauth_create_entry aborts on network error."""
        flow = self._make_flow()

        with patch(
            "custom_components.anilist.config_flow.AniListClient"
        ) as MockClient:
            mock_instance = AsyncMock()
            mock_instance.get_viewer = AsyncMock(
                side_effect=AniListError("network")
            )
            MockClient.return_value = mock_instance

            with patch(
                "custom_components.anilist.config_flow.async_get_clientsession"
            ):
                data = {"token": {"access_token": "token"}}
                result = await flow.async_oauth_create_entry(data)

        assert result["type"] == "abort"
        assert result["reason"] == "cannot_connect"

    @pytest.mark.asyncio
    async def test_reauth_updates_existing_entry(self):
        """Test reauth flow updates the existing entry when user matches."""
        flow = self._make_flow()
        viewer_data = {"id": 42, "name": "TestUser"}

        existing_entry = MagicMock()
        existing_entry.data = {"user_id": "42", "token": {"access_token": "old"}}
        flow._reauth_entry = existing_entry

        with patch(
            "custom_components.anilist.config_flow.AniListClient"
        ) as MockClient:
            mock_instance = AsyncMock()
            mock_instance.get_viewer = AsyncMock(return_value=viewer_data)
            MockClient.return_value = mock_instance

            with patch(
                "custom_components.anilist.config_flow.async_get_clientsession"
            ):
                data = {"token": {"access_token": "new_token"}}
                result = await flow.async_oauth_create_entry(data)

        assert result["type"] == "abort"
        assert result["reason"] == "reauth_successful"

    @pytest.mark.asyncio
    async def test_reauth_aborts_on_account_mismatch(self):
        """Test reauth aborts when the re-authed account doesn't match."""
        flow = self._make_flow()
        viewer_data = {"id": 999, "name": "DifferentUser"}

        existing_entry = MagicMock()
        existing_entry.data = {"user_id": "42", "token": {"access_token": "old"}}
        flow._reauth_entry = existing_entry

        with patch(
            "custom_components.anilist.config_flow.AniListClient"
        ) as MockClient:
            mock_instance = AsyncMock()
            mock_instance.get_viewer = AsyncMock(return_value=viewer_data)
            MockClient.return_value = mock_instance

            with patch(
                "custom_components.anilist.config_flow.async_get_clientsession"
            ):
                data = {"token": {"access_token": "wrong_user_token"}}
                result = await flow.async_oauth_create_entry(data)

        assert result["type"] == "abort"
        assert result["reason"] == "account_mismatch"


# ---------------------------------------------------------------------------
# Options flow tests
# ---------------------------------------------------------------------------


class TestAniListOptionsFlow:
    """Tests for the AniList options flow."""

    @pytest.mark.asyncio
    async def test_options_flow_shows_form(self):
        """Test that the options flow shows a form with all options."""
        from custom_components.anilist.config_flow import AniListOptionsFlow

        flow = AniListOptionsFlow()
        flow.config_entry = MagicMock()
        flow.config_entry.options = {}

        result = await flow.async_step_init(user_input=None)
        assert result["type"] == "form"
        assert result["step_id"] == "init"

    @pytest.mark.asyncio
    async def test_options_flow_saves_input(self):
        """Test that user input creates an entry with the provided data."""
        from custom_components.anilist.config_flow import AniListOptionsFlow

        flow = AniListOptionsFlow()
        flow.config_entry = MagicMock()
        flow.config_entry.options = {}

        user_input = {
            "update_interval": 10,
            "title_language": "english",
            "include_adult": False,
        }
        # The OptionsFlowWithReload stub doesn't have async_create_entry,
        # so we patch it
        flow.async_create_entry = MagicMock(
            return_value={"type": "create_entry", "data": user_input}
        )

        result = await flow.async_step_init(user_input=user_input)
        flow.async_create_entry.assert_called_once_with(data=user_input)
