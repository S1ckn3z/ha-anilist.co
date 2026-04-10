import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { AniListCardConfig, HomeAssistant } from "./types.js";

type EditorTab = "general" | "view" | "colors";

// ─── Editor Translations ──────────────────────────────────────────────────────

const EDITOR_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    // Tabs
    tab_general: "General",
    tab_colors: "Colors",
    // Views
    view_airing: "Airing",
    view_watchlist: "Watchlist",
    view_season: "Season",
    view_profile: "Profile",
    view_manga: "Manga",
    // General settings
    lbl_view: "View",
    lbl_title: "Title (optional)",
    lbl_entry_id: "Config Entry ID (optional, for multi-account)",
    lbl_card_padding: "Card spacing",
    lbl_link_target: "Click action",
    lbl_show_cover: "Show cover images",
    lbl_cover_size: "Cover size",
    lbl_cover_quality: "Cover quality",
    lbl_score_position: "Score position",
    lbl_score_source: "Score source",
    lbl_visible_items: "Visible items (scroll for more)",
    lbl_scroll_snap: "Snap scroll to items",
    lbl_scroll_fade: "Fade at scroll edge",
    lbl_show_search: "Show search bar",
    lbl_show_tooltips: "Show tooltips on hover",
    // Select options
    opt_small: "Small",
    opt_medium: "Medium",
    opt_large: "Large",
    opt_relative: "Relative (5h 30m)",
    opt_absolute: "Absolute (Apr 10, 14:00)",
    opt_both: "Both",
    opt_anilist: "Open AniList",
    opt_none_link: "No link",
    opt_time: "Time",
    opt_title: "Title",
    opt_score: "Score",
    opt_compact: "Compact",
    opt_normal: "Normal",
    opt_relaxed: "Relaxed",
    opt_bar: "Bar Chart",
    opt_donut: "Donut Chart",
    opt_tags: "Tags",
    opt_scroll: "Scrollbar",
    opt_limit: "Limit items",
    opt_grid: "Grid (Covers)",
    opt_list: "List (Rows)",
    opt_auto: "Auto (smart)",
    opt_user: "My Score",
    opt_average: "Average Score",
    opt_top_right: "Top Right",
    opt_top_left: "Top Left",
    opt_bottom_right: "Bottom Right",
    opt_bottom_left: "Bottom Left",
    opt_inline: "Inline",
    opt_none_pos: "Hidden",
    opt_small_quality: "Small (fast)",
    opt_medium_quality: "Medium",
    opt_large_quality: "Large / HD",
    // Status options
    status_current: "Current",
    status_planning: "Planning",
    status_completed: "Completed",
    status_paused: "Paused",
    status_dropped: "Dropped",
    status_repeating: "Repeating",
    // Section headers
    hdr_airing: "Airing Settings",
    hdr_watchlist: "Watchlist Settings",
    hdr_season: "Season Settings",
    hdr_profile: "Profile Settings",
    hdr_manga: "Manga Settings",
    hdr_status_tabs: "Status Tabs",
    hdr_filters: "Filters",
    // Airing settings
    lbl_max_items: "Max items",
    lbl_sort_by: "Sort by",
    lbl_show_countdown: "Show countdown",
    lbl_countdown_format: "Countdown format",
    lbl_show_badges: "Show status badges",
    lbl_show_duration: "Show episode duration",
    lbl_show_genres: "Show genres",
    lbl_show_average_score: "Show average score",
    lbl_show_format_badge: "Show format badge (TV/Movie)",
    lbl_layout: "Layout",
    // Watchlist settings
    lbl_show_next_airing: "Show next episode countdown",
    lbl_max_items_limit: "Max items (limit mode)",
    lbl_overflow_mode: "Overflow behavior",
    lbl_scroll_height: "Scroll height (px)",
    lbl_show_progress: "Show progress",
    lbl_show_progress_bar: "Show progress bar",
    lbl_show_status_tabs: "Show status tabs",
    lbl_visible_statuses: "Visible statuses",
    // Season settings
    lbl_genre_filter: "Genre filter (comma-separated)",
    lbl_format_filter: "Format filter (comma-separated)",
    placeholder_genre: "e.g. Action, Romance",
    placeholder_format: "e.g. TV, MOVIE, OVA",
    // Profile settings
    lbl_show_avatar: "Show avatar",
    lbl_show_username: "Show username",
    lbl_show_anime_stats: "Show anime statistics",
    lbl_show_manga_stats: "Show manga statistics",
    lbl_show_genre_chart: "Show genre chart",
    lbl_chart_type: "Genre chart type",
    lbl_show_favourites: "Show favourites",
    // Colors
    lbl_accent_color: "Accent color",
    lbl_secondary_color: "Secondary color",
    lbl_card_background: "Card background",
    lbl_card_opacity: "Card opacity",
    lbl_border_color: "Border color",
    lbl_border_width: "Border width (px)",
    lbl_border_radius: "Border radius (px)",
  },
  de: {
    tab_general: "Allgemein",
    tab_colors: "Farben",
    view_airing: "Ausstrahlung",
    view_watchlist: "Watchlist",
    view_season: "Season",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Ansicht",
    lbl_title: "Titel (optional)",
    lbl_entry_id: "Config Entry ID (optional, für Multi-Account)",
    lbl_card_padding: "Kartenabstand",
    lbl_link_target: "Klick-Aktion",
    lbl_show_cover: "Cover-Bilder anzeigen",
    lbl_cover_size: "Cover-Größe",
    lbl_cover_quality: "Cover-Qualität",
    lbl_score_position: "Score-Position",
    lbl_score_source: "Score-Quelle",
    lbl_visible_items: "Sichtbare Elemente (scrollen für mehr)",
    lbl_scroll_snap: "Scroll an Elementen einrasten",
    lbl_scroll_fade: "Am Scrollrand ausblenden",
    lbl_show_search: "Suchleiste anzeigen",
    lbl_show_tooltips: "Tooltips beim Hover anzeigen",
    opt_small: "Klein",
    opt_medium: "Mittel",
    opt_large: "Groß",
    opt_relative: "Relativ (5h 30m)",
    opt_absolute: "Absolut (10. Apr, 14:00)",
    opt_both: "Beide",
    opt_anilist: "AniList öffnen",
    opt_none_link: "Kein Link",
    opt_time: "Zeit",
    opt_title: "Titel",
    opt_score: "Score",
    opt_compact: "Kompakt",
    opt_normal: "Normal",
    opt_relaxed: "Entspannt",
    opt_bar: "Balkendiagramm",
    opt_donut: "Kreisdiagramm",
    opt_tags: "Tags",
    opt_scroll: "Scrollleiste",
    opt_limit: "Elemente begrenzen",
    opt_grid: "Raster (Cover)",
    opt_list: "Liste (Zeilen)",
    opt_auto: "Auto (smart)",
    opt_user: "Mein Score",
    opt_average: "Durchschnittsscore",
    opt_top_right: "Oben rechts",
    opt_top_left: "Oben links",
    opt_bottom_right: "Unten rechts",
    opt_bottom_left: "Unten links",
    opt_inline: "Inline",
    opt_none_pos: "Versteckt",
    opt_small_quality: "Klein (schnell)",
    opt_medium_quality: "Mittel",
    opt_large_quality: "Groß / HD",
    status_current: "Aktuell",
    status_planning: "Geplant",
    status_completed: "Abgeschlossen",
    status_paused: "Pausiert",
    status_dropped: "Abgebrochen",
    status_repeating: "Wiederholen",
    hdr_airing: "Ausstrahlungs-Einstellungen",
    hdr_watchlist: "Watchlist-Einstellungen",
    hdr_season: "Season-Einstellungen",
    hdr_profile: "Profil-Einstellungen",
    hdr_manga: "Manga-Einstellungen",
    hdr_status_tabs: "Status-Tabs",
    hdr_filters: "Filter",
    lbl_max_items: "Max. Elemente",
    lbl_sort_by: "Sortieren nach",
    lbl_show_countdown: "Countdown anzeigen",
    lbl_countdown_format: "Countdown-Format",
    lbl_show_badges: "Status-Badges anzeigen",
    lbl_show_duration: "Episodendauer anzeigen",
    lbl_show_genres: "Genres anzeigen",
    lbl_show_average_score: "Durchschnittsscore anzeigen",
    lbl_show_format_badge: "Format-Badge anzeigen (TV/Film)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Nächste Episode Countdown anzeigen",
    lbl_max_items_limit: "Max. Elemente (Limit-Modus)",
    lbl_overflow_mode: "Überlauf-Verhalten",
    lbl_scroll_height: "Scrollhöhe (px)",
    lbl_show_progress: "Fortschritt anzeigen",
    lbl_show_progress_bar: "Fortschrittsbalken anzeigen",
    lbl_show_status_tabs: "Status-Tabs anzeigen",
    lbl_visible_statuses: "Sichtbare Status",
    lbl_genre_filter: "Genre-Filter (kommagetrennt)",
    lbl_format_filter: "Format-Filter (kommagetrennt)",
    placeholder_genre: "z.B. Action, Romance",
    placeholder_format: "z.B. TV, MOVIE, OVA",
    lbl_show_avatar: "Avatar anzeigen",
    lbl_show_username: "Benutzername anzeigen",
    lbl_show_anime_stats: "Anime-Statistiken anzeigen",
    lbl_show_manga_stats: "Manga-Statistiken anzeigen",
    lbl_show_genre_chart: "Genre-Diagramm anzeigen",
    lbl_chart_type: "Genre-Diagrammtyp",
    lbl_show_favourites: "Favoriten anzeigen",
    lbl_accent_color: "Akzentfarbe",
    lbl_secondary_color: "Sekundärfarbe",
    lbl_card_background: "Kartenhintergrund",
    lbl_card_opacity: "Karten-Transparenz",
    lbl_border_color: "Rahmenfarbe",
    lbl_border_width: "Rahmenbreite (px)",
    lbl_border_radius: "Rahmenradius (px)",
  },
  ja: {
    tab_general: "一般",
    tab_colors: "カラー",
    view_airing: "放送中",
    view_watchlist: "ウォッチリスト",
    view_season: "シーズン",
    view_profile: "プロフィール",
    view_manga: "マンガ",
    lbl_view: "表示",
    lbl_title: "タイトル（任意）",
    lbl_entry_id: "設定エントリID（任意、マルチアカウント用）",
    lbl_card_padding: "カード間隔",
    lbl_link_target: "クリックアクション",
    lbl_show_cover: "カバー画像を表示",
    lbl_cover_size: "カバーサイズ",
    lbl_cover_quality: "カバー品質",
    lbl_score_position: "スコア位置",
    lbl_score_source: "スコアソース",
    lbl_visible_items: "表示アイテム数（スクロールで表示）",
    lbl_scroll_snap: "スクロールをアイテムにスナップ",
    lbl_scroll_fade: "スクロール端でフェード",
    lbl_show_search: "検索バーを表示",
    lbl_show_tooltips: "ホバー時にツールチップを表示",
    opt_small: "小",
    opt_medium: "中",
    opt_large: "大",
    opt_relative: "相対 (5h 30m)",
    opt_absolute: "絶対 (4月10日 14:00)",
    opt_both: "両方",
    opt_anilist: "AniListを開く",
    opt_none_link: "リンクなし",
    opt_time: "時間",
    opt_title: "タイトル",
    opt_score: "スコア",
    opt_compact: "コンパクト",
    opt_normal: "通常",
    opt_relaxed: "ゆったり",
    opt_bar: "棒グラフ",
    opt_donut: "ドーナツチャート",
    opt_tags: "タグ",
    opt_scroll: "スクロールバー",
    opt_limit: "アイテム制限",
    opt_grid: "グリッド（カバー）",
    opt_list: "リスト（行）",
    opt_auto: "自動（スマート）",
    opt_user: "マイスコア",
    opt_average: "平均スコア",
    opt_top_right: "右上",
    opt_top_left: "左上",
    opt_bottom_right: "右下",
    opt_bottom_left: "左下",
    opt_inline: "インライン",
    opt_none_pos: "非表示",
    opt_small_quality: "小（高速）",
    opt_medium_quality: "中",
    opt_large_quality: "大 / HD",
    status_current: "視聴中",
    status_planning: "予定",
    status_completed: "完了",
    status_paused: "一時停止",
    status_dropped: "中断",
    status_repeating: "リピート",
    hdr_airing: "放送設定",
    hdr_watchlist: "ウォッチリスト設定",
    hdr_season: "シーズン設定",
    hdr_profile: "プロフィール設定",
    hdr_manga: "マンガ設定",
    hdr_status_tabs: "ステータスタブ",
    hdr_filters: "フィルター",
    lbl_max_items: "最大アイテム数",
    lbl_sort_by: "並べ替え",
    lbl_show_countdown: "カウントダウンを表示",
    lbl_countdown_format: "カウントダウン形式",
    lbl_show_badges: "ステータスバッジを表示",
    lbl_show_duration: "エピソード時間を表示",
    lbl_show_genres: "ジャンルを表示",
    lbl_show_average_score: "平均スコアを表示",
    lbl_show_format_badge: "フォーマットバッジを表示（TV/映画）",
    lbl_layout: "レイアウト",
    lbl_show_next_airing: "次のエピソードカウントダウンを表示",
    lbl_max_items_limit: "最大アイテム数（制限モード）",
    lbl_overflow_mode: "オーバーフロー動作",
    lbl_scroll_height: "スクロール高さ (px)",
    lbl_show_progress: "進行状況を表示",
    lbl_show_progress_bar: "プログレスバーを表示",
    lbl_show_status_tabs: "ステータスタブを表示",
    lbl_visible_statuses: "表示するステータス",
    lbl_genre_filter: "ジャンルフィルター（カンマ区切り）",
    lbl_format_filter: "フォーマットフィルター（カンマ区切り）",
    placeholder_genre: "例: Action, Romance",
    placeholder_format: "例: TV, MOVIE, OVA",
    lbl_show_avatar: "アバターを表示",
    lbl_show_username: "ユーザー名を表示",
    lbl_show_anime_stats: "アニメ統計を表示",
    lbl_show_manga_stats: "マンガ統計を表示",
    lbl_show_genre_chart: "ジャンルチャートを表示",
    lbl_chart_type: "ジャンルチャートタイプ",
    lbl_show_favourites: "お気に入りを表示",
    lbl_accent_color: "アクセントカラー",
    lbl_secondary_color: "セカンダリカラー",
    lbl_card_background: "カード背景",
    lbl_card_opacity: "カード不透明度",
    lbl_border_color: "ボーダーカラー",
    lbl_border_width: "ボーダー幅 (px)",
    lbl_border_radius: "ボーダー半径 (px)",
  },
  es: {
    tab_general: "General",
    tab_colors: "Colores",
    view_airing: "En emisión",
    view_watchlist: "Lista de seguimiento",
    view_season: "Temporada",
    view_profile: "Perfil",
    view_manga: "Manga",
    lbl_view: "Vista",
    lbl_title: "Título (opcional)",
    lbl_entry_id: "ID de entrada de config (opcional, multi-cuenta)",
    lbl_card_padding: "Espaciado de tarjeta",
    lbl_link_target: "Acción al hacer clic",
    lbl_show_cover: "Mostrar imágenes de portada",
    lbl_cover_size: "Tamaño de portada",
    lbl_cover_quality: "Calidad de portada",
    lbl_score_position: "Posición del puntaje",
    lbl_score_source: "Fuente del puntaje",
    lbl_visible_items: "Elementos visibles (desplazar para más)",
    lbl_scroll_snap: "Ajustar desplazamiento a elementos",
    lbl_scroll_fade: "Desvanecer en el borde del scroll",
    lbl_show_search: "Mostrar barra de búsqueda",
    lbl_show_tooltips: "Mostrar tooltips al pasar el cursor",
    opt_small: "Pequeño",
    opt_medium: "Mediano",
    opt_large: "Grande",
    opt_relative: "Relativo (5h 30m)",
    opt_absolute: "Absoluto (10 abr, 14:00)",
    opt_both: "Ambos",
    opt_anilist: "Abrir AniList",
    opt_none_link: "Sin enlace",
    opt_time: "Tiempo",
    opt_title: "Título",
    opt_score: "Puntaje",
    opt_compact: "Compacto",
    opt_normal: "Normal",
    opt_relaxed: "Relajado",
    opt_bar: "Gráfico de barras",
    opt_donut: "Gráfico circular",
    opt_tags: "Etiquetas",
    opt_scroll: "Barra de desplazamiento",
    opt_limit: "Limitar elementos",
    opt_grid: "Cuadrícula (Portadas)",
    opt_list: "Lista (Filas)",
    opt_auto: "Auto (inteligente)",
    opt_user: "Mi puntaje",
    opt_average: "Puntaje promedio",
    opt_top_right: "Arriba derecha",
    opt_top_left: "Arriba izquierda",
    opt_bottom_right: "Abajo derecha",
    opt_bottom_left: "Abajo izquierda",
    opt_inline: "En línea",
    opt_none_pos: "Oculto",
    opt_small_quality: "Pequeño (rápido)",
    opt_medium_quality: "Mediano",
    opt_large_quality: "Grande / HD",
    status_current: "Actual",
    status_planning: "Planeado",
    status_completed: "Completado",
    status_paused: "Pausado",
    status_dropped: "Abandonado",
    status_repeating: "Repitiendo",
    hdr_airing: "Configuración de emisión",
    hdr_watchlist: "Configuración de lista",
    hdr_season: "Configuración de temporada",
    hdr_profile: "Configuración de perfil",
    hdr_manga: "Configuración de manga",
    hdr_status_tabs: "Pestañas de estado",
    hdr_filters: "Filtros",
    lbl_max_items: "Máx. elementos",
    lbl_sort_by: "Ordenar por",
    lbl_show_countdown: "Mostrar cuenta regresiva",
    lbl_countdown_format: "Formato de cuenta regresiva",
    lbl_show_badges: "Mostrar insignias de estado",
    lbl_show_duration: "Mostrar duración del episodio",
    lbl_show_genres: "Mostrar géneros",
    lbl_show_average_score: "Mostrar puntaje promedio",
    lbl_show_format_badge: "Mostrar insignia de formato (TV/Película)",
    lbl_layout: "Diseño",
    lbl_show_next_airing: "Mostrar cuenta regresiva del próximo episodio",
    lbl_max_items_limit: "Máx. elementos (modo límite)",
    lbl_overflow_mode: "Comportamiento de desbordamiento",
    lbl_scroll_height: "Altura de desplazamiento (px)",
    lbl_show_progress: "Mostrar progreso",
    lbl_show_progress_bar: "Mostrar barra de progreso",
    lbl_show_status_tabs: "Mostrar pestañas de estado",
    lbl_visible_statuses: "Estados visibles",
    lbl_genre_filter: "Filtro de género (separado por comas)",
    lbl_format_filter: "Filtro de formato (separado por comas)",
    placeholder_genre: "ej. Action, Romance",
    placeholder_format: "ej. TV, MOVIE, OVA",
    lbl_show_avatar: "Mostrar avatar",
    lbl_show_username: "Mostrar nombre de usuario",
    lbl_show_anime_stats: "Mostrar estadísticas de anime",
    lbl_show_manga_stats: "Mostrar estadísticas de manga",
    lbl_show_genre_chart: "Mostrar gráfico de géneros",
    lbl_chart_type: "Tipo de gráfico de géneros",
    lbl_show_favourites: "Mostrar favoritos",
    lbl_accent_color: "Color de acento",
    lbl_secondary_color: "Color secundario",
    lbl_card_background: "Fondo de tarjeta",
    lbl_card_opacity: "Opacidad de tarjeta",
    lbl_border_color: "Color de borde",
    lbl_border_width: "Ancho de borde (px)",
    lbl_border_radius: "Radio de borde (px)",
  },
  fr: {
    tab_general: "Général",
    tab_colors: "Couleurs",
    view_airing: "En cours",
    view_watchlist: "Liste de suivi",
    view_season: "Saison",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Vue",
    lbl_title: "Titre (optionnel)",
    lbl_entry_id: "ID d'entrée config (optionnel, multi-compte)",
    lbl_card_padding: "Espacement de carte",
    lbl_link_target: "Action au clic",
    lbl_show_cover: "Afficher les images de couverture",
    lbl_cover_size: "Taille de couverture",
    lbl_cover_quality: "Qualité de couverture",
    lbl_score_position: "Position du score",
    lbl_score_source: "Source du score",
    lbl_visible_items: "Éléments visibles (défiler pour plus)",
    lbl_scroll_snap: "Accrocher le défilement aux éléments",
    lbl_scroll_fade: "Fondu au bord du défilement",
    lbl_show_search: "Afficher la barre de recherche",
    lbl_show_tooltips: "Afficher les infobulles au survol",
    opt_small: "Petit",
    opt_medium: "Moyen",
    opt_large: "Grand",
    opt_relative: "Relatif (5h 30m)",
    opt_absolute: "Absolu (10 avr, 14:00)",
    opt_both: "Les deux",
    opt_anilist: "Ouvrir AniList",
    opt_none_link: "Aucun lien",
    opt_time: "Temps",
    opt_title: "Titre",
    opt_score: "Score",
    opt_compact: "Compact",
    opt_normal: "Normal",
    opt_relaxed: "Détendu",
    opt_bar: "Diagramme en barres",
    opt_donut: "Diagramme circulaire",
    opt_tags: "Tags",
    opt_scroll: "Barre de défilement",
    opt_limit: "Limiter les éléments",
    opt_grid: "Grille (Couvertures)",
    opt_list: "Liste (Lignes)",
    opt_auto: "Auto (intelligent)",
    opt_user: "Mon score",
    opt_average: "Score moyen",
    opt_top_right: "Haut droite",
    opt_top_left: "Haut gauche",
    opt_bottom_right: "Bas droite",
    opt_bottom_left: "Bas gauche",
    opt_inline: "En ligne",
    opt_none_pos: "Masqué",
    opt_small_quality: "Petit (rapide)",
    opt_medium_quality: "Moyen",
    opt_large_quality: "Grand / HD",
    status_current: "En cours",
    status_planning: "Planifié",
    status_completed: "Terminé",
    status_paused: "En pause",
    status_dropped: "Abandonné",
    status_repeating: "En reprise",
    hdr_airing: "Paramètres de diffusion",
    hdr_watchlist: "Paramètres de liste de suivi",
    hdr_season: "Paramètres de saison",
    hdr_profile: "Paramètres de profil",
    hdr_manga: "Paramètres de manga",
    hdr_status_tabs: "Onglets de statut",
    hdr_filters: "Filtres",
    lbl_max_items: "Éléments max.",
    lbl_sort_by: "Trier par",
    lbl_show_countdown: "Afficher le compte à rebours",
    lbl_countdown_format: "Format du compte à rebours",
    lbl_show_badges: "Afficher les badges de statut",
    lbl_show_duration: "Afficher la durée de l'épisode",
    lbl_show_genres: "Afficher les genres",
    lbl_show_average_score: "Afficher le score moyen",
    lbl_show_format_badge: "Afficher le badge de format (TV/Film)",
    lbl_layout: "Disposition",
    lbl_show_next_airing: "Afficher le compte à rebours du prochain épisode",
    lbl_max_items_limit: "Éléments max. (mode limite)",
    lbl_overflow_mode: "Comportement de débordement",
    lbl_scroll_height: "Hauteur de défilement (px)",
    lbl_show_progress: "Afficher la progression",
    lbl_show_progress_bar: "Afficher la barre de progression",
    lbl_show_status_tabs: "Afficher les onglets de statut",
    lbl_visible_statuses: "Statuts visibles",
    lbl_genre_filter: "Filtre de genre (séparé par des virgules)",
    lbl_format_filter: "Filtre de format (séparé par des virgules)",
    placeholder_genre: "ex. Action, Romance",
    placeholder_format: "ex. TV, MOVIE, OVA",
    lbl_show_avatar: "Afficher l'avatar",
    lbl_show_username: "Afficher le nom d'utilisateur",
    lbl_show_anime_stats: "Afficher les statistiques anime",
    lbl_show_manga_stats: "Afficher les statistiques manga",
    lbl_show_genre_chart: "Afficher le graphique des genres",
    lbl_chart_type: "Type de graphique des genres",
    lbl_show_favourites: "Afficher les favoris",
    lbl_accent_color: "Couleur d'accent",
    lbl_secondary_color: "Couleur secondaire",
    lbl_card_background: "Arrière-plan de carte",
    lbl_card_opacity: "Opacité de carte",
    lbl_border_color: "Couleur de bordure",
    lbl_border_width: "Épaisseur de bordure (px)",
    lbl_border_radius: "Rayon de bordure (px)",
  },
  it: {
    tab_general: "Generale",
    tab_colors: "Colori",
    view_airing: "In onda",
    view_watchlist: "Lista di visione",
    view_season: "Stagione",
    view_profile: "Profilo",
    view_manga: "Manga",
    lbl_view: "Vista",
    lbl_title: "Titolo (opzionale)",
    lbl_entry_id: "ID voce config (opzionale, multi-account)",
    lbl_card_padding: "Spaziatura scheda",
    lbl_link_target: "Azione clic",
    lbl_show_cover: "Mostra immagini di copertina",
    lbl_cover_size: "Dimensione copertina",
    lbl_cover_quality: "Qualità copertina",
    lbl_score_position: "Posizione punteggio",
    lbl_score_source: "Fonte punteggio",
    lbl_visible_items: "Elementi visibili (scorri per altri)",
    lbl_scroll_snap: "Agganciare lo scorrimento agli elementi",
    lbl_scroll_fade: "Dissolvenza al bordo dello scroll",
    lbl_show_search: "Mostra barra di ricerca",
    lbl_show_tooltips: "Mostra tooltip al passaggio del mouse",
    opt_small: "Piccolo",
    opt_medium: "Medio",
    opt_large: "Grande",
    opt_relative: "Relativo (5h 30m)",
    opt_absolute: "Assoluto (10 apr, 14:00)",
    opt_both: "Entrambi",
    opt_anilist: "Apri AniList",
    opt_none_link: "Nessun link",
    opt_time: "Tempo",
    opt_title: "Titolo",
    opt_score: "Punteggio",
    opt_compact: "Compatto",
    opt_normal: "Normale",
    opt_relaxed: "Rilassato",
    opt_bar: "Grafico a barre",
    opt_donut: "Grafico a ciambella",
    opt_tags: "Tag",
    opt_scroll: "Barra di scorrimento",
    opt_limit: "Limita elementi",
    opt_grid: "Griglia (Copertine)",
    opt_list: "Lista (Righe)",
    opt_auto: "Auto (smart)",
    opt_user: "Il mio punteggio",
    opt_average: "Punteggio medio",
    opt_top_right: "In alto a destra",
    opt_top_left: "In alto a sinistra",
    opt_bottom_right: "In basso a destra",
    opt_bottom_left: "In basso a sinistra",
    opt_inline: "Inline",
    opt_none_pos: "Nascosto",
    opt_small_quality: "Piccolo (veloce)",
    opt_medium_quality: "Medio",
    opt_large_quality: "Grande / HD",
    status_current: "In corso",
    status_planning: "Pianificato",
    status_completed: "Completato",
    status_paused: "In pausa",
    status_dropped: "Abbandonato",
    status_repeating: "In ripetizione",
    hdr_airing: "Impostazioni trasmissione",
    hdr_watchlist: "Impostazioni lista di visione",
    hdr_season: "Impostazioni stagione",
    hdr_profile: "Impostazioni profilo",
    hdr_manga: "Impostazioni manga",
    hdr_status_tabs: "Schede stato",
    hdr_filters: "Filtri",
    lbl_max_items: "Elementi max.",
    lbl_sort_by: "Ordina per",
    lbl_show_countdown: "Mostra conto alla rovescia",
    lbl_countdown_format: "Formato conto alla rovescia",
    lbl_show_badges: "Mostra badge di stato",
    lbl_show_duration: "Mostra durata episodio",
    lbl_show_genres: "Mostra generi",
    lbl_show_average_score: "Mostra punteggio medio",
    lbl_show_format_badge: "Mostra badge formato (TV/Film)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Mostra conto alla rovescia prossimo episodio",
    lbl_max_items_limit: "Elementi max. (modalità limite)",
    lbl_overflow_mode: "Comportamento overflow",
    lbl_scroll_height: "Altezza scorrimento (px)",
    lbl_show_progress: "Mostra progresso",
    lbl_show_progress_bar: "Mostra barra di progresso",
    lbl_show_status_tabs: "Mostra schede stato",
    lbl_visible_statuses: "Stati visibili",
    lbl_genre_filter: "Filtro genere (separato da virgole)",
    lbl_format_filter: "Filtro formato (separato da virgole)",
    placeholder_genre: "es. Action, Romance",
    placeholder_format: "es. TV, MOVIE, OVA",
    lbl_show_avatar: "Mostra avatar",
    lbl_show_username: "Mostra nome utente",
    lbl_show_anime_stats: "Mostra statistiche anime",
    lbl_show_manga_stats: "Mostra statistiche manga",
    lbl_show_genre_chart: "Mostra grafico generi",
    lbl_chart_type: "Tipo grafico generi",
    lbl_show_favourites: "Mostra preferiti",
    lbl_accent_color: "Colore d'accento",
    lbl_secondary_color: "Colore secondario",
    lbl_card_background: "Sfondo scheda",
    lbl_card_opacity: "Opacità scheda",
    lbl_border_color: "Colore bordo",
    lbl_border_width: "Larghezza bordo (px)",
    lbl_border_radius: "Raggio bordo (px)",
  },
  pt: {
    tab_general: "Geral",
    tab_colors: "Cores",
    view_airing: "Em exibição",
    view_watchlist: "Lista de acompanhamento",
    view_season: "Temporada",
    view_profile: "Perfil",
    view_manga: "Manga",
    lbl_view: "Visualização",
    lbl_title: "Título (opcional)",
    lbl_entry_id: "ID de entrada config (opcional, multi-conta)",
    lbl_card_padding: "Espaçamento do cartão",
    lbl_link_target: "Ação ao clicar",
    lbl_show_cover: "Mostrar imagens de capa",
    lbl_cover_size: "Tamanho da capa",
    lbl_cover_quality: "Qualidade da capa",
    lbl_score_position: "Posição da pontuação",
    lbl_score_source: "Fonte da pontuação",
    lbl_visible_items: "Itens visíveis (role para mais)",
    lbl_scroll_snap: "Encaixar rolagem nos itens",
    lbl_scroll_fade: "Desvanecimento na borda da rolagem",
    lbl_show_search: "Mostrar barra de pesquisa",
    lbl_show_tooltips: "Mostrar dicas ao passar o mouse",
    opt_small: "Pequeno",
    opt_medium: "Médio",
    opt_large: "Grande",
    opt_relative: "Relativo (5h 30m)",
    opt_absolute: "Absoluto (10 abr, 14:00)",
    opt_both: "Ambos",
    opt_anilist: "Abrir AniList",
    opt_none_link: "Sem link",
    opt_time: "Tempo",
    opt_title: "Título",
    opt_score: "Pontuação",
    opt_compact: "Compacto",
    opt_normal: "Normal",
    opt_relaxed: "Relaxado",
    opt_bar: "Gráfico de barras",
    opt_donut: "Gráfico de rosca",
    opt_tags: "Tags",
    opt_scroll: "Barra de rolagem",
    opt_limit: "Limitar itens",
    opt_grid: "Grade (Capas)",
    opt_list: "Lista (Linhas)",
    opt_auto: "Auto (inteligente)",
    opt_user: "Minha pontuação",
    opt_average: "Pontuação média",
    opt_top_right: "Superior direito",
    opt_top_left: "Superior esquerdo",
    opt_bottom_right: "Inferior direito",
    opt_bottom_left: "Inferior esquerdo",
    opt_inline: "Inline",
    opt_none_pos: "Oculto",
    opt_small_quality: "Pequeno (rápido)",
    opt_medium_quality: "Médio",
    opt_large_quality: "Grande / HD",
    status_current: "Atual",
    status_planning: "Planejado",
    status_completed: "Concluído",
    status_paused: "Pausado",
    status_dropped: "Abandonado",
    status_repeating: "Repetindo",
    hdr_airing: "Configurações de exibição",
    hdr_watchlist: "Configurações da lista",
    hdr_season: "Configurações de temporada",
    hdr_profile: "Configurações de perfil",
    hdr_manga: "Configurações de manga",
    hdr_status_tabs: "Abas de status",
    hdr_filters: "Filtros",
    lbl_max_items: "Itens máx.",
    lbl_sort_by: "Ordenar por",
    lbl_show_countdown: "Mostrar contagem regressiva",
    lbl_countdown_format: "Formato da contagem regressiva",
    lbl_show_badges: "Mostrar emblemas de status",
    lbl_show_duration: "Mostrar duração do episódio",
    lbl_show_genres: "Mostrar gêneros",
    lbl_show_average_score: "Mostrar pontuação média",
    lbl_show_format_badge: "Mostrar emblema de formato (TV/Filme)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Mostrar contagem regressiva do próximo episódio",
    lbl_max_items_limit: "Itens máx. (modo limite)",
    lbl_overflow_mode: "Comportamento de overflow",
    lbl_scroll_height: "Altura de rolagem (px)",
    lbl_show_progress: "Mostrar progresso",
    lbl_show_progress_bar: "Mostrar barra de progresso",
    lbl_show_status_tabs: "Mostrar abas de status",
    lbl_visible_statuses: "Status visíveis",
    lbl_genre_filter: "Filtro de gênero (separado por vírgulas)",
    lbl_format_filter: "Filtro de formato (separado por vírgulas)",
    placeholder_genre: "ex. Action, Romance",
    placeholder_format: "ex. TV, MOVIE, OVA",
    lbl_show_avatar: "Mostrar avatar",
    lbl_show_username: "Mostrar nome de usuário",
    lbl_show_anime_stats: "Mostrar estatísticas de anime",
    lbl_show_manga_stats: "Mostrar estatísticas de manga",
    lbl_show_genre_chart: "Mostrar gráfico de gêneros",
    lbl_chart_type: "Tipo de gráfico de gêneros",
    lbl_show_favourites: "Mostrar favoritos",
    lbl_accent_color: "Cor de destaque",
    lbl_secondary_color: "Cor secundária",
    lbl_card_background: "Fundo do cartão",
    lbl_card_opacity: "Opacidade do cartão",
    lbl_border_color: "Cor da borda",
    lbl_border_width: "Largura da borda (px)",
    lbl_border_radius: "Raio da borda (px)",
  },
  nl: {
    tab_general: "Algemeen",
    tab_colors: "Kleuren",
    view_airing: "Uitzending",
    view_watchlist: "Volglijst",
    view_season: "Seizoen",
    view_profile: "Profiel",
    view_manga: "Manga",
    lbl_view: "Weergave",
    lbl_title: "Titel (optioneel)",
    lbl_entry_id: "Config Entry ID (optioneel, multi-account)",
    lbl_card_padding: "Kaartafstand",
    lbl_link_target: "Klikactie",
    lbl_show_cover: "Omslagafbeeldingen tonen",
    lbl_cover_size: "Omslaggrootte",
    lbl_cover_quality: "Omslagkwaliteit",
    lbl_score_position: "Scorepositie",
    lbl_score_source: "Scorebron",
    lbl_visible_items: "Zichtbare items (scroll voor meer)",
    lbl_scroll_snap: "Scroll naar items uitlijnen",
    lbl_scroll_fade: "Vervagen bij scrollrand",
    lbl_show_search: "Zoekbalk tonen",
    lbl_show_tooltips: "Tooltips tonen bij hover",
    opt_small: "Klein",
    opt_medium: "Middel",
    opt_large: "Groot",
    opt_relative: "Relatief (5u 30m)",
    opt_absolute: "Absoluut (10 apr, 14:00)",
    opt_both: "Beide",
    opt_anilist: "AniList openen",
    opt_none_link: "Geen link",
    opt_time: "Tijd",
    opt_title: "Titel",
    opt_score: "Score",
    opt_compact: "Compact",
    opt_normal: "Normaal",
    opt_relaxed: "Ruim",
    opt_bar: "Staafdiagram",
    opt_donut: "Ringdiagram",
    opt_tags: "Tags",
    opt_scroll: "Scrollbalk",
    opt_limit: "Items beperken",
    opt_grid: "Raster (Omslagen)",
    opt_list: "Lijst (Rijen)",
    opt_auto: "Auto (slim)",
    opt_user: "Mijn score",
    opt_average: "Gemiddelde score",
    opt_top_right: "Rechtsboven",
    opt_top_left: "Linksboven",
    opt_bottom_right: "Rechtsonder",
    opt_bottom_left: "Linksonder",
    opt_inline: "Inline",
    opt_none_pos: "Verborgen",
    opt_small_quality: "Klein (snel)",
    opt_medium_quality: "Middel",
    opt_large_quality: "Groot / HD",
    status_current: "Huidig",
    status_planning: "Gepland",
    status_completed: "Voltooid",
    status_paused: "Gepauzeerd",
    status_dropped: "Gestopt",
    status_repeating: "Herhalend",
    hdr_airing: "Uitzending-instellingen",
    hdr_watchlist: "Volglijst-instellingen",
    hdr_season: "Seizoen-instellingen",
    hdr_profile: "Profiel-instellingen",
    hdr_manga: "Manga-instellingen",
    hdr_status_tabs: "Statustabbladen",
    hdr_filters: "Filters",
    lbl_max_items: "Max. items",
    lbl_sort_by: "Sorteren op",
    lbl_show_countdown: "Aftelling tonen",
    lbl_countdown_format: "Aftelformaat",
    lbl_show_badges: "Statusbadges tonen",
    lbl_show_duration: "Afleveringsduur tonen",
    lbl_show_genres: "Genres tonen",
    lbl_show_average_score: "Gemiddelde score tonen",
    lbl_show_format_badge: "Formaatbadge tonen (TV/Film)",
    lbl_layout: "Lay-out",
    lbl_show_next_airing: "Aftelling volgende aflevering tonen",
    lbl_max_items_limit: "Max. items (limietmodus)",
    lbl_overflow_mode: "Overloopgedrag",
    lbl_scroll_height: "Scrollhoogte (px)",
    lbl_show_progress: "Voortgang tonen",
    lbl_show_progress_bar: "Voortgangsbalk tonen",
    lbl_show_status_tabs: "Statustabbladen tonen",
    lbl_visible_statuses: "Zichtbare statussen",
    lbl_genre_filter: "Genrefilter (kommagescheiden)",
    lbl_format_filter: "Formaatfilter (kommagescheiden)",
    placeholder_genre: "bijv. Action, Romance",
    placeholder_format: "bijv. TV, MOVIE, OVA",
    lbl_show_avatar: "Avatar tonen",
    lbl_show_username: "Gebruikersnaam tonen",
    lbl_show_anime_stats: "Anime-statistieken tonen",
    lbl_show_manga_stats: "Manga-statistieken tonen",
    lbl_show_genre_chart: "Genregrafiek tonen",
    lbl_chart_type: "Type genregrafiek",
    lbl_show_favourites: "Favorieten tonen",
    lbl_accent_color: "Accentkleur",
    lbl_secondary_color: "Secundaire kleur",
    lbl_card_background: "Kaartachtergrond",
    lbl_card_opacity: "Kaartdekking",
    lbl_border_color: "Randkleur",
    lbl_border_width: "Randbreedte (px)",
    lbl_border_radius: "Randradius (px)",
  },
  pl: {
    tab_general: "Ogólne",
    tab_colors: "Kolory",
    view_airing: "Emitowane",
    view_watchlist: "Lista obserwowanych",
    view_season: "Sezon",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Widok",
    lbl_title: "Tytuł (opcjonalnie)",
    lbl_entry_id: "ID wpisu konfiguracji (opcjonalnie, multi-konto)",
    lbl_card_padding: "Odstępy karty",
    lbl_link_target: "Akcja kliknięcia",
    lbl_show_cover: "Pokaż obrazy okładek",
    lbl_cover_size: "Rozmiar okładki",
    lbl_cover_quality: "Jakość okładki",
    lbl_score_position: "Pozycja oceny",
    lbl_score_source: "Źródło oceny",
    lbl_visible_items: "Widoczne elementy (przewiń aby zobaczyć więcej)",
    lbl_scroll_snap: "Przyciąganie przewijania do elementów",
    lbl_scroll_fade: "Zanikanie na krawędzi przewijania",
    lbl_show_search: "Pokaż pasek wyszukiwania",
    lbl_show_tooltips: "Pokaż podpowiedzi po najechaniu",
    opt_small: "Mały",
    opt_medium: "Średni",
    opt_large: "Duży",
    opt_relative: "Względny (5h 30m)",
    opt_absolute: "Bezwzględny (10 kwi, 14:00)",
    opt_both: "Oba",
    opt_anilist: "Otwórz AniList",
    opt_none_link: "Brak linku",
    opt_time: "Czas",
    opt_title: "Tytuł",
    opt_score: "Ocena",
    opt_compact: "Kompaktowy",
    opt_normal: "Normalny",
    opt_relaxed: "Luźny",
    opt_bar: "Wykres słupkowy",
    opt_donut: "Wykres pierścieniowy",
    opt_tags: "Tagi",
    opt_scroll: "Pasek przewijania",
    opt_limit: "Ogranicz elementy",
    opt_grid: "Siatka (Okładki)",
    opt_list: "Lista (Wiersze)",
    opt_auto: "Auto (inteligentny)",
    opt_user: "Moja ocena",
    opt_average: "Średnia ocena",
    opt_top_right: "Prawy górny",
    opt_top_left: "Lewy górny",
    opt_bottom_right: "Prawy dolny",
    opt_bottom_left: "Lewy dolny",
    opt_inline: "W linii",
    opt_none_pos: "Ukryty",
    opt_small_quality: "Mały (szybki)",
    opt_medium_quality: "Średni",
    opt_large_quality: "Duży / HD",
    status_current: "Bieżący",
    status_planning: "Planowany",
    status_completed: "Ukończony",
    status_paused: "Wstrzymany",
    status_dropped: "Porzucony",
    status_repeating: "Powtarzany",
    hdr_airing: "Ustawienia emisji",
    hdr_watchlist: "Ustawienia listy obserwowanych",
    hdr_season: "Ustawienia sezonu",
    hdr_profile: "Ustawienia profilu",
    hdr_manga: "Ustawienia mangi",
    hdr_status_tabs: "Karty statusu",
    hdr_filters: "Filtry",
    lbl_max_items: "Maks. elementów",
    lbl_sort_by: "Sortuj wg",
    lbl_show_countdown: "Pokaż odliczanie",
    lbl_countdown_format: "Format odliczania",
    lbl_show_badges: "Pokaż odznaki statusu",
    lbl_show_duration: "Pokaż czas trwania odcinka",
    lbl_show_genres: "Pokaż gatunki",
    lbl_show_average_score: "Pokaż średnią ocenę",
    lbl_show_format_badge: "Pokaż odznakę formatu (TV/Film)",
    lbl_layout: "Układ",
    lbl_show_next_airing: "Pokaż odliczanie do następnego odcinka",
    lbl_max_items_limit: "Maks. elementów (tryb limitu)",
    lbl_overflow_mode: "Zachowanie przy przepełnieniu",
    lbl_scroll_height: "Wysokość przewijania (px)",
    lbl_show_progress: "Pokaż postęp",
    lbl_show_progress_bar: "Pokaż pasek postępu",
    lbl_show_status_tabs: "Pokaż karty statusu",
    lbl_visible_statuses: "Widoczne statusy",
    lbl_genre_filter: "Filtr gatunków (oddzielone przecinkami)",
    lbl_format_filter: "Filtr formatów (oddzielone przecinkami)",
    placeholder_genre: "np. Action, Romance",
    placeholder_format: "np. TV, MOVIE, OVA",
    lbl_show_avatar: "Pokaż avatar",
    lbl_show_username: "Pokaż nazwę użytkownika",
    lbl_show_anime_stats: "Pokaż statystyki anime",
    lbl_show_manga_stats: "Pokaż statystyki mangi",
    lbl_show_genre_chart: "Pokaż wykres gatunków",
    lbl_chart_type: "Typ wykresu gatunków",
    lbl_show_favourites: "Pokaż ulubione",
    lbl_accent_color: "Kolor akcentu",
    lbl_secondary_color: "Kolor drugorzędny",
    lbl_card_background: "Tło karty",
    lbl_card_opacity: "Przezroczystość karty",
    lbl_border_color: "Kolor obramowania",
    lbl_border_width: "Szerokość obramowania (px)",
    lbl_border_radius: "Promień obramowania (px)",
  },
  sv: {
    tab_general: "Allmänt",
    tab_colors: "Färger",
    view_airing: "Sänds",
    view_watchlist: "Bevakningslista",
    view_season: "Säsong",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Vy",
    lbl_title: "Titel (valfri)",
    lbl_entry_id: "Config Entry ID (valfri, multi-konto)",
    lbl_card_padding: "Kortavstånd",
    lbl_link_target: "Klickåtgärd",
    lbl_show_cover: "Visa omslagsbilder",
    lbl_cover_size: "Omslagsstorlek",
    lbl_cover_quality: "Omslagskvalitet",
    lbl_score_position: "Betygsposition",
    lbl_score_source: "Betygskälla",
    lbl_visible_items: "Synliga objekt (scrolla för fler)",
    lbl_scroll_snap: "Fäst scrollning till objekt",
    lbl_scroll_fade: "Tona ut vid scrollkant",
    lbl_show_search: "Visa sökfält",
    lbl_show_tooltips: "Visa verktygstips vid hovring",
    opt_small: "Liten",
    opt_medium: "Medel",
    opt_large: "Stor",
    opt_relative: "Relativ (5t 30m)",
    opt_absolute: "Absolut (10 apr, 14:00)",
    opt_both: "Båda",
    opt_anilist: "Öppna AniList",
    opt_none_link: "Ingen länk",
    opt_time: "Tid",
    opt_title: "Titel",
    opt_score: "Betyg",
    opt_compact: "Kompakt",
    opt_normal: "Normal",
    opt_relaxed: "Avslappnad",
    opt_bar: "Stapeldiagram",
    opt_donut: "Munkdiagram",
    opt_tags: "Taggar",
    opt_scroll: "Rullningslist",
    opt_limit: "Begränsa objekt",
    opt_grid: "Rutnät (Omslag)",
    opt_list: "Lista (Rader)",
    opt_auto: "Auto (smart)",
    opt_user: "Mitt betyg",
    opt_average: "Medelbetyg",
    opt_top_right: "Uppe höger",
    opt_top_left: "Uppe vänster",
    opt_bottom_right: "Nere höger",
    opt_bottom_left: "Nere vänster",
    opt_inline: "Inline",
    opt_none_pos: "Dold",
    opt_small_quality: "Liten (snabb)",
    opt_medium_quality: "Medel",
    opt_large_quality: "Stor / HD",
    status_current: "Pågående",
    status_planning: "Planerad",
    status_completed: "Avslutad",
    status_paused: "Pausad",
    status_dropped: "Avbruten",
    status_repeating: "Upprepar",
    hdr_airing: "Sändningsinställningar",
    hdr_watchlist: "Bevakningslisteinställningar",
    hdr_season: "Säsongsinställningar",
    hdr_profile: "Profilinställningar",
    hdr_manga: "Mangainställningar",
    hdr_status_tabs: "Statusflikar",
    hdr_filters: "Filter",
    lbl_max_items: "Max objekt",
    lbl_sort_by: "Sortera efter",
    lbl_show_countdown: "Visa nedräkning",
    lbl_countdown_format: "Nedräkningsformat",
    lbl_show_badges: "Visa statusmärken",
    lbl_show_duration: "Visa avsnittslängd",
    lbl_show_genres: "Visa genrer",
    lbl_show_average_score: "Visa medelbetyg",
    lbl_show_format_badge: "Visa formatmärke (TV/Film)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Visa nedräkning för nästa avsnitt",
    lbl_max_items_limit: "Max objekt (begränsningsläge)",
    lbl_overflow_mode: "Överflödesbeteende",
    lbl_scroll_height: "Rullningshöjd (px)",
    lbl_show_progress: "Visa framsteg",
    lbl_show_progress_bar: "Visa framstegsrad",
    lbl_show_status_tabs: "Visa statusflikar",
    lbl_visible_statuses: "Synliga statusar",
    lbl_genre_filter: "Genrefilter (kommaseparerat)",
    lbl_format_filter: "Formatfilter (kommaseparerat)",
    placeholder_genre: "t.ex. Action, Romance",
    placeholder_format: "t.ex. TV, MOVIE, OVA",
    lbl_show_avatar: "Visa avatar",
    lbl_show_username: "Visa användarnamn",
    lbl_show_anime_stats: "Visa anime-statistik",
    lbl_show_manga_stats: "Visa manga-statistik",
    lbl_show_genre_chart: "Visa genrediagram",
    lbl_chart_type: "Typ av genrediagram",
    lbl_show_favourites: "Visa favoriter",
    lbl_accent_color: "Accentfärg",
    lbl_secondary_color: "Sekundärfärg",
    lbl_card_background: "Kortbakgrund",
    lbl_card_opacity: "Kortopacitet",
    lbl_border_color: "Kantfärg",
    lbl_border_width: "Kantbredd (px)",
    lbl_border_radius: "Kantradie (px)",
  },
  da: {
    tab_general: "Generelt",
    tab_colors: "Farver",
    view_airing: "Sendes",
    view_watchlist: "Følgeliste",
    view_season: "Sæson",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Visning",
    lbl_title: "Titel (valgfri)",
    lbl_entry_id: "Config Entry ID (valgfri, multi-konto)",
    lbl_card_padding: "Kortafstand",
    lbl_link_target: "Klikhandling",
    lbl_show_cover: "Vis forsidebilleder",
    lbl_cover_size: "Forsidestørrelse",
    lbl_cover_quality: "Forsidekvalitet",
    lbl_score_position: "Score-position",
    lbl_score_source: "Score-kilde",
    lbl_visible_items: "Synlige elementer (rul for flere)",
    lbl_scroll_snap: "Fastgør rulning til elementer",
    lbl_scroll_fade: "Udtoning ved rullekant",
    lbl_show_search: "Vis søgefelt",
    lbl_show_tooltips: "Vis tooltips ved hover",
    opt_small: "Lille",
    opt_medium: "Medium",
    opt_large: "Stor",
    opt_relative: "Relativ (5t 30m)",
    opt_absolute: "Absolut (10. apr, 14:00)",
    opt_both: "Begge",
    opt_anilist: "Åbn AniList",
    opt_none_link: "Intet link",
    opt_time: "Tid",
    opt_title: "Titel",
    opt_score: "Score",
    opt_compact: "Kompakt",
    opt_normal: "Normal",
    opt_relaxed: "Afslappet",
    opt_bar: "Søjlediagram",
    opt_donut: "Cirkeldiagram",
    opt_tags: "Tags",
    opt_scroll: "Rullebjælke",
    opt_limit: "Begræns elementer",
    opt_grid: "Gitter (Forsider)",
    opt_list: "Liste (Rækker)",
    opt_auto: "Auto (smart)",
    opt_user: "Min score",
    opt_average: "Gennemsnitsscore",
    opt_top_right: "Øverst til højre",
    opt_top_left: "Øverst til venstre",
    opt_bottom_right: "Nederst til højre",
    opt_bottom_left: "Nederst til venstre",
    opt_inline: "Inline",
    opt_none_pos: "Skjult",
    opt_small_quality: "Lille (hurtig)",
    opt_medium_quality: "Medium",
    opt_large_quality: "Stor / HD",
    status_current: "Igangværende",
    status_planning: "Planlagt",
    status_completed: "Afsluttet",
    status_paused: "Pauset",
    status_dropped: "Droppet",
    status_repeating: "Gentager",
    hdr_airing: "Sendeindstillinger",
    hdr_watchlist: "Følgelisteindstillinger",
    hdr_season: "Sæsonindstillinger",
    hdr_profile: "Profilindstillinger",
    hdr_manga: "Mangaindstillinger",
    hdr_status_tabs: "Statusfaner",
    hdr_filters: "Filtre",
    lbl_max_items: "Maks. elementer",
    lbl_sort_by: "Sorter efter",
    lbl_show_countdown: "Vis nedtælling",
    lbl_countdown_format: "Nedtællingsformat",
    lbl_show_badges: "Vis statusmærker",
    lbl_show_duration: "Vis episodens varighed",
    lbl_show_genres: "Vis genrer",
    lbl_show_average_score: "Vis gennemsnitsscore",
    lbl_show_format_badge: "Vis formatmærke (TV/Film)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Vis nedtælling for næste episode",
    lbl_max_items_limit: "Maks. elementer (begrænsningsmode)",
    lbl_overflow_mode: "Overløbsadfærd",
    lbl_scroll_height: "Rullehøjde (px)",
    lbl_show_progress: "Vis fremskridt",
    lbl_show_progress_bar: "Vis fremskridtsbjælke",
    lbl_show_status_tabs: "Vis statusfaner",
    lbl_visible_statuses: "Synlige statusser",
    lbl_genre_filter: "Genrefilter (kommasepareret)",
    lbl_format_filter: "Formatfilter (kommasepareret)",
    placeholder_genre: "f.eks. Action, Romance",
    placeholder_format: "f.eks. TV, MOVIE, OVA",
    lbl_show_avatar: "Vis avatar",
    lbl_show_username: "Vis brugernavn",
    lbl_show_anime_stats: "Vis anime-statistikker",
    lbl_show_manga_stats: "Vis manga-statistikker",
    lbl_show_genre_chart: "Vis genrediagram",
    lbl_chart_type: "Type genrediagram",
    lbl_show_favourites: "Vis favoritter",
    lbl_accent_color: "Accentfarve",
    lbl_secondary_color: "Sekundær farve",
    lbl_card_background: "Kortbaggrund",
    lbl_card_opacity: "Kortgennemsigtighed",
    lbl_border_color: "Kantfarve",
    lbl_border_width: "Kantbredde (px)",
    lbl_border_radius: "Kantradius (px)",
  },
  nb: {
    tab_general: "Generelt",
    tab_colors: "Farger",
    view_airing: "Sendes",
    view_watchlist: "Følgeliste",
    view_season: "Sesong",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Visning",
    lbl_title: "Tittel (valgfri)",
    lbl_entry_id: "Config Entry ID (valgfri, multi-konto)",
    lbl_card_padding: "Kortavstand",
    lbl_link_target: "Klikkhandling",
    lbl_show_cover: "Vis forsidebilder",
    lbl_cover_size: "Forsidestørrelse",
    lbl_cover_quality: "Forsidekvalitet",
    lbl_score_position: "Poengposisjon",
    lbl_score_source: "Poengkilde",
    lbl_visible_items: "Synlige elementer (rull for flere)",
    lbl_scroll_snap: "Fest rulling til elementer",
    lbl_scroll_fade: "Uttoning ved rullekant",
    lbl_show_search: "Vis søkefelt",
    lbl_show_tooltips: "Vis verktøytips ved hover",
    opt_small: "Liten",
    opt_medium: "Middels",
    opt_large: "Stor",
    opt_relative: "Relativ (5t 30m)",
    opt_absolute: "Absolutt (10. apr, 14:00)",
    opt_both: "Begge",
    opt_anilist: "Åpne AniList",
    opt_none_link: "Ingen lenke",
    opt_time: "Tid",
    opt_title: "Tittel",
    opt_score: "Poeng",
    opt_compact: "Kompakt",
    opt_normal: "Normal",
    opt_relaxed: "Avslappet",
    opt_bar: "Stolpediagram",
    opt_donut: "Smultringdiagram",
    opt_tags: "Tagger",
    opt_scroll: "Rullefelt",
    opt_limit: "Begrens elementer",
    opt_grid: "Rutenett (Forsider)",
    opt_list: "Liste (Rader)",
    opt_auto: "Auto (smart)",
    opt_user: "Min poengsum",
    opt_average: "Gjennomsnittspoeng",
    opt_top_right: "Øverst til høyre",
    opt_top_left: "Øverst til venstre",
    opt_bottom_right: "Nederst til høyre",
    opt_bottom_left: "Nederst til venstre",
    opt_inline: "Inline",
    opt_none_pos: "Skjult",
    opt_small_quality: "Liten (rask)",
    opt_medium_quality: "Middels",
    opt_large_quality: "Stor / HD",
    status_current: "Pågående",
    status_planning: "Planlagt",
    status_completed: "Fullført",
    status_paused: "Pauset",
    status_dropped: "Droppet",
    status_repeating: "Gjentar",
    hdr_airing: "Sendeinnstillinger",
    hdr_watchlist: "Følgelisteinnstillinger",
    hdr_season: "Sesonginnstillinger",
    hdr_profile: "Profilinnstillinger",
    hdr_manga: "Mangainnstillinger",
    hdr_status_tabs: "Statusfaner",
    hdr_filters: "Filtre",
    lbl_max_items: "Maks. elementer",
    lbl_sort_by: "Sorter etter",
    lbl_show_countdown: "Vis nedtelling",
    lbl_countdown_format: "Nedtellingsformat",
    lbl_show_badges: "Vis statusmerker",
    lbl_show_duration: "Vis episodens varighet",
    lbl_show_genres: "Vis sjangre",
    lbl_show_average_score: "Vis gjennomsnittspoeng",
    lbl_show_format_badge: "Vis formatmerke (TV/Film)",
    lbl_layout: "Layout",
    lbl_show_next_airing: "Vis nedtelling for neste episode",
    lbl_max_items_limit: "Maks. elementer (grensemodus)",
    lbl_overflow_mode: "Overflytadferd",
    lbl_scroll_height: "Rullehøyde (px)",
    lbl_show_progress: "Vis fremgang",
    lbl_show_progress_bar: "Vis fremdriftslinje",
    lbl_show_status_tabs: "Vis statusfaner",
    lbl_visible_statuses: "Synlige statuser",
    lbl_genre_filter: "Sjangerfilter (kommaseparert)",
    lbl_format_filter: "Formatfilter (kommaseparert)",
    placeholder_genre: "f.eks. Action, Romance",
    placeholder_format: "f.eks. TV, MOVIE, OVA",
    lbl_show_avatar: "Vis avatar",
    lbl_show_username: "Vis brukernavn",
    lbl_show_anime_stats: "Vis anime-statistikk",
    lbl_show_manga_stats: "Vis manga-statistikk",
    lbl_show_genre_chart: "Vis sjangerdiagram",
    lbl_chart_type: "Type sjangerdiagram",
    lbl_show_favourites: "Vis favoritter",
    lbl_accent_color: "Aksentfarge",
    lbl_secondary_color: "Sekundærfarge",
    lbl_card_background: "Kortbakgrunn",
    lbl_card_opacity: "Kortopasitet",
    lbl_border_color: "Kantfarge",
    lbl_border_width: "Kantbredde (px)",
    lbl_border_radius: "Kantradius (px)",
  },
  fi: {
    tab_general: "Yleiset",
    tab_colors: "Värit",
    view_airing: "Esitetään",
    view_watchlist: "Seurantalista",
    view_season: "Kausi",
    view_profile: "Profiili",
    view_manga: "Manga",
    lbl_view: "Näkymä",
    lbl_title: "Otsikko (valinnainen)",
    lbl_entry_id: "Konfig. merkintä-ID (valinnainen, monitili)",
    lbl_card_padding: "Kortin välit",
    lbl_link_target: "Klikkaus-toiminto",
    lbl_show_cover: "Näytä kansikuvat",
    lbl_cover_size: "Kansikoko",
    lbl_cover_quality: "Kansilaatu",
    lbl_score_position: "Pistemäärän sijainti",
    lbl_score_source: "Pistemäärän lähde",
    lbl_visible_items: "Näkyvät kohteet (vieritä lisää)",
    lbl_scroll_snap: "Kohdista vieritys kohteisiin",
    lbl_scroll_fade: "Häivytys vieritysreunassa",
    lbl_show_search: "Näytä hakupalkki",
    lbl_show_tooltips: "Näytä työkaluvihjeet kohdistettaessa",
    opt_small: "Pieni",
    opt_medium: "Keskikokoinen",
    opt_large: "Suuri",
    opt_relative: "Suhteellinen (5t 30m)",
    opt_absolute: "Absoluuttinen (10. huhti, 14:00)",
    opt_both: "Molemmat",
    opt_anilist: "Avaa AniList",
    opt_none_link: "Ei linkkiä",
    opt_time: "Aika",
    opt_title: "Otsikko",
    opt_score: "Pisteet",
    opt_compact: "Tiivis",
    opt_normal: "Normaali",
    opt_relaxed: "Väljä",
    opt_bar: "Pylväsdiagrammi",
    opt_donut: "Rengasdiagrammi",
    opt_tags: "Tunnisteet",
    opt_scroll: "Vierityspalkki",
    opt_limit: "Rajoita kohteita",
    opt_grid: "Ruudukko (Kannet)",
    opt_list: "Lista (Rivit)",
    opt_auto: "Auto (älykäs)",
    opt_user: "Oma pisteet",
    opt_average: "Keskiarvo",
    opt_top_right: "Yläoikea",
    opt_top_left: "Ylävasen",
    opt_bottom_right: "Alaoikea",
    opt_bottom_left: "Alavasen",
    opt_inline: "Rivillä",
    opt_none_pos: "Piilotettu",
    opt_small_quality: "Pieni (nopea)",
    opt_medium_quality: "Keskikokoinen",
    opt_large_quality: "Suuri / HD",
    status_current: "Käynnissä",
    status_planning: "Suunniteltu",
    status_completed: "Valmis",
    status_paused: "Tauolla",
    status_dropped: "Keskeytetty",
    status_repeating: "Toistuu",
    hdr_airing: "Lähetysasetukset",
    hdr_watchlist: "Seurantalista-asetukset",
    hdr_season: "Kausiasetukset",
    hdr_profile: "Profiiliasetukset",
    hdr_manga: "Manga-asetukset",
    hdr_status_tabs: "Tilavälilehdet",
    hdr_filters: "Suodattimet",
    lbl_max_items: "Enint. kohteita",
    lbl_sort_by: "Lajittele",
    lbl_show_countdown: "Näytä lähtölaskenta",
    lbl_countdown_format: "Lähtölaskennan muoto",
    lbl_show_badges: "Näytä tilamerkit",
    lbl_show_duration: "Näytä jakson kesto",
    lbl_show_genres: "Näytä genret",
    lbl_show_average_score: "Näytä keskiarvo",
    lbl_show_format_badge: "Näytä formaattimerkki (TV/Elokuva)",
    lbl_layout: "Asettelu",
    lbl_show_next_airing: "Näytä seuraavan jakson lähtölaskenta",
    lbl_max_items_limit: "Enint. kohteita (rajoitustila)",
    lbl_overflow_mode: "Ylivuotokäyttäytyminen",
    lbl_scroll_height: "Vierityksen korkeus (px)",
    lbl_show_progress: "Näytä edistyminen",
    lbl_show_progress_bar: "Näytä edistymispalkki",
    lbl_show_status_tabs: "Näytä tilavälilehdet",
    lbl_visible_statuses: "Näkyvät tilat",
    lbl_genre_filter: "Genresuodatin (pilkuilla erotettu)",
    lbl_format_filter: "Formaattisuodatin (pilkuilla erotettu)",
    placeholder_genre: "esim. Action, Romance",
    placeholder_format: "esim. TV, MOVIE, OVA",
    lbl_show_avatar: "Näytä avatar",
    lbl_show_username: "Näytä käyttäjänimi",
    lbl_show_anime_stats: "Näytä anime-tilastot",
    lbl_show_manga_stats: "Näytä manga-tilastot",
    lbl_show_genre_chart: "Näytä genrekaavio",
    lbl_chart_type: "Genrekaavion tyyppi",
    lbl_show_favourites: "Näytä suosikit",
    lbl_accent_color: "Korostusväri",
    lbl_secondary_color: "Toissijainen väri",
    lbl_card_background: "Kortin tausta",
    lbl_card_opacity: "Kortin läpinäkyvyys",
    lbl_border_color: "Reunaväri",
    lbl_border_width: "Reunan leveys (px)",
    lbl_border_radius: "Reunan pyöristys (px)",
  },
  cs: {
    tab_general: "Obecné",
    tab_colors: "Barvy",
    view_airing: "Vysílání",
    view_watchlist: "Seznam sledovaných",
    view_season: "Sezóna",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Zobrazení",
    lbl_title: "Název (volitelný)",
    lbl_entry_id: "ID konfigurace (volitelné, multi-účet)",
    lbl_card_padding: "Odsazení karty",
    lbl_link_target: "Akce kliknutí",
    lbl_show_cover: "Zobrazit obrázky obálek",
    lbl_cover_size: "Velikost obálky",
    lbl_cover_quality: "Kvalita obálky",
    lbl_score_position: "Pozice skóre",
    lbl_score_source: "Zdroj skóre",
    lbl_visible_items: "Viditelné položky (posuňte pro více)",
    lbl_scroll_snap: "Přichytit posouvání k položkám",
    lbl_scroll_fade: "Ztlumení na okraji posouvání",
    lbl_show_search: "Zobrazit vyhledávací lištu",
    lbl_show_tooltips: "Zobrazit nápovědy při najetí myší",
    opt_small: "Malý",
    opt_medium: "Střední",
    opt_large: "Velký",
    opt_relative: "Relativní (5h 30m)",
    opt_absolute: "Absolutní (10. dub, 14:00)",
    opt_both: "Obojí",
    opt_anilist: "Otevřít AniList",
    opt_none_link: "Žádný odkaz",
    opt_time: "Čas",
    opt_title: "Název",
    opt_score: "Skóre",
    opt_compact: "Kompaktní",
    opt_normal: "Normální",
    opt_relaxed: "Volný",
    opt_bar: "Sloupcový graf",
    opt_donut: "Prstencový graf",
    opt_tags: "Štítky",
    opt_scroll: "Posuvník",
    opt_limit: "Omezit položky",
    opt_grid: "Mřížka (Obálky)",
    opt_list: "Seznam (Řádky)",
    opt_auto: "Auto (chytrý)",
    opt_user: "Mé skóre",
    opt_average: "Průměrné skóre",
    opt_top_right: "Vpravo nahoře",
    opt_top_left: "Vlevo nahoře",
    opt_bottom_right: "Vpravo dole",
    opt_bottom_left: "Vlevo dole",
    opt_inline: "V řádku",
    opt_none_pos: "Skrytý",
    opt_small_quality: "Malý (rychlý)",
    opt_medium_quality: "Střední",
    opt_large_quality: "Velký / HD",
    status_current: "Aktuální",
    status_planning: "Plánovaný",
    status_completed: "Dokončený",
    status_paused: "Pozastavený",
    status_dropped: "Opuštěný",
    status_repeating: "Opakující",
    hdr_airing: "Nastavení vysílání",
    hdr_watchlist: "Nastavení seznamu sledovaných",
    hdr_season: "Nastavení sezóny",
    hdr_profile: "Nastavení profilu",
    hdr_manga: "Nastavení mangy",
    hdr_status_tabs: "Karty stavu",
    hdr_filters: "Filtry",
    lbl_max_items: "Max. položek",
    lbl_sort_by: "Řadit podle",
    lbl_show_countdown: "Zobrazit odpočet",
    lbl_countdown_format: "Formát odpočtu",
    lbl_show_badges: "Zobrazit stavové odznaky",
    lbl_show_duration: "Zobrazit délku epizody",
    lbl_show_genres: "Zobrazit žánry",
    lbl_show_average_score: "Zobrazit průměrné skóre",
    lbl_show_format_badge: "Zobrazit odznak formátu (TV/Film)",
    lbl_layout: "Rozložení",
    lbl_show_next_airing: "Zobrazit odpočet další epizody",
    lbl_max_items_limit: "Max. položek (limitovaný režim)",
    lbl_overflow_mode: "Chování přetečení",
    lbl_scroll_height: "Výška posouvání (px)",
    lbl_show_progress: "Zobrazit postup",
    lbl_show_progress_bar: "Zobrazit ukazatel postupu",
    lbl_show_status_tabs: "Zobrazit karty stavu",
    lbl_visible_statuses: "Viditelné stavy",
    lbl_genre_filter: "Filtr žánrů (oddělené čárkami)",
    lbl_format_filter: "Filtr formátů (oddělené čárkami)",
    placeholder_genre: "např. Action, Romance",
    placeholder_format: "např. TV, MOVIE, OVA",
    lbl_show_avatar: "Zobrazit avatar",
    lbl_show_username: "Zobrazit uživatelské jméno",
    lbl_show_anime_stats: "Zobrazit anime statistiky",
    lbl_show_manga_stats: "Zobrazit manga statistiky",
    lbl_show_genre_chart: "Zobrazit graf žánrů",
    lbl_chart_type: "Typ grafu žánrů",
    lbl_show_favourites: "Zobrazit oblíbené",
    lbl_accent_color: "Barva zvýraznění",
    lbl_secondary_color: "Sekundární barva",
    lbl_card_background: "Pozadí karty",
    lbl_card_opacity: "Průhlednost karty",
    lbl_border_color: "Barva okraje",
    lbl_border_width: "Šířka okraje (px)",
    lbl_border_radius: "Poloměr okraje (px)",
  },
  ro: {
    tab_general: "General",
    tab_colors: "Culori",
    view_airing: "În difuzare",
    view_watchlist: "Lista de vizionare",
    view_season: "Sezon",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Vizualizare",
    lbl_title: "Titlu (opțional)",
    lbl_entry_id: "ID intrare config (opțional, multi-cont)",
    lbl_card_padding: "Spațiere card",
    lbl_link_target: "Acțiune clic",
    lbl_show_cover: "Afișare imagini de copertă",
    lbl_cover_size: "Dimensiune copertă",
    lbl_cover_quality: "Calitate copertă",
    lbl_score_position: "Poziția scorului",
    lbl_score_source: "Sursa scorului",
    lbl_visible_items: "Elemente vizibile (derulați pentru mai multe)",
    lbl_scroll_snap: "Fixare derulare la elemente",
    lbl_scroll_fade: "Estompare la marginea derulării",
    lbl_show_search: "Afișare bară de căutare",
    lbl_show_tooltips: "Afișare indicii la trecerea cursorului",
    opt_small: "Mic",
    opt_medium: "Mediu",
    opt_large: "Mare",
    opt_relative: "Relativ (5h 30m)",
    opt_absolute: "Absolut (10 apr, 14:00)",
    opt_both: "Ambele",
    opt_anilist: "Deschide AniList",
    opt_none_link: "Fără link",
    opt_time: "Timp",
    opt_title: "Titlu",
    opt_score: "Scor",
    opt_compact: "Compact",
    opt_normal: "Normal",
    opt_relaxed: "Relaxat",
    opt_bar: "Grafic cu bare",
    opt_donut: "Grafic inel",
    opt_tags: "Etichete",
    opt_scroll: "Bară de derulare",
    opt_limit: "Limitare elemente",
    opt_grid: "Grilă (Coperți)",
    opt_list: "Listă (Rânduri)",
    opt_auto: "Auto (inteligent)",
    opt_user: "Scorul meu",
    opt_average: "Scor mediu",
    opt_top_right: "Sus dreapta",
    opt_top_left: "Sus stânga",
    opt_bottom_right: "Jos dreapta",
    opt_bottom_left: "Jos stânga",
    opt_inline: "Inline",
    opt_none_pos: "Ascuns",
    opt_small_quality: "Mic (rapid)",
    opt_medium_quality: "Mediu",
    opt_large_quality: "Mare / HD",
    status_current: "Curent",
    status_planning: "Planificat",
    status_completed: "Finalizat",
    status_paused: "În pauză",
    status_dropped: "Abandonat",
    status_repeating: "Repetat",
    hdr_airing: "Setări difuzare",
    hdr_watchlist: "Setări listă de vizionare",
    hdr_season: "Setări sezon",
    hdr_profile: "Setări profil",
    hdr_manga: "Setări manga",
    hdr_status_tabs: "File de stare",
    hdr_filters: "Filtre",
    lbl_max_items: "Max. elemente",
    lbl_sort_by: "Sortare după",
    lbl_show_countdown: "Afișare numărătoare inversă",
    lbl_countdown_format: "Format numărătoare inversă",
    lbl_show_badges: "Afișare insigne de stare",
    lbl_show_duration: "Afișare durată episod",
    lbl_show_genres: "Afișare genuri",
    lbl_show_average_score: "Afișare scor mediu",
    lbl_show_format_badge: "Afișare insignă format (TV/Film)",
    lbl_layout: "Aspect",
    lbl_show_next_airing: "Afișare numărătoare inversă episod următor",
    lbl_max_items_limit: "Max. elemente (mod limită)",
    lbl_overflow_mode: "Comportament la depășire",
    lbl_scroll_height: "Înălțime derulare (px)",
    lbl_show_progress: "Afișare progres",
    lbl_show_progress_bar: "Afișare bară de progres",
    lbl_show_status_tabs: "Afișare file de stare",
    lbl_visible_statuses: "Stări vizibile",
    lbl_genre_filter: "Filtru gen (separate prin virgulă)",
    lbl_format_filter: "Filtru format (separate prin virgulă)",
    placeholder_genre: "ex. Action, Romance",
    placeholder_format: "ex. TV, MOVIE, OVA",
    lbl_show_avatar: "Afișare avatar",
    lbl_show_username: "Afișare nume utilizator",
    lbl_show_anime_stats: "Afișare statistici anime",
    lbl_show_manga_stats: "Afișare statistici manga",
    lbl_show_genre_chart: "Afișare grafic genuri",
    lbl_chart_type: "Tip grafic genuri",
    lbl_show_favourites: "Afișare favorite",
    lbl_accent_color: "Culoare accent",
    lbl_secondary_color: "Culoare secundară",
    lbl_card_background: "Fundal card",
    lbl_card_opacity: "Opacitate card",
    lbl_border_color: "Culoare bordură",
    lbl_border_width: "Lățime bordură (px)",
    lbl_border_radius: "Rază bordură (px)",
  },
  hu: {
    tab_general: "Általános",
    tab_colors: "Színek",
    view_airing: "Sugárzás",
    view_watchlist: "Figyelőlista",
    view_season: "Évad",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Nézet",
    lbl_title: "Cím (opcionális)",
    lbl_entry_id: "Konfig. bejegyzés ID (opcionális, többfiókos)",
    lbl_card_padding: "Kártyatávolság",
    lbl_link_target: "Kattintási művelet",
    lbl_show_cover: "Borítóképek megjelenítése",
    lbl_cover_size: "Borítóméret",
    lbl_cover_quality: "Borítóminőség",
    lbl_score_position: "Pontszám pozíció",
    lbl_score_source: "Pontszám forrás",
    lbl_visible_items: "Látható elemek (görgessen többért)",
    lbl_scroll_snap: "Görgetés rögzítése elemekhez",
    lbl_scroll_fade: "Halványítás a görgetés szélén",
    lbl_show_search: "Keresősáv megjelenítése",
    lbl_show_tooltips: "Eszköztippek megjelenítése rámutatáskor",
    opt_small: "Kicsi",
    opt_medium: "Közepes",
    opt_large: "Nagy",
    opt_relative: "Relatív (5ó 30p)",
    opt_absolute: "Abszolút (ápr. 10, 14:00)",
    opt_both: "Mindkettő",
    opt_anilist: "AniList megnyitása",
    opt_none_link: "Nincs hivatkozás",
    opt_time: "Idő",
    opt_title: "Cím",
    opt_score: "Pontszám",
    opt_compact: "Kompakt",
    opt_normal: "Normál",
    opt_relaxed: "Laza",
    opt_bar: "Oszlopdiagram",
    opt_donut: "Fánkdiagram",
    opt_tags: "Címkék",
    opt_scroll: "Görgetősáv",
    opt_limit: "Elemek korlátozása",
    opt_grid: "Rács (Borítók)",
    opt_list: "Lista (Sorok)",
    opt_auto: "Auto (okos)",
    opt_user: "Saját pontszám",
    opt_average: "Átlagos pontszám",
    opt_top_right: "Jobb felső",
    opt_top_left: "Bal felső",
    opt_bottom_right: "Jobb alsó",
    opt_bottom_left: "Bal alsó",
    opt_inline: "Soron belül",
    opt_none_pos: "Rejtett",
    opt_small_quality: "Kicsi (gyors)",
    opt_medium_quality: "Közepes",
    opt_large_quality: "Nagy / HD",
    status_current: "Jelenlegi",
    status_planning: "Tervezett",
    status_completed: "Befejezett",
    status_paused: "Szüneteltetve",
    status_dropped: "Elhagyott",
    status_repeating: "Ismétlés",
    hdr_airing: "Sugárzási beállítások",
    hdr_watchlist: "Figyelőlista beállítások",
    hdr_season: "Évadbeállítások",
    hdr_profile: "Profilbeállítások",
    hdr_manga: "Manga beállítások",
    hdr_status_tabs: "Állapotfülek",
    hdr_filters: "Szűrők",
    lbl_max_items: "Max. elem",
    lbl_sort_by: "Rendezés",
    lbl_show_countdown: "Visszaszámlálás megjelenítése",
    lbl_countdown_format: "Visszaszámlálás formátum",
    lbl_show_badges: "Állapotjelvények megjelenítése",
    lbl_show_duration: "Epizód időtartam megjelenítése",
    lbl_show_genres: "Műfajok megjelenítése",
    lbl_show_average_score: "Átlagos pontszám megjelenítése",
    lbl_show_format_badge: "Formátumjelvény megjelenítése (TV/Film)",
    lbl_layout: "Elrendezés",
    lbl_show_next_airing: "Következő epizód visszaszámlálás megjelenítése",
    lbl_max_items_limit: "Max. elem (korlát mód)",
    lbl_overflow_mode: "Túlcsordulási viselkedés",
    lbl_scroll_height: "Görgetési magasság (px)",
    lbl_show_progress: "Haladás megjelenítése",
    lbl_show_progress_bar: "Haladássáv megjelenítése",
    lbl_show_status_tabs: "Állapotfülek megjelenítése",
    lbl_visible_statuses: "Látható állapotok",
    lbl_genre_filter: "Műfaj szűrő (vesszővel elválasztva)",
    lbl_format_filter: "Formátum szűrő (vesszővel elválasztva)",
    placeholder_genre: "pl. Action, Romance",
    placeholder_format: "pl. TV, MOVIE, OVA",
    lbl_show_avatar: "Avatar megjelenítése",
    lbl_show_username: "Felhasználónév megjelenítése",
    lbl_show_anime_stats: "Anime statisztikák megjelenítése",
    lbl_show_manga_stats: "Manga statisztikák megjelenítése",
    lbl_show_genre_chart: "Műfaj diagram megjelenítése",
    lbl_chart_type: "Műfaj diagram típusa",
    lbl_show_favourites: "Kedvencek megjelenítése",
    lbl_accent_color: "Kiemelő szín",
    lbl_secondary_color: "Másodlagos szín",
    lbl_card_background: "Kártya háttér",
    lbl_card_opacity: "Kártya átlátszóság",
    lbl_border_color: "Szegélyszín",
    lbl_border_width: "Szegélyszélesség (px)",
    lbl_border_radius: "Szegélysugár (px)",
  },
  el: {
    tab_general: "Γενικά",
    tab_colors: "Χρώματα",
    view_airing: "Μετάδοση",
    view_watchlist: "Λίστα παρακολούθησης",
    view_season: "Σεζόν",
    view_profile: "Προφίλ",
    view_manga: "Manga",
    lbl_view: "Προβολή",
    lbl_title: "Τίτλος (προαιρετικά)",
    lbl_entry_id: "ID εγγραφής ρυθμίσεων (προαιρετικά, πολυ-λογαριασμός)",
    lbl_card_padding: "Αποστάσεις κάρτας",
    lbl_link_target: "Ενέργεια κλικ",
    lbl_show_cover: "Εμφάνιση εικόνων εξωφύλλου",
    lbl_cover_size: "Μέγεθος εξωφύλλου",
    lbl_cover_quality: "Ποιότητα εξωφύλλου",
    lbl_score_position: "Θέση βαθμολογίας",
    lbl_score_source: "Πηγή βαθμολογίας",
    lbl_visible_items: "Ορατά στοιχεία (κύλιση για περισσότερα)",
    lbl_scroll_snap: "Κούμπωμα κύλισης σε στοιχεία",
    lbl_scroll_fade: "Εξασθένιση στο άκρο κύλισης",
    lbl_show_search: "Εμφάνιση γραμμής αναζήτησης",
    lbl_show_tooltips: "Εμφάνιση συμβουλών κατά την αιώρηση",
    opt_small: "Μικρό",
    opt_medium: "Μεσαίο",
    opt_large: "Μεγάλο",
    opt_relative: "Σχετικό (5ω 30λ)",
    opt_absolute: "Απόλυτο (10 Απρ, 14:00)",
    opt_both: "Και τα δύο",
    opt_anilist: "Άνοιγμα AniList",
    opt_none_link: "Χωρίς σύνδεσμο",
    opt_time: "Χρόνος",
    opt_title: "Τίτλος",
    opt_score: "Βαθμολογία",
    opt_compact: "Συμπαγές",
    opt_normal: "Κανονικό",
    opt_relaxed: "Χαλαρό",
    opt_bar: "Ραβδόγραμμα",
    opt_donut: "Κυκλικό γράφημα",
    opt_tags: "Ετικέτες",
    opt_scroll: "Γραμμή κύλισης",
    opt_limit: "Περιορισμός στοιχείων",
    opt_grid: "Πλέγμα (Εξώφυλλα)",
    opt_list: "Λίστα (Γραμμές)",
    opt_auto: "Αυτόματο (έξυπνο)",
    opt_user: "Η βαθμολογία μου",
    opt_average: "Μέση βαθμολογία",
    opt_top_right: "Πάνω δεξιά",
    opt_top_left: "Πάνω αριστερά",
    opt_bottom_right: "Κάτω δεξιά",
    opt_bottom_left: "Κάτω αριστερά",
    opt_inline: "Ενσωματωμένο",
    opt_none_pos: "Κρυφό",
    opt_small_quality: "Μικρό (γρήγορο)",
    opt_medium_quality: "Μεσαίο",
    opt_large_quality: "Μεγάλο / HD",
    status_current: "Τρέχον",
    status_planning: "Προγραμματισμένο",
    status_completed: "Ολοκληρωμένο",
    status_paused: "Σε παύση",
    status_dropped: "Εγκαταλελειμμένο",
    status_repeating: "Επανάληψη",
    hdr_airing: "Ρυθμίσεις μετάδοσης",
    hdr_watchlist: "Ρυθμίσεις λίστας παρακολούθησης",
    hdr_season: "Ρυθμίσεις σεζόν",
    hdr_profile: "Ρυθμίσεις προφίλ",
    hdr_manga: "Ρυθμίσεις manga",
    hdr_status_tabs: "Καρτέλες κατάστασης",
    hdr_filters: "Φίλτρα",
    lbl_max_items: "Μέγ. στοιχεία",
    lbl_sort_by: "Ταξινόμηση κατά",
    lbl_show_countdown: "Εμφάνιση αντίστροφης μέτρησης",
    lbl_countdown_format: "Μορφή αντίστροφης μέτρησης",
    lbl_show_badges: "Εμφάνιση σημάτων κατάστασης",
    lbl_show_duration: "Εμφάνιση διάρκειας επεισοδίου",
    lbl_show_genres: "Εμφάνιση ειδών",
    lbl_show_average_score: "Εμφάνιση μέσης βαθμολογίας",
    lbl_show_format_badge: "Εμφάνιση σήματος μορφής (TV/Ταινία)",
    lbl_layout: "Διάταξη",
    lbl_show_next_airing: "Εμφάνιση αντίστρ. μέτρησης επόμενου επεισοδίου",
    lbl_max_items_limit: "Μέγ. στοιχεία (λειτουργία ορίου)",
    lbl_overflow_mode: "Συμπεριφορά υπερχείλισης",
    lbl_scroll_height: "Ύψος κύλισης (px)",
    lbl_show_progress: "Εμφάνιση προόδου",
    lbl_show_progress_bar: "Εμφάνιση μπάρας προόδου",
    lbl_show_status_tabs: "Εμφάνιση καρτελών κατάστασης",
    lbl_visible_statuses: "Ορατές καταστάσεις",
    lbl_genre_filter: "Φίλτρο ειδών (χωρισμένα με κόμμα)",
    lbl_format_filter: "Φίλτρο μορφής (χωρισμένα με κόμμα)",
    placeholder_genre: "π.χ. Action, Romance",
    placeholder_format: "π.χ. TV, MOVIE, OVA",
    lbl_show_avatar: "Εμφάνιση avatar",
    lbl_show_username: "Εμφάνιση ονόματος χρήστη",
    lbl_show_anime_stats: "Εμφάνιση στατιστικών anime",
    lbl_show_manga_stats: "Εμφάνιση στατιστικών manga",
    lbl_show_genre_chart: "Εμφάνιση γραφήματος ειδών",
    lbl_chart_type: "Τύπος γραφήματος ειδών",
    lbl_show_favourites: "Εμφάνιση αγαπημένων",
    lbl_accent_color: "Χρώμα τονισμού",
    lbl_secondary_color: "Δευτερεύον χρώμα",
    lbl_card_background: "Φόντο κάρτας",
    lbl_card_opacity: "Αδιαφάνεια κάρτας",
    lbl_border_color: "Χρώμα περιγράμματος",
    lbl_border_width: "Πλάτος περιγράμματος (px)",
    lbl_border_radius: "Ακτίνα περιγράμματος (px)",
  },
  tr: {
    tab_general: "Genel",
    tab_colors: "Renkler",
    view_airing: "Yayında",
    view_watchlist: "İzleme listesi",
    view_season: "Sezon",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Görünüm",
    lbl_title: "Başlık (isteğe bağlı)",
    lbl_entry_id: "Yapılandırma giriş ID (isteğe bağlı, çoklu hesap)",
    lbl_card_padding: "Kart aralığı",
    lbl_link_target: "Tıklama eylemi",
    lbl_show_cover: "Kapak resimlerini göster",
    lbl_cover_size: "Kapak boyutu",
    lbl_cover_quality: "Kapak kalitesi",
    lbl_score_position: "Puan konumu",
    lbl_score_source: "Puan kaynağı",
    lbl_visible_items: "Görünür öğeler (daha fazlası için kaydırın)",
    lbl_scroll_snap: "Kaydırmayı öğelere sabitle",
    lbl_scroll_fade: "Kaydırma kenarında soldur",
    lbl_show_search: "Arama çubuğunu göster",
    lbl_show_tooltips: "Üzerine gelince araç ipuçlarını göster",
    opt_small: "Küçük",
    opt_medium: "Orta",
    opt_large: "Büyük",
    opt_relative: "Göreceli (5sa 30dk)",
    opt_absolute: "Mutlak (10 Nis, 14:00)",
    opt_both: "Her ikisi",
    opt_anilist: "AniList'i aç",
    opt_none_link: "Bağlantı yok",
    opt_time: "Zaman",
    opt_title: "Başlık",
    opt_score: "Puan",
    opt_compact: "Kompakt",
    opt_normal: "Normal",
    opt_relaxed: "Rahat",
    opt_bar: "Çubuk grafik",
    opt_donut: "Halka grafik",
    opt_tags: "Etiketler",
    opt_scroll: "Kaydırma çubuğu",
    opt_limit: "Öğeleri sınırla",
    opt_grid: "Izgara (Kapaklar)",
    opt_list: "Liste (Satırlar)",
    opt_auto: "Otomatik (akıllı)",
    opt_user: "Benim puanım",
    opt_average: "Ortalama puan",
    opt_top_right: "Sağ üst",
    opt_top_left: "Sol üst",
    opt_bottom_right: "Sağ alt",
    opt_bottom_left: "Sol alt",
    opt_inline: "Satır içi",
    opt_none_pos: "Gizli",
    opt_small_quality: "Küçük (hızlı)",
    opt_medium_quality: "Orta",
    opt_large_quality: "Büyük / HD",
    status_current: "Mevcut",
    status_planning: "Planlanmış",
    status_completed: "Tamamlandı",
    status_paused: "Duraklatıldı",
    status_dropped: "Bırakıldı",
    status_repeating: "Tekrarlanıyor",
    hdr_airing: "Yayın ayarları",
    hdr_watchlist: "İzleme listesi ayarları",
    hdr_season: "Sezon ayarları",
    hdr_profile: "Profil ayarları",
    hdr_manga: "Manga ayarları",
    hdr_status_tabs: "Durum sekmeleri",
    hdr_filters: "Filtreler",
    lbl_max_items: "Maks. öğe",
    lbl_sort_by: "Sıralama",
    lbl_show_countdown: "Geri sayımı göster",
    lbl_countdown_format: "Geri sayım formatı",
    lbl_show_badges: "Durum rozetlerini göster",
    lbl_show_duration: "Bölüm süresini göster",
    lbl_show_genres: "Türleri göster",
    lbl_show_average_score: "Ortalama puanı göster",
    lbl_show_format_badge: "Format rozetini göster (TV/Film)",
    lbl_layout: "Düzen",
    lbl_show_next_airing: "Sonraki bölüm geri sayımını göster",
    lbl_max_items_limit: "Maks. öğe (sınır modu)",
    lbl_overflow_mode: "Taşma davranışı",
    lbl_scroll_height: "Kaydırma yüksekliği (px)",
    lbl_show_progress: "İlerlemeyi göster",
    lbl_show_progress_bar: "İlerleme çubuğunu göster",
    lbl_show_status_tabs: "Durum sekmelerini göster",
    lbl_visible_statuses: "Görünür durumlar",
    lbl_genre_filter: "Tür filtresi (virgülle ayrılmış)",
    lbl_format_filter: "Format filtresi (virgülle ayrılmış)",
    placeholder_genre: "ör. Action, Romance",
    placeholder_format: "ör. TV, MOVIE, OVA",
    lbl_show_avatar: "Avatarı göster",
    lbl_show_username: "Kullanıcı adını göster",
    lbl_show_anime_stats: "Anime istatistiklerini göster",
    lbl_show_manga_stats: "Manga istatistiklerini göster",
    lbl_show_genre_chart: "Tür grafiğini göster",
    lbl_chart_type: "Tür grafik tipi",
    lbl_show_favourites: "Favorileri göster",
    lbl_accent_color: "Vurgu rengi",
    lbl_secondary_color: "İkincil renk",
    lbl_card_background: "Kart arka planı",
    lbl_card_opacity: "Kart opaklığı",
    lbl_border_color: "Kenarlık rengi",
    lbl_border_width: "Kenarlık genişliği (px)",
    lbl_border_radius: "Kenarlık yarıçapı (px)",
  },
  uk: {
    tab_general: "Загальне",
    tab_colors: "Кольори",
    view_airing: "В ефірі",
    view_watchlist: "Список перегляду",
    view_season: "Сезон",
    view_profile: "Профіль",
    view_manga: "Манга",
    lbl_view: "Вигляд",
    lbl_title: "Назва (необов'язково)",
    lbl_entry_id: "ID запису конфігурації (необов'язково, мультиакаунт)",
    lbl_card_padding: "Відступи картки",
    lbl_link_target: "Дія при натисканні",
    lbl_show_cover: "Показувати зображення обкладинок",
    lbl_cover_size: "Розмір обкладинки",
    lbl_cover_quality: "Якість обкладинки",
    lbl_score_position: "Позиція оцінки",
    lbl_score_source: "Джерело оцінки",
    lbl_visible_items: "Видимі елементи (прокрутіть для більшого)",
    lbl_scroll_snap: "Прив'язка прокрутки до елементів",
    lbl_scroll_fade: "Згасання на краю прокрутки",
    lbl_show_search: "Показувати панель пошуку",
    lbl_show_tooltips: "Показувати підказки при наведенні",
    opt_small: "Малий",
    opt_medium: "Середній",
    opt_large: "Великий",
    opt_relative: "Відносний (5г 30хв)",
    opt_absolute: "Абсолютний (10 кві, 14:00)",
    opt_both: "Обидва",
    opt_anilist: "Відкрити AniList",
    opt_none_link: "Без посилання",
    opt_time: "Час",
    opt_title: "Назва",
    opt_score: "Оцінка",
    opt_compact: "Компактний",
    opt_normal: "Звичайний",
    opt_relaxed: "Вільний",
    opt_bar: "Стовпчаста діаграма",
    opt_donut: "Кільцева діаграма",
    opt_tags: "Теги",
    opt_scroll: "Смуга прокрутки",
    opt_limit: "Обмежити елементи",
    opt_grid: "Сітка (Обкладинки)",
    opt_list: "Список (Рядки)",
    opt_auto: "Авто (розумний)",
    opt_user: "Моя оцінка",
    opt_average: "Середня оцінка",
    opt_top_right: "Зверху справа",
    opt_top_left: "Зверху зліва",
    opt_bottom_right: "Знизу справа",
    opt_bottom_left: "Знизу зліва",
    opt_inline: "В рядку",
    opt_none_pos: "Прихований",
    opt_small_quality: "Малий (швидкий)",
    opt_medium_quality: "Середній",
    opt_large_quality: "Великий / HD",
    status_current: "Поточний",
    status_planning: "Заплановано",
    status_completed: "Завершено",
    status_paused: "На паузі",
    status_dropped: "Покинуто",
    status_repeating: "Повторення",
    hdr_airing: "Налаштування ефіру",
    hdr_watchlist: "Налаштування списку перегляду",
    hdr_season: "Налаштування сезону",
    hdr_profile: "Налаштування профілю",
    hdr_manga: "Налаштування манги",
    hdr_status_tabs: "Вкладки статусу",
    hdr_filters: "Фільтри",
    lbl_max_items: "Макс. елементів",
    lbl_sort_by: "Сортувати за",
    lbl_show_countdown: "Показувати зворотній відлік",
    lbl_countdown_format: "Формат зворотнього відліку",
    lbl_show_badges: "Показувати значки статусу",
    lbl_show_duration: "Показувати тривалість епізоду",
    lbl_show_genres: "Показувати жанри",
    lbl_show_average_score: "Показувати середню оцінку",
    lbl_show_format_badge: "Показувати значок формату (TV/Фільм)",
    lbl_layout: "Макет",
    lbl_show_next_airing: "Показувати відлік наступного епізоду",
    lbl_max_items_limit: "Макс. елементів (режим обмеження)",
    lbl_overflow_mode: "Поведінка при переповненні",
    lbl_scroll_height: "Висота прокрутки (px)",
    lbl_show_progress: "Показувати прогрес",
    lbl_show_progress_bar: "Показувати смугу прогресу",
    lbl_show_status_tabs: "Показувати вкладки статусу",
    lbl_visible_statuses: "Видимі статуси",
    lbl_genre_filter: "Фільтр жанрів (через кому)",
    lbl_format_filter: "Фільтр форматів (через кому)",
    placeholder_genre: "напр. Action, Romance",
    placeholder_format: "напр. TV, MOVIE, OVA",
    lbl_show_avatar: "Показувати аватар",
    lbl_show_username: "Показувати ім'я користувача",
    lbl_show_anime_stats: "Показувати статистику аніме",
    lbl_show_manga_stats: "Показувати статистику манги",
    lbl_show_genre_chart: "Показувати діаграму жанрів",
    lbl_chart_type: "Тип діаграми жанрів",
    lbl_show_favourites: "Показувати улюблені",
    lbl_accent_color: "Колір акценту",
    lbl_secondary_color: "Вторинний колір",
    lbl_card_background: "Фон картки",
    lbl_card_opacity: "Прозорість картки",
    lbl_border_color: "Колір рамки",
    lbl_border_width: "Ширина рамки (px)",
    lbl_border_radius: "Радіус рамки (px)",
  },
  ru: {
    tab_general: "Общее",
    tab_colors: "Цвета",
    view_airing: "В эфире",
    view_watchlist: "Список просмотра",
    view_season: "Сезон",
    view_profile: "Профиль",
    view_manga: "Манга",
    lbl_view: "Вид",
    lbl_title: "Заголовок (необязательно)",
    lbl_entry_id: "ID записи конфигурации (необязательно, мультиаккаунт)",
    lbl_card_padding: "Отступы карточки",
    lbl_link_target: "Действие при клике",
    lbl_show_cover: "Показывать обложки",
    lbl_cover_size: "Размер обложки",
    lbl_cover_quality: "Качество обложки",
    lbl_score_position: "Позиция оценки",
    lbl_score_source: "Источник оценки",
    lbl_visible_items: "Видимые элементы (прокрутите для большего)",
    lbl_scroll_snap: "Привязка прокрутки к элементам",
    lbl_scroll_fade: "Затухание на краю прокрутки",
    lbl_show_search: "Показывать панель поиска",
    lbl_show_tooltips: "Показывать подсказки при наведении",
    opt_small: "Маленький",
    opt_medium: "Средний",
    opt_large: "Большой",
    opt_relative: "Относительный (5ч 30м)",
    opt_absolute: "Абсолютный (10 апр, 14:00)",
    opt_both: "Оба",
    opt_anilist: "Открыть AniList",
    opt_none_link: "Без ссылки",
    opt_time: "Время",
    opt_title: "Заголовок",
    opt_score: "Оценка",
    opt_compact: "Компактный",
    opt_normal: "Обычный",
    opt_relaxed: "Свободный",
    opt_bar: "Столбчатая диаграмма",
    opt_donut: "Кольцевая диаграмма",
    opt_tags: "Теги",
    opt_scroll: "Полоса прокрутки",
    opt_limit: "Ограничить элементы",
    opt_grid: "Сетка (Обложки)",
    opt_list: "Список (Строки)",
    opt_auto: "Авто (умный)",
    opt_user: "Моя оценка",
    opt_average: "Средняя оценка",
    opt_top_right: "Сверху справа",
    opt_top_left: "Сверху слева",
    opt_bottom_right: "Снизу справа",
    opt_bottom_left: "Снизу слева",
    opt_inline: "В строке",
    opt_none_pos: "Скрытый",
    opt_small_quality: "Маленький (быстрый)",
    opt_medium_quality: "Средний",
    opt_large_quality: "Большой / HD",
    status_current: "Текущий",
    status_planning: "Запланировано",
    status_completed: "Завершено",
    status_paused: "На паузе",
    status_dropped: "Брошено",
    status_repeating: "Повтор",
    hdr_airing: "Настройки эфира",
    hdr_watchlist: "Настройки списка просмотра",
    hdr_season: "Настройки сезона",
    hdr_profile: "Настройки профиля",
    hdr_manga: "Настройки манги",
    hdr_status_tabs: "Вкладки статуса",
    hdr_filters: "Фильтры",
    lbl_max_items: "Макс. элементов",
    lbl_sort_by: "Сортировать по",
    lbl_show_countdown: "Показывать обратный отсчёт",
    lbl_countdown_format: "Формат обратного отсчёта",
    lbl_show_badges: "Показывать значки статуса",
    lbl_show_duration: "Показывать длительность эпизода",
    lbl_show_genres: "Показывать жанры",
    lbl_show_average_score: "Показывать среднюю оценку",
    lbl_show_format_badge: "Показывать значок формата (TV/Фильм)",
    lbl_layout: "Макет",
    lbl_show_next_airing: "Показывать отсчёт следующего эпизода",
    lbl_max_items_limit: "Макс. элементов (режим лимита)",
    lbl_overflow_mode: "Поведение при переполнении",
    lbl_scroll_height: "Высота прокрутки (px)",
    lbl_show_progress: "Показывать прогресс",
    lbl_show_progress_bar: "Показывать полосу прогресса",
    lbl_show_status_tabs: "Показывать вкладки статуса",
    lbl_visible_statuses: "Видимые статусы",
    lbl_genre_filter: "Фильтр жанров (через запятую)",
    lbl_format_filter: "Фильтр форматов (через запятую)",
    placeholder_genre: "напр. Action, Romance",
    placeholder_format: "напр. TV, MOVIE, OVA",
    lbl_show_avatar: "Показывать аватар",
    lbl_show_username: "Показывать имя пользователя",
    lbl_show_anime_stats: "Показывать статистику аниме",
    lbl_show_manga_stats: "Показывать статистику манги",
    lbl_show_genre_chart: "Показывать диаграмму жанров",
    lbl_chart_type: "Тип диаграммы жанров",
    lbl_show_favourites: "Показывать избранное",
    lbl_accent_color: "Цвет акцента",
    lbl_secondary_color: "Вторичный цвет",
    lbl_card_background: "Фон карточки",
    lbl_card_opacity: "Прозрачность карточки",
    lbl_border_color: "Цвет рамки",
    lbl_border_width: "Ширина рамки (px)",
    lbl_border_radius: "Радиус рамки (px)",
  },
  sk: {
    tab_general: "Všeobecné",
    tab_colors: "Farby",
    view_airing: "Vysielanie",
    view_watchlist: "Zoznam sledovaných",
    view_season: "Sezóna",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Zobrazenie",
    lbl_title: "Názov (voliteľný)",
    lbl_entry_id: "ID konfiguračného záznamu (voliteľné, multi-účet)",
    lbl_card_padding: "Odsadenie karty",
    lbl_link_target: "Akcia kliknutia",
    lbl_show_cover: "Zobraziť obrázky obálok",
    lbl_cover_size: "Veľkosť obálky",
    lbl_cover_quality: "Kvalita obálky",
    lbl_score_position: "Pozícia skóre",
    lbl_score_source: "Zdroj skóre",
    lbl_visible_items: "Viditeľné položky (posúvajte pre viac)",
    lbl_scroll_snap: "Prichytiť posúvanie k položkám",
    lbl_scroll_fade: "Stlmenie na okraji posúvania",
    lbl_show_search: "Zobraziť vyhľadávací lištu",
    lbl_show_tooltips: "Zobraziť nápovedy pri nabehnutí myšou",
    opt_small: "Malý",
    opt_medium: "Stredný",
    opt_large: "Veľký",
    opt_relative: "Relatívny (5h 30m)",
    opt_absolute: "Absolútny (10. apr, 14:00)",
    opt_both: "Oboje",
    opt_anilist: "Otvoriť AniList",
    opt_none_link: "Žiadny odkaz",
    opt_time: "Čas",
    opt_title: "Názov",
    opt_score: "Skóre",
    opt_compact: "Kompaktný",
    opt_normal: "Normálny",
    opt_relaxed: "Voľný",
    opt_bar: "Stĺpcový graf",
    opt_donut: "Prstencový graf",
    opt_tags: "Štítky",
    opt_scroll: "Posúvač",
    opt_limit: "Obmedziť položky",
    opt_grid: "Mriežka (Obálky)",
    opt_list: "Zoznam (Riadky)",
    opt_auto: "Auto (inteligentný)",
    opt_user: "Moje skóre",
    opt_average: "Priemerné skóre",
    opt_top_right: "Vpravo hore",
    opt_top_left: "Vľavo hore",
    opt_bottom_right: "Vpravo dole",
    opt_bottom_left: "Vľavo dole",
    opt_inline: "V riadku",
    opt_none_pos: "Skrytý",
    opt_small_quality: "Malý (rýchly)",
    opt_medium_quality: "Stredný",
    opt_large_quality: "Veľký / HD",
    status_current: "Aktuálny",
    status_planning: "Plánovaný",
    status_completed: "Dokončený",
    status_paused: "Pozastavený",
    status_dropped: "Opustený",
    status_repeating: "Opakujúci",
    hdr_airing: "Nastavenia vysielania",
    hdr_watchlist: "Nastavenia zoznamu sledovaných",
    hdr_season: "Nastavenia sezóny",
    hdr_profile: "Nastavenia profilu",
    hdr_manga: "Nastavenia mangy",
    hdr_status_tabs: "Karty stavu",
    hdr_filters: "Filtre",
    lbl_max_items: "Max. položiek",
    lbl_sort_by: "Radiť podľa",
    lbl_show_countdown: "Zobraziť odpočet",
    lbl_countdown_format: "Formát odpočtu",
    lbl_show_badges: "Zobraziť stavové odznaky",
    lbl_show_duration: "Zobraziť dĺžku epizódy",
    lbl_show_genres: "Zobraziť žánre",
    lbl_show_average_score: "Zobraziť priemerné skóre",
    lbl_show_format_badge: "Zobraziť odznak formátu (TV/Film)",
    lbl_layout: "Rozloženie",
    lbl_show_next_airing: "Zobraziť odpočet ďalšej epizódy",
    lbl_max_items_limit: "Max. položiek (limitovaný režim)",
    lbl_overflow_mode: "Správanie pri pretečení",
    lbl_scroll_height: "Výška posúvania (px)",
    lbl_show_progress: "Zobraziť postup",
    lbl_show_progress_bar: "Zobraziť ukazovateľ postupu",
    lbl_show_status_tabs: "Zobraziť karty stavu",
    lbl_visible_statuses: "Viditeľné stavy",
    lbl_genre_filter: "Filter žánrov (oddelené čiarkami)",
    lbl_format_filter: "Filter formátov (oddelené čiarkami)",
    placeholder_genre: "napr. Action, Romance",
    placeholder_format: "napr. TV, MOVIE, OVA",
    lbl_show_avatar: "Zobraziť avatar",
    lbl_show_username: "Zobraziť používateľské meno",
    lbl_show_anime_stats: "Zobraziť anime štatistiky",
    lbl_show_manga_stats: "Zobraziť manga štatistiky",
    lbl_show_genre_chart: "Zobraziť graf žánrov",
    lbl_chart_type: "Typ grafu žánrov",
    lbl_show_favourites: "Zobraziť obľúbené",
    lbl_accent_color: "Farba zvýraznenia",
    lbl_secondary_color: "Sekundárna farba",
    lbl_card_background: "Pozadie karty",
    lbl_card_opacity: "Priehľadnosť karty",
    lbl_border_color: "Farba okraja",
    lbl_border_width: "Šírka okraja (px)",
    lbl_border_radius: "Polomer okraja (px)",
  },
  hr: {
    tab_general: "Općenito",
    tab_colors: "Boje",
    view_airing: "Emitiranje",
    view_watchlist: "Lista za gledanje",
    view_season: "Sezona",
    view_profile: "Profil",
    view_manga: "Manga",
    lbl_view: "Prikaz",
    lbl_title: "Naslov (neobavezno)",
    lbl_entry_id: "ID konfiguracijske stavke (neobavezno, više računa)",
    lbl_card_padding: "Razmak kartice",
    lbl_link_target: "Radnja klika",
    lbl_show_cover: "Prikaži slike naslovnice",
    lbl_cover_size: "Veličina naslovnice",
    lbl_cover_quality: "Kvaliteta naslovnice",
    lbl_score_position: "Pozicija ocjene",
    lbl_score_source: "Izvor ocjene",
    lbl_visible_items: "Vidljive stavke (pomičite za više)",
    lbl_scroll_snap: "Pričvrsti pomicanje na stavke",
    lbl_scroll_fade: "Blijeđenje na rubu pomicanja",
    lbl_show_search: "Prikaži traku za pretraživanje",
    lbl_show_tooltips: "Prikaži savjete pri prelasku",
    opt_small: "Mali",
    opt_medium: "Srednji",
    opt_large: "Veliki",
    opt_relative: "Relativno (5h 30m)",
    opt_absolute: "Apsolutno (10. tra, 14:00)",
    opt_both: "Oboje",
    opt_anilist: "Otvori AniList",
    opt_none_link: "Bez veze",
    opt_time: "Vrijeme",
    opt_title: "Naslov",
    opt_score: "Ocjena",
    opt_compact: "Kompaktno",
    opt_normal: "Normalno",
    opt_relaxed: "Opušteno",
    opt_bar: "Stupčasti grafikon",
    opt_donut: "Prstenasti grafikon",
    opt_tags: "Oznake",
    opt_scroll: "Traka za pomicanje",
    opt_limit: "Ograniči stavke",
    opt_grid: "Mreža (Naslovnice)",
    opt_list: "Popis (Redovi)",
    opt_auto: "Automatski (pametno)",
    opt_user: "Moja ocjena",
    opt_average: "Prosječna ocjena",
    opt_top_right: "Gore desno",
    opt_top_left: "Gore lijevo",
    opt_bottom_right: "Dolje desno",
    opt_bottom_left: "Dolje lijevo",
    opt_inline: "U redu",
    opt_none_pos: "Skriveno",
    opt_small_quality: "Mali (brzo)",
    opt_medium_quality: "Srednji",
    opt_large_quality: "Veliki / HD",
    status_current: "Trenutno",
    status_planning: "Planirano",
    status_completed: "Završeno",
    status_paused: "Pauzirano",
    status_dropped: "Napušteno",
    status_repeating: "Ponavljanje",
    hdr_airing: "Postavke emitiranja",
    hdr_watchlist: "Postavke liste za gledanje",
    hdr_season: "Postavke sezone",
    hdr_profile: "Postavke profila",
    hdr_manga: "Postavke mange",
    hdr_status_tabs: "Kartice statusa",
    hdr_filters: "Filteri",
    lbl_max_items: "Maks. stavki",
    lbl_sort_by: "Sortiraj po",
    lbl_show_countdown: "Prikaži odbrojavanje",
    lbl_countdown_format: "Format odbrojavanja",
    lbl_show_badges: "Prikaži značke statusa",
    lbl_show_duration: "Prikaži trajanje epizode",
    lbl_show_genres: "Prikaži žanrove",
    lbl_show_average_score: "Prikaži prosječnu ocjenu",
    lbl_show_format_badge: "Prikaži značku formata (TV/Film)",
    lbl_layout: "Raspored",
    lbl_show_next_airing: "Prikaži odbrojavanje sljedeće epizode",
    lbl_max_items_limit: "Maks. stavki (ograničeni način)",
    lbl_overflow_mode: "Ponašanje pri preljevu",
    lbl_scroll_height: "Visina pomicanja (px)",
    lbl_show_progress: "Prikaži napredak",
    lbl_show_progress_bar: "Prikaži traku napretka",
    lbl_show_status_tabs: "Prikaži kartice statusa",
    lbl_visible_statuses: "Vidljivi statusi",
    lbl_genre_filter: "Filter žanrova (odvojeni zarezom)",
    lbl_format_filter: "Filter formata (odvojeni zarezom)",
    placeholder_genre: "npr. Action, Romance",
    placeholder_format: "npr. TV, MOVIE, OVA",
    lbl_show_avatar: "Prikaži avatar",
    lbl_show_username: "Prikaži korisničko ime",
    lbl_show_anime_stats: "Prikaži anime statistike",
    lbl_show_manga_stats: "Prikaži manga statistike",
    lbl_show_genre_chart: "Prikaži grafikon žanrova",
    lbl_chart_type: "Vrsta grafikona žanrova",
    lbl_show_favourites: "Prikaži favorite",
    lbl_accent_color: "Boja naglaska",
    lbl_secondary_color: "Sekundarna boja",
    lbl_card_background: "Pozadina kartice",
    lbl_card_opacity: "Prozirnost kartice",
    lbl_border_color: "Boja obruba",
    lbl_border_width: "Širina obruba (px)",
    lbl_border_radius: "Polumjer obruba (px)",
  },
  bg: {
    tab_general: "Общи",
    tab_colors: "Цветове",
    view_airing: "В ефир",
    view_watchlist: "Списък за гледане",
    view_season: "Сезон",
    view_profile: "Профил",
    view_manga: "Манга",
    lbl_view: "Изглед",
    lbl_title: "Заглавие (по избор)",
    lbl_entry_id: "ID на конф. запис (по избор, мулти-акаунт)",
    lbl_card_padding: "Разстояние на картата",
    lbl_link_target: "Действие при клик",
    lbl_show_cover: "Показване на корици",
    lbl_cover_size: "Размер на корица",
    lbl_cover_quality: "Качество на корица",
    lbl_score_position: "Позиция на оценка",
    lbl_score_source: "Източник на оценка",
    lbl_visible_items: "Видими елементи (превъртете за повече)",
    lbl_scroll_snap: "Прилепване на превъртане към елементи",
    lbl_scroll_fade: "Избледняване в края на превъртане",
    lbl_show_search: "Показване на лента за търсене",
    lbl_show_tooltips: "Показване на подсказки при задържане",
    opt_small: "Малък",
    opt_medium: "Среден",
    opt_large: "Голям",
    opt_relative: "Относително (5ч 30м)",
    opt_absolute: "Абсолютно (10 апр, 14:00)",
    opt_both: "И двете",
    opt_anilist: "Отвори AniList",
    opt_none_link: "Без връзка",
    opt_time: "Време",
    opt_title: "Заглавие",
    opt_score: "Оценка",
    opt_compact: "Компактен",
    opt_normal: "Нормален",
    opt_relaxed: "Свободен",
    opt_bar: "Стълбовидна диаграма",
    opt_donut: "Кръгова диаграма",
    opt_tags: "Тагове",
    opt_scroll: "Лента за превъртане",
    opt_limit: "Ограничаване на елементи",
    opt_grid: "Решетка (Корици)",
    opt_list: "Списък (Редове)",
    opt_auto: "Авто (умен)",
    opt_user: "Моята оценка",
    opt_average: "Средна оценка",
    opt_top_right: "Горе вдясно",
    opt_top_left: "Горе вляво",
    opt_bottom_right: "Долу вдясно",
    opt_bottom_left: "Долу вляво",
    opt_inline: "В реда",
    opt_none_pos: "Скрит",
    opt_small_quality: "Малък (бърз)",
    opt_medium_quality: "Среден",
    opt_large_quality: "Голям / HD",
    status_current: "Текущ",
    status_planning: "Планиран",
    status_completed: "Завършен",
    status_paused: "На пауза",
    status_dropped: "Изоставен",
    status_repeating: "Повторение",
    hdr_airing: "Настройки на ефир",
    hdr_watchlist: "Настройки на списък за гледане",
    hdr_season: "Настройки на сезон",
    hdr_profile: "Настройки на профил",
    hdr_manga: "Настройки на манга",
    hdr_status_tabs: "Раздели за статус",
    hdr_filters: "Филтри",
    lbl_max_items: "Макс. елементи",
    lbl_sort_by: "Сортиране по",
    lbl_show_countdown: "Показване на обратно броене",
    lbl_countdown_format: "Формат на обратно броене",
    lbl_show_badges: "Показване на значки за статус",
    lbl_show_duration: "Показване на продължителност на епизод",
    lbl_show_genres: "Показване на жанрове",
    lbl_show_average_score: "Показване на средна оценка",
    lbl_show_format_badge: "Показване на значка за формат (TV/Филм)",
    lbl_layout: "Оформление",
    lbl_show_next_airing: "Показване на обратно броене за следващ епизод",
    lbl_max_items_limit: "Макс. елементи (режим на лимит)",
    lbl_overflow_mode: "Поведение при препълване",
    lbl_scroll_height: "Височина на превъртане (px)",
    lbl_show_progress: "Показване на прогрес",
    lbl_show_progress_bar: "Показване на лента за прогрес",
    lbl_show_status_tabs: "Показване на раздели за статус",
    lbl_visible_statuses: "Видими статуси",
    lbl_genre_filter: "Филтър по жанр (разделени със запетая)",
    lbl_format_filter: "Филтър по формат (разделени със запетая)",
    placeholder_genre: "напр. Action, Romance",
    placeholder_format: "напр. TV, MOVIE, OVA",
    lbl_show_avatar: "Показване на аватар",
    lbl_show_username: "Показване на потребителско име",
    lbl_show_anime_stats: "Показване на аниме статистики",
    lbl_show_manga_stats: "Показване на манга статистики",
    lbl_show_genre_chart: "Показване на диаграма за жанрове",
    lbl_chart_type: "Тип диаграма за жанрове",
    lbl_show_favourites: "Показване на любими",
    lbl_accent_color: "Цвят на акцент",
    lbl_secondary_color: "Вторичен цвят",
    lbl_card_background: "Фон на карта",
    lbl_card_opacity: "Прозрачност на карта",
    lbl_border_color: "Цвят на рамка",
    lbl_border_width: "Ширина на рамка (px)",
    lbl_border_radius: "Радиус на рамка (px)",
  },
};

// ─── Option value arrays (values only, labels come from translations) ─────────

const VIEW_VALUES = ["airing", "watchlist", "season", "profile", "manga"] as const;
const COVER_SIZE_VALUES = ["small", "medium", "large"] as const;
const COUNTDOWN_FORMAT_VALUES = ["relative", "absolute", "both"] as const;
const LINK_TARGET_VALUES = ["anilist", "none"] as const;
const SORT_OPTION_VALUES = ["time", "title", "score"] as const;
const PADDING_OPTION_VALUES = ["compact", "normal", "relaxed"] as const;
const CHART_TYPE_VALUES = ["bar", "donut", "tags"] as const;
const OVERFLOW_MODE_VALUES = ["scroll", "limit"] as const;
const LAYOUT_MODE_VALUES = ["grid", "list"] as const;
const SCORE_SOURCE_VALUES = ["auto", "user", "average"] as const;
const SCORE_POSITION_VALUES = ["top-right", "top-left", "bottom-right", "bottom-left", "inline", "none"] as const;
const COVER_QUALITY_VALUES = ["small", "medium", "large"] as const;
const STATUS_VALUES = ["CURRENT", "PLANNING", "COMPLETED", "PAUSED", "DROPPED", "REPEATING"] as const;

// Translation key mapping for select option labels
const OPTION_KEYS: Record<string, string> = {
  // Views
  airing: "view_airing", watchlist: "view_watchlist", season: "view_season", profile: "view_profile", manga: "view_manga",
  // Cover sizes & general small/medium/large
  small: "opt_small", medium: "opt_medium", large: "opt_large",
  // Countdown formats
  relative: "opt_relative", absolute: "opt_absolute", both: "opt_both",
  // Link targets
  anilist: "opt_anilist", "none_link": "opt_none_link",
  // Sort
  time: "opt_time", title: "opt_title", score: "opt_score",
  // Padding
  compact: "opt_compact", normal: "opt_normal", relaxed: "opt_relaxed",
  // Chart types
  bar: "opt_bar", donut: "opt_donut", tags: "opt_tags",
  // Overflow
  scroll: "opt_scroll", limit: "opt_limit",
  // Layout
  grid: "opt_grid", list: "opt_list",
  // Score sources
  auto: "opt_auto", user: "opt_user", average: "opt_average",
  // Score positions
  "top-right": "opt_top_right", "top-left": "opt_top_left",
  "bottom-right": "opt_bottom_right", "bottom-left": "opt_bottom_left",
  inline: "opt_inline", "none_pos": "opt_none_pos",
  // Cover quality
  "small_quality": "opt_small_quality", "medium_quality": "opt_medium_quality", "large_quality": "opt_large_quality",
  // Status
  CURRENT: "status_current", PLANNING: "status_planning", COMPLETED: "status_completed",
  PAUSED: "status_paused", DROPPED: "status_dropped", REPEATING: "status_repeating",
};

class AniListCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AniListCardConfig;
  @state() private _tab: EditorTab = "general";

  setConfig(config: AniListCardConfig) {
    this._config = { ...config };
  }

  // ─── Translation helper ─────────────────────────────────────────────────

  private _t(key: string): string {
    const lang = this.hass?.language?.substring(0, 2) || "en";
    return (EDITOR_TRANSLATIONS[lang] || EDITOR_TRANSLATIONS["en"])[key]
      || EDITOR_TRANSLATIONS["en"][key]
      || key;
  }

  // ─── Translated option arrays ───────────────────────────────────────────

  private _viewOptions() {
    return VIEW_VALUES.map((v) => ({ value: v, label: this._t(`view_${v}`) }));
  }

  private _coverSizeOptions() {
    return COVER_SIZE_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _countdownFormatOptions() {
    return COUNTDOWN_FORMAT_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _linkTargetOptions() {
    return LINK_TARGET_VALUES.map((v) => ({
      value: v,
      label: this._t(v === "none" ? "opt_none_link" : OPTION_KEYS[v]),
    }));
  }

  private _sortOptions() {
    return SORT_OPTION_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _paddingOptions() {
    return PADDING_OPTION_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _chartTypeOptions() {
    return CHART_TYPE_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _overflowModeOptions() {
    return OVERFLOW_MODE_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _layoutModeOptions() {
    return LAYOUT_MODE_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _scoreSourceOptions() {
    return SCORE_SOURCE_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  private _scorePositionOptions() {
    return SCORE_POSITION_VALUES.map((v) => ({
      value: v,
      label: this._t(v === "none" ? "opt_none_pos" : OPTION_KEYS[v]),
    }));
  }

  private _coverQualityOptions() {
    return COVER_QUALITY_VALUES.map((v) => ({
      value: v,
      label: this._t(OPTION_KEYS[`${v}_quality`]),
    }));
  }

  private _statusOptions() {
    return STATUS_VALUES.map((v) => ({ value: v, label: this._t(OPTION_KEYS[v]) }));
  }

  // ─── Event dispatch ─────────────────────────────────────────────────────

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
    const viewLabel = this._t(`view_${view}`);
    const labels: Record<EditorTab, string> = {
      general: this._t("tab_general"),
      view: viewLabel,
      colors: this._t("tab_colors"),
    };
    return labels[t];
  }

  // ─── General tab (shared settings) ──────────────────────────────────────

  private _renderGeneral() {
    return html`
      <div class="section">
        ${this._select("view", this._t("lbl_view"), this._viewOptions())}
        ${this._text("title", this._t("lbl_title"))}
        ${this._text("entry_id", this._t("lbl_entry_id"))}
        ${this._select("card_padding", this._t("lbl_card_padding"), this._paddingOptions())}
        ${this._select("link_target", this._t("lbl_link_target"), this._linkTargetOptions())}
        ${this._toggle("show_cover", this._t("lbl_show_cover"))}
        ${this._config.show_cover !== false ? this._select("cover_size", this._t("lbl_cover_size"), this._coverSizeOptions()) : nothing}
        ${this._select("cover_quality", this._t("lbl_cover_quality"), this._coverQualityOptions())}
        ${this._select("score_position", this._t("lbl_score_position"), this._scorePositionOptions())}
        ${this._select("score_source", this._t("lbl_score_source"), this._scoreSourceOptions())}
        ${this._number("visible_items", this._t("lbl_visible_items"), 1, 50)}
        ${this._config.visible_items ? this._toggle("scroll_snap", this._t("lbl_scroll_snap")) : nothing}
        ${this._config.visible_items ? this._toggle("scroll_fade", this._t("lbl_scroll_fade")) : nothing}
        ${this._toggle("show_search", this._t("lbl_show_search"))}
        ${this._toggle("show_tooltips", this._t("lbl_show_tooltips"))}
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
        <div class="section-header">${this._t("hdr_airing")}</div>
        ${this._number("max_airing", this._t("lbl_max_items"), 1, 50)}
        ${this._select("sort_by", this._t("lbl_sort_by"), this._sortOptions())}
        ${this._toggle("show_countdown", this._t("lbl_show_countdown"))}
        ${this._config.show_countdown !== false
          ? this._select("countdown_format", this._t("lbl_countdown_format"), this._countdownFormatOptions())
          : nothing}
        ${this._toggle("show_badges", this._t("lbl_show_badges"))}
        ${this._toggle("show_duration", this._t("lbl_show_duration"))}
        ${this._toggle("show_genres", this._t("lbl_show_genres"))}
        ${this._toggle("show_average_score", this._t("lbl_show_average_score"))}
        ${this._toggle("show_format_badge", this._t("lbl_show_format_badge"))}
        ${this._select("layout_mode", this._t("lbl_layout"), this._layoutModeOptions())}
      </div>
    `;
  }

  private _renderWatchlistSettings() {
    const statusOpts = this._statusOptions();
    return html`
      <div class="section">
        <div class="section-header">${this._t("hdr_watchlist")}</div>
        ${this._select("layout_mode", this._t("lbl_layout"), this._layoutModeOptions())}
        ${this._toggle("show_next_airing", this._t("lbl_show_next_airing"))}
        ${this._number("max_watchlist", this._t("lbl_max_items_limit"), 1, 50)}
        ${this._select("overflow_mode", this._t("lbl_overflow_mode"), this._overflowModeOptions())}
        ${this._config.overflow_mode === "scroll"
          ? this._number("scroll_height", this._t("lbl_scroll_height"), 100, 1000)
          : nothing}
        ${this._toggle("show_progress", this._t("lbl_show_progress"))}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", this._t("lbl_show_progress_bar")) : nothing}

        <div class="section-header">${this._t("hdr_status_tabs")}</div>
        ${this._toggle("show_status_tabs", this._t("lbl_show_status_tabs"))}
        <label class="field-label">${this._t("lbl_visible_statuses")}</label>
        <div class="checkbox-group">
          ${statusOpts.map((s) => html`
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
        <div class="section-header">${this._t("hdr_season")}</div>
        ${this._select("layout_mode", this._t("lbl_layout"), this._layoutModeOptions())}
        ${this._number("max_season", this._t("lbl_max_items"), 1, 50)}
        <div class="section-header">${this._t("hdr_filters")}</div>
        <label class="field-label">${this._t("lbl_genre_filter")}</label>
        <input
          class="text-input"
          type="text"
          .value=${(this._config.genre_filter ?? []).join(", ")}
          @change=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._set("genre_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
          }}
          placeholder=${this._t("placeholder_genre")}
        />
        <label class="field-label">${this._t("lbl_format_filter")}</label>
        <input
          class="text-input"
          type="text"
          .value=${(this._config.format_filter ?? []).join(", ")}
          @change=${(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this._set("format_filter", val ? val.split(",").map((s) => s.trim()).filter(Boolean) : []);
          }}
          placeholder=${this._t("placeholder_format")}
        />
      </div>
    `;
  }

  private _renderProfileSettings() {
    return html`
      <div class="section">
        <div class="section-header">${this._t("hdr_profile")}</div>
        ${this._toggle("show_avatar", this._t("lbl_show_avatar"))}
        ${this._toggle("show_username", this._t("lbl_show_username"))}
        ${this._toggle("show_anime_stats", this._t("lbl_show_anime_stats"))}
        ${this._toggle("show_manga_stats", this._t("lbl_show_manga_stats"))}
        ${this._toggle("show_genre_chart", this._t("lbl_show_genre_chart"))}
        ${this._config.show_genre_chart !== false
          ? this._select("chart_type", this._t("lbl_chart_type"), this._chartTypeOptions())
          : nothing}
        ${this._toggle("show_favourites", this._t("lbl_show_favourites"))}
      </div>
    `;
  }

  private _renderMangaSettings() {
    const statusOpts = this._statusOptions();
    return html`
      <div class="section">
        <div class="section-header">${this._t("hdr_manga")}</div>
        ${this._select("layout_mode", this._t("lbl_layout"), this._layoutModeOptions())}
        ${this._number("max_manga", this._t("lbl_max_items_limit"), 1, 50)}
        ${this._select("overflow_mode", this._t("lbl_overflow_mode"), this._overflowModeOptions())}
        ${this._config.overflow_mode === "scroll"
          ? this._number("scroll_height", this._t("lbl_scroll_height"), 100, 1000)
          : nothing}
        ${this._toggle("show_progress", this._t("lbl_show_progress"))}
        ${this._config.show_progress !== false ? this._toggle("show_progress_bar", this._t("lbl_show_progress_bar")) : nothing}

        <div class="section-header">${this._t("hdr_status_tabs")}</div>
        ${this._toggle("show_status_tabs", this._t("lbl_show_status_tabs"))}
        <label class="field-label">${this._t("lbl_visible_statuses")}</label>
        <div class="checkbox-group">
          ${statusOpts.map((s) => html`
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
        ${this._color("accent_color", this._t("lbl_accent_color"))}
        ${this._color("secondary_color", this._t("lbl_secondary_color"))}
        ${this._color("card_background", this._t("lbl_card_background"))}
        ${this._slider("card_opacity", this._t("lbl_card_opacity"), 0, 100)}
        ${this._color("border_color", this._t("lbl_border_color"))}
        ${this._number("border_width", this._t("lbl_border_width"), 0, 10)}
        ${this._number("border_radius", this._t("lbl_border_radius"), 0, 30)}
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
