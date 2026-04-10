import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { AniListCardConfig, HomeAssistant } from "./types.js";

type EditorTab = "general" | "view" | "colors";

const VIEWS = [
  { value: "airing", label: "Airing" },
  { value: "watchlist", label: "Watchlist" },
  { value: "season", label: "Season" },
  { value: "profile", label: "Profile" },
  { value: "manga", label: "Manga" },
];

const COVER_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const SCORE_DISPLAYS = [
  { value: "stars", label: "★ Stars" },
  { value: "bar", label: "Bar" },
  { value: "number", label: "Number" },
  { value: "none", label: "None" },
];

const COUNTDOWN_FORMATS = [
  { value: "relative", label: "Relative (5h 30m)" },
  { value: "absolute", label: "Absolute (Apr 10, 14:00)" },
  { value: "both", label: "Both" },
];

const LINK_TARGETS = [
  { value: "anilist", label: "Open AniList" },
  { value: "ha_more_info", label: "HA More-Info" },
  { value: "none", label: "No link" },
];

const SORT_OPTIONS = [
  { value: "time", label: "Time" },
  { value: "title", label: "Title" },
  { value: "score", label: "Score" },
];

const PADDING_OPTIONS = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "relaxed", label: "Relaxed" },
];

const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "donut", label: "Donut Chart" },
  { value: "tags", label: "Tags" },
];

const OVERFLOW_MODES = [
  { value: "scroll", label: "Scrollbar" },
  { value: "limit", label: "Limit items" },
];

const LAYOUT_MODES = [
  { value: "grid", label: "Grid (Covers)" },
  { value: "list", label: "List (Rows)" },
];

const SCORE_SOURCES = [
  { value: "auto", label: "Auto (smart)" },
  { value: "user", label: "My Score" },
  { value: "average", label: "Average Score" },
];

const SCORE_POSITIONS = [
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "inline", label: "Inline" },
  { value: "none", label: "Hidden" },
];

const COVER_QUALITIES = [
  { value: "small", label: "Small (fast)" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large / HD" },
];

const STATUS_OPTIONS = [
  { value: "CURRENT", label: "Current" },
  { value: "PLANNING", label: "Planning" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PAUSED", label: "Paused" },
  { value: "DROPPED", label: "Dropped" },
];

class AniListCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AniListCardConfig;
  @state() private _tab: EditorTab = "general";

  setConfig(config: AniListCardConfig) {
    this._config = { ...config };
  }

  private _dispatch() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _set(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this._dispatch();
  }

  private _val(key: string): unknown {
    return (this._config as unknown as Record<string, unknown>)[key];
  }

  render() {
    if (!this._config) return nothing;

    return html`
      <div class="editor">
        <div class="tabs">
          ${(["general", "view", "colors"] as EditorTab[]).map(
            (t) => html`
              <button
                class="tab ${this._tab === t ? "active" : ""}"
                @click=${() => { this._tab = t; }}
              >${this._tabLabel(t)}</button>
            `
          )}
        </div>
        <div class="tab-content">
          ${this._tab === "general" ? this._renderGeneral() : nothing}
          ${this._tab === "view" ? this._renderViewSettings() : nothing}
          ${this._tab === "colors" ? this._renderColors() : nothing}
        </div>
      </div>
    `;
  }

  private _tabLabel(t: EditorTab): string {
    const view = this._config.view ?? "airing";
    const viewLabel = VIEWS.find((v) => v.value === view)?.label ?? "View";
    const labels: Record<EditorTab, string> = {
      general: "General",
      view: viewLabel,
      colors: "Colors",
    };
    return labels[t];
  }

  // ─── General tab (shared settings) ──────────────────────────────────────

  private _renderGeneral() {
    return html`
      <div class="section">
        ${this._select("view", "View", VIEWS)}
        ${this._text("title", "Title (optional)")}
        ${this._text("entry_id", "Config Entry ID (optional, for multi-account)")}
        ${this._select("card_padding", "Card spacing", PADDING_OPTIONS)}
        ${this._select("link_target", "Click action", LINK_TARGETS)}
        ${this._toggle("show_cover", "Show cover images")}
        ${this._config.show_cover !== false ? this._select("cover_size", "Cover size", COVER_SIZES) : nothing}
        ${this._select("cover_quality", "Cover quality", COVER_QUALITIES)}
        ${this._select("score_position", "Score position", SCORE_POSITIONS)}
        ${this._select("score_source", "Score source", SCORE_SOURCES)}
        ${this._number("visible_items", "Visible items (scroll for more)", 1, 50)}
        ${this._config.visible_items ? this._toggle("scroll_snap", "Snap scroll to items") : nothing}
        ${this._config.visible_items ? this._toggle("scroll_fade", "Fade at scroll edge") : nothing}
        ${this._toggle("show_search", "Show search bar")}
        ${this._toggle("show_tooltips", "Show tooltips on hover")}
      </div>
    `;
  }

  // ─── Dynamic view settings tab ──────────────────────────────────────────

  private _renderViewSettings() {
    const view = this._config.view ?? "airing";
    switch (view) {
      case "airing": return this._renderAiringSettings();
      case "watchlist": return this._renderWatchlistSettings();
      case "season": return this._renderSeasonSettings();
      case "profile": return this._renderProfileSettings();
      case "manga": return this._renderMangaSettings();
      default: return nothing;
    }
  }

  private _renderAiringSettings() {
    return html`
      <div class="section">
        <div class="section-header">Airing Settings</div>
        ${this._number("max_airing", "Max items", 1, 50)}
        ${this._select("sort_by", "Sort by", SORT_OPTIONS)}
        ${this._toggle("show_countdown", "Show countdown")}
        ${this._config.show_countdown !== false
          ? this._select("countdown_format", "Countdown format", COUNTDOWN_FORMATS)
          : nothing}
        ${this._toggle("show_badges", "Show status badges")}
        ${this._toggle("show_duration", "Show episode duration")}
        ${this._toggle("show_genres", "Show genres")}
        ${this._toggle("show_average_score", "Show average score")}
        ${this._toggle("show_format_badge", "Show format badge (TV/Movie)")}
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
      </div>
    `;
  }

  private _renderWatchlistSettings() {
    return html`
      <div class="section">
        <div class="section-header">Watchlist Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._toggle("show_next_airing", "Show next episode countdown")}
        ${this._number("max_watchlist", "Max items (limit mode)", 1, 50)}
        ${this._select("overflow_mode", "Overflow behavior", OVERFLOW_MODES)}
        ${this._config.overflow_mode === "scroll"
          ? this._number("scroll_height", "Scroll height (px)", 100, 1000)
          : nothing}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}
        ${this._toggle("show_progress", "Show progress")}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", "Show progress bar") : nothing}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs", "Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${STATUS_OPTIONS.map((s) => html`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(this._config.watchlist_statuses ?? ["CURRENT"]).includes(s.value)}
                @change=${(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  const current = [...(this._config.watchlist_statuses ?? ["CURRENT"])];
                  if (checked && !current.includes(s.value)) {
                    current.push(s.value);
                  } else if (!checked) {
                    const idx = current.indexOf(s.value);
                    if (idx >= 0) current.splice(idx, 1);
                  }
                  this._set("watchlist_statuses", current);
                }}
              />
              ${s.label}
            </label>
          `)}
        </div>
      </div>
    `;
  }

  private _renderSeasonSettings() {
    return html`
      <div class="section">
        <div class="section-header">Season Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._number("max_season", "Max items", 1, 50)}
        ${this._toggle("show_next_season", "Include next season")}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}

        <div class="section-header">Filters</div>
        <label class="field-label">Genre filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${(this._config.genre_filter ?? []).join(", ")}
          @change=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._set("genre_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
          }}
          placeholder="e.g. Action, Romance"
        />
        <label class="field-label">Format filter (comma-separated)</label>
        <input
          class="text-input"
          type="text"
          .value=${(this._config.format_filter ?? []).join(", ")}
          @change=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._set("format_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
          }}
          placeholder="e.g. TV, MOVIE, OVA"
        />
      </div>
    `;
  }

  private _renderProfileSettings() {
    return html`
      <div class="section">
        <div class="section-header">Profile Settings</div>
        ${this._toggle("show_avatar", "Show avatar")}
        ${this._toggle("show_username", "Show username")}
        ${this._toggle("show_anime_stats", "Show anime statistics")}
        ${this._toggle("show_manga_stats", "Show manga statistics")}
        ${this._toggle("show_genre_chart", "Show genre chart")}
        ${this._config.show_genre_chart !== false
          ? this._select("chart_type", "Genre chart type", CHART_TYPES)
          : nothing}
        ${this._toggle("show_favourites", "Show favourites")}
      </div>
    `;
  }

  private _renderMangaSettings() {
    return html`
      <div class="section">
        <div class="section-header">Manga Settings</div>
        ${this._select("layout_mode", "Layout", LAYOUT_MODES)}
        ${this._number("max_manga", "Max items (limit mode)", 1, 50)}
        ${this._select("overflow_mode", "Overflow behavior", OVERFLOW_MODES)}
        ${this._config.overflow_mode === "scroll"
          ? this._number("scroll_height", "Scroll height (px)", 100, 1000)
          : nothing}
        ${this._select("score_display", "Score display", SCORE_DISPLAYS)}
        ${this._toggle("show_progress", "Show progress")}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", "Show progress bar") : nothing}

        <div class="section-header">Status Tabs</div>
        ${this._toggle("show_status_tabs", "Show status tabs")}
        <label class="field-label">Visible statuses</label>
        <div class="checkbox-group">
          ${STATUS_OPTIONS.map((s) => html`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked=${(this._config.watchlist_statuses ?? ["CURRENT"]).includes(s.value)}
                @change=${(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  const current = [...(this._config.watchlist_statuses ?? ["CURRENT"])];
                  if (checked && !current.includes(s.value)) {
                    current.push(s.value);
                  } else if (!checked) {
                    const idx = current.indexOf(s.value);
                    if (idx >= 0) current.splice(idx, 1);
                  }
                  this._set("watchlist_statuses", current);
                }}
              />
              ${s.label}
            </label>
          `)}
        </div>
      </div>
    `;
  }

  // ─── Colors tab ─────────────────────────────────────────────────────────

  private _renderColors() {
    return html`
      <div class="section">
        ${this._color("accent_color", "Accent color")}
        ${this._color("secondary_color", "Secondary color")}
        ${this._color("card_background", "Card background")}
        ${this._slider("card_opacity", "Card opacity", 0, 100)}
        ${this._color("border_color", "Border color")}
        ${this._number("border_width", "Border width (px)", 0, 10)}
        ${this._number("border_radius", "Border radius (px)", 0, 30)}
      </div>
    `;
  }

  // ─── Form helpers ───────────────────────────────────────────────────────

  private _select(key: string, label: string, options: { value: string; label: string }[]) {
    return html`
      <div class="field">
        <label class="field-label">${label}</label>
        <select
          class="select-input"
          .value=${String(this._val(key) ?? options[0]?.value)}
          @change=${(e: Event) => this._set(key, (e.target as HTMLSelectElement).value)}
        >
          ${options.map((o) => html`
            <option value=${o.value} ?selected=${this._val(key) === o.value}>${o.label}</option>
          `)}
        </select>
      </div>
    `;
  }

  private _text(key: string, label: string) {
    return html`
      <div class="field">
        <label class="field-label">${label}</label>
        <input
          class="text-input"
          type="text"
          .value=${String(this._val(key) ?? "")}
          @change=${(e: Event) => {
            const v = (e.target as HTMLInputElement).value;
            this._set(key, v || undefined);
          }}
        />
      </div>
    `;
  }

  private _number(key: string, label: string, min: number, max: number) {
    return html`
      <div class="field">
        <label class="field-label">${label}</label>
        <input
          class="text-input"
          type="number"
          min=${min}
          max=${max}
          .value=${String(this._val(key) ?? "")}
          @change=${(e: Event) => {
            const v = (e.target as HTMLInputElement).value;
            this._set(key, v ? Number(v) : undefined);
          }}
        />
      </div>
    `;
  }

  private _toggle(key: string, label: string) {
    return html`
      <div class="field toggle-field">
        <label class="field-label">${label}</label>
        <label class="switch">
          <input
            type="checkbox"
            .checked=${this._val(key) !== false}
            @change=${(e: Event) => this._set(key, (e.target as HTMLInputElement).checked)}
          />
          <span class="slider"></span>
        </label>
      </div>
    `;
  }

  private _color(key: string, label: string) {
    return html`
      <div class="field color-field">
        <label class="field-label">${label}</label>
        <div class="color-input-wrap">
          <input
            type="color"
            class="color-picker"
            .value=${String(this._val(key) ?? "#3DB4F2")}
            @input=${(e: Event) => this._set(key, (e.target as HTMLInputElement).value)}
          />
          <input
            class="text-input color-text"
            type="text"
            .value=${String(this._val(key) ?? "")}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._set(key, v || undefined);
            }}
            placeholder="auto"
          />
        </div>
      </div>
    `;
  }

  private _slider(key: string, label: string, min: number, max: number) {
    const val = Number(this._val(key) ?? max);
    return html`
      <div class="field">
        <label class="field-label">${label}: ${val}</label>
        <input
          type="range"
          class="range-input"
          min=${min}
          max=${max}
          .value=${String(val)}
          @input=${(e: Event) => this._set(key, Number((e.target as HTMLInputElement).value))}
        />
      </div>
    `;
  }

  // ─── Styles ─────────────────────────────────────────────────────────────

  static styles = css`
    .editor {
      font-family: var(--primary-font-family, sans-serif);
      color: var(--primary-text-color, #e8e8e8);
    }

    .tabs {
      display: flex;
      gap: 2px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.12));
    }

    .tab {
      padding: 8px 14px;
      border: none;
      background: none;
      color: var(--secondary-text-color, #9b9b9b);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab.active {
      color: var(--primary-color, #3DB4F2);
      border-bottom-color: var(--primary-color, #3DB4F2);
    }
    .tab:hover:not(.active) {
      color: var(--primary-text-color, #e8e8e8);
    }

    .tab-content { padding: 4px 0; }

    .section { display: flex; flex-direction: column; gap: 10px; }

    .section-header {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--primary-text-color, #e8e8e8);
      margin-top: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }

    .field { display: flex; flex-direction: column; gap: 4px; }

    .field-label {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--secondary-text-color, #9b9b9b);
    }

    .text-input,
    .select-input {
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      background: var(--input-fill-color, var(--secondary-background-color, #1a1a2e));
      color: var(--primary-text-color, #e8e8e8);
      font-size: 0.85rem;
      outline: none;
    }
    .text-input:focus,
    .select-input:focus {
      border-color: var(--primary-color, #3DB4F2);
    }

    .select-input {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%239b9b9b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      padding-right: 28px;
    }

    .toggle-field {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .switch {
      position: relative;
      width: 36px;
      height: 20px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--divider-color, rgba(255,255,255,0.12));
      border-radius: 10px;
      transition: 0.2s;
    }
    .slider::before {
      content: "";
      position: absolute;
      height: 14px; width: 14px;
      left: 3px; bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.2s;
    }
    input:checked + .slider {
      background: var(--primary-color, #3DB4F2);
    }
    input:checked + .slider::before {
      transform: translateX(16px);
    }

    .color-field { }
    .color-input-wrap {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .color-picker {
      width: 32px; height: 32px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      padding: 0;
      background: none;
    }
    .color-text { flex: 1; }

    .range-input {
      width: 100%;
      accent-color: var(--primary-color, #3DB4F2);
    }

    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.82rem;
      color: var(--primary-text-color, #e8e8e8);
      cursor: pointer;
    }
    .checkbox-item input {
      accent-color: var(--primary-color, #3DB4F2);
    }
  `;
}

customElements.define("anilist-card-editor", AniListCardEditor);
