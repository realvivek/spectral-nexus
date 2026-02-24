# SPECTRAL NEXUS — Project Documentation
### Version: 0.3.0 | Last Updated: Feb 20, 2026
### Status: MVP v0.1.0 BUILT — Refining with Grant Tracker + Past Awards
### Context: See CLAUDE.md in repo root for development context.

---

## TABLE OF CONTENTS
1. Project Overview & Value Proposition
2. Target Audience
3. MVP Status — What's Built (v0.1.0)
4. NEW FEATURES — v0.2.0 Refinement
5. Data Sources — Complete Research
6. Data Model & Scoring Engine
7. Technical Architecture
8. Design & Brand
9. Feature Roadmap (Phased)
10. Decisions Log
11. Session History

---

## 1. PROJECT OVERVIEW

**Project Name:** Spectral Nexus
**Type:** Public-facing interactive map + analytics dashboard
**Domain:** Telecom infrastructure opportunity intelligence
**First Audience:** Portfolio / proof of concept → then telecom professionals
**One-Liner:** A free platform unifying broadband coverage gaps, federal grant funding, CBRS/tower infrastructure, and demographics into county-level opportunity scores for telecom professionals.

---

## 2. TARGET AUDIENCE

**Primary personas (from user):**
- Telecom consultants (e.g., someone at NTT DATA, Boldyn Networks)
- Sales teams at ISPs, fiber companies, fixed wireless providers
- Grant writers / BD teams pursuing BEAD, ReConnect, E-Rate funding
- Network engineers evaluating greenfield deployment areas

**Key user workflow they want from us:**
1. Find counties with high opportunity scores (coverage gaps + funding available)
2. See what grants are OPEN and what the requirements/deadlines are → pass to sales
3. See past grant winners — who won, how much, where → competitive intelligence
4. Evaluate infrastructure: towers, CBRS availability, fiber presence
5. Export or share findings with leadership

---

## 3. MVP v0.1.0 — WHAT'S BUILT

### Files delivered (in spectral-nexus-mvp.zip):
```
spectral-nexus/
├── index.html           # Main entry
├── css/style.css        # Dark spectral theme
├── js/
│   ├── config.js        # Scoring weights, BEAD statuses, constants
│   ├── data.js          # ~200 counties, 10 states
│   ├── scoring.js       # Opportunity score engine
│   ├── kpi.js           # KPI cards
│   ├── map.js           # Leaflet choropleth map
│   ├── table.js         # Sortable data table
│   ├── charts.js        # Chart.js (scatter, bar, histogram)
│   ├── insights.js      # Insights + BEAD tracker
│   └── app.js           # Controller
├── assets/logo.svg      # Brand logo
└── README.md
```

### Working features:
- Interactive US map (10 active states, 40 grayed out)
- Choropleth by 6 metrics (score, unserved%, coverage gap, income, density, fiber)
- 6 KPI summary cards
- Sortable table with 12 columns + inline bar charts
- 3 Chart.js visualizations
- 5 insight categories + BEAD state tracker
- State filter + score slider + reset
- Methodology modal with full scoring explanation
- County click → popup with 8 metrics + funding info

---

## 4. NEW FEATURES — v0.2.0 REFINEMENT

### 4A. GRANT TRACKER TAB (NEW — HIGH VALUE)

**Purpose:** Show telecom professionals what grants are CURRENTLY OPEN, upcoming, or recently closed. This is the "pass it to sales" feature.

**Grant programs to track:**

| Program | Agency | Total Funding | Type | Status (Feb 2026) |
|---------|--------|--------------|------|-------------------|
| BEAD | NTIA/Commerce | $42.45B | State-administered grants | 50/56 states approved; subgrant apps open in early states; construction Summer 2026 |
| ReConnect (Round 5) | USDA/RUS | $600M+ per round | Grants, loans, loan-grant combos | Round 5 closed May 2024; Round 6 expected 2026 |
| E-Rate (FY2026) | FCC/USAC | ~$4B/year | Discounts for schools/libraries | FY2026 Form 471 window: Jan 21 – Apr 1, 2026 (OPEN NOW) |
| Community Connect | USDA/RUS | ~$26M/year | Grants for <10/1 Mbps areas | FY2025 apps opened Feb 20, closed Apr 21, 2025 |
| Digital Equity Capacity | NTIA | $1.44B (FY22-26) | Formula grants to states | Active through FY2026 |
| Digital Equity Competitive | NTIA | $1.25B (FY22-26) | Competitive grants | TBD for 2026 round |
| Tribal Broadband (TBCP) | NTIA | ~$500M remaining | Tribal grants | New NOFO expected Spring 2026 |
| Enhanced A-CAM | FCC/USAC | ~$1.3B/yr over 15 yrs | Carrier cost model support | 368 carriers accepted; 50% deploy by Dec 2026 |
| Capital Projects Fund | US Treasury | $10B (one-time) | State-administered | Most states disbursing; some still active |

**Data fields per grant:**
```javascript
{
  id: 'bead',
  name: 'BEAD Program',
  agency: 'NTIA / Dept. of Commerce',
  totalFunding: 42450000000,
  type: 'Infrastructure Grant',
  eligibleApplicants: 'ISPs, cooperatives, municipalities, tribes, nonprofits',
  techRequirements: '100/20 Mbps, ≤100ms latency (tech-neutral since June 2025)',
  matchRequired: 'Varies by state (typically 25%)',
  maxAward: 'Varies by state allocation',
  status: 'Open - Subgrant applications in approved states',
  keyDates: [
    { date: '2025-11-14', event: 'First 18 Final Proposals approved' },
    { date: '2025-12-04', event: 'Texas approved ($1.2B, 240K BSLs)' },
    { date: '2026-02-09', event: '50/56 Final Proposals approved' },
    { date: '2026-Q2', event: 'Construction begins in early states' }
  ],
  applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/bead',
  statePortals: { TX: 'https://comptroller.texas.gov/programs/broadband/funding/bead/', ... },
  notes: '"Benefit of the Bargain" reforms (June 2025): tech-neutral, cost as primary factor, ~$6B projected savings',
  relevantStates: ['TX','LA','GA','VA','MT','IA','SC','CA','OH','NM']
}
```

**UI Design:**
- New tab: "⊕ Grants" between Charts and Insights
- Card layout for each grant program (similar to insight items)
- Status badges: 🟢 Open Now | 🟡 Upcoming | 🔴 Closed | ⏳ Rolling
- Key dates timeline
- "Apply Now" link buttons to official portals
- Filter by: state relevance, grant type, status
- Per-state BEAD portal deep links

### 4B. PAST AWARDS / DEPLOYMENTS TAB (NEW — HIGH VALUE)

**Purpose:** Competitive intelligence. Who won grants? How much? Where? What tech?

**Data sources (all public):**

| Source | What It Contains | Access |
|--------|-----------------|--------|
| FCC RDOF Auction 904 | $9.2B awarded to 180 bidders, 5.2M locations. Winner, $ amount, census blocks, technology type. 35% now in DEFAULT ($3.3B). | Public CSV from FCC |
| USDA ReConnect Awards | 5 rounds of awards. Applicant, location, $ amount, households served, sq miles, technology. | Public list on USDA website |
| FCC Broadband Funding Map | Aggregates ALL federal broadband awards (RDOF, CAF-II, E-ACAM, ReConnect, TBCP, CPF). | Downloadable at fundingmap.fcc.gov |
| BEAD Subgrant Awards | TX: 22 applicants, $1.2B for 240K BSLs (Dec 2025). Other states publishing as approved. | State broadband office websites |
| USAC E-Rate Commitments | School/library telecom funding by entity. | opendata.usac.org API |

**Data model per past award:**
```javascript
{
  program: 'RDOF Phase I',
  awardee: 'Windstream',
  awardAmount: 522688818,
  locations: 195188,
  state: 'Multi-state',
  counties: ['...'],
  technology: 'Fiber',
  speedTier: 'Gigabit',
  awardDate: '2020-12-07',
  status: 'Authorized',  // Authorized | Defaulted | Building | Complete
  defaulted: false,
  defaultAmount: 0,
  buildoutDeadline: '2028-12-31',
  source: 'FCC Auction 904'
}
```

**Unique angle — RDOF Default Tracker:**
- $3.3B of $9.2B RDOF has DEFAULTED (35%!)
- 1.9M locations lost service commitments
- Many defaulted locations NOT eligible for BEAD (fell through the cracks)
- This is a MASSIVE opportunity signal: areas that lost RDOF funding = desperate for builders
- We show: which counties had RDOF defaults, which are now BEAD-eligible, which are orphaned

**UI Design:**
- New tab: "◉ Awards" between Table and Charts
- Top-level stats: total $ awarded, total locations, % defaulted
- Searchable/filterable table of past awards
- Click award → see counties covered, link to FCC data
- "Default zones" highlighted on map as special overlay
- State-level rollup: per-state awards, defaults, remaining commitments

### 4C. ENHANCED INFRASTRUCTURE DATA

**Cell Tower Data (FCC ASR — Public):**
- FCC publishes weekly Antenna Structure Registration dumps
- Fields: lat/lng, height, structure type (guyed tower, monopole, lattice, building), owner, status
- ~130K registered structures nationwide
- We aggregate to county level: tower count, avg height, structure type mix, owner diversity
- Phase 2: individual tower markers on map (clickable)

**CBRS / Private 5G Data:**
- 420,000+ CBRS radios deployed nationwide (as of Feb 2026)
- Priority Access Licenses (PALs) sold by county at FCC Auction 105 (2020) — public data
- PAL holders: Verizon (dominant), Charter/Comcast MVNOs, enterprises
- CBRS 2.0 (June 2024): 97% indoor coverage, 24-hour heartbeat interval
- Use cases: John Deere smart factories, DFW Airport, military logistics, rural FWA
- We can show: PAL license holders by county, estimated CBRS deployment density
- This is valuable for private 5G consultants (NTT DATA, Boldyn use case)

**County data model additions:**
```javascript
// Add to each county object:
{
  // Existing fields...

  // NEW: Infrastructure detail
  towerTypes: { monopole: 12, lattice: 5, guyed: 2, building: 8 },
  towerOwners: ['Crown Castle', 'American Tower', 'SBA Communications'],
  avgTowerHeight: 180,  // feet

  // NEW: CBRS / Private 5G
  cbrsStatus: 'PAL Licensed',  // PAL Licensed | GAA Only | No Activity
  palLicenseHolder: 'Verizon',
  palLicenseCount: 4,  // Number of PAL channels
  estimatedCBRSRadios: 35,

  // NEW: Past funding
  rdofAwarded: 2400000,
  rdofStatus: 'Authorized',  // Authorized | Defaulted | Partial Default
  rdofAwardee: 'Windstream',
  reconnectAwards: 0,
  totalPastFunding: 2400000,

  // NEW: BEAD subgrant detail (where available)
  beadSubgrantAwardee: null,
  beadSubgrantAmount: null,
  beadSubgrantStatus: null
}
```

---

## 5. DATA SOURCES — COMPLETE RESEARCH

### 5A. RDOF DEFAULTS — WHAT IT IS AND WHY IT MATTERS

**RDOF (Rural Digital Opportunity Fund)** was a $9.2 billion FCC reverse auction (Auction 904, Nov 2020) to fund broadband in 5.2 million unserved rural locations. ISPs bid DOWN — lowest subsidy request wins.

**$3.3 billion (35%) has DEFAULTED**, affecting 1.9 million locations. Major defaulters:
- LTD Broadband: $1.32B rejected (couldn't build)
- SpaceX/Starlink: $886M rejected (speeds too slow — 67/8 vs required 100/20)
- CenturyLink: $262M partial default (41K of 77K locations)
- 135+ total entities defaulted

**Why it's our killer feature:** Default zones = proven demand + zero competition + potential BEAD eligibility. No other free tool maps these as opportunities. We treat them as a treasure map, not just a policy failure.

**Exact data sources:**
1. FCC Auction 904 Results tab → Winning Bidders CSV (original awards)
2. FCC Auction 904 Results tab → Pre-Authorization Default Summary CSV (12/20/2023)
3. FCC Auction 904 Results tab → Post-Authorization Default Summary CSV (01/14/2025)
4. Benton Institute analysis spreadsheet (aggregated per-state, per-ISP)
5. FCC Broadband Funding Map bulk download (all federal awards, geospatial)
6. USAC CAF Map (deployment progress for RDOF + CAF programs)

All downloadable from: `https://www.fcc.gov/auction/904/round-results`

### 5B. GRANT STACKING — ALL 20+ PROGRAMS

**Our unique value proposition:** No free tool shows all applicable grants for a single county. We aggregate federal + state + regional into one "Fundability Score."

**Federal Programs (12 tracked):**
| # | Program | Agency | Total $ | Status | Data Source |
|---|---------|--------|---------|--------|-------------|
| 1 | BEAD | NTIA | $42.45B | Open (50/56 approved) | fundingmap.fcc.gov |
| 2 | E-Rate FY2026 | FCC/USAC | $4.5B/yr | OPEN NOW (Form 471 due Apr 1) | opendata.usac.org |
| 3 | Enhanced A-CAM | FCC | $19.5B/15yr | Active (368 carriers) | fundingmap.fcc.gov |
| 4 | ReConnect R6 | USDA | ~$600M | Upcoming 2026 | rd.usda.gov/telecom-maps |
| 5 | Capital Projects Fund | Treasury | $10B | States disbursing | State broadband offices |
| 6 | Digital Equity Capacity | NTIA | $1.44B | Active FY2022-26 | NTIA data site |
| 7 | Digital Equity Competitive | NTIA | $1.25B | Annual rounds | NTIA data site |
| 8 | Enabling Middle Mile | NTIA | $980M | Awarded (construction) | data-ntia.opendata.arcgis.com |
| 9 | Tribal Broadband | NTIA | $3B | New NOFO Spring 2026 | data-ntia.opendata.arcgis.com |
| 10 | Community Connect | USDA | $26M/yr | Annual rounds | usda.gov |
| 11 | Rural Health Care | FCC/USAC | $600M/yr | Rolling | opendata.usac.org |
| 12 | RDOF (remaining) | FCC | ~$6B active | Building (40% milestone) | fcc.gov/auction/904 |

**State Programs (10 states, 20+ programs tracked):**
| State | Key Programs | Biggest $ | Source |
|-------|-------------|-----------|--------|
| TX | BOOT, Middle Mile, Pole Replace, Workforce | $5B+ total | comptroller.texas.gov |
| CA | Middle-Mile Initiative, CASF, FFA | $3.25B (MMBI alone) | broadbandforall.cdt.ca.gov |
| VA | VATI (running since 2017) | $120M/yr | dhcd.virginia.gov |
| LA | GUMBO Program | $176M | connect.la.gov |
| GA | Georgia Broadband Initiative | Varies | gta.georgia.gov |
| MT | ConnectMT | $129M | connectmt.mt.gov |
| IA | Empower Rural Broadband | $150M | ocio.iowa.gov |
| SC | SC Broadband Office | $400M+ | ors.sc.gov |
| OH | BroadbandOhio | $700M+ | innovateohio.gov |
| NM | Match Fund (HB 177) | $100M | dfa.nm.gov |

**Regional Programs (2+ tracked):**
- Appalachian Regional Commission (~$50M/yr) — VA, OH, GA counties
- Delta Regional Authority — LA parishes

**Data Sourcing Tiers:**
1. **Automated (Tier 1):** FCC Broadband Funding Map bulk download → aggregates ALL federal awards to census block level → we roll up to county. Single download covers RDOF, CAF-II, E-ACAM, ReConnect, TBCP, CPF.
2. **Semi-automated (Tier 2):** State program awards from state broadband office websites. We manually curate into `data-state-grants.js` and check monthly.
3. **Calculated (Tier 3):** Grant Stacking Calculator determines which programs apply per county. Fundability Score (0-100) becomes a new scoring component.

### 5C. FREE PUBLIC DATA (confirmed available)

| Source | Data | Access Method | Refresh |
|--------|------|--------------|---------|
| FCC BDC | Served/unserved/underserved BSLs by county | Bulk CSV, ArcGIS | Biannual (Jun, Dec) |
| NTIA BEAD Dashboard | State approval status, allocations | Web scrape / manual | Live |
| US Census ACS 5-Year | Pop, income, density, poverty | API or bulk CSV | Annual |
| FCC ASR | Cell tower locations + metadata | Weekly pipe-delimited dumps (FOIA) | Weekly |
| FCC Auction 904 (RDOF) | Winners, amounts, census blocks, defaults | Public CSV from FCC | Updated as defaults occur |
| FCC Broadband Funding Map | ALL federal broadband awards aggregated | fundingmap.fcc.gov/data-download | Periodic |
| USDA ReConnect Awards | Award recipients, amounts, locations | usda.gov/reconnect | Per round |
| USAC E-Rate Open Data | School/library funding commitments | opendata.usac.org REST API | Quarterly |
| FCC Auction 105 (CBRS PAL) | PAL license winners by county | Public FCC auction data | Static (2020 auction) |
| OpenCelliD | Crowd-sourced cell tower locations + radio type | CC BY-SA 4.0, API | Continuous |
| USDA Rural-Urban Codes | Rural/urban classification | Static CSV | Decennial |
| FBI UCR/NIBRS | Crime rates by county | Public download | Annual |

### PAID / PREMIUM (Phase 3+):
| Source | Data | Cost |
|--------|------|------|
| FiberLocator / GeoTel | Actual fiber route maps | $5K-15K/year |
| Inside Towers Database | Enhanced tower data + fiber availability + transactions | Subscription |
| WePlan Analytics | Crowd-sourced CBRS signal measurements | Research license |

---

## 6. DATA MODEL & SCORING ENGINE

(Unchanged from v0.2.0 — see previous doc for full scoring formula, weights, density curve, etc.)

**Key additions to county data object:** See section 4C above.

---

## 7. TECHNICAL ARCHITECTURE

### File structure (v0.2.0):
```
spectral-nexus/
├── index.html
├── css/style.css
├── js/
│   ├── config.js         # Weights, constants, grant program data
│   ├── data.js           # ~200 counties
│   ├── data-grants.js    # NEW: Grant program definitions + deadlines
│   ├── data-awards.js    # NEW: Past awards (RDOF, ReConnect, etc.)
│   ├── scoring.js        # Scoring engine
│   ├── kpi.js            # KPI cards
│   ├── map.js            # Leaflet map
│   ├── table.js          # Data table
│   ├── charts.js         # Chart.js charts
│   ├── grants.js         # NEW: Grant tracker tab
│   ├── awards.js         # NEW: Past awards tab
│   ├── insights.js       # Insights + BEAD tracker
│   └── app.js            # Controller (updated for new tabs)
├── assets/logo.svg
└── README.md
```

### Load order:
```html
<script src="js/config.js"></script>
<script src="js/data.js"></script>
<script src="js/data-grants.js"></script>
<script src="js/data-awards.js"></script>
<script src="js/scoring.js"></script>
<script src="js/kpi.js"></script>
<script src="js/map.js"></script>
<script src="js/table.js"></script>
<script src="js/charts.js"></script>
<script src="js/grants.js"></script>
<script src="js/awards.js"></script>
<script src="js/insights.js"></script>
<script src="js/app.js"></script>
```

---

## 8. DESIGN & BRAND

(Unchanged — dark spectral theme, Outfit/DM Sans/JetBrains Mono, see previous doc)

**New tab design notes:**
- Grants tab: card-based layout, status badges with glow effect, timeline markers
- Awards tab: stat cards at top (total $, locations, default rate), then filterable table
- Both tabs maintain dark theme, teal/amber/red status colors

---

## 9. FEATURE ROADMAP

### v0.1.0 (DONE) — Core Dashboard
- Map + table + charts + insights + KPIs + methodology

### v0.2.0 (IN PROGRESS) — Actionable Intelligence
- Grant Tracker tab (open grants, deadlines, requirements, links)
- Past Awards tab (RDOF winners, ReConnect, defaults, BEAD subgrants)
- Enhanced county data (tower types, CBRS, past funding)
- RDOF Default overlay on map

### v0.3.0 (NEXT) — Decision-Making Tool
- State-level grant programs database (TX has $5B+ alone, CA has $3.25B)
- Grant stacking calculator (show ALL applicable grants per county)
- Competitive landscape (ISPs per county from FCC BDC data)
- RDOF default zone map overlay ($3.3B defaulted = massive opportunity)
- Middle mile proximity layer (distance to nearest lit backbone)
- Real FCC BDC data for at least 3 states
- County polygon GeoJSON (replace circle markers)
- Enterprise/anchor institution density scores
- County comparison mode (side-by-side)
- Custom scoring weight sliders

### v0.4.0 — User Features
- Scoring weight sliders in UI
- County comparison mode (side-by-side)
- URL state / shareable links
- Export to CSV/PDF

### v0.5.0 — Scale
- All 3,143 US counties
- County polygon GeoJSON (not just centroids)
- Real-time data refresh pipeline

### v1.0.0 — Production
- Custom domain deployment
- User accounts + saved searches
- Email alerts for new grants
- API for third-party integration

---

## 10. DECISIONS LOG

### v0.3.0 Decisions (Session 4):
- ADD RDOF Default Zone overlay as premium feature — $3.3B/1.9M locations defaulted, data freely available from FCC Auction 904 results tab
- ADD Grant Stacking Calculator — show ALL applicable federal + state + regional grants per county (unique, no competitor does this)
- ADD Fundability Score (0-100) as new scoring component — how many programs a county can access
- ADD State-level grant database for all 10 states — TX ($5B+), CA ($3.25B MMBI), VA (VATI), etc.
- ADD 12 federal programs (beyond just BEAD) — E-Rate, ReConnect, E-ACAM, Middle Mile, TBCP, CPF, Digital Equity, Community Connect, Rural Health Care
- ADD regional programs — ARC (VA/OH/GA), Delta Regional Authority (LA)
- USE FCC Broadband Funding Map bulk download as primary data source (aggregates all federal awards to census block level)
- CALCULATE county-level RDOF defaults from 3 FCC CSV files (winners + 2 default summaries)
- CURATE state programs manually (check monthly) — no API exists, each state publishes differently
- KEEP data-grants.js for federal programs, ADD data-state-grants.js for state programs

### v0.2.0 Decisions:
- ADD Grant Tracker tab — high value for sales teams (user request)
- ADD Past Awards tab — competitive intelligence (user request)
- ADD CBRS/PAL data per county — private 5G consultants need this
- ADD RDOF default tracking — massive opportunity signal ($3.3B defaulted)
- ADD tower type breakdown (monopole/lattice/guyed/building)
- KEEP all v0.1.0 features unchanged
- Use mock data for grants/awards in MVP, with real structure for Phase 3 data import
- Tabs now: Table | Awards | Charts | Grants | Insights (5 tabs)

---

## 11. SESSION HISTORY

| Session | Date | Focus |
|---------|------|-------|
| 1 | Feb 20, 2026 | Project planning, scope, data source research, all decisions resolved |
| 2 | Feb 20, 2026 | Built MVP v0.1.0 (9 JS modules + HTML + CSS), delivered zip |
| 3 | Feb 20, 2026 | Research: grants, RDOF, CBRS, tower data. Designed Grant Tracker + Past Awards tabs. Building v0.2.0 |
| 4 | Feb 20, 2026 | Deep market research for v0.3.0. Analyzed Boldyn Networks & NTT DATA needs. Mapped full federal+state grant landscape (BEAD is just 1 of 20+ programs). Identified 23 feature ideas ranked by impact. Found 15+ free open datasets. Created V03_STRATEGY.md with complete plan. Key insight: grant stacking calculator + state-level programs + competitive landscape = differentiation. |
| 5 | Feb 20, 2026 | RDOF Defaults deep-dive: explained the $3.3B/$9.2B default (35%), mapped exact data sources (3 FCC CSVs + Benton analysis). Built complete data sourcing methodology for all 20+ programs across 3 tiers (automated federal, semi-automated state, calculated). Designed Grant Stacking Calculator logic and Fundability Score. Documented 12 federal, 20+ state, 2+ regional programs with exact URLs, eligibility, status, and data sources. Updated both strategy and project docs. |

---

## 12. COMPANION DOCUMENTS

| Document | Location | Contents |
|----------|----------|----------|
| Project Doc (this file) | SPECTRAL_NEXUS_PROJECT_DOC.md | Master reference for all sessions |
| v0.3.0 Strategy | SPECTRAL_NEXUS_V03_STRATEGY.md | Deep market research, 23 feature ideas, data source catalog, competitive analysis |
