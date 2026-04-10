export interface AniListCardConfig {
  type: string;

  // --- General ---
  view?: "airing" | "watchlist" | "season" | "profile" | "manga";
  title?: string;
  entry_id?: string; // optional override for multi-entry setups
  max_items?: number;
  max_airing?: number;
  max_watchlist?: number;
  max_season?: number;
  max_manga?: number;

  // --- Display ---
  show_cover?: boolean;
  cover_size?: "small" | "medium" | "large";
  show_countdown?: boolean;
  countdown_format?: "relative" | "absolute" | "both";
  show_progress?: boolean;
  show_progress_bar?: boolean;
  /** @deprecated Not implemented — score rendering uses score_position and score_source instead. */
  score_display?: "stars" | "bar" | "number" | "none";
  show_badges?: boolean;
  show_search?: boolean;
  show_tooltips?: boolean;
  /** Note: "ha_more_info" is not yet implemented — only "anilist" and "none" are functional. */
  link_target?: "anilist" | "none" | "ha_more_info";
  sort_by?: "time" | "title" | "score";
  card_padding?: "compact" | "normal" | "relaxed";

  // --- Airing extras ---
  show_duration?: boolean;
  show_genres?: boolean;
  show_average_score?: boolean;
  show_format_badge?: boolean;

  // --- Watchlist / Manga ---
  watchlist_statuses?: string[];
  show_status_tabs?: boolean;
  overflow_mode?: "scroll" | "limit";  // scroll = fixed height scrollbar, limit = max_items cut
  scroll_height?: number;              // px height when overflow_mode=scroll (default 400)
  visible_items?: number;              // number of items visible before scrolling (auto-calculates height)
  scroll_snap?: boolean;               // snap scroll to item boundaries (no half-cut items)
  scroll_fade?: boolean;               // gradient fade at bottom to indicate more content

  // --- Layout & Display ---
  layout_mode?: "grid" | "list";       // grid=cover grid, list=horizontal rows
  cover_quality?: "small" | "medium" | "large";  // cover image resolution (default "large")
  score_position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "inline" | "none";
  score_source?: "user" | "average" | "auto";  // which score to display (auto = smart per view/status)
  show_next_airing?: boolean;          // show next episode countdown on covers

  // --- Profile ---
  show_avatar?: boolean;
  show_username?: boolean;
  show_anime_stats?: boolean;
  show_manga_stats?: boolean;
  show_genre_chart?: boolean;
  show_favourites?: boolean;

  // --- Season ---
  genre_filter?: string[];
  format_filter?: string[];
  /** @deprecated Not implemented — season data always shows current season only. */
  show_next_season?: boolean;

  // --- Profile ---
  chart_type?: "bar" | "donut" | "tags";

  // --- Colors ---
  accent_color?: string;
  secondary_color?: string;
  card_background?: string;
  card_opacity?: number;
  border_color?: string;
  border_width?: number;
  border_radius?: number;

  // --- Legacy compat ---
  link_to_anilist?: boolean;
}

export interface CoverImages {
  small?: string;
  medium?: string;
  large?: string;
  color?: string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// Minimal HA type — extended at runtime by the real hass object
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale: { language: string };
  connection?: HassConnection;
  callWS?<T>(msg: Record<string, unknown>): Promise<T>;
}

export interface HassConnection {
  sendMessagePromise(msg: Record<string, unknown>): Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Title — supports both flat string (entity attr fallback) and multi-lang WS
// ---------------------------------------------------------------------------

export interface MediaTitle {
  romaji?: string;
  english?: string;
  native?: string;
}

/** Resolve a title that may be a plain string (entity fallback) or MediaTitle object. */
export function resolveTitle(
  title: string | MediaTitle | undefined,
  lang: string = "romaji",
): string {
  if (!title) return "Unknown";
  if (typeof title === "string") return title;
  return title[lang as keyof MediaTitle]
    || title.romaji
    || title.english
    || title.native
    || "Unknown";
}

// ---------------------------------------------------------------------------
// WS response wrappers
// ---------------------------------------------------------------------------

export interface WSListResponse<T> {
  items: T[];
  total: number;
  offset: number;
  score_format?: string;
  season?: string;
}

export interface WSProfileResponse {
  viewer: {
    name?: string;
    avatar?: string;
    site_url?: string;
  };
  stats: {
    anime_count?: number;
    episodes_watched?: number;
    minutes_watched?: number;
    anime_mean_score?: number;
    manga_count?: number;
    chapters_read?: number;
    volumes_read?: number;
    manga_mean_score?: number;
  };
  top_genres: { genre: string; count: number }[];
  favourite_anime: WSFavouriteAnime[];
  score_format: string;
  is_authenticated: boolean;
}

export interface WSFavouriteAnime {
  id?: number;
  title: string | MediaTitle;
  cover_image?: string;
  cover_images?: CoverImages;
  site_url?: string;
}

// ---------------------------------------------------------------------------
// AniList data shapes — compatible with both entity attrs and WS responses
// ---------------------------------------------------------------------------

export interface AiringAnime {
  media_id: number;
  title: string | MediaTitle;
  episode: number;
  airing_at: string | number; // ISO string (entity) or unix ts (WS)
  cover_image?: string;
  cover_images?: CoverImages;
  site_url?: string;
  duration?: number;
  genres?: string[];
  average_score?: number;
  format?: string;
}

export interface WatchlistAnime {
  media_id: number;
  title: string | MediaTitle;
  status: string;
  progress: number;
  episodes?: number;
  score?: number;
  average_score?: number;
  cover_image?: string;
  cover_images?: CoverImages;
  site_url?: string;
  next_airing_episode?: { airing_at: number; episode: number };
  updated_at?: number;
}

export interface MangaItem {
  media_id: number;
  title: string | MediaTitle;
  status: string;
  progress: number;
  progress_volumes: number;
  chapters?: number;
  volumes?: number;
  score?: number;
  average_score?: number;
  cover_image?: string;
  cover_images?: CoverImages;
  site_url?: string;
  updated_at?: number;
}

export interface SeasonAnime {
  id: number;
  title: string | MediaTitle;
  average_score?: number;
  episodes?: number;
  format?: string;
  genres?: string[];
  cover_image?: string;
  cover_images?: CoverImages;
  site_url?: string;
  next_airing_episode?: { airing_at: number; episode: number };
  studios?: { id: number; name: string }[];
  popularity?: number;
  banner_image?: string;
  start_date?: { year?: number; month?: number; day?: number };
}

export interface ViewerInfo {
  username?: string;
  avatar?: string;
  site_url?: string;
}

export interface UserProfile {
  username?: string;
  avatar?: string;
  site_url?: string;
  anime_count?: number;
  episodes_watched?: number;
  hours_watched?: number;
  mean_score?: number;
  top_genres?: string[];
  favourite_anime?: { title: string; site_url?: string; cover?: string }[];
}
