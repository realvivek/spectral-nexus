/**
 * Spectral Nexus — Data Center Intelligence
 * US data center locations, new builds, operators, and connectivity details.
 *
 * Data compiled from public sources:
 *   - Data Center Map (datacentermap.com)
 *   - Baxtel / Cloudscene directories
 *   - SEC filings & press releases (Equinix, Digital Realty, QTS, CyrusOne)
 *   - EIA industrial power consumption records
 *   - State utility commission filings
 *   - Industry reports (JLL, CBRE Data Center Outlook)
 *
 * Last updated: 2026-02-25
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.dataCenters = [

    // ═══════════════════════════════════════════════
    // TIER 1 — Hyperscale & Major Campuses
    // ═══════════════════════════════════════════════

    {
        name: "Equinix DA1-DA12", city: "Dallas", state: "TX", county: "Dallas",
        lat: 32.8600, lng: -96.8550,
        operator: "Equinix", type: "Colocation", status: "Operational",
        capacityMW: 150, totalSqFt: 1200000, floors: 4,
        fiberProviders: ["Zayo", "Lumen", "Crown Castle", "AT&T"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Equinix Sales — Dallas", contactEmail: "sales-dallas@equinix.com", contactPhone: "(972) 728-5500",
        yearBuilt: 2001, lastExpansion: "2025",
        note: "12-facility campus in Infomart. Major interconnection hub for SW US. Private 5G backhaul opportunity for campus IoT.",
        integrators: ["NTT DATA", "Ericsson", "Nokia"]
    },
    {
        name: "Digital Realty — Ashburn Campus", city: "Ashburn", state: "VA", county: "Loudoun",
        lat: 39.0438, lng: -77.4874,
        operator: "Digital Realty", type: "Hyperscale", status: "Operational",
        capacityMW: 300, totalSqFt: 2500000, floors: 3,
        fiberProviders: ["Zayo", "Lumen", "Crown Castle", "Windstream", "Cogent"],
        wirelessReady: true, cbrsOpportunity: true,
        contactName: "Digital Realty Leasing", contactEmail: "leasing@digitalrealty.com", contactPhone: "(703) 554-0001",
        yearBuilt: 2005, lastExpansion: "2025",
        note: "Data Center Alley — world's largest data center cluster. 300MW+ campus. Adjacent to massive fiber corridor.",
        integrators: ["Corning", "CommScope", "Ericsson"]
    },
    {
        name: "QTS Ashburn Mega Data Center", city: "Ashburn", state: "VA", county: "Loudoun",
        lat: 39.0340, lng: -77.4710,
        operator: "QTS (Blackstone)", type: "Hyperscale", status: "Expanding",
        capacityMW: 200, totalSqFt: 1800000, floors: 2,
        fiberProviders: ["Zayo", "Crown Castle", "Windstream"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "QTS Sales", contactEmail: "sales@qtsdatacenters.com", contactPhone: "(703) 554-7600",
        yearBuilt: 2018, lastExpansion: "2026",
        note: "$1B+ expansion underway for AI/ML workloads. Massive power draw creating utility partnership opportunities.",
        integrators: ["Corning", "Panduit"]
    },
    {
        name: "Equinix SV1-SV16 Silicon Valley", city: "San Jose", state: "CA", county: "Santa Clara",
        lat: 37.3880, lng: -121.8890,
        operator: "Equinix", type: "Colocation", status: "Operational",
        capacityMW: 120, totalSqFt: 900000, floors: 3,
        fiberProviders: ["Zayo", "Lumen", "AT&T", "Comcast Business"],
        wirelessReady: true, cbrsOpportunity: false,
        contactName: "Equinix Sales — SV", contactEmail: "sales-sv@equinix.com", contactPhone: "(408) 435-5600",
        yearBuilt: 2002, lastExpansion: "2024",
        note: "Major West Coast interconnection campus. Navy CBRS exclusion nearby limits outdoor spectrum availability.",
        integrators: ["Cisco", "Juniper", "Arista"]
    },
    {
        name: "CoreSite — One Wilshire", city: "Los Angeles", state: "CA", county: "Los Angeles",
        lat: 34.0480, lng: -118.2560,
        operator: "CoreSite (American Tower)", type: "Carrier Hotel", status: "Operational",
        capacityMW: 40, totalSqFt: 600000, floors: 30,
        fiberProviders: ["Zayo", "Lumen", "AT&T", "Cogent", "Telia"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "CoreSite Sales — LA", contactEmail: "sales-la@coresite.com", contactPhone: "(213) 689-3000",
        yearBuilt: 1966, lastExpansion: "2023",
        note: "West Coast's most connected building. 300+ carriers, ISPs, and cloud providers. Rooftop 5G backhaul opportunity.",
        integrators: ["Lumen", "Crown Castle"]
    },

    // ═══════════════════════════════════════════════
    // TIER 2 — Major Regional Hubs
    // ═══════════════════════════════════════════════

    {
        name: "QTS Chicago — Elk Grove Village", city: "Elk Grove Village", state: "IL", county: "Cook",
        lat: 42.0070, lng: -87.9700,
        operator: "QTS (Blackstone)", type: "Hyperscale", status: "Operational",
        capacityMW: 100, totalSqFt: 800000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "Comcast Business", "Windstream"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "QTS Sales — Chicago", contactEmail: "sales-chi@qtsdatacenters.com", contactPhone: "(847) 718-4200",
        yearBuilt: 2015, lastExpansion: "2025",
        note: "Major Midwest hub. Proximity to Chicago IX. Industrial corridor for private 5G manufacturing IoT.",
        integrators: ["Panduit", "CommScope"]
    },
    {
        name: "CyrusOne — Houston West Campus", city: "Houston", state: "TX", county: "Harris",
        lat: 29.7300, lng: -95.5500,
        operator: "CyrusOne (KKR/GIP)", type: "Enterprise", status: "Operational",
        capacityMW: 80, totalSqFt: 650000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "AT&T", "Windstream"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "CyrusOne Sales — Houston", contactEmail: "sales@cyrusone.com", contactPhone: "(713) 820-2400",
        yearBuilt: 2010, lastExpansion: "2025",
        note: "Energy sector anchor tenants. Oil & gas HPC workloads. CBRS backhaul for oilfield edge compute.",
        integrators: ["NTT DATA", "Hewlett Packard Enterprise"]
    },
    {
        name: "Switch — Las Vegas SuperNAP", city: "Las Vegas", state: "NV", county: "Clark",
        lat: 36.0850, lng: -115.1600,
        operator: "Switch (DigitalBridge)", type: "Hyperscale", status: "Operational",
        capacityMW: 250, totalSqFt: 3500000, floors: 1,
        fiberProviders: ["Zayo", "Lumen", "AT&T", "Cox Business"],
        wirelessReady: true, cbrsOpportunity: true,
        contactName: "Switch Sales", contactEmail: "sales@switch.com", contactPhone: "(702) 444-4111",
        yearBuilt: 2010, lastExpansion: "2025",
        note: "World's largest data center campus (3.5M sqft). Adjacent to municipal CBRS network. Solar-powered.",
        integrators: ["Cisco", "Dell Technologies"]
    },
    {
        name: "Digital Realty — Phoenix Campus", city: "Mesa", state: "AZ", county: "Maricopa",
        lat: 33.4150, lng: -111.8310,
        operator: "Digital Realty", type: "Hyperscale", status: "Expanding",
        capacityMW: 180, totalSqFt: 1200000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "Cox Business"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Digital Realty — Phoenix", contactEmail: "leasing-phx@digitalrealty.com", contactPhone: "(480) 339-0100",
        yearBuilt: 2019, lastExpansion: "2026",
        note: "Booming Phoenix market. Semiconductor fabs nearby (TSMC, Intel) creating edge compute demand. Wide open CBRS spectrum.",
        integrators: ["Corning", "Ericsson"]
    },
    {
        name: "Flexential — Denver/Englewood", city: "Englewood", state: "CO", county: "Arapahoe",
        lat: 39.6480, lng: -104.9870,
        operator: "Flexential", type: "Colocation", status: "Operational",
        capacityMW: 50, totalSqFt: 340000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "CenturyLink", "Comcast Business"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Flexential Sales — Denver", contactEmail: "sales-den@flexential.com", contactPhone: "(303) 405-1000",
        yearBuilt: 2014, lastExpansion: "2024",
        note: "Denver tech corridor anchor. Very low CBRS utilization in area — green field for campus wireless.",
        integrators: ["Vertiv", "Schneider Electric"]
    },

    // ═══════════════════════════════════════════════
    // NEW BUILDS & ANNOUNCED (2025-2027)
    // ═══════════════════════════════════════════════

    {
        name: "Meta — Temple TX Hyperscale", city: "Temple", state: "TX", county: "Bell",
        lat: 31.0982, lng: -97.3428,
        operator: "Meta (Facebook)", type: "Hyperscale", status: "Under Construction",
        capacityMW: 200, totalSqFt: 900000, floors: 1,
        fiberProviders: ["TBD — seeking providers"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Meta Infrastructure", contactEmail: null, contactPhone: null,
        yearBuilt: null, lastExpansion: "2026 (est. completion)",
        note: "$800M+ investment. AI training campus. Rural Bell County — limited existing fiber, massive backhaul opportunity.",
        integrators: ["TBD"]
    },
    {
        name: "Google — Columbus OH Hyperscale", city: "Columbus", state: "OH", county: "Franklin",
        lat: 39.9612, lng: -82.9988,
        operator: "Google", type: "Hyperscale", status: "Under Construction",
        capacityMW: 400, totalSqFt: 2000000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "Windstream"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Google Cloud Infrastructure", contactEmail: null, contactPhone: null,
        yearBuilt: null, lastExpansion: "2027 (est. completion)",
        note: "$1.7B Columbus campus. Ohio Power Siting Board approved. Smart Columbus city infrastructure nearby.",
        integrators: ["TBD"]
    },
    {
        name: "Microsoft — San Antonio Hyperscale", city: "San Antonio", state: "TX", county: "Bexar",
        lat: 29.4241, lng: -98.4936,
        operator: "Microsoft Azure", type: "Hyperscale", status: "Expanding",
        capacityMW: 300, totalSqFt: 1500000, floors: 2,
        fiberProviders: ["Zayo", "AT&T", "Grande Communications"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Microsoft Data Center Operations", contactEmail: null, contactPhone: null,
        yearBuilt: 2016, lastExpansion: "2026",
        note: "$1B+ expansion for Azure AI. Texas largest hyperscale cluster outside Dallas. Low-cost power.",
        integrators: ["Ericsson", "Nokia"]
    },
    {
        name: "AWS — Hermiston OR Campus", city: "Hermiston", state: "OR", county: "Umatilla",
        lat: 45.8404, lng: -119.2890,
        operator: "Amazon Web Services", type: "Hyperscale", status: "Under Construction",
        capacityMW: 150, totalSqFt: 800000, floors: 1,
        fiberProviders: ["TBD — rural location"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "AWS Infrastructure", contactEmail: null, contactPhone: null,
        yearBuilt: null, lastExpansion: "2027 (est. completion)",
        note: "$12B Oregon investment across 5 sites. Rural Umatilla County — dark fiber + FWA opportunity for campus connectivity.",
        integrators: ["TBD"]
    },
    {
        name: "Applied Digital — Ellendale ND AI Campus", city: "Ellendale", state: "ND", county: "Dickey",
        lat: 46.0027, lng: -98.5178,
        operator: "Applied Digital", type: "AI/HPC", status: "Under Construction",
        capacityMW: 200, totalSqFt: 400000, floors: 1,
        fiberProviders: ["Dakota Carrier Network", "Midco"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Applied Digital", contactEmail: "info@applieddigital.com", contactPhone: "(214) 427-1704",
        yearBuilt: null, lastExpansion: "2026 (est. completion)",
        note: "$2B AI data center. Rural ND — extremely limited existing connectivity. Major greenfield fiber + wireless opportunity.",
        integrators: ["TBD"]
    },

    // ═══════════════════════════════════════════════
    // EDGE & EMERGING MARKETS
    // ═══════════════════════════════════════════════

    {
        name: "TierPoint — Nashville", city: "Nashville", state: "TN", county: "Davidson",
        lat: 36.1627, lng: -86.7816,
        operator: "TierPoint", type: "Colocation", status: "Operational",
        capacityMW: 12, totalSqFt: 70000, floors: 2,
        fiberProviders: ["Zayo", "AT&T", "EPB (dark fiber)"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "TierPoint Sales — Nashville", contactEmail: "sales-nash@tierpoint.com", contactPhone: "(615) 690-2800",
        yearBuilt: 2011, lastExpansion: "2024",
        note: "Healthcare IT hub. Nearly untouched CBRS spectrum in Nashville. EPB dark fiber from Chattanooga available.",
        integrators: ["Panduit", "Vertiv"]
    },
    {
        name: "DataBank — Atlanta Campus", city: "Atlanta", state: "GA", county: "Fulton",
        lat: 33.7600, lng: -84.3880,
        operator: "DataBank", type: "Colocation", status: "Operational",
        capacityMW: 30, totalSqFt: 200000, floors: 3,
        fiberProviders: ["Zayo", "Lumen", "AT&T", "Windstream"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "DataBank Sales — Atlanta", contactEmail: "sales-atl@databank.com", contactPhone: "(404) 564-5100",
        yearBuilt: 2013, lastExpansion: "2025",
        note: "Southeast interconnection hub. Low GAA congestion — strong CBRS opportunity for campus wireless.",
        integrators: ["CommScope", "Corning"]
    },
    {
        name: "Cologix — Minneapolis", city: "Minneapolis", state: "MN", county: "Hennepin",
        lat: 44.9778, lng: -93.2650,
        operator: "Cologix", type: "Colocation", status: "Operational",
        capacityMW: 25, totalSqFt: 180000, floors: 3,
        fiberProviders: ["Zayo", "Lumen", "Windstream", "US Internet"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Cologix Sales — MSP", contactEmail: "sales-msp@cologix.com", contactPhone: "(612) 395-6000",
        yearBuilt: 2010, lastExpansion: "2024",
        note: "Upper Midwest hub. Adjacent to fiber-rich downtown corridor. Agricultural IoT edge processing.",
        integrators: ["Panduit", "Vertiv"]
    },
    {
        name: "Stack Infrastructure — New Albany OH", city: "New Albany", state: "OH", county: "Franklin",
        lat: 40.0812, lng: -82.8088,
        operator: "Stack Infrastructure", type: "Hyperscale", status: "Expanding",
        capacityMW: 200, totalSqFt: 1000000, floors: 2,
        fiberProviders: ["Zayo", "Windstream", "Lightpath"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Stack Sales — Ohio", contactEmail: "sales-oh@stackinfra.com", contactPhone: "(614) 508-0200",
        yearBuilt: 2020, lastExpansion: "2026",
        note: "New Albany data center corridor — Intel chip fab nearby. $3B+ in data center investment in area.",
        integrators: ["Corning", "CommScope"]
    },
    {
        name: "Aligned Energy — Salt Lake City", city: "West Jordan", state: "UT", county: "Salt Lake",
        lat: 40.6097, lng: -111.9391,
        operator: "Aligned Energy", type: "Hyperscale", status: "Expanding",
        capacityMW: 80, totalSqFt: 500000, floors: 2,
        fiberProviders: ["UTOPIA Fiber", "Zayo", "Lumen"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Aligned Sales — SLC", contactEmail: "sales-slc@alignedenergy.com", contactPhone: "(801) 999-3500",
        yearBuilt: 2022, lastExpansion: "2026",
        note: "UTOPIA open-access fiber provides carrier-neutral connectivity. POWDER 5G testbed nearby for R&D.",
        integrators: ["Dell Technologies", "Schneider Electric"]
    },
    {
        name: "Compass Datacenters — Goodyear AZ", city: "Goodyear", state: "AZ", county: "Maricopa",
        lat: 33.4353, lng: -112.3580,
        operator: "Compass Datacenters", type: "Hyperscale", status: "Under Construction",
        capacityMW: 150, totalSqFt: 750000, floors: 1,
        fiberProviders: ["Zayo", "Cox Business"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Compass Sales — Phoenix", contactEmail: "sales-phx@compassdatacenters.com", contactPhone: "(480) 590-1000",
        yearBuilt: null, lastExpansion: "2027 (est. completion)",
        note: "West Valley Phoenix expansion. TSMC fab ecosystem creating massive DC demand. Wide open CBRS.",
        integrators: ["Ericsson", "Corning"]
    },
    {
        name: "Vantage Data Centers — Quincy WA", city: "Quincy", state: "WA", county: "Grant",
        lat: 47.2343, lng: -119.8526,
        operator: "Vantage", type: "Hyperscale", status: "Operational",
        capacityMW: 90, totalSqFt: 600000, floors: 1,
        fiberProviders: ["NoaNet", "Zayo", "Microsoft (dark fiber)"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Vantage Sales — PNW", contactEmail: "sales-pnw@vantage-dc.com", contactPhone: "(509) 787-2000",
        yearBuilt: 2018, lastExpansion: "2025",
        note: "Cheap hydro power. Microsoft, Yahoo, Sabey all have massive campuses here. Rural — wireless backhaul needed.",
        integrators: ["CommScope"]
    },
    {
        name: "Flexential — Raleigh-Durham", city: "Morrisville", state: "NC", county: "Wake",
        lat: 35.8235, lng: -78.8256,
        operator: "Flexential", type: "Colocation", status: "Operational",
        capacityMW: 20, totalSqFt: 150000, floors: 2,
        fiberProviders: ["Zayo", "Lumen", "Windstream", "Spectrum Enterprise"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Flexential Sales — RDU", contactEmail: "sales-rdu@flexential.com", contactPhone: "(919) 461-0100",
        yearBuilt: 2016, lastExpansion: "2025",
        note: "Research Triangle biotech and pharma edge compute. Nearly untouched CBRS — campus private 5G opportunity.",
        integrators: ["Panduit", "Vertiv"]
    },
    {
        name: "Stream Data Centers — San Antonio", city: "San Antonio", state: "TX", county: "Bexar",
        lat: 29.4800, lng: -98.5100,
        operator: "Stream Data Centers", type: "Enterprise", status: "Operational",
        capacityMW: 35, totalSqFt: 250000, floors: 2,
        fiberProviders: ["AT&T", "Lumen", "Grande Communications"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "Stream Sales — SA", contactEmail: "sales-sa@streamdatacenters.com", contactPhone: "(210) 508-2000",
        yearBuilt: 2017, lastExpansion: "2025",
        note: "Military/DOD edge workloads. JBSA proximity. CBRS for secure campus wireless.",
        integrators: ["Dell Technologies", "Hewlett Packard Enterprise"]
    },
    {
        name: "EdgeCore — Mesa AZ", city: "Mesa", state: "AZ", county: "Maricopa",
        lat: 33.4200, lng: -111.7800,
        operator: "EdgeCore Digital Infrastructure", type: "Hyperscale", status: "Expanding",
        capacityMW: 100, totalSqFt: 700000, floors: 1,
        fiberProviders: ["Zayo", "Cox Business", "Lumen"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "EdgeCore Sales", contactEmail: "sales@edgecore.com", contactPhone: "(480) 291-9000",
        yearBuilt: 2021, lastExpansion: "2026",
        note: "Phase 2 expansion for AI workloads. Phoenix semiconductor ecosystem driving demand.",
        integrators: ["Vertiv", "Schneider Electric"]
    },
    {
        name: "CloudHQ — Manassas VA", city: "Manassas", state: "VA", county: "Prince William",
        lat: 38.7509, lng: -77.4753,
        operator: "CloudHQ", type: "Hyperscale", status: "Under Construction",
        capacityMW: 120, totalSqFt: 600000, floors: 2,
        fiberProviders: ["Zayo", "Crown Castle", "Lumen"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "CloudHQ Sales", contactEmail: "sales@cloudhq.com", contactPhone: "(703) 880-5000",
        yearBuilt: null, lastExpansion: "2026 (est. completion)",
        note: "Northern Virginia expansion beyond Ashburn. Prince William County offering tax incentives.",
        integrators: ["Corning", "CommScope"]
    },
    {
        name: "Iron Mountain — Scottsdale AZ", city: "Scottsdale", state: "AZ", county: "Maricopa",
        lat: 33.4942, lng: -111.9261,
        operator: "Iron Mountain Data Centers", type: "Colocation", status: "Operational",
        capacityMW: 18, totalSqFt: 120000, floors: 2,
        fiberProviders: ["Zayo", "Cox Business", "CenturyLink"],
        wirelessReady: false, cbrsOpportunity: true,
        contactName: "IM Data Center Sales", contactEmail: "datacenter@ironmountain.com", contactPhone: "(480) 443-1000",
        yearBuilt: 2015, lastExpansion: "2024",
        note: "Compliance-focused. Healthcare and financial services anchor tenants. Phoenix metro CBRS wide open.",
        integrators: ["Vertiv"]
    }
];
