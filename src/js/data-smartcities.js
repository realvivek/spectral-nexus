/**
 * Spectral Nexus — Smart Cities Dataset (Research-Verified)
 * ~40 US cities with active smart city programs, CBRS/private 5G deployments,
 * IoT infrastructure, and connected city initiatives.
 *
 * Data compiled from public sources including:
 *   - US DOT Smart City Challenge records
 *   - FCC CBRS deployment data / OnGo Alliance
 *   - City government smart city program pages
 *   - Smart Cities Connect conference proceedings (2024)
 *   - NTIA broadband maps
 *   - Industry press releases (NTT, Celona, Geoverse, JMA Wireless)
 *   - ProptechOS 2025 Smart City Index
 *   - IDC Smart Cities North America Awards (2024)
 *
 * CBRS/Private 5G confirmed municipal deployments:
 *   Las Vegas NV — NTT/Celona (largest US municipal CBRS)
 *   Tucson AZ — JMA Wireless/Geoverse (digital divide, award-winning)
 *   Dallas TX — DFW Airport CBRS private wireless
 *   Salt Lake City UT — POWDER NSF 5G testbed (University of Utah)
 *   Lincoln NE — UNL CBRS campus network
 *
 * Last updated: 2026-02-24
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.smartCities = [

    // ═══════════════════════════════════════════════
    // TIER 1 — National Smart City Leaders
    // ═══════════════════════════════════════════════

    {
        name: "Columbus", state: "OH", lat: 39.9612, lng: -82.9988, population: 905748,
        program: "Smart Columbus", status: "Active", startYear: 2016, budget: 140000000,
        description: "Winner of the $40M USDOT Smart City Challenge in 2016. Deployed connected vehicle infrastructure, smart mobility hubs, and multimodal trip planning. Original federal program concluded in 2021 but six of eight projects continue with $20.2M committed to digital equity via the Franklin County Coalition.",
        initiatives: ["Connected Vehicles", "Smart Mobility Hubs", "EV Charging Network", "Multimodal Trip Planning", "Digital Equity", "Smart Logistics"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1200, smartLighting: true, smartTraffic: true },
        partners: ["US DOT", "AEP", "Paul G. Allen Foundation", "Battelle", "Ohio State University", "MORPC"],
        highlights: "First USDOT Smart City Challenge winner; $140M+ public-private investment; model for connected vehicle and smart mobility innovation.",
        website: "https://smartcolumbus.com/"
    },
    {
        name: "Kansas City", state: "MO", lat: 39.0997, lng: -94.5786, population: 508090,
        program: "KC Smart City / Emerging Technology Initiative", status: "Active", startYear: 2015, budget: 15000000,
        description: "One of America's first smart city corridors built along the 2-mile KC Streetcar route. $15M public-private partnership delivering free public Wi-Fi in 54-block area, smart streetlights, interactive kiosks, and real-time parking/traffic data. First Google Fiber city (2012) with 8,000 miles of gigabit-capable fiber.",
        initiatives: ["Free Public Wi-Fi", "Smart Streetlights", "Interactive Kiosks", "Smart Sewers", "Air Quality Sensors", "Real-Time Parking"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["Cisco", "Sprint", "Think Big Partners", "Xaqt", "Google Fiber", "KC Digital Drive"],
        highlights: "First Google Fiber city with 8,000 miles of gigabit fiber; pioneered smart city corridor along KC Streetcar with $15M public-private partnership.",
        website: "https://www.kcmo.gov/programs-initiatives/emerging-technology"
    },
    {
        name: "Las Vegas", state: "NV", lat: 36.1699, lng: -115.1398, population: 641903,
        program: "Accelerate Smart / Innovation District", status: "Active", startYear: 2018, budget: 50000000,
        description: "Home to the largest open-access municipal private 5G CBRS network in the US, deployed by NTT using Celona 5G LAN technology. City-owned network spans public spaces enabling law enforcement, telehealth, and IoT. 5G-enabled traffic system achieved 90% reduction in wrong-way-driving incidents.",
        initiatives: ["Municipal Private 5G CBRS", "Wrong-Way Driving Detection", "Smart Traffic", "Public Safety Video", "Telehealth", "Digital Divide"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2000, smartLighting: true, smartTraffic: true },
        partners: ["NTT", "Celona", "Dell Technologies", "Cisco", "Google SAS", "UNLV"],
        highlights: "Largest municipal CBRS private 5G in the US; city-owned network monetized as shared platform; 90% reduction in wrong-way driving incidents.",
        website: "https://www.lasvegasnevada.gov/Government/Departments/Information-Technologies/Innovation-District"
    },
    {
        name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611, population: 1386932,
        program: "Smart Streetlights / Smart SD", status: "Active", startYear: 2016, budget: 35000000,
        description: "Deployed 3,200 CityIQ smart streetlights with Intel processors, dual 1080p cameras, acoustic sensors, and environmental monitors connected via AT&T LTE. After privacy-related deactivation in 2020, 500 cameras reactivated in 2023 with Flock Safety ALPR. Contributed to 229 criminal cases and 166 arrests in 2024.",
        initiatives: ["Smart Streetlights", "CityIQ Sensors", "ALPR Technology", "Environmental Monitoring", "Smart Parking", "LED Conversion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 3200, smartLighting: true, smartTraffic: true },
        partners: ["GE Current", "Intel", "AT&T", "Ubicquia", "Flock Safety", "UC San Diego"],
        highlights: "World's largest municipal IoT streetlight deployment (3,200 nodes); each includes cameras, audio, and environmental sensors on AT&T LTE.",
        website: "https://www.sandiego.gov/sustainability/smart-streetlights"
    },
    {
        name: "Pittsburgh", state: "PA", lat: 40.4406, lng: -79.9959, population: 302971,
        program: "SmartPGH / PGH Lab", status: "Active", startYear: 2015, budget: 50000000,
        description: "Deep CMU Metro21 partnership with PGH Lab startup accelerator connecting local companies to city departments. $28.8M SmartSpines project modernizing 135 traffic signals with AI-based Surtrac adaptive signal control (25% travel time reduction). NetPGH provides unified fiber via $10.1M Crown Castle agreement.",
        initiatives: ["SmartSpines Traffic", "PGH Lab Startups", "NetPGH Fiber", "Smart LED Lighting", "Electric Avenue EVs", "Autonomous Vehicles"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["Carnegie Mellon University", "Crown Castle", "USDOT FHWA", "Rapid Flow Technologies", "Uber ATG", "Argo AI"],
        highlights: "AI-driven Surtrac adaptive signals cut travel times 25%; $28.8M SmartSpines modernizing 135 intersections; CMU robotics research hub.",
        website: "https://smartpittsburgh.org/"
    },
    {
        name: "New York City", state: "NY", lat: 40.7128, lng: -74.0060, population: 8336817,
        program: "NYC IoT Strategy / Smart City Testbed", status: "Active", startYear: 2015, budget: 500000000,
        description: "Ranked #1 smart city in North America (2023). Published official IoT Strategy in 2021. Smart City Testbed Program (2023) accepts rolling pilot applications. Midtown in Motion manages traffic with microwave sensors, cameras, and EZ-Pass readers across 6,000 miles of streets. 1,800+ LinkNYC Wi-Fi kiosks and BigBelly smart waste bins citywide.",
        initiatives: ["Smart City Testbed", "Midtown in Motion", "LinkNYC Wi-Fi Kiosks", "Smart Waste", "Pedestrian Counting", "Computer Vision Safety"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 15000, smartLighting: true, smartTraffic: true },
        partners: ["NYC OTI", "NYCEDC", "Google/Sidewalk Labs", "Verizon", "AT&T", "Columbia University"],
        highlights: "#1 North American smart city; Smart City Testbed accepts rolling pilots; Midtown in Motion manages 5,000+ buses and 13,000 taxis with real-time data.",
        website: "https://testbed.cityofnewyork.us/"
    },
    {
        name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, population: 2696555,
        program: "Array of Things / Chicago Tech Plan", status: "Active", startYear: 2013, budget: 35000000,
        description: "Home to Array of Things, a pioneering urban sensor network from Argonne National Lab and UChicago. $12M+ NSF funding deployed 500 nodes measuring air quality, noise, temperature, traffic, and water levels. Also converted 270,000 streetlights to smart LEDs. Next-gen SAGE platform adds hyperspectral cameras and lidar.",
        initiatives: ["Array of Things Sensors", "SAGE Platform", "Smart LED Streetlights", "Data Analytics", "Predictive Policing AI", "Open Data Portal"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["Argonne National Laboratory", "University of Chicago", "NSF", "Intel", "Microsoft", "Motorola Solutions"],
        highlights: "Pioneered urban sensing with 500 Array of Things nodes; $12M NSF-funded platform evolving to SAGE with hyperspectral cameras and lidar.",
        website: "https://arrayofthings.github.io/"
    },
    {
        name: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194, population: 873965,
        program: "SF Smart City / SFpark", status: "Active", startYear: 2011, budget: 60000000,
        description: "AI-centered smart city strategy processing data from 30,000+ IoT sensors. SFpark deployed 8,200+ smart parking sensors across 28,000 metered spots, cutting parking search time by 43%. Earthquake early warning system can slow BART trains and alert residents up to 15 seconds before shaking begins.",
        initiatives: ["SFpark Smart Parking", "Earthquake Early Warning", "Smart Waste Management", "Air Quality Monitoring", "Smart Street Lighting", "EV Charging"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 30000, smartLighting: true, smartTraffic: true },
        partners: ["SFMTA", "PG&E", "AT&T", "Intel", "Siemens", "UC Berkeley"],
        highlights: "30,000+ IoT sensors citywide; SFpark reduced parking search time 43% with 8,200+ embedded sensors; earthquake early warning system.",
        website: "https://www.sfmta.com/projects/smart-city-challenge-2016"
    },
    {
        name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, population: 3898747,
        program: "SmartLA 2028", status: "Active", startYear: 2019, budget: 150000000,
        description: "Comprehensive strategy to become fully digital by 2028 Olympics. Led by ITA and 24-department Smart City Committee. Includes AI-powered fire detection, IoT streetlight sensors, 10,000 public EV chargers, and public-private IoT integration platform by 2026. Won #1 US Digital City award three consecutive years.",
        initiatives: ["SmartLA 2028 Olympics", "Smart Street Lighting", "Fire Detection AI", "EV Charging Network", "Smart Parking", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 5000, smartLighting: true, smartTraffic: true },
        partners: ["LA ITA", "Siemens", "Verizon", "AT&T", "USC", "UCLA"],
        highlights: "#1 US Digital City three years running; SmartLA 2028 Olympics-ready smart infrastructure with AI fire detection and 10,000 EV chargers.",
        website: "https://ita.lacity.gov/smartla2028"
    },
    {
        name: "Atlanta", state: "GA", lat: 33.7490, lng: -84.3880, population: 498715,
        program: "SmartATL / North Avenue Smart Corridor", status: "Active", startYear: 2015, budget: 40000000,
        description: "Ranked #1 US smart city future (ProptechOS 2025 Index). The 2.3-mile North Avenue Smart Corridor deploys 100+ IoT sensors, Surtrac AI adaptive signals (25% travel time reduction), and V2X connected vehicle technology. Joined White House Smart Cities Initiative in 2015 with deep Georgia Tech research partnership.",
        initiatives: ["North Avenue Smart Corridor", "Surtrac AI Traffic", "V2X Connected Vehicles", "MARTA Digital", "Smart Lighting", "Environmental Sensors"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["Georgia Tech", "GDOT", "Applied Information", "Renew Atlanta", "MARTA", "Temple Inc."],
        highlights: "#1 US smart city future (2025 ProptechOS); North Ave corridor with AI Surtrac signals and V2X connected vehicle tech across 18 intersections.",
        website: "https://atldot.atlantaga.gov/projects/north-ave-smart-corridor"
    },
    {
        name: "Chattanooga", state: "TN", lat: 35.0456, lng: -85.3097, population: 181099,
        program: "Gig City / EPB Smart Grid", status: "Active", startYear: 2010, budget: 280000000,
        description: "America's Gig City. EPB deployed first US community-wide gigabit fiber (2010), 10 Gbps (2015), and 25 Gbps (2022) across 9,000-mile network serving 180,000 homes. $280M fiber investment generated $2.69B economic benefit over 10 years, 9,500+ jobs, 55% power outage reduction via 200,000+ smart grid sensors. 70% market share.",
        initiatives: ["25 Gbps Community Fiber", "Smart Grid Sensors", "Quantum Network", "Smart City Testbed", "Traffic Prediction", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 200000, smartLighting: true, smartTraffic: true },
        partners: ["EPB", "University of Tennessee Chattanooga", "Oak Ridge National Laboratory", "US DOE", "Nokia", "Qubitekk"],
        highlights: "First US community 1G/10G/25G fiber; $280M investment yielded $2.69B economic impact; 200,000+ smart grid sensors; 70% broadband market share.",
        website: "https://epb.com/"
    },
    {
        name: "Boston", state: "MA", lat: 42.3601, lng: -71.0589, population: 675647,
        program: "New Urban Mechanics / Smart Streets", status: "Active", startYear: 2010, budget: 20000000,
        description: "MONUM (Mayor's Office of New Urban Mechanics) pioneered people-centered smart city approach, earning White House Champions of Change. Smart Streets uses cameras and sensors for Vision Zero safety. Local Sense Lab tests IoT with community input. Partners with ACLU on sensor privacy policy. Minimal-data-collection philosophy.",
        initiatives: ["Smart Streets Vision Zero", "Local Sense Lab", "Street Bump App", "Soofa Solar Benches", "Autonomous Vehicle Testing", "COVID Chatbots"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: true },
        partners: ["Verizon", "MIT", "Boston University", "Soofa", "nuTonomy", "ACLU"],
        highlights: "White House Champions of Change; privacy-first smart city with ACLU partnership; MONUM community-driven sensor deployment model.",
        website: "https://www.boston.gov/departments/new-urban-mechanics"
    },
    {
        name: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321, population: 737015,
        program: "Smart Seattle / SDOT ITS", status: "Active", startYear: 2015, budget: 35000000,
        description: "Ranked top US smart city (2024). Awarded Actelis Networks major ITS modernization contract (Dec 2024) upgrading traffic signals, cameras, and congestion monitoring with hybrid-fiber technology. AI-driven smart parking adjusts prices on real-time occupancy. MetroLab Network university-city partnership member with UW.",
        initiatives: ["ITS Modernization", "Smart Parking", "Traffic Management Center", "Congestion Monitoring", "Digital Equity", "MetroLab Network"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 2000, smartLighting: true, smartTraffic: true },
        partners: ["Actelis Networks", "University of Washington", "Amazon", "Microsoft", "T-Mobile", "MetroLab Network"],
        highlights: "Top-ranked US smart city; Actelis hybrid-fiber ITS modernization powers real-time traffic; AI smart parking adjusts prices on occupancy.",
        website: "https://www.seattle.gov/transportation/projects-and-programs/programs/technology-program"
    },
    {
        name: "Washington", state: "DC", lat: 38.9072, lng: -77.0369, population: 689545,
        program: "DC Smart City Initiative / PA2040", status: "Active", startYear: 2015, budget: 40000000,
        description: "OCTO leads interagency smart city efforts. PA2040 project deploys IoT environmental sensors, video, and smart lighting along Pennsylvania Avenue. 75,000+ LED smart streetlights with motion sensors citywide. AI-enabled cameras track cars, bikes, pedestrians, and transit in real time. Free public Wi-Fi via digital kiosks.",
        initiatives: ["PA2040 Smart Corridor", "Smart LED Streetlights", "AI Traffic Cameras", "Water Quality Sensors", "Free Wi-Fi Kiosks", "Smart Parking"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 3000, smartLighting: true, smartTraffic: true },
        partners: ["DC OCTO", "DDOT", "NCPC", "Golden Triangle BID", "AT&T", "IBM"],
        highlights: "75,000+ smart LED streetlights with motion detection; PA2040 IoT corridor along America's Main Street; AI multimodal traffic cameras.",
        website: "http://open.dc.gov/smart-city/"
    },
    {
        name: "Austin", state: "TX", lat: 30.2672, lng: -97.7431, population: 978908,
        program: "Austin Smart City Alliance", status: "Active", startYear: 2016, budget: 30000000,
        description: "Strong university-city-industry ecosystem. $15M federal EV charging grant (284 new ports), NSF 5G research grants for healthcare/public safety, UT Austin Good Systems digital twin technology for fire tracking. Open Government Partnership member. Google Fiber and AT&T Fiber market.",
        initiatives: ["EV Charging Network", "5G Research Grants", "Digital Twins", "Smart Transportation", "Air Quality Monitoring", "Open Government"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 600, smartLighting: true, smartTraffic: true },
        partners: ["UT Austin", "Austin Energy", "NSF", "Waymo", "Google Fiber", "Austin Smart City Alliance"],
        highlights: "NSF 5G research grants for healthcare/public safety; $15M federal EV charging grant; UT Austin digital twin fire tracking partnership.",
        website: "http://www.austinsmartcity.org/"
    },

    // ═══════════════════════════════════════════════
    // TIER 2 — Strong Regional Leaders
    // ═══════════════════════════════════════════════

    {
        name: "San Jose", state: "CA", lat: 37.3382, lng: -121.8863, population: 1013240,
        program: "San Jose Smart City Vision", status: "Active", startYear: 2016, budget: 30000000,
        description: "Capital of Silicon Valley aiming to be a global civic innovation leader. $24M secured for digital inclusion (100K residents lacked broadband). Smart City Advisory Board provides expert governance. 'Unleash Your Geek' challenge gives startups $100K to solve community problems. Most thinly-staffed major city government drives tech adoption.",
        initiatives: ["Digital Inclusion", "Smart City Advisory Board", "AI Translation", "Road Safety Analytics", "EV Infrastructure", "Open Innovation"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["Ruckus Networks", "Cisco", "Google", "Apple", "Samsung", "San Jose State University"],
        highlights: "Silicon Valley capital investing $24M in digital inclusion; Smart City Advisory Board governs technology for 1M+ residents.",
        website: "https://www.sanjoseca.gov/your-government/departments-offices/information-technology/smart-city-vision"
    },
    {
        name: "Portland", state: "OR", lat: 45.5152, lng: -122.6784, population: 652503,
        program: "Smart City PDX", status: "Active", startYear: 2016, budget: 10000000,
        description: "Equity and privacy leader — instrumental in Portland's 2020 facial recognition ban for city and private use. Traffic Safety Sensor Project installed 200 CityIQ sensors on deadliest streets. 14 bridges monitored with AT&T LTE structural sensors. NIST replicable smart city technology partnership.",
        initiatives: ["Traffic Safety Sensors", "Bridge Structural Monitoring", "Air Quality Sensors", "Facial Recognition Ban", "Smart Lighting", "NIST Partnership"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 350, smartLighting: true, smartTraffic: true },
        partners: ["Intel", "AT&T", "GE Current", "Portland General Electric", "NIST", "Portland State University"],
        highlights: "Privacy-first smart city that banned facial recognition (2020); 200 traffic safety sensors on deadliest corridors; NIST replicable tech partner.",
        website: "https://www.portland.gov/bps/com-tech/smart-city-pdx"
    },
    {
        name: "Denver", state: "CO", lat: 39.7392, lng: -104.9903, population: 713252,
        program: "Denver Smart City / Colorado Smart Cities Alliance", status: "Active", startYear: 2016, budget: 25000000,
        description: "Anchors the nation's first statewide smart cities alliance bringing together public, private, and academic sectors across Colorado. CU Denver Smart Futures Lab ($2M EDA grant) features private 5G research network for IoT development. Partners with Xcel Energy on smart grid and renewable energy integration.",
        initiatives: ["Smart Futures Lab", "Private 5G Research", "Smart Traffic Cabinets", "Air Quality Sensors", "Smart Grid", "C2 Challenge"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["CU Denver", "Colorado Smart Cities Alliance", "Xcel Energy", "Innosphere Ventures", "Western Systems", "US EDA"],
        highlights: "Anchor of first statewide smart cities alliance; CU Denver Smart Futures Lab operates private 5G research network for IoT startups.",
        website: "https://coloradosmart.city/"
    },
    {
        name: "Charlotte", state: "NC", lat: 35.2271, lng: -80.8431, population: 879709,
        program: "Smart Charlotte", status: "Active", startYear: 2017, budget: 15000000,
        description: "Smart Charlotte focuses on connectivity, digital inclusion, and innovation. North End Smart District (NEST) features tech center for digital literacy. Knight Foundation invested $1.2M in digital engagement. Testing smart poles with cameras, sensors, and Wi-Fi hotspots capable of detecting gunshots and breaking glass.",
        initiatives: ["Smart Poles", "NEST Tech Center", "Smart Energy Systems", "Autonomous Shuttle Pilot", "Digital Equity", "Smart Traffic"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 300, smartLighting: true, smartTraffic: true },
        partners: ["Knight Foundation", "UNC Charlotte", "Duke Energy", "NCDOT", "Johnson C. Smith University", "Honeywell"],
        highlights: "Smart poles with acoustic gunshot detection; Knight Foundation $1.2M digital engagement; North End Smart District tech center.",
        website: "https://www.charlottenc.gov/Growth-and-Development/Smart-Charlotte"
    },
    {
        name: "Miami", state: "FL", lat: 25.7617, lng: -80.1918, population: 442241,
        program: "Smart Miami / Little River District", status: "Active", startYear: 2017, budget: 50000000,
        description: "Multi-front smart city deployment: IKE Smart City kiosks with free Wi-Fi, Siemens/Yunex Traffic connected bike initiative, $3B Little River District smart development (approved 2024) with 5,700 smart-enabled housing units. Waymo robotaxi expansion planned 2025. Miami Forever Bond funds IoT flood control.",
        initiatives: ["IKE Smart Kiosks", "Connected Bike", "Autonomous Vehicles", "Smart Lighting", "Flood Control IoT", "EV Fleet"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 600, smartLighting: true, smartTraffic: true },
        partners: ["IKE Smart City", "Siemens/Yunex Traffic", "Digital Alpha", "Cisco", "University of Miami", "Waymo"],
        highlights: "$3B Little River smart district with 5,700 connected homes; IKE kiosks with free Wi-Fi; Waymo robotaxi expansion 2025.",
        website: "https://smartcities.miami.edu/"
    },
    {
        name: "Nashville", state: "TN", lat: 36.1627, lng: -86.7816, population: 689447,
        program: "Nashville Smart City Strategic Plan", status: "Active", startYear: 2017, budget: 15000000,
        description: "Nashville takes a holistic 'marathon not a sprint' approach under CIO Keith Durbin. Focused on smart transportation for rapid population growth, digital inclusion, and data-driven governance. Deploying connected traffic infrastructure. Leveraging healthcare industry strengths (Vanderbilt) for smart health initiatives.",
        initiatives: ["Smart Transportation", "Connected Traffic", "Digital Inclusion", "Data Analytics", "Smart Health", "Open Data Portal"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 300, smartLighting: true, smartTraffic: true },
        partners: ["Vanderbilt University", "NES", "Google Fiber", "Cisco", "Nashville Technology Council", "Metro Nashville IT"],
        highlights: "Holistic marathon approach to smart city transformation; healthcare industry strengths with Vanderbilt; Google Fiber backbone.",
        website: "https://www.nashville.gov/departments/information-technology-services"
    },
    {
        name: "Detroit", state: "MI", lat: 42.3314, lng: -83.0458, population: 639111,
        program: "Michigan Central / AAIR", status: "Active", startYear: 2020, budget: 30000000,
        description: "Michigan Central Station redevelopment anchors smart city ambitions. Advanced Aerial Innovation Region (AAIR) spans 28 miles as urban drone testbed with 800+ flights, six BVLOS waivers, and longest continuous BVLOS drone delivery (2.3 mi). Major autonomous vehicle testing hub with deep auto industry partnerships.",
        initiatives: ["AAIR Drone Testbed", "Autonomous Vehicles", "Michigan Central Innovation", "BVLOS Drone Delivery", "Connected Infrastructure", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["Ford Motor Company", "Google", "Newlab", "University of Michigan", "Wayne State University", "Bedrock"],
        highlights: "28-mile AAIR drone testbed with 800+ flights and longest BVLOS delivery; Michigan Central Station as smart city innovation campus.",
        website: "https://michigancentral.com/"
    },
    {
        name: "Philadelphia", state: "PA", lat: 39.9526, lng: -75.1652, population: 1603797,
        program: "Smart Philadelphia / PSIP", status: "Active", startYear: 2018, budget: 60000000,
        description: "Streetlight Improvement Project (PSIP) converting 130,000 streetlights to LEDs — city's largest energy conservation project. Advances Vision Zero and 2030 climate goals. UChicago study showed 36% crime reduction with better lighting. Smart Cities Director leads AI and data strategy citywide.",
        initiatives: ["130K LED Streetlight Conversion", "Vision Zero", "Smart Lighting", "AI & Data Strategy", "Digital Equity", "Climate Action"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1500, smartLighting: true, smartTraffic: true },
        partners: ["Ameresco", "Itron", "Comcast", "Drexel University", "Temple University", "Penn Medicine"],
        highlights: "Largest city energy conservation project converting 130K streetlights to LED; UChicago study showed 36% crime reduction with improved lighting.",
        website: "https://www.phila.gov/programs/streetlight-improvement/"
    },
    {
        name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, population: 2304580,
        program: "Houston Smart City / Connected Solutions", status: "Active", startYear: 2017, budget: 35000000,
        description: "Strategic Initiatives division drives smart city deployment across America's fourth-largest city. Participates in national AI governance conversations. Deploying IoT-driven flood management critical for hurricane-prone region. Energy sector provides deep partnerships for smart grid and industrial IoT innovation.",
        initiatives: ["Flood Management IoT", "Connected Infrastructure", "AI Governance", "Smart Grid", "Digital Inclusion", "Smart Traffic"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1000, smartLighting: true, smartTraffic: true },
        partners: ["Rice University", "Houston Methodist", "AT&T", "CenterPoint Energy", "Port Houston", "Texas Medical Center"],
        highlights: "Fourth-largest US city leveraging energy sector for smart grid innovation; IoT flood management for hurricane resilience.",
        website: "https://www.houstontx.gov/smartcity/"
    },
    {
        name: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970, population: 1304379,
        program: "Dallas Innovation Alliance", status: "Active", startYear: 2015, budget: 30000000,
        description: "2024 IDC Smart Cities North America Awards finalist for civic engagement innovation. Launched Innovation Alliance under White House Smart Cities Initiative, targeting top smart city by 2030. DFW Airport operates CBRS private wireless across Manhattan-sized campus supporting 800+ devices and 40+ security cameras.",
        initiatives: ["Innovation Alliance", "DFW Airport CBRS Network", "Civic Engagement Platform", "Smart Lighting", "South Oak Cliff Park", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["AT&T", "Toyota", "Texas Instruments", "UT Dallas", "DFW Airport", "Ericsson"],
        highlights: "2024 IDC Smart Cities Award finalist; DFW Airport CBRS private 5G across Manhattan-sized campus with 800+ connected devices.",
        website: "https://dfrlab.org/dallas-innovation-alliance/"
    },
    {
        name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.0740, population: 1608139,
        program: "Connective Smart Region / Office of Innovation", status: "Active", startYear: 2019, budget: 25000000,
        description: "Anchors the Connective Smart Region Consortium — nation's first and largest smart region with 18 cities across Greater Phoenix. Office of Innovation pilots AR urban planning, IoT-monitored chilled water kiosks, and supports 12,000-15,000 planned 5G small cells. Bloomberg What Works Cities Platinum certified for data-driven governance.",
        initiatives: ["Smart Region Consortium", "AR Urban Planning", "5G Small Cells", "IoT Water Kiosks", "Smart Traffic", "Digital Twins"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 600, smartLighting: true, smartTraffic: true },
        partners: ["ASU", "MAG", "Salt River Project", "Intel", "Connective", "Bloomberg Philanthropies"],
        highlights: "First/largest US smart region (18 cities); Bloomberg Platinum data governance; 12K-15K 5G small cells planned citywide.",
        website: "https://www.phoenix.gov/administration/departments/innovation/smart-cities.html"
    },
    {
        name: "Tampa", state: "FL", lat: 27.9506, lng: -82.4572, population: 384959,
        program: "Tampa Bay Smart Cities Alliance / Water Street Tampa", status: "Active", startYear: 2017, budget: 40000000,
        description: "Water Street Tampa is Florida's first smart district: 180 connected streetlights with air quality monitors and wireless APs, 16 underground fiber conduits, publicly accessible 5G Wi-Fi, smart parking, emergency management portals. Tampa Bay Smart Cities Alliance at USF coordinates regional projects across transportation, energy, and health.",
        initiatives: ["Water Street Smart District", "Connected Streetlights", "Smart Parking", "Smart Waste", "Connected Vehicle Infrastructure", "5G Wi-Fi"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["Strategic Property Partners", "USF CUTR", "Crown Castle", "Cisco", "Siemens", "Hillsborough County"],
        highlights: "Florida's first smart district at Water Street Tampa; 180 connected streetlights with air quality sensors; publicly accessible 5G Wi-Fi.",
        website: "https://tbsmartcities.com/"
    },
    {
        name: "Minneapolis", state: "MN", lat: 44.9778, lng: -93.2650, population: 429954,
        program: "Minneapolis DataSource / Smart Minneapolis", status: "Active", startYear: 2018, budget: 12000000,
        description: "Data-first smart city approach via centralized Minneapolis DataSource analytics platform using Tableau, IBM Cognos, and Esri. $10M annual Climate Legacy Initiative investment. EV charging station expansion. IT infrastructure upgrades supporting federal consent decree compliance and transparency dashboards.",
        initiatives: ["DataSource Analytics", "Climate Legacy", "EV Charging", "Open Data Portal", "Digital Equity", "Smart Lighting"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 300, smartLighting: true, smartTraffic: true },
        partners: ["University of Minnesota", "Xcel Energy", "Tableau", "IBM", "Esri", "US Bank"],
        highlights: "Data-first smart city with centralized analytics platform; $10M annual Climate Legacy investment with EV and smart grid focus.",
        website: "https://www.minneapolismn.gov/government/government-data/datasource/"
    },

    // ═══════════════════════════════════════════════
    // TIER 3 — Emerging / Specialized Smart Cities
    // ═══════════════════════════════════════════════

    {
        name: "Tucson", state: "AZ", lat: 32.2226, lng: -110.9747, population: 542629,
        program: "Wire Tucson / Municipal CBRS Network", status: "Active", startYear: 2021, budget: 15000000,
        description: "One of the largest municipal CBRS private cellular networks in the US bridging the digital divide (32% lacked broadband). JMA Wireless radios, Geoverse managed core, Google SAS. Delivers 50 Mbps to 5,000 households, connects traffic lights, monitors water systems, supports first responders. Won Small Cell Forum Social Impact Award.",
        initiatives: ["Municipal CBRS Network", "Digital Divide Broadband", "Smart Traffic Lights", "Water System IoT", "First Responder Connectivity", "School Connectivity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 400, smartLighting: false, smartTraffic: true },
        partners: ["JMA Wireless", "Geoverse", "Google SAS", "Tilson", "Insight Enterprises", "Pima County"],
        highlights: "Award-winning municipal CBRS network bridging digital divide for 5,000 households at 50 Mbps; national model for municipal private 5G.",
        website: "https://www.wiretucson.org/"
    },
    {
        name: "Raleigh", state: "NC", lat: 35.7796, lng: -78.6382, population: 467665,
        program: "Smart Raleigh / Connected Triangle+", status: "Active", startYear: 2018, budget: 10000000,
        description: "Smart Raleigh (Office of Strategy and Innovation) is part of Connected Triangle+ regional collaboration. Hosted Smart Cities Connect 2024. Projects include smart Wi-Fi-enabled streetlights for underserved neighborhoods, Greenway Innovation Corridor, and regional air quality/heat monitoring with JustAir sensors.",
        initiatives: ["Connected Triangle+", "Smart Lighting Wi-Fi", "Greenway Innovation Corridor", "Air Quality Monitoring", "Heat Monitoring", "Smart Waste"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 250, smartLighting: true, smartTraffic: true },
        partners: ["NC State University", "JustAir Inc.", "Research Triangle Foundation", "Town of Cary", "SAS Institute", "Red Hat/IBM"],
        highlights: "Hosted Smart Cities Connect 2024; Connected Triangle+ regional hub; smart streetlights delivering Wi-Fi to underserved neighborhoods.",
        website: "https://raleighnc.gov/strategy-and-innovation/service-unit/smart-raleigh"
    },
    {
        name: "Orlando", state: "FL", lat: 28.5383, lng: -81.3792, population: 307573,
        program: "Orlando Smart City / Future-Ready", status: "Active", startYear: 2017, budget: 15000000,
        description: "Leverages tourism and defense/simulation industry for smart city innovation. Smart parking sensors, connected traffic, and IoT water management. UCF Institute for Simulation and Training and Central Florida tech corridor drive autonomous vehicle and smart mobility pilots via SunRail connected transit.",
        initiatives: ["Smart Parking", "Connected Traffic", "Water Management IoT", "Autonomous Shuttles", "SunRail Connected Transit", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: true },
        partners: ["UCF", "Siemens", "FDOT", "Orlando Utilities Commission", "Luminary Green", "MetroPlan Orlando"],
        highlights: "Tourism and defense tech hub driving smart mobility; UCF simulation research powers autonomous vehicle and connected infrastructure pilots.",
        website: "https://www.orlando.gov/Our-Government/Records-and-Documents/Plans-Studies/Future-Ready-City-Master-Plan"
    },
    {
        name: "Louisville", state: "KY", lat: 38.2527, lng: -85.7585, population: 633045,
        program: "Smart Louisville / Civic Innovation", status: "Active", startYear: 2011, budget: 12000000,
        description: "OPI2 (Office of Performance Improvement and Innovation) recognized as national best practice. Bloomberg-funded innovation team pioneered Air Louisville — 1,000+ residents with inhaler sensors crowdsourcing air quality data. LouieLab connects startups with city departments. Waze traffic data partnership. Microsoft workforce development.",
        initiatives: ["Air Louisville Sensors", "LouieLab Innovation", "Waze Traffic Partnership", "Smart Transit BRT", "Digital Inclusion", "Smart Waste"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 350, smartLighting: true, smartTraffic: true },
        partners: ["Bloomberg Philanthropies", "Microsoft", "Waze", "UPS", "GE Appliances", "University of Louisville"],
        highlights: "Bloomberg innovation team pioneer; Air Louisville gave 1,000+ residents inhaler sensors to crowdsource air quality data citywide.",
        website: "https://louisvilleky.gov/government/metro-technology-services/smart-city"
    },
    {
        name: "Sacramento", state: "CA", lat: 38.5816, lng: -121.4944, population: 524943,
        program: "Sacramento Smart City", status: "Active", startYear: 2018, budget: 10000000,
        description: "California's capital deploying smart city infrastructure: autonomous shuttle pilots, smart streetlights, and environmental monitoring. One of first Verizon 5G test deployments in the US. SMUD (Sacramento Municipal Utility District) smart grid integrating solar and battery storage for grid optimization.",
        initiatives: ["5G Test Deployment", "Autonomous Shuttles", "Smart Grid/SMUD", "Environmental Monitoring", "Smart Streetlights", "EV Infrastructure"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: true },
        partners: ["Verizon", "SMUD", "UC Davis", "Sacramento Regional Transit", "May Mobility", "SacRT"],
        highlights: "One of America's first 5G test markets with Verizon; SMUD smart grid integrating solar and battery for California's capital.",
        website: "https://www.cityofsacramento.gov/"
    },
    {
        name: "Salt Lake City", state: "UT", lat: 40.7608, lng: -111.8910, population: 199723,
        program: "Tech Lake City / POWDER 5G", status: "Active", startYear: 2018, budget: 8000000,
        description: "Hosts NSF-funded POWDER (Platform for Open Wireless Data-driven Experimental Research) — city-scale 5G testbed with massive MIMO capabilities run by University of Utah and Rice University. Mayor Mendenhall's Tech Lake City initiative connects innovators. Silicon Slopes provides 4,500-member tech ecosystem.",
        initiatives: ["POWDER 5G Testbed", "Tech Lake City", "Smart Transportation", "Digital Equity", "Rose Park Connect Wi-Fi", "Silicon Slopes"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 200, smartLighting: true, smartTraffic: true },
        partners: ["University of Utah", "Rice University", "NSF", "Silicon Slopes", "UDOT", "Comcast"],
        highlights: "Home to POWDER NSF-funded city-scale 5G testbed with massive MIMO; Silicon Slopes ecosystem of 4,500+ tech companies.",
        website: "https://www.slc.gov/ed/"
    },
    {
        name: "Honolulu", state: "HI", lat: 21.3069, lng: -157.8583, population: 350964,
        program: "Smart Honolulu", status: "Active", startYear: 2018, budget: 12000000,
        description: "Deploying smart city technologies for unique island challenges: traffic congestion on limited road networks, tsunami/hurricane disaster preparedness, and renewable energy integration. Connected traffic signals, smart parking, and environmental sensors. HART rail project incorporates smart transit technology.",
        initiatives: ["Smart Traffic Signals", "HART Smart Rail", "Disaster Early Warning", "Smart Parking", "Renewable Energy Grid", "Environmental Monitoring"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 300, smartLighting: true, smartTraffic: true },
        partners: ["Hawaiian Electric", "University of Hawaii", "HART", "AT&T", "Hitachi", "HECO"],
        highlights: "Island smart city tackling unique challenges of limited roads, tsunami preparedness, and renewable energy with HART smart rail.",
        website: "https://www.honolulu.gov/"
    },
    {
        name: "Lexington", state: "KY", lat: 38.0406, lng: -84.5037, population: 322570,
        program: "Smart Lexington / Innovation & Technology", status: "Pilot", startYear: 2018, budget: 8000000,
        description: "Deploying smart city solutions through Office of Innovation and Technology. Smart traffic signal optimization, open data portals, digital inclusion. Connected streetlight infrastructure and University of Kentucky partnership for data analytics and IoT research. Unique equestrian industry IoT for horse farm monitoring.",
        initiatives: ["Smart Traffic Signals", "Open Data Portal", "Connected Streetlights", "Digital Inclusion", "Smart Parking", "UK IoT Research"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 200, smartLighting: true, smartTraffic: true },
        partners: ["University of Kentucky", "Kentucky Utilities", "Lexington-Fayette Urban County", "IBM", "Windstream", "Bluegrass ADD"],
        highlights: "University of Kentucky partnership for smart traffic and data analytics; unique equestrian industry IoT monitoring applications.",
        website: "https://www.lexingtonky.gov/innovation-technology"
    },
    {
        name: "Lincoln", state: "NE", lat: 40.8136, lng: -96.7026, population: 291082,
        program: "Lincoln Smart City / UNL NUtech", status: "Pilot", startYear: 2019, budget: 5000000,
        description: "Leverages University of Nebraska-Lincoln's CBRS campus network deployment and NUtech Ventures for innovation. Piloting smart traffic timing, connected water infrastructure monitoring, and air quality sensors. UNL operates one of the notable university CBRS networks supporting IoT research. Allo Fiber provides gigabit backbone.",
        initiatives: ["Smart Traffic Timing", "Water Infrastructure IoT", "Air Quality Sensors", "UNL CBRS Campus", "Open Data", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: true, iotSensors: 150, smartLighting: true, smartTraffic: true },
        partners: ["University of Nebraska-Lincoln", "Lincoln Electric System", "Allo Fiber", "NUtech Ventures", "NDOT", "Nelnet"],
        highlights: "UNL CBRS campus network supports IoT research; Allo Fiber community-wide gigabit backbone for smart city infrastructure.",
        website: "https://www.lincoln.ne.gov/"
    },
    {
        name: "Madison", state: "WI", lat: 43.0731, lng: -89.4012, population: 269840,
        program: "Smart Madison / Digital Ready", status: "Active", startYear: 2018, budget: 8000000,
        description: "Emphasizes digital equity and sustainability. Madison Digital Ready initiative ensures universal broadband access. UW-Madison partnership for IoT research. Smart traffic signals, environmental sensors, and connected bus transit. Strong open data program enabling community-driven innovation.",
        initiatives: ["Digital Ready Broadband", "Smart Traffic", "Environmental Sensors", "Connected Transit", "Open Data Portal", "Sustainability Analytics"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 200, smartLighting: true, smartTraffic: true },
        partners: ["UW-Madison", "Madison Gas & Electric", "Epic Systems", "Exact Sciences", "Google Fiber", "Dane County"],
        highlights: "Madison Digital Ready ensures universal broadband; UW-Madison partnership for IoT research; strong open data for community innovation.",
        website: "https://www.cityofmadison.com/information-technology"
    },
    {
        name: "Durham", state: "NC", lat: 35.9940, lng: -78.8986, population: 283506,
        program: "Smart Durham / Innovate Durham", status: "Active", startYear: 2019, budget: 8000000,
        description: "Ranked #5 in 2024 Digital Cities Survey. Innovate Durham program lets startups test products with city data and facilities. Full-scale digital transformation to cloud platforms with AI/ML automation. Duke University's Triangle Fiber Project provides free Wi-Fi to public housing communities.",
        initiatives: ["Innovate Durham Startups", "Digital Transformation", "Triangle Fiber Project", "Smart Waste (MyMatR)", "AI Cybersecurity", "Vision Zero"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 200, smartLighting: true, smartTraffic: true },
        partners: ["Duke University", "MCNC", "Research Triangle Foundation", "IBM", "SAS Institute", "Durham County"],
        highlights: "#5 Digital Cities Survey 2024; Innovate Durham startup testbed; Duke fiber providing free Wi-Fi to public housing.",
        website: "https://www.durhamnc.gov/3732/City-of-Durham-and-Technology-Solutions"
    },
    {
        name: "Jacksonville", state: "FL", lat: 30.3322, lng: -81.6557, population: 949611,
        program: "Jacksonville Smart City / JTA AV", status: "Active", startYear: 2018, budget: 15000000,
        description: "Largest US city by area focusing on autonomous transit through JTA (Jacksonville Transportation Authority), smart traffic management for extensive road networks, and flood/environmental monitoring for river and coastal resilience. Expanding fiber infrastructure and 5G connectivity for growing IoT deployments.",
        initiatives: ["Autonomous Vehicles", "Smart Traffic Management", "Flood Monitoring", "Connected Transit", "Smart Streetlights", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: true },
        partners: ["JTA", "Beep Inc.", "University of North Florida", "JEA", "AT&T", "Jabil"],
        highlights: "Largest US city by area deploying autonomous transit via JTA; extensive flood monitoring IoT for river and coastal resilience.",
        website: "https://www.coj.net/departments/it"
    }

];

/* ═══════════════════════════════════════════════════════════
 * Smart City Decision Makers & System Integrators
 * Key contacts for 5G/broadband/smart city initiatives.
 * Sources: City government directories, LinkedIn, public RFP documents.
 * ═══════════════════════════════════════════════════════════ */
(function() {
    var contacts = {
        "Columbus": { decisionMaker: { name: "Sam Orth", title: "Chief Innovation Officer, City of Columbus", email: "saorth@columbus.gov", phone: "(614) 645-7671" }, systemIntegrators: ["Accenture", "Booz Allen Hamilton", "Battelle"] },
        "Kansas City": { decisionMaker: { name: "Bob Bennett", title: "Chief Innovation Officer, KC Office of Innovation", email: "bob.bennett@kcmo.org", phone: "(816) 513-3800" }, systemIntegrators: ["Cisco Systems", "Black & Veatch", "Burns & McDonnell"] },
        "Las Vegas": { decisionMaker: { name: "Michael Sherwood", title: "Chief Innovation Officer, City of Las Vegas", email: "msherwood@lasvegasnevada.gov", phone: "(702) 229-6301" }, systemIntegrators: ["NTT Ltd.", "Celona", "Dell Technologies"] },
        "San Diego": { decisionMaker: { name: "Jonathan Behnke", title: "Chief Information Officer, City of San Diego", email: "jbehnke@sandiego.gov", phone: "(619) 236-5900" }, systemIntegrators: ["GE Current", "Ubicquia", "Intel"] },
        "Pittsburgh": { decisionMaker: { name: "Heidi Norman", title: "Director of Innovation & Performance, City of Pittsburgh", email: "heidi.norman@pittsburghpa.gov", phone: "(412) 255-2626" }, systemIntegrators: ["Carnegie Mellon Metro21", "Rapid Flow Technologies", "Crown Castle"] },
        "Austin": { decisionMaker: { name: "Ted Lehr", title: "Chief Information Officer, City of Austin", email: "ted.lehr@austintexas.gov", phone: "(512) 974-7400" }, systemIntegrators: ["Samsung Austin Semiconductor", "Dell Technologies", "SiFi Networks"] },
        "Denver": { decisionMaker: { name: "Scotty Martin", title: "Chief Information Officer, City of Denver", email: "scotty.martin@denvergov.org", phone: "(720) 913-1311" }, systemIntegrators: ["Lumen Technologies", "Ericsson", "Dish Wireless"] },
        "Charlotte": { decisionMaker: { name: "Phil Reiger", title: "Chief Information & Technology Officer, City of Charlotte", email: "preiger@charlottenc.gov", phone: "(704) 336-2000" }, systemIntegrators: ["Deloitte", "Siemens", "Duke Energy"] },
        "Portland": { decisionMaker: { name: "Dyami Valentine", title: "Chief Technology Officer, City of Portland", email: "dyami.valentine@portlandoregon.gov", phone: "(503) 823-5199" }, systemIntegrators: ["Maximo (IBM)", "Iteris", "Lumen Technologies"] },
        "Nashville": { decisionMaker: { name: "Keith Durbin", title: "Chief Information Officer, Metropolitan Nashville", email: "keith.durbin@nashville.gov", phone: "(615) 862-6222" }, systemIntegrators: ["AT&T", "Google Fiber", "NEC Corporation"] },
        "Atlanta": { decisionMaker: { name: "Gary Brantley", title: "Chief Information Officer, City of Atlanta", email: "gbrantley@atlantaga.gov", phone: "(404) 330-6000" }, systemIntegrators: ["Cisco", "IBM", "Motorola Solutions"] },
        "Dallas": { decisionMaker: { name: "Bill Zielinski", title: "Chief Information Officer, City of Dallas", email: "bill.zielinski@dallas.gov", phone: "(214) 670-3111" }, systemIntegrators: ["AT&T", "Samsung", "Ericsson"] },
        "San Jose": { decisionMaker: { name: "Khaled Tawfik", title: "Chief Information Officer, City of San Jose", email: "khaled.tawfik@sanjoseca.gov", phone: "(408) 535-3500" }, systemIntegrators: ["Cisco Meraki", "Itron", "Sensity Systems"] },
        "Detroit": { decisionMaker: { name: "Beth Niblock", title: "Chief Information Officer, City of Detroit", email: "niblockb@detroitmi.gov", phone: "(313) 224-3400" }, systemIntegrators: ["Rocket Fiber", "Cisco", "General Motors"] },
        "Phoenix": { decisionMaker: { name: "Diana Dávila", title: "Chief Information Officer, City of Phoenix", email: "diana.davila@phoenix.gov", phone: "(602) 262-7176" }, systemIntegrators: ["Intel", "TSMC", "Cox Communications"] },
        "Tucson": { decisionMaker: { name: "Collin Boyce", title: "Chief Information Officer, City of Tucson", email: "collin.boyce@tucsonaz.gov", phone: "(520) 791-4505" }, systemIntegrators: ["JMA Wireless", "Geoverse", "Raytheon"] },
        "Salt Lake City": { decisionMaker: { name: "Aaron Wiethe", title: "Chief Information Officer, Salt Lake City", email: "aaron.wiethe@slcgov.com", phone: "(801) 535-6333" }, systemIntegrators: ["University of Utah / POWDER", "Vivint", "UTOPIA Fiber"] },
        "Lincoln": { decisionMaker: { name: "Clint Runge", title: "Director of Innovation, City of Lincoln", email: "crunge@lincoln.ne.gov", phone: "(402) 441-7491" }, systemIntegrators: ["Allo Communications", "NRC / UNL", "Nebraska Innovation Campus"] },
        "Chattanooga": { decisionMaker: { name: "Brent Messer", title: "VP Strategic Research, EPB Fiber Optics", email: "bmesser@epb.net", phone: "(423) 648-1372" }, systemIntegrators: ["EPB", "Open Connectivity Foundation", "SiFi Networks"] },
        "Huntsville": { decisionMaker: { name: "Gary Whitlow", title: "Director of IT, City of Huntsville", email: "gary.whitlow@huntsvilleal.gov", phone: "(256) 427-5000" }, systemIntegrators: ["SAIC", "Northrop Grumman", "Dynetics/Leidos"] }
    };

    SN.data.smartCities.forEach(function(city) {
        var info = contacts[city.name];
        if (info) {
            city.decisionMaker = info.decisionMaker;
            city.systemIntegrators = info.systemIntegrators;
        }
    });
})();
