/**
 * Spectral Nexus — BEAD Subgrant Timeline Data
 * Per-state BEAD process milestones and competitive bid intelligence.
 *
 * Sources: NTIA BEAD program tracker, state broadband office websites (Feb 2026)
 * Phase codes: plan_approved | challenge_complete | subgrant_open | subgrant_closed | awards_made | construction
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

/* ═══════════════════════════════════════════════════════════
 * BEAD State-by-State Timeline
 * Each state's subgrant process runs on its own schedule
 * ═══════════════════════════════════════════════════════════ */
SN.data.beadTimeline = {
    TX: { allocation: 3312000000, phase: 'subgrant_open', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 22, notes: 'Largest allocation. 580K unserved locations. Fiber priority.' },
    CA: { allocation: 1864000000, phase: 'subgrant_open', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 18, notes: 'Coordinating with $3.25B Middle-Mile Initiative.' },
    VA: { allocation: 1481000000, phase: 'awards_made', planApproved: '2024-05', challengeComplete: '2025-01', subgrantOpen: '2025-04', subgrantClose: '2025-10', awardsExpected: '2025-12', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Early mover. Awards announced. Construction beginning.' },
    MO: { allocation: 1736000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 16, notes: 'Rural focus. 340K locations.' },
    MS: { allocation: 1203000000, phase: 'subgrant_open', planApproved: '2024-09', challengeComplete: '2025-05', subgrantOpen: '2025-10', subgrantClose: '2026-04', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 10, notes: 'Delta region priority. Low applicant count = less competition.' },
    WV: { allocation: 1210000000, phase: 'awards_made', planApproved: '2024-04', challengeComplete: '2024-12', subgrantOpen: '2025-03', subgrantClose: '2025-08', awardsExpected: '2025-11', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 8, notes: 'First state to make awards. Mountainous terrain challenges.' },
    NC: { allocation: 1533000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 19, notes: 'Eastern NC priority. Building on GREAT program.' },
    LA: { allocation: 1356000000, phase: 'challenge_complete', planApproved: '2024-08', challengeComplete: '2025-06', subgrantOpen: '2026-Q1', subgrantClose: '2026-Q3', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: null, notes: 'Subgrant NOFO pending. Building on GUMBO program.' },
    MI: { allocation: 1559000000, phase: 'subgrant_open', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 15, notes: 'Upper Peninsula + rural Lower Michigan.' },
    KY: { allocation: 1086000000, phase: 'subgrant_open', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 12, notes: 'Eastern KY coalfields priority.' },
    AL: { allocation: 1401000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 11, notes: 'Black Belt region focus.' },
    GA: { allocation: 1307000000, phase: 'challenge_complete', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-Q1', subgrantClose: '2026-Q3', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: null, notes: 'South Georgia + rural corridors.' },
    WI: { allocation: 1056000000, phase: 'subgrant_open', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 13, notes: 'Northern WI + dairy corridor.' },
    WA: { allocation: 1228000000, phase: 'awards_made', planApproved: '2024-05', challengeComplete: '2025-01', subgrantOpen: '2025-04', subgrantClose: '2025-09', awardsExpected: '2025-12', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 16, notes: 'Eastern WA + tribal lands.' },
    IN: { allocation: 868000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Southern Indiana rural focus.' },
    TN: { allocation: 813000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 10, notes: 'Appalachian corridor.' },
    MN: { allocation: 652000000, phase: 'subgrant_open', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-06', subgrantClose: '2026-01', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 11, notes: 'Northern MN + tribal areas.' },
    OH: { allocation: 700000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 17, notes: 'Appalachian SE Ohio focus. BroadbandOhio.' },
    SC: { allocation: 552000000, phase: 'challenge_complete', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-Q1', subgrantClose: '2026-Q3', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: null, notes: 'Rural Midlands and Pee Dee.' },
    OR: { allocation: 689000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 9, notes: 'Eastern Oregon rural.' },
    NM: { allocation: 675000000, phase: 'challenge_complete', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-Q1', subgrantClose: '2026-Q3', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: null, notes: 'Tribal lands + rural. HB 177 match fund doubles federal $.' },
    MT: { allocation: 629000000, phase: 'subgrant_open', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 7, notes: 'Vast rural territory. Low competition.' },
    ID: { allocation: 583000000, phase: 'subgrant_open', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 6, notes: 'Mountain communities. Very low competition.' },
    AK: { allocation: 1017000000, phase: 'challenge_complete', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-Q1', subgrantClose: '2026-Q3', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: null, notes: 'Satellite + fiber hybrid. Extreme terrain.' },
    IA: { allocation: 415000000, phase: 'subgrant_open', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-01', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Building on Empower Rural Broadband.' }
};

/* ═══════════════════════════════════════════════════════════
 * CBRS GAA Spectrum Intelligence
 * General Authorized Access data by metro area
 * Sources: SAS providers (Google, Federated Wireless, CommScope), FCC CBRS reports
 * ═══════════════════════════════════════════════════════════ */
SN.data.cbrsGAA = {
    'New York Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless', 'CommScope'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'High', avgUtilization: 72, note: 'Dense metro — GAA heavily utilized. Off-peak windows available.' },
    'Los Angeles Basin': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'High', avgUtilization: 68, note: 'Port of LA/Long Beach driving enterprise GAA usage.' },
    'Chicago Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless', 'CommScope'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Medium', avgUtilization: 55, note: 'Industrial corridor GAA underutilized — opportunity for FWA.' },
    'Houston/Gulf Coast': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Medium', avgUtilization: 48, note: 'Energy sector GAA adoption growing.' },
    'Dallas-Fort Worth': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Medium', avgUtilization: 52, note: 'Data center corridor GAA demand increasing.' },
    'San Francisco Bay Area': { gaaChannels: 4, gaaMaxPower: 20, sasProviders: ['Google SAS', 'Federated Wireless', 'CommScope'], incumbentType: 'Navy Radar', exclusionPct: 35, congestionLevel: 'High', avgUtilization: 78, note: 'Navy exclusion reduces channels near coast. Inland areas open.' },
    'Washington DC Metro': { gaaChannels: 5, gaaMaxPower: 20, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'Navy/Federal', exclusionPct: 25, congestionLevel: 'High', avgUtilization: 65, note: 'Partial federal exclusion. Pentagon/Andrews area restricted.' },
    'Boston Metro': { gaaChannels: 5, gaaMaxPower: 20, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'Navy', exclusionPct: 30, congestionLevel: 'Medium', avgUtilization: 50, note: 'Naval exclusion near harbor. University campuses use GAA.' },
    'Atlanta Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 38, note: 'Low GAA congestion — strong opportunity for new deployments.' },
    'Seattle/Puget Sound': { gaaChannels: 4, gaaMaxPower: 20, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'Navy', exclusionPct: 40, congestionLevel: 'Medium', avgUtilization: 45, note: 'Naval base Kitsap exclusion. Eastern suburbs open.' },
    'Phoenix Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 30, note: 'Wide open GAA. Semiconductor fab demand emerging.' },
    'Denver Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 28, note: 'Very low utilization — green field for private networks.' },
    'Detroit Metro': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 32, note: 'Auto manufacturing driving Industry 4.0 GAA adoption.' },
    'San Diego': { gaaChannels: 3, gaaMaxPower: 20, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'Navy (heavy)', exclusionPct: 55, congestionLevel: 'High', avgUtilization: 70, note: 'Heaviest Navy exclusion in US. Limited GAA near bases.' },
    'Miami/South Florida': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 35, note: 'Port/cruise terminal GAA opportunity.' },
    'Nashville': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 22, note: 'Nearly untouched GAA spectrum. Healthcare campus opportunity.' },
    'Raleigh-Durham': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 25, note: 'Research Triangle — biotech campus demand growing.' },
    'Austin TX': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 30, note: 'Tech hub. Samsung fab potential anchor.' },
    'Chattanooga TN': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 15, note: 'Municipal fiber backbone makes CBRS backhaul easy.' },
    'Huntsville AL': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 20, note: 'NASA/Redstone Arsenal — defense tech corridor.' },
    'Brownsville TX': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 12, note: 'Active private 5G on GAA. NTT DATA/Nokia deployment live.' },
    'Jacksonville FL': { gaaChannels: 5, gaaMaxPower: 20, sasProviders: ['Google SAS'], incumbentType: 'Navy', exclusionPct: 30, congestionLevel: 'Low', avgUtilization: 18, note: 'Naval Station Mayport exclusion. Inland areas open.' },
    'Las Vegas': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS', 'Federated Wireless'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Medium', avgUtilization: 42, note: 'Convention center private 5G demos driving adoption.' },
    'Kansas City': { gaaChannels: 8, gaaMaxPower: 30, sasProviders: ['Google SAS'], incumbentType: 'None', exclusionPct: 0, congestionLevel: 'Low', avgUtilization: 20, note: 'Smart city pioneer. Wide open GAA.' }
};

/* ═══════════════════════════════════════════════════════════
 * Competitive Bid Intelligence
 * Known BEAD subgrant applicants and bidding activity per state
 * Sources: State broadband office public filings, press releases
 * ═══════════════════════════════════════════════════════════ */
SN.data.competitiveBids = [
    // Texas
    { state: 'TX', program: 'BEAD Subgrant', region: 'East Texas', knownBidders: ['Suddenlink/Altice', 'Mid-South Synergy (co-op)', 'Eastex Telephone Co-op'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Co-op has strong local trust. Suddenlink expanding fiber.' },
    { state: 'TX', program: 'BEAD Subgrant', region: 'West Texas', knownBidders: ['Big Bend Telephone', 'Windstream'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Low competition — vast rural territory deters most bidders.' },
    { state: 'TX', program: 'BEAD Subgrant', region: 'Panhandle', knownBidders: ['PTCI', 'Windstream', 'Nextlink Internet'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'FWA and fiber competing. PTCI strong incumbent.' },
    { state: 'TX', program: 'TX BOOT', region: 'Rio Grande Valley', knownBidders: ['Spectrum', 'Valley Telephone Co-op', 'NTT DATA'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-06', notes: 'NTT DATA leveraging Brownsville private 5G success.' },

    // Virginia
    { state: 'VA', program: 'BEAD Subgrant', region: 'Southwest VA', knownBidders: ['Shentel', 'BARC Electric Co-op', 'Appalachian Power'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-10', notes: 'Awards made. Shentel won majority of SW Virginia.' },
    { state: 'VA', program: 'BEAD Subgrant', region: 'Southside VA', knownBidders: ['Shentel', 'Lumen', 'MFHC Electric Co-op'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-10', notes: 'Lumen competing with co-ops for remaining territory.' },

    // Mississippi
    { state: 'MS', program: 'BEAD Subgrant', region: 'Mississippi Delta', knownBidders: ['C Spire', 'Windstream'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-04', notes: 'C Spire dominant. Low competition in Delta region — opportunity.' },
    { state: 'MS', program: 'BEAD Subgrant', region: 'NE Mississippi', knownBidders: ['C Spire', 'Tombigbee Electric Co-op', 'AT&T'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-04', notes: 'Co-op bidding aggressively for member territory.' },

    // West Virginia
    { state: 'WV', program: 'BEAD Subgrant', region: 'Southern Coalfields', knownBidders: ['Shentel', 'Citynet', 'GigaBeam Networks'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-08', notes: 'Awards made. Shentel and Citynet dividing territory.' },
    { state: 'WV', program: 'BEAD Subgrant', region: 'Eastern Panhandle', knownBidders: ['Shentel', 'Comcast', 'Hardy Telecommunications'], bidCount: 3, competitionLevel: 'High', deadline: '2025-08', notes: 'Most competitive WV region — close to DC metro.' },

    // Montana
    { state: 'MT', program: 'BEAD Subgrant', region: 'Eastern MT', knownBidders: ['Triangle Communications', 'Mid-Rivers Communications'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Only 2 bidders for vast territory. Strong opportunity for new entrant.' },
    { state: 'MT', program: 'BEAD Subgrant', region: 'Western MT', knownBidders: ['Blackfoot Communications', 'CenturyLink/Lumen', 'Ronan Telephone'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Blackfoot strong local presence.' },

    // Michigan
    { state: 'MI', program: 'BEAD Subgrant', region: 'Upper Peninsula', knownBidders: ['Peninsula Fiber Network', 'CenturyLink/Lumen'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-02', notes: 'PFN likely winner. Low competition in UP.' },
    { state: 'MI', program: 'BEAD Subgrant', region: 'Northern Lower MI', knownBidders: ['Cherry Capital Communications', 'Spectrum', 'TDS Telecom'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-02', notes: 'Tourism corridor. Seasonal demand considerations.' },

    // Kentucky
    { state: 'KY', program: 'BEAD Subgrant', region: 'Eastern KY Coalfields', knownBidders: ['Kentucky Wired (state)', 'Windstream', 'Peoples Rural Telephone'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'KY Wired middle-mile creates backhaul advantage.' },

    // Alabama
    { state: 'AL', program: 'BEAD Subgrant', region: 'Black Belt', knownBidders: ['Tombigbee Electric Co-op', 'C Spire'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Persistent poverty area. Co-op has strong community trust.' },
    { state: 'AL', program: 'BEAD Subgrant', region: 'North Alabama', knownBidders: ['AT&T', 'Spectrum', 'North Alabama Electric Co-op'], bidCount: 3, competitionLevel: 'High', deadline: '2026-03', notes: 'Huntsville growth corridor. High competition.' },

    // Idaho
    { state: 'ID', program: 'BEAD Subgrant', region: 'Central Idaho', knownBidders: ['Frontier Communications', 'Ziply Fiber'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Mountain terrain. Very few bidders willing to build here.' },

    // Georgia
    { state: 'GA', program: 'BEAD Subgrant', region: 'South Georgia', knownBidders: ['Windstream', 'Pineland Telephone Co-op', 'AT&T'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-Q3', notes: 'Subgrant window not yet open. Pre-register now.' },

    // Ohio
    { state: 'OH', program: 'BEAD Subgrant', region: 'Appalachian SE Ohio', knownBidders: ['Spectrum', 'Windstream', 'Horizon Telcom'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'BroadbandOhio coordinating. ARC also funding region.' },

    // North Carolina
    { state: 'NC', program: 'BEAD Subgrant', region: 'Eastern NC', knownBidders: ['Lumen', 'Spectrum', 'Greenlight (Wilson)', 'RiverStreet Networks'], bidCount: 4, competitionLevel: 'High', deadline: '2026-03', notes: 'Most competitive NC region. Municipal fiber expanding.' }
];
