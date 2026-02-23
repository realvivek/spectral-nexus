# Spectral Nexus

**Telecom Infrastructure Opportunity Intelligence**

Spectral Nexus helps telecom professionals identify broadband deployment opportunities across US counties by combining coverage gap analysis, grant program tracking, scoring, and interactive mapping.

**Target users:** Infrastructure companies (Boldyn Networks, NTT DATA), ISPs, grant writers, telecom consultants.

---

## Folder Structure

```
spectral-nexus/
├── public/                  ← Production entry point
│   └── index.html           ← Main HTML (load this to run the app)
│
├── src/
│   ├── js/
│   │   ├── config.js        ← Scoring weights, BEAD status, map settings
│   │   ├── data.js          ← 200 counties across 10 states (mock BSL data)
│   │   ├── data-grants.js   ← 12 federal + 20 state + 2 regional grant programs
│   │   ├── data-awards.js   ← RDOF results, defaults, past awards
│   │   ├── scoring.js       ← Opportunity score engine (0-100)
│   │   ├── kpi.js           ← Top-bar summary metrics
│   │   ├── map.js           ← Leaflet choropleth map
│   │   ├── table.js         ← Sortable/filterable county table
│   │   ├── charts.js        ← Chart.js scatter, bar, histogram
│   │   ├── insights.js      ← AI-style insights, BEAD tracker
│   │   └── app.js           ← Main controller, filters, routing
│   │
│   ├── css/
│   │   └── style.css        ← Dark spectral theme (Bloomberg meets Stripe)
│   │
│   └── assets/              ← Logo SVGs, icons, images
│
├── data/
│   ├── federal/             ← FCC BDC downloads, BEAD allocations, E-Rate
│   ├── state/               ← State broadband office grant data (per state)
│   └── rdof/                ← RDOF auction results + default CSVs
│
├── scripts/                 ← ETL scripts, data processing, CSV parsers
│
├── docs/
│   ├── SPECTRAL_NEXUS_PROJECT_DOC.md      ← Living project doc (goals, arch, decisions)
│   └── SPECTRAL_NEXUS_V03_STRATEGY.md     ← v0.3.0 strategy (features, research, moat)
│
├── COWORK_PROMPT.md         ← Paste this into Cowork for context on first session
└── README.md                ← You are here
```

---

## Quick Start

1. Open `public/index.html` in a browser (no build step needed)
2. The app loads 200 counties, computes scores, renders map + table + charts
3. Use filters (state, min score) and choropleth metric selector
4. Click counties on map or table rows for detail popups

**Dependencies (loaded via CDN):**
- Leaflet 1.9.4 (mapping)
- Chart.js 4.4.1 (charts)
- Google Fonts: Outfit, DM Sans, JetBrains Mono

---

## Current Version: v0.2.0

**What's working:**
- 200 counties across 10 states (TX, LA, GA, VA, MT, IA, SC, CA, OH, NM)
- Composite opportunity scoring (6 weighted factors, 0-100)
- Interactive Leaflet map with choropleth + popups
- Sortable table with inline bars
- Chart.js scatter, top-10 bar, score histogram
- Insights panel with Top Opportunities, Most Underserved, Quick Wins, ROI, Emerging
- BEAD Program Tracker (state-level)
- Grant program database (12 federal, 20+ state, 2 regional)
- RDOF defaults tracking (summary + major defaulters)

**What's mock data (to be replaced with real FCC data):**
- BSL counts (totalBSLs, served, underserved, unserved)
- Fiber availability percentages
- Tower counts and density
- 5G readiness scores
- E-Rate funding estimates
- Funding estimates per county

**Real data:**
- Demographics (population, density, income, poverty) — Census ACS
- BEAD status and allocations — NTIA
- Lat/lng centroids — Census TIGER

---

## v0.3.0 Roadmap (see docs/ for full strategy)

Priority features:
1. Replace mock BSL data with real FCC BDC bulk downloads
2. RDOF default mapping at county level (CBG → county crosswalk)
3. Grant Stacking Calculator (which programs apply per county)
4. Fundability Score (new scoring dimension)
5. PDF export for investment memos
6. Time-series score snapshots (start accumulating history)

See `docs/SPECTRAL_NEXUS_V03_STRATEGY.md` for complete plan with 23 features.

---

## Architecture

Pure vanilla JS — no framework, no build step. All modules attach to `window.SN` namespace.

**Load order (matters):**
1. `config.js` — constants and weights
2. `data.js` — county dataset
3. `data-grants.js` — grant programs
4. `data-awards.js` — RDOF/past awards
5. `scoring.js` — score computation
6. `kpi.js` — summary metrics
7. `map.js` — Leaflet map
8. `table.js` — data table
9. `charts.js` — Chart.js charts
10. `insights.js` — insights panel
11. `app.js` — controller (boots on DOMContentLoaded)

---

## Data Sources

| Source | What We Get | URL |
|--------|------------|-----|
| FCC BDC | BSL coverage data | broadbandmap.fcc.gov |
| FCC Auction 904 | RDOF results + defaults | fcc.gov/auction/904 |
| FCC Funding Map | All federal broadband awards | fundingmap.fcc.gov |
| NTIA BEAD | State approvals + allocations | broadbandusa.ntia.gov |
| Census ACS | Demographics | data.census.gov |
| USAC | E-Rate, RHC, High-Cost data | opendata.usac.org |
| State offices | State grant programs (10 states) | See docs/ |

---

## License

Proprietary — not open source. For internal development only.
