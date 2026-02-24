/**
 * Spectral Nexus — Smart Cities Dataset
 * US cities with active smart city programs, infrastructure, and budgets.
 * Compiled from public sources, city government reports, and Smart Cities Council data.
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.smartCities = [
    {
        name: "Columbus", state: "OH", lat: 39.9612, lng: -82.9988, population: 905748,
        program: "Smart Columbus", status: "Active", startYear: 2016, budget: 140000000,
        description: "Won $40M DOT Smart City Challenge. Deployed connected vehicles, smart mobility hubs, and multimodal trip planning across the metro.",
        initiatives: ["Connected Vehicles", "Smart Mobility Hubs", "Multimodal Trip Planning", "EV Charging Network", "Data Analytics Platform"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 5200, smartLighting: true, smartTraffic: true },
        partners: ["US DOT", "Vulcan Inc.", "Honda", "OSURF"],
        highlights: "DOT Smart City Challenge winner. $140M invested. Model for public-private 5G partnership.",
        website: "https://smart.columbus.gov"
    },
    {
        name: "Kansas City", state: "MO", lat: 39.0997, lng: -94.5786, population: 508090,
        program: "KC Smart City", status: "Active", startYear: 2015, budget: 150000000,
        description: "Pioneer smart city with 50-block smart corridor featuring free public Wi-Fi, smart streetlights, and interactive kiosks along the streetcar line.",
        initiatives: ["Smart Corridor", "Digital Kiosks", "Smart Streetlights", "Open Data Platform", "Autonomous Vehicle Testing"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3800, smartLighting: true, smartTraffic: true },
        partners: ["Cisco", "Sprint/T-Mobile", "Google Fiber", "Black & Veatch"],
        highlights: "Google Fiber city. Smart corridor model. Strong enterprise 5G demand.",
        website: "https://www.kcmo.gov/city-hall/departments/city-manager-s-office/smart-city"
    },
    {
        name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611, population: 1381611,
        program: "Smart SD", status: "Active", startYear: 2017, budget: 30000000,
        description: "Deployed 4,200 intelligent streetlights with sensors for traffic, parking, and environmental monitoring. GE Current partnership.",
        initiatives: ["Intelligent Streetlights", "ShotSpotter Integration", "Smart Parking", "Environmental Sensors", "Traffic Analytics"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 4200, smartLighting: true, smartTraffic: true },
        partners: ["GE Current", "AT&T", "Qualcomm", "UC San Diego"],
        highlights: "Largest municipal IoT streetlight deployment. 4,200 smart nodes. Qualcomm hometown.",
        website: "https://www.sandiego.gov/sustainability/smart-city"
    },
    {
        name: "Pittsburgh", state: "PA", lat: 40.4406, lng: -79.9959, population: 302971,
        program: "Pittsburgh Smart City", status: "Active", startYear: 2015, budget: 70000000,
        description: "Leading autonomous vehicle testing market. Adaptive traffic signals reduced travel time 25%. Carnegie Mellon AI research hub.",
        initiatives: ["Autonomous Vehicles", "Adaptive Traffic Signals", "Air Quality Monitoring", "Smart Infrastructure", "Robotics Corridor"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2800, smartLighting: true, smartTraffic: true },
        partners: ["Carnegie Mellon", "Uber ATG/Aurora", "Argo AI", "Rapid Flow Technologies"],
        highlights: "AV capital of the US. Surtrac adaptive signals saved 25% travel time. CMU robotics hub.",
        website: "https://pittsburghpa.gov/innovation-performance/smart-city"
    },
    {
        name: "Austin", state: "TX", lat: 30.2672, lng: -97.7431, population: 961855,
        program: "Smart Austin", status: "Active", startYear: 2016, budget: 42000000,
        description: "Connected vehicle corridors, smart water management, and extensive open data platform. Google Fiber and AT&T Fiber market.",
        initiatives: ["Connected Vehicles", "Smart Water Mgmt", "Shared Mobility", "Open Data Portal", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3200, smartLighting: true, smartTraffic: true },
        partners: ["AT&T", "Google Fiber", "UT Austin", "Samsung"],
        highlights: "Samsung $17B fab. Major tech employer growth. Fiber-rich market for 5G overlay.",
        website: "https://www.austintexas.gov/department/smart-city"
    },
    {
        name: "Chattanooga", state: "TN", lat: 35.0456, lng: -85.3097, population: 181099,
        program: "Gig City", status: "Active", startYear: 2010, budget: 330000000,
        description: "First US city with 10 Gbps municipal fiber. EPB smart grid powers 180K+ homes. Model for municipal broadband nationwide.",
        initiatives: ["10 Gbps Municipal Fiber", "Smart Grid", "Smart Streetlights", "Innovation District", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 1500, smartLighting: true, smartTraffic: true },
        partners: ["EPB", "Siemens", "UTC", "Co.Lab"],
        highlights: "First 10 Gbps city. EPB municipal fiber model. $330M smart grid investment.",
        website: "https://epb.com"
    },
    {
        name: "New York City", state: "NY", lat: 40.7128, lng: -74.0060, population: 8336817,
        program: "NYC Smart City", status: "Active", startYear: 2015, budget: 500000000,
        description: "LinkNYC kiosks replacing payphones with free gigabit Wi-Fi. Midtown congestion pricing. Automated waste management.",
        initiatives: ["LinkNYC Kiosks", "Congestion Pricing", "Smart Waste Mgmt", "Building Energy Mgmt", "Flood Sensors"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 18000, smartLighting: true, smartTraffic: true },
        partners: ["Sidewalk Labs", "LinkNYC/Intersection", "IBM", "Verizon"],
        highlights: "Largest US market. 18K+ IoT sensors. LinkNYC 1,800+ kiosks. Massive enterprise demand.",
        website: "https://www1.nyc.gov/site/forward/innovations/smartnyc.page"
    },
    {
        name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, population: 2696555,
        program: "Array of Things", status: "Active", startYear: 2016, budget: 85000000,
        description: "Array of Things sensor network measuring air quality, traffic, noise across 500+ nodes. Major smart infrastructure investment.",
        initiatives: ["Array of Things", "Smart Lighting", "Predictive Analytics", "Smart Water", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 8500, smartLighting: true, smartTraffic: true },
        partners: ["Argonne National Lab", "UChicago", "Microsoft", "Motorola Solutions"],
        highlights: "Array of Things sensor network. 500+ environmental nodes. Major 5G enterprise market.",
        website: "https://www.chicago.gov/city/en/progs/digital.html"
    },
    {
        name: "Boston", state: "MA", lat: 42.3601, lng: -71.0589, population: 675647,
        program: "Boston Smart City", status: "Active", startYear: 2015, budget: 60000000,
        description: "New Urban Mechanics innovation lab. Smart street sweeping, snow emergency alerts, and citizen engagement platform.",
        initiatives: ["New Urban Mechanics", "Smart Snow Response", "Autonomous Shuttles", "Climate Resilience", "Civic Tech"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3500, smartLighting: true, smartTraffic: true },
        partners: ["MIT", "Harvard", "Verizon", "GE"],
        highlights: "MIT/Harvard innovation corridor. Healthcare campus networks. Strong CBRS demand.",
        website: "https://www.boston.gov/innovation-and-technology"
    },
    {
        name: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321, population: 737015,
        program: "Seattle Smart City", status: "Active", startYear: 2016, budget: 55000000,
        description: "Amazon HQ driving smart logistics. Smart traffic with SDOT. Extensive fiber backbone from CenturyLink/Lumen heritage.",
        initiatives: ["Smart Traffic", "Connected Freight", "Digital Equity", "Smart Buildings", "Climate Dashboard"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2800, smartLighting: true, smartTraffic: true },
        partners: ["Amazon", "Microsoft", "T-Mobile", "UW"],
        highlights: "Amazon/Microsoft HQ market. T-Mobile HQ. Massive tech campus connectivity demand.",
        website: "https://www.seattle.gov/tech/initiatives/privacy/smart-city"
    },
    {
        name: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194, population: 873965,
        program: "SF Smart City", status: "Active", startYear: 2014, budget: 75000000,
        description: "Smart parking (SFpark), connected transit (Muni), and extensive IoT deployment. Tech industry headquarters.",
        initiatives: ["SFpark Smart Parking", "Connected Transit", "Smart Water", "Climate Action", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 4100, smartLighting: true, smartTraffic: true },
        partners: ["Cisco", "Salesforce", "PG&E", "UCSF"],
        highlights: "Densest tech ecosystem in US. SFpark model. Navy exclusion limits CBRS near coast.",
        website: "https://sfgov.org/dt"
    },
    {
        name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, population: 3898747,
        program: "LA Smart City", status: "Active", startYear: 2016, budget: 120000000,
        description: "Olympic 2028 smart infrastructure. Smart streetlights, autonomous transit pilots, and LA Metro connected corridors.",
        initiatives: ["Olympic 2028 Infrastructure", "Smart Streetlights", "Autonomous Transit", "Connected Corridors", "Smart Water"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 9200, smartLighting: true, smartTraffic: true },
        partners: ["LA Metro", "SpaceX", "Hyperion Water", "USC"],
        highlights: "2028 Olympics driving massive smart infrastructure build. Port of LA private 5G.",
        website: "https://ita.lacity.org"
    },
    {
        name: "Washington", state: "DC", lat: 38.9072, lng: -77.0369, population: 689545,
        program: "DC Smart City", status: "Active", startYear: 2015, budget: 65000000,
        description: "Federal campus connectivity, smart traffic management, and extensive public safety sensor network.",
        initiatives: ["Federal Campus Connectivity", "Smart Traffic", "Public Safety Sensors", "Smart Lighting", "Climate Resilience"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 4800, smartLighting: true, smartTraffic: true },
        partners: ["GSA", "AWS GovCloud", "Verizon", "Georgetown U"],
        highlights: "Federal government market. Highest per-capita 5G enterprise demand. SCIF networks.",
        website: "https://octo.dc.gov"
    },
    {
        name: "Denver", state: "CO", lat: 39.7392, lng: -104.9903, population: 715522,
        program: "Denver Smart City", status: "Active", startYear: 2016, budget: 35000000,
        description: "Smart intersections, connected transit (RTD), and altitude-tested IoT sensors. Growing tech hub.",
        initiatives: ["Smart Intersections", "Connected Transit", "Smart Parking", "Air Quality", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 2200, smartLighting: true, smartTraffic: true },
        partners: ["Panasonic CityNOW", "RTD", "Xcel Energy", "CU Boulder"],
        highlights: "Panasonic CityNOW smart corridor at Pena Station. Growing data center market.",
        website: "https://www.denvergov.org/smartcity"
    },
    {
        name: "Atlanta", state: "GA", lat: 33.7490, lng: -84.3880, population: 498715,
        program: "Smart ATL", status: "Active", startYear: 2016, budget: 48000000,
        description: "Smart corridors, connected signals, and North Avenue Smart Corridor pilot. Major logistics and Delta hub.",
        initiatives: ["North Ave Smart Corridor", "Connected Signals", "Smart Parking", "Airport Innovation", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2600, smartLighting: true, smartTraffic: true },
        partners: ["Georgia Tech", "AT&T", "Delta", "Cisco"],
        highlights: "World's busiest airport. Georgia Tech R&D partnership. North Ave smart corridor model.",
        website: "https://smartatl.com"
    },
    {
        name: "Charlotte", state: "NC", lat: 35.2271, lng: -80.8431, population: 874579,
        program: "Charlotte Smart City", status: "Active", startYear: 2017, budget: 37000000,
        description: "Envision Charlotte sustainability platform. Smart buildings, EV infrastructure, and financial district connectivity.",
        initiatives: ["Envision Charlotte", "Smart Buildings", "EV Infrastructure", "Connected Transit", "Smart Grid"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1800, smartLighting: true, smartTraffic: true },
        partners: ["Duke Energy", "Bank of America", "Honeywell", "UNCC"],
        highlights: "2nd largest US banking center. Envision Charlotte corporate partnership model.",
        website: "https://charlottenc.gov/innovation"
    },
    {
        name: "Nashville", state: "TN", lat: 36.1627, lng: -86.7816, population: 689447,
        program: "Nashville Smart City", status: "Active", startYear: 2017, budget: 32000000,
        description: "WeGo transit connectivity, smart traffic management, and healthcare corridor innovation.",
        initiatives: ["Connected Transit", "Smart Traffic", "Healthcare IoT", "Smart Parking", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1500, smartLighting: true, smartTraffic: true },
        partners: ["Vanderbilt", "Google", "NES", "WeGo Transit"],
        highlights: "Healthcare capital. Vanderbilt Medical Center 5G network. Fast-growing tech market.",
        website: "https://www.nashville.gov/departments/information-technology-services"
    },
    {
        name: "Miami", state: "FL", lat: 25.7617, lng: -80.1918, population: 442241,
        program: "Miami Smart City", status: "Active", startYear: 2018, budget: 25000000,
        description: "Climate resilience focus. Smart flood sensors, connected port operations, and crypto/tech hub expansion.",
        initiatives: ["Flood Sensors", "Connected Port", "Smart Traffic", "Climate Dashboard", "Digital Government"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1200, smartLighting: true, smartTraffic: true },
        partners: ["FPL", "PortMiami", "FIU", "Microsoft"],
        highlights: "PortMiami smart port operations. Climate resilience technology. Growing tech hub.",
        website: "https://www.miamigov.com/Government/Departments-Organizations/Information-Technology"
    },
    {
        name: "Detroit", state: "MI", lat: 42.3314, lng: -83.0458, population: 639111,
        program: "Detroit Smart City", status: "Active", startYear: 2017, budget: 40000000,
        description: "Michigan Central campus by Ford. Autonomous vehicle testing corridor. Smart streetlights citywide.",
        initiatives: ["Michigan Central Campus", "AV Testing", "Smart Streetlights", "Connected Vehicles", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2200, smartLighting: true, smartTraffic: true },
        partners: ["Ford", "Google", "Newlab", "Wayne State"],
        highlights: "Ford Michigan Central smart campus. Auto industry 5G/V2X testing. Industry 4.0 hub.",
        website: "https://detroitmi.gov/departments/department-innovation-and-technology"
    },
    {
        name: "Philadelphia", state: "PA", lat: 39.9526, lng: -75.1652, population: 1603797,
        program: "SmartCityPHL", status: "Active", startYear: 2015, budget: 45000000,
        description: "Smart traffic signals, connected infrastructure monitoring, and extensive digital equity programs.",
        initiatives: ["Smart Traffic", "Infrastructure Monitoring", "Digital Equity", "Smart Lighting", "Open Data"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3200, smartLighting: true, smartTraffic: true },
        partners: ["Comcast", "Drexel", "UPenn", "SEPTA"],
        highlights: "Comcast HQ market. Major university corridor. Port + pharma campus demand.",
        website: "https://www.phila.gov/programs/smartcityphl"
    },
    {
        name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, population: 2304580,
        program: "Houston Smart City", status: "Active", startYear: 2017, budget: 55000000,
        description: "Flood early warning system, energy grid optimization, and NASA/JSC connected campus. Port Houston smart logistics.",
        initiatives: ["Flood Warning System", "Smart Grid", "Connected Port", "NASA Campus", "Smart Traffic"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3800, smartLighting: true, smartTraffic: true },
        partners: ["NASA/JSC", "Shell", "CenterPoint Energy", "Rice University"],
        highlights: "Energy capital. NASA JSC campus. Port Houston smart logistics. Massive industrial 5G demand.",
        website: "https://www.houstontx.gov/smartcity"
    },
    {
        name: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970, population: 1304379,
        program: "Dallas Innovation District", status: "Active", startYear: 2018, budget: 40000000,
        description: "Innovation district smart infrastructure, AT&T Discovery District, and connected corridor pilots.",
        initiatives: ["Innovation District", "AT&T Discovery District", "Smart Traffic", "Connected Transit", "Smart Buildings"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2400, smartLighting: true, smartTraffic: true },
        partners: ["AT&T", "Toyota NA HQ", "UT Dallas", "TxDOT"],
        highlights: "AT&T HQ. Toyota NA HQ. Data center corridor. Major telecom enterprise market.",
        website: "https://dfreinc.org"
    },
    {
        name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.0740, population: 1608139,
        program: "Phoenix Smart City", status: "Active", startYear: 2018, budget: 28000000,
        description: "Waymo autonomous ride-hailing. Smart water management for desert sustainability. TSMC semiconductor campus.",
        initiatives: ["Autonomous Vehicles", "Smart Water", "Smart Grid", "Connected Transit", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1800, smartLighting: true, smartTraffic: true },
        partners: ["Waymo", "Intel", "TSMC", "ASU"],
        highlights: "Waymo AV operations. TSMC $40B fab campus. Intel Chandler. Semiconductor corridor.",
        website: "https://www.phoenix.gov/itssite"
    },
    {
        name: "Minneapolis", state: "MN", lat: 44.9778, lng: -93.2650, population: 429954,
        program: "Minneapolis Smart City", status: "Active", startYear: 2017, budget: 22000000,
        description: "Connected streetlights, smart transit (Metro Transit), and cold-weather infrastructure monitoring.",
        initiatives: ["Connected Streetlights", "Smart Transit", "Infrastructure Monitoring", "Digital Equity", "Climate Dashboard"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1400, smartLighting: true, smartTraffic: true },
        partners: ["US Ignite", "3M", "UnitedHealth", "Target"],
        highlights: "Major healthcare/retail HQ market. 3M and Target headquarters. Cold-weather IoT testing.",
        website: "https://www.minneapolismn.gov/government/programs-initiatives/smart-city"
    },
    {
        name: "Tampa", state: "FL", lat: 27.9506, lng: -82.4572, population: 384959,
        program: "Tampa Smart City", status: "Active", startYear: 2017, budget: 18000000,
        description: "THEA connected vehicle pilot. Smart intersections on Hillsborough Ave. Port Tampa Bay automation.",
        initiatives: ["Connected Vehicle Pilot", "Smart Intersections", "Port Automation", "Smart Parking", "Flood Monitoring"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1200, smartLighting: true, smartTraffic: true },
        partners: ["THEA", "Siemens", "USF", "Port Tampa Bay"],
        highlights: "USDOT connected vehicle pilot winner. THEA smart corridor. Port automation opportunity.",
        website: "https://www.tampagov.net/smart-city"
    },
    {
        name: "Raleigh", state: "NC", lat: 35.7796, lng: -78.6382, population: 467665,
        program: "Raleigh Smart City", status: "Active", startYear: 2018, budget: 20000000,
        description: "Research Triangle smart corridor. Connected infrastructure with NCSU partnership. Growing biotech campus networks.",
        initiatives: ["Smart Corridor", "Connected Infrastructure", "Smart Parking", "Environmental Monitoring", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 1600, smartLighting: true, smartTraffic: true },
        partners: ["NCSU", "SAS", "Cisco", "Red Hat/IBM"],
        highlights: "Research Triangle. NCSU partnership. Red Hat/IBM HQ. Biotech corridor growth.",
        website: "https://raleighnc.gov/smart-city"
    },
    {
        name: "Portland", state: "OR", lat: 45.5152, lng: -122.6784, population: 652503,
        program: "Smart Portland", status: "Active", startYear: 2016, budget: 25000000,
        description: "Connected transit (TriMet), smart water management, and urban sensor network. Privacy-first approach.",
        initiatives: ["Connected Transit", "Smart Water", "Urban Sensors", "Climate Dashboard", "Privacy Framework"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1800, smartLighting: true, smartTraffic: true },
        partners: ["TriMet", "Intel", "PSU", "Portland General Electric"],
        highlights: "Intel Oregon campus nearby. Privacy-first smart city model. Growing tech hub.",
        website: "https://www.portlandoregon.gov/bts"
    },
    {
        name: "San Jose", state: "CA", lat: 37.3382, lng: -121.8863, population: 1013240,
        program: "San Jose Smart City Vision", status: "Active", startYear: 2016, budget: 45000000,
        description: "Silicon Valley capital. Smart traffic, connected water management, and Google Downtown West mega-project.",
        initiatives: ["Smart Traffic", "Connected Water", "Google Downtown West", "Digital Equity", "Smart Buildings"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 3000, smartLighting: true, smartTraffic: true },
        partners: ["Google", "Adobe", "Cisco", "SJSU"],
        highlights: "Silicon Valley HQ city. Google Downtown West project. Cisco and Adobe HQ.",
        website: "https://www.sanjoseca.gov/your-government/departments-offices/information-technology/smart-city"
    },
    {
        name: "Las Vegas", state: "NV", lat: 36.1699, lng: -115.1398, population: 641903,
        program: "Vegas Smart City", status: "Active", startYear: 2017, budget: 35000000,
        description: "Innovation District downtown. Smart traffic on Las Vegas Blvd. Autonomous shuttle pilot. Major venue connectivity.",
        initiatives: ["Innovation District", "Smart Traffic", "Autonomous Shuttles", "Venue Connectivity", "Public Safety"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 2400, smartLighting: true, smartTraffic: true },
        partners: ["NTT", "Cisco", "AAA/Keolis", "UNLV"],
        highlights: "Convention/entertainment venue private 5G demand. NTT partnership. Innovation District.",
        website: "https://www.lasvegasnevada.gov/Government/Smart-City"
    },
    {
        name: "Orlando", state: "FL", lat: 28.5383, lng: -81.3792, population: 307573,
        program: "Orlando Future-Ready City", status: "Active", startYear: 2018, budget: 16000000,
        description: "LYNX autonomous transit pilot, smart traffic signals, and theme park technology corridor.",
        initiatives: ["Autonomous Transit", "Smart Traffic", "Theme Park Tech", "Smart Lighting", "Connected Parking"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1100, smartLighting: true, smartTraffic: true },
        partners: ["Disney", "Universal", "UCF", "Siemens"],
        highlights: "Theme park technology corridor. Disney/Universal venue networks. Tourism tech hub.",
        website: "https://www.orlando.gov/Initiatives/Future-Ready-City"
    },
    {
        name: "Louisville", state: "KY", lat: 38.2527, lng: -85.7585, population: 633045,
        program: "Louisville Smart City", status: "Active", startYear: 2016, budget: 15000000,
        description: "Air quality sensor network (IoT Louisville). Smart waste management. UPS Worldport hub logistics.",
        initiatives: ["Air Quality Network", "Smart Waste", "Connected Logistics", "Smart Traffic", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["UPS", "GE Appliances", "UofL", "LG&E"],
        highlights: "UPS Worldport hub. Air quality IoT pioneer. Emerging 5G logistics demand.",
        website: "https://louisvilleky.gov/government/civic-innovation"
    },
    {
        name: "Sacramento", state: "CA", lat: 38.5816, lng: -121.4944, population: 524943,
        program: "Sacramento Smart City", status: "Pilot", startYear: 2019, budget: 12000000,
        description: "Autonomous shuttle downtown pilot. Smart parking and connected transit. State government campus connectivity.",
        initiatives: ["Autonomous Shuttle", "Smart Parking", "Connected Transit", "Smart Grid", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 900, smartLighting: true, smartTraffic: true },
        partners: ["SMUD", "SacRT", "UC Davis Health", "Verizon"],
        highlights: "State capital campus demand. SMUD smart grid. UC Davis Medical Center.",
        website: "https://www.cityofsacramento.org"
    },
    {
        name: "Salt Lake City", state: "UT", lat: 40.7608, lng: -111.8910, population: 199723,
        program: "SLC Smart City", status: "Active", startYear: 2018, budget: 18000000,
        description: "Smart transit (UTA FrontRunner), air quality monitoring, and tech corridor growth. NSA Utah Data Center area.",
        initiatives: ["Smart Transit", "Air Quality", "Smart Traffic", "Connected Infrastructure", "Tech Corridor"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 1000, smartLighting: true, smartTraffic: true },
        partners: ["UTA", "University of Utah", "Overstock", "Rocky Mountain Power"],
        highlights: "Silicon Slopes tech hub. NSA data center proximity. Growing enterprise demand.",
        website: "https://www.slc.gov/sustainability"
    },
    {
        name: "Durham", state: "NC", lat: 35.9940, lng: -78.8986, population: 283506,
        program: "Durham Smart City", status: "Pilot", startYear: 2019, budget: 10000000,
        description: "Research Triangle biotech campus connectivity. Smart traffic on major corridors. Duke University partnership.",
        initiatives: ["Smart Traffic", "Biotech Campus", "Connected Transit", "Smart Lighting", "Open Data"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 700, smartLighting: true, smartTraffic: false },
        partners: ["Duke University", "IBM/Red Hat", "IQVIA", "RTI International"],
        highlights: "Research Triangle biotech/pharma campus networks. Duke Medical Center 5G opportunity.",
        website: "https://durhamnc.gov/3329/Smart-City-Initiatives"
    },
    {
        name: "Jacksonville", state: "FL", lat: 30.3322, lng: -81.6557, population: 949611,
        program: "Jax Smart City", status: "Pilot", startYear: 2019, budget: 12000000,
        description: "Smart water management, connected port operations (JAXPORT), and military base connectivity.",
        initiatives: ["Smart Water", "Connected Port", "Smart Traffic", "Military Base Connectivity", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["JAXPORT", "JEA", "UNF", "Naval Station Mayport"],
        highlights: "JAXPORT smart port. Naval Station Mayport. Major military 5G opportunity.",
        website: "https://www.coj.net/departments/information-technologies"
    },
    {
        name: "Madison", state: "WI", lat: 43.0731, lng: -89.4012, population: 269840,
        program: "Madison Smart City", status: "Pilot", startYear: 2019, budget: 8000000,
        description: "UW-Madison campus connectivity, smart bus rapid transit, and sustainability-focused IoT deployment.",
        initiatives: ["Smart Transit", "Campus Connectivity", "Environmental Monitoring", "Smart Parking", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 500, smartLighting: true, smartTraffic: true },
        partners: ["UW-Madison", "Epic Systems", "Madison Metro", "WPS"],
        highlights: "UW-Madison campus network demand. Epic Systems healthcare tech. Emerging market.",
        website: "https://www.cityofmadison.com/information-technology"
    },
    {
        name: "Lexington", state: "KY", lat: 38.0406, lng: -84.5037, population: 322570,
        program: "Lexington Smart City", status: "Pilot", startYear: 2020, budget: 6000000,
        description: "UK campus connectivity pilot. Smart traffic on major corridors. Horse industry tech applications.",
        initiatives: ["Campus Connectivity", "Smart Traffic", "Ag Tech", "Smart Lighting", "Digital Equity"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: false },
        partners: ["University of Kentucky", "Lexmark", "Toyota Georgetown", "KU"],
        highlights: "Toyota Georgetown plant nearby. UK campus demand. Emerging market for private 5G.",
        website: "https://www.lexingtonky.gov"
    },
    {
        name: "Lincoln", state: "NE", lat: 40.8136, lng: -96.7026, population: 291082,
        program: "Lincoln Smart City", status: "Pilot", startYear: 2020, budget: 5000000,
        description: "UNL campus pilot. Smart water and sewer monitoring. Agricultural IoT research corridor.",
        initiatives: ["Campus Connectivity", "Smart Water/Sewer", "Ag IoT Research", "Smart Traffic", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 300, smartLighting: true, smartTraffic: false },
        partners: ["University of Nebraska", "Nelnet", "LES", "StarTran"],
        highlights: "Agricultural IoT research market. UNL campus network opportunity. Emerging demand.",
        website: "https://www.lincoln.ne.gov"
    },
    {
        name: "Honolulu", state: "HI", lat: 21.3069, lng: -157.8583, population: 350964,
        program: "Smart Honolulu", status: "Pilot", startYear: 2019, budget: 10000000,
        description: "Smart transit (HART rail), tourism corridor connectivity, and military base smart infrastructure.",
        initiatives: ["HART Rail Integration", "Tourism Connectivity", "Military Base Tech", "Climate Resilience", "Smart Energy"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: false, iotSensors: 600, smartLighting: true, smartTraffic: true },
        partners: ["Hawaiian Electric", "HART", "UH", "PACOM"],
        highlights: "Pacific Command HQ. Military 5G priority. Tourism venue connectivity demand.",
        website: "https://www.honolulu.gov/it"
    },
    {
        name: "Tucson", state: "AZ", lat: 32.2226, lng: -110.9747, population: 542629,
        program: "Tucson Smart City", status: "Pilot", startYear: 2020, budget: 7000000,
        description: "Raytheon/defense manufacturing corridor connectivity. UA campus pilot. Smart water for desert management.",
        initiatives: ["Defense Campus Connectivity", "Smart Water", "Campus Network", "Smart Traffic", "Solar Integration"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: false, cbrsActive: false, iotSensors: 400, smartLighting: true, smartTraffic: false },
        partners: ["Raytheon", "University of Arizona", "TEP", "Sun Tran"],
        highlights: "Raytheon defense manufacturing. UA campus. Emerging private 5G market for defense.",
        website: "https://www.tucsonaz.gov/information-technology"
    },
    {
        name: "Huntsville", state: "AL", lat: 34.7304, lng: -86.5861, population: 215006,
        program: "Smart Huntsville", status: "Active", startYear: 2018, budget: 15000000,
        description: "NASA Marshall / Redstone Arsenal smart infrastructure. Defense tech corridor with CBRS private network pilots.",
        initiatives: ["Defense Campus Connectivity", "NASA Smart Campus", "CBRS Pilot", "Smart Traffic", "Digital Inclusion"],
        infrastructure: { fiberBackbone: true, fiveGDeployed: true, cbrsActive: true, iotSensors: 800, smartLighting: true, smartTraffic: true },
        partners: ["NASA MSFC", "Redstone Arsenal", "ADTRAN", "UAH"],
        highlights: "Rocket City. NASA/Redstone defense corridor. ADTRAN HQ. Active CBRS deployments.",
        website: "https://www.huntsvilleal.gov"
    }
];
