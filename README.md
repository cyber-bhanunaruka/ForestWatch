# Forest Watch — Global Deforestation Monitor

> A FAANG-level UX case study and interactive geospatial dashboard built with **Vue 3**, **Pinia**, **Mapbox GL JS**, and **D3.js**. Structured as a complete product design narrative: **problem → research → UX strategy → UI → code → impact**.

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vuedotjs)
![Pinia](https://img.shields.io/badge/Pinia-2.x-ffd859?style=flat-square)
![Mapbox](https://img.shields.io/badge/Mapbox-GL_JS-4264fb?style=flat-square&logo=mapbox)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## Overview

ForestWatch is an interactive forest conservation monitoring platform that visualizes global deforestation data through an immersive map-based dashboard. The project is structured as a complete **product design case study** — the kind you'd present in a FAANG portfolio review — walking through every stage from problem identification to measurable impact.

### Case Study Structure

| Section | Description |
|---------|------------|
| **01 — Problem** | Context, problem statement, design goals, quantified pain points |
| **02 — Research** | Target users, pain points, personas, key insights |
| **03 — UX Strategy** | Core features, user flow, FAANG-level advanced patterns |
| **04 — Dashboard** | Interactive Mapbox map with clustering, search, filters, timeline |
| **05 — Impact** | Before/after metrics demonstrating measurable outcomes |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Vue 3** (Composition API) | Reactive UI with composables architecture |
| **Pinia** | Centralized state management (search, filters, active region) |
| **Mapbox GL JS** | WebGL-powered 3D globe with heatmap, clustering & symbol layers |
| **D3.js** | SVG-based timeline chart with animated transitions |
| **Turf.js** | Geospatial analysis utilities |
| **Vite** | Lightning-fast dev server and build tooling |

---

## Prerequisites

Before you start, make sure you have:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (comes with Node.js)
- **Mapbox Access Token** — free at [mapbox.com/account](https://account.mapbox.com/access-tokens/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd forest-watch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Mapbox token

Create or edit the `.env` file in the project root:

```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ...your_token_here
```

> **How to get a token:**
> 1. Sign up at [mapbox.com](https://www.mapbox.com/)
> 2. Go to [Account → Access Tokens](https://account.mapbox.com/access-tokens/)
> 3. Copy your **Default public token** (starts with `pk.`)
> 4. Paste it into the `.env` file

### 4. Start the development server

```bash
npm run dev
```

The app opens automatically at **http://localhost:3000**

### 5. Build for production

```bash
npm run build
```

Output goes to the `dist/` directory. Preview the production build:

```bash
npm run preview
```

---

## Project Structure

```
forest-watch/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── NavBar.vue            # Fixed nav with scroll detection
│   │   ├── HeroSection.vue       # Case study hero with metadata
│   │   ├── ProblemSection.vue     # Context, statement, goals, pain points
│   │   ├── ResearchSection.vue    # Users, pain points, personas, insights
│   │   ├── UxStrategySection.vue  # Core features, UX flow, advanced patterns
│   │   ├── MapDashboard.vue       # Sidebar + map + search/filter + timeline toggle
│   │   ├── RegionPanel.vue        # Region detail overlay with description
│   │   ├── TimelineChart.vue      # SVG chart (2000–2024 loss vs gain)
│   │   ├── ImpactSection.vue      # Before/after impact metrics
│   │   └── FooterSection.vue      # Site footer
│   ├── composables/
│   │   ├── useMap.js              # Mapbox init, clustering, GeoJSON, flyTo
│   │   └── useAnimatedCounter.js  # Animated number transitions
│   ├── stores/
│   │   └── forestStore.js         # Pinia store (search, filters, regions)
│   ├── data/
│   │   └── forestData.js          # 12 regions, 38 deforestation points, timeline
│   ├── utils/
│   │   ├── formatters.js          # Number, area, percent formatters
│   │   └── debounce.js            # Debounce utility for search
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env                           # Mapbox token (create this)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Features

### FAANG-Level UX Patterns

- **Map as primary interface** — the globe IS the application
- **Marker clustering** — 38 deforestation points cluster/expand by zoom level
- **Search with debounce** — filters sidebar + map reactively via Pinia
- **Threat-level filtering** — pill buttons filter by critical / high / moderate / low
- **Smooth flyTo** — eased camera transitions with pitch and bearing shifts
- **Progressive disclosure** — summary → detail → timeline → comparison
- **State management (Pinia)** — single source of truth for all app state

### Interactive Globe Map
- 3D globe projection with atmospheric fog
- Heatmap layer showing deforestation intensity (fades at high zoom)
- Clustered point layer with count bubbles
- Clickable region markers with fly-to animations
- Popup details on individual deforestation events
- Dynamic legend with severity gradient

### Regional Analysis
- 12 monitored forest regions worldwide (expanded from 6)
- Threat level classification (critical → low)
- Forest cover remaining progress bar
- Biodiversity index, carbon stock, annual loss metrics
- Region description and biome classification

### Timeline Visualization
- SVG chart covering 2000–2024
- Forest loss vs. gain trend lines
- Net loss calculation with dashed overlay
- Hover tooltips with exact values

### Case Study Narrative
- Problem statement with context and design goals
- 3 target user types with descriptions
- 3 structured pain points
- 3 user personas with pain/goal breakdown
- 4 research insights with supporting detail
- UX strategy with 5-step user flow
- 6 FAANG-level advanced patterns checklist
- 4 before/after impact metrics

---

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_MAPBOX_TOKEN` | Yes | Your Mapbox GL JS public access token |

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Pinia** over Vuex | Lighter, Composition-API-native, TypeScript-friendly |
| **Mapbox cluster source** | Native WebGL clustering outperforms JS-side solutions at 50+ points |
| **Debounced search** | 250ms debounce prevents layout thrash during rapid typing |
| **Composable pattern** | `useMap` encapsulates all Mapbox logic away from components |
| **CSS custom properties** | Single theme file enables future theming / white-label support |
| **Dark theme** | Reduces eye strain; creates contrast for heatmap overlays |
| **Globe projection** | Provides geographic context that flat maps distort |
| **Glass morphism** | Layered transparency creates depth without competing with map data |

---

## License

MIT
