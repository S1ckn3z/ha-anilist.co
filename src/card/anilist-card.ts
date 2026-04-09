import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  AniListCardConfig,
  HomeAssistant,
  HassEntity,
  AiringAnime,
  WatchlistAnime,
  MangaItem,
  SeasonAnime,
} from "./types.js";
import "./anilist-card-editor.js";

// ─── i18n ────────────────────────────────────────────────────────────────────

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    next_episodes: "Next Episodes",
    watching: "Currently Watching",
    this_season: "This Season",
    profile: "AniList Profile",
    manga: "Manga Reading",
    no_episodes: "No episodes in the coming days.",
    no_watchlist: "No anime in the watchlist.",
    no_season: "No season data available.",
    no_profile: "No profile stats available.",
    no_manga: "No manga in the list.",
    auth_only: "Only for logged-in users.",
    episode: "Episode",
    ep: "Ep.",
    aired: "Aired",
    anime: "Anime",
    episodes: "Episodes",
    hours: "Hours",
    score_avg: "Avg Score",
    watching_now: "Watching",
    chapters: "Chapters",
    volumes: "Volumes",
    manga_count: "Manga",
    manga_score: "Manga Score",
    top_genres: "Top Genres",
    favourites: "Favourites",
    search_placeholder: "Search...",
    current: "Current",
    planning: "Planning",
    completed: "Completed",
    paused: "Paused",
    dropped: "Dropped",
    next_season_label: "Next Season",
  },
  de: {
    next_episodes: "Nächste Episoden",
    watching: "Schaue ich gerade",
    this_season: "Diese Season",
    profile: "AniList Profil",
    manga: "Manga Leseliste",
    no_episodes: "Keine Episoden in den nächsten Tagen.",
    no_watchlist: "Keine Anime in der Watchlist.",
    no_season: "Keine Season-Daten verfügbar.",
    no_profile: "Keine Profil-Statistiken verfügbar.",
    no_manga: "Keine Manga in der Liste.",
    auth_only: "Nur für eingeloggte Nutzer.",
    episode: "Episode",
    ep: "Ep.",
    aired: "Ausgestrahlt",
    anime: "Anime",
    episodes: "Episoden",
    hours: "Stunden",
    score_avg: "Ø Score",
    watching_now: "Schaue ich",
    chapters: "Kapitel",
    volumes: "Bände",
    manga_count: "Manga",
    manga_score: "Manga Score",
    top_genres: "Top Genres",
    favourites: "Favoriten",
    search_placeholder: "Suchen...",
    current: "Aktuell",
    planning: "Geplant",
    completed: "Abgeschlossen",
    paused: "Pausiert",
    dropped: "Abgebrochen",
    next_season_label: "Nächste Season",
  },
  ja: {
    next_episodes: "次のエピソード",
    watching: "視聴中",
    this_season: "今期",
    profile: "AniListプロフィール",
    manga: "読書中",
    no_episodes: "今後のエピソードはありません。",
    no_watchlist: "ウォッチリストにアニメがありません。",
    no_season: "シーズンデータがありません。",
    no_profile: "プロフィール統計がありません。",
    no_manga: "リストにマンガがありません。",
    auth_only: "ログインユーザーのみ。",
    episode: "エピソード",
    ep: "話",
    aired: "放送済み",
    anime: "アニメ",
    episodes: "エピソード",
    hours: "時間",
    score_avg: "平均スコア",
    watching_now: "視聴中",
    chapters: "章",
    volumes: "巻",
    manga_count: "マンガ",
    manga_score: "マンガスコア",
    top_genres: "トップジャンル",
    favourites: "お気に入り",
    search_placeholder: "検索...",
    current: "視聴中",
    planning: "予定",
    completed: "完了",
    paused: "一時停止",
    dropped: "中断",
    next_season_label: "来期",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countdown(isoOrTs: string | number, format: string, lang: string): string {
  const target =
    typeof isoOrTs === "number" ? isoOrTs * 1000 : new Date(isoOrTs).getTime();
  const diff = target - Date.now();
  const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];

  if (diff <= 0) return t.aired;

  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);

  const relative = h >= 24
    ? `${Math.floor(h / 24)}d ${h % 24}h`
    : h > 0 ? `${h}h ${m}m` : `${m}m`;

  const absolute = new Date(target).toLocaleString(lang, {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  if (format === "absolute") return absolute;
  if (format === "both") return `${relative} (${absolute})`;
  return relative;
}

function getEntityState(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.state ?? "";
}

function renderScore(score: number | undefined, display: string) {
  if (!score || display === "none") return nothing;
  if (display === "stars") {
    return html`<span class="score-badge">★${score}</span>`;
  }
  if (display === "bar") {
    return html`<div class="score-bar"><div class="score-bar-fill" style="width:${score}%"></div></div>`;
  }
  return html`<span class="score-badge">${score}</span>`;
}

// ─── Card Element ─────────────────────────────────────────────────────────────

class AniListCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AniListCardConfig;
  @state() private _activeTab = "CURRENT";
  @state() private _searchQuery = "";
  private _tick: ReturnType<typeof setInterval> | undefined;

  static getConfigElement() {
    return document.createElement("anilist-card-editor");
  }

  static getStubConfig(): AniListCardConfig {
    return { type: "custom:anilist-card", view: "airing", max_items: 5 };
  }

  setConfig(config: AniListCardConfig) {
    if (!config) throw new Error("Invalid config");
    this._config = {
      view: "airing",
      max_items: 5,
      show_cover: true,
      cover_size: "medium",
      show_countdown: true,
      countdown_format: "relative",
      show_progress: true,
      show_progress_bar: true,
      score_display: "number",
      show_badges: true,
      show_search: false,
      show_tooltips: false,
      link_target: "anilist",
      sort_by: "time",
      card_padding: "normal",
      show_duration: false,
      show_genres: false,
      show_average_score: false,
      show_format_badge: false,
      watchlist_statuses: ["CURRENT", "PLANNING", "COMPLETED", "PAUSED", "DROPPED"],
      show_status_tabs: true,
      genre_filter: [],
      format_filter: [],
      show_next_season: false,
      chart_type: "bar",
      overflow_mode: "scroll",
      scroll_height: 400,
      show_avatar: true,
      show_username: true,
      show_anime_stats: true,
      show_manga_stats: true,
      show_genre_chart: true,
      show_favourites: true,
      // Legacy compat
      link_to_anilist: true,
      ...config,
    };
    // Legacy: map link_to_anilist to link_target if not explicitly set
    if (config.link_to_anilist === false && !config.link_target) {
      this._config.link_target = "none";
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._tick = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._tick);
  }

  private _t(key: string): string {
    const lang = this.hass?.language?.substring(0, 2) || "en";
    return (TRANSLATIONS[lang] || TRANSLATIONS["en"])[key] || key;
  }

  private _lang(): string {
    return this.hass?.language?.substring(0, 2) || "en";
  }

  private _padding(): string {
    const p = this._config.card_padding;
    if (p === "compact") return "8px";
    if (p === "relaxed") return "16px";
    return "12px";
  }

  private _coverDims(): { w: number; h: number } {
    const s = this._config.cover_size;
    if (s === "small") return { w: 40, h: 56 };
    if (s === "large") return { w: 64, h: 90 };
    return { w: 48, h: 68 };
  }

  private _maxFor(view: string): number {
    const c = this._config;
    if (view === "airing" && c.max_airing) return c.max_airing;
    if (view === "watchlist" && c.max_watchlist) return c.max_watchlist;
    if (view === "season" && c.max_season) return c.max_season;
    if (view === "manga" && c.max_manga) return c.max_manga;
    return c.max_items ?? 5;
  }

  private _shouldLink(): boolean {
    return this._config.link_target === "anilist";
  }

  private _handleClick(url?: string) {
    if (!url || !this._shouldLink()) return;
    window.open(url, "_blank", "noopener");
  }

  // ─── Custom style vars ──────────────────────────────────────────────────

  private _hostStyle(): string {
    const c = this._config;
    const vars: string[] = [];
    if (c.accent_color) vars.push(`--al-accent: ${c.accent_color}`);
    if (c.secondary_color) vars.push(`--al-secondary: ${c.secondary_color}`);
    if (c.card_background) vars.push(`--al-card-bg: ${c.card_background}`);
    if (c.card_opacity !== undefined) vars.push(`--al-card-opacity: ${c.card_opacity / 100}`);
    if (c.border_color) vars.push(`--al-border-color: ${c.border_color}`);
    if (c.border_width !== undefined) vars.push(`--al-border-width: ${c.border_width}px`);
    if (c.border_radius !== undefined) vars.push(`--al-border-radius: ${c.border_radius}px`);
    return vars.join(";");
  }

  // ─── Main render ────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return nothing;
    const view = this._config.view ?? "airing";
    const title = this._config.title ?? this._defaultTitle(view);
    const pad = this._padding();

    return html`
      <div class="card" style="${this._hostStyle()}">
        <div class="card-header" style="padding:${pad} ${pad}">
          <span class="brand-dot"></span>
          <span class="header-title">${title}</span>
          <a class="header-link" href="https://anilist.co" target="_blank" rel="noopener">AniList ↗</a>
        </div>
        <div class="card-content" style="padding:${pad}">
          ${this._config.show_search ? this._renderSearch() : nothing}
          ${view === "airing" ? this._renderAiring() : nothing}
          ${view === "watchlist" ? this._renderWatchlist() : nothing}
          ${view === "season" ? this._renderSeason() : nothing}
          ${view === "profile" ? this._renderProfile() : nothing}
          ${view === "manga" ? this._renderManga() : nothing}
        </div>
      </div>
    `;
  }

  // ─── Search ─────────────────────────────────────────────────────────────

  private _renderSearch() {
    return html`
      <div class="search-bar">
        <input
          type="text"
          placeholder=${this._t("search_placeholder")}
          .value=${this._searchQuery}
          @input=${(e: Event) => {
            this._searchQuery = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
    `;
  }

  private _matchesSearch(title: string): boolean {
    if (!this._searchQuery) return true;
    return title.toLowerCase().includes(this._searchQuery.toLowerCase());
  }

  // ─── Empty state ────────────────────────────────────────────────────────

  private _renderEmpty(messageKey: string) {
    return html`
      <div class="empty">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.5 2 12s4.47 10 10 10 10-4.5 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <div>${this._t(messageKey)}</div>
      </div>
    `;
  }

  // ─── Status tabs ────────────────────────────────────────────────────────

  private _renderStatusTabs(statuses: string[]) {
    const tabLabels: Record<string, string> = {
      CURRENT: this._t("current"),
      PLANNING: this._t("planning"),
      COMPLETED: this._t("completed"),
      PAUSED: this._t("paused"),
      DROPPED: this._t("dropped"),
    };
    return html`
      <div class="status-tabs">
        ${statuses.map((s) => html`
          <button
            class="tab-btn ${this._activeTab === s ? "active" : ""}"
            @click=${() => { this._activeTab = s; }}
          >${tabLabels[s] || s}</button>
        `)}
      </div>
    `;
  }

  // ─── View: Airing ──────────────────────────────────────────────────────

  private _renderAiring() {
    let items = this._getAiringItems();
    items = items.filter((i) => this._matchesSearch(i.title));

    if (!items.length) return this._renderEmpty("no_episodes");

    const { w, h } = this._coverDims();
    const cfg = this._config;
    const lang = this._lang();

    return html`
      <div class="list">
        ${items.map((item) => html`
          <div
            class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${item.title} - ${this._t("episode")} ${item.episode}` : ""}
          >
            ${cfg.show_cover && item.cover_image
              ? html`<img class="cover" src=${item.cover_image} alt=${item.title} loading="lazy"
                  style="width:${w}px;height:${h}px" />`
              : cfg.show_cover
                ? html`<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>?</span></div>`
                : nothing
            }
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-sub">
                ${this._t("episode")} ${item.episode}
                ${cfg.show_duration && item.duration ? html` · ${item.duration}min` : nothing}
                ${cfg.show_average_score && item.average_score ? html` · ★${item.average_score}%` : nothing}
              </div>
              ${cfg.show_genres && item.genres?.length
                ? html`<div class="inline-genres">${item.genres.slice(0, 3).map((g) => html`<span class="mini-chip">${g}</span>`)}</div>`
                : nothing}
              <div class="countdown-row">
                ${cfg.show_countdown
                  ? html`<span class="countdown">${countdown(item.airing_at, cfg.countdown_format ?? "relative", lang)}</span>`
                  : nothing}
                ${cfg.show_format_badge && item.format
                  ? html`<span class="format-chip">${item.format}</span>`
                  : nothing}
                ${cfg.show_badges
                  ? html`<span class="status-badge airing">Airing</span>`
                  : nothing}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _getAiringItems(): AiringAnime[] {
    const max = this._maxFor("airing");
    const items: AiringAnime[] = [];

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["airing_schedule"])) {
          (attrs["airing_schedule"] as Array<Record<string, unknown>>).forEach((ep) => {
            items.push({
              media_id: Number(ep["media_id"] ?? 0),
              title: String(ep["title"] ?? ""),
              episode: Number(ep["episode"] ?? 0),
              airing_at: String(ep["airing_at"] ?? ""),
              cover_image: ep["cover_image"] as string | undefined,
              site_url: ep["site_url"] as string | undefined,
              duration: ep["duration"] as number | undefined,
              genres: ep["genres"] as string[] | undefined,
              average_score: ep["average_score"] as number | undefined,
              format: ep["format"] as string | undefined,
            });
          });
        }
      });

    // Fallback to simple sensors
    if (!items.length) {
      const title =
        getEntityState(this.hass, "sensor.anilist_nachster_anime") ||
        getEntityState(this.hass, "sensor.anilist_next_airing_anime");
      const time =
        getEntityState(this.hass, "sensor.anilist_nachste_episode_um") ||
        getEntityState(this.hass, "sensor.anilist_next_episode_time");
      if (title && title !== "unknown") {
        items.push({ media_id: 0, title, episode: 1, airing_at: time });
      }
    }

    // Sort
    const sort = this._config.sort_by;
    if (sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "score") items.sort((a, b) => (b.average_score ?? 0) - (a.average_score ?? 0));
    // Default: time (already sorted by API)

    return items.slice(0, max);
  }

  // ─── View: Watchlist ────────────────────────────────────────────────────

  private _renderWatchlist() {
    const statuses = this._config.watchlist_statuses ?? ["CURRENT"];
    const showTabs = this._config.show_status_tabs && statuses.length > 1;
    let items = this._getWatchlistItems();

    // Filter by active tab
    if (showTabs) {
      items = items.filter((i) => i.status === this._activeTab);
    } else {
      items = items.filter((i) => statuses.includes(i.status));
    }
    items = items.filter((i) => this._matchesSearch(i.title));

    // Apply overflow mode
    const useScroll = this._config.overflow_mode === "scroll";
    if (!useScroll) {
      items = items.slice(0, this._maxFor("watchlist"));
    }

    return html`
      ${showTabs ? this._renderStatusTabs(statuses) : nothing}
      ${items.length
        ? this._renderWatchlistGrid(items)
        : this._renderEmpty("no_watchlist")}
    `;
  }

  private _renderWatchlistGrid(items: WatchlistAnime[]) {
    const cfg = this._config;
    const useScroll = cfg.overflow_mode === "scroll";
    const scrollH = cfg.scroll_height ?? 400;
    return html`
      <div class="grid ${useScroll ? "grid-scroll" : ""}"
        style=${useScroll ? `max-height:${scrollH}px` : ""}>
        ${items.map((item) => html`
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${item.title} - ${item.progress}/${item.episodes ?? "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && item.cover_image
                ? html`<img class="grid-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
                : html`<div class="grid-cover cover-placeholder"><span>${item.title[0] ?? "?"}</span></div>`
              }
              ${renderScore(item.score, cfg.score_display ?? "number")}
            </div>
            <div class="grid-title">${item.title}</div>
            ${cfg.show_progress && cfg.show_progress_bar && item.episodes
              ? html`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"></div>
                </div>
                <div class="progress-label">${item.progress}/${item.episodes}</div>
              `
              : cfg.show_progress && item.progress
                ? html`<div class="progress-label">${this._t("ep")} ${item.progress}</div>`
                : nothing
            }
          </div>
        `)}
      </div>
    `;
  }

  private _getWatchlistItems(): WatchlistAnime[] {
    const items: WatchlistAnime[] = [];

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["watchlist"])) {
          (attrs["watchlist"] as Array<Record<string, unknown>>).forEach((e) => {
            items.push({
              media_id: Number(e["media_id"] ?? 0),
              title: String(e["title"] ?? ""),
              status: String(e["status"] ?? "CURRENT"),
              progress: Number(e["progress"] ?? 0),
              episodes: e["episodes"] as number | undefined,
              score: e["score"] as number | undefined,
              cover_image: e["cover_image"] as string | undefined,
              site_url: e["site_url"] as string | undefined,
            });
          });
        }
      });

    return items;
  }

  // ─── View: Season ───────────────────────────────────────────────────────

  private _renderSeason() {
    let items = this._getSeasonItems();
    items = items.filter((i) => this._matchesSearch(i.title));

    if (!items.length) return this._renderEmpty("no_season");

    const cfg = this._config;
    const { w, h } = this._coverDims();

    return html`
      <div class="season-scroll">
        ${items.map((item) => html`
          <div
            class="season-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${item.title} - ${item.genres?.join(", ") ?? ""}` : ""}
          >
            ${cfg.show_cover && item.cover_image
              ? html`<img class="season-cover" src=${item.cover_image} alt=${item.title} loading="lazy"
                  style="width:${w - 8}px;height:${h - 12}px" />`
              : cfg.show_cover
                ? html`<div class="season-cover cover-placeholder" style="width:${w - 8}px;height:${h - 12}px"><span>${item.title[0]}</span></div>`
                : nothing
            }
            <div class="season-info">
              <div class="season-title">${item.title}</div>
              <div class="season-meta">
                ${item.average_score
                  ? html`<span class="score-chip">${item.average_score}%</span>`
                  : nothing}
                ${item.format
                  ? html`<span class="format-chip">${item.format}</span>`
                  : nothing}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _getSeasonItems(): SeasonAnime[] {
    const max = this._maxFor("season");
    const items: SeasonAnime[] = [];
    const cfg = this._config;

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["season_anime"])) {
          (attrs["season_anime"] as Array<Record<string, unknown>>).forEach((a) => {
            items.push({
              id: Number(a["id"] ?? 0),
              title: String(a["title"] ?? ""),
              average_score: a["average_score"] as number | undefined,
              episodes: a["episodes"] as number | undefined,
              format: a["format"] as string | undefined,
              genres: a["genres"] as string[] | undefined,
              cover_image: a["cover_image"] as string | undefined,
              site_url: a["site_url"] as string | undefined,
              next_airing_episode: a["next_airing_episode"] as SeasonAnime["next_airing_episode"],
            });
          });
        }
      });

    // Apply genre filter
    let filtered = items;
    if (cfg.genre_filter?.length) {
      const gf = new Set(cfg.genre_filter);
      filtered = filtered.filter((i) => i.genres?.some((g) => gf.has(g)));
    }
    // Apply format filter
    if (cfg.format_filter?.length) {
      const ff = new Set(cfg.format_filter);
      filtered = filtered.filter((i) => i.format && ff.has(i.format));
    }

    return filtered.slice(0, max);
  }

  // ─── View: Manga ────────────────────────────────────────────────────────

  private _renderManga() {
    const statuses = this._config.watchlist_statuses ?? ["CURRENT"];
    const showTabs = this._config.show_status_tabs && statuses.length > 1;
    let items = this._getMangaItems();

    if (showTabs) {
      items = items.filter((i) => i.status === this._activeTab);
    } else {
      items = items.filter((i) => statuses.includes(i.status));
    }
    items = items.filter((i) => this._matchesSearch(i.title));

    const useScroll = this._config.overflow_mode === "scroll";
    if (!useScroll) {
      items = items.slice(0, this._maxFor("manga"));
    }

    return html`
      ${showTabs ? this._renderStatusTabs(statuses) : nothing}
      ${items.length
        ? this._renderMangaGrid(items)
        : this._renderEmpty("no_manga")}
    `;
  }

  private _renderMangaGrid(items: MangaItem[]) {
    const cfg = this._config;
    const useScroll = cfg.overflow_mode === "scroll";
    const scrollH = cfg.scroll_height ?? 400;
    return html`
      <div class="grid ${useScroll ? "grid-scroll" : ""}"
        style=${useScroll ? `max-height:${scrollH}px` : ""}>
        ${items.map((item) => html`
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${item.title} - Ch.${item.progress}/${item.chapters ?? "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && item.cover_image
                ? html`<img class="grid-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
                : html`<div class="grid-cover cover-placeholder"><span>${item.title[0] ?? "?"}</span></div>`
              }
              ${renderScore(item.score, cfg.score_display ?? "number")}
            </div>
            <div class="grid-title">${item.title}</div>
            ${cfg.show_progress && cfg.show_progress_bar && item.chapters
              ? html`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100, (item.progress / item.chapters) * 100)}%"></div>
                </div>
                <div class="progress-label">Ch. ${item.progress}/${item.chapters}</div>
              `
              : cfg.show_progress && item.progress
                ? html`<div class="progress-label">Ch. ${item.progress}${item.volumes ? ` · Vol. ${item.progress_volumes}` : ""}</div>`
                : nothing
            }
          </div>
        `)}
      </div>
    `;
  }

  private _getMangaItems(): MangaItem[] {
    const items: MangaItem[] = [];

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["manga_list"])) {
          (attrs["manga_list"] as Array<Record<string, unknown>>).forEach((e) => {
            items.push({
              media_id: Number(e["media_id"] ?? 0),
              title: String(e["title"] ?? ""),
              status: String(e["status"] ?? "CURRENT"),
              progress: Number(e["progress"] ?? 0),
              progress_volumes: Number(e["progress_volumes"] ?? 0),
              chapters: e["chapters"] as number | undefined,
              volumes: e["volumes"] as number | undefined,
              score: e["score"] as number | undefined,
              cover_image: e["cover_image"] as string | undefined,
              site_url: e["site_url"] as string | undefined,
            });
          });
        }
      });

    return items;
  }

  // ─── View: Profile ──────────────────────────────────────────────────────

  private _renderProfile() {
    const animeCount =
      getEntityState(this.hass, "sensor.anilist_anime_gesamt_geschaut") ||
      getEntityState(this.hass, "sensor.anilist_total_anime_watched");
    const episodes =
      getEntityState(this.hass, "sensor.anilist_episoden_gesamt") ||
      getEntityState(this.hass, "sensor.anilist_total_episodes_watched");
    const hours =
      getEntityState(this.hass, "sensor.anilist_stunden_gesamt") ||
      getEntityState(this.hass, "sensor.anilist_total_hours_watched");
    const animeScore =
      getEntityState(this.hass, "sensor.anilist_anime_durchschnittsscore") ||
      getEntityState(this.hass, "sensor.anilist_anime_mean_score");
    const mangaScore =
      getEntityState(this.hass, "sensor.anilist_manga_durchschnittsscore") ||
      getEntityState(this.hass, "sensor.anilist_manga_mean_score");
    const watching =
      getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
      getEntityState(this.hass, "sensor.anilist_watching_count");
    const chaptersRead =
      getEntityState(this.hass, "sensor.anilist_kapitel_gelesen") ||
      getEntityState(this.hass, "sensor.anilist_chapters_read");
    const mangaCount =
      getEntityState(this.hass, "sensor.anilist_manga_lese_ich") ||
      getEntityState(this.hass, "sensor.anilist_manga_reading_count");

    const topGenreEntity = this.hass.states["sensor.anilist_top_genre"];
    const topGenres = (topGenreEntity?.attributes?.["top_genres"] ?? []) as string[];
    const favourites = (topGenreEntity?.attributes?.["favourite_anime"] ?? []) as Array<{
      title: string; site_url?: string; cover?: string;
    }>;
    const viewerName = topGenreEntity?.attributes?.["viewer_name"] as string | undefined;
    const viewerAvatar = topGenreEntity?.attributes?.["viewer_avatar"] as string | undefined;

    const hasStats = animeCount && animeCount !== "unknown";

    if (!hasStats) {
      return html`
        <div class="empty">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <div>${this._t("no_profile")}<br/>${this._t("auth_only")}</div>
        </div>
      `;
    }

    const profileUrl = viewerName ? `https://anilist.co/user/${viewerName}` : undefined;

    const cfg = this._config;

    return html`
      <div class="profile">
        <!-- Avatar + Name -->
        ${cfg.show_avatar !== false || cfg.show_username !== false ? html`
          <div class="profile-header-centered"
            @click=${() => profileUrl && this._handleClick(profileUrl)}
            style=${profileUrl && this._shouldLink() ? "cursor:pointer" : ""}
          >
            ${cfg.show_avatar !== false ? (viewerAvatar
              ? html`<img class="avatar" src=${viewerAvatar} alt=${viewerName ?? ""} loading="lazy" />`
              : html`
                <div class="avatar avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              `) : nothing}
            ${cfg.show_username !== false
              ? html`<div class="profile-name">${viewerName ?? this._t("profile")}</div>`
              : nothing}
          </div>
        ` : nothing}

        <!-- Anime Stats -->
        ${cfg.show_anime_stats !== false ? html`
          <div class="stats-grid">
            ${this._statTile(this._t("anime"), animeCount)}
            ${this._statTile(this._t("episodes"), episodes)}
            ${this._statTile(this._t("hours"), hours)}
            ${this._statTile(this._t("score_avg"), animeScore)}
            ${watching && watching !== "unknown"
              ? this._statTile(this._t("watching_now"), watching)
              : nothing}
          </div>
        ` : nothing}

        <!-- Manga Stats -->
        ${cfg.show_manga_stats !== false && mangaCount && mangaCount !== "unknown" ? html`
          <div class="stats-grid">
            ${this._statTile(this._t("manga_count"), mangaCount)}
            ${chaptersRead && chaptersRead !== "unknown"
              ? this._statTile(this._t("chapters"), chaptersRead)
              : nothing}
            ${mangaScore && mangaScore !== "unknown"
              ? this._statTile(this._t("manga_score"), mangaScore)
              : nothing}
          </div>
        ` : nothing}

        <!-- Genre chart -->
        ${cfg.show_genre_chart !== false && topGenres.length ? html`
          <div class="section-label">${this._t("top_genres")}</div>
          ${this._renderGenreChart(topGenres)}
        ` : nothing}

        <!-- Favourites -->
        ${cfg.show_favourites !== false && favourites.length ? html`
          <div class="section-label">${this._t("favourites")}</div>
          <div class="fav-list">
            ${favourites.slice(0, 5).map((f) => html`
              <div
                class="fav-item"
                @click=${() => this._handleClick(f.site_url)}
                style=${f.site_url && this._shouldLink() ? "cursor:pointer" : ""}
              >
                ${f.cover
                  ? html`<img class="fav-cover" src=${f.cover} alt=${f.title} loading="lazy" />`
                  : nothing}
                <span class="fav-title">${f.title}</span>
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderGenreChart(genres: string[]) {
    const chartType = this._config.chart_type ?? "bar";
    const maxCount = 5;
    const sliced = genres.slice(0, maxCount);

    if (chartType === "tags") {
      return html`
        <div class="genre-chips">
          ${sliced.map((g) => html`<span class="genre-chip">${g}</span>`)}
        </div>
      `;
    }

    if (chartType === "donut") {
      const total = sliced.length;
      const colors = ["#3DB4F2", "#C063FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];
      let cumulative = 0;
      const segments = sliced.map((g, i) => {
        const pct = 100 / total;
        const start = cumulative;
        cumulative += pct;
        return { genre: g, start, pct, color: colors[i % colors.length] };
      });
      // Simple donut via conic-gradient
      const gradientParts = segments.map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(", ");
      return html`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${gradientParts})"></div>
          <div class="donut-legend">
            ${segments.map((s) => html`
              <div class="legend-item">
                <span class="legend-dot" style="background:${s.color}"></span>
                <span>${s.genre}</span>
              </div>
            `)}
          </div>
        </div>
      `;
    }

    // Default: bar chart
    const weights = sliced.map((_, i) => 100 - i * 15);
    return html`
      <div class="bar-chart">
        ${sliced.map((g, i) => html`
          <div class="bar-row">
            <span class="bar-label">${g}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${weights[i]}%"></div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _statTile(label: string, value: string) {
    return html`
      <div class="stat-tile">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }

  private _defaultTitle(view: string): string {
    const keys: Record<string, string> = {
      airing: "next_episodes",
      watchlist: "watching",
      season: "this_season",
      profile: "profile",
      manga: "manga",
    };
    return this._t(keys[view] ?? "next_episodes");
  }

  // ─── Styles ────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      --al-accent: var(--primary-color, #3DB4F2);
      --al-secondary: var(--accent-color, #C063FF);
      --al-card-bg: var(--ha-card-background, var(--card-background-color, #1A1A2E));
      --al-card-bg2: var(--secondary-background-color, #16213E);
      --al-text: var(--primary-text-color, #E8E8E8);
      --al-sub: var(--secondary-text-color, #9B9B9B);
      --al-border-color: var(--divider-color, rgba(61,180,242,0.15));
      --al-border-width: 1px;
      --al-border-radius: 12px;
      --al-card-opacity: 1;
    }

    .card {
      background: var(--al-card-bg);
      opacity: var(--al-card-opacity);
      border: var(--al-border-width) solid var(--al-border-color);
      border-radius: var(--al-border-radius);
      overflow: hidden;
      font-family: var(--primary-font-family, sans-serif);
      color: var(--al-text);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--al-card-bg2);
      border-bottom: 1px solid var(--al-border-color);
    }

    .brand-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      flex-shrink: 0;
    }

    .header-title {
      flex: 1;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--al-text);
    }

    .header-link {
      font-size: 0.75rem;
      color: var(--al-accent);
      text-decoration: none;
      opacity: 0.8;
    }
    .header-link:hover { opacity: 1; }

    .card-content { }

    /* ─── Search ────────────────────────────────────────────────────── */
    .search-bar { margin-bottom: 8px; }
    .search-bar input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--al-border-color);
      background: var(--al-card-bg2);
      color: var(--al-text);
      font-size: 0.85rem;
      outline: none;
    }
    .search-bar input:focus {
      border-color: var(--al-accent);
    }

    /* ─── Empty state ──────────────────────────────────────────────── */
    .empty {
      text-align: center;
      color: var(--al-sub);
      padding: 24px 12px;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .empty-icon {
      width: 36px; height: 36px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    /* ─── Status tabs ──────────────────────────────────────────────── */
    .status-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .status-tabs::-webkit-scrollbar { display: none; }

    .tab-btn {
      padding: 4px 8px;
      border-radius: 12px;
      border: 1px solid var(--al-border-color);
      background: transparent;
      color: var(--al-sub);
      font-size: 0.65rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .tab-btn.active {
      background: var(--al-accent);
      color: #fff;
      border-color: var(--al-accent);
    }
    .tab-btn:hover:not(.active) {
      border-color: var(--al-accent);
      color: var(--al-text);
    }

    /* ─── List view (airing) ───────────────────────────────────────── */
    .list { display: flex; flex-direction: column; gap: 8px; }

    .list-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .list-item:hover { border-color: var(--al-accent); }

    .cover {
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .cover-placeholder {
      border-radius: 4px;
      background: linear-gradient(135deg, color-mix(in srgb, var(--al-accent) 15%, transparent), color-mix(in srgb, var(--al-secondary) 15%, transparent));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--al-sub);
      font-weight: bold;
      flex-shrink: 0;
    }

    .item-info { flex: 1; min-width: 0; }

    .item-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-sub {
      font-size: 0.78rem;
      color: var(--al-sub);
      margin-top: 2px;
    }

    .countdown-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    .countdown {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--al-accent);
    }

    .inline-genres {
      display: flex;
      gap: 3px;
      margin-top: 3px;
      flex-wrap: wrap;
    }

    .mini-chip {
      font-size: 0.62rem;
      color: var(--al-sub);
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 0 4px;
      border-radius: 3px;
    }

    .status-badge {
      font-size: 0.6rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 1px 4px;
      border-radius: 3px;
      letter-spacing: 0.03em;
    }
    .status-badge.airing {
      background: color-mix(in srgb, var(--al-accent) 20%, transparent);
      color: var(--al-accent);
    }

    /* ─── Grid view (watchlist/manga) ──────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }

    .grid-scroll {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-accent) transparent;
    }
    .grid-scroll::-webkit-scrollbar { width: 4px; }
    .grid-scroll::-webkit-scrollbar-thumb {
      background: var(--al-accent);
      border-radius: 2px;
    }

    .grid-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .grid-item:hover { border-color: var(--al-accent); }

    .grid-cover-wrap { position: relative; }

    .grid-cover {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      display: block;
    }

    .score-badge {
      position: absolute;
      top: 4px; right: 4px;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
    }

    .score-bar {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: rgba(0,0,0,0.3);
    }
    .score-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 0 2px 2px 0;
    }

    .grid-title {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0 6px;
      color: var(--al-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .progress-bar {
      height: 3px;
      background: var(--al-border-color);
      border-radius: 2px;
      margin: 0 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 2px;
      transition: width 0.4s;
    }

    .progress-label {
      font-size: 0.65rem;
      color: var(--al-sub);
      text-align: center;
      padding: 2px 6px 6px;
    }

    /* ─── Season scroll view ──────────────────────────────────────── */
    .season-scroll {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-accent) transparent;
    }

    .season-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .season-item:hover { border-color: var(--al-accent); }

    .season-cover {
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .season-info { flex: 1; min-width: 0; }

    .season-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .season-meta {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    .score-chip {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--al-accent);
      background: color-mix(in srgb, var(--al-accent) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--al-accent) 25%, transparent);
      padding: 1px 5px;
      border-radius: 4px;
    }

    .format-chip {
      font-size: 0.68rem;
      color: var(--al-sub);
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 1px 5px;
      border-radius: 4px;
    }

    /* ─── Profile view ────────────────────────────────────────────── */
    .profile { display: flex; flex-direction: column; gap: 12px; }

    .profile-header-centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .avatar {
      width: 64px; height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--al-accent);
    }

    .avatar-placeholder {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .avatar-placeholder svg { width: 32px; height: 32px; }

    .profile-name {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }

    .stat-tile {
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--al-accent);
    }

    .stat-label {
      font-size: 0.68rem;
      color: var(--al-sub);
      margin-top: 2px;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--al-sub);
    }

    /* Genre chips (tags mode) */
    .genre-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .genre-chip {
      font-size: 0.75rem;
      color: var(--al-secondary);
      background: color-mix(in srgb, var(--al-secondary) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--al-secondary) 25%, transparent);
      padding: 3px 8px;
      border-radius: 12px;
    }

    /* Genre bar chart */
    .bar-chart { display: flex; flex-direction: column; gap: 6px; }
    .bar-row { display: flex; align-items: center; gap: 8px; }
    .bar-label {
      font-size: 0.75rem;
      color: var(--al-text);
      min-width: 70px;
      text-align: right;
    }
    .bar-track {
      flex: 1;
      height: 8px;
      background: var(--al-border-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-accent), var(--al-secondary));
      border-radius: 4px;
      transition: width 0.4s;
    }

    /* Genre donut chart */
    .donut-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .donut {
      width: 80px; height: 80px;
      border-radius: 50%;
      position: relative;
      flex-shrink: 0;
    }
    .donut::after {
      content: "";
      position: absolute;
      top: 20%; left: 20%;
      width: 60%; height: 60%;
      border-radius: 50%;
      background: var(--al-card-bg);
    }
    .donut-legend { display: flex; flex-direction: column; gap: 4px; }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--al-text);
    }
    .legend-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* Favourites */
    .fav-list { display: flex; flex-direction: column; gap: 6px; }

    .fav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--al-card-bg2);
      border: 1px solid var(--al-border-color);
      transition: border-color 0.2s;
    }
    .fav-item:hover { border-color: var(--al-secondary); }

    .fav-cover {
      width: 28px; height: 40px;
      border-radius: 3px;
      object-fit: cover;
    }

    .fav-title {
      font-size: 0.82rem;
      color: var(--al-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
}

customElements.define("anilist-card", AniListCard);

// Register with HA custom card registry
(window as unknown as Record<string, unknown>)["customCards"] =
  (window as unknown as Record<string, unknown[]>)["customCards"] || [];
(
  (window as unknown as Record<string, unknown[]>)["customCards"] as Array<{
    type: string;
    name: string;
    description: string;
    preview: boolean;
  }>
).push({
  type: "anilist-card",
  name: "AniList",
  description: "AniList anime & manga tracker card with airing, watchlist, season, profile and manga views.",
  preview: true,
});
