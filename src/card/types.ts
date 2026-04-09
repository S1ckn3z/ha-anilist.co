export interface AniListCardConfig {
  type: string;

  // --- General ---
  view?: "airing" | "watchlist" | "season" | "profile" | "manga";
  title?: string;
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
  score_display?: "stars" | "bar" | "number" | "none";
  show_badges?: boolean;
  show_search?: boolean;
  show_tooltips?: boolean;
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

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale: { language: string };
}

// AniList data shapes (from sensor extra_state_attributes)
export interface AiringAnime {
  media_id: number;
  title: string;
  episode: number;
  airing_at: string;
  cover_image?: string;
  site_url?: string;
  duration?: number;
  genres?: string[];
  average_score?: number;
  format?: string;
}

export interface WatchlistAnime {
  media_id: number;
  title: string;
  status: string;
  progress: number;
  episodes?: number;
  score?: number;
  cover_image?: string;
  site_url?: string;
}

export interface MangaItem {
  media_id: number;
  title: string;
  status: string;
  progress: number;
  progress_volumes: number;
  chapters?: number;
  volumes?: number;
  score?: number;
  cover_image?: string;
  site_url?: string;
}

export interface SeasonAnime {
  id: number;
  title: string;
  average_score?: number;
  episodes?: number;
  format?: string;
  genres?: string[];
  cover_image?: string;
  site_url?: string;
  next_airing_episode?: { airing_at: string; episode: number };
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
