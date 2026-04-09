# Automations

This document covers events, automation examples, templates, and conditions for the AniList Home Assistant integration.

---

## Events

### `anilist_episode_airing`

Fired when an episode within the configured airing window has aired. This is polling-based: the coordinator checks the AniList airing schedule every update cycle (default: 15 minutes) and fires an event for each episode whose `airingAt` timestamp has passed since the last poll.

**Event data fields:**

| Field | Type | Description |
|-------|------|-------------|
| `media_id` | int | AniList media ID |
| `title` | string | Anime title (uses configured title language) |
| `episode` | int | Episode number that aired |
| `aired_at` | string | ISO 8601 timestamp of the airing time |
| `cover_image` | string | URL to the cover image |
| `site_url` | string | URL to the AniList page for this anime |

**Example event data:**

```json
{
  "event_type": "anilist_episode_airing",
  "data": {
    "media_id": 163146,
    "title": "Oshi no Ko Season 2",
    "episode": 8,
    "aired_at": "2026-04-09T17:00:00+00:00",
    "cover_image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163146-abc123.jpg",
    "site_url": "https://anilist.co/anime/163146"
  }
}
```

---

## Automation Examples

### 1. New Episode Notification (Mobile Push with Image)

Send a push notification with cover art when a new episode airs.

```yaml
automation:
  - alias: "AniList - New episode notification"
    trigger:
      - platform: event
        event_type: anilist_episode_airing
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "New Episode Available"
          message: >-
            {{ trigger.event.data.title }} - Episode {{ trigger.event.data.episode }}
          data:
            image: "{{ trigger.event.data.cover_image }}"
            url: "{{ trigger.event.data.site_url }}"
            clickAction: "{{ trigger.event.data.site_url }}"
```

### 2. Daily Airing Summary at 8 AM

Get a summary of all anime airing today, delivered once each morning.

```yaml
automation:
  - alias: "AniList - Daily airing summary"
    trigger:
      - platform: time
        at: "08:00:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.anilist_airing_today
        above: 0
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "Anime Airing Today"
          message: >-
            {{ states('sensor.anilist_airing_today') }} anime airing today:
            {% for entry in state_attr('sensor.anilist_airing_today', 'entries') %}
            - {{ entry.title }} (Ep {{ entry.episode }})
            {% endfor %}
```

### 3. Weekly Watchlist Progress Report

Send a weekly summary of your watchlist progress every Sunday evening.

```yaml
automation:
  - alias: "AniList - Weekly progress report"
    trigger:
      - platform: time
        at: "20:00:00"
    condition:
      - condition: time
        weekday:
          - sun
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "Weekly Anime Progress"
          message: >-
            Currently watching: {{ states('sensor.anilist_watching_count') }} anime
            Episodes this week: {{ states('sensor.anilist_episodes_this_week') }}
            {% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
            {% if entries %}
            {% for entry in entries %}
            - {{ entry.title }}: {{ entry.progress }}/{{ entry.episodes | default('?') }}
            {% endfor %}
            {% endif %}
```

### 4. New Season Notification (Airing Today Sensor Changes)

Get notified when the number of anime airing today changes, indicating a new airing day has started.

```yaml
automation:
  - alias: "AniList - New anime airing today"
    trigger:
      - platform: state
        entity_id: sensor.anilist_airing_today
    condition:
      - condition: template
        value_template: >-
          {{ trigger.to_state.state | int(0) > trigger.from_state.state | int(0) }}
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "Anime Schedule Updated"
          message: >-
            {{ states('sensor.anilist_airing_today') }} anime airing today
            (was {{ trigger.from_state.state }}).
```

### 5. Watch Time Milestone Notification

Notify when total hours watched crosses a milestone threshold. This uses a template sensor that you define in your `configuration.yaml` to track cumulative watch time, then triggers at each 100-hour boundary.

```yaml
template:
  - sensor:
      - name: "AniList Total Hours Watched"
        unique_id: anilist_total_hours_watched
        unit_of_measurement: "hours"
        state: >-
          {% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
          {% if entries %}
            {% set ns = namespace(total=0) %}
            {% for entry in entries %}
              {% set duration = entry.duration | default(24) %}
              {% set progress = entry.progress | default(0) %}
              {% set ns.total = ns.total + (progress * duration / 60) %}
            {% endfor %}
            {{ ns.total | round(1) }}
          {% else %}
            0
          {% endif %}

automation:
  - alias: "AniList - Watch time milestone"
    trigger:
      - platform: template
        value_template: >-
          {{ (states('sensor.anilist_total_hours_watched') | float(0) / 100)
             | round(0, 'floor')
             != ((states('sensor.anilist_total_hours_watched') | float(0) - 0.5) / 100)
             | round(0, 'floor') }}
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "Anime Milestone!"
          message: >-
            You have watched over
            {{ (states('sensor.anilist_total_hours_watched') | float(0) / 100)
               | round(0, 'floor') * 100 }} hours of anime!
```

### 6. Genre-Based Notification (Notify Only for Specific Genres)

Only send a notification when an episode airs for an anime that matches specific genres. This requires that the airing schedule entries include genre data in the sensor attributes.

```yaml
automation:
  - alias: "AniList - Action anime notification"
    trigger:
      - platform: event
        event_type: anilist_episode_airing
    condition:
      - condition: template
        value_template: >-
          {% set airing = state_attr('sensor.anilist_airing_today', 'entries') %}
          {% set media_id = trigger.event.data.media_id %}
          {% set match = airing | selectattr('media_id', 'eq', media_id) | list %}
          {% if match | length > 0 %}
            {{ 'Action' in match[0].genres or 'Thriller' in match[0].genres }}
          {% else %}
            false
          {% endif %}
    action:
      - service: notify.mobile_app_my_phone
        data:
          title: "Action Anime - New Episode"
          message: >-
            {{ trigger.event.data.title }} Episode {{ trigger.event.data.episode }}
            is now available.
          data:
            image: "{{ trigger.event.data.cover_image }}"
```

---

## Template Examples

### List All Airing Anime Today from Sensor Attributes

Display a formatted list of all anime airing today.

```jinja2
{% set entries = state_attr('sensor.anilist_airing_today', 'entries') %}
{% if entries and entries | length > 0 %}
  Airing today ({{ entries | length }} anime):
  {% for entry in entries %}
  - {{ entry.title }} (Episode {{ entry.episode }}, {{ entry.aired_at | as_datetime | as_local | as_timestamp | timestamp_custom('%H:%M') }})
  {% endfor %}
{% else %}
  No anime airing today.
{% endif %}
```

### Show Watchlist Progress as Percentage

Calculate overall watchlist completion.

```jinja2
{% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
{% if entries and entries | length > 0 %}
  {% set ns = namespace(watched=0, total=0) %}
  {% for entry in entries %}
    {% if entry.episodes and entry.episodes > 0 %}
      {% set ns.watched = ns.watched + entry.progress | default(0) %}
      {% set ns.total = ns.total + entry.episodes %}
    {% endif %}
  {% endfor %}
  {% if ns.total > 0 %}
    Watchlist progress: {{ ns.watched }}/{{ ns.total }} episodes ({{ (ns.watched / ns.total * 100) | round(1) }}%)
  {% else %}
    Watchlist progress: unknown (no episode counts available)
  {% endif %}
{% else %}
  No anime on watchlist.
{% endif %}
```

### Calculate Remaining Episodes Across Watchlist

Show how many episodes are left to watch across all currently watching anime.

```jinja2
{% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
{% if entries and entries | length > 0 %}
  {% set ns = namespace(remaining=0, unknown=0) %}
  {% for entry in entries %}
    {% if entry.episodes and entry.episodes > 0 %}
      {% set ns.remaining = ns.remaining + (entry.episodes - entry.progress | default(0)) %}
    {% else %}
      {% set ns.unknown = ns.unknown + 1 %}
    {% endif %}
  {% endfor %}
  {{ ns.remaining }} episodes remaining{% if ns.unknown > 0 %} ({{ ns.unknown }} anime with unknown episode count){% endif %}
{% else %}
  No anime on watchlist.
{% endif %}
```

### Next Episode Countdown as Human-Readable String

Display a countdown to the next airing episode.

```jinja2
{% set next_time = states('sensor.anilist_next_episode_time') %}
{% set next_title = states('sensor.anilist_next_episode_title') %}
{% if next_time and next_time not in ['unknown', 'unavailable'] %}
  {% set delta = as_datetime(next_time) - now() %}
  {% set total_seconds = delta.total_seconds() | int %}
  {% if total_seconds > 0 %}
    {% set days = (total_seconds // 86400) | int %}
    {% set hours = ((total_seconds % 86400) // 3600) | int %}
    {% set minutes = ((total_seconds % 3600) // 60) | int %}
    {{ next_title }} airs in
    {%- if days > 0 %} {{ days }}d{% endif %}
    {%- if hours > 0 %} {{ hours }}h{% endif %}
    {%- if minutes > 0 %} {{ minutes }}m{% endif %}
  {% else %}
    {{ next_title }} is airing now!
  {% endif %}
{% else %}
  No upcoming episodes scheduled.
{% endif %}
```

---

## Condition Examples

### Only During Anime Airing Hours

Restrict automations to typical anime broadcast hours (afternoon and evening, Japanese time translates to morning/afternoon UTC).

```yaml
condition:
  - condition: time
    after: "14:00:00"
    before: "03:00:00"
```

### Only if a Specific Anime Is in the Watchlist

Check whether a particular anime (by title) is on the currently watching list before triggering.

```yaml
condition:
  - condition: template
    value_template: >-
      {% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
      {% if entries %}
        {{ entries | selectattr('title', 'search', 'Oshi no Ko') | list | length > 0 }}
      {% else %}
        false
      {% endif %}
```

### Only on Days with New Episodes

Only fire when there is at least one anime airing today.

```yaml
condition:
  - condition: numeric_state
    entity_id: sensor.anilist_airing_today
    above: 0
```

### Only for Anime on Your Watchlist

When receiving an `anilist_episode_airing` event, check if the anime is on your watchlist before notifying.

```yaml
condition:
  - condition: template
    value_template: >-
      {% set entries = state_attr('sensor.anilist_watching_count', 'entries') %}
      {% if entries %}
        {{ entries | selectattr('media_id', 'eq', trigger.event.data.media_id) | list | length > 0 }}
      {% else %}
        false
      {% endif %}
```
