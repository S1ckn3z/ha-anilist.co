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
  WSListResponse,
  WSProfileResponse,
  MediaTitle,
  CoverImages,
} from "./types.js";
import { resolveTitle } from "./types.js";
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
    repeating: "Repeating",
    next_season_label: "Next Season",
    airing: "Airing",
    min: "min",
    ch: "Ch.",
    vol: "Vol.",
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
    repeating: "Wiederholen",
    next_season_label: "Nächste Season",
    airing: "Läuft",
    min: "Min.",
    ch: "Kap.",
    vol: "Bd.",
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
    repeating: "リピート",
    next_season_label: "来期",
    airing: "放送中",
    min: "分",
    ch: "話",
    vol: "巻",
  },
  es: {
    next_episodes: "Próximos episodios",
    watching: "Viendo actualmente",
    this_season: "Esta temporada",
    profile: "Perfil de AniList",
    manga: "Lectura de Manga",
    no_episodes: "No hay episodios en los próximos días.",
    no_watchlist: "No hay anime en la lista.",
    no_season: "No hay datos de temporada disponibles.",
    no_profile: "No hay estadísticas de perfil disponibles.",
    no_manga: "No hay manga en la lista.",
    auth_only: "Solo para usuarios registrados.",
    episode: "Episodio",
    ep: "Ep.",
    aired: "Emitido",
    anime: "Anime",
    episodes: "Episodios",
    hours: "Horas",
    score_avg: "Puntuación media",
    watching_now: "Viendo",
    chapters: "Capítulos",
    volumes: "Volúmenes",
    manga_count: "Manga",
    manga_score: "Puntuación Manga",
    top_genres: "Géneros principales",
    favourites: "Favoritos",
    search_placeholder: "Buscar...",
    current: "Actual",
    planning: "Planeado",
    completed: "Completado",
    paused: "Pausado",
    dropped: "Abandonado",
    repeating: "Repitiendo",
    next_season_label: "Próxima temporada",
    airing: "En emisión",
    min: "min",
    ch: "Cap.",
    vol: "Vol.",
  },
  fr: {
    next_episodes: "Prochains épisodes",
    watching: "En cours de visionnage",
    this_season: "Cette saison",
    profile: "Profil AniList",
    manga: "Lecture Manga",
    no_episodes: "Aucun épisode dans les prochains jours.",
    no_watchlist: "Aucun anime dans la liste.",
    no_season: "Aucune donnée de saison disponible.",
    no_profile: "Aucune statistique de profil disponible.",
    no_manga: "Aucun manga dans la liste.",
    auth_only: "Réservé aux utilisateurs connectés.",
    episode: "Épisode",
    ep: "Ép.",
    aired: "Diffusé",
    anime: "Anime",
    episodes: "Épisodes",
    hours: "Heures",
    score_avg: "Score moyen",
    watching_now: "En cours",
    chapters: "Chapitres",
    volumes: "Volumes",
    manga_count: "Manga",
    manga_score: "Score Manga",
    top_genres: "Genres principaux",
    favourites: "Favoris",
    search_placeholder: "Rechercher...",
    current: "En cours",
    planning: "Planifié",
    completed: "Terminé",
    paused: "En pause",
    dropped: "Abandonné",
    repeating: "En reprise",
    next_season_label: "Prochaine saison",
    airing: "En diffusion",
    min: "min",
    ch: "Ch.",
    vol: "Vol.",
  },
  it: {
    next_episodes: "Prossimi episodi",
    watching: "In visione",
    this_season: "Questa stagione",
    profile: "Profilo AniList",
    manga: "Lettura Manga",
    no_episodes: "Nessun episodio nei prossimi giorni.",
    no_watchlist: "Nessun anime nella lista.",
    no_season: "Nessun dato stagionale disponibile.",
    no_profile: "Nessuna statistica del profilo disponibile.",
    no_manga: "Nessun manga nella lista.",
    auth_only: "Solo per utenti registrati.",
    episode: "Episodio",
    ep: "Ep.",
    aired: "Trasmesso",
    anime: "Anime",
    episodes: "Episodi",
    hours: "Ore",
    score_avg: "Punteggio medio",
    watching_now: "In visione",
    chapters: "Capitoli",
    volumes: "Volumi",
    manga_count: "Manga",
    manga_score: "Punteggio Manga",
    top_genres: "Generi principali",
    favourites: "Preferiti",
    search_placeholder: "Cerca...",
    current: "In corso",
    planning: "Pianificato",
    completed: "Completato",
    paused: "In pausa",
    dropped: "Abbandonato",
    repeating: "In ripetizione",
    next_season_label: "Prossima stagione",
    airing: "In onda",
    min: "min",
    ch: "Cap.",
    vol: "Vol.",
  },
  pt: {
    next_episodes: "Próximos episódios",
    watching: "Assistindo atualmente",
    this_season: "Esta temporada",
    profile: "Perfil AniList",
    manga: "Leitura de Manga",
    no_episodes: "Nenhum episódio nos próximos dias.",
    no_watchlist: "Nenhum anime na lista.",
    no_season: "Nenhum dado de temporada disponível.",
    no_profile: "Nenhuma estatística de perfil disponível.",
    no_manga: "Nenhum manga na lista.",
    auth_only: "Apenas para utilizadores autenticados.",
    episode: "Episódio",
    ep: "Ep.",
    aired: "Exibido",
    anime: "Anime",
    episodes: "Episódios",
    hours: "Horas",
    score_avg: "Pontuação média",
    watching_now: "A ver",
    chapters: "Capítulos",
    volumes: "Volumes",
    manga_count: "Manga",
    manga_score: "Pontuação Manga",
    top_genres: "Géneros principais",
    favourites: "Favoritos",
    search_placeholder: "Pesquisar...",
    current: "Atual",
    planning: "Planeado",
    completed: "Concluído",
    paused: "Pausado",
    dropped: "Abandonado",
    repeating: "A repetir",
    next_season_label: "Próxima temporada",
    airing: "Em exibição",
    min: "min",
    ch: "Cap.",
    vol: "Vol.",
  },
  nl: {
    next_episodes: "Volgende afleveringen",
    watching: "Nu aan het kijken",
    this_season: "Dit seizoen",
    profile: "AniList Profiel",
    manga: "Manga leeslijst",
    no_episodes: "Geen afleveringen de komende dagen.",
    no_watchlist: "Geen anime in de kijklijst.",
    no_season: "Geen seizoensdata beschikbaar.",
    no_profile: "Geen profielstatistieken beschikbaar.",
    no_manga: "Geen manga in de lijst.",
    auth_only: "Alleen voor ingelogde gebruikers.",
    episode: "Aflevering",
    ep: "Afl.",
    aired: "Uitgezonden",
    anime: "Anime",
    episodes: "Afleveringen",
    hours: "Uren",
    score_avg: "Gem. score",
    watching_now: "Kijkend",
    chapters: "Hoofdstukken",
    volumes: "Volumes",
    manga_count: "Manga",
    manga_score: "Manga Score",
    top_genres: "Topgenres",
    favourites: "Favorieten",
    search_placeholder: "Zoeken...",
    current: "Huidig",
    planning: "Gepland",
    completed: "Voltooid",
    paused: "Gepauzeerd",
    dropped: "Gestopt",
    repeating: "Opnieuw",
    next_season_label: "Volgend seizoen",
    airing: "In uitzending",
    min: "min",
    ch: "Hfst.",
    vol: "Vol.",
  },
  pl: {
    next_episodes: "Następne odcinki",
    watching: "Obecnie oglądam",
    this_season: "Ten sezon",
    profile: "Profil AniList",
    manga: "Czytanie Mangi",
    no_episodes: "Brak odcinków w najbliższych dniach.",
    no_watchlist: "Brak anime na liście.",
    no_season: "Brak danych o sezonie.",
    no_profile: "Brak statystyk profilu.",
    no_manga: "Brak mangi na liście.",
    auth_only: "Tylko dla zalogowanych użytkowników.",
    episode: "Odcinek",
    ep: "Odc.",
    aired: "Wyemitowano",
    anime: "Anime",
    episodes: "Odcinki",
    hours: "Godziny",
    score_avg: "Średnia ocena",
    watching_now: "Oglądam",
    chapters: "Rozdziały",
    volumes: "Tomy",
    manga_count: "Manga",
    manga_score: "Ocena Mangi",
    top_genres: "Popularne gatunki",
    favourites: "Ulubione",
    search_placeholder: "Szukaj...",
    current: "Bieżące",
    planning: "Planowane",
    completed: "Ukończone",
    paused: "Wstrzymane",
    dropped: "Porzucone",
    repeating: "Powtarzane",
    next_season_label: "Następny sezon",
    airing: "Emitowane",
    min: "min",
    ch: "Rozdz.",
    vol: "Tom",
  },
  sv: {
    next_episodes: "Nästa avsnitt",
    watching: "Tittar just nu",
    this_season: "Denna säsong",
    profile: "AniList-profil",
    manga: "Manga-läsning",
    no_episodes: "Inga avsnitt de kommande dagarna.",
    no_watchlist: "Ingen anime i listan.",
    no_season: "Ingen säsongsdata tillgänglig.",
    no_profile: "Ingen profilstatistik tillgänglig.",
    no_manga: "Ingen manga i listan.",
    auth_only: "Endast för inloggade användare.",
    episode: "Avsnitt",
    ep: "Avs.",
    aired: "Sänt",
    anime: "Anime",
    episodes: "Avsnitt",
    hours: "Timmar",
    score_avg: "Medelbetyg",
    watching_now: "Tittar",
    chapters: "Kapitel",
    volumes: "Volymer",
    manga_count: "Manga",
    manga_score: "Manga-betyg",
    top_genres: "Toppgenrer",
    favourites: "Favoriter",
    search_placeholder: "Sök...",
    current: "Pågående",
    planning: "Planerad",
    completed: "Avslutad",
    paused: "Pausad",
    dropped: "Avbruten",
    repeating: "Ompågående",
    next_season_label: "Nästa säsong",
    airing: "Sänds",
    min: "min",
    ch: "Kap.",
    vol: "Vol.",
  },
  da: {
    next_episodes: "Næste episoder",
    watching: "Ser nu",
    this_season: "Denne sæson",
    profile: "AniList-profil",
    manga: "Manga-læsning",
    no_episodes: "Ingen episoder de kommende dage.",
    no_watchlist: "Ingen anime på listen.",
    no_season: "Ingen sæsondata tilgængelig.",
    no_profile: "Ingen profilstatistik tilgængelig.",
    no_manga: "Ingen manga på listen.",
    auth_only: "Kun for indloggede brugere.",
    episode: "Episode",
    ep: "Ep.",
    aired: "Sendt",
    anime: "Anime",
    episodes: "Episoder",
    hours: "Timer",
    score_avg: "Gns. score",
    watching_now: "Ser",
    chapters: "Kapitler",
    volumes: "Bind",
    manga_count: "Manga",
    manga_score: "Manga-score",
    top_genres: "Topgenrer",
    favourites: "Favoritter",
    search_placeholder: "Søg...",
    current: "Igangværende",
    planning: "Planlagt",
    completed: "Færdig",
    paused: "Sat på pause",
    dropped: "Droppet",
    repeating: "Gentager",
    next_season_label: "Næste sæson",
    airing: "Sendes",
    min: "min",
    ch: "Kap.",
    vol: "Bind",
  },
  nb: {
    next_episodes: "Neste episoder",
    watching: "Ser nå",
    this_season: "Denne sesongen",
    profile: "AniList-profil",
    manga: "Manga-lesing",
    no_episodes: "Ingen episoder de kommende dagene.",
    no_watchlist: "Ingen anime på listen.",
    no_season: "Ingen sesongdata tilgjengelig.",
    no_profile: "Ingen profilstatistikk tilgjengelig.",
    no_manga: "Ingen manga på listen.",
    auth_only: "Kun for innloggede brukere.",
    episode: "Episode",
    ep: "Ep.",
    aired: "Sendt",
    anime: "Anime",
    episodes: "Episoder",
    hours: "Timer",
    score_avg: "Gj.snitt",
    watching_now: "Ser",
    chapters: "Kapitler",
    volumes: "Bind",
    manga_count: "Manga",
    manga_score: "Manga-poeng",
    top_genres: "Toppsjangre",
    favourites: "Favoritter",
    search_placeholder: "Søk...",
    current: "Pågående",
    planning: "Planlagt",
    completed: "Fullført",
    paused: "Pauset",
    dropped: "Droppet",
    repeating: "Gjentar",
    next_season_label: "Neste sesong",
    airing: "Sendes",
    min: "min",
    ch: "Kap.",
    vol: "Bind",
  },
  fi: {
    next_episodes: "Seuraavat jaksot",
    watching: "Katselen parhaillaan",
    this_season: "Tämä kausi",
    profile: "AniList-profiili",
    manga: "Manga-lukeminen",
    no_episodes: "Ei jaksoja lähipäivinä.",
    no_watchlist: "Ei animea listalla.",
    no_season: "Ei kausitietoja saatavilla.",
    no_profile: "Ei profiilitilastoja saatavilla.",
    no_manga: "Ei mangaa listalla.",
    auth_only: "Vain kirjautuneille käyttäjille.",
    episode: "Jakso",
    ep: "Jakso",
    aired: "Esitetty",
    anime: "Anime",
    episodes: "Jaksot",
    hours: "Tunnit",
    score_avg: "Keskiarvo",
    watching_now: "Katselen",
    chapters: "Luvut",
    volumes: "Osat",
    manga_count: "Manga",
    manga_score: "Manga-arvosana",
    top_genres: "Suosituimmat lajityypit",
    favourites: "Suosikit",
    search_placeholder: "Hae...",
    current: "Käynnissä",
    planning: "Suunniteltu",
    completed: "Valmis",
    paused: "Tauolla",
    dropped: "Keskeytetty",
    repeating: "Uudelleen",
    next_season_label: "Seuraava kausi",
    airing: "Esitetään",
    min: "min",
    ch: "Luku",
    vol: "Osa",
  },
  cs: {
    next_episodes: "Další epizody",
    watching: "Právě sleduji",
    this_season: "Tato sezóna",
    profile: "Profil AniList",
    manga: "Čtení Mangy",
    no_episodes: "Žádné epizody v nejbližších dnech.",
    no_watchlist: "Žádné anime v seznamu.",
    no_season: "Žádná data o sezóně.",
    no_profile: "Žádné statistiky profilu.",
    no_manga: "Žádná manga v seznamu.",
    auth_only: "Pouze pro přihlášené uživatele.",
    episode: "Epizoda",
    ep: "Ep.",
    aired: "Odvysíláno",
    anime: "Anime",
    episodes: "Epizody",
    hours: "Hodiny",
    score_avg: "Prům. skóre",
    watching_now: "Sleduji",
    chapters: "Kapitoly",
    volumes: "Svazky",
    manga_count: "Manga",
    manga_score: "Skóre Mangy",
    top_genres: "Oblíbené žánry",
    favourites: "Oblíbené",
    search_placeholder: "Hledat...",
    current: "Aktuální",
    planning: "Plánované",
    completed: "Dokončené",
    paused: "Pozastavené",
    dropped: "Zahozené",
    repeating: "Opakované",
    next_season_label: "Další sezóna",
    airing: "Vysílá se",
    min: "min",
    ch: "Kap.",
    vol: "Sv.",
  },
  ro: {
    next_episodes: "Următoarele episoade",
    watching: "Vizionez acum",
    this_season: "Acest sezon",
    profile: "Profil AniList",
    manga: "Lectură Manga",
    no_episodes: "Niciun episod în zilele următoare.",
    no_watchlist: "Niciun anime în listă.",
    no_season: "Nu sunt date de sezon disponibile.",
    no_profile: "Nu sunt statistici de profil disponibile.",
    no_manga: "Niciun manga în listă.",
    auth_only: "Doar pentru utilizatori autentificați.",
    episode: "Episod",
    ep: "Ep.",
    aired: "Difuzat",
    anime: "Anime",
    episodes: "Episoade",
    hours: "Ore",
    score_avg: "Scor mediu",
    watching_now: "Vizionez",
    chapters: "Capitole",
    volumes: "Volume",
    manga_count: "Manga",
    manga_score: "Scor Manga",
    top_genres: "Genuri populare",
    favourites: "Favorite",
    search_placeholder: "Caută...",
    current: "Curent",
    planning: "Planificat",
    completed: "Finalizat",
    paused: "Pauză",
    dropped: "Abandonat",
    repeating: "Repetat",
    next_season_label: "Sezonul următor",
    airing: "În difuzare",
    min: "min",
    ch: "Cap.",
    vol: "Vol.",
  },
  hu: {
    next_episodes: "Következő epizódok",
    watching: "Jelenleg nézem",
    this_season: "Ez az évad",
    profile: "AniList Profil",
    manga: "Manga olvasás",
    no_episodes: "Nincs epizód a következő napokban.",
    no_watchlist: "Nincs anime a listán.",
    no_season: "Nincs elérhető évad adat.",
    no_profile: "Nincs elérhető profil statisztika.",
    no_manga: "Nincs manga a listán.",
    auth_only: "Csak bejelentkezett felhasználóknak.",
    episode: "Epizód",
    ep: "Ep.",
    aired: "Adásba került",
    anime: "Anime",
    episodes: "Epizódok",
    hours: "Órák",
    score_avg: "Átl. pontszám",
    watching_now: "Nézem",
    chapters: "Fejezetek",
    volumes: "Kötetek",
    manga_count: "Manga",
    manga_score: "Manga pontszám",
    top_genres: "Népszerű műfajok",
    favourites: "Kedvencek",
    search_placeholder: "Keresés...",
    current: "Folyamatban",
    planning: "Tervezett",
    completed: "Befejezett",
    paused: "Szüneteltetve",
    dropped: "Eldobva",
    repeating: "Újranézés",
    next_season_label: "Következő évad",
    airing: "Adásban",
    min: "perc",
    ch: "Fej.",
    vol: "Köt.",
  },
  el: {
    next_episodes: "Επόμενα επεισόδια",
    watching: "Παρακολουθώ τώρα",
    this_season: "Αυτή η σεζόν",
    profile: "Προφίλ AniList",
    manga: "Ανάγνωση Manga",
    no_episodes: "Δεν υπάρχουν επεισόδια τις επόμενες μέρες.",
    no_watchlist: "Δεν υπάρχει anime στη λίστα.",
    no_season: "Δεν υπάρχουν δεδομένα σεζόν.",
    no_profile: "Δεν υπάρχουν στατιστικά προφίλ.",
    no_manga: "Δεν υπάρχει manga στη λίστα.",
    auth_only: "Μόνο για συνδεδεμένους χρήστες.",
    episode: "Επεισόδιο",
    ep: "Επ.",
    aired: "Προβλήθηκε",
    anime: "Anime",
    episodes: "Επεισόδια",
    hours: "Ώρες",
    score_avg: "Μέσος όρος",
    watching_now: "Παρακολουθώ",
    chapters: "Κεφάλαια",
    volumes: "Τόμοι",
    manga_count: "Manga",
    manga_score: "Βαθμολογία Manga",
    top_genres: "Κορυφαία είδη",
    favourites: "Αγαπημένα",
    search_placeholder: "Αναζήτηση...",
    current: "Τρέχον",
    planning: "Προγραμματισμένο",
    completed: "Ολοκληρωμένο",
    paused: "Σε παύση",
    dropped: "Εγκαταλελειμμένο",
    repeating: "Επανάληψη",
    next_season_label: "Επόμενη σεζόν",
    airing: "Σε μετάδοση",
    min: "λεπ.",
    ch: "Κεφ.",
    vol: "Τόμ.",
  },
  tr: {
    next_episodes: "Sonraki bölümler",
    watching: "Şu an izleniyor",
    this_season: "Bu sezon",
    profile: "AniList Profili",
    manga: "Manga Okuma",
    no_episodes: "Önümüzdeki günlerde bölüm yok.",
    no_watchlist: "Listede anime yok.",
    no_season: "Sezon verisi mevcut değil.",
    no_profile: "Profil istatistiği mevcut değil.",
    no_manga: "Listede manga yok.",
    auth_only: "Sadece giriş yapan kullanıcılar için.",
    episode: "Bölüm",
    ep: "Böl.",
    aired: "Yayınlandı",
    anime: "Anime",
    episodes: "Bölümler",
    hours: "Saat",
    score_avg: "Ort. puan",
    watching_now: "İzleniyor",
    chapters: "Bölümler",
    volumes: "Ciltler",
    manga_count: "Manga",
    manga_score: "Manga Puanı",
    top_genres: "Popüler türler",
    favourites: "Favoriler",
    search_placeholder: "Ara...",
    current: "Devam eden",
    planning: "Planlanan",
    completed: "Tamamlanan",
    paused: "Duraklatılan",
    dropped: "Bırakılan",
    repeating: "Tekrar edilen",
    next_season_label: "Sonraki sezon",
    airing: "Yayında",
    min: "dk",
    ch: "Böl.",
    vol: "Cilt",
  },
  uk: {
    next_episodes: "Наступні епізоди",
    watching: "Зараз дивлюсь",
    this_season: "Цей сезон",
    profile: "Профіль AniList",
    manga: "Читання Манги",
    no_episodes: "Немає епізодів найближчими днями.",
    no_watchlist: "Немає аніме у списку.",
    no_season: "Немає даних про сезон.",
    no_profile: "Немає статистики профілю.",
    no_manga: "Немає манги у списку.",
    auth_only: "Лише для авторизованих користувачів.",
    episode: "Епізод",
    ep: "Еп.",
    aired: "Вийшов",
    anime: "Аніме",
    episodes: "Епізоди",
    hours: "Години",
    score_avg: "Сер. оцінка",
    watching_now: "Дивлюсь",
    chapters: "Розділи",
    volumes: "Томи",
    manga_count: "Манга",
    manga_score: "Оцінка Манги",
    top_genres: "Топ жанри",
    favourites: "Обране",
    search_placeholder: "Пошук...",
    current: "Поточне",
    planning: "Заплановане",
    completed: "Завершене",
    paused: "Призупинене",
    dropped: "Закинуте",
    repeating: "Повторюю",
    next_season_label: "Наступний сезон",
    airing: "В ефірі",
    min: "хв",
    ch: "Розд.",
    vol: "Том",
  },
  ru: {
    next_episodes: "Следующие эпизоды",
    watching: "Сейчас смотрю",
    this_season: "Этот сезон",
    profile: "Профиль AniList",
    manga: "Чтение Манги",
    no_episodes: "Нет эпизодов в ближайшие дни.",
    no_watchlist: "Нет аниме в списке.",
    no_season: "Нет данных о сезоне.",
    no_profile: "Нет статистики профиля.",
    no_manga: "Нет манги в списке.",
    auth_only: "Только для авторизованных пользователей.",
    episode: "Эпизод",
    ep: "Эп.",
    aired: "Вышел",
    anime: "Аниме",
    episodes: "Эпизоды",
    hours: "Часы",
    score_avg: "Ср. оценка",
    watching_now: "Смотрю",
    chapters: "Главы",
    volumes: "Тома",
    manga_count: "Манга",
    manga_score: "Оценка Манги",
    top_genres: "Топ жанры",
    favourites: "Избранное",
    search_placeholder: "Поиск...",
    current: "Текущее",
    planning: "Запланировано",
    completed: "Завершено",
    paused: "На паузе",
    dropped: "Брошено",
    repeating: "Пересматриваю",
    next_season_label: "Следующий сезон",
    airing: "В эфире",
    min: "мин",
    ch: "Гл.",
    vol: "Том",
  },
  sk: {
    next_episodes: "Ďalšie epizódy",
    watching: "Práve sledujem",
    this_season: "Táto sezóna",
    profile: "Profil AniList",
    manga: "Čítanie Mangy",
    no_episodes: "Žiadne epizódy v najbližších dňoch.",
    no_watchlist: "Žiadne anime v zozname.",
    no_season: "Žiadne údaje o sezóne.",
    no_profile: "Žiadne štatistiky profilu.",
    no_manga: "Žiadna manga v zozname.",
    auth_only: "Iba pre prihlásených používateľov.",
    episode: "Epizóda",
    ep: "Ep.",
    aired: "Odvysielané",
    anime: "Anime",
    episodes: "Epizódy",
    hours: "Hodiny",
    score_avg: "Priem. skóre",
    watching_now: "Sledujem",
    chapters: "Kapitoly",
    volumes: "Zväzky",
    manga_count: "Manga",
    manga_score: "Skóre Mangy",
    top_genres: "Obľúbené žánre",
    favourites: "Obľúbené",
    search_placeholder: "Hľadať...",
    current: "Aktuálne",
    planning: "Plánované",
    completed: "Dokončené",
    paused: "Pozastavené",
    dropped: "Zahodené",
    repeating: "Opakované",
    next_season_label: "Ďalšia sezóna",
    airing: "Vysiela sa",
    min: "min",
    ch: "Kap.",
    vol: "Zv.",
  },
  hr: {
    next_episodes: "Sljedeće epizode",
    watching: "Trenutno gledam",
    this_season: "Ova sezona",
    profile: "AniList Profil",
    manga: "Čitanje Mange",
    no_episodes: "Nema epizoda u sljedećim danima.",
    no_watchlist: "Nema animea na popisu.",
    no_season: "Nema podataka o sezoni.",
    no_profile: "Nema statistike profila.",
    no_manga: "Nema mange na popisu.",
    auth_only: "Samo za prijavljene korisnike.",
    episode: "Epizoda",
    ep: "Ep.",
    aired: "Emitirano",
    anime: "Anime",
    episodes: "Epizode",
    hours: "Sati",
    score_avg: "Prosj. ocjena",
    watching_now: "Gledam",
    chapters: "Poglavlja",
    volumes: "Svesci",
    manga_count: "Manga",
    manga_score: "Ocjena Mange",
    top_genres: "Popularni žanrovi",
    favourites: "Favoriti",
    search_placeholder: "Traži...",
    current: "Trenutno",
    planning: "Planirano",
    completed: "Završeno",
    paused: "Pauzirano",
    dropped: "Napušteno",
    repeating: "Ponavlja se",
    next_season_label: "Sljedeća sezona",
    airing: "Emitira se",
    min: "min",
    ch: "Pogl.",
    vol: "Sv.",
  },
  bg: {
    next_episodes: "Следващи епизоди",
    watching: "Гледам в момента",
    this_season: "Този сезон",
    profile: "Профил в AniList",
    manga: "Четене на Манга",
    no_episodes: "Няма епизоди в следващите дни.",
    no_watchlist: "Няма аниме в списъка.",
    no_season: "Няма налични данни за сезона.",
    no_profile: "Няма налична статистика на профила.",
    no_manga: "Няма манга в списъка.",
    auth_only: "Само за влезли потребители.",
    episode: "Епизод",
    ep: "Еп.",
    aired: "Излъчен",
    anime: "Аниме",
    episodes: "Епизоди",
    hours: "Часове",
    score_avg: "Ср. оценка",
    watching_now: "Гледам",
    chapters: "Глави",
    volumes: "Томове",
    manga_count: "Манга",
    manga_score: "Оценка на Манга",
    top_genres: "Топ жанрове",
    favourites: "Любими",
    search_placeholder: "Търсене...",
    current: "Текущо",
    planning: "Планирано",
    completed: "Завършено",
    paused: "На пауза",
    dropped: "Изоставено",
    repeating: "Повторение",
    next_season_label: "Следващ сезон",
    airing: "В ефир",
    min: "мин",
    ch: "Гл.",
    vol: "Том",
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

/** Format a raw 0-100 score to single-digit 0-10 scale. */
function fmtScore(raw: number | undefined): string {
  if (!raw) return "";
  return (raw / 10).toFixed(1).replace(/\.0$/, "");
}

function renderScoreOverlay(score: number | undefined, position: string) {
  if (!score || position === "none") return nothing;
  if (position === "inline") return nothing;
  return html`<span class="score-overlay ${position}">★${fmtScore(score)}</span>`;
}

function renderScoreInline(score: number | undefined, position: string) {
  if (!score || position !== "inline") return nothing;
  return html`<span class="score-inline">★${fmtScore(score)}</span>`;
}

// ─── Card Element ─────────────────────────────────────────────────────────────

class AniListCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AniListCardConfig;
  @state() private _activeTab = "CURRENT";
  @state() private _searchQuery = "";

  // WebSocket data cache (null = not yet loaded, use entity fallback)
  @state() private _wsAiring: AiringAnime[] | null = null;
  @state() private _wsWatchlist: WatchlistAnime[] | null = null;
  @state() private _wsSeason: SeasonAnime[] | null = null;
  @state() private _wsManga: MangaItem[] | null = null;
  @state() private _wsProfile: WSProfileResponse | null = null;
  @state() private _wsLoading = false;

  private _tick: ReturnType<typeof setInterval> | undefined;
  private _lastSensorHash = "";
  private _wsLoadedViews = new Set<string>();
  private _wsLoadPromise: Promise<void> | null = null;
  private _wsInitDone = false;

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
    this._wsInitDone = false;
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (!changed.has("hass") || !this.hass?.callWS) return;

    // First hass assignment → initial WS load
    if (!this._wsInitDone) {
      this._wsInitDone = true;
      this._lastSensorHash = this._sensorHash();
      this._triggerWSLoad();
      return;
    }

    // Subsequent updates: only reload when sensor states actually changed
    // (indicates coordinator refreshed new data from AniList API)
    const hash = this._sensorHash();
    if (hash !== this._lastSensorHash) {
      this._lastSensorHash = hash;
      this._wsLoadedViews.clear();
      this._triggerWSLoad();
    }

  }

  /** Simple hash of anilist sensor states to detect coordinator refreshes. */
  private _sensorHash(): string {
    let h = "";
    for (const [id, s] of Object.entries(this.hass?.states ?? {})) {
      if (id.startsWith("sensor.anilist_")) h += `${id}:${s.state};`;
    }
    return h;
  }

  private _triggerWSLoad() {
    // Prevent overlapping loads
    if (this._wsLoadPromise) return;
    const view = this._config?.view ?? "airing";
    this._wsLoadPromise = this._loadViewData(view).then(() => {
      this._wsLoadedViews.add(view);
      this._wsLoadPromise = null;
    }).catch(() => {
      this._wsLoadPromise = null;
    });
  }

  private async _loadViewData(view: string): Promise<void> {
    if (!this.hass?.callWS) return;
    this._wsLoading = true;
    try {
      const entryId = this._config.entry_id; // undefined = auto-detect on server
      if (view === "airing") {
        const r = await this.hass.callWS<WSListResponse<AiringAnime>>({
          type: "anilist/airing_schedule",
          ...(entryId ? { entry_id: entryId } : {}),
        });
        this._wsAiring = r.items;
      } else if (view === "watchlist") {
        const r = await this.hass.callWS<WSListResponse<WatchlistAnime>>({
          type: "anilist/watchlist",
          ...(entryId ? { entry_id: entryId } : {}),
        });
        this._wsWatchlist = r.items;
      } else if (view === "season") {
        const r = await this.hass.callWS<WSListResponse<SeasonAnime>>({
          type: "anilist/season",
          ...(entryId ? { entry_id: entryId } : {}),
        });
        this._wsSeason = r.items;
      } else if (view === "manga") {
        const r = await this.hass.callWS<WSListResponse<MangaItem>>({
          type: "anilist/manga",
          ...(entryId ? { entry_id: entryId } : {}),
        });
        this._wsManga = r.items;
      } else if (view === "profile") {
        this._wsProfile = await this.hass.callWS<WSProfileResponse>({
          type: "anilist/profile",
          ...(entryId ? { entry_id: entryId } : {}),
        });
      }
    } catch (err: unknown) {
      // WS failed — clear stale cache
      if (view === "airing") this._wsAiring = null;
      else if (view === "season") this._wsSeason = null;

      // For private views (watchlist/manga/profile), a WS failure likely means
      // the user is not admin (require_admin gate). Set cache to empty/sentinel
      // instead of null so the fallback entity scan is NOT triggered — entity
      // attributes still contain private data and would bypass the admin gate.
      if (view === "watchlist") { this._wsWatchlist = []; this._wsLoadedViews.add(view); }
      else if (view === "manga") { this._wsManga = []; this._wsLoadedViews.add(view); }
      else if (view === "profile") { this._wsProfile = null; this._wsLoadedViews.add(view); }
    } finally {
      this._wsLoading = false;
    }
  }

  /** Resolve a title value (string or MediaTitle) to display string. */
  private _title(t: string | MediaTitle | undefined): string {
    return resolveTitle(t, this._lang());
  }

  /** Resolve cover URL with quality preference and fallback. */
  private _coverUrl(item: { cover_image?: string; cover_images?: CoverImages }): string | undefined {
    const q = this._config.cover_quality ?? "large";
    if (item.cover_images) {
      return item.cover_images[q as keyof CoverImages] || item.cover_images.medium || item.cover_images.small;
    }
    return item.cover_image; // entity attribute fallback
  }

  /** Score position config with fallback. */
  private _scorePos(): string {
    return this._config.score_position ?? "top-right";
  }

  /**
   * Pick the right score for an item based on score_source config.
   * - "user": always user score
   * - "average": always average/community score
   * - "auto": user score if > 0 (rated), otherwise average score
   */
  private _pickScore(
    item: { score?: number; average_score?: number },
    view: "airing" | "season" | "watchlist" | "manga",
  ): number | undefined {
    const src = this._config.score_source ?? "auto";
    if (src === "user") return item.score || undefined;
    if (src === "average") return item.average_score || undefined;
    // Auto logic:
    if (view === "airing" || view === "season") return item.average_score || undefined;
    // Watchlist/Manga: user score if rated, otherwise average
    return (item.score && item.score > 0) ? item.score : (item.average_score || undefined);
  }

  /** Default layout mode per view type. */
  private _layoutMode(): "grid" | "list" {
    const cfg = this._config;
    if (cfg.layout_mode) return cfg.layout_mode;
    const view = cfg.view ?? "airing";
    if (view === "airing") return "list";
    if (view === "season") return "list";
    return "grid"; // watchlist, manga
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

  /** CSS classes for scroll container. Actual height set by _applyScrollHeight after render. */
  private _scrollClasses(): string {
    const cfg = this._config;
    if (!cfg.visible_items) return "";
    const classes = ["scroll-container", "grid-scroll"];
    if (cfg.scroll_snap !== false) classes.push("snap-scroll");
    if (cfg.scroll_fade !== false) classes.push("scroll-fade-wrap");
    return classes.join(" ");
  }

  /** Measure actual item height after render and set pixel-perfect max-height. */
  private _applyScrollHeights() {
    const vis = this._config?.visible_items;
    if (!vis || !this.shadowRoot) return;

    requestAnimationFrame(() => {
      const containers = this.shadowRoot!.querySelectorAll<HTMLElement>(".scroll-container");
      containers.forEach((c) => {
        const firstChild = c.querySelector(".list-item, .grid-item, .season-item") as HTMLElement | null;
        if (!firstChild) return;
        const itemH = firstChild.getBoundingClientRect().height;
        const gap = parseFloat(getComputedStyle(c).gap) || 8;
        const maxH = vis * (itemH + gap) - gap;
        c.style.maxHeight = `${maxH}px`;
        c.style.overflowY = "auto";
      });
    });
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
    if (c.card_opacity !== undefined) vars.push(`--al-bg-opacity: ${c.card_opacity / 100}`);
    if (c.border_color) vars.push(`--al-border-color: ${c.border_color}`);
    if (c.border_width !== undefined) vars.push(`--al-border-width: ${c.border_width}px`);
    if (c.border_radius !== undefined) vars.push(`--al-border-radius: ${c.border_radius}px`);
    return vars.join(";");
  }

  // ─── Main render ────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return nothing;
    const view = this._config.view ?? "airing";
    // Lazy-load data for current view via WebSocket (on view switch)
    if (!this._wsLoadedViews.has(view) && !this._wsLoadPromise && this.hass?.callWS) {
      this._triggerWSLoad();
    }
    // Schedule scroll height measurement after this render cycle
    if (this._config.visible_items) {
      this.updateComplete.then(() => this._applyScrollHeights());
    }
    const title = this._config.title ?? this._defaultTitle(view);
    const pad = this._padding();

    return html`
      <div class="card" style="${this._hostStyle()}">
        <div class="card-header" style="padding:${pad} ${pad}">
          <span class="brand-dot"></span>
          <span class="header-title">${title}</span>
        </div>
        <div class="card-content" style="padding:${pad}">
          ${this._config.show_search ? this._renderSearch() : nothing}
          ${this._wsLoading ? html`<div class="loading-bar"></div>` : nothing}
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
          aria-label=${this._t("search_placeholder")}
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
      REPEATING: this._t("repeating"),
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
    items = items.filter((i) => this._matchesSearch(this._title(i.title)));

    if (!items.length) return this._renderEmpty("no_episodes");

    const { w, h } = this._coverDims();
    const cfg = this._config;
    const lang = this._lang();

    const scrollC = this._scrollClasses();
    const sPos = this._scorePos();
    return html`
      <div class="list ${scrollC}">
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "airing"); return html`
          <div
            class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${this._t("episode")} ${item.episode}` : ""}
          >
            ${cfg.show_cover ? html`
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl
                  ? html`<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />`
                  : html`<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>?</span></div>`
                }
                ${renderScoreOverlay(sc, sPos)}
              </div>
            ` : nothing}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">
                ${this._t("episode")} ${item.episode}
                ${cfg.show_duration && item.duration ? html` · ${item.duration}${this._t("min")}` : nothing}
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
                  ? html`<span class="status-badge airing">${this._t("airing")}</span>`
                  : nothing}
              </div>
            </div>
          </div>
        `; })}
      </div>
    `;
  }

  private _getAiringItems(): AiringAnime[] {
    const max = this._maxFor("airing");
    let items: AiringAnime[];

    // Prefer WebSocket data
    if (this._wsAiring) {
      items = [...this._wsAiring];
    } else {
      // If entry_id is configured, don't scan entities (could be wrong account)
      if (this._config.entry_id) return [];

      // Fallback: read from entity attributes
      items = [];
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

      // Fallback to simple sensors (English translation_key IDs only)
      if (!items.length) {
        const title = getEntityState(this.hass, "sensor.anilist_next_airing_anime");
        const time = getEntityState(this.hass, "sensor.anilist_next_episode_time");
        if (title && title !== "unknown") {
          items.push({ media_id: 0, title, episode: 1, airing_at: time });
        }
      }
    }

    // Sort
    const sort = this._config.sort_by;
    if (sort === "title") items.sort((a, b) => this._title(a.title).localeCompare(this._title(b.title)));
    else if (sort === "score") items.sort((a, b) => (b.average_score ?? 0) - (a.average_score ?? 0));

    return items.slice(0, max);
  }

  // ─── View: Watchlist ────────────────────────────────────────────────────

  private _renderWatchlist() {
    const statuses = this._config.watchlist_statuses ?? ["CURRENT"];
    const showTabs = this._config.show_status_tabs && statuses.length > 1;
    // Auto-select first configured status if activeTab is invalid
    if (showTabs && !statuses.includes(this._activeTab)) {
      this._activeTab = statuses[0] ?? "CURRENT";
    }
    let items = this._getWatchlistItems();

    // Filter by active tab
    if (showTabs) {
      items = items.filter((i) => i.status === this._activeTab);
    } else {
      items = items.filter((i) => statuses.includes(i.status));
    }
    items = items.filter((i) => this._matchesSearch(this._title(i.title)));

    // Apply overflow mode
    const useScroll = this._config.overflow_mode === "scroll";
    if (!useScroll) {
      items = items.slice(0, this._maxFor("watchlist"));
    }

    return html`
      ${showTabs ? this._renderStatusTabs(statuses) : nothing}
      ${items.length
        ? (this._layoutMode() === "list"
            ? this._renderWatchlistList(items)
            : this._renderWatchlistGrid(items))
        : this._renderEmpty("no_watchlist")}
    `;
  }

  private _renderWatchlistList(items: WatchlistAnime[]) {
    const cfg = this._config;
    const scrollC = this._scrollClasses();
    const sPos = this._scorePos();
    const lang = this._lang();
    const { w, h } = this._coverDims();
    return html`
      <div class="list ${scrollC}">
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "watchlist"); return html`
          <div class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}>
            ${cfg.show_cover ? html`
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl ? html`<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />` : html`<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>${t[0]}</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>` : nothing}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">
                ${this._t("ep")} ${item.progress}${item.episodes ? `/${item.episodes}` : ""}
                ${cfg.show_next_airing !== false && item.next_airing_episode
                  ? html` · <span class="countdown">${countdown(item.next_airing_episode.airing_at, "relative", lang)}</span>` : nothing}
              </div>
              ${cfg.show_progress_bar && item.episodes ? html`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (item.progress / item.episodes) * 100)}%"></div></div>
              ` : nothing}
            </div>
          </div>
        `; })}
      </div>
    `;
  }

  private _renderWatchlistGrid(items: WatchlistAnime[]) {
    const cfg = this._config;
    const scrollC = this._scrollClasses();
    const fallbackScroll = !cfg.visible_items && cfg.overflow_mode === "scroll"
      ? `max-height:${cfg.scroll_height ?? 400}px;overflow-y:auto` : "";
    const sPos = this._scorePos();
    const lang = this._lang();
    return html`
      <div class="grid ${scrollC || (fallbackScroll ? "grid-scroll" : "")}"
        style=${fallbackScroll}>
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "watchlist"); return html`
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${item.progress}/${item.episodes ?? "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && cUrl
                ? html`<img class="grid-cover" src=${cUrl} alt=${t} loading="lazy" />`
                : html`<div class="grid-cover cover-placeholder"><span>${t[0] ?? "?"}</span></div>`
              }
              ${renderScoreOverlay(sc, sPos)}
              ${cfg.show_next_airing !== false && item.next_airing_episode
                ? html`<div class="next-ep-badge">${countdown(item.next_airing_episode.airing_at, "relative", lang)}</div>`
                : nothing}
            </div>
            <div class="grid-title">${renderScoreInline(sc, sPos)}${t}</div>
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
        `; })}
      </div>
    `;
  }

  private _getWatchlistItems(): WatchlistAnime[] {
    // wsWatchlist is [] when WS was attempted (incl. admin-denied), null only before first attempt
    if (this._wsWatchlist !== null) return [...this._wsWatchlist];

    // If entry_id is configured, don't scan entities (could be wrong account)
    if (this._config.entry_id) return [];

    // Fallback: entity attributes
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
    items = items.filter((i) => this._matchesSearch(this._title(i.title)));

    if (!items.length) return this._renderEmpty("no_season");

    const cfg = this._config;
    const { w, h } = this._coverDims();

    const scrollC = this._scrollClasses();
    const sPos = this._scorePos();
    return html`
      <div class="season-scroll ${scrollC}">
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "season"); return html`
          <div
            class="season-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${item.genres?.join(", ") ?? ""}` : ""}
          >
            ${cfg.show_cover ? html`
              <div class="cover-wrap" style="width:${w - 8}px;height:${h - 12}px">
                ${cUrl
                  ? html`<img class="season-cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w - 8}px;height:${h - 12}px" />`
                  : html`<div class="season-cover cover-placeholder" style="width:${w - 8}px;height:${h - 12}px"><span>${t[0]}</span></div>`
                }
                ${renderScoreOverlay(sc, sPos)}
              </div>
            ` : nothing}
            <div class="season-info">
              <div class="season-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="season-meta">
                ${sPos !== "inline" && sc
                  ? html`<span class="score-chip">★${fmtScore(sc)}</span>`
                  : nothing}
                ${item.format
                  ? html`<span class="format-chip">${item.format}</span>`
                  : nothing}
              </div>
            </div>
          </div>
        `; })}
      </div>
    `;
  }

  private _getSeasonItems(): SeasonAnime[] {
    const max = this._maxFor("season");
    const cfg = this._config;
    let items: SeasonAnime[];

    if (this._wsSeason) {
      items = [...this._wsSeason];
    } else {
      // If entry_id is configured, don't scan entities (could be wrong account)
      if (this._config.entry_id) return [];

      // Fallback: entity attributes
      items = [];
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
    }

    // Apply genre filter (client-side for WS data too — allows real-time search)
    let filtered = items;
    if (cfg.genre_filter?.length) {
      const gf = new Set(cfg.genre_filter);
      filtered = filtered.filter((i) => i.genres?.some((g) => gf.has(g)));
    }
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
    // Auto-select first configured status if activeTab is invalid
    if (showTabs && !statuses.includes(this._activeTab)) {
      this._activeTab = statuses[0] ?? "CURRENT";
    }
    let items = this._getMangaItems();

    if (showTabs) {
      items = items.filter((i) => i.status === this._activeTab);
    } else {
      items = items.filter((i) => statuses.includes(i.status));
    }
    items = items.filter((i) => this._matchesSearch(this._title(i.title)));

    const useScroll = this._config.overflow_mode === "scroll";
    if (!useScroll) {
      items = items.slice(0, this._maxFor("manga"));
    }

    return html`
      ${showTabs ? this._renderStatusTabs(statuses) : nothing}
      ${items.length
        ? (this._layoutMode() === "list"
            ? this._renderMangaList(items)
            : this._renderMangaGrid(items))
        : this._renderEmpty("no_manga")}
    `;
  }

  private _renderMangaList(items: MangaItem[]) {
    const cfg = this._config;
    const scrollC = this._scrollClasses();
    const sPos = this._scorePos();
    const { w, h } = this._coverDims();
    return html`
      <div class="list ${scrollC}">
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "manga"); return html`
          <div class="list-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}>
            ${cfg.show_cover ? html`
              <div class="cover-wrap" style="width:${w}px;height:${h}px">
                ${cUrl ? html`<img class="cover" src=${cUrl} alt=${t} loading="lazy" style="width:${w}px;height:${h}px" />` : html`<div class="cover cover-placeholder" style="width:${w}px;height:${h}px"><span>${t[0]}</span></div>`}
                ${renderScoreOverlay(sc, sPos)}
              </div>` : nothing}
            <div class="item-info">
              <div class="item-title">${renderScoreInline(sc, sPos)}${t}</div>
              <div class="item-sub">${this._t("ch")} ${item.progress}${item.chapters ? `/${item.chapters}` : ""}${item.volumes ? ` · ${this._t("vol")} ${item.progress_volumes}` : ""}</div>
              ${cfg.show_progress_bar && item.chapters ? html`
                <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (item.progress / item.chapters) * 100)}%"></div></div>
              ` : nothing}
            </div>
          </div>
        `; })}
      </div>
    `;
  }

  private _renderMangaGrid(items: MangaItem[]) {
    const cfg = this._config;
    const scrollC = this._scrollClasses();
    const fallbackScroll = !cfg.visible_items && cfg.overflow_mode === "scroll"
      ? `max-height:${cfg.scroll_height ?? 400}px;overflow-y:auto` : "";
    const sPos = this._scorePos();
    return html`
      <div class="grid ${scrollC || (fallbackScroll ? "grid-scroll" : "")}"
        style=${fallbackScroll}>
        ${items.map((item) => { const t = this._title(item.title); const cUrl = this._coverUrl(item); const sc = this._pickScore(item, "manga"); return html`
          <div
            class="grid-item"
            @click=${() => this._handleClick(item.site_url)}
            @keydown=${(e: KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && this._shouldLink()) { e.preventDefault(); this._handleClick(item.site_url); }}}
            role=${this._shouldLink() && item.site_url ? "button" : nothing}
            tabindex=${this._shouldLink() && item.site_url ? "0" : nothing}
            style=${this._shouldLink() && item.site_url ? "cursor:pointer" : ""}
            title=${cfg.show_tooltips ? `${t} - ${this._t("ch")}${item.progress}/${item.chapters ?? "?"}` : ""}
          >
            <div class="grid-cover-wrap">
              ${cfg.show_cover && cUrl
                ? html`<img class="grid-cover" src=${cUrl} alt=${t} loading="lazy" />`
                : html`<div class="grid-cover cover-placeholder"><span>${t[0] ?? "?"}</span></div>`
              }
              ${renderScoreOverlay(sc, sPos)}
            </div>
            <div class="grid-title">${renderScoreInline(sc, sPos)}${t}</div>
            ${cfg.show_progress && cfg.show_progress_bar && item.chapters
              ? html`
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${Math.min(100, (item.progress / item.chapters) * 100)}%"></div>
                </div>
                <div class="progress-label">${this._t("ch")} ${item.progress}/${item.chapters}</div>
              `
              : cfg.show_progress && item.progress
                ? html`<div class="progress-label">${this._t("ch")} ${item.progress}${item.volumes ? ` · ${this._t("vol")} ${item.progress_volumes}` : ""}</div>`
                : nothing
            }
          </div>
        `; })}
      </div>
    `;
  }

  private _getMangaItems(): MangaItem[] {
    // wsManga is [] when WS was attempted (incl. admin-denied), null only before first attempt
    if (this._wsManga !== null) return [...this._wsManga];

    // If entry_id is configured, don't scan entities (could be wrong account)
    if (this._config.entry_id) return [];

    // Fallback: entity attributes
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
    // Prefer WebSocket profile data
    const p = this._wsProfile;

    let animeCount: string;
    let episodes: string;
    let hours: string;
    let animeScore: string;
    let mangaScore: string;
    let watching: string;
    let chaptersRead: string;
    let mangaCount: string;
    let topGenres: string[];
    let favourites: Array<{ title: string; site_url?: string; cover?: string }>;
    let viewerName: string | undefined;
    let viewerAvatar: string | undefined;

    if (p && p.is_authenticated) {
      const s = p.stats;
      animeCount = String(s.anime_count ?? 0);
      episodes = String(s.episodes_watched ?? 0);
      hours = String(s.minutes_watched ? Math.round(s.minutes_watched / 60 * 10) / 10 : 0);
      animeScore = String(s.anime_mean_score ? Math.round(s.anime_mean_score / 10 * 10) / 10 : 0);
      mangaScore = String(s.manga_mean_score ? Math.round(s.manga_mean_score / 10 * 10) / 10 : 0);
      watching = "";
      chaptersRead = String(s.chapters_read ?? 0);
      mangaCount = String(s.manga_count ?? 0);
      topGenres = p.top_genres.map((g) => g.genre);
      favourites = p.favourite_anime.map((f) => ({
        title: this._title(f.title),
        site_url: f.site_url,
        cover: f.cover_image,
      }));
      viewerName = p.viewer.name;
      viewerAvatar = p.viewer.avatar;
    } else {
      // Don't fall back to entity attributes when WS was attempted (incl. admin-denied)
      // or when entry_id is configured — entity attrs contain private data
      if (this._wsLoadedViews.has("profile") || this._config.entry_id) {
        return this._renderEmpty("no_profile");
      }

      // Fallback: entity states (only when WS has not been attempted yet)
      animeCount = getEntityState(this.hass, "sensor.anilist_total_anime_watched");
      episodes = getEntityState(this.hass, "sensor.anilist_total_episodes_watched");
      hours = getEntityState(this.hass, "sensor.anilist_total_hours_watched");
      animeScore = getEntityState(this.hass, "sensor.anilist_anime_mean_score");
      mangaScore = getEntityState(this.hass, "sensor.anilist_manga_mean_score");
      watching = getEntityState(this.hass, "sensor.anilist_watching_count");
      chaptersRead = getEntityState(this.hass, "sensor.anilist_chapters_read");
      mangaCount = getEntityState(this.hass, "sensor.anilist_manga_reading_count");

      const topGenreEntity = this.hass.states["sensor.anilist_top_genre"];
      topGenres = (topGenreEntity?.attributes?.["top_genres"] ?? []) as string[];
      favourites = (topGenreEntity?.attributes?.["favourite_anime"] ?? []) as Array<{
        title: string; site_url?: string; cover?: string;
      }>;
      viewerName = topGenreEntity?.attributes?.["viewer_name"] as string | undefined;
      viewerAvatar = topGenreEntity?.attributes?.["viewer_avatar"] as string | undefined;
    }

    const hasStats = animeCount && animeCount !== "unknown" && animeCount !== "0" || p?.is_authenticated;

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
          ${p?.top_genres?.length
            ? this._renderGenreChartWithCounts(p.top_genres)
            : this._renderGenreChart(topGenres)}
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

  private _renderGenreChartWithCounts(genres: { genre: string; count: number }[]) {
    const chartType = this._config.chart_type ?? "bar";
    const maxCount = 5;
    const sliced = genres.slice(0, maxCount);

    if (chartType === "tags") {
      return html`
        <div class="genre-chips">
          ${sliced.map((g) => html`<span class="genre-chip">${g.genre} (${g.count})</span>`)}
        </div>
      `;
    }

    if (chartType === "donut") {
      const total = sliced.reduce((s, g) => s + g.count, 0) || 1;
      const colors = ["#3DB4F2", "#C063FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];
      let cumulative = 0;
      const segments = sliced.map((g, i) => {
        const pct = (g.count / total) * 100;
        const start = cumulative;
        cumulative += pct;
        return { genre: g.genre, count: g.count, start, pct, color: colors[i % colors.length] };
      });
      const gradientParts = segments.map((s) => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(", ");
      return html`
        <div class="donut-wrap">
          <div class="donut" style="background: conic-gradient(${gradientParts})"></div>
          <div class="donut-legend">
            ${segments.map((s) => html`
              <div class="legend-item">
                <span class="legend-dot" style="background:${s.color}"></span>
                <span>${s.genre} (${s.count})</span>
              </div>
            `)}
          </div>
        </div>
      `;
    }

    // Default: bar chart with real proportional widths
    const maxVal = sliced[0]?.count || 1;
    return html`
      <div class="bar-chart">
        ${sliced.map((g) => html`
          <div class="bar-row">
            <span class="bar-label">${g.genre}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width:${(g.count / maxVal) * 100}%"></div>
            </div>
            <span class="bar-count">${g.count}</span>
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
      --al-bg-opacity: 1;
    }

    .card {
      background: rgba(0, 0, 0, 0); /* transparent base — actual bg via ::before */
      position: relative;
      border: var(--al-border-width) solid var(--al-border-color);
      border-radius: var(--al-border-radius);
      overflow: hidden;
      font-family: var(--primary-font-family, sans-serif);
      color: var(--al-text);
    }
    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--al-card-bg);
      opacity: var(--al-bg-opacity);
      z-index: 0;
      border-radius: inherit;
    }
    .card > * {
      position: relative;
      z-index: 1;
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

    /* ─── Cover wrap & score overlay ──────────────────────────────── */
    .cover-wrap, .grid-cover-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .score-overlay {
      position: absolute;
      background: linear-gradient(135deg, var(--al-accent), var(--al-secondary));
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
      z-index: 1;
    }
    .score-overlay.top-left { top: 4px; left: 4px; }
    .score-overlay.top-right { top: 4px; right: 4px; }
    .score-overlay.bottom-left { bottom: 4px; left: 4px; }
    .score-overlay.bottom-right { bottom: 4px; right: 4px; }
    .score-inline {
      font-weight: 700;
      color: var(--al-accent);
      margin-right: 4px;
      font-size: 0.75rem;
    }
    .next-ep-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(0,0,0,0.75);
      color: var(--al-accent);
      font-size: 0.6rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      text-align: center;
      backdrop-filter: blur(4px);
      z-index: 1;
    }

    /* ─── Scroll snap & fade ─────────────────────────────────────── */
    .snap-scroll {
      scroll-snap-type: y mandatory;
    }
    .snap-scroll > .list-item,
    .snap-scroll > .season-item,
    .snap-scroll > .grid-item {
      scroll-snap-align: start;
    }

    .scroll-fade-wrap {
      position: relative;
      -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
      mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
    }

    /* ─── Loading ───────────────────────────────────────────────────── */
    .loading-bar {
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--al-accent), transparent);
      animation: loading-slide 1.2s ease-in-out infinite;
      margin-bottom: 4px;
    }
    @keyframes loading-slide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

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
    .bar-count {
      font-size: 0.7rem;
      color: var(--al-sub);
      min-width: 24px;
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
