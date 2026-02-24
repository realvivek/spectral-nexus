# Spectral Nexus

**Broadband Funding Intelligence**

Spectral Nexus helps telecom professionals identify broadband deployment opportunities across 3,100+ US counties by combining real FCC BDC data, BEAD funding tracking, CBRS spectrum intelligence, competitive landscape analysis, decision maker contacts, and interactive mapping.

**Target users:** System integrators, ISPs, fiber infrastructure companies, grant writers, telecom consultants.

---

## Folder Structure

```
spectral-nexus/
├── public/                  <- Production entry point
│   └── index.html           <- Main HTML (load this to run the app)
│
├── src/
│   ├── js/
│   │   ├── config.js        <- Scoring weights, BEAD status, map settings
│   │   ├── data.js          <- 3,143 counties (real FCC BDC + Census data)
│   │   ├── data-grants.js   <- 12 federal + 20 state + 2 regional grant programs
│   │   ├── data-awards.js   <- RDOF results, defaults, past awards
│   │   ├── data-layers.js   <- CBRS zones, cellular gaps, fiber routes, RDOF defaults
│   │   ├── data-smartcities.js <- 40+ smart city programs with contacts
│   │   ├── data-decision-makers.js <- State broadband directors, co-ops, tribal contacts
│   │   ├── scoring.js       <- Opportunity score engine (0-100)
│   │   ├── kpi.js           <- Actionable KPI bar with click-through navigation
│   │   ├── map.js           <- Leaflet choropleth map with decision maker popups
│   │   ├── layers.js        <- All map layers: base, spectrum, infrastructure, programs
│   │   ├── executive.js     <- CSV export, sales report panel
│   │   ├── onboarding.js    <- Help modal with visual workflow tutorial
│   │   ├── table.js         <- Sortable/filterable county table
│   │   ├── charts.js        <- Chart.js scatter, bar, histogram
│   │   ├── insights.js      <- Actionable insights: BEAD urgency, co-ops, tribal, RDOF
│   │   ├── funding.js       <- Funding Intel: grants, awarded table, decision makers, competitive
│   │   └── app.js           <- Main controller, filters, routing
│   │
│   └── css/
│       └── style.css        <- Dark spectral theme
│
├── data/
│   ├── federal/             <- FCC BDC downloads, BEAD allocations, E-Rate
│   ├── state/               <- State broadband office grant data (per state)
│   └── rdof/                <- RDOF auction results + default CSVs
│
├── scripts/                 <- ETL scripts, data processing, CSV parsers
│
├── docs/
│   ├── SPECTRAL_NEXUS_PROJECT_DOC.md      <- Living project doc
│   └── SPECTRAL_NEXUS_V03_STRATEGY.md     <- Strategy & roadmap
│
├── CLAUDE.md                <- Claude Code context (auto-loaded per session)
└── README.md                <- You are here
```

---

## Quick Start

1. Open `public/index.html` in a browser (no build step needed)
2. The app loads 3,143 counties, computes scores, renders map + table + charts
3. Use filters (state, min score) and choropleth metric selector
4. Click counties on map or table rows for detail popups with decision maker contacts
5. Toggle map layers: Base, Spectrum, Infrastructure, Programs & Funding
6. Check Funding Intel tab for grants awarded, decision makers directory, and competitive landscape

**Dependencies (loaded via CDN):**
- Leaflet 1.9.4 (mapping)
- Chart.js 4.4.1 (charts)
- Google Fonts: Outfit, DM Sans, JetBrains Mono

---

## Current Version: v0.6.0

### What's new in v0.6.0:
- **Decision Makers Directory** — State broadband office directors (all 50 states + DC), electric co-op broadband leaders, tribal broadband administrators, smart city CIOs. Contacts shown in county popups and in Funding Intel tab.
- **Actionable KPI Bar** — Click any metric card to filter, navigate, or fly to top county. Cards show what you can do, not just numbers.
- **Map Layer Toggles Revamped** — All map elements toggleable including county markers and basemap. 4 categories: Base Layers, Spectrum & Coverage, Infrastructure, Programs & Funding.
- **Insights Revamp** — BEAD urgency banner, top deployment targets with contacts, quick win playbook, electric co-op partnerships, RDOF recapture zones, tribal opportunities.
- **Fiber Grants Awarded Table** — Sortable table of all awarded grants, co-op fiber builds, and past awards with contact info and follow-up opportunities.
- **Visual Workflow Tutorial** — Help popup step 5 now shows an interactive visual walkthrough with mockup UI elements.

### What's working:
- **3,143 US counties** with real FCC BDC + Census data
- **Composite opportunity scoring** (6 weighted factors, 0-100)
- **Interactive Leaflet map** with choropleth, popups with decision maker contacts, and 8 toggleable layers
- **Sortable table** with inline bars and row-click map navigation
- **Charts** — scatter, top-10 bar, score histogram
- **Insights panel** — BEAD urgency, deployment targets, quick wins, co-op partners, RDOF defaults, tribal programs
- **Funding Intel tab** — Grants guide, grants awarded table, decision makers directory, competitive landscape, scoring methodology
- **Decision makers** — 50+ state directors, 12 electric co-ops, 7 tribal programs in database
- **RDOF Defaults layer** — Shows $3.3B in defaulted areas on the map
- **Smart City contacts** — Decision makers, system integrators, and infrastructure details
- **Sales Report** — Add items from map popups, export HTML report
- **Help tutorial** — 5-step guided onboarding with visual workflow example
- **Map layers** — Categorized into Base, Spectrum & Coverage, Infrastructure, Programs & Funding
- **Grant database** — 12 federal, 20+ state, 2 regional programs with status tracking

### Data sources:
- FCC Broadband Data Collection (BDC) — BSL coverage for all 3,143 counties
- US Census ACS 5-Year (2022) — demographics
- NTIA BEAD Allocations — $42.45B across all states
- FCC ULS — CBRS PAL license database
- FCC Auction 904 — RDOF results and defaults
- State broadband office directories
- NRECA — electric cooperative broadband programs
- Tribal broadband program directories (NTIA TBCP)
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
7. `data-decision-makers.js` — state directors, co-ops, tribal contacts
8. `scoring.js` — score computation
9. `kpi.js` — actionable KPI bar
10. `map.js` — Leaflet map with decision maker popups
11. `layers.js` — all map layers (8 layer types, 4 categories)
12. `executive.js` — export/reports
13. `onboarding.js` — help modal with visual workflow
14. `table.js` — data table
15. `charts.js` — Chart.js charts
16. `insights.js` — actionable insights panel
17. `funding.js` — funding intel with decision makers & grants awarded
18. `app.js` — controller (boots on DOMContentLoaded)

---

## License

Proprietary — not open source. For internal development only.
