"""WebSocket API for the AniList integration.

Provides endpoints that serve full coordinator data to the Lovelace card,
bypassing the 16 KB recorder attribute limit on sensor entities.
"""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DEFAULT_SCORE_FORMAT, DOMAIN, OPT_SCORE_FORMAT
from .coordinator import (
    AiringEntry,
    AniListCoordinator,
    AniListData,
    MangaEntry,
    WatchlistEntry,
)


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------


def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all AniList WebSocket commands."""
    websocket_api.async_register_command(hass, ws_airing_schedule)
    websocket_api.async_register_command(hass, ws_watchlist)
    websocket_api.async_register_command(hass, ws_season)
    websocket_api.async_register_command(hass, ws_manga)
    websocket_api.async_register_command(hass, ws_profile)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _resolve_coordinator(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> AniListCoordinator | None:
    """Find the AniList coordinator, auto-detecting entry_id when omitted."""
    entry_id: str | None = msg.get("entry_id")

    if entry_id:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is None or entry.domain != DOMAIN:
            connection.send_error(msg["id"], "not_found", "Config entry not found")
            return None
        coordinator: AniListCoordinator = entry.runtime_data
        if coordinator.data is None:
            connection.send_error(msg["id"], "not_ready", "Data not yet available")
            return None
        return coordinator

    # Auto-discovery: find the single anilist config entry
    entries = hass.config_entries.async_entries(DOMAIN)
    if len(entries) == 0:
        connection.send_error(msg["id"], "not_found", "No AniList integration configured")
        return None
    if len(entries) > 1:
        connection.send_error(
            msg["id"],
            "ambiguous",
            f"Multiple AniList entries found ({len(entries)}). "
            "Specify entry_id in the request.",
        )
        return None

    entry = entries[0]
    coordinator = entry.runtime_data
    if coordinator is None or coordinator.data is None:
        connection.send_error(msg["id"], "not_ready", "Data not yet available")
        return None
    return coordinator


def _paginate(items: list, msg: dict[str, Any]) -> tuple[list, int, int]:
    """Apply optional limit/offset pagination and return (page, total, offset)."""
    total = len(items)
    offset = msg.get("offset", 0)
    limit = msg.get("limit")
    if offset:
        items = items[offset:]
    if limit is not None:
        items = items[:limit]
    return items, total, offset


def _title_dict(media: dict[str, Any]) -> dict[str, str | None]:
    """Extract the title object with all language variants."""
    title = media.get("title") or {}
    return {
        "romaji": title.get("romaji"),
        "english": title.get("english"),
        "native": title.get("native"),
    }


def _cover_images(media: dict[str, Any]) -> dict[str, str | None]:
    """Extract all cover image URLs from a media object."""
    ci = media.get("coverImage") or {}
    return {
        "small": ci.get("medium"),
        "medium": ci.get("large"),
        "large": ci.get("extraLarge"),
        "color": ci.get("color"),
    }


def _score_format(coordinator: AniListCoordinator) -> str:
    """Get the configured score format from integration options."""
    return coordinator.config_entry.options.get(OPT_SCORE_FORMAT, DEFAULT_SCORE_FORMAT)


# ---------------------------------------------------------------------------
# Serializers
# ---------------------------------------------------------------------------


def _serialize_airing(entry: AiringEntry) -> dict[str, Any]:
    """Serialize an AiringEntry for WebSocket response."""
    return {
        "media_id": entry.media_id,
        "episode": entry.episode,
        "airing_at": entry.airing_at,
        "time_until_airing": entry.time_until_airing,
        "title": _title_dict(entry.media),
        "cover_image": (_cover_images(entry.media).get("medium")),
        "cover_images": _cover_images(entry.media),
        "site_url": entry.media.get("siteUrl"),
        "duration": entry.media.get("duration"),
        "genres": entry.media.get("genres", []),
        "average_score": entry.media.get("averageScore"),
        "format": entry.media.get("format"),
        "is_adult": entry.media.get("isAdult", False),
    }


def _serialize_watchlist(entry: WatchlistEntry) -> dict[str, Any]:
    """Serialize a WatchlistEntry for WebSocket response."""
    nae = entry.media.get("nextAiringEpisode")
    return {
        "media_id": entry.media_id,
        "status": entry.status,
        "score": entry.score,
        "average_score": entry.media.get("averageScore"),
        "progress": entry.progress,
        "episodes": entry.media.get("episodes"),
        "title": _title_dict(entry.media),
        "cover_image": (_cover_images(entry.media).get("medium")),
        "cover_images": _cover_images(entry.media),
        "site_url": entry.media.get("siteUrl"),
        "next_airing_episode": {
            "airing_at": nae.get("airingAt"),
            "episode": nae.get("episode"),
        } if nae else None,
        "updated_at": entry.updated_at,
    }


def _serialize_manga(entry: MangaEntry) -> dict[str, Any]:
    """Serialize a MangaEntry for WebSocket response."""
    return {
        "media_id": entry.media_id,
        "status": entry.status,
        "score": entry.score,
        "average_score": entry.media.get("averageScore"),
        "progress": entry.progress,
        "progress_volumes": entry.progress_volumes,
        "chapters": entry.media.get("chapters"),
        "volumes": entry.media.get("volumes"),
        "title": _title_dict(entry.media),
        "cover_image": (_cover_images(entry.media).get("medium")),
        "cover_images": _cover_images(entry.media),
        "site_url": entry.media.get("siteUrl"),
        "updated_at": entry.updated_at,
    }


def _serialize_season_anime(media: dict[str, Any]) -> dict[str, Any]:
    """Serialize a season anime media dict for WebSocket response."""
    nae = media.get("nextAiringEpisode")
    studios = media.get("studios", {}).get("nodes", [])
    return {
        "id": media.get("id"),
        "title": _title_dict(media),
        "average_score": media.get("averageScore"),
        "popularity": media.get("popularity"),
        "episodes": media.get("episodes"),
        "duration": media.get("duration"),
        "format": media.get("format"),
        "status": media.get("status"),
        "genres": media.get("genres", []),
        "cover_image": (_cover_images(media).get("medium")),
        "cover_images": _cover_images(media),
        "banner_image": media.get("bannerImage"),
        "site_url": media.get("siteUrl"),
        "studios": [{"id": s.get("id"), "name": s.get("name")} for s in studios],
        "next_airing_episode": {
            "airing_at": nae.get("airingAt"),
            "episode": nae.get("episode"),
        } if nae else None,
        "start_date": media.get("startDate"),
        "is_adult": media.get("isAdult", False),
    }


# ---------------------------------------------------------------------------
# WebSocket command handlers
# ---------------------------------------------------------------------------


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "anilist/airing_schedule",
        vol.Optional("entry_id"): str,
        vol.Optional("limit"): vol.All(int, vol.Range(min=1, max=500)),
        vol.Optional("offset"): vol.All(int, vol.Range(min=0)),
    }
)
@websocket_api.async_response
async def ws_airing_schedule(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the full airing schedule."""
    coordinator = _resolve_coordinator(hass, connection, msg)
    if coordinator is None:
        return

    items = [_serialize_airing(e) for e in coordinator.data.airing_schedule]
    page, total, offset = _paginate(items, msg)

    connection.send_result(msg["id"], {
        "items": page,
        "total": total,
        "offset": offset,
    })


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "anilist/watchlist",
        vol.Optional("entry_id"): str,
        vol.Optional("status"): vol.In(
            ["CURRENT", "PLANNING", "COMPLETED", "DROPPED", "PAUSED", "REPEATING"]
        ),
        vol.Optional("limit"): vol.All(int, vol.Range(min=1, max=500)),
        vol.Optional("offset"): vol.All(int, vol.Range(min=0)),
    }
)
@websocket_api.async_response
async def ws_watchlist(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the user's watchlist with optional status filtering."""
    coordinator = _resolve_coordinator(hass, connection, msg)
    if coordinator is None:
        return

    data: AniListData = coordinator.data
    if data.watchlist is None:
        connection.send_error(
            msg["id"], "not_authenticated",
            "Watchlist requires an authenticated AniList account",
        )
        return

    entries = data.watchlist
    if "status" in msg:
        entries = [e for e in entries if e.status == msg["status"]]

    items = [_serialize_watchlist(e) for e in entries]
    page, total, offset = _paginate(items, msg)

    connection.send_result(msg["id"], {
        "items": page,
        "total": total,
        "offset": offset,
        "score_format": _score_format(coordinator),
    })


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "anilist/season",
        vol.Optional("entry_id"): str,
        vol.Optional("season"): vol.In(["CURRENT", "NEXT"]),
        vol.Optional("genre"): str,
        vol.Optional("format"): vol.In(
            ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"]
        ),
        vol.Optional("limit"): vol.All(int, vol.Range(min=1, max=500)),
        vol.Optional("offset"): vol.All(int, vol.Range(min=0)),
    }
)
@websocket_api.async_response
async def ws_season(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return season anime with optional genre/format filtering."""
    coordinator = _resolve_coordinator(hass, connection, msg)
    if coordinator is None:
        return

    data: AniListData = coordinator.data
    season_type = msg.get("season", "CURRENT")
    source = data.season_anime if season_type == "CURRENT" else data.next_season_anime

    # Apply filters
    filtered = list(source)
    if "genre" in msg:
        genre = msg["genre"]
        filtered = [m for m in filtered if genre in (m.get("genres") or [])]
    if "format" in msg:
        fmt = msg["format"]
        filtered = [m for m in filtered if m.get("format") == fmt]

    items = [_serialize_season_anime(m) for m in filtered]
    page, total, offset = _paginate(items, msg)

    connection.send_result(msg["id"], {
        "items": page,
        "total": total,
        "offset": offset,
        "season": season_type,
    })


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "anilist/manga",
        vol.Optional("entry_id"): str,
        vol.Optional("status"): vol.In(
            ["CURRENT", "PLANNING", "COMPLETED", "DROPPED", "PAUSED", "REPEATING"]
        ),
        vol.Optional("limit"): vol.All(int, vol.Range(min=1, max=500)),
        vol.Optional("offset"): vol.All(int, vol.Range(min=0)),
    }
)
@websocket_api.async_response
async def ws_manga(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the user's manga list with optional status filtering."""
    coordinator = _resolve_coordinator(hass, connection, msg)
    if coordinator is None:
        return

    data: AniListData = coordinator.data
    if data.manga_list is None:
        connection.send_error(
            msg["id"], "not_authenticated",
            "Manga list requires an authenticated AniList account",
        )
        return

    entries = data.manga_list
    if "status" in msg:
        entries = [e for e in entries if e.status == msg["status"]]

    items = [_serialize_manga(e) for e in entries]
    page, total, offset = _paginate(items, msg)

    connection.send_result(msg["id"], {
        "items": page,
        "total": total,
        "offset": offset,
        "score_format": _score_format(coordinator),
    })


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "anilist/profile",
        vol.Optional("entry_id"): str,
    }
)
@websocket_api.async_response
async def ws_profile(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the user's profile, statistics, genres, and favourites."""
    coordinator = _resolve_coordinator(hass, connection, msg)
    if coordinator is None:
        return

    data: AniListData = coordinator.data
    is_auth = data.user_stats is not None
    viewer = data.viewer or {}

    stats: dict[str, Any] = {}
    top_genres: list[dict[str, Any]] = []
    favourites: list[dict[str, Any]] = []

    if data.user_stats:
        s = data.user_stats
        stats = {
            "anime_count": s.anime_count,
            "episodes_watched": s.episodes_watched,
            "minutes_watched": s.minutes_watched,
            "anime_mean_score": s.anime_mean_score,
            "manga_count": s.manga_count,
            "chapters_read": s.chapters_read,
            "volumes_read": s.volumes_read,
            "manga_mean_score": s.manga_mean_score,
        }
        # Full genre list with counts from API
        top_genres = s.genre_stats
        favourites = [
            {
                "id": f.get("id"),
                "title": _title_dict(f),
                "cover_image": (f.get("coverImage") or {}).get("large") or (f.get("coverImage") or {}).get("medium"),
                "cover_images": _cover_images(f),
                "site_url": f.get("siteUrl"),
            }
            for f in s.favourite_anime
        ]

    connection.send_result(msg["id"], {
        "viewer": {
            "name": viewer.get("name"),
            "avatar": (viewer.get("avatar") or {}).get("medium"),
            "site_url": viewer.get("siteUrl"),
        },
        "stats": stats,
        "top_genres": top_genres,
        "favourite_anime": favourites,
        "score_format": _score_format(coordinator),
        "is_authenticated": is_auth,
    })
