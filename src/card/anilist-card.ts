import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import type { AniListCardConfig, HomeAssistant, HassEntity } from "./types.js";

// ─── AniList Brand Colors ────────────────────────────────────────────────────
const C = {
  blue: "#3DB4F2",
  purple: "#C063FF",
  dark: "#0D1117",
  cardBg: "#1A1A2E",
  cardBg2: "#16213E",
  surface: "#0F3460",
  text: "#E8E8E8",
  subtext: "#9B9B9B",
  border: "rgba(61,180,242,0.15)",
  progressBg: "rgba(255,255,255,0.1)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countdown(isoOrTs: string | number): string {
  const target =
    typeof isoOrTs === "number" ? isoOrTs * 1000 : new Date(isoOrTs).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return "Aired";
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h >= 24) {
    const d = Math.floor(h / 24);
    return `in ${d}d ${h % 24}h`;
  }
  return h > 0 ? `in ${h}h ${m}m` : `in ${m}m`;
}

function getEntityAttr(
  hass: HomeAssistant,
  entityId: string,
  attr: string
): unknown {
  return hass.states[entityId]?.attributes?.[attr];
}

function getEntityState(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.state ?? "";
}

// ─── Card Element ─────────────────────────────────────────────────────────────

class AniListCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AniListCardConfig;
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
      show_countdown: true,
      show_progress: true,
      link_to_anilist: true,
      ...config,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Refresh countdown every minute
    this._tick = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._tick);
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const view = this._config.view ?? "airing";
    const title = this._config.title ?? this._defaultTitle(view);

    return html`
      <div class="card">
        <div class="card-header">
          <span class="brand-dot"></span>
          <span class="header-title">${title}</span>
          <a
            class="header-link"
            href="https://anilist.co"
            target="_blank"
            rel="noopener"
          >AniList ↗</a>
        </div>
        <div class="card-content">
          ${view === "airing" ? this._renderAiring() : nothing}
          ${view === "watchlist" ? this._renderWatchlist() : nothing}
          ${view === "season" ? this._renderSeason() : nothing}
          ${view === "profile" ? this._renderProfile() : nothing}
        </div>
      </div>
    `;
  }

  // ─── View: Airing ──────────────────────────────────────────────────────────

  private _renderAiring() {
    // Collect all airing entities from the coordinator via calendar events
    // We read from the airing_schedule sensor attribute if available,
    // falling back to individual sensor states
    const items = this._getAiringItems();
    if (!items.length) {
      return html`<div class="empty">Keine Episoden in den nächsten Tagen.</div>`;
    }

    return html`
      <div class="list">
        ${items.map((item) => html`
          <div
            class="list-item"
            @click=${() => item.site_url && this._config.link_to_anilist
              ? window.open(item.site_url, "_blank", "noopener")
              : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            ${this._config.show_cover && item.cover_image
              ? html`<img class="cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
              : html`<div class="cover cover-placeholder"><span>?</span></div>`
            }
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-sub">Episode ${item.episode}</div>
              ${this._config.show_countdown
                ? html`<div class="countdown">${countdown(item.airing_at)}</div>`
                : nothing
              }
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _getAiringItems() {
    const max = this._config.max_items ?? 5;
    // Try to get next_episode data from HA entities
    const items: Array<{
      title: string;
      episode: number;
      airing_at: string;
      cover_image?: string;
      site_url?: string;
    }> = [];

    // Primary: check if there's a next_episode_title sensor with extra attrs
    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        // Look for airing_schedule attribute (list of upcoming episodes)
        if (Array.isArray(attrs["airing_schedule"])) {
          (attrs["airing_schedule"] as Array<Record<string, unknown>>)
            .slice(0, max)
            .forEach((ep) => {
              items.push({
                title: String(ep["title"] ?? ""),
                episode: Number(ep["episode"] ?? 0),
                airing_at: String(ep["airing_at"] ?? ""),
                cover_image: ep["cover_image"] as string | undefined,
                site_url: ep["site_url"] as string | undefined,
              });
            });
        }
      });

    // Fallback: use next_episode_title + next_episode_time sensors
    if (!items.length) {
      const title =
        getEntityState(this.hass, "sensor.anilist_nachster_anime") ||
        getEntityState(this.hass, "sensor.anilist_next_airing_anime");
      const time =
        getEntityState(this.hass, "sensor.anilist_nachste_episode_um") ||
        getEntityState(this.hass, "sensor.anilist_next_episode_time");
      if (title && title !== "unknown") {
        items.push({ title, episode: 1, airing_at: time });
      }
    }

    return items.slice(0, max);
  }

  // ─── View: Watchlist ────────────────────────────────────────────────────────

  private _renderWatchlist() {
    const items = this._getWatchlistItems();
    if (!items.length) {
      return html`<div class="empty">Keine Anime in der Watchlist.</div>`;
    }

    return html`
      <div class="grid">
        ${items.map((item) => html`
          <div
            class="grid-item"
            @click=${() => item.site_url && this._config.link_to_anilist
              ? window.open(item.site_url, "_blank", "noopener")
              : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            <div class="grid-cover-wrap">
              ${item.cover_image
                ? html`<img class="grid-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
                : html`<div class="grid-cover cover-placeholder"><span>${item.title[0]}</span></div>`
              }
              ${item.score
                ? html`<span class="score-badge">${item.score}</span>`
                : nothing
              }
            </div>
            <div class="grid-title">${item.title}</div>
            ${this._config.show_progress && item.episodes
              ? html`
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"
                  ></div>
                </div>
                <div class="progress-label">${item.progress}/${item.episodes}</div>
              `
              : item.progress
                ? html`<div class="progress-label">Ep. ${item.progress}</div>`
                : nothing
            }
          </div>
        `)}
      </div>
    `;
  }

  private _getWatchlistItems() {
    const max = this._config.max_items ?? 10;
    const items: Array<{
      title: string;
      progress: number;
      episodes?: number;
      score?: number;
      cover_image?: string;
      site_url?: string;
    }> = [];

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["watchlist"])) {
          (attrs["watchlist"] as Array<Record<string, unknown>>)
            .filter((e) => e["status"] === "CURRENT")
            .slice(0, max)
            .forEach((e) => {
              items.push({
                title: String(e["title"] ?? ""),
                progress: Number(e["progress"] ?? 0),
                episodes: e["episodes"] as number | undefined,
                score: e["score"] as number | undefined,
                cover_image: e["cover_image"] as string | undefined,
                site_url: e["site_url"] as string | undefined,
              });
            });
        }
      });

    // Fallback: show watching_count sensor info
    if (!items.length) {
      const count =
        getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
        getEntityState(this.hass, "sensor.anilist_watching_count");
      if (count && count !== "unknown") {
        return [{
          title: `${count} Anime in der Watchlist`,
          progress: 0,
        }];
      }
    }

    return items.slice(0, max);
  }

  // ─── View: Season ───────────────────────────────────────────────────────────

  private _renderSeason() {
    const items = this._getSeasonItems();
    if (!items.length) {
      return html`<div class="empty">Keine Season-Daten verfügbar.</div>`;
    }

    return html`
      <div class="season-scroll">
        ${items.map((item) => html`
          <div
            class="season-item"
            @click=${() => item.site_url && this._config.link_to_anilist
              ? window.open(item.site_url, "_blank", "noopener")
              : undefined}
            style=${item.site_url && this._config.link_to_anilist ? "cursor:pointer" : ""}
          >
            ${item.cover_image
              ? html`<img class="season-cover" src=${item.cover_image} alt=${item.title} loading="lazy" />`
              : html`<div class="season-cover cover-placeholder"><span>${item.title[0]}</span></div>`
            }
            <div class="season-info">
              <div class="season-title">${item.title}</div>
              <div class="season-meta">
                ${item.average_score
                  ? html`<span class="score-chip">${item.average_score}%</span>`
                  : nothing
                }
                ${item.format ? html`<span class="format-chip">${item.format}</span>` : nothing}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private _getSeasonItems() {
    const max = this._config.max_items ?? 10;
    const items: Array<{
      title: string;
      average_score?: number;
      format?: string;
      cover_image?: string;
      site_url?: string;
    }> = [];

    Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("sensor.anilist_"))
      .forEach(([_id, entity]: [string, HassEntity]) => {
        const attrs = entity.attributes as Record<string, unknown>;
        if (Array.isArray(attrs["season_anime"])) {
          (attrs["season_anime"] as Array<Record<string, unknown>>)
            .slice(0, max)
            .forEach((a) => {
              items.push({
                title: String(a["title"] ?? ""),
                average_score: a["average_score"] as number | undefined,
                format: a["format"] as string | undefined,
                cover_image: a["cover_image"] as string | undefined,
                site_url: a["site_url"] as string | undefined,
              });
            });
        }
      });

    return items.slice(0, max);
  }

  // ─── View: Profile ──────────────────────────────────────────────────────────

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
    const score =
      getEntityState(this.hass, "sensor.anilist_anime_durchschnittsscore") ||
      getEntityState(this.hass, "sensor.anilist_anime_mean_score");
    const topGenres = (
      getEntityAttr(this.hass, "sensor.anilist_top_genre", "top_genres") ||
      getEntityAttr(this.hass, "sensor.anilist_top_genre", "top_genres") ||
      []
    ) as string[];
    const favourites = (
      getEntityAttr(this.hass, "sensor.anilist_top_genre", "favourite_anime") ||
      []
    ) as Array<{ title: string; site_url?: string; cover?: string }>;

    const watching =
      getEntityState(this.hass, "sensor.anilist_schaue_ich_gerade") ||
      getEntityState(this.hass, "sensor.anilist_watching_count");

    const hasStats = animeCount && animeCount !== "unknown";

    if (!hasStats) {
      return html`
        <div class="empty">Keine Profil-Statistiken verfügbar.<br />Nur für eingeloggte Nutzer.</div>
      `;
    }

    return html`
      <div class="profile">
        <div class="profile-header">
          <div class="profile-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <div class="profile-title">AniList Profil</div>
        </div>

        <div class="stats-grid">
          ${this._statTile("Anime", animeCount, "mdi:television-classic")}
          ${this._statTile("Episoden", episodes, "mdi:play-circle")}
          ${this._statTile("Stunden", hours, "mdi:clock")}
          ${this._statTile("Score Ø", score, "mdi:star")}
          ${watching && watching !== "unknown"
            ? this._statTile("Schaue ich", watching, "mdi:eye")
            : nothing}
        </div>

        ${topGenres.length
          ? html`
            <div class="section-label">Top Genres</div>
            <div class="genre-chips">
              ${topGenres.slice(0, 5).map((g) => html`<span class="genre-chip">${g}</span>`)}
            </div>
          `
          : nothing
        }

        ${favourites.length
          ? html`
            <div class="section-label">Favoriten</div>
            <div class="fav-list">
              ${favourites.slice(0, 3).map((f) => html`
                <div
                  class="fav-item"
                  @click=${() => f.site_url && this._config.link_to_anilist
                    ? window.open(f.site_url, "_blank", "noopener")
                    : undefined}
                  style=${f.site_url ? "cursor:pointer" : ""}
                >
                  ${f.cover
                    ? html`<img class="fav-cover" src=${f.cover} alt=${f.title} loading="lazy" />`
                    : nothing}
                  <span class="fav-title">${f.title}</span>
                </div>
              `)}
            </div>
          `
          : nothing
        }
      </div>
    `;
  }

  private _statTile(label: string, value: string, _icon: string) {
    return html`
      <div class="stat-tile">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }

  private _defaultTitle(view: string): string {
    const titles: Record<string, string> = {
      airing: "Nächste Episoden",
      watchlist: "Schaue ich gerade",
      season: "Diese Season",
      profile: "AniList Profil",
    };
    return titles[view] ?? "AniList";
  }

  // ─── Styles ────────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      --al-blue: ${unsafeCSS(C.blue)};
      --al-purple: ${unsafeCSS(C.purple)};
      --al-dark: ${unsafeCSS(C.dark)};
      --al-bg: ${unsafeCSS(C.cardBg)};
      --al-bg2: ${unsafeCSS(C.cardBg2)};
      --al-text: ${unsafeCSS(C.text)};
      --al-sub: ${unsafeCSS(C.subtext)};
      --al-border: ${unsafeCSS(C.border)};
    }

    .card {
      background: var(--al-bg);
      border: 1px solid var(--al-border);
      border-radius: 12px;
      overflow: hidden;
      font-family: var(--primary-font-family, sans-serif);
      color: var(--al-text);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: var(--al-bg2);
      border-bottom: 1px solid var(--al-border);
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
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
      color: var(--al-blue);
      text-decoration: none;
      opacity: 0.8;
    }
    .header-link:hover { opacity: 1; }

    .card-content { padding: 12px; }

    .empty {
      text-align: center;
      color: var(--al-sub);
      padding: 24px 12px;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* ─── List view (airing) ───────────────────────────────────────────── */
    .list { display: flex; flex-direction: column; gap: 8px; }

    .list-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .list-item:hover { border-color: rgba(61,180,242,0.4); }

    .cover {
      width: 48px;
      height: 68px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .cover-placeholder {
      width: 48px;
      height: 68px;
      border-radius: 4px;
      background: linear-gradient(135deg, var(--al-blue)22, var(--al-purple)22);
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

    .countdown {
      margin-top: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--al-blue);
    }

    /* ─── Grid view (watchlist) ───────────────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }

    .grid-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .grid-item:hover { border-color: rgba(61,180,242,0.4); }

    .grid-cover-wrap { position: relative; }

    .grid-cover {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      display: block;
    }

    .score-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
      color: #fff;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
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
      background: var(--al-border);
      border-radius: 2px;
      margin: 0 6px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--al-blue), var(--al-purple));
      border-radius: 2px;
      transition: width 0.4s;
    }

    .progress-label {
      font-size: 0.65rem;
      color: var(--al-sub);
      text-align: center;
      padding: 2px 6px 6px;
    }

    /* ─── Season scroll view ──────────────────────────────────────────── */
    .season-scroll {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--al-blue) transparent;
    }

    .season-item {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .season-item:hover { border-color: rgba(61,180,242,0.4); }

    .season-cover {
      width: 40px;
      height: 56px;
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
      color: var(--al-blue);
      background: rgba(61,180,242,0.12);
      border: 1px solid rgba(61,180,242,0.25);
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

    /* ─── Profile view ────────────────────────────────────────────────── */
    .profile { display: flex; flex-direction: column; gap: 12px; }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .profile-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--al-blue), var(--al-purple));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .profile-icon svg { width: 22px; height: 22px; }

    .profile-title {
      font-size: 1rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--al-blue), var(--al-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }

    .stat-tile {
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      border-radius: 8px;
      padding: 10px 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--al-blue);
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

    .genre-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .genre-chip {
      font-size: 0.75rem;
      color: var(--al-purple);
      background: rgba(192,99,255,0.1);
      border: 1px solid rgba(192,99,255,0.25);
      padding: 3px 8px;
      border-radius: 12px;
    }

    .fav-list { display: flex; flex-direction: column; gap: 6px; }

    .fav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 6px;
      background: var(--al-bg2);
      border: 1px solid var(--al-border);
      transition: border-color 0.2s;
    }
    .fav-item:hover { border-color: rgba(192,99,255,0.4); }

    .fav-cover {
      width: 28px;
      height: 40px;
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

// Register with HA's custom card registry
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
  name: "AniList Card",
  description: "Zeigt AniList-Daten: Airing, Watchlist, Season und Profil.",
  preview: true,
});
