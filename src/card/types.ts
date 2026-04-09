export interface AniListCardConfig {
  type: string;
  view?: "airing" | "watchlist" | "season" | "profile";
  title?: string;
  max_items?: number;
  show_cover?: boolean;
  show_countdown?: boolean;
  show_progress?: boolean;
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
  airing_at: string;       // ISO timestamp
  cover_image?: string;
  site_url?: string;
  duration?: number;
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

export interface UserProfile {
  username?: string;
  anime_count?: number;
  episodes_watched?: number;
  hours_watched?: number;
  mean_score?: number;
  top_genres?: string[];
  favourite_anime?: { title: string; site_url?: string; cover?: string }[];
}
