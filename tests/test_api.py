"""Tests for the AniList API client (api.py)."""
from __future__ import annotations

import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

import aiohttp
import pytest

from tests.conftest import make_mock_response

from custom_components.anilist.api import (
    AniListAuthError,
    AniListClient,
    AniListError,
    AniListRateLimitError,
)


# ---------------------------------------------------------------------------
# query() tests
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_query_successful():
    """Test a successful GraphQL query returns data."""
    json_data = {"data": {"Viewer": {"id": 1, "name": "TestUser"}}}
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="test_token")
    result = await client.query("query { Viewer { id name } }")

    assert result == {"Viewer": {"id": 1, "name": "TestUser"}}
    session.post.assert_called_once()


@pytest.mark.asyncio
async def test_query_401_raises_auth_error():
    """Test HTTP 401 raises AniListAuthError."""
    ctx, resp = make_mock_response(status=401, json_data={})

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="bad_token")
    with pytest.raises(AniListAuthError, match="authentication failed"):
        await client.query("query { Viewer { id } }")


@pytest.mark.asyncio
async def test_query_403_raises_auth_error():
    """Test HTTP 403 raises AniListAuthError."""
    ctx, resp = make_mock_response(status=403, json_data={})

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="forbidden_token")
    with pytest.raises(AniListAuthError, match="authentication failed"):
        await client.query("query { Viewer { id } }")


@pytest.mark.asyncio
async def test_query_429_raises_rate_limit_error():
    """Test HTTP 429 raises AniListRateLimitError with correct retry_after."""
    headers = {
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": "0",
        "Retry-After": "45",
    }
    ctx, resp = make_mock_response(status=429, json_data={}, headers=headers)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session)
    with pytest.raises(AniListRateLimitError) as exc_info:
        await client.query("query { Page { media { id } } }")

    assert exc_info.value.retry_after == 45


@pytest.mark.asyncio
async def test_query_graphql_errors_in_body():
    """Test status 200 with errors field raises AniListError."""
    json_data = {
        "errors": [{"message": "Some GraphQL error", "status": 400}],
        "data": None,
    }
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session)
    with pytest.raises(AniListError):
        await client.query("query { bad }")


@pytest.mark.asyncio
async def test_query_graphql_auth_error_in_body():
    """Test GraphQL errors with status 401 raise AniListAuthError."""
    json_data = {
        "errors": [{"message": "Invalid token", "status": 401}],
        "data": None,
    }
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="expired")
    with pytest.raises(AniListAuthError):
        await client.query("query { Viewer { id } }")


@pytest.mark.asyncio
async def test_query_network_error_raises_anilist_error():
    """Test aiohttp.ClientError raises AniListError."""
    ctx = AsyncMock()
    ctx.__aenter__ = AsyncMock(side_effect=aiohttp.ClientError("connection lost"))
    ctx.__aexit__ = AsyncMock(return_value=False)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session)
    with pytest.raises(AniListError, match="Network error"):
        await client.query("query { Viewer { id } }")


@pytest.mark.asyncio
async def test_query_returns_empty_data_when_no_data_key():
    """Test query returns empty dict when 'data' key is missing."""
    json_data = {"something_else": True}
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session)
    result = await client.query("query { Page { media { id } } }")
    assert result == {}


# ---------------------------------------------------------------------------
# get_viewer() tests
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_get_viewer_returns_viewer_data():
    """Test get_viewer returns the Viewer object."""
    viewer_data = {"id": 42, "name": "Tester", "avatar": {"large": "a.jpg"}}
    json_data = {"data": {"Viewer": viewer_data}}
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="valid")
    result = await client.get_viewer()
    assert result == viewer_data
    assert result["name"] == "Tester"


@pytest.mark.asyncio
async def test_get_viewer_raises_auth_error_when_no_viewer():
    """Test get_viewer raises AniListAuthError when Viewer is None."""
    json_data = {"data": {"Viewer": None}}
    ctx, resp = make_mock_response(status=200, json_data=json_data)

    session = MagicMock()
    session.post = MagicMock(return_value=ctx)

    client = AniListClient(session=session, access_token="valid")
    with pytest.raises(AniListAuthError, match="no data"):
        await client.get_viewer()


# ---------------------------------------------------------------------------
# is_authenticated property
# ---------------------------------------------------------------------------


def test_is_authenticated_with_token():
    """Test is_authenticated returns True when token is set."""
    client = AniListClient(session=MagicMock(), access_token="tok")
    assert client.is_authenticated is True


def test_is_authenticated_without_token():
    """Test is_authenticated returns False when no token."""
    client = AniListClient(session=MagicMock(), access_token=None)
    assert client.is_authenticated is False


def test_is_authenticated_with_empty_string():
    """Test is_authenticated returns False for empty string token."""
    client = AniListClient(session=MagicMock(), access_token="")
    assert client.is_authenticated is False
