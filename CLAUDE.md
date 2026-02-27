# CLAUDE.md — Spectral Nexus

## Project Overview

**Spectral Nexus** is a Broadband Funding Intelligence dashboard for telecom professionals and system integrators. It visualizes broadband coverage gaps, BEAD funding opportunities, CBRS spectrum zones, smart city programs, RDOF defaults, and competitive landscape across all 3,100+ US counties.

- **Live URL**: https://realvivek.github.io/spectral-nexus/
- **Hosting**: GitHub Pages (static site, no build step)
- **Version**: See `SN.config.version` in `src/js/config.js`

## Tech Stack

- **No framework** — Vanilla JS with a global `SN` namespace (`window.SN`)
- **No build system** — Plain `<script>` tags loaded in order, no bundler
- **Map**: Leaflet.js (loaded from CDN: unpkg.com)
- **Charts**: Chart.js (loaded from CDN: cdn.jsdelivr.net)
- **Fonts**: Google Fonts (Outfit, DM Sans, JetBrains Mono)
- **Basemap**: CARTO dark tiles

## File Structure

```
public/
  index.html          ← Entry point (served by GitHub Pages)

src/
  css/style.css       ← All styles, single file
  js/
    config.js         ← Scoring weights, BEAD allocations, map settings
    data.js           ← 3,143 county records (FCC BDC + Census)
    data-grants.js    ← Fiber grant opportunities
    data-awards.js    ← RDOF awards data
    data-layers.js    ← CBRS zones, cellular gaps, fiber routes
    data-smartcities.js ← Smart city programs
    data-decision-makers.js ← State broadband directors, co-ops, tribal contacts
    data-municipal-fiber.js ← Municipal fiber networks, dark fiber, private 5G deployments
    data-bead-timeline.js ← BEAD per-state timelines, CBRS GAA data, competitive bids
    data-datacenters.js ← Data center locations with CBRS opportunity flags
    data-competitors.js ← Competitor profiles, state presence, BEAD activity
    data-weekly-brief.js ← Weekly curated intelligence brief (manually updated)
    scoring.js        ← Opportunity score computation (0-100)
    kpi.js            ← Actionable KPI bar with click-through navigation
    map.js            ← Leaflet map, county circles, popups with decision makers
    layers.js         ← All map layers: base, spectrum, infrastructure, programs
    executive.js      ← CSV export, sales report panel (supports county, grant, decisionmaker, beadstate, competitor types)
    onboarding.js     ← Help modal with visual workflow tutorial
    table.js          ← Sortable county data table
    charts.js         ← Chart.js scatter/bar/histogram
    insights.js       ← Actionable insights: BEAD urgency, co-ops, tribal, RDOF
    funding.js        ← Funding Intel: grants, awarded table, decision makers, competitive
    enhanced-ui.js    ← Enhanced UI: dashboard home, full-screen funding modal, pursuit builder, top targets, county deep-dive, action bar, filter lenses, rolodex
    app.js            ← Main controller, init chain, filters, tabs

scripts/
  build-data.js       ← Data generation script (not used at runtime)

data/                 ← Raw data files (federal, state, RDOF)
```

## Script Load Order (Critical)

Scripts in `public/index.html` load in this exact order — **order matters**:

1. Leaflet (CDN)
2. Chart.js (CDN)
3. `config.js` — Must load first (other modules read `SN.config`)
4. `data.js` — County dataset
5. `data-grants.js`, `data-awards.js`, `data-layers.js`, `data-smartcities.js`
6. `data-decision-makers.js` — State directors, co-ops, tribal contacts
7. `data-municipal-fiber.js` — Municipal fiber networks, private 5G deployments
8. `data-bead-timeline.js` — BEAD state timelines, CBRS GAA spectrum, competitive bids
8b. `data-datacenters.js` — Data center locations
8c. `data-competitors.js` — Competitor profiles and state lookup
8d. `data-weekly-brief.js` — Weekly curated intelligence brief
9. `scoring.js` — Reads `SN.data` and `SN.config`
10. `kpi.js`, `map.js`, `layers.js`, `executive.js`, `onboarding.js`
11. `table.js`, `charts.js`, `insights.js`, `funding.js`
12. `enhanced-ui.js` — Reads `SN.data`, `SN.config`, `SN.executive`, `SN.funding`
13. `app.js` — **Must be last** (orchestrates all modules)

If you add a new module, it must be added to `index.html` in the correct position AND follow the `window.SN = window.SN || {}; SN.moduleName = { ... }` pattern.

## Initialization Chain

`app.js` runs on `DOMContentLoaded`:

```
SN.app.init()
  ├── document.body.classList.add('loaded')   ← Makes page visible
  ├── SN.executive.init()                     ← Buttons (try/catch)
  ├── SN.onboarding.init()                    ← Tutorial (try/catch)
  ├── SN.scoring.computeAll()                 ← Scores (try/catch)
  ├── SN.map.init()                           ← Leaflet map (try/catch)
  ├── SN.layers.init()                        ← Map overlays (try/catch)
  ├── buildFilters()
  ├── SN.kpi.render()                         ← (try/catch)
  ├── SN.table.render()                       ← (try/catch)
  ├── SN.charts.render()                      ← (try/catch)
  ├── SN.insights.render()                    ← (try/catch)
  ├── SN.funding.init()                      ← Funding Intel (try/catch)
  ├── bindEvents()
  └── switchTab('table')
```

Each module init is wrapped in try/catch so one failure doesn't break others. **This is intentional** — maintain this pattern when adding new modules.

## CSS Visibility Pattern (Important)

The page starts invisible (`body { opacity: 0 }`) and becomes visible via:
1. `body.loaded` class added by JS → `opacity: 1`
2. CSS fallback animation: `@keyframes force-visible` fires after 3s if JS fails

**Never add CSS that hides content without a JS-independent fallback.** This was a bug that caused the entire site to appear blank.

## GitHub Pages Deployment

- The site is served from `public/index.html`
- HTML references CSS/JS via relative paths: `../src/css/style.css`, `../src/js/*.js`
- `.nojekyll` file exists in repo root (required to prevent Jekyll processing)
- **No build step** — push to the deployed branch and GitHub Pages serves it directly

## Key Patterns

### Multi-Page View System (v0.7.0)

The app uses a hash-based view system managed by `SN.enhancedUI`. Views are:
- `#dashboard` (default) — Intelligence Brief landing page
- `#main` — Map + data panels (original single-page layout)
- `#targets` — Dedicated top targets page
- `#rolodex` — Decision Maker contact directory

Each view is a `.sn-view` div that gets `.sn-view-active` when selected. The `#main` view contains the original layout (KPI bar, map, right panel with tabs). Header navigation buttons have `data-nav` attributes.

**Important**: When switching to/from `#main`, call `SN.map.leafletMap.invalidateSize()` after a short delay so Leaflet recalculates its container size.

### Modal System (v0.7.0)

Three modals overlay the entire viewport:
- **Funding Fullscreen Modal** (`#funding-fullscreen-modal`) — Full-screen with sidebar nav, z-index 9500
- **County Deep-Dive Modal** (`#county-dive-modal`) — 720px centered modal, z-index 9400
- **Pursuit Builder Modal** (`#pursuit-modal`) — 680px centered wizard, z-index 9600

All modals use the `.open` class to show, and are opened/closed via `SN.enhancedUI` methods.

### Smart Filter Lenses (v0.7.0)

`SN.state.filters.lensFilter` can hold a function `(county) => boolean`. When set, `getFilteredData()` applies it alongside state/score filters. Lenses are defined in `SN.enhancedUI.lenses[]`. Manual filter changes clear the active lens.

### Adding a New Module
1. Create `src/js/my-module.js`
2. Use the namespace pattern: `window.SN = window.SN || {}; SN.myModule = { init() { ... } };`
3. Add `<script src="../src/js/my-module.js"></script>` to `index.html` BEFORE `app.js`
4. Call `try { SN.myModule.init(); } catch(e) { console.error('MyModule init failed:', e); }` in `SN.app.init()`

### Adding a New Data Source
1. Create `src/js/data-newdata.js` with `SN.data.newData = [...]`
2. Add the script tag after the existing data scripts in `index.html`
3. Reference `SN.data.newData` in whichever module needs it

### Updating the Weekly Intelligence Brief
The weekly brief is in `src/js/data-weekly-brief.js`. To update:
1. Change `weekOf` to the current Monday's date (YYYY-MM-DD)
2. Replace the 5 items in `bullets[]` with the week's top stories
3. Each bullet needs: `icon` (bead/5g/dc/fiber/deal/alert/rdof/policy), `text` (HTML string), `tag` (urgent/new/update/opportunity or null)
4. Move the old brief to the `archive[]` array for history
5. Commit and push — that's it

### Adding a Map Layer
1. Add data to `data-layers.js` (or a new data file)
2. Add layer definition to `SN.layers.layerDefs` array in `layers.js`
3. Add a `buildNewLayer()` method to `SN.layers`
4. Call it from `SN.layers.init()`

### Modifying Scoring
- Weights are in `SN.config.weights` (must sum to 1.0)
- Individual score functions are in `scoring.js`
- Changes affect all 3,143 counties — verify distribution doesn't collapse

## Data Sources

| Data | Source | Location |
|------|--------|----------|
| County BSL/coverage | FCC Broadband Data Collection (BDC) | `data.js` |
| Demographics | Census ACS 5-Year (2022) | `data.js` |
| BEAD allocations | NTIA (June 2023) | `config.js` |
| CBRS zones | FCC ULS license database | `data-layers.js` |
| Smart cities | Public government reports | `data-smartcities.js` |
| Fiber grants | NTIA/USDA grant records | `data-grants.js` |
| Municipal fiber | City/utility reports, MuniNetworks.org | `data-municipal-fiber.js` |
| Private 5G | FCC CBRS records, OnGo Alliance, vendor PRs | `data-municipal-fiber.js` |
| BEAD timelines | NTIA tracker, state broadband office websites | `data-bead-timeline.js` |
| CBRS GAA spectrum | SAS providers (Google, Federated Wireless, CommScope) | `data-bead-timeline.js` |
| Competitive bids | State broadband office public filings, press releases | `data-bead-timeline.js` |
| Data centers | Equinix, QTS, CyrusOne, CoreSite reports | `data-datacenters.js` |
| Competitor profiles | FCC BDC, state filings, SEC filings | `data-competitors.js` |
| Weekly brief | Manual curation from all sources | `data-weekly-brief.js` |

## Known Constraints

- **No bundler/minifier** — Keep files self-contained. Don't use import/export.
- **No npm/node at runtime** — Everything runs in the browser from static files.
- **Large data file** — `data.js` is ~1MB+ with 3,143 county records. Don't duplicate it.
- **CDN dependencies** — Leaflet and Chart.js load from CDN. If CDN is down, map and charts fail but page should still render.
- **ES5-ish style** — Some modules use `var` and `function(){}` instead of `const`/arrow functions. This is intentional for compatibility. Either style is fine for new code.

## Session Checklist (Do This Every Session)

Before starting work:
1. Read this file
2. Check `git status` and `git log` for recent changes
3. Verify the init chain in `app.js` — understand what depends on what

After EVERY change:
1. Verify the page renders (content visible, not hidden by CSS)
2. Verify interactive elements work (buttons, modals, toggles, map clicks)
3. Ensure no single module failure breaks unrelated features
4. If you add a new JS module, confirm it doesn't break the init chain
5. If you modify CSS, confirm nothing becomes invisible
6. Check that all files referenced in `index.html` actually exist

**Never declare a task "done" without verifying the end-to-end user experience — not just that the files exist.**

## Common Mistakes to Avoid

- **Don't use `display:none` or `opacity:0` on content without a CSS-only fallback** — If JS fails, users see a blank page
- **Don't chain module inits without try/catch** — One CDN failure will cascade and break everything
- **Don't forget to add new scripts to `index.html`** — A file that exists but isn't loaded does nothing
- **Don't change script order carelessly** — `config.js` before `data.js` before `scoring.js` before `app.js`
- **Don't add `import`/`export` statements** — This is a no-build static site, use the `SN` namespace
- **Check relative paths from `public/index.html`** — CSS/JS paths use `../src/` because HTML is in `public/`

## PR Creation & GitHub Access

This environment has **NO GitHub API access** (no `gh` CLI, no `GITHUB_TOKEN`). Follow this workflow:

1. **Check branch status** — ensure all changes are committed and pushed (`git status` should show "nothing to commit, working tree clean" and "up to date with origin/...")
2. **Do NOT attempt `gh` CLI or API authentication** — it will fail. Do not spend time trying to authenticate or install tools.
3. **Provide the compare URL** for manual PR creation:
   ```
   https://github.com/realvivek/spectral-nexus/compare/main...<branch-name>
   ```
4. **Tell the user** to create the PR manually, or note that the orchestration system may auto-create it.
5. **Time limit**: Spend at most 2 minutes on PR creation attempts. If it doesn't work, move on.

## After Every Feature / Before Any PR

### Deployment Verification (Required)

**You MUST complete ALL checks below before declaring work done or creating a PR. Do not skip any.**

#### Step 1: File Integrity (run these commands)

```bash
# 1a. Verify .nojekyll exists
ls -la .nojekyll

# 1b. Extract all local script src paths from index.html and verify each file exists
grep -oP 'src="\.\./\K[^"]+' public/index.html | while read f; do
  [ -f "$f" ] && echo "OK: $f" || echo "MISSING: $f"
done

# 1c. Extract all local CSS href paths and verify each file exists
grep -oP 'href="\.\./\K[^"]+' public/index.html | grep '\.css' | while read f; do
  [ -f "$f" ] && echo "OK: $f" || echo "MISSING: $f"
done

# 1d. Syntax-check every JS file referenced in index.html
grep -oP 'src="\.\./\K[^"]+' public/index.html | while read f; do
  node -c "$f" 2>&1 || echo "SYNTAX ERROR: $f"
done
```

All files must exist and all JS must pass syntax check. **If any file is MISSING or has a SYNTAX ERROR, fix it before proceeding.**

#### Step 2: Trace the Initialization Path

Review `app.js` `SN.app.init()` and answer these questions:

- [ ] Is every module init wrapped in its own `try/catch`?
- [ ] If a new data file fails to load (404/syntax error), do consuming modules guard with null checks (e.g., `if (!SN.data.newThing) return`)?
- [ ] Are event handlers in `bindEvents()` attached regardless of which modules succeeded?
- [ ] Is `document.body.classList.add('loaded')` still called before any module init (so page is always visible)?
- [ ] Does the CSS `@keyframes force-visible` fallback still exist (so page appears even if JS fails entirely)?

#### Step 2b: Verify BEAD/Bid Dates Are Current

Before publishing, check that no expired dates are displayed to users:

```bash
# Check for BEAD states still marked 'subgrant_open' with past close dates
node -e "
  var today = new Date().toISOString().slice(0,7);
  var code = require('fs').readFileSync('src/js/data-bead-timeline.js','utf8');
  // Look for subgrantClose dates before current month in subgrant_open states
  var matches = code.match(/phase:\s*'subgrant_open'.*?subgrantClose:\s*'(\d{4}-\d{2})'/g) || [];
  matches.forEach(function(m) {
    var d = m.match(/subgrantClose:\s*'(\d{4}-\d{2})'/)[1];
    if (d < today) console.log('EXPIRED: subgrant_open state with close date ' + d);
  });
  if (matches.length === 0 || matches.every(function(m) { var d = m.match(/subgrantClose:\s*'(\d{4}-\d{2})'/)[1]; return d >= today; })) console.log('All BEAD dates OK');
"
```

- [ ] No `subgrant_open` states have `subgrantClose` dates before the current month
- [ ] Competitive bids displayed on the dashboard are filtered to only show `deadline >= current month` (this is handled in code, but verify data-bead-timeline.js doesn't have obviously wrong dates)
- [ ] `data-weekly-brief.js` `weekOf` date is within the last 2 weeks

**When updating dates**: Change `phase` from `subgrant_open` to `subgrant_closed` when a state's `subgrantClose` date has passed. Update `notes` to reflect the new status.

#### Step 3: Check for Silent Failure Patterns

- [ ] No new `display:none` or `opacity:0` on page-level content without a CSS-only fallback
- [ ] No `import`/`export` statements added (this is a no-build static site)
- [ ] New rendering methods return graceful fallback HTML when data is missing (not blank/error)
- [ ] `setTimeout` or DOM-ready guards used when binding events to dynamically-generated elements
- [ ] CDN failures don't prevent local JS from executing (Leaflet/Chart.js wrapped in try/catch)

#### Step 4: GitHub Pages Specific

- [ ] `.nojekyll` exists at repo root
- [ ] All relative paths (`../src/`) resolve correctly from `public/index.html`
- [ ] New script tags are in the correct load order in `index.html` (data before logic, logic before app.js)
- [ ] No files referenced in `index.html` that only exist on a different branch

#### Step 5: Report Results

Create a table summarizing each check with Pass/Fail status. Example:

| Check | Status |
|-------|--------|
| .nojekyll exists | Pass |
| All JS files exist on disk | Pass |
| All JS passes syntax check | Pass |
| ... | ... |

**Do NOT create a PR or declare work complete until all checks pass.**

### Live Site URL

- `https://realvivek.github.io/spectral-nexus/public/index.html`

## CSS & UI Rules (Mandatory)

These rules exist because of bugs that were actually shipped. Follow them exactly.

### Scrollbar Rule
- **Only ONE element per view should have `overflow-y: auto`**. The `.sn-view` parent provides scroll for all views.
- **NEVER** add `overflow-y: auto` to both a parent and child container (creates nested scrollbars).
- `.dashboard-home`, `.targets-page`, `.rolodex-page` must NOT have `overflow-y: auto` or `height: calc(...)` — the parent `.sn-view` handles scrolling.
- `.insights-fullpage-wrap` and `.funding-fullpage-wrap` are exceptions: they have their own scroll because they replace `.sn-view`'s scroll.

### Layout Rule: No Fixed-Width Sidebar Columns
- **NEVER** use `grid-template-columns: 1fr 360px` or similar fixed right columns on the dashboard — they create an empty scrollable pane on most screen sizes.
- Use `home-two-up` (1fr 1fr grid) for side-by-side pairs.
- Use `home-full-width > .home-section` for full-width card sections.
- Two-up grids collapse to single column at 900px breakpoint.

### Light Mode Color Rules
- **NEVER** use hardcoded `color: #fff` on badges, pills, or scores without a `body.light-mode` override. White text on white backgrounds is invisible.
- **ALWAYS** use CSS variables (`var(--text-primary)`, `var(--accent)`, etc.) for colors that change between themes.
- **Exception**: Badge/pill elements that have a colored background (e.g., `background: #06d6a0`) can use `color: #fff` because the background is opaque in both modes. Document these in the light-mode override block.
- Scrollbar, selection, and hover shadow styles ALL need `body.light-mode` variants.

### Card & Section Alignment Rules
- Sections inside `home-two-up` use `align-items: stretch` — both columns are equal height.
- Each `home-two-up > .home-section` gets card styling (background, border, padding, border-radius) automatically via CSS.
- Full-width `home-full-width > .home-section` elements also get card styling.
- **Consistent spacing**: All dashboard section `margin-bottom` is `20px`. All `gap` inside grids is `8px` for dense grids, `20px` for section-level grids.

### View Centering Rules
- `.insights-fullpage` must be `display: block` (not `display: flex`) with `max-width` + `margin: 0 auto` for centering.
- `.funding-fullpage` uses `display: flex` because it has a sidebar + body layout.
- Never apply `display: flex` to a view wrapper that should be centered — flex doesn't center children the same way.

### Z-Index Stack (Reference)
| Layer | Z-Index | Element |
|-------|---------|---------|
| Header | 100 | `.header` |
| Map controls | 800 | Map overlays, disclaimer |
| Methodology modal | 9000 | `.methodology-modal` |
| County deep-dive | 9400 | `#county-dive-modal` |
| Report panel, Funding modal | 9500 | `.report-panel`, `.funding-fullscreen-modal` |
| Pursuit modal | 9600 | `#pursuit-modal` |
| Onboarding | 9900 | `.onboarding-modal` |
| Map tooltip | 9999 | `#map-tooltip` |
| Toast notification | 10000 | `.exec-toast` |

### Responsive Breakpoint Rules
When adding a new CSS class that uses `grid-template-columns`, `flex-wrap`, or fixed widths:
1. Add a `@media (max-width: 900px)` rule that collapses to single column
2. Add a `@media (max-width: 768px)` rule for iPad portrait adjustments
3. Add a `@media (max-width: 600px)` rule for phone landscape/large phone
4. Add a `@media (max-width: 380px)` rule for small phone (375px viewport)
5. Verify the element is visible and usable at 375px viewport width

### Mobile Responsiveness Rules (Mandatory)
Every new feature MUST work on mobile. These rules apply to ALL new CSS:

- **No fixed widths > 300px** without a `max-width: 95vw` fallback
- **All grids** must collapse to single column at 600px or below
- **All modals** must use `max-width: 95vw` to prevent overflow on phones
- **Tables** must have `overflow-x: auto` on their wrapper for horizontal scroll
- **Font sizes** at 600px should be 0.64-0.72rem for body text, 0.56-0.62rem for labels
- **The funding modal sidebar** must collapse to horizontal scrollable nav at 600px
- **Hide non-essential elements** on phones (version badge, secondary labels) to save space
- **Touch targets** must be at least 36px for mobile tap accuracy
- **Breakpoint stack**: 900px (tablet) → 768px (iPad) → 600px (phone landscape) → 380px (small phone)

**Current breakpoint files**: All responsive rules are in `src/css/style.css`. Mobile-specific overrides are at the bottom of the file.

## Important: No Claude Session Links

**NEVER include Claude session/prompt URLs (e.g., `https://claude.ai/code/session_...`) in any commits, PRs, documentation, comments, or code files.** These are internal development tool links and must not appear in the repository.
