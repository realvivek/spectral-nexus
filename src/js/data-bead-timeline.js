/**
 * Spectral Nexus — BEAD Subgrant Timeline Data
 * Per-state BEAD process milestones and competitive bid intelligence.
 *
 * Sources: NTIA BEAD program tracker, state broadband office websites (Jul 2026)
 * Phase codes: plan_approved | challenge_complete | subgrant_open | subgrant_closed | awards_made | construction
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

/* ═══════════════════════════════════════════════════════════
 * BEAD State-by-State Timeline
 * Each state's subgrant process runs on its own schedule
 * ═══════════════════════════════════════════════════════════ */
SN.data.beadTimeline = {
    TX: { allocation: 3312000000, phase: 'awards_made', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 22, notes: 'Awards announced June 2026. 580K locations. Construction starting Q3.' },
    CA: { allocation: 1864000000, phase: 'awards_made', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 18, notes: 'Awards made Q1 2026. Coordinating with $3.25B Middle-Mile Initiative. Construction underway.' },
    VA: { allocation: 1481000000, phase: 'construction', planApproved: '2024-05', challengeComplete: '2025-01', subgrantOpen: '2025-04', subgrantClose: '2025-10', awardsExpected: '2025-12', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Early mover. Construction well underway across SW and Southside VA.' },
    MO: { allocation: 1736000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 16, notes: 'Awards announced. 340K rural locations. Construction starting Q3.' },
    MS: { allocation: 1203000000, phase: 'awards_made', planApproved: '2024-09', challengeComplete: '2025-05', subgrantOpen: '2025-10', subgrantClose: '2026-04', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 10, notes: 'Awards announced. C Spire won majority of Delta region. Subcontractor opportunities.' },
    WV: { allocation: 1210000000, phase: 'construction', planApproved: '2024-04', challengeComplete: '2024-12', subgrantOpen: '2025-03', subgrantClose: '2025-08', awardsExpected: '2025-11', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 8, notes: 'First state to make awards. Construction underway. Mountainous terrain challenges.' },
    NC: { allocation: 1533000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 19, notes: 'Awards announced. Eastern NC priority areas. Building on GREAT program.' },
    LA: { allocation: 1356000000, phase: 'subgrant_open', planApproved: '2024-08', challengeComplete: '2025-06', subgrantOpen: '2026-02', subgrantClose: '2026-08', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: 8, notes: 'Subgrant window open. Building on GUMBO program. Deadline Aug 2026.' },
    MI: { allocation: 1559000000, phase: 'awards_made', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 15, notes: 'Awards made. Upper Peninsula + rural Lower Michigan. Construction underway.' },
    KY: { allocation: 1086000000, phase: 'awards_made', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 12, notes: 'Awards announced. Eastern KY coalfields priority. KY Wired middle-mile advantage.' },
    AL: { allocation: 1401000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 11, notes: 'Awards announced. Black Belt region focus. Construction starting Q3.' },
    GA: { allocation: 1307000000, phase: 'subgrant_open', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-01', subgrantClose: '2026-09', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: 12, notes: 'Subgrant window open. South Georgia + rural corridors. Deadline Sep 2026.' },
    WI: { allocation: 1056000000, phase: 'awards_made', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 13, notes: 'Awards made. Northern WI + dairy corridor. Construction underway.' },
    WA: { allocation: 1228000000, phase: 'construction', planApproved: '2024-05', challengeComplete: '2025-01', subgrantOpen: '2025-04', subgrantClose: '2025-09', awardsExpected: '2025-12', constructionStart: '2026-Q1', constructionDeadline: '2029-06', subgrantApplicants: 16, notes: 'Construction underway. Eastern WA + tribal lands.' },
    IN: { allocation: 868000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-02', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Awards made. Southern Indiana rural focus. Construction underway.' },
    TN: { allocation: 813000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 10, notes: 'Awards announced. Appalachian corridor priority. Construction starting Q3.' },
    MN: { allocation: 652000000, phase: 'awards_made', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-06', subgrantClose: '2026-01', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 11, notes: 'Awards made Q1 2026. Construction underway.' },
    OH: { allocation: 700000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 17, notes: 'Awards announced. Appalachian SE Ohio focus. BroadbandOhio coordinating.' },
    SC: { allocation: 552000000, phase: 'subgrant_open', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-02', subgrantClose: '2026-08', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: 9, notes: 'Subgrant window open. Rural Midlands and Pee Dee. Deadline Aug 2026.' },
    OR: { allocation: 689000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 9, notes: 'Awards announced. Eastern Oregon rural. Construction starting Q3.' },
    NM: { allocation: 675000000, phase: 'subgrant_open', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-03', subgrantClose: '2026-09', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: 6, notes: 'Subgrant window open. Tribal lands + rural. HB 177 match fund doubles federal $. Deadline Sep 2026.' },
    MT: { allocation: 629000000, phase: 'awards_made', planApproved: '2024-07', challengeComplete: '2025-03', subgrantOpen: '2025-08', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 7, notes: 'Awards announced. Vast rural territory. Low competition yielded favorable terms.' },
    ID: { allocation: 583000000, phase: 'awards_made', planApproved: '2024-08', challengeComplete: '2025-04', subgrantOpen: '2025-09', subgrantClose: '2026-03', awardsExpected: '2026-Q2', constructionStart: '2026-Q3', constructionDeadline: '2029-06', subgrantApplicants: 6, notes: 'Awards announced. Mountain communities. Very low competition.' },
    AK: { allocation: 1017000000, phase: 'subgrant_open', planApproved: '2024-09', challengeComplete: '2025-06', subgrantOpen: '2026-03', subgrantClose: '2026-09', awardsExpected: '2026-Q4', constructionStart: '2027-Q1', constructionDeadline: '2029-06', subgrantApplicants: 4, notes: 'Subgrant window open. Satellite + fiber hybrid. Extreme terrain. Fewest applicants — low competition. Deadline Sep 2026.' },
    IA: { allocation: 415000000, phase: 'awards_made', planApproved: '2024-06', challengeComplete: '2025-02', subgrantOpen: '2025-07', subgrantClose: '2026-01', awardsExpected: '2026-Q1', constructionStart: '2026-Q2', constructionDeadline: '2029-06', subgrantApplicants: 14, notes: 'Awards made Q1 2026. Construction underway.' }
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
    // Texas — awards made
    { state: 'TX', program: 'BEAD Subgrant', region: 'East Texas', knownBidders: ['Suddenlink/Altice', 'Mid-South Synergy (co-op)', 'Eastex Telephone Co-op'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Awarded. Co-op won East Texas rural. Subcontractor needs for fiber construction.' },
    { state: 'TX', program: 'BEAD Subgrant', region: 'West Texas', knownBidders: ['Big Bend Telephone', 'Windstream'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Awarded. Big Bend won vast rural territory. Construction hiring underway.' },
    { state: 'TX', program: 'BEAD Subgrant', region: 'Panhandle', knownBidders: ['PTCI', 'Windstream', 'Nextlink Internet'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Awarded. PTCI won most Panhandle areas.' },
    { state: 'TX', program: 'TX BOOT', region: 'Rio Grande Valley', knownBidders: ['Spectrum', 'Valley Telephone Co-op', 'NTT DATA'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-06', notes: 'Awarded. NTT DATA leveraging Brownsville private 5G success.' },

    // Virginia — construction underway
    { state: 'VA', program: 'BEAD Subgrant', region: 'Southwest VA', knownBidders: ['Shentel', 'BARC Electric Co-op', 'Appalachian Power'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-10', notes: 'Awarded. Shentel won majority of SW Virginia. Construction underway.' },
    { state: 'VA', program: 'BEAD Subgrant', region: 'Southside VA', knownBidders: ['Shentel', 'Lumen', 'MFHC Electric Co-op'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-10', notes: 'Awarded. Construction underway.' },

    // Mississippi — awards made
    { state: 'MS', program: 'BEAD Subgrant', region: 'Mississippi Delta', knownBidders: ['C Spire', 'Windstream'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-04', notes: 'Awarded. C Spire won Delta region. Subcontractor opportunities for fiber builds.' },
    { state: 'MS', program: 'BEAD Subgrant', region: 'NE Mississippi', knownBidders: ['C Spire', 'Tombigbee Electric Co-op', 'AT&T'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-04', notes: 'Awarded. Co-op won member territory.' },

    // West Virginia — construction underway
    { state: 'WV', program: 'BEAD Subgrant', region: 'Southern Coalfields', knownBidders: ['Shentel', 'Citynet', 'GigaBeam Networks'], bidCount: 3, competitionLevel: 'Medium', deadline: '2025-08', notes: 'Awarded. Construction underway. Shentel and Citynet dividing territory.' },
    { state: 'WV', program: 'BEAD Subgrant', region: 'Eastern Panhandle', knownBidders: ['Shentel', 'Comcast', 'Hardy Telecommunications'], bidCount: 3, competitionLevel: 'High', deadline: '2025-08', notes: 'Awarded. Construction underway. Close to DC metro.' },

    // Montana — awards made
    { state: 'MT', program: 'BEAD Subgrant', region: 'Eastern MT', knownBidders: ['Triangle Communications', 'Mid-Rivers Communications'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Awarded. Only 2 bidders for vast territory. Subcontractor needs high.' },
    { state: 'MT', program: 'BEAD Subgrant', region: 'Western MT', knownBidders: ['Blackfoot Communications', 'CenturyLink/Lumen', 'Ronan Telephone'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Awarded. Blackfoot won local stronghold areas.' },

    // Michigan — awards made
    { state: 'MI', program: 'BEAD Subgrant', region: 'Upper Peninsula', knownBidders: ['Peninsula Fiber Network', 'CenturyLink/Lumen'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-02', notes: 'Awarded. PFN won UP. Construction starting.' },
    { state: 'MI', program: 'BEAD Subgrant', region: 'Northern Lower MI', knownBidders: ['Cherry Capital Communications', 'Spectrum', 'TDS Telecom'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-02', notes: 'Awarded. Tourism corridor builds planned for off-season.' },

    // Kentucky — awards made
    { state: 'KY', program: 'BEAD Subgrant', region: 'Eastern KY Coalfields', knownBidders: ['Kentucky Wired (state)', 'Windstream', 'Peoples Rural Telephone'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Awarded. KY Wired middle-mile advantage. Subcontractor opportunities.' },

    // Alabama — awards made
    { state: 'AL', program: 'BEAD Subgrant', region: 'Black Belt', knownBidders: ['Tombigbee Electric Co-op', 'C Spire'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Awarded. Co-op won with community trust. Construction starting Q3.' },
    { state: 'AL', program: 'BEAD Subgrant', region: 'North Alabama', knownBidders: ['AT&T', 'Spectrum', 'North Alabama Electric Co-op'], bidCount: 3, competitionLevel: 'High', deadline: '2026-03', notes: 'Awarded. Huntsville growth corridor. Split among providers.' },

    // Idaho — awards made
    { state: 'ID', program: 'BEAD Subgrant', region: 'Central Idaho', knownBidders: ['Frontier Communications', 'Ziply Fiber'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-03', notes: 'Awarded. Ziply won mountain territory. Construction hiring.' },

    // Georgia — subgrant currently open
    { state: 'GA', program: 'BEAD Subgrant', region: 'South Georgia', knownBidders: ['Windstream', 'Pineland Telephone Co-op', 'AT&T'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-09', notes: 'Subgrant window OPEN. Pre-register now. Deadline Sep 2026.' },

    // Ohio — awards made
    { state: 'OH', program: 'BEAD Subgrant', region: 'Appalachian SE Ohio', knownBidders: ['Spectrum', 'Windstream', 'Horizon Telcom'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-03', notes: 'Awarded. ARC also funding region. Subcontractor opportunities.' },

    // North Carolina — awards made
    { state: 'NC', program: 'BEAD Subgrant', region: 'Eastern NC', knownBidders: ['Lumen', 'Spectrum', 'Greenlight (Wilson)', 'RiverStreet Networks'], bidCount: 4, competitionLevel: 'High', deadline: '2026-03', notes: 'Awarded. Municipal fiber expanding. Construction starting.' },

    // Louisiana — subgrant currently open
    { state: 'LA', program: 'BEAD Subgrant', region: 'Rural Louisiana', knownBidders: ['C Spire', 'Windstream', 'Allen Parish Co-op'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-08', notes: 'Subgrant window OPEN. Building on GUMBO. Deadline Aug 2026.' },

    // South Carolina — subgrant currently open
    { state: 'SC', program: 'BEAD Subgrant', region: 'Pee Dee / Midlands', knownBidders: ['Spectrum', 'Home Telecom', 'Palmetto Rural Telephone'], bidCount: 3, competitionLevel: 'Medium', deadline: '2026-08', notes: 'Subgrant window OPEN. Deadline Aug 2026.' },

    // New Mexico — subgrant currently open
    { state: 'NM', program: 'BEAD Subgrant', region: 'Tribal + Rural NM', knownBidders: ['Plateau Telecommunications', 'Sacred Wind Communications'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-09', notes: 'Subgrant window OPEN. Low competition. HB 177 match fund. Deadline Sep 2026.' },

    // Alaska — subgrant currently open
    { state: 'AK', program: 'BEAD Subgrant', region: 'Rural Alaska', knownBidders: ['GCI', 'Matanuska Telephone Association'], bidCount: 2, competitionLevel: 'Low', deadline: '2026-09', notes: 'Subgrant window OPEN. Fewest applicants nationally. Satellite/fiber hybrid. Deadline Sep 2026.' }
];
