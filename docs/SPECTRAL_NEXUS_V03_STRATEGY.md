# SPECTRAL NEXUS v0.3.0 — Strategic Research & Feature Plan
### Date: February 20, 2026
### Purpose: Deep market research for MVP v0.3.0 improvements
### Perspective: Telecom executive / consultant at Boldyn Networks or NTT DATA

---

## EXECUTIVE SUMMARY

After extensive research into what Boldyn Networks, NTT DATA, fiber ISPs, and broadband consultants actually need, I've identified **5 major capability gaps** in our current tool and **23 specific feature ideas** organized by impact. The key insight: **our tool is currently county-centric, but the real money decisions happen at the project level** — specific grant applications, specific build areas, specific competitive dynamics. v0.3.0 should bridge from "interesting dashboard" to "decision-making tool."

---

## PART 1: WHO ARE OUR USERS AND WHAT DO THEY ACTUALLY NEED?

### 1A. BOLDYN NETWORKS — Profile & Needs

**What they do:** Boldyn is a neutral-host shared infrastructure provider. They build DAS (Distributed Antenna Systems), private 5G networks, and small cell networks. Key verticals:
- Public transit (NYC Subway, London Underground, SF BART)
- Airports (SEA, Nashville, Asheville)
- Venues, universities, military bases, ports
- Commercial real estate

**$1.2B debt financing** secured Jan 2025 to expand US footprint. Named Forrester Leader in Private 5G Services (Q4 2025).

**What Boldyn would want from Spectral Nexus:**
1. **Venue & anchor institution density by county** — Where are the airports, stadiums, universities, hospitals that need DAS/private 5G?
2. **Population density corridors** — Not just county average, but transit-corridor-level density
3. **Existing DAS/small cell deployment gaps** — Areas with high foot traffic but poor indoor coverage
4. **Municipal/public-sector contact data** — Who runs the transit authority, port authority, school district?
5. **Private 5G readiness score** — Combines manufacturing density, hospital density, warehouse/logistics presence
6. **Neutral host economics** — Counties where multiple MNOs underperform = neutral host opportunity

### 1B. NTT DATA — Profile & Needs

**What they do:** NTT DATA is a $30B+ global IT services & consulting firm. Their telecom practice focuses on:
- Telco cloud transformation (helping carriers modernize)
- 5G core network deployment
- Network managed services (10M+ network assets managed globally)
- Open RAN consulting
- Private 5G for enterprises (manufacturing, ports, logistics)
- Software-defined networking

**What NTT DATA would want from Spectral Nexus:**
1. **Enterprise density maps** — Where are the manufacturing plants, logistics hubs, ports that need private 5G?
2. **Carrier coverage quality data** — Where do AT&T/Verizon/T-Mobile have weak coverage (= consulting opportunity)?
3. **Fiber proximity to enterprise locations** — Can we serve this factory with fiber backhaul?
4. **BEAD subcontractor opportunities** — NTT DATA could consult for ISPs winning BEAD grants
5. **Digital transformation readiness** — Counties with tech workforce, data center proximity
6. **Open RAN deployment candidates** — Rural areas where traditional RAN is too expensive

### 1C. Fiber ISPs (Brightspeed, Windstream, Lumen, AT&T, co-ops) — Needs

1. **Unserved BSL locations at census-block level** — Not county-level, BLOCK-level
2. **Grant stacking calculator** — Can I combine BEAD + state funds + CPF for the same area?
3. **Pole attachment costs & make-ready timelines by utility territory**
4. **Middle-mile proximity** — How far to nearest lit fiber backbone?
5. **Construction cost estimates** — Aerial vs. underground, terrain difficulty
6. **Competitive landscape** — What other ISPs serve this area? At what speeds?
7. **RDOF default zones** — Guaranteed demand, zero competition
8. **Revenue modeling** — Take rate estimates based on demographics

---

## PART 2: FUNDING LANDSCAPE — IT'S NOT JUST BEAD

### The funding universe is MUCH bigger than we're showing. Here's the full stack:

### TIER 1: FEDERAL MEGA-PROGRAMS (>$1B each)

| Program | Agency | Total $ | Status Feb 2026 | Our Coverage |
|---------|--------|---------|-----------------|-------------|
| **BEAD** | NTIA | $42.45B | 50/56 approved, construction Summer 2026 | ✅ Covered |
| **E-Rate** | FCC/USAC | ~$4.5B/yr | FY2026 Form 471 OPEN (Jan 21 - Apr 1) | ✅ Covered |
| **Enhanced A-CAM** | FCC | $19.5B (15yr) | 368 carriers building, 50% by Dec 2026 | ✅ Covered |
| **ReConnect** | USDA | $3.7B (5 rounds) | Round 6 expected 2026 | ✅ Covered |
| **Capital Projects Fund** | Treasury | $10B | States disbursing, obligation deadline Dec 2026 | ✅ Covered |
| **Digital Equity (Capacity)** | NTIA | $1.44B | Formula grants active through FY2026 | ✅ Covered |
| **Digital Equity (Competitive)** | NTIA | $1.25B | Annual rounds through FY2026 | ⚠️ Mentioned |
| **Enabling Middle Mile** | NTIA | $980M | 35 states + PR, $930M awarded Jun 2023 | ❌ MISSING |
| **Tribal Broadband** | NTIA | $3B | New NOFO Spring 2026 | ✅ Covered |

### TIER 2: STATE-LEVEL PROGRAMS (WE'RE MISSING ALL OF THESE!)

This is a **huge gap**. Every state we cover has its OWN broadband programs on top of federal:

**TEXAS** (Broadband Infrastructure Fund — $5B+ state-only):
- **BOOT Program**: $634.8M (CPF + BIF) for last-mile projects
- **Texas Middle Mile (TMM)**: $200M for middle-mile infrastructure
- **Pole Replacement Program**: $75M for pole make-ready costs
- **Workforce Grant**: $25M for fiber optic training programs
- **LEO Satellite Program**: $30M (cancelled — no qualified applicants)
- **TSLAC Library Broadband**: $7.8M
- **Rural Hospital Broadband (TDA)**: $22.9M
- **TxDOT Rest Area Broadband**: $6M

**CALIFORNIA** ($3.25B+ state programs):
- **Middle-Mile Broadband Initiative (SB 156)**: $3.25B for statewide open-access middle-mile network
- **CASF Infrastructure Account**: $750M credit enhancement for local broadband
- **Federal Funding Account (FFA)**: Rounds 1 & 2 for unserved locations
- **Tribal Technical Assistance Grants**: Quarterly rolling applications
- **CPUC Broadband Adoption Grants**: Multiple programs

**VIRGINIA** ($700M+ in state broadband):
- **VATI (Virginia Telecommunication Initiative)**: ~$120M/year since 2017
- **Line Extension Customer Assistance Program (LECAP)**
- **Appalachian Regional Commission broadband grants**

**COLORADO** (referenced in research):
- **BUILD Authority (SB 81, 2025)**: State infrastructure financing authority that can issue bonds for broadband
- **Broadband Deployment Board**: State-level grants

**OTHER STATES WITH BIG PROGRAMS:**
- **Minnesota**: $50M+ in state broadband grants (24 projects announced Mar 2024)
- **Kansas**: State broadband grants + infrastructure hub
- **New Mexico**: $100M Match Fund (HB 177) for federal grant matching
- **West Virginia**: Combined broadband + data center incentives package (2025)
- **Oregon**: SB 793 state land easements; HB 3148 Lifeline subsidy increase

> **KEY INSIGHT**: A consultant looking at Presidio County, TX doesn't just see $5.8M in estimated BEAD funding — they see $5.8M BEAD + potential BOOT program + Pole Replacement reimbursement + possible Middle Mile connection. **Grant stacking is how real projects get funded.**

### TIER 3: REGIONAL & SPECIALTY PROGRAMS

| Program | Coverage Area | Total $ | Notes |
|---------|-------------|---------|-------|
| **Appalachian Regional Commission (ARC)** | 423 counties in 13 states | ~$50M/yr broadband | VA, OH overlap with our states |
| **Delta Regional Authority** | 252 counties, 8 states | Broadband grants | LA, parts of TX |
| **CDBG (HUD)** | Nationwide | States allocate for broadband | Often overlooked |
| **EDA (Commerce)** | Nationwide | Economic development grants usable for broadband | Requires economic impact narrative |
| **USDA Community Connect** | Rural <10/1 Mbps | ~$26M/yr | Very targeted |
| **DOI Tribal Programs** | Tribal lands | $300M+ (2025 expedited) | Separate from TBCP |
| **FCC 5G Fund** | Nationwide rural | $9B (proposed, not yet started) | Would follow RDOF model |
| **Rural Health Care Program (FCC)** | Healthcare facilities | ~$600M/yr | Telehealth broadband |

---

## PART 3: OPEN DATA SOURCES WE SHOULD INTEGRATE

### 3A. DATA WE CAN GET FOR FREE RIGHT NOW

| Dataset | Source | What It Gives Us | Format | URL |
|---------|--------|-----------------|--------|-----|
| **FCC BDC (Broadband Data Collection)** | FCC | Served/unserved/underserved by BSL, by provider, by technology | CSV per state | broadbandmap.fcc.gov/data-download |
| **FCC ASR (Antenna Structure Registration)** | FCC | 130K+ tower locations with lat/lng, height, type, owner | Pipe-delimited weekly dumps | wireless.fcc.gov/antenna |
| **FCC Broadband Funding Map** | FCC | ALL federal broadband awards aggregated (RDOF, CAF, E-ACAM, etc.) | GIS/download | fundingmap.fcc.gov |
| **FCC Auction 904 (RDOF) Results** | FCC | Winner, amount, locations, default status per census block group | CSV | fcc.gov/auction/904 |
| **FCC Auction 105 (CBRS PAL) Results** | FCC | PAL license winners by county | CSV | fcc.gov/auction/105 |
| **USAC CAF Map / Open Data** | USAC | CAF-II, A-CAM, E-ACAM deployment data by location | GIS/API | data.usac.org |
| **USAC E-Rate Commitments** | USAC | School/library broadband funding by entity | REST API | opendata.usac.org |
| **NTIA NBAM (National Broadband Availability Map)** | NTIA | Aggregated federal + state + commercial broadband data | GIS platform | nbam.ntia.gov |
| **NTIA Public Data Site** | NTIA | Grant awards geospatial data (BIP, TBCP, CMC) | ArcGIS | data-ntia.opendata.arcgis.com |
| **Census ACS 5-Year** | Census Bureau | Demographics, income, poverty, education, housing | API + CSV | data.census.gov |
| **Census TIGER/Line** | Census Bureau | County boundary polygons (GeoJSON) | Shapefile/GeoJSON | census.gov/geographies |
| **USDA ReConnect Awards** | USDA RUS | Award details per round | Website tables | usda.gov/reconnect |
| **USDA RUS Telecom Maps** | USDA | All RUS-funded service areas (ReConnect, BIP, Community Connect) | Interactive map + download | rd.usda.gov/telecom-maps |
| **HIFLD (Homeland Infrastructure)** | DHS/CISA | Critical infrastructure including cell towers, data centers | ArcGIS Hub | hifld-geoplatform.hub.arcgis.com |
| **OpenCelliD** | Community | Crowd-sourced cell tower locations + radio type (LTE/5G/NR) | CC BY-SA API | opencellid.org |
| **BLS QCEW** | Bureau of Labor Statistics | Employment by industry by county (find manufacturing, logistics, healthcare density) | CSV/API | bls.gov/cew |
| **FEMA National Risk Index** | FEMA | Natural disaster risk by county | GIS/CSV | hazards.fema.gov/nri |
| **DOT National Transportation Atlas** | USDOT | Road networks, rail lines, airports, ports | GIS | data-usdot.opendata.arcgis.com |
| **FBA (Fiber Broadband Association)** | FBA | Fiber deployment statistics, cost benchmarks | Reports | fiberbroadband.org |

### 3B. PREMIUM DATA (Phase 4+ or Partnership)

| Dataset | Provider | What It Gives | Cost Range |
|---------|----------|--------------|------------|
| **Carrier Fiber Routes** | GeoTel | Actual fiber backbone/route maps by carrier | $5-15K/yr |
| **Fiber Lit Buildings** | GeoTel/FiberLocator | Buildings with on-net fiber connections | $5-15K/yr |
| **Cell Tower Enhanced** | Inside Towers | Tower owner, colocation available, fiber-fed, transactions | Subscription |
| **Ookla Speedtest Intelligence** | Ookla | Actual measured broadband speeds by location | Enterprise license |
| **M-Lab Network Tests** | Measurement Lab | Open speed test data | Free (but requires processing) |
| **Construction Cost Index** | RSMeans / FBA | Per-mile fiber construction costs by region and terrain | $2-5K |

---

## PART 4: 23 FEATURE IDEAS — RANKED BY IMPACT

### 🔴 TIER 1: GAME-CHANGERS (Do these first in v0.3.0)

**1. Grant Stacking Calculator**
- For a selected county, show ALL applicable grants (federal + state + regional)
- Calculate maximum fundable amount by combining programs
- Show eligibility requirements side-by-side
- Example: Presidio County, TX → BEAD ($5.8M est.) + BOOT Program + Pole Replacement + ReConnect R6 = potential $12M+ in combined funding
- **Why it matters:** This is the #1 thing grant writers need. No other free tool does this.

**2. State-Level Grant Programs Database**
- Add 50+ state broadband programs across our 10 states
- Texas alone has 7+ programs totaling $5B+
- California has $3.25B in state-only broadband programs
- Include: program name, administering agency, total $, eligible applicants, deadlines, portal URLs
- **Why it matters:** Our research shows most tools only track federal. State money is enormous and less competitive.

**3. Competitive Landscape View**
- Per county: show which ISPs currently serve, at what speeds, using what technology
- Data source: FCC BDC (free, downloadable per state)
- Highlight "monopoly counties" (only 1 provider >25/3) vs "competitive" (3+)
- Show where the incumbents are weakest
- **Why it matters:** An ISP won't bid BEAD in a county where Comcast/Charter already has 95% fiber. They need to see the gaps.

**4. RDOF Default Zone Overlay**
- Map overlay showing census block groups where RDOF was awarded then DEFAULTED
- Data source: FCC Auction 904 public results
- Show: original awardee, award $, # locations, default date
- Cross-reference with BEAD eligibility — are these locations now BEAD-eligible?
- **Why it matters:** $3.3B defaulted = 1.9M locations with PROVEN demand and ZERO committed provider. This is the lowest-hanging fruit in telecom.

**5. Middle Mile Proximity Layer**
- Show distance from each county to nearest known middle-mile fiber route
- Data sources: NTIA Enabling Middle Mile awards (35 states, $930M), state middle-mile maps (CA's $3.25B network)
- Calculate: "last mile cost premium" based on distance to middle-mile
- **Why it matters:** A county with a middle-mile backbone 5 miles away costs 10x less to serve than one 50 miles from any backbone.

### 🟡 TIER 2: HIGH VALUE (v0.3.0 or v0.4.0)

**6. Enterprise/Anchor Institution Density Score**
- Per county: count of K-12 schools, hospitals, libraries, manufacturing plants, warehouses, government buildings
- Data: Census County Business Patterns, NCES school data, CMS hospital data
- Create "anchor institution score" — more anchors = more revenue anchors for a new network
- **Why it matters:** Boldyn and NTT DATA specifically target anchor institutions. Schools and hospitals are E-Rate eligible, providing guaranteed revenue.

**7. Construction Difficulty Index**
- Per county: terrain type, average lot size, aerial vs. underground mix, utility pole density
- Factors: mountainous terrain, flood zones (FEMA NRI), forested areas, rock/soil type
- Data: FEMA National Risk Index, USGS terrain data, Census housing characteristics
- **Why it matters:** Two counties with identical demand profiles can have 5x different build costs. Investors need to know.

**8. Revenue Potential Estimator**
- Per county: estimated take rate × price × unserved homes = annual revenue potential
- Take rate heuristics: 30-45% for fiber in underserved areas (FBA benchmark), higher where competition is zero
- Factor in median income (willingness to pay) and poverty rate (ACP successor eligibility)
- **Why it matters:** Transforms from "here's a gap" to "here's a $X million annual revenue opportunity."

**9. Workforce Availability Index**
- Per county: existing telecom workers, electricians, construction workers (BLS QCEW data)
- Fiber splicer availability is the #1 bottleneck for BEAD builds nationally
- Factor in: training program proximity, union density, prevailing wage requirements
- **Why it matters:** Texas just launched a $25M fiber workforce training program because this is the bottleneck. A county with no construction workers nearby = cost overruns.

**10. Timeline / Gantt View for Grants**
- Visual timeline showing all grant deadlines, construction milestones, and reporting dates
- Color-coded by program
- "This week" / "This month" / "This quarter" filters
- **Why it matters:** Grant teams juggle 10+ programs with different deadlines. Visual timeline prevents missed windows.

**11. County Comparison Mode**
- Select 2-4 counties, see side-by-side on every metric
- Radar chart comparing their profiles
- "Why this county wins" plain-English explanation
- **Why it matters:** Executives making go/no-go decisions need quick comparisons.

**12. Natural Disaster Risk Layer**
- Per county: FEMA National Risk Index score, top hazard types
- Fiber networks are critical infrastructure — resilience matters for funding narratives
- BEAD explicitly considers network hardening; some state programs prioritize disaster-prone areas
- **Why it matters:** Hawaii's BEAD plan explicitly cited disaster resilience. Network hardening is a grant scoring factor.

### 🟢 TIER 3: NICE TO HAVE (v0.4.0+)

**13. E-Rate Deep Dive**
- Per county: number of E-Rate eligible entities, current spending, unfunded requests
- Data: USAC Open Data API
- "E-Rate opportunity score" based on: entities × avg discount rate × gap from current spending
- **Why it matters:** E-Rate is $4.5B/year of guaranteed recurring revenue for ISPs serving schools/libraries.

**14. Tribal Land Overlay**
- Show tribal territories as a map layer
- Cross-reference with Tribal Broadband eligibility
- Separate scoring for tribal areas (different economics, different programs)
- **Why it matters:** $3B+ in dedicated tribal funding. McKinley County, NM (Navajo Nation) has massive unserved areas.

**15. Export / Report Generator**
- "Generate Investment Memo" for a selected county
- PDF with: opportunity score, all metrics, applicable grants, competitive landscape, risk factors
- Branded template option
- **Why it matters:** The output of using this tool should be a deliverable, not just a screen.

**16. Custom Scoring Weight Sliders**
- Let users adjust the 6 scoring weights in the UI
- Real-time recalculation and re-sort
- Save custom profiles: "Rural Fiber Builder," "Private 5G Consultant," "Grant Writer"
- **Why it matters:** Different users value different factors. A Boldyn exec cares about density; a rural co-op cares about funding.

**17. Provider Market Share View**
- Per county: pie chart of ISP market share by technology
- Highlight: "single provider counties" (monopoly = opportunity)
- Data: FCC BDC served BSLs by provider
- **Why it matters:** Competitive dynamics determine whether a new entrant can win customers.

**18. Data Center Proximity**
- Distance to nearest data center / internet exchange
- At least 37 states passed data center incentive laws in 2025
- Edge compute opportunity increases with distance from major DCs
- **Why it matters:** NTT DATA specifically cares about data center infrastructure.

**19. Legislative Tracker**
- Track state broadband bills (600+ introduced in 2025 alone)
- Highlight: pole attachment reform, permitting streamlining, municipal broadband enablement
- Data: NCSL Technology and Communications Legislation Database
- **Why it matters:** A pole attachment reform bill can reduce build costs 20%. Permitting reform saves 6-12 months.

**20. Speed Test Reality Check**
- Overlay actual measured speeds (M-Lab / Ookla) vs. FCC reported availability
- Show "coverage gap fraud" — where ISPs claim service but actual speeds are terrible
- **Why it matters:** FCC maps overstate coverage. Real speed data reveals true gaps.

**21. Shareable URL State**
- Encode filter state, selected county, active tab into URL hash
- "Share this view" button generates a link
- **Why it matters:** Consultants need to share specific views with clients.

**22. Email Alert System**
- "Watch this county" → get alerts when new grants open, BEAD status changes, new awards
- "Watch this grant" → get alerts on deadline changes, new NOFO releases
- **Why it matters:** Transforms from "check when I remember" to "never miss an opportunity."

**23. API Access**
- REST API for programmatic access to scores, grants, awards data
- Enables integration with CRM systems (Salesforce), project management tools
- **Why it matters:** Enterprise customers (NTT DATA, Boldyn) need to integrate with their workflows.

---

## PART 5: COMPETITIVE ANALYSIS — WHAT ELSE EXISTS?

| Tool | What It Does | Strengths | Weaknesses | Our Advantage |
|------|-------------|-----------|------------|---------------|
| **FCC National Broadband Map** | Official coverage map | Authoritative BSL data | No scoring, no grants, no analytics, clunky UI | We add scoring + grants + competitive intel |
| **BroadbandNow** | Consumer-facing speed/availability search | Good SEO, easy to use | No B2B focus, no grant data, no opportunity scoring | We're built for professionals, not consumers |
| **FiberLocator** | Fiber route maps + provider data | Detailed infrastructure data | $5-15K/year, no grants, no scoring | We're free + scoring + grants (they're infra-only) |
| **GeoTel** | Telecom GIS datasets | Comprehensive fiber/tower data | Very expensive ($10K+), raw data (no analysis) | We provide analysis + context, not just data |
| **Connected Nation** | State broadband mapping partner | Deep state relationships | Consultancy, not a tool. Slow, PDF reports | We're instant, interactive, self-service |
| **NTIA NBAM** | Government broadband analytics | Has federal + state + commercial data | Government-only access (50 states + 7 agencies) | We're public-facing |
| **BroadbandBreakfast** | Broadband industry news + BEAD tracker | Excellent journalism, BEAD coverage | News site, not analytics tool. $49/mo for premium | We're analytics, they're news (complementary) |
| **Inside Towers Database** | Tower data + transactions | Tower-specific detail | Tower-only, no broadband gaps, no scoring | We integrate towers into broader opportunity picture |

**Our unique position:** No free tool combines FCC coverage data + federal/state grant tracking + competitive landscape + opportunity scoring + telecom infrastructure in one interactive dashboard. We're filling a genuine gap.

---

## PART 6: RECOMMENDED v0.3.0 SCOPE

### Must-Have for v0.3.0:
1. **State-level grant programs** (at least TX, CA, VA — our biggest states)
2. **Grant stacking calculator** (show all applicable grants per county)
3. **Competitive landscape** (ISPs per county from FCC BDC)
4. **RDOF default zone map overlay**
5. **Middle mile proximity** (distance to nearest backbone)
6. **Real FCC BDC data** for at least 3 states (replace mock BSL numbers)
7. **County polygon GeoJSON** (replace circle markers with actual boundaries)

### Should-Have for v0.3.0:
8. Enterprise/anchor institution density
9. Construction difficulty index
10. County comparison mode
11. Custom scoring weight sliders
12. Export basic PDF report

### Nice-to-Have (push to v0.4.0):
13. Workforce availability index
14. Revenue potential estimator
15. Legislative tracker
16. Email alerts
17. API access

---

## PART 7: DATA ARCHITECTURE FOR v0.3.0

### New data files needed:
```
js/
├── data-state-grants.js    # 50+ state programs across 10 states
├── data-providers.js       # ISPs per county from FCC BDC
├── data-rdof-defaults.js   # RDOF default zones
├── data-middle-mile.js     # Middle mile routes/proximity
├── data-anchors.js         # Schools, hospitals, libraries per county
├── data-counties-real.js   # Replace mock BSLs with real FCC BDC numbers
```

### County data model additions for v0.3.0:
```javascript
{
  // Existing v0.2.0 fields...

  // NEW v0.3.0: Competitive landscape
  providers: [
    { name: 'AT&T', tech: 'Fiber', maxDown: 1000, maxUp: 1000, bslsServed: 42000 },
    { name: 'Spectrum', tech: 'Cable', maxDown: 500, maxUp: 20, bslsServed: 38000 }
  ],
  providerCount: 2,
  monopolyCounty: false,  // Only 1 provider >25/3

  // NEW v0.3.0: Grant stacking
  applicableGrants: ['bead', 'boot-tx', 'reconnect-r6', 'pole-replace-tx'],
  totalStackableFunding: 12400000,
  stateGrantsAvailable: ['boot-tx', 'tmm-tx', 'pole-replace-tx'],

  // NEW v0.3.0: RDOF defaults
  rdofDefaultLocations: 1800,
  rdofDefaultAmount: 2400000,
  rdofDefaultAwardee: 'LTD Broadband',
  rdofDefaultDate: '2023-06-15',

  // NEW v0.3.0: Middle mile
  nearestMiddleMileKm: 12.5,
  middleMileProvider: 'Zayo',
  middleMileProgram: 'NTIA Enabling Middle Mile',

  // NEW v0.3.0: Anchor institutions
  k12Schools: 8,
  hospitals: 1,
  libraries: 2,
  governmentBuildings: 5,
  manufacturingEstablishments: 12,
  anchorScore: 65,

  // NEW v0.3.0: Construction
  terrainDifficulty: 'moderate',  // flat | moderate | difficult | extreme
  femaRiskScore: 42,
  topHazards: ['Drought', 'Wildfire'],
  estimatedCostPerMile: 28000  // aerial fiber
}
```

---

## PART 8: TECHNICAL NOTES

### Real Data Integration Priority:
1. **FCC BDC** — Download CSV per state, parse to county-level aggregates
2. **FCC ASR** — Weekly pipe-delimited dumps, geocode to counties
3. **Census ACS** — API calls for demographics (already well-documented)
4. **USAC E-Rate** — REST API, aggregate by county
5. **FCC Auction 904** — CSV download, map to counties via census block groups

### Hosting Plan for v1.0:
- Static site on Vercel/Netlify (free tier for MVP)
- Data pipeline: Python scripts to refresh FCC/Census data monthly
- Later: Supabase or similar for user accounts + saved searches

### Performance Considerations:
- 3,143 counties × ~30 fields = manageable in-browser (~2MB JSON)
- County GeoJSON (simplified) = ~5MB
- Lazy-load per-state detailed data
- Web Workers for scoring computation

---

## APPENDIX A: KEY STATISTICS TO REFERENCE

- **BEAD total**: $42.45B across 56 states/territories
- **BEAD savings from reforms**: $21B estimated (NTIA restructuring, June 2025)
- **RDOF total awarded**: $9.2B to 180 bidders for 5.2M locations
- **RDOF defaulted**: ~$3.3B (35%), affecting ~1.9M locations
- **E-Rate annual**: $4.47B/year in discounts
- **Enhanced A-CAM**: $19.5B over 15 years, 368 carriers
- **State broadband bills (2025)**: 600+ introduced, <140 became law
- **Data center incentive laws (2025)**: 37+ states passed them
- **Fiber construction cost**: Avg 73% labor (underground), 67% (aerial) — FBA 2024 study
- **BEAD fiber share**: 80%+ of planned builds are fiber
- **First BEAD construction**: Expected Summer 2026 (LA first, then TX, others)
- **FCC broadband standard**: 100/20 Mbps (updated from 25/3)
- **Neutral host growth**: Enterprise small cells by neutral hosts to double from 14% to 28% by 2030

## APPENDIX B: KEY URLS FOR DATA DOWNLOADS

```
FCC BDC Data:          https://broadbandmap.fcc.gov/data-download/fixed-broadband
FCC Broadband Funding: https://fundingmap.fcc.gov/
FCC ASR Weekly Dumps:  https://wireless.fcc.gov/uls/index.htm?job=transaction&page=weekly
FCC Auction 904:       https://www.fcc.gov/auction/904/round-results
FCC Auction 105:       https://www.fcc.gov/auction/105
USAC Open Data:        https://opendata.usac.org/
USAC CAF Map:          https://data.usac.org/publicreports/caf-map/
NTIA Public Data:      https://data-ntia.opendata.arcgis.com/
NTIA BEAD Dashboard:   https://broadbandusa.ntia.gov/funding-programs/BEAD
Census ACS API:        https://api.census.gov/data/2023/acs/acs5
Census TIGER/Line:     https://www.census.gov/cgi-bin/geo/shapefiles/index.php
USDA RUS Telecom Map:  https://www.rd.usda.gov/programs-services/telecommunications-programs/telecom-maps
USDA ReConnect:        https://www.usda.gov/reconnect
FEMA National Risk:    https://hazards.fema.gov/nri/data-resources
BLS QCEW:             https://www.bls.gov/cew/downloadable-data-files.htm
TX Broadband Office:   https://comptroller.texas.gov/programs/broadband/funding/
CA Broadband for All:  https://broadbandforall.cdt.ca.gov/
CA MMBI Map:           https://broadbandforall.cdt.ca.gov/middle-mile-broadband-initiative/
HIFLD GIS Hub:         https://hifld-geoplatform.hub.arcgis.com/
NCSL Broadband DB:     https://www.ncsl.org/technology-and-communication/broadband-legislation
InternetForAll:        https://www.internetforall.gov/programs
Benton RDOF Analysis:  https://www.benton.org/blog/new-dataset-reveals-impact-rdof-defaults-each-state
FCC Funding Map Data:  https://fundingmap.fcc.gov/data-download/funding-data
CORI Rural Broadband:  https://ruralinnovation.us/resources/mapping-and-data-analytics/
Ready.net State Tracker: https://ready.net/state-broadband-offices
NGA Broadband:         https://www.nga.org/broadband/
Brander BEAD Tracker:  https://brandergroup.net/2025/11/bead-broadband-status-awards-by-state-october-2025/
```

---

## PART 9: RDOF DEFAULTS — FULL EXPLAINER & DATA SOURCE

### What Is RDOF?

RDOF (Rural Digital Opportunity Fund) was a **$9.2 billion FCC reverse auction** (Auction 904) completed in November 2020. The concept: the FCC identified 5.2 million rural locations without 25/3 Mbps broadband, then ran a "reverse auction" where ISPs bid DOWN — whoever asked for the **least** federal subsidy per location won the right (and obligation) to build there.

180 bidders won. The money would pay out over 10 years. Winners had 6-8 years to build. Critically, **once an area was "won" in RDOF, it was locked — no other federal program could fund broadband there**, because it was now "committed."

### What Went Wrong?

The reverse auction incentivized **low bids**, which attracted companies that either:
1. **Couldn't actually build** — They bid low to win, then realized the math didn't work
2. **Didn't have the technology** — Starlink promised 100/20 Mbps but delivered 67/8 Mbps
3. **Weren't financially viable** — Small companies that won huge multi-state contracts they couldn't fund
4. **Were gaming the system** — Bid to block competitors, then defaulted with minimal penalty

### The Major Defaulters

| Company | Award | Locations | What Happened |
|---------|-------|-----------|---------------|
| **LTD Broadband** | $1.32B | 528,088 | Tiny fixed wireless company won the LARGEST award. FCC found they lacked financial/technical ability. Rejected Aug 2022. Fined $21.7M. |
| **SpaceX/Starlink** | $885.5M | 629,831 | Promised 100/20 Mbps low-latency. Actual speeds: 67/8 Mbps by late 2023. FCC rejected Aug 2022, reaffirmed Dec 2023, re-rejected Aug 2024. |
| **CenturyLink/Lumen** | $262.3M (partial) | 41,000 of 77,000 | Defaulted on 53% of their locations across 8 states + 153 CBGs. Happened AFTER states made BEAD maps. |
| **Mercury Wireless** | ~$50M+ | 122,645 | Fixed wireless provider, couldn't complete buildout |
| **Connect Everyone** | ~$40M+ | 108,506 | Defaulted on large rural footprint |
| **30+ tiny ISPs** | Various | <50 each | Won tiny areas, defaulted because compliance paperwork wasn't worth it |
| **~135 total entities** | **$3.3B** | **1.9M locations** | **35% of all RDOF awards defaulted** |

### Why This Matters for Spectral Nexus (THE OPPORTUNITY)

**For telecom professionals, RDOF defaults are the single biggest opportunity signal in the market:**

1. **Proven demand** — The FCC already certified these 1.9M locations as unserved. The demand is real and documented.
2. **Zero competition** — While RDOF was "committed," no other provider could build there. Now that it defaulted, the field is wide open.
3. **BEAD eligibility (partial)** — Many defaulted locations are now eligible for BEAD funding. But some fell through the cracks — the "double whammy" problem: RDOF blocked them from BEAD, then RDOF defaulted, but BEAD maps were already finalized.
4. **Community desperation** — Counties that were told "broadband is coming" for 3-4 years, then got nothing. They are actively seeking new providers.
5. **Ongoing risk** — The 40% buildout milestone was due end of 2024. Many remaining RDOF winners haven't met it. More defaults are coming.

### Exactly How to Get the RDOF Data

The FCC publishes three key datasets on the **"Results" tab of the Auction 904 webpage** at `https://www.fcc.gov/auction/904/round-results`:

**FILE 1: Winning Bidders Summary (12/07/2020)**
- Format: CSV/spreadsheet
- Contains: Every winning bidder, state, 10-year support amount, number of locations
- Granularity: Per-bidder, per-state

**FILE 2: Pre-Authorization Default Summary (12/20/2023)**
- Format: CSV/spreadsheet
- Contains: Defaults that happened BEFORE long-form review (company couldn't even pass the application)
- Includes: LTD Broadband, Starlink, and others that failed the Form 683 review
- Fields: Bidder name, state, census block groups, locations, support amount

**FILE 3: Post-Authorization Default Summary (01/14/2025)**
- Format: CSV/spreadsheet
- Contains: Defaults that happened AFTER authorization (company got approved, started getting paid, then gave up)
- Includes: CenturyLink, Mercury Wireless, and ongoing defaults
- Fields: Same as above

**FILE 4: Benton Institute Analysis Spreadsheet**
- Source: `https://www.benton.org/blog/new-dataset-reveals-impact-rdof-defaults-each-state`
- Contains: Aggregated analysis combining Files 1-3 with per-state and per-ISP breakdowns
- Released: February 2025
- Includes both RDOF and CAF-II defaults

**FILE 5: FCC Broadband Funding Map Download**
- Source: `https://fundingmap.fcc.gov/data-download/funding-data`
- Contains: ALL federal broadband funding awards mapped geographically — RDOF, CAF-II, E-ACAM, ReConnect, TBCP, CPF
- Format: Geospatial download (GIS)
- Cross-references with broadband availability data

**FILE 6: USAC CAF Map / Deployment Data**
- Source: `https://data.usac.org/publicreports/caf-map/`
- Contains: Actual deployment progress for RDOF and all CAF programs
- Shows: Which locations have actually been built vs. still pending
- Downloadable by county, congressional district, tribal boundary

### How We Calculate RDOF Defaults Per County

```
PROCESS:
1. Download FCC Auction 904 Winning Bidders → get original awards per census block group (CBG)
2. Download Pre-Auth Default Summary + Post-Auth Default Summary → get all defaulted CBGs
3. Map CBGs to counties using Census geographic crosswalk (CBG FIPS → County FIPS)
4. For each county, calculate:
   - rdofOriginalAward: sum of all winning bids in that county
   - rdofOriginalLocations: sum of locations committed
   - rdofDefaultedAmount: sum of defaulted support amounts
   - rdofDefaultedLocations: sum of defaulted locations
   - rdofDefaultPct: defaultedLocations / originalLocations
   - rdofDefaultAwardees: list of companies that defaulted in county
   - rdofActiveAward: original - defaulted (what's still building)
   - rdofActiveAwardee: companies still building
5. Cross-reference with FCC BDC → are defaulted locations now BEAD-eligible?
6. Flag "orphaned" locations: defaulted from RDOF but NOT in BEAD maps
```

### Data Model Addition Per County:
```javascript
{
  // RDOF fields
  rdofOriginalAward: 2400000,        // Total RDOF $ awarded to this county
  rdofOriginalLocations: 1800,       // Total locations committed
  rdofDefaultedAmount: 2400000,      // $ that defaulted
  rdofDefaultedLocations: 1800,      // Locations that lost their provider
  rdofDefaultPct: 1.0,               // 100% defaulted in this example
  rdofDefaultAwardees: ['LTD Broadband'],
  rdofActiveAward: 0,                // Still building
  rdofActiveAwardee: null,           // Nobody building here now
  rdofOrphanedLocations: 400,        // Defaulted but NOT in BEAD
  rdofStatus: 'Fully Defaulted'      // Active | Partially Defaulted | Fully Defaulted | Complete
}
```

---

## PART 10: HOW TO SOURCE DATA FOR ALL 20+ FUNDING PROGRAMS

### STRATEGY: Three-Tier Data Sourcing

We don't need to build 20 API integrations. Here's the practical approach:

### TIER 1: BULK FEDERAL DATA (Automated — download CSVs/GIS)

These datasets are machine-readable, downloadable, and can be programmatically ingested:

| Program | Data Source | Format | How to Get It | Update Frequency |
|---------|-----------|--------|---------------|-----------------|
| **RDOF** | FCC Auction 904 Results tab | CSV | Direct download, 3 files (winners + 2 default summaries) | Updated as defaults occur |
| **CAF-II** | USAC CAF Map Open Data | GIS/CSV | `data.usac.org/publicreports/caf-map/` download button | Quarterly (certified Sept annually) |
| **Enhanced A-CAM** | FCC Broadband Funding Map | GIS | `fundingmap.fcc.gov/data-download/funding-data` | Periodic as authorized |
| **ReConnect** | USDA RUS Telecom Maps | GIS/Table | `rd.usda.gov/telecom-maps` — downloadable per round | Per funding round |
| **E-Rate** | USAC Open Data | REST API | `opendata.usac.org` — query by entity/state/year | Quarterly |
| **Middle Mile (NTIA)** | NTIA Public Data Site | ArcGIS | `data-ntia.opendata.arcgis.com` — "Enabling Middle Mile" layer | Static (awarded 2023) |
| **TBCP** | NTIA Public Data Site | ArcGIS | `data-ntia.opendata.arcgis.com` — "Tribal Broadband" layer | Per award round |
| **ALL Federal Combined** | FCC Broadband Funding Map | GIS bulk download | `fundingmap.fcc.gov/data-download/funding-data` | Aggregates all above |

**The FCC Broadband Funding Map is the single best source.** It aggregates RDOF, CAF-II, E-ACAM, ReConnect, TBCP, CPF, and more into one downloadable geospatial dataset. Census block level → we aggregate to county.

### TIER 2: STATE PROGRAMS (Semi-automated — scrape + manual curation)

State broadband programs are the hardest to source because each state publishes differently. Here's our approach for our 10 active states:

**TEXAS** — Broadband Development Office (`comptroller.texas.gov/programs/broadband/`)
```
Programs to track:
├── BEAD ($3.3B federal → state-administered subgrants)
├── BOOT Program ($634.8M) — awards published on BDO website
├── Texas Middle Mile ($200M) — RFP/awards on BDO website  
├── Pole Replacement ($75M) — reimbursement claims, no public award list
├── Workforce Training ($25M) — grants to colleges/trade schools
├── TSLAC Library Broadband ($7.8M) — awards via TSLAC
├── Rural Hospital Broadband ($22.9M) — awards via TDA
└── TxDOT Rest Area Wi-Fi ($6M) — TxDOT procurement

Data sourcing: 
- BDO publishes award lists as PDFs and press releases
- BEAD subgrantee list: 22 applicants, $1.2B, 240K BSLs (Dec 2025)
- BOOT awards: published on comptroller website
- We manually curate these into our data-state-grants.js file
- Check monthly for updates
```

**CALIFORNIA** — CPUC Broadband for All (`broadbandforall.cdt.ca.gov`)
```
Programs to track:
├── BEAD ($1.86B federal → under review, CPUC administering)
├── Middle-Mile Initiative ($3.25B, SB 156) — route map published
├── CASF Infrastructure ($750M+) — awards on CPUC website
├── Federal Funding Account R1 & R2 — Tableau dashboard published
├── Tribal Technical Assistance — quarterly rolling grants
└── Last Mile Federal Funding Account — county-level data published

Data sourcing:
- CPUC publishes a Tableau dashboard with FFA awards
- BEAD Challenge Process map and data published
- Middle-mile routes: interactive map at broadbandforall.cdt.ca.gov/mmbi/
- CASF decisions: published in CPUC proceedings
- We scrape/curate into data-state-grants.js
```

**VIRGINIA** — Office of Broadband (`broadband.virginia.gov`)
```
Programs to track:
├── BEAD ($1.5B federal → approved)
├── VATI ($120M+/yr since 2017) — awards published annually
├── LECAP (Line Extension Customer Assistance Program)
└── ARC broadband grants (Appalachian counties)

Data: VATI publishes annual award lists with amounts and service areas
```

**Pattern for remaining states** (GA, LA, MT, IA, SC, OH, NM):
Each state broadband office publishes:
- BEAD allocations (from NTIA — we have this)
- BEAD subgrantee awards (as they're announced)
- State-specific programs (vary by state)
- Challenge process results

### TIER 3: CALCULATED / DERIVED DATA (We compute this)

Some programs don't have per-county downloads — we calculate county-level values ourselves:

**Grant Stacking Calculator — How It Works:**

```javascript
// For each county, determine all applicable grants:

function calculateGrantStack(county) {
  const stack = [];
  
  // 1. BEAD — if county has unserved/underserved BSLs and state is approved
  if (county.unservedBSLs > 0 && county.beadStatus === 'Approved') {
    stack.push({
      program: 'BEAD',
      level: 'Federal',
      estimatedAmount: county.unservedBSLs * avgBEADPerLocation(county.state),
      status: 'Open',
      eligibility: 'Unserved locations at <25/3 Mbps',
      match: '25% typical',
      deadline: beadDeadline(county.state)
    });
  }
  
  // 2. State programs — lookup by county.state
  const statePrograms = STATE_GRANTS[county.state] || [];
  statePrograms.forEach(program => {
    if (meetsEligibility(county, program)) {
      stack.push({
        program: program.name,
        level: 'State',
        estimatedAmount: estimateStateAward(county, program),
        status: program.status,
        eligibility: program.eligibilitySummary,
        match: program.matchRequirement,
        deadline: program.deadline
      });
    }
  });
  
  // 3. ReConnect — if county is rural and has unserved areas
  if (county.ruralUrbanCode >= 5 && county.unservedPct > 0.10) {
    stack.push({
      program: 'USDA ReConnect',
      level: 'Federal',
      estimatedAmount: 'Up to $25M per project',
      status: 'Round 6 Expected 2026',
      eligibility: 'Rural, ≥90% of locations <100/20',
      match: '25% for grants, 0% for loans',
      deadline: 'TBD'
    });
  }
  
  // 4. E-Rate — if county has K-12 schools or libraries
  if (county.k12Schools > 0 || county.libraries > 0) {
    stack.push({
      program: 'E-Rate (FY2026)',
      level: 'Federal',
      estimatedAmount: county.eRateFunding,
      status: 'Open Now (Form 471 due Apr 1)',
      eligibility: 'Schools and libraries',
      match: 'Discount rate 20-90% based on poverty',
      deadline: '2026-04-01'
    });
  }
  
  // 5. RDOF Default Zone bonus — if county has defaulted locations
  if (county.rdofDefaultedLocations > 0) {
    stack.push({
      program: 'RDOF Default Opportunity',
      level: 'Opportunity Signal',
      estimatedAmount: 'Unserved locations, zero competition',
      status: 'Available Now',
      eligibility: county.rdofDefaultedLocations + ' locations with no provider',
      match: 'N/A — build and capture customers',
      deadline: 'Ongoing',
      isOpportunity: true
    });
  }
  
  // 6. Middle Mile — if county is far from backbone
  if (county.nearestMiddleMileKm > 20) {
    stack.push({
      program: 'NTIA Enabling Middle Mile',
      level: 'Federal',
      estimatedAmount: 'Varies',
      status: 'Awarded (check if county is in a project area)',
      eligibility: 'Extends middle-mile backbone',
      match: '30%',
      deadline: 'N/A (construction underway)'
    });
  }
  
  // 7. Regional programs
  if (isAppalachian(county)) {
    stack.push({ program: 'ARC Broadband', level: 'Regional', ... });
  }
  if (isDelta(county)) {
    stack.push({ program: 'Delta Regional Authority', level: 'Regional', ... });
  }
  if (county.isTribal) {
    stack.push({ program: 'Tribal Broadband (TBCP)', level: 'Federal', ... });
  }
  
  return {
    programs: stack,
    totalPotentialFunding: sumEstimates(stack),
    activeProgramCount: stack.filter(s => s.status.includes('Open')).length,
    fundabilityScore: computeFundabilityScore(stack)
  };
}
```

**Fundability Score (0-100) — New Scoring Component:**
```
fundabilityScore = weighted sum of:
  - Number of applicable programs (more = higher) × 25%
  - Total estimated funding available × 25%
  - Has BEAD eligibility (yes/no, +20 if yes) × 20%
  - Has RDOF defaults (yes = opportunity bonus) × 15%
  - State program richness (TX/CA score high) × 15%
```

This becomes a new component of the Opportunity Score in v0.3.0.

---

## PART 11: COMPLETE PROGRAM DATABASE STRUCTURE

For our tool, we need to store programs at three levels:

### Level 1: Federal Programs (static-ish, we maintain)

```javascript
SN.grants.federal = [
  {
    id: 'bead',
    name: 'Broadband Equity, Access, and Deployment (BEAD)',
    agency: 'NTIA / Dept. of Commerce',
    totalFunding: 42450000000,
    type: 'Infrastructure — Last Mile',
    status: 'Open — Subgrant applications in approved states',
    statusCode: 'open',  // open | upcoming | closed | rolling
    description: 'Largest broadband program in US history. State-administered subgrants for unserved/underserved locations.',
    eligibleApplicants: 'ISPs, cooperatives, municipalities, tribes, nonprofits',
    techRequirements: '100/20 Mbps, ≤100ms latency, fiber priority',
    matchRequired: '25% typical (varies by state)',
    keyDates: [
      { date: '2025-11-14', event: 'First 18 states approved' },
      { date: '2025-12-04', event: 'Texas approved ($3.3B)' },
      { date: '2026-02-09', event: '50/56 approved' },
      { date: '2026-Q2', event: 'Construction begins' }
    ],
    applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/bead',
    dataSourceUrl: 'https://fundingmap.fcc.gov/data-download/funding-data',
    relevantStates: 'all',
    notes: 'Tech-neutral since June 2025 "Benefit of the Bargain" reforms. ~$6B projected savings.'
  },
  {
    id: 'erate-fy2026',
    name: 'E-Rate Program (FY2026)',
    agency: 'FCC / USAC',
    totalFunding: 4500000000,  // annual
    type: 'Connectivity — Schools & Libraries',
    status: 'OPEN NOW — Form 471 window',
    statusCode: 'open',
    description: 'Annual program providing 20-90% discounts on telecom/internet for K-12 schools and libraries.',
    eligibleApplicants: 'Schools, libraries, consortia (ISPs provide service)',
    techRequirements: 'Broadband connectivity, internal connections, managed Wi-Fi',
    matchRequired: '10-80% copay based on poverty rate and rural status',
    keyDates: [
      { date: '2026-01-21', event: 'Form 471 window opened' },
      { date: '2026-04-01', event: 'Form 471 deadline' },
      { date: '2026-07-01', event: 'Funding year begins' }
    ],
    applicationUrl: 'https://www.usac.org/e-rate/',
    dataSourceUrl: 'https://opendata.usac.org/',
    relevantStates: 'all',
    notes: 'ISPs should identify schools/libraries in their target counties and offer to be their E-Rate provider.'
  },
  {
    id: 'reconnect-r6',
    name: 'USDA ReConnect (Round 6)',
    agency: 'USDA / Rural Utilities Service',
    totalFunding: 600000000,  // estimated for round 6
    type: 'Infrastructure — Rural Last Mile',
    status: 'Upcoming — Expected 2026',
    statusCode: 'upcoming',
    description: 'Grants, loans, and grant-loan combinations for rural broadband deployment.',
    eligibleApplicants: 'ISPs, cooperatives, municipalities, tribes, nonprofits in rural areas',
    techRequirements: '100/20 Mbps minimum, ≥90% of locations must lack 100/20',
    matchRequired: '25% for grant-only; 0% for loan-only; variable for combos',
    keyDates: [
      { date: '2024-05', event: 'Round 5 closed' },
      { date: '2026-Q2', event: 'Round 6 NOFO expected' }
    ],
    applicationUrl: 'https://www.usda.gov/reconnect',
    dataSourceUrl: 'https://www.rd.usda.gov/programs-services/telecommunications-programs/telecom-maps',
    relevantStates: 'all',
    notes: 'Max $25M per grant project. Excellent for rural cooperatives. Rounds 1-5 totaled $3.7B.'
  },
  {
    id: 'eacam',
    name: 'Enhanced Alternative Connect America Cost Model (E-ACAM)',
    agency: 'FCC / USAC',
    totalFunding: 19500000000, // over 15 years
    type: 'Infrastructure — Carrier Subsidy',
    status: 'Active — 368 carriers building',
    statusCode: 'closed', // enrollment closed, but disbursements active
    description: 'Monthly subsidies to small/rural carriers to upgrade networks to 100/20 Mbps.',
    eligibleApplicants: 'Rate-of-return carriers (existing program participants)',
    techRequirements: '100/20 Mbps to all eligible locations',
    matchRequired: 'N/A — ongoing monthly support',
    keyDates: [
      { date: '2023-10-30', event: 'Authorized' },
      { date: '2026-12-31', event: '50% deployment milestone' }
    ],
    applicationUrl: 'https://www.usac.org/high-cost/',
    dataSourceUrl: 'https://fundingmap.fcc.gov/data-download/funding-data',
    relevantStates: 'all',
    notes: '368 carriers transitioned from legacy programs. Not open to new applicants but creates "served" areas on the map.'
  },
  {
    id: 'middle-mile-ntia',
    name: 'Enabling Middle Mile Broadband Infrastructure',
    agency: 'NTIA / Dept. of Commerce',
    totalFunding: 980000000,
    type: 'Infrastructure — Middle Mile',
    status: 'Awarded — Construction underway',
    statusCode: 'closed',
    description: 'Funds middle-mile backbone infrastructure to reduce cost of last-mile connections.',
    eligibleApplicants: 'N/A (already awarded)',
    techRequirements: 'Fiber backbone, open-access preferred',
    matchRequired: '30%',
    keyDates: [
      { date: '2023-06', event: '$930M awarded to 35 states + PR' },
      { date: '2026-2028', event: 'Construction period' }
    ],
    applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/enabling-middle-mile-broadband-infrastructure-program',
    dataSourceUrl: 'https://data-ntia.opendata.arcgis.com/',
    relevantStates: 'all',
    notes: 'Know where middle-mile is being built → easier/cheaper to extend last-mile. 370 counties affected.'
  },
  {
    id: 'tbcp',
    name: 'Tribal Broadband Connectivity Program',
    agency: 'NTIA',
    totalFunding: 3000000000,
    type: 'Infrastructure + Adoption — Tribal',
    status: 'Upcoming — New NOFO Spring 2026',
    statusCode: 'upcoming',
    description: 'Dedicated grants for tribal governments to deploy broadband and digital inclusion.',
    eligibleApplicants: 'Tribal governments',
    techRequirements: '100/20 Mbps for infrastructure projects',
    matchRequired: 'None',
    keyDates: [
      { date: '2024-03', event: 'NOFO 2 closed' },
      { date: '2026-Q1', event: 'New NOFO expected' }
    ],
    applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/tribal-broadband-connectivity',
    dataSourceUrl: 'https://data-ntia.opendata.arcgis.com/',
    relevantStates: ['NM','MT','CA'],
    notes: '$1.86B awarded to 226 tribes. ~140K unserved Native households targeted.'
  },
  {
    id: 'cpf',
    name: 'Capital Projects Fund',
    agency: 'US Treasury',
    totalFunding: 10000000000,
    type: 'Infrastructure — COVID Recovery',
    status: 'Active — States disbursing',
    statusCode: 'open',
    description: 'State-administered pandemic recovery funds, many states using for broadband.',
    eligibleApplicants: 'Varies by state',
    techRequirements: '100/20 Mbps preferred',
    matchRequired: 'Varies by state',
    keyDates: [
      { date: '2026-12-31', event: 'Obligation deadline for many states' }
    ],
    applicationUrl: 'https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/capital-projects-fund',
    relevantStates: 'all',
    notes: 'TX alone got $500.5M in CPF. Many states combining CPF with BEAD for maximum coverage.'
  },
  {
    id: 'digital-equity-capacity',
    name: 'State Digital Equity Capacity Grants',
    agency: 'NTIA',
    totalFunding: 1440000000,
    type: 'Adoption — Digital Equity',
    status: 'Active through FY2026',
    statusCode: 'open',
    description: 'Formula grants to states for digital inclusion activities.',
    eligibleApplicants: 'State broadband offices',
    techRequirements: 'N/A — adoption-focused',
    matchRequired: '10%',
    keyDates: [
      { date: '2024', event: 'First awards' },
      { date: '2026', event: 'Final year' }
    ],
    applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/digital-equity-act-programs',
    relevantStates: 'all',
    notes: 'Focuses on digital literacy, device access, affordability — complements infrastructure grants.'
  },
  {
    id: 'digital-equity-competitive',
    name: 'Digital Equity Competitive Grants',
    agency: 'NTIA',
    totalFunding: 1250000000,
    type: 'Adoption — Digital Equity',
    status: 'Annual rounds through FY2026',
    statusCode: 'upcoming',
    description: 'Competitive grants for digital inclusion projects.',
    eligibleApplicants: 'Nonprofits, local governments, tribes, educational institutions',
    techRequirements: 'N/A',
    matchRequired: 'Varies',
    applicationUrl: 'https://broadbandusa.ntia.gov/funding-programs/digital-equity-act-programs',
    relevantStates: 'all'
  },
  {
    id: 'community-connect',
    name: 'Community Connect Grants',
    agency: 'USDA / RUS',
    totalFunding: 26000000,  // per year
    type: 'Infrastructure — Extreme Rural',
    status: 'Annual — FY2026 round expected',
    statusCode: 'upcoming',
    description: 'Grants for areas with zero broadband access (not even 10/1 Mbps).',
    eligibleApplicants: 'ISPs, cooperatives, municipalities, tribes in areas <10/1 Mbps',
    techRequirements: '25/3 Mbps minimum',
    matchRequired: '15%',
    applicationUrl: 'https://www.usda.gov/reconnect',
    relevantStates: 'all',
    notes: 'Very targeted — for the most disconnected communities. Small but meaningful for extreme rural.'
  },
  {
    id: 'rural-health-care',
    name: 'Rural Health Care Program',
    agency: 'FCC / USAC',
    totalFunding: 600000000, // annual
    type: 'Connectivity — Healthcare',
    status: 'Annual — rolling applications',
    statusCode: 'rolling',
    description: 'Subsidizes broadband for rural healthcare facilities (hospitals, clinics, health centers).',
    eligibleApplicants: 'Rural healthcare providers (ISPs provide service)',
    techRequirements: 'Telehealth-grade connectivity',
    matchRequired: '35-65% copay depending on rurality',
    applicationUrl: 'https://www.usac.org/rural-health-care/',
    dataSourceUrl: 'https://opendata.usac.org/',
    relevantStates: 'all',
    notes: 'Like E-Rate but for hospitals. ~$600M/year. Guaranteed revenue for ISPs serving rural health.'
  }
];
```

### Level 2: State Programs (curated per state, our unique value)

```javascript
SN.grants.state = {
  'TX': [
    {
      id: 'boot-tx',
      name: 'Texas BOOT Program',
      state: 'TX',
      agency: 'TX Broadband Development Office',
      totalFunding: 634800000,
      type: 'Infrastructure — Last Mile',
      status: 'Active — Awards being made',
      statusCode: 'open',
      fundingSources: 'Capital Projects Fund ($500.5M) + Broadband Infrastructure Fund',
      eligibleApplicants: 'ISPs in designated unserved areas',
      techRequirements: '100/20 Mbps',
      matchRequired: '20-50% depending on track',
      portalUrl: 'https://comptroller.texas.gov/programs/broadband/funding/boot/',
      notes: 'Can stack with BEAD for different geographic areas within county'
    },
    {
      id: 'tmm-tx',
      name: 'Texas Middle Mile Program',
      state: 'TX',
      agency: 'TX Broadband Development Office',
      totalFunding: 200000000,
      type: 'Infrastructure — Middle Mile',
      status: 'Active',
      statusCode: 'open',
      eligibleApplicants: 'ISPs, cooperatives, municipalities',
      techRequirements: 'Open-access middle-mile fiber',
      matchRequired: 'Varies',
      portalUrl: 'https://comptroller.texas.gov/programs/broadband/funding/',
      notes: 'Connects underserved communities to backbone. Critical for rural TX.'
    },
    {
      id: 'pole-replace-tx',
      name: 'Texas Pole Replacement Program',
      state: 'TX',
      agency: 'TX Broadband Development Office',
      totalFunding: 75000000,
      type: 'Infrastructure Support — Make-Ready',
      status: 'Active',
      statusCode: 'open',
      eligibleApplicants: 'Broadband providers with pole attachment needs',
      techRequirements: 'N/A — supports aerial fiber deployment',
      matchRequired: '50% reimbursement, up to $5,000/pole',
      portalUrl: 'https://comptroller.texas.gov/programs/broadband/funding/',
      notes: 'Pole make-ready is the #1 bottleneck. This program literally pays half the cost. Huge for TX builders.'
    },
    {
      id: 'workforce-tx',
      name: 'Texas Broadband Workforce Training',
      state: 'TX',
      agency: 'TX Broadband Development Office',
      totalFunding: 25000000,
      type: 'Workforce — Training',
      status: 'Active',
      statusCode: 'open',
      eligibleApplicants: 'Educational institutions, training programs',
      notes: 'Tuition-free fiber optic training programs. Addresses the fiber splicer shortage.'
    }
  ],
  'CA': [
    {
      id: 'mmbi-ca',
      name: 'California Middle-Mile Broadband Initiative',
      state: 'CA',
      agency: 'CA Dept. of Technology / CPUC',
      totalFunding: 3250000000,
      type: 'Infrastructure — Middle Mile (Statewide)',
      status: 'Active — Construction underway',
      statusCode: 'open',
      description: 'Building a statewide open-access middle-mile fiber network connecting all communities.',
      eligibleApplicants: 'N/A — state-owned network',
      techRequirements: 'Open-access fiber backbone',
      portalUrl: 'https://broadbandforall.cdt.ca.gov/middle-mile-broadband-initiative/',
      dataSourceUrl: 'https://broadbandforall.cdt.ca.gov/middle-mile-broadband-initiative/',
      notes: 'The BIGGEST state broadband program in the country. Route maps published — tells you where backbone will be available for last-mile connections.'
    },
    {
      id: 'casf-ca',
      name: 'CASF Infrastructure Account',
      state: 'CA',
      agency: 'CPUC',
      totalFunding: 750000000,
      type: 'Infrastructure — Credit Enhancement',
      status: 'Active',
      statusCode: 'open',
      eligibleApplicants: 'ISPs deploying in unserved areas',
      techRequirements: '100 Mbps minimum',
      matchRequired: 'Varies — loan loss reserve model',
      portalUrl: 'https://www.cpuc.ca.gov/industries-and-topics/internet-and-phone/california-advanced-services-fund',
      notes: 'Credit enhancement = easier to get bank loans for fiber builds.'
    },
    {
      id: 'ffa-ca',
      name: 'California Federal Funding Account',
      state: 'CA',
      agency: 'CPUC',
      totalFunding: 'Varies per round',
      type: 'Infrastructure — Last Mile',
      status: 'Round 2 active (limited 6-county solicitation)',
      statusCode: 'open',
      portalUrl: 'https://www.cpuc.ca.gov/broadbandfederalfunding/',
      dataSourceUrl: 'Tableau dashboard on CPUC site',
      notes: 'State-administered federal funds for unserved locations. Awards published on Tableau.'
    }
  ],
  'VA': [
    {
      id: 'vati-va',
      name: 'Virginia Telecommunication Initiative (VATI)',
      state: 'VA',
      agency: 'VA Dept. of Housing & Community Development',
      totalFunding: 120000000, // per year approximate
      type: 'Infrastructure — Last Mile',
      status: 'Annual rounds',
      statusCode: 'rolling',
      eligibleApplicants: 'ISPs partnering with localities',
      techRequirements: '100/20 Mbps',
      matchRequired: 'Varies',
      portalUrl: 'https://www.dhcd.virginia.gov/vati',
      notes: 'Running since 2017, one of the most established state programs. Annual award lists published.'
    }
  ],
  'GA': [{ id: 'ga-broadband', name: 'Georgia Broadband Initiative', state: 'GA', agency: 'GA Technology Authority', totalFunding: 'Varies', statusCode: 'open', notes: 'Awards via GTA broadband office' }],
  'LA': [{ id: 'la-gumbo', name: 'Louisiana GUMBO Program', state: 'LA', agency: 'LA Office of Broadband', totalFunding: 176000000, statusCode: 'open', notes: 'Granting Unserved Municipalities Broadband Opportunities — $176M in awards' }],
  'MT': [{ id: 'mt-broadband', name: 'Montana ConnectMT', state: 'MT', agency: 'MT Dept. of Administration', totalFunding: 129000000, statusCode: 'open', notes: 'State broadband grants, BEAD administered by ConnectMT' }],
  'IA': [{ id: 'ia-empower', name: 'Iowa Empower Rural Broadband', state: 'IA', agency: 'IA Office of CIO', totalFunding: 150000000, statusCode: 'open', notes: 'State broadband grants + BEAD' }],
  'SC': [{ id: 'sc-broadband', name: 'SC Broadband Office Grants', state: 'SC', agency: 'SC ORS', totalFunding: 400000000, statusCode: 'open', notes: 'Multiple rounds of state grants' }],
  'OH': [{ id: 'oh-broadband', name: 'Ohio BroadbandOhio Grants', state: 'OH', agency: 'InnovateOhio', totalFunding: 700000000, statusCode: 'open', notes: 'Major state investment in broadband' }],
  'NM': [{ id: 'nm-match', name: 'New Mexico Match Fund (HB 177)', state: 'NM', agency: 'NM DFA', totalFunding: 100000000, statusCode: 'open', notes: 'State matching for federal grants — doubles your federal money.' }]
};
```

### Level 3: Regional Programs (manual curation)

```javascript
SN.grants.regional = [
  {
    id: 'arc-broadband',
    name: 'Appalachian Regional Commission Broadband',
    coverage: '423 counties in 13 states',
    relevantStates: ['VA', 'OH', 'GA'],
    totalFunding: 50000000, // annual
    statusCode: 'rolling',
    notes: 'VA Appalachian counties (Buchanan, Dickenson, Lee, Wise, etc.) and OH Appalachian counties eligible.'
  },
  {
    id: 'delta-broadband',
    name: 'Delta Regional Authority Broadband',
    coverage: '252 counties in 8 states',
    relevantStates: ['LA'],
    totalFunding: 'Varies',
    statusCode: 'rolling',
    notes: 'Louisiana parishes in the Delta region are eligible.'
  }
];
```

---

## PART 12: WHAT MAKES THIS UNIQUE — NO ONE ELSE DOES THIS

After researching every competitor (FCC maps, BroadbandNow, FiberLocator, GeoTel, Connected Nation, Calix, Ready.net, Brander Group), here's what Spectral Nexus will be the ONLY free tool to offer:

1. **Grant Stacking** — No free tool shows all applicable federal + state + regional programs for a single county. Grant writers currently visit 5-10 different websites. We put it in one view.

2. **RDOF Default Zones as Opportunity** — The FCC publishes the raw data, but nobody visualizes it as an *opportunity map*. Everyone else treats it as a policy failure story. We treat it as a treasure map.

3. **State Program Aggregation** — Ready.net tracks state broadband offices but not their grant programs. Brander tracks BEAD awards but not state-specific programs. NGA tracks legislation but not grant amounts. We combine all three.

4. **Fundability Score** — No tool computes "how many grants can this county access?" as a metric. We make it a first-class scoring component.

5. **County-Level Competitive Intelligence + Funding + Scoring in One View** — FCC has coverage data. NTIA has grant data. Census has demographics. We're the only tool that fuses them into a single interactive dashboard with an actionable score.
