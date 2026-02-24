/**
 * Spectral Nexus — Municipal Fiber Networks & Private 5G Deployments
 * City-owned fiber infrastructure, dark fiber availability, and private 5G network details.
 *
 * Data compiled from:
 *   - NTIA National Broadband Map
 *   - City/utility published fiber maps and annual reports
 *   - FCC CBRS deployment records / OnGo Alliance
 *   - Industry press releases (NTT DATA, Nokia, Celona, JMA Wireless)
 *   - MuniNetworks.org community broadband database
 *   - UTOPIA Fiber network documentation
 *
 * Last updated: 2026-02-24
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

/* ═══════════════════════════════════════════════════════════
 * Municipal / City-Owned Fiber Networks
 * Networks where the city, utility, or cooperative owns the fiber infrastructure.
 * darkFiberAvailable: true if the city leases dark fiber to third parties.
 * ═══════════════════════════════════════════════════════════ */
SN.data.municipalFiber = [

    // ── National Models ──────────────────────────────────

    {
        name: "EPB Fiber Optics", city: "Chattanooga", state: "TN", county: "Hamilton",
        lat: 35.0456, lng: -85.3097,
        fiberMiles: 9000, homesPassed: 180000, subscribers: 126000, marketShare: 70,
        maxSpeed: "25 Gbps", operator: "EPB (city-owned electric utility)",
        darkFiberAvailable: true, yearDeployed: 2010, yearExpanded: 2022,
        investmentTotal: 280000000, fundingSources: ["DOE Smart Grid Grant", "Revenue Bonds", "EPB Revenue"],
        description: "America's Gig City. First US community-wide 1 Gbps (2010), 10 Gbps (2015), 25 Gbps (2022). $2.69B economic impact over 10 years. Model for municipal broadband nationwide.",
        services: ["Residential Fiber (25 Gbps)", "Business Fiber", "Dark Fiber Leasing", "Smart Grid", "Quantum Network Research"]
    },
    {
        name: "Longmont NextLight", city: "Longmont", state: "CO", county: "Boulder",
        lat: 40.1672, lng: -105.1019,
        fiberMiles: 600, homesPassed: 42000, subscribers: 29500, marketShare: 62,
        maxSpeed: "10 Gbps", operator: "Longmont Power & Communications (city-owned)",
        darkFiberAvailable: true, yearDeployed: 2014, yearExpanded: 2023,
        investmentTotal: 45600000, fundingSources: ["Revenue Bonds", "City Reserves"],
        description: "Voter-approved municipal fiber with 62% market share. $45.6M investment fully self-sustaining. Profit-generating since 2020. Defeated Comcast-backed ballot measure.",
        services: ["Residential Fiber (10 Gbps)", "Business Fiber", "Dark Fiber", "Carrier Services"]
    },
    {
        name: "Cedar Falls Utilities CFU", city: "Cedar Falls", state: "IA", county: "Black Hawk",
        lat: 42.5349, lng: -92.4454,
        fiberMiles: 350, homesPassed: 18000, subscribers: 14000, marketShare: 72,
        maxSpeed: "10 Gbps", operator: "Cedar Falls Utilities (city-owned)",
        darkFiberAvailable: true, yearDeployed: 1996, yearExpanded: 2021,
        investmentTotal: 38000000, fundingSources: ["Utility Revenue", "Municipal Bonds"],
        description: "One of America's first municipal fiber networks (1996). 72% market share with 10 Gbps residential service. Pioneered the municipal fiber model.",
        services: ["Residential Fiber (10 Gbps)", "Business Fiber", "Dark Fiber", "Smart Grid"]
    },
    {
        name: "Wilson Greenlight", city: "Wilson", state: "NC", county: "Wilson",
        lat: 35.7213, lng: -77.9155,
        fiberMiles: 380, homesPassed: 32000, subscribers: 12000, marketShare: 38,
        maxSpeed: "1 Gbps", operator: "Wilson Greenlight (city-owned)",
        darkFiberAvailable: true, yearDeployed: 2008, yearExpanded: 2023,
        investmentTotal: 28000000, fundingSources: ["Revenue Bonds", "City Budget"],
        description: "Municipal fiber that survived legal challenges from Time Warner Cable. NC state law attempted to restrict expansion but Greenlight persisted. FCC preemption case went to appeals court.",
        services: ["Residential Fiber", "Business Fiber", "Dark Fiber Leasing"]
    },
    {
        name: "Lafayette LUS Fiber", city: "Lafayette", state: "LA", county: "Lafayette",
        lat: 30.2241, lng: -92.0198,
        fiberMiles: 750, homesPassed: 55000, subscribers: 33000, marketShare: 45,
        maxSpeed: "10 Gbps", operator: "LUS Fiber (city-owned utility)",
        darkFiberAvailable: true, yearDeployed: 2009, yearExpanded: 2022,
        investmentTotal: 160000000, fundingSources: ["Revenue Bonds", "LUS Revenue"],
        description: "Community-owned fiber surviving multiple legal challenges from incumbents. Voter-approved 62-38%. 10 Gbps residential service. Dark fiber leasing program for businesses.",
        services: ["Residential Fiber (10 Gbps)", "Business Fiber", "Dark Fiber", "Carrier Ethernet"]
    },
    {
        name: "Brownsville City Fiber", city: "Brownsville", state: "TX", county: "Cameron",
        lat: 25.9017, lng: -97.4975,
        fiberMiles: 100, homesPassed: 25000, subscribers: 6000, marketShare: 15,
        maxSpeed: "2 Gbps", operator: "City of Brownsville / Omni Fiber (last-mile)",
        darkFiberAvailable: true, yearDeployed: 2023, yearExpanded: 2025,
        investmentTotal: 30000000, fundingSources: ["ARPA Grant", "City Budget", "RGV MPO Grant"],
        description: "100-mile city-owned middle-mile fiber backbone funded by ARPA ($20M). Omni Fiber provides last-mile residential service (250 Mbps-2 Gbps). Backbone for municipal private 5G network.",
        services: ["Middle-Mile Backbone", "Private 5G Backhaul", "Last-Mile via Omni Fiber", "Municipal IoT"]
    },

    // ── UTOPIA Fiber Network (Utah) ──────────────────────

    {
        name: "UTOPIA Fiber", city: "Multiple (20 cities)", state: "UT", county: "Multiple",
        lat: 40.6461, lng: -111.4980,
        fiberMiles: 4387, homesPassed: 200000, subscribers: 70000, marketShare: 35,
        maxSpeed: "10 Gbps", operator: "UTOPIA (Utah Telecommunication Open Infrastructure Agency)",
        darkFiberAvailable: true, yearDeployed: 2004, yearExpanded: 2024,
        investmentTotal: 500000000, fundingSources: ["Municipal Bonds", "Macquarie Capital PPP", "City Pledges", "Subscriber Revenue"],
        description: "Largest multi-city open-access fiber network in the US. 4,387 miles across 20 Utah cities with 70,000+ subscribers (20% YoY growth). 19 ISPs compete on the same fiber. Self-funded by subscriber revenue since 2009. Nearly $500M in community broadband projects built. Doubled subscriber base since 2020.",
        services: ["Open-Access Fiber (10 Gbps)", "Multiple ISP Choice (19 ISPs)", "Business Fiber (100 Gbps)", "Smart City Infrastructure"]
    },

    // ── Electric Utility Fiber ───────────────────────────

    {
        name: "Clarksville Connected Utilities", city: "Clarksville", state: "TN", county: "Montgomery",
        lat: 36.5298, lng: -87.3595,
        fiberMiles: 1200, homesPassed: 65000, subscribers: 18000, marketShare: 28,
        maxSpeed: "2 Gbps", operator: "CDE Lightband (city-owned electric utility)",
        darkFiberAvailable: true, yearDeployed: 2008, yearExpanded: 2023,
        investmentTotal: 82000000, fundingSources: ["CDE Revenue", "Municipal Bonds"],
        description: "CDE Lightband municipal fiber serving Tennessee's 5th largest city. Built on electric utility infrastructure. Competing with Spectrum and AT&T.",
        services: ["Residential Fiber (2 Gbps)", "Business Fiber", "Dark Fiber", "Smart Grid"]
    },
    {
        name: "Bristol Tennessee Essential Services", city: "Bristol", state: "TN", county: "Sullivan",
        lat: 36.5951, lng: -82.1887,
        fiberMiles: 200, homesPassed: 15000, subscribers: 9000, marketShare: 55,
        maxSpeed: "1 Gbps", operator: "BTES OptiNet (city-owned electric utility)",
        darkFiberAvailable: true, yearDeployed: 2003, yearExpanded: 2020,
        investmentTotal: 25000000, fundingSources: ["BTES Revenue", "Municipal Bonds"],
        description: "One of the earliest municipal fiber deployments in the US. BTES OptiNet has 55% broadband market share. Model for utility-based fiber.",
        services: ["Residential Fiber", "Business Fiber", "Dark Fiber"]
    },
    {
        name: "Tullahoma Utilities Board", city: "Tullahoma", state: "TN", county: "Coffee",
        lat: 35.3620, lng: -86.2094,
        fiberMiles: 150, homesPassed: 10000, subscribers: 5500, marketShare: 50,
        maxSpeed: "1 Gbps", operator: "TUB LightTube (city-owned utility)",
        darkFiberAvailable: false, yearDeployed: 2009, yearExpanded: 2021,
        investmentTotal: 16000000, fundingSources: ["TUB Revenue", "Bonds"],
        description: "LightTube fiber service from Tullahoma Utilities Board. 50% market share in small Tennessee city. Smart grid integration.",
        services: ["Residential Fiber", "Business Fiber", "Smart Grid"]
    },
    {
        name: "Tacoma Click! Network", city: "Tacoma", state: "WA", county: "Pierce",
        lat: 47.2529, lng: -122.4443,
        fiberMiles: 700, homesPassed: 85000, subscribers: 22000, marketShare: 25,
        maxSpeed: "1 Gbps", operator: "Tacoma Power / Rainier Connect (operator)",
        darkFiberAvailable: true, yearDeployed: 1997, yearExpanded: 2022,
        investmentTotal: 100000000, fundingSources: ["Tacoma Power Revenue", "Bonds"],
        description: "One of the earliest municipal fiber deployments. Tacoma Power built the network; Rainier Connect operates retail service. Dark fiber leasing for businesses.",
        services: ["Residential Fiber", "Business Fiber", "Dark Fiber Leasing", "Wholesale Ethernet"]
    },
    {
        name: "Fairlawn gig", city: "Fairlawn", state: "OH", county: "Summit",
        lat: 41.1278, lng: -81.6098,
        fiberMiles: 80, homesPassed: 5500, subscribers: 3500, marketShare: 60,
        maxSpeed: "1 Gbps", operator: "FairlawnGig (city-owned)",
        darkFiberAvailable: false, yearDeployed: 2019, yearExpanded: 2023,
        investmentTotal: 10000000, fundingSources: ["City Budget", "Revenue Bonds"],
        description: "Small-city municipal fiber success story. FairlawnGig achieved 60% market share within 4 years. Expanding to neighboring communities.",
        services: ["Residential Fiber", "Business Fiber"]
    },

    // ── Large City / Metro Fiber ─────────────────────────

    {
        name: "Fort Collins Connexion", city: "Fort Collins", state: "CO", county: "Larimer",
        lat: 40.5853, lng: -105.0844,
        fiberMiles: 800, homesPassed: 70000, subscribers: 25000, marketShare: 32,
        maxSpeed: "10 Gbps", operator: "Fort Collins Connexion (city-owned utility)",
        darkFiberAvailable: true, yearDeployed: 2020, yearExpanded: 2024,
        investmentTotal: 142000000, fundingSources: ["Revenue Bonds", "City Enterprise Fund"],
        description: "Voter-approved municipal broadband. $142M investment. 10 Gbps residential service competing with Comcast and CenturyLink. Expanding to full city coverage.",
        services: ["Residential Fiber (10 Gbps)", "Business Fiber", "Dark Fiber", "Carrier Services"]
    },
    {
        name: "Ammon Fiber", city: "Ammon", state: "ID", county: "Bonneville",
        lat: 43.4693, lng: -111.9655,
        fiberMiles: 200, homesPassed: 12000, subscribers: 5000, marketShare: 42,
        maxSpeed: "1 Gbps", operator: "City of Ammon (open-access model)",
        darkFiberAvailable: true, yearDeployed: 2015, yearExpanded: 2023,
        investmentTotal: 15000000, fundingSources: ["City Budget", "LID Bonds"],
        description: "Pioneer of open-access municipal fiber model where residents pay for the fiber connection to their home (like a utility hookup) and choose from multiple ISPs. Software-defined networking allows instant ISP switching.",
        services: ["Open-Access Fiber", "Multiple ISP Choice", "Business Fiber", "Dark Fiber"]
    },
    {
        name: "Huntsville Fiber", city: "Huntsville", state: "AL", county: "Madison",
        lat: 34.7304, lng: -86.5861,
        fiberMiles: 1500, homesPassed: 100000, subscribers: 35000, marketShare: 28,
        maxSpeed: "5 Gbps", operator: "Google Fiber / Huntsville Utilities",
        darkFiberAvailable: true, yearDeployed: 2017, yearExpanded: 2024,
        investmentTotal: 200000000, fundingSources: ["Huntsville Utilities Infrastructure", "Google Fiber Investment"],
        description: "Unique model where Huntsville Utilities built the fiber network and Google Fiber operates as the retail ISP. City retains ownership of infrastructure. Cummings Research Park benefits from dark fiber access.",
        services: ["Residential Fiber (5 Gbps)", "Business Fiber", "Dark Fiber", "Enterprise Ethernet"]
    },
    {
        name: "Springfield City Utilities Fiber", city: "Springfield", state: "MO", county: "Greene",
        lat: 37.2090, lng: -93.2923,
        fiberMiles: 500, homesPassed: 55000, subscribers: 15000, marketShare: 22,
        maxSpeed: "1 Gbps", operator: "SpringNet (city utility fiber)",
        darkFiberAvailable: true, yearDeployed: 2018, yearExpanded: 2024,
        investmentTotal: 120000000, fundingSources: ["City Utilities Revenue", "Municipal Bonds"],
        description: "City Utilities of Springfield deploying fiber-to-the-home. SpringNet competing with existing cable and DSL. Dark fiber leasing for healthcare corridor.",
        services: ["Residential Fiber", "Business Fiber", "Dark Fiber", "Healthcare Connectivity"]
    },
    {
        name: "Holly Springs FiberNET", city: "Holly Springs", state: "NC", county: "Wake",
        lat: 35.6512, lng: -78.8336,
        fiberMiles: 200, homesPassed: 18000, subscribers: 8000, marketShare: 40,
        maxSpeed: "2 Gbps", operator: "Town of Holly Springs (municipal broadband)",
        darkFiberAvailable: false, yearDeployed: 2022, yearExpanded: 2025,
        investmentTotal: 38000000, fundingSources: ["Revenue Bonds", "Town Budget"],
        description: "Fast-growing Wake County suburb deploying municipal fiber to combat cable monopoly. 40% market share in first 3 years. Expanding to full town coverage.",
        services: ["Residential Fiber (2 Gbps)", "Business Fiber"]
    },

    // ── Major New Builds & Dark Fiber Leaders ────────────

    {
        name: "KUB Fiber", city: "Knoxville", state: "TN", county: "Knox",
        lat: 35.9606, lng: -83.9207,
        fiberMiles: 1100, homesPassed: 50000, subscribers: 55000, marketShare: 26,
        maxSpeed: "10 Gbps", operator: "Knoxville Utilities Board (KUB)",
        darkFiberAvailable: false, yearDeployed: 2022, yearExpanded: 2025,
        investmentTotal: 702000000, fundingSources: ["KUB Revenue Bonds", "Utility Revenue"],
        description: "On track to become the largest municipal fiber network in the US. $702M build serving 210,000 households across 688 sq mi (Knox, Grainger, Union, Sevier counties). Phase 1 complete with 1,100+ miles. 7-10 year full build-out.",
        services: ["Residential Fiber (10 Gbps)", "Business Fiber", "Smart Grid"]
    },
    {
        name: "Palo Alto Fiber", city: "Palo Alto", state: "CA", county: "Santa Clara",
        lat: 37.4419, lng: -122.1430,
        fiberMiles: 50, homesPassed: 6500, subscribers: 0, marketShare: 0,
        maxSpeed: "500 Mbps", operator: "City of Palo Alto Utilities",
        darkFiberAvailable: true, yearDeployed: 1996, yearExpanded: 2024,
        investmentTotal: 102000000, fundingSources: ["City Enterprise Fund", "Revenue Bonds"],
        description: "Silicon Valley's birthplace deploying $102M residential FTTH after 28 years of business-only dark fiber leasing. Phase 1 (6,500 homes) launching March 2026 at $75/mo. Dark fiber for businesses since 1996.",
        services: ["Business Dark Fiber Leasing", "Residential Fiber (launching 2026)", "Enterprise Ethernet"]
    },
    {
        name: "Riverside Dark Fiber", city: "Riverside", state: "CA", county: "Riverside",
        lat: 33.9533, lng: -117.3962,
        fiberMiles: 120, homesPassed: 0, subscribers: 0, marketShare: 0,
        maxSpeed: "N/A (dark fiber)", operator: "Riverside Public Utilities",
        darkFiberAvailable: true, yearDeployed: 2018, yearExpanded: 2024,
        investmentTotal: 15000000, fundingSources: ["Riverside Public Utilities Revenue"],
        description: "Formal dark fiber leasing program: 120 route-miles, $125/strand-mile/mo (drops to $70 with volume). Connected to SCE 5,000-mile regional network and RC3 data center. 7 on-net downtown buildings. SiFi Networks also building citywide open-access FTTH.",
        services: ["Dark Fiber Leasing", "Lit Services (100 Mbps-10 Gbps)", "Carrier Interconnection"]
    },
    {
        name: "Santa Monica CityNet", city: "Santa Monica", state: "CA", county: "Los Angeles",
        lat: 34.0195, lng: -118.4912,
        fiberMiles: 70, homesPassed: 5000, subscribers: 1500, marketShare: 5,
        maxSpeed: "10 Gbps", operator: "City of Santa Monica IT Dept (CityNet)",
        darkFiberAvailable: true, yearDeployed: 1998, yearExpanded: 2023,
        investmentTotal: 5000000, fundingSources: ["City IT Budget", "Dig-Once Savings"],
        description: "Rare municipal fiber NOT run by a utility — operated by IT department. Incremental 'dig once' expansion since 1998. Initial $530K investment saved $700K/year in leased lines. 50% of fiber remains unlit. 1 Gbps to affordable housing at $69/mo.",
        services: ["Business Dark Fiber", "Lit Services (100 Mbps-10 Gbps)", "Affordable Housing Broadband", "Public Wi-Fi"]
    },
    {
        name: "Kitsap PUD Fiber", city: "Kitsap County", state: "WA", county: "Kitsap",
        lat: 47.6477, lng: -122.6321,
        fiberMiles: 900, homesPassed: 30000, subscribers: 12000, marketShare: 15,
        maxSpeed: "1 Gbps", operator: "Kitsap Public Utility District (KPUD)",
        darkFiberAvailable: false, yearDeployed: 2000, yearExpanded: 2025,
        investmentTotal: 50000000, fundingSources: ["KPUD Revenue", "ARPA Funding ($6.6M)"],
        description: "Open-access model: KPUD builds fiber, multiple ISPs deliver service. 900+ miles of fiber operating 20+ years. 21 new distribution nodes coming online early 2026. $6.6M ARPA funding for expansion.",
        services: ["Open-Access Fiber", "Multiple ISP Choice", "Business Fiber"]
    },

    // ── Cooperative Fiber ────────────────────────────────

    {
        name: "RS Fiber Cooperative", city: "Renville-Sibley Counties", state: "MN", county: "Renville",
        lat: 44.6558, lng: -94.9727,
        fiberMiles: 1700, homesPassed: 7000, subscribers: 4500, marketShare: 65,
        maxSpeed: "1 Gbps", operator: "RS Fiber Cooperative",
        darkFiberAvailable: false, yearDeployed: 2016, yearExpanded: 2024,
        investmentTotal: 13700000, fundingSources: ["GO Tax Abatement Bonds", "USDA ReConnect", "Member Equity"],
        description: "First US cooperative formed specifically for broadband. 10 cities + 17 townships formed Joint Powers Agreement. $13.7M GO Tax Abatement Bond. National model for cooperative fiber in rural communities.",
        services: ["Residential Fiber (1 Gbps)", "Business Fiber", "Agricultural IoT"]
    }
];

/* ═══════════════════════════════════════════════════════════
 * Private 5G / CBRS Municipal Network Deployments
 * Detailed records of cities with active or planned private wireless networks.
 * These overlay on the CBRS zone data in data-layers.js.
 * ═══════════════════════════════════════════════════════════ */
SN.data.private5GDeployments = [
    {
        city: "Brownsville", state: "TX", lat: 25.9017, lng: -97.4975,
        networkType: "Private 5G SA", spectrum: "CBRS n48 (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 3, phase: "Phase 1 Complete",
        operator: "NTT DATA Americas", ranVendor: "Nokia AirScale",
        coreNetwork: "Nokia", sasProvider: "N/A (5G SA)",
        backhaul: "City-owned 100-mile fiber", investmentM: 4,
        useCases: ["4K Security Cameras (175+)", "AI Traffic Management", "Flood Detection IoT", "Smart Parks", "Airport Security", "Illegal Dumping Detection"],
        contractYear: 2024, goLiveYear: 2025,
        note: "First carrier-grade municipal private 5G in North America. Phase 2 expanding citywide."
    },
    {
        city: "Las Vegas", state: "NV", lat: 36.1699, lng: -115.1398,
        networkType: "Private 5G / CBRS", spectrum: "CBRS (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 8, phase: "Operational",
        operator: "NTT Ltd.", ranVendor: "Celona",
        coreNetwork: "Celona 5G LAN", sasProvider: "Google SAS",
        backhaul: "City fiber", investmentM: 15,
        useCases: ["Wrong-Way Driving Detection (90% reduction)", "Public Safety Video", "Telehealth", "Digital Divide Broadband", "IoT Sensors (2,000+)"],
        contractYear: 2021, goLiveYear: 2022,
        note: "Largest open-access municipal CBRS network in the US. City-owned, monetized as shared platform."
    },
    {
        city: "Tucson", state: "AZ", lat: 32.2226, lng: -110.9747,
        networkType: "Private LTE / CBRS", spectrum: "CBRS (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 15, phase: "Operational",
        operator: "City of Tucson", ranVendor: "JMA Wireless",
        coreNetwork: "Geoverse Managed Core", sasProvider: "Google SAS",
        backhaul: "City fiber + microwave", investmentM: 15,
        useCases: ["Digital Divide Broadband (5,000 households)", "Smart Traffic Lights", "Water System IoT", "First Responder Connectivity", "School Connectivity"],
        contractYear: 2021, goLiveYear: 2022,
        note: "Won Small Cell Forum Social Impact Award. Bridging digital divide at 50 Mbps for 5,000 households."
    },
    {
        city: "Dallas", state: "TX", lat: 32.8998, lng: -97.0403,
        networkType: "Private 5G / CBRS", spectrum: "CBRS (3.5 GHz)",
        coverage: "Indoor + Outdoor", areaSqMiles: 27, phase: "Operational",
        operator: "DFW Airport", ranVendor: "Ericsson",
        coreNetwork: "Ericsson Private 5G", sasProvider: "CommScope SAS",
        backhaul: "Airport fiber ring", investmentM: 20,
        useCases: ["800+ Connected Devices", "40+ Security Cameras", "Baggage Handling IoT", "Runway Operations", "Terminal Management"],
        contractYear: 2022, goLiveYear: 2023,
        note: "Manhattan-sized DFW Airport CBRS campus. One of largest airport private 5G deployments."
    },
    {
        city: "Salt Lake City", state: "UT", lat: 40.7608, lng: -111.8910,
        networkType: "5G Testbed / CBRS", spectrum: "CBRS + mmWave",
        coverage: "Outdoor", areaSqMiles: 4, phase: "Research Active",
        operator: "University of Utah / POWDER", ranVendor: "Multiple (research)",
        coreNetwork: "Open-source (OAI/srsRAN)", sasProvider: "Google SAS",
        backhaul: "University fiber + UTOPIA", investmentM: 8,
        useCases: ["NSF 5G Research", "Massive MIMO Testing", "Connected Vehicle V2X", "Smart Campus IoT", "Open RAN Development"],
        contractYear: 2018, goLiveYear: 2019,
        note: "NSF-funded POWDER city-scale 5G testbed. Open to researchers nationwide."
    },
    {
        city: "Denver", state: "CO", lat: 39.7392, lng: -104.9903,
        networkType: "Private 5G Research", spectrum: "CBRS (3.5 GHz)",
        coverage: "Indoor + Outdoor", areaSqMiles: 1, phase: "Research Active",
        operator: "CU Denver Smart Futures Lab", ranVendor: "Multiple",
        coreNetwork: "Open-source", sasProvider: "Federated Wireless",
        backhaul: "Campus fiber", investmentM: 2,
        useCases: ["IoT Startup Development", "Smart Traffic Research", "Air Quality Monitoring", "Edge Computing"],
        contractYear: 2022, goLiveYear: 2023,
        note: "$2M EDA grant. Smart Futures Lab private 5G for IoT startups."
    },
    {
        city: "Dublin", state: "OH", lat: 40.0992, lng: -83.1141,
        networkType: "Private LTE / CBRS", spectrum: "CBRS (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 2, phase: "Operational",
        operator: "City of Dublin", ranVendor: "Fujitsu",
        coreNetwork: "Fujitsu Software-Defined 5G", sasProvider: "Federated Wireless",
        backhaul: "Dublink fiber broadband", investmentM: 3,
        useCases: ["Smart Parking", "Security Surveillance", "Smart Utilities", "E-Health Services", "COVID Compliance Monitoring"],
        contractYear: 2020, goLiveYear: 2020,
        note: "Connected Dublin smart city initiative. Fujitsu CBRS with BBUs on utility poles. Also operates Dublink fiber broadband."
    },
    {
        city: "Glendale", state: "AZ", lat: 33.5387, lng: -112.1860,
        networkType: "Private 5G / CBRS", spectrum: "CBRS n48 (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 3, phase: "Pilot",
        operator: "City of Glendale", ranVendor: "Celona",
        coreNetwork: "Celona 5G LAN", sasProvider: "Google SAS",
        backhaul: "City fiber", investmentM: 2,
        useCases: ["HD Video Surveillance", "Traffic Monitoring", "Telehealth", "Smart Kiosks", "Remote Utility Control"],
        contractYear: 2023, goLiveYear: 2023,
        note: "Celona 5G LAN pilot for smart city apps. State Farm Stadium also has separate CBRS deployment."
    },
    {
        city: "Shreveport", state: "LA", lat: 32.5252, lng: -93.7502,
        networkType: "Private LTE / CBRS + DeWi", spectrum: "CBRS (3.5 GHz)",
        coverage: "Indoor + Outdoor", areaSqMiles: 1, phase: "Pilot",
        operator: "City of Shreveport IT", ranVendor: "Pollen Mobile",
        coreNetwork: "Decentralized Wireless (DeWi)", sasProvider: "N/A",
        backhaul: "Library fiber connections", investmentM: 1,
        useCases: ["Universal Digital Access", "Library Public Broadband", "Digital Divide Bridging"],
        contractYear: 2023, goLiveYear: 2023,
        note: "Unique DeWi approach using Pollen Mobile + CBRS at 5 library sites. 40% of city lacks broadband. CTO Keith Hanson leads initiative."
    },
    {
        city: "Syracuse", state: "NY", lat: 43.0481, lng: -76.1474,
        networkType: "CBRS FWA + Fiber", spectrum: "CBRS (3.5 GHz)",
        coverage: "Outdoor", areaSqMiles: 5, phase: "Operational",
        operator: "City of Syracuse (Surge Link)", ranVendor: "CBN Syracuse Municipal LLC",
        coreNetwork: "CBRS FWA", sasProvider: "N/A",
        backhaul: "20 miles city-owned fiber", investmentM: 14,
        useCases: ["Digital Divide Broadband (8,700+ homes)", "Low-Income Household Service ($14.99/mo)", "School Connectivity"],
        contractYear: 2023, goLiveYear: 2023,
        note: "Surge Link: 10 FWA hubs on 20 mi city fiber. $3.5M federal + $10.8M ConnectALL grant. Targets 13,000+ locations in 5 poorest neighborhoods."
    },
    {
        city: "Peachtree Corners", state: "GA", lat: 33.9701, lng: -84.2215,
        networkType: "5G Living Lab + C-V2X", spectrum: "Licensed 5G (T-Mobile) + C-V2X",
        coverage: "Outdoor", areaSqMiles: 1, phase: "Operational",
        operator: "City of Peachtree Corners (Curiosity Lab)", ranVendor: "T-Mobile",
        coreNetwork: "T-Mobile 5G + Cisco edge", sasProvider: "N/A (licensed spectrum)",
        backhaul: "Fiber", investmentM: 5,
        useCases: ["Autonomous Vehicle Testing (3-mile track)", "C-V2X Vehicle-to-Infrastructure", "Smart Traffic Signals", "IoT Central Control Room", "Environmental Monitoring"],
        contractYear: 2019, goLiveYear: 2019,
        note: "America's first real-world smart city living lab. 5G-enabled 3-mile AV track in 500-acre tech park. Won IEEE Smart Cities Jury Award 2022."
    }
];
