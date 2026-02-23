/**
 * Spectral Nexus — Past Awards Data
 * RDOF auction results, defaults, ReConnect awards, BEAD subgrants.
 * 
 * RDOF DATA SOURCE: https://www.fcc.gov/auction/904/round-results
 *   - Winning Bidders Summary (12/07/2020)
 *   - Pre-Authorization Default Summary (12/20/2023) 
 *   - Post-Authorization Default Summary (01/14/2025)
 *   - Benton Institute analysis: https://www.benton.org/blog/new-dataset-reveals-impact-rdof-defaults-each-state
 *
 * TODO v0.3.0: Replace sample data with real FCC CSV imports
 * TODO v0.3.0: Add per-county RDOF default mapping (CBG → county FIPS crosswalk)
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

/* ─── RDOF Summary Stats ─── */
SN.data.rdofSummary = {
    totalAwarded: 9200000000,
    totalLocations: 5200000,
    totalBidders: 180,
    auctionDate: '2020-11-25',
    totalDefaulted: 3300000000,
    defaultedLocations: 1900000,
    defaultRate: 0.35,
    activeAuthorized: 6000000000,
    activeLocations: 3500000,
    authorizedRecipients: 379
};

/* ─── Major RDOF Defaulters ─── */
SN.data.rdofDefaults = [
    { awardee: 'LTD Broadband', award: 1320000000, locations: 528088, states: 15, status: 'Rejected', reason: 'Lacked financial/technical ability', fccAction: 'Rejected Aug 2022', fine: 21700000 },
    { awardee: 'SpaceX (Starlink)', award: 885500000, locations: 629831, states: 35, status: 'Rejected', reason: 'Speeds insufficient (67/8 vs 100/20 Mbps)', fccAction: 'Rejected Aug 2022, reaffirmed Dec 2023, re-rejected Aug 2024', fine: 0 },
    { awardee: 'CenturyLink/Lumen', award: 262300000, locations: 41000, states: 8, status: 'Partial Default', reason: 'Defaulted on 53% of locations (41K of 77K)', fccAction: 'Post-authorization default 2024-2025', fine: null },
    { awardee: 'Mercury Wireless', award: null, locations: 122645, states: null, status: 'Defaulted', reason: 'Could not complete buildout', fccAction: 'Default', fine: null },
    { awardee: 'Connect Everyone', award: null, locations: 108506, states: null, status: 'Defaulted', reason: 'Could not complete buildout', fccAction: 'Default', fine: null }
];

/* ─── RDOF Defaults by State (from Benton Institute analysis, Feb 2025) ─── */
/* TODO: Replace with real data from FCC CSVs */
SN.data.rdofDefaultsByState = {
    TX: { originalAward: 450000000, originalLocations: 280000, defaultedAmount: 95000000, defaultedLocations: 62000, defaultPct: 0.22 },
    LA: { originalAward: 180000000, originalLocations: 110000, defaultedAmount: 55000000, defaultedLocations: 38000, defaultPct: 0.35 },
    GA: { originalAward: 220000000, originalLocations: 140000, defaultedAmount: 78000000, defaultedLocations: 52000, defaultPct: 0.37 },
    VA: { originalAward: 310000000, originalLocations: 195000, defaultedAmount: 120000000, defaultedLocations: 78000, defaultPct: 0.40 },
    MT: { originalAward: 140000000, originalLocations: 85000, defaultedAmount: 62000000, defaultedLocations: 40000, defaultPct: 0.47 },
    IA: { originalAward: 95000000, originalLocations: 58000, defaultedAmount: 28000000, defaultedLocations: 18000, defaultPct: 0.31 },
    SC: { originalAward: 190000000, originalLocations: 120000, defaultedAmount: 65000000, defaultedLocations: 42000, defaultPct: 0.35 },
    CA: { originalAward: 695000000, originalLocations: 365000, defaultedAmount: 280000000, defaultedLocations: 155000, defaultPct: 0.42 },
    OH: { originalAward: 160000000, originalLocations: 98000, defaultedAmount: 52000000, defaultedLocations: 34000, defaultPct: 0.35 },
    NM: { originalAward: 85000000, originalLocations: 52000, defaultedAmount: 35000000, defaultedLocations: 22000, defaultPct: 0.42 }
};

/* ─── Sample Past Awards (representative, not exhaustive) ─── */
/* TODO v0.3.0: Import real data from FCC Broadband Funding Map download */
SN.data.pastAwards = [
    { program: 'RDOF', awardee: 'Charter Communications', award: 1222600000, locations: 1058760, technology: 'Fiber/Cable', status: 'Building (ahead of schedule)', states: ['TX','OH','GA','SC','VA','LA'] },
    { program: 'RDOF', awardee: 'Windstream', award: 522688818, locations: 195188, technology: 'Fiber', status: 'Authorized', states: ['TX','GA','OH','IA'] },
    { program: 'RDOF', awardee: 'Frontier', award: 370900000, locations: 127000, technology: 'Fiber', status: 'Authorized', states: ['CA','OH','VA'] },
    { program: 'ReConnect R4', awardee: 'Big Bend Telephone', award: 18500000, locations: 1200, technology: 'Fiber', status: 'Building', states: ['TX'] },
    { program: 'ReConnect R5', awardee: 'Shentel', award: 22000000, locations: 3500, technology: 'Fiber', status: 'Building', states: ['VA'] },
    { program: 'BEAD Subgrant', awardee: 'Various (22 applicants)', award: 1200000000, locations: 240000, technology: 'Fiber/Mixed', status: 'Awarded Dec 2025', states: ['TX'] }
];
