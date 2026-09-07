# CLAUDE.md — Spectral Nexus

## Project Overview

**Spectral Nexus** is a Broadband Funding Intelligence dashboard for telecom
professionals and system integrators. It visualizes broadband coverage gaps, BEAD
funding opportunities, CBRS spectrum zones, smart city programs, RDOF defaults, and
the competitive landscape across all 3,143 US counties.

- **Live URL**: https://spectral-nexus.onrender.com
- **Hosting**: Render static site (publish path `.`, root rewrite `/` →
  `/public/index.html`). Pushes to `main` deploy automatically.
- **Version**: see `SN.config.version` in `src/js/config.js`

## Tech Stack

- **No framework** — vanilla JS with a global `SN` namespace (`window.SN`)
- **No build system** — plain `<script>` tags loaded in order, no bundler
- **Map**: Leaflet.js (CDN) · **Charts**: Chart.js (CDN) · **Basemap**: CARTO dark tiles
- **Fonts**: Google Fonts (Outfit, DM Sans, JetBrains Mono)

## File Structure

```
public/index.html         ← entry point
src/css/style.css         ← all styles, single file
src/js/
  config.js               ← scoring weights, BEAD allocations, map settings
  data*.js                ← datasets (counties, grants, awards, layers, smart cities,
                             decision makers, municipal fiber, BEAD timelines,
                             data centers, competitors, weekly brief)
  scoring.js              ← opportunity score computation (0–100)
  kpi.js map.js layers.js executive.js onboarding.js
  table.js charts.js insights.js funding.js enhanced-ui.js
  app.js                  ← main controller, init chain — must load last
scripts/build-data.js     ← data generation (not used at runtime)
data/                     ← raw data files
```

## Script Load Order (Critical)

`config.js` → data files → `scoring.js` → UI modules → `app.js` last.
A new module must be added to `public/index.html` in the right position AND follow
the `window.SN = window.SN || {}; SN.moduleName = { ... }` pattern.

## Initialization Chain

`app.js` runs `SN.app.init()` on `DOMContentLoaded`. Every module init is wrapped in
its own try/catch so one failure never breaks the rest — **maintain this pattern**.
`document.body.classList.add('loaded')` runs before any module init so the page is
always visible.

## CSS Visibility Pattern (Important)

The page starts at `body { opacity: 0 }` and becomes visible via `body.loaded` (JS)
with a CSS `@keyframes force-visible` fallback after 3s if JS fails. **Never add CSS
that hides content without a JS-independent fallback.**

## Key Patterns

- **Views**: hash-based view system in `SN.enhancedUI` (`#dashboard`, `#main`,
  `#targets`, `#rolodex`). When switching to/from `#main`, call
  `SN.map.leafletMap.invalidateSize()` after a short delay.
- **Modals**: `.open` class shows them; z-index stack is documented in `style.css`.
- **Filter lenses**: `SN.state.filters.lensFilter` may hold a `(county) => boolean`.
- **New data source**: create `src/js/data-x.js` defining `SN.data.x`, add its script
  tag after the existing data scripts.
- **New map layer**: add data, extend `SN.layers.layerDefs`, add a `buildX()` method,
  call it from `SN.layers.init()`.
- **Scoring changes**: weights in `SN.config.weights` must sum to 1.0; changes affect
  all 3,143 counties — verify the distribution doesn't collapse.
- **Weekly brief**: update `src/js/data-weekly-brief.js` (`weekOf` = current Monday,
  5 bullets, archive the old set).

## Data Sources

FCC BDC (coverage), Census ACS (demographics), NTIA (BEAD), FCC ULS (CBRS),
NTIA/USDA grant records, state broadband offices, SAS providers, public filings.
Per-file mapping is in the header comment of each `data-*.js`.

## Known Constraints

- No bundler, no npm at runtime, no `import`/`export` — everything runs in the
  browser from static files via the `SN` namespace.
- `data.js` is ~1MB with 3,143 county records — don't duplicate it.
- CDN failures (Leaflet/Chart.js) must not blank the page: map/charts degrade,
  the rest still renders.
- Keep BEAD/bid dates current: a state whose `subgrantClose` has passed should have
  `phase: 'subgrant_closed'`; the dashboard only shows bids with future deadlines.

## Conventions

- Solo project. Commit directly to `main` using Conventional Commits
  (`type(scope): summary`).
- No co-author trailers, tool attributions, or session links in commit messages,
  code comments, PRs, or docs.
- Never commit secrets or `.env` files.

## Verification Checklist (before any push)

1. Every JS file referenced by `public/index.html` exists and passes `node --check`.
2. The page renders — content visible, not hidden by CSS; no init-chain breakage.
3. Interactive elements work: tabs, modals, map clicks, filters, exports.
4. New CSS keeps the 900/768/600/380px breakpoints usable at a 375px viewport.
5. No expired BEAD/bid dates are displayed (see Known Constraints).

## CSS & UI Rules

- One scroll container per view — never nest `overflow-y: auto`.
- No fixed-width sidebar columns; use `home-two-up` (1fr 1fr) or full-width sections.
- Use CSS variables for themable colors; every hardcoded `color: #fff` needs a
  `body.light-mode` override unless it sits on an opaque colored background.
- All modals `max-width: 95vw`; tables get `overflow-x: auto` wrappers; touch
  targets ≥ 36px.
