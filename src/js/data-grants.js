/**
 * Spectral Nexus — Grant Programs Data
 * Federal, state, and regional broadband funding programs.
 * 
 * STATUS CODES: open | upcoming | closed | rolling
 * UPDATED: 2026-02-20
 * 
 * TODO v0.3.0: Add full state program details for all 10 states
 * TODO v0.3.0: Add grant stacking calculator logic
 * TODO v0.3.0: Add fundability score computation
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.grants = {
    federal: [
        { id: 'bead', name: 'BEAD Program', agency: 'NTIA', totalFunding: 42450000000, type: 'Infrastructure', statusCode: 'open', status: 'Open — 50/56 states approved, subgrant apps in progress', techReq: '100/20 Mbps, fiber priority', match: '25% typical', url: 'https://broadbandusa.ntia.gov/funding-programs/bead', keyDate: '2026-Q2 construction begins', notes: 'Largest broadband program in US history. Tech-neutral since June 2025.' },
        { id: 'erate', name: 'E-Rate (FY2026)', agency: 'FCC/USAC', totalFunding: 4500000000, type: 'Schools & Libraries', statusCode: 'open', status: 'OPEN NOW — Form 471 due Apr 1, 2026', techReq: 'Broadband + internal connections', match: '10-80% copay', url: 'https://www.usac.org/e-rate/', keyDate: '2026-04-01', notes: '$4.5B/year in discounts. Guaranteed recurring revenue for ISPs.' },
        { id: 'eacam', name: 'Enhanced A-CAM', agency: 'FCC', totalFunding: 19500000000, type: 'Carrier Subsidy', statusCode: 'closed', status: 'Active — 368 carriers building', techReq: '100/20 Mbps', match: 'N/A — monthly support', url: 'https://www.usac.org/high-cost/', keyDate: '2026-12-31 50% milestone', notes: 'Not open to new applicants. Creates "served" areas on map.' },
        { id: 'reconnect', name: 'USDA ReConnect (R6)', agency: 'USDA/RUS', totalFunding: 600000000, type: 'Rural Infrastructure', statusCode: 'upcoming', status: 'Upcoming — Round 6 expected 2026', techReq: '100/20 Mbps, ≥90% unserved', match: '25% grants / 0% loans', url: 'https://www.usda.gov/reconnect', keyDate: '2026-Q2 NOFO expected', notes: 'Max $25M per project. 5 rounds totaled $3.7B.' },
        { id: 'cpf', name: 'Capital Projects Fund', agency: 'Treasury', totalFunding: 10000000000, type: 'COVID Recovery', statusCode: 'open', status: 'Active — States disbursing', techReq: '100/20 Mbps preferred', match: 'Varies by state', url: 'https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/capital-projects-fund', keyDate: '2026-12-31 obligation deadline', notes: 'TX got $500.5M in CPF. Many states combining with BEAD.' },
        { id: 'de-capacity', name: 'Digital Equity Capacity', agency: 'NTIA', totalFunding: 1440000000, type: 'Digital Equity', statusCode: 'open', status: 'Active through FY2026', techReq: 'N/A — adoption-focused', match: '10%', url: 'https://broadbandusa.ntia.gov/funding-programs/digital-equity-act-programs', keyDate: 'FY2026', notes: 'Formula grants to states for digital inclusion.' },
        { id: 'de-competitive', name: 'Digital Equity Competitive', agency: 'NTIA', totalFunding: 1250000000, type: 'Digital Equity', statusCode: 'upcoming', status: 'Annual rounds through FY2026', techReq: 'N/A', match: 'Varies', url: 'https://broadbandusa.ntia.gov/funding-programs/digital-equity-act-programs', keyDate: 'TBD 2026', notes: 'Competitive grants for digital inclusion projects.' },
        { id: 'middle-mile', name: 'Enabling Middle Mile', agency: 'NTIA', totalFunding: 980000000, type: 'Middle Mile', statusCode: 'closed', status: 'Awarded — Construction underway', techReq: 'Fiber backbone', match: '30%', url: 'https://broadbandusa.ntia.gov/funding-programs/enabling-middle-mile-broadband-infrastructure-program', keyDate: '2026-2028 construction', notes: '$930M awarded across 35 states + PR. 370 counties affected.' },
        { id: 'tbcp', name: 'Tribal Broadband', agency: 'NTIA', totalFunding: 3000000000, type: 'Tribal', statusCode: 'upcoming', status: 'New NOFO expected Spring 2026', techReq: '100/20 Mbps for infrastructure', match: 'None', url: 'https://broadbandusa.ntia.gov/funding-programs/tribal-broadband-connectivity', keyDate: '2026-Q1 new NOFO', notes: '$1.86B awarded to 226 tribes. ~140K unserved Native households.' },
        { id: 'community-connect', name: 'Community Connect', agency: 'USDA/RUS', totalFunding: 26000000, type: 'Extreme Rural', statusCode: 'upcoming', status: 'FY2026 round expected', techReq: '25/3 Mbps min', match: '15%', url: 'https://www.usda.gov/reconnect', keyDate: 'TBD 2026', notes: 'For areas with zero broadband (<10/1 Mbps).' },
        { id: 'rural-health', name: 'Rural Health Care Program', agency: 'FCC/USAC', totalFunding: 600000000, type: 'Healthcare', statusCode: 'rolling', status: 'Rolling applications', techReq: 'Telehealth-grade', match: '35-65% copay', url: 'https://www.usac.org/rural-health-care/', keyDate: 'Rolling', notes: 'Like E-Rate for hospitals. ~$600M/year.' }
    ],

    state: {
        TX: [
            { id: 'boot-tx', name: 'Texas BOOT Program', totalFunding: 634800000, statusCode: 'open', status: 'Active — Awards being made', techReq: '100/20 Mbps', match: '20-50%', url: 'https://comptroller.texas.gov/programs/broadband/funding/boot/', notes: 'CPF ($500.5M) + BIF combined. Can stack with BEAD.' },
            { id: 'tmm-tx', name: 'Texas Middle Mile', totalFunding: 200000000, statusCode: 'open', status: 'Active', techReq: 'Open-access fiber', match: 'Varies', url: 'https://comptroller.texas.gov/programs/broadband/funding/', notes: 'Connects underserved areas to backbone.' },
            { id: 'pole-tx', name: 'TX Pole Replacement', totalFunding: 75000000, statusCode: 'open', status: 'Active', techReq: 'N/A', match: '50% reimburse, max $5K/pole', url: 'https://comptroller.texas.gov/programs/broadband/funding/', notes: 'Pole make-ready is the #1 bottleneck. This pays half.' },
            { id: 'workforce-tx', name: 'TX Workforce Training', totalFunding: 25000000, statusCode: 'open', status: 'Active', notes: 'Tuition-free fiber optic training programs.' }
        ],
        CA: [
            { id: 'mmbi-ca', name: 'CA Middle-Mile Initiative (SB 156)', totalFunding: 3250000000, statusCode: 'open', status: 'Construction underway', url: 'https://broadbandforall.cdt.ca.gov/middle-mile-broadband-initiative/', notes: 'Biggest state program in US. Statewide open-access fiber backbone.' },
            { id: 'casf-ca', name: 'CASF Infrastructure', totalFunding: 750000000, statusCode: 'open', status: 'Active', techReq: '100 Mbps min', url: 'https://www.cpuc.ca.gov/industries-and-topics/internet-and-phone/california-advanced-services-fund', notes: 'Credit enhancement — easier bank loans for fiber builds.' },
            { id: 'ffa-ca', name: 'CA Federal Funding Account', totalFunding: null, statusCode: 'open', status: 'Round 2 active', url: 'https://www.cpuc.ca.gov/broadbandfederalfunding/', notes: 'State-administered federal funds. Tableau dashboard published.' }
        ],
        VA: [{ id: 'vati-va', name: 'VATI', totalFunding: 120000000, statusCode: 'rolling', status: 'Annual rounds', techReq: '100/20 Mbps', url: 'https://www.dhcd.virginia.gov/vati', notes: 'Running since 2017. One of most established state programs.' }],
        LA: [{ id: 'gumbo-la', name: 'GUMBO Program', totalFunding: 176000000, statusCode: 'open', status: 'Active', url: 'https://connect.la.gov/', notes: 'Granting Unserved Municipalities Broadband Opportunities.' }],
        GA: [{ id: 'ga-broadband', name: 'GA Broadband Initiative', totalFunding: null, statusCode: 'open', url: 'https://gta.georgia.gov/broadband' }],
        MT: [{ id: 'connectmt', name: 'ConnectMT', totalFunding: 129000000, statusCode: 'open', url: 'https://connectmt.mt.gov/' }],
        IA: [{ id: 'ia-empower', name: 'Empower Rural Broadband', totalFunding: 150000000, statusCode: 'open', url: 'https://ocio.iowa.gov/broadband' }],
        SC: [{ id: 'sc-broadband', name: 'SC Broadband Office', totalFunding: 400000000, statusCode: 'open', url: 'https://ors.sc.gov/broadband' }],
        OH: [{ id: 'oh-broadband', name: 'BroadbandOhio', totalFunding: 700000000, statusCode: 'open', url: 'https://broadband.ohio.gov/' }],
        NM: [{ id: 'nm-match', name: 'NM Match Fund (HB 177)', totalFunding: 100000000, statusCode: 'open', notes: 'Matches federal grants — doubles your federal money.', url: 'https://www.dfa.nm.gov/' }]
    },

    regional: [
        { id: 'arc', name: 'Appalachian Regional Commission', totalFunding: 50000000, states: ['VA','OH','GA'], statusCode: 'rolling', notes: '423 counties in 13 states.' },
        { id: 'dra', name: 'Delta Regional Authority', totalFunding: null, states: ['LA'], statusCode: 'rolling', notes: '252 counties in 8 states.' }
    ]
};
