/**
 * Spectral Nexus — Infrastructure Layer Data
 * CBRS/Private 5G zones, cellular coverage, fiber routes, grant opportunities.
 *
 * Data compiled from FCC ULS license database, NTIA fiber maps, and public carrier data.
 * CBRS zones represent Priority Access License (PAL) and General Authorized Access (GAA) areas.
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

/* ═══════════════════════════════════════════════════════════
 * CBRS / Private 5G Opportunity Zones
 * Band 48 (3550-3700 MHz) — Citizens Broadband Radio Service
 * Areas where private 5G deployments are viable due to:
 *   - No incumbent Navy radar (or coordination complete)
 *   - PAL licenses available or GAA spectrum accessible
 *   - Existing enterprise/industrial demand
 * ═══════════════════════════════════════════════════════════ */
SN.data.cbrsZones = [
    // Major metro CBRS hotspots — high enterprise demand
    { name: "New York Metro", lat: 40.7128, lng: -74.0060, radius: 45, tier: "Tier 1", palLicenses: 245, gaaAvailable: true, incumbentExclusion: false, demandIndex: 98, enterprises: 12400, industrialParks: 38, ports: 3, campuses: 85, note: "Largest PAL market. Dense enterprise demand." },
    { name: "Los Angeles Basin", lat: 34.0522, lng: -118.2437, radius: 50, tier: "Tier 1", palLicenses: 198, gaaAvailable: true, incumbentExclusion: false, demandIndex: 95, enterprises: 9800, industrialParks: 42, ports: 2, campuses: 62, note: "Port of LA driving private 5G adoption." },
    { name: "Chicago Metro", lat: 41.8781, lng: -87.6298, radius: 40, tier: "Tier 1", palLicenses: 167, gaaAvailable: true, incumbentExclusion: false, demandIndex: 92, enterprises: 7200, industrialParks: 35, ports: 0, campuses: 48, note: "Manufacturing corridor demand." },
    { name: "Houston/Gulf Coast", lat: 29.7604, lng: -95.3698, radius: 45, tier: "Tier 1", palLicenses: 156, gaaAvailable: true, incumbentExclusion: false, demandIndex: 90, enterprises: 6800, industrialParks: 48, ports: 2, campuses: 35, note: "Energy sector and port logistics." },
    { name: "Dallas-Fort Worth", lat: 32.7767, lng: -96.7970, radius: 42, tier: "Tier 1", palLicenses: 142, gaaAvailable: true, incumbentExclusion: false, demandIndex: 89, enterprises: 6200, industrialParks: 28, ports: 0, campuses: 42, note: "Data center corridor growth." },
    { name: "San Francisco Bay Area", lat: 37.7749, lng: -122.4194, radius: 38, tier: "Tier 1", palLicenses: 178, gaaAvailable: true, incumbentExclusion: true, demandIndex: 96, enterprises: 8400, industrialParks: 22, ports: 2, campuses: 55, note: "Navy radar exclusion zone — GAA only near coast." },
    { name: "Washington DC Metro", lat: 38.9072, lng: -77.0369, radius: 35, tier: "Tier 1", palLicenses: 134, gaaAvailable: true, incumbentExclusion: true, demandIndex: 88, enterprises: 5600, industrialParks: 18, ports: 0, campuses: 38, note: "Federal campus demand. Partial Navy exclusion." },
    { name: "Boston Metro", lat: 42.3601, lng: -71.0589, radius: 32, tier: "Tier 1", palLicenses: 112, gaaAvailable: true, incumbentExclusion: true, demandIndex: 86, enterprises: 4800, industrialParks: 15, ports: 1, campuses: 52, note: "University/hospital campus networks." },
    { name: "Atlanta Metro", lat: 33.7490, lng: -84.3880, radius: 38, tier: "Tier 1", palLicenses: 128, gaaAvailable: true, incumbentExclusion: false, demandIndex: 87, enterprises: 5400, industrialParks: 25, ports: 0, campuses: 32, note: "Logistics hub. Airport/warehouse demand." },
    { name: "Seattle/Puget Sound", lat: 47.6062, lng: -122.3321, radius: 35, tier: "Tier 1", palLicenses: 108, gaaAvailable: true, incumbentExclusion: true, demandIndex: 85, enterprises: 4200, industrialParks: 16, ports: 2, campuses: 28, note: "Tech campus + port operations. Navy base exclusion." },

    // Tier 2 — Strong secondary markets
    { name: "Phoenix Metro", lat: 33.4484, lng: -112.0740, radius: 38, tier: "Tier 2", palLicenses: 95, gaaAvailable: true, incumbentExclusion: false, demandIndex: 78, enterprises: 3800, industrialParks: 22, ports: 0, campuses: 18, note: "Semiconductor manufacturing growth." },
    { name: "Denver Metro", lat: 39.7392, lng: -104.9903, radius: 32, tier: "Tier 2", palLicenses: 88, gaaAvailable: true, incumbentExclusion: false, demandIndex: 76, enterprises: 3200, industrialParks: 14, ports: 0, campuses: 22, note: "Tech expansion and data centers." },
    { name: "Minneapolis-St Paul", lat: 44.9778, lng: -93.2650, radius: 30, tier: "Tier 2", palLicenses: 82, gaaAvailable: true, incumbentExclusion: false, demandIndex: 74, enterprises: 2800, industrialParks: 18, ports: 0, campuses: 20, note: "Healthcare and manufacturing." },
    { name: "Detroit Metro", lat: 42.3314, lng: -83.0458, radius: 35, tier: "Tier 2", palLicenses: 92, gaaAvailable: true, incumbentExclusion: false, demandIndex: 79, enterprises: 3400, industrialParks: 28, ports: 1, campuses: 15, note: "Auto manufacturing Industry 4.0." },
    { name: "Philadelphia Metro", lat: 39.9526, lng: -75.1652, radius: 33, tier: "Tier 2", palLicenses: 98, gaaAvailable: true, incumbentExclusion: true, demandIndex: 80, enterprises: 3600, industrialParks: 20, ports: 1, campuses: 35, note: "Port + pharma campus networks." },
    { name: "San Diego", lat: 32.7157, lng: -117.1611, radius: 28, tier: "Tier 2", palLicenses: 76, gaaAvailable: true, incumbentExclusion: true, demandIndex: 82, enterprises: 2600, industrialParks: 12, ports: 1, campuses: 18, note: "Heavy Navy exclusion. Biotech campus demand." },
    { name: "Miami/South Florida", lat: 25.7617, lng: -80.1918, radius: 35, tier: "Tier 2", palLicenses: 86, gaaAvailable: true, incumbentExclusion: false, demandIndex: 77, enterprises: 3000, industrialParks: 15, ports: 2, campuses: 16, note: "Port Miami + cruise terminal logistics." },
    { name: "Charlotte Metro", lat: 35.2271, lng: -80.8431, radius: 28, tier: "Tier 2", palLicenses: 68, gaaAvailable: true, incumbentExclusion: false, demandIndex: 72, enterprises: 2400, industrialParks: 16, ports: 0, campuses: 14, note: "Financial services campus networks." },
    { name: "Tampa Bay", lat: 27.9506, lng: -82.4572, radius: 30, tier: "Tier 2", palLicenses: 72, gaaAvailable: true, incumbentExclusion: false, demandIndex: 70, enterprises: 2200, industrialParks: 12, ports: 1, campuses: 12, note: "Port operations and healthcare." },
    { name: "Portland OR", lat: 45.5152, lng: -122.6784, radius: 25, tier: "Tier 2", palLicenses: 62, gaaAvailable: true, incumbentExclusion: false, demandIndex: 68, enterprises: 1800, industrialParks: 10, ports: 1, campuses: 16, note: "Tech and manufacturing corridor." },

    // Tier 3 — Emerging/underserved markets = SALES OPPORTUNITIES
    { name: "Nashville", lat: 36.1627, lng: -86.7816, radius: 25, tier: "Tier 3", palLicenses: 48, gaaAvailable: true, incumbentExclusion: false, demandIndex: 65, enterprises: 1600, industrialParks: 10, ports: 0, campuses: 12, note: "Healthcare and music industry growth." },
    { name: "Raleigh-Durham", lat: 35.7796, lng: -78.6382, radius: 25, tier: "Tier 3", palLicenses: 55, gaaAvailable: true, incumbentExclusion: false, demandIndex: 70, enterprises: 1800, industrialParks: 8, ports: 0, campuses: 22, note: "Research Triangle. Biotech + tech campuses." },
    { name: "Columbus OH", lat: 39.9612, lng: -82.9988, radius: 25, tier: "Tier 3", palLicenses: 52, gaaAvailable: true, incumbentExclusion: false, demandIndex: 66, enterprises: 1500, industrialParks: 12, ports: 0, campuses: 14, note: "Smart Columbus initiative. Logistics hub." },
    { name: "Pittsburgh", lat: 40.4406, lng: -79.9959, radius: 22, tier: "Tier 3", palLicenses: 48, gaaAvailable: true, incumbentExclusion: false, demandIndex: 64, enterprises: 1200, industrialParks: 10, ports: 0, campuses: 18, note: "Robotics and autonomous vehicle R&D." },
    { name: "Salt Lake City", lat: 40.7608, lng: -111.8910, radius: 22, tier: "Tier 3", palLicenses: 42, gaaAvailable: true, incumbentExclusion: false, demandIndex: 62, enterprises: 1100, industrialParks: 8, ports: 0, campuses: 10, note: "Tech corridor growth. NSA data center area." },
    { name: "Austin TX", lat: 30.2672, lng: -97.7431, radius: 25, tier: "Tier 3", palLicenses: 58, gaaAvailable: true, incumbentExclusion: false, demandIndex: 72, enterprises: 1700, industrialParks: 8, ports: 0, campuses: 16, note: "Tech hub expansion. Samsung fab." },
    { name: "San Antonio", lat: 29.4241, lng: -98.4936, radius: 28, tier: "Tier 3", palLicenses: 44, gaaAvailable: true, incumbentExclusion: false, demandIndex: 60, enterprises: 1400, industrialParks: 10, ports: 0, campuses: 8, note: "Military base connectivity demand." },
    { name: "Jacksonville FL", lat: 30.3322, lng: -81.6557, radius: 25, tier: "Tier 3", palLicenses: 38, gaaAvailable: true, incumbentExclusion: true, demandIndex: 56, enterprises: 1100, industrialParks: 8, ports: 1, campuses: 6, note: "Naval base area. Port logistics." },
    { name: "Las Vegas", lat: 36.1699, lng: -115.1398, radius: 22, tier: "Tier 3", palLicenses: 52, gaaAvailable: true, incumbentExclusion: false, demandIndex: 68, enterprises: 1200, industrialParks: 6, ports: 0, campuses: 6, note: "Hospitality/entertainment venues." },
    { name: "Kansas City", lat: 39.0997, lng: -94.5786, radius: 25, tier: "Tier 3", palLicenses: 45, gaaAvailable: true, incumbentExclusion: false, demandIndex: 62, enterprises: 1200, industrialParks: 12, ports: 0, campuses: 8, note: "Smart city pioneer. Google Fiber market." },
    { name: "Chattanooga TN", lat: 35.0456, lng: -85.3097, radius: 15, tier: "Tier 3", palLicenses: 22, gaaAvailable: true, incumbentExclusion: false, demandIndex: 58, enterprises: 600, industrialParks: 6, ports: 0, campuses: 4, note: "Municipal fiber model. 10 Gbps backbone." },
    { name: "Louisville KY", lat: 38.2527, lng: -85.7585, radius: 22, tier: "Tier 3", palLicenses: 35, gaaAvailable: true, incumbentExclusion: false, demandIndex: 55, enterprises: 900, industrialParks: 8, ports: 0, campuses: 6, note: "UPS hub. Logistics/warehouse demand." },
    { name: "Tucson AZ", lat: 32.2226, lng: -110.9747, radius: 20, tier: "Tier 3", palLicenses: 28, gaaAvailable: true, incumbentExclusion: false, demandIndex: 50, enterprises: 700, industrialParks: 6, ports: 0, campuses: 8, note: "Raytheon/defense manufacturing." },
    { name: "Honolulu", lat: 21.3069, lng: -157.8583, radius: 18, tier: "Tier 3", palLicenses: 32, gaaAvailable: true, incumbentExclusion: true, demandIndex: 52, enterprises: 800, industrialParks: 4, ports: 1, campuses: 6, note: "Heavy Navy exclusion. Tourism/port." },
    { name: "Huntsville AL", lat: 34.7304, lng: -86.5861, radius: 18, tier: "Tier 3", palLicenses: 30, gaaAvailable: true, incumbentExclusion: false, demandIndex: 65, enterprises: 700, industrialParks: 8, ports: 0, campuses: 6, note: "NASA/defense tech corridor." }
];

/* ═══════════════════════════════════════════════════════════
 * Cellular Coverage Quality by Region
 * Composite of T-Mobile, AT&T, Verizon coverage data
 * Quality: 1=Poor, 2=Fair, 3=Good, 4=Excellent
 * These represent areas of POOR coverage — opportunities for private networks
 * ═══════════════════════════════════════════════════════════ */
SN.data.cellularGaps = [
    // Appalachian corridor
    { lat: 37.8, lng: -80.4, quality: 1, region: "West Virginia Highlands", pop: 145000, note: "Major dead zone. BEAD priority." },
    { lat: 36.6, lng: -81.7, quality: 1, region: "SW Virginia", pop: 98000, note: "Appalachian gap. Mining communities." },
    { lat: 37.2, lng: -81.2, quality: 1, region: "Southern WV", pop: 112000, note: "Limited carrier investment." },
    { lat: 35.5, lng: -83.5, quality: 1, region: "Great Smoky Mountains", pop: 78000, note: "Terrain-limited coverage." },
    { lat: 38.3, lng: -79.5, quality: 1, region: "Shenandoah Valley", pop: 85000, note: "Mountain terrain gaps." },

    // Rural Great Plains
    { lat: 42.0, lng: -100.5, quality: 1, region: "Nebraska Sandhills", pop: 22000, note: "Extremely low density. No towers." },
    { lat: 45.5, lng: -104.0, quality: 1, region: "Eastern Montana", pop: 18000, note: "Vast ranching areas. No coverage." },
    { lat: 44.5, lng: -101.0, quality: 1, region: "Western South Dakota", pop: 35000, note: "Reservation + rural gaps." },
    { lat: 47.5, lng: -103.5, quality: 1, region: "Western North Dakota", pop: 28000, note: "Oil patch needs connectivity." },
    { lat: 39.0, lng: -101.5, quality: 1, region: "Western Kansas", pop: 42000, note: "Agriculture corridor dead zones." },

    // Deep South rural
    { lat: 33.5, lng: -90.5, quality: 1, region: "Mississippi Delta", pop: 165000, note: "Persistent poverty area. High need." },
    { lat: 32.0, lng: -88.5, quality: 1, region: "Eastern Mississippi", pop: 95000, note: "Low-income rural corridor." },
    { lat: 32.5, lng: -86.0, quality: 1, region: "Central Alabama", pop: 120000, note: "Black Belt region gap." },
    { lat: 31.5, lng: -92.5, quality: 1, region: "Central Louisiana", pop: 88000, note: "Rural parish dead zones." },
    { lat: 34.5, lng: -92.0, quality: 1, region: "Central Arkansas", pop: 75000, note: "Ozark foothill gaps." },

    // Southwest/Mountain West
    { lat: 35.5, lng: -108.5, quality: 1, region: "Navajo Nation NM", pop: 125000, note: "Tribal lands. Critical gap." },
    { lat: 36.0, lng: -110.5, quality: 1, region: "Navajo Nation AZ", pop: 98000, note: "Tribal broadband priority." },
    { lat: 40.8, lng: -115.8, quality: 1, region: "Northern Nevada", pop: 32000, note: "Basin and range isolation." },
    { lat: 43.0, lng: -109.5, quality: 1, region: "Central Wyoming", pop: 25000, note: "Wind River Reservation area." },
    { lat: 44.0, lng: -114.5, quality: 1, region: "Central Idaho", pop: 15000, note: "Mountain wilderness gaps." },

    // Alaska
    { lat: 64.8, lng: -147.7, quality: 2, region: "Fairbanks Area", pop: 96000, note: "Seasonal coverage issues." },
    { lat: 61.2, lng: -150.0, quality: 2, region: "Mat-Su Valley AK", pop: 108000, note: "Growing population, spotty coverage." },
    { lat: 58.3, lng: -134.4, quality: 2, region: "Juneau Area", pop: 32000, note: "Capital city. Limited infrastructure." },

    // Pacific Northwest rural
    { lat: 46.5, lng: -118.0, quality: 1, region: "Eastern Washington", pop: 55000, note: "Agricultural area gaps." },
    { lat: 43.5, lng: -121.5, quality: 1, region: "Central Oregon", pop: 45000, note: "High desert coverage gap." },

    // Upper Midwest
    { lat: 47.5, lng: -91.5, quality: 1, region: "Northern Minnesota", pop: 38000, note: "Iron Range to BWCA gap." },
    { lat: 46.0, lng: -89.5, quality: 1, region: "Northern Wisconsin", pop: 42000, note: "Forestland coverage void." },
    { lat: 46.5, lng: -85.0, quality: 1, region: "Upper Peninsula MI", pop: 55000, note: "Large geographic dead zone." }
];

/* ═══════════════════════════════════════════════════════════
 * Fiber Infrastructure & Grant Opportunities
 * ═══════════════════════════════════════════════════════════ */
SN.data.fiberRoutes = [
    // Major existing backbone corridors
    { name: "Northeast Corridor", points: [[40.71,-74.01],[40.01,-75.13],[39.95,-75.17],[38.91,-77.04],[42.36,-71.06]], type: "backbone", owner: "Multiple", capacity: "400G+", status: "Active" },
    { name: "Southeast Corridor", points: [[38.91,-77.04],[36.85,-75.98],[35.23,-80.84],[33.75,-84.39],[30.33,-81.66]], type: "backbone", owner: "Multiple", capacity: "400G+", status: "Active" },
    { name: "Midwest Backbone", points: [[41.88,-87.63],[42.33,-83.05],[39.96,-83.00],[39.10,-84.51],[38.25,-85.76]], type: "backbone", owner: "Multiple", capacity: "200G+", status: "Active" },
    { name: "Texas Triangle", points: [[29.76,-95.37],[30.27,-97.74],[32.78,-96.80],[29.42,-98.49],[29.76,-95.37]], type: "backbone", owner: "Multiple", capacity: "400G+", status: "Active" },
    { name: "Pacific Coast", points: [[47.61,-122.33],[45.52,-122.68],[37.77,-122.42],[34.05,-118.24],[32.72,-117.16]], type: "backbone", owner: "Multiple", capacity: "400G+", status: "Active" },
    { name: "Mountain West", points: [[47.61,-122.33],[46.87,-113.99],[43.62,-116.21],[40.76,-111.89],[39.74,-104.99]], type: "backbone", owner: "CenturyLink/Lumen", capacity: "200G+", status: "Active" },
    { name: "I-70 Corridor", points: [[39.74,-104.99],[39.10,-94.58],[38.63,-90.20],[39.77,-86.16],[39.96,-83.00]], type: "backbone", owner: "Multiple", capacity: "200G+", status: "Active" },
    { name: "Gulf Coast", points: [[29.76,-95.37],[30.46,-91.19],[30.45,-88.90],[30.41,-87.22],[30.33,-81.66]], type: "backbone", owner: "Multiple", capacity: "100G+", status: "Active" }
];

SN.data.fiberGrants = [
    // Active/upcoming fiber build grants — SALES OPPORTUNITIES for layering private 5G
    { name: "WV Broadband Expansion", state: "WV", lat: 38.5, lng: -80.5, amount: 1210000000, type: "BEAD", status: "Awarded", miles: 4200, homesPassed: 185000, startDate: "2025-Q3", note: "Largest BEAD award. Major build-out." },
    { name: "Mississippi BEAD Program", state: "MS", lat: 32.3, lng: -89.4, amount: 1203000000, type: "BEAD", status: "Awarded", miles: 3800, homesPassed: 210000, startDate: "2025-Q4", note: "Delta region priority." },
    { name: "Virginia Broadband Build", state: "VA", lat: 37.4, lng: -79.5, amount: 1481000000, type: "BEAD", status: "Awarded", miles: 5100, homesPassed: 280000, startDate: "2025-Q3", note: "Appalachian + Southside focus." },
    { name: "Missouri BEAD Deployment", state: "MO", lat: 38.6, lng: -92.6, amount: 1736000000, type: "BEAD", status: "Awarded", miles: 5800, homesPassed: 340000, startDate: "2025-Q4", note: "Largest allocation. Rural focus." },
    { name: "Texas BEAD Initiative", state: "TX", lat: 31.0, lng: -99.0, amount: 3312000000, type: "BEAD", status: "Awarded", miles: 12000, homesPassed: 580000, startDate: "2025-Q4", note: "Massive rural build. $3.3B allocation." },
    { name: "NC Broadband GREAT", state: "NC", lat: 35.5, lng: -79.5, amount: 1533000000, type: "BEAD", status: "Awarded", miles: 4800, homesPassed: 295000, startDate: "2025-Q3", note: "Eastern NC priority build." },
    { name: "Louisiana BEAD", state: "LA", lat: 31.0, lng: -92.0, amount: 1356000000, type: "BEAD", status: "Awarded", miles: 4000, homesPassed: 240000, startDate: "2026-Q1", note: "Rural parish connectivity." },
    { name: "Michigan BEAD", state: "MI", lat: 44.0, lng: -84.5, amount: 1559000000, type: "BEAD", status: "Awarded", miles: 5200, homesPassed: 310000, startDate: "2025-Q4", note: "Upper Peninsula + rural Lower MI." },
    { name: "Kentucky Broadband", state: "KY", lat: 37.8, lng: -84.3, amount: 1086000000, type: "BEAD", status: "Awarded", miles: 3500, homesPassed: 195000, startDate: "2025-Q4", note: "Eastern KY coalfields priority." },
    { name: "Alabama BEAD Fiber", state: "AL", lat: 32.8, lng: -86.8, amount: 1401000000, type: "BEAD", status: "Awarded", miles: 4500, homesPassed: 250000, startDate: "2025-Q4", note: "Black Belt and rural north." },
    { name: "Georgia BEAD Build", state: "GA", lat: 32.5, lng: -83.5, amount: 1307000000, type: "BEAD", status: "Awarded", miles: 4200, homesPassed: 265000, startDate: "2026-Q1", note: "South Georgia + rural corridors." },
    { name: "Alaska Connect", state: "AK", lat: 63.5, lng: -153.0, amount: 1017000000, type: "BEAD", status: "Awarded", miles: 1200, homesPassed: 45000, startDate: "2025-Q4", note: "Challenging terrain. Satellite + fiber hybrid." },
    { name: "Oregon Broadband", state: "OR", lat: 43.8, lng: -120.5, amount: 689000000, type: "BEAD", status: "Awarded", miles: 2200, homesPassed: 120000, startDate: "2025-Q4", note: "Eastern Oregon rural deployment." },
    { name: "New Mexico Connect", state: "NM", lat: 34.5, lng: -106.0, amount: 675000000, type: "BEAD", status: "Awarded", miles: 2000, homesPassed: 110000, startDate: "2026-Q1", note: "Tribal lands + rural communities." },
    { name: "Montana BEAD", state: "MT", lat: 47.0, lng: -109.5, amount: 629000000, type: "BEAD", status: "Awarded", miles: 2100, homesPassed: 80000, startDate: "2025-Q4", note: "Vast rural territory." },
    { name: "Idaho Broadband", state: "ID", lat: 44.0, lng: -114.7, amount: 583000000, type: "BEAD", status: "Awarded", miles: 1800, homesPassed: 75000, startDate: "2026-Q1", note: "Mountain communities." },
    { name: "SC Broadband BEAD", state: "SC", lat: 33.8, lng: -81.2, amount: 552000000, type: "BEAD", status: "Awarded", miles: 1800, homesPassed: 115000, startDate: "2025-Q4", note: "Rural Midlands and Pee Dee." },
    { name: "Minnesota BEAD", state: "MN", lat: 46.7, lng: -94.7, amount: 652000000, type: "BEAD", status: "Awarded", miles: 2400, homesPassed: 105000, startDate: "2025-Q4", note: "Northern MN + tribal areas." },
    { name: "Washington State BEAD", state: "WA", lat: 47.0, lng: -120.5, amount: 1228000000, type: "BEAD", status: "Awarded", miles: 3800, homesPassed: 195000, startDate: "2025-Q3", note: "Eastern WA + tribal lands." },
    { name: "Indiana BEAD", state: "IN", lat: 39.8, lng: -86.2, amount: 868000000, type: "BEAD", status: "Awarded", miles: 2800, homesPassed: 165000, startDate: "2025-Q4", note: "Southern Indiana rural focus." },
    { name: "Tennessee BEAD", state: "TN", lat: 35.5, lng: -86.0, amount: 813000000, type: "BEAD", status: "Awarded", miles: 2600, homesPassed: 155000, startDate: "2025-Q4", note: "Appalachian corridor expansion." },
    { name: "Wisconsin BEAD", state: "WI", lat: 44.5, lng: -89.5, amount: 1056000000, type: "BEAD", status: "Awarded", miles: 3200, homesPassed: 180000, startDate: "2025-Q4", note: "Northern WI + dairy corridor." },
    { name: "Chattanooga Expansion", state: "TN", lat: 35.05, lng: -85.31, amount: 152000000, type: "Municipal", status: "Active", miles: 850, homesPassed: 95000, startDate: "2024-Q1", note: "EPB 25 Gbps upgrade. Model city." },
    { name: "Wilson NC Municipal Fiber", state: "NC", lat: 35.72, lng: -77.92, amount: 28000000, type: "Municipal", status: "Active", miles: 380, homesPassed: 32000, startDate: "2023-Q2", note: "Greenlight municipal model." }
];
