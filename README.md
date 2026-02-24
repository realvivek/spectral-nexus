# Spectral Nexus

**Broadband Funding Intelligence**

Spectral Nexus helps telecom professionals identify broadband deployment opportunities across 3,100+ US counties by combining real FCC BDC data, BEAD funding tracking, CBRS spectrum intelligence, competitive landscape analysis, and interactive mapping.

**Target users:** System integrators, ISPs, fiber infrastructure companies, grant writers, telecom consultants.

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
│   │   ├── data.js          ← 3,143 counties (real FCC BDC + Census data)
│   │   ├── data-grants.js   ← 12 federal + 20 state + 2 regional grant programs
│   │   ├── data-awards.js   ← RDOF results, defaults, past awards
│   │   ├── data-layers.js   ← CBRS zones, cellular gaps, fiber routes, RDOF defaults
│   │   ├── data-smartcities.js ← 40+ smart city programs with contacts
│   │   ├── scoring.js       ← Opportunity score engine (0-100)
│   │   ├── kpi.js           ← Top-bar summary metrics
│   │   ├── map.js           ← Leaflet choropleth map
│   │   ├── layers.js        ← Toggleable map overlays (6 layers, categorized)
│   │   ├── executive.js     ← CSV export, sales report panel
│   │   ├── onboarding.js    ← Help modal & tutorial
│   │   ├── table.js         ← Sortable/filterable county table
│   │   ├── charts.js        ← Chart.js scatter, bar, histogram
│   │   ├── insights.js      ← Curated insights & BEAD tracker
│   │   ├── funding.js       ← Funding Intel: grants guide, competitive landscape, scoring
│   │   └── app.js           ← Main controller, filters, routing
│   │
│   └── css/
│       └── style.css        ← Dark spectral theme (Bloomberg meets Stripe)
│
├── data/
│   ├── federal/             ← FCC BDC downloads, BEAD allocations, E-Rate
│   ├── state/               ← State broadband office grant data (per state)
│   └── rdof/                ← RDOF auction results + default CSVs
│
├── scripts/                 ← ETL scripts, data processing, CSV parsers
│
├── docs/
│   ├── SPECTRAL_NEXUS_PROJECT_DOC.md      ← Living project doc
│   └── SPECTRAL_NEXUS_V03_STRATEGY.md     ← Strategy & roadmap
│
├── CLAUDE.md                ← Claude Code context (auto-loaded per session)
└── README.md                ← You are here
```

---

## Quick Start

1. Open `public/index.html` in a browser (no build step needed)
2. The app loads 3,143 counties, computes scores, renders map + table + charts
3. Use filters (state, min score) and choropleth metric selector
4. Click counties on map or table rows for detail popups
5. Toggle map layers: CBRS, Cellular Gaps, Fiber Routes, Fiber Grants, Smart Cities, RDOF Defaults

**Dependencies (loaded via CDN):**
- Leaflet 1.9.4 (mapping)
- Chart.js 4.4.1 (charts)
- Google Fonts: Outfit, DM Sans, JetBrains Mono

---

## Current Version: v0.5.0

### What's working:
- **3,143 US counties** with real FCC BDC + Census data
- **Composite opportunity scoring** (6 weighted factors, 0-100)
- **Interactive Leaflet map** with choropleth, popups, and 6 toggleable overlay layers
- **Sortable table** with inline bars and row-click map navigation
- **Charts** — scatter, top-10 bar, score histogram
- **Insights panel** — Top Opportunities, Quick Wins, ROI, Underserved, Emerging, BEAD Tracker
- **Funding Intel tab** — Grant pursuit guide, competitive landscape, past winners, scoring methodology
- **RDOF Defaults layer** — Shows $3.3B in defaulted areas on the map
- **Smart City contacts** — Decision makers, system integrators, and infrastructure details
- **Sales Report** — Add items from map popups, export HTML report
- **Help tutorial** — 5-step guided onboarding with example workflow
- **Map layers** — Categorized into Spectrum & Coverage, Infrastructure, Programs & Funding
- **Grant database** — 12 federal, 20+ state, 2 regional programs with status tracking

### Data sources:
- FCC Broadband Data Collection (BDC) — BSL coverage for all 3,143 counties
- US Census ACS 5-Year (2022) — demographics
- NTIA BEAD Allocations — $42.45B across all states
- FCC ULS — CBRS PAL license database
- FCC Auction 904 — RDOF results and defaults
- City government reports — smart city programs

---

## Architecture

Pure vanilla JS — no framework, no build step. All modules attach to `window.SN` namespace.

**Script load order (critical):**
1. `config.js` — constants and weights
2. `data.js` — 3,143 county records
3. `data-grants.js` — grant programs
4. `data-awards.js` — RDOF/past awards
5. `data-layers.js` — CBRS, cellular, fiber, RDOF defaults
6. `data-smartcities.js` — smart city programs + contacts
7. `scoring.js` — score computation
8. `kpi.js` — summary metrics
9. `map.js` — Leaflet map
10. `layers.js` — map overlays (6 layer types)
11. `executive.js` — export/reports
12. `onboarding.js` — help modal
13. `table.js` — data table
14. `charts.js` — Chart.js charts
15. `insights.js` — insights panel
16. `funding.js` — funding intel tab
17. `app.js` — controller (boots on DOMContentLoaded)

---

## License

Proprietary — not open source. For internal development only.
