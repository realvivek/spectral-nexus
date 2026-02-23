# Spectral Nexus — Cowork Context

**Paste this into your first Cowork session so Claude has full project context.**

---

## What Is This Project?

Spectral Nexus is a telecom infrastructure opportunity intelligence dashboard. It helps telecom companies (like Boldyn Networks, NTT DATA) identify broadband deployment opportunities across US counties by scoring them on coverage gaps, funding availability, demographics, and infrastructure readiness.

## Current State (v0.2.0)

- **200 counties** across 10 states: TX, LA, GA, VA, MT, IA, SC, CA, OH, NM
- **Scoring engine:** Composite opportunity score (0-100) from 6 weighted factors
- **Interactive map:** Leaflet choropleth with county popups
- **Data table:** Sortable, filterable, row-click highlights on map
- **Charts:** Scatter (density vs gap), Top 10 bar, score histogram
- **Insights:** Top Opportunities, Most Underserved, Quick Wins, ROI, Emerging Markets
- **Grant tracking:** 12 federal programs, 20+ state programs, RDOF defaults data
- **Tech:** Pure vanilla JS, no build step, `window.SN` namespace, dark theme

## Key Files

- `public/index.html` — Entry point (open in browser to run)
- `src/js/config.js` — Scoring weights, BEAD status, map settings
- `src/js/data.js` — County dataset (200 counties, mock BSL data)
- `src/js/data-grants.js` — Grant programs database
- `src/js/data-awards.js` — RDOF results and defaults
- `src/js/scoring.js` — Score computation engine
- `src/js/app.js` — Main controller
- `src/css/style.css` — All styles (dark spectral theme)
- `docs/SPECTRAL_NEXUS_PROJECT_DOC.md` — Living project doc
- `docs/SPECTRAL_NEXUS_V03_STRATEGY.md` — Full v0.3.0 strategy (23 features)

## v0.3.0 Priorities

1. **Replace mock data with real FCC BDC** bulk downloads (BSL counts)
2. **RDOF default mapping** at county level (Census Block Group → county FIPS crosswalk)
3. **Grant Stacking Calculator** — determine all applicable programs per county
4. **Fundability Score** (0-100) — new scoring dimension based on total available funding
5. **PDF export** — generate investment memos per county
6. **Time-series snapshots** — start tracking score changes over time

## Important Context

- **RDOF defaults** ($3.3B / 1.9M locations) represent a huge opportunity. Default zones have proven demand + zero competition.
- **The moat is NOT the code** — it's the curated, maintained data layer (grant program details, deadlines, state-specific programs). Anyone can rebuild the dashboard in a day. Nobody will maintain 50-state grant data monthly.
- **Target users** care about project-level analysis: specific grant applications, build areas, competitive dynamics.
- **Design:** Bloomberg terminal meets Stripe — dark theme, data-dense, professional. Font: Outfit (display), DM Sans (body), JetBrains Mono (data).

## Working With This Codebase

- All JS modules attach to `window.SN` (SN.config, SN.data, SN.scoring, SN.map, etc.)
- Script load order matters — see `public/index.html`
- No npm/build step — just open `public/index.html`
- External deps loaded via CDN: Leaflet 1.9.4, Chart.js 4.4.1
- Data files use `SN.data.counties`, `SN.data.grants`, `SN.data.rdofDefaults`

## Naming Conventions

- Files: kebab-case (`data-grants.js`)
- JS objects: camelCase (`opportunityScore`, `beadStatus`)
- CSS: BEM-like with `sn-` prefix for component classes
- Colors: CSS custom properties (`--accent`, `--bg-surface`, etc.)
