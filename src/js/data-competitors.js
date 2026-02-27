/**
 * Spectral Nexus — Competitor Profiles Data
 * Structured profiles of major broadband/telecom competitors.
 *
 * Sources: FCC BDC, state broadband office filings, press releases, SEC filings.
 * Updated: Feb 2026
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.competitorProfiles = [
    {
        name: 'Charter (Spectrum)',
        type: 'Cable/Fiber ISP',
        hq: 'Stamford, CT',
        states: ['TX','OH','GA','SC','VA','LA','CA','NC','WI','MI','KY','AL','MO'],
        technology: ['Fiber (FTTH)', 'HFC Cable', 'Fixed Wireless'],
        subscribers: 32000000,
        fiberMiles: 180000,
        beadActivity: { activeBids: 6, activeStates: ['TX','NC','MI','MO','AL','KY'], recentAwards: ['RDOF Phase I — ahead of schedule'], strategy: 'Aggressive rural fiber expansion; leveraging RDOF momentum' },
        rdofStatus: 'Building (ahead of schedule)',
        rdofAward: 1222600000,
        rdofLocations: 1058760,
        threat: 'high',
        notes: 'Largest RDOF winner. Spending $5.5B+ on rural broadband. Strong BEAD contender in every state they serve.'
    },
    {
        name: 'Windstream (Kinetic)',
        type: 'Fiber ISP',
        hq: 'Little Rock, AR',
        states: ['TX','GA','OH','IA','KY','NC','AL','MS'],
        technology: ['Fiber (FTTH)', 'Copper DSL (legacy)'],
        subscribers: 1100000,
        fiberMiles: 170000,
        beadActivity: { activeBids: 5, activeStates: ['TX','GA','KY','NC','MS'], recentAwards: ['RDOF authorized — building out'], strategy: 'Copper-to-fiber conversion; targeting BEAD in existing footprint' },
        rdofStatus: 'Authorized',
        rdofAward: 522688818,
        rdofLocations: 195188,
        threat: 'high',
        notes: 'Post-bankruptcy transformation to fiber-first. Aggressive BEAD bidder in rural markets.'
    },
    {
        name: 'Lumen (CenturyLink)',
        type: 'Fiber/Legacy Telco',
        hq: 'Monroe, LA',
        states: ['TX','LA','VA','NC','MO','MT','WI','AL','MS','GA','OH','CA'],
        technology: ['Fiber (FTTH)', 'Copper DSL (legacy)', 'Fixed Wireless'],
        subscribers: 4500000,
        fiberMiles: 450000,
        beadActivity: { activeBids: 3, activeStates: ['TX','LA','MO'], recentAwards: [], strategy: 'Selective BEAD participation; divesting consumer to focus on enterprise' },
        rdofStatus: 'Partial Default',
        rdofAward: 262300000,
        rdofLocations: 41000,
        threat: 'medium',
        notes: 'Divesting consumer broadband business to focus on enterprise/AI. RDOF partial default (53% of locations). Reduced BEAD threat in consumer markets.'
    },
    {
        name: 'Frontier',
        type: 'Fiber ISP',
        hq: 'Dallas, TX',
        states: ['CA','OH','VA','TX','NC','WV'],
        technology: ['Fiber (FTTH)', 'Copper DSL (legacy)'],
        subscribers: 3200000,
        fiberMiles: 220000,
        beadActivity: { activeBids: 4, activeStates: ['CA','TX','VA','OH'], recentAwards: ['RDOF authorized'], strategy: 'Fiber-first rebuild; building 1M+ passings/year' },
        rdofStatus: 'Authorized',
        rdofAward: 370900000,
        rdofLocations: 127000,
        threat: 'high',
        notes: 'Post-bankruptcy fiber transformation. Acquired by Verizon (pending). Building 1M+ fiber passings per year.'
    },
    {
        name: 'Shentel',
        type: 'Regional Fiber ISP',
        hq: 'Edinburg, VA',
        states: ['VA','WV'],
        technology: ['Fiber (FTTH)'],
        subscribers: 120000,
        fiberMiles: 12000,
        beadActivity: { activeBids: 2, activeStates: ['VA','WV'], recentAwards: ['WV BEAD award — Southern Coalfields', 'ReConnect R5 — $22M'], strategy: 'Deep Appalachian focus; strong state relationships' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'medium',
        notes: 'Strong regional player in VA/WV. Deep relationships with state broadband offices. Won early WV BEAD awards.'
    },
    {
        name: 'C Spire',
        type: 'Regional Fiber/Wireless',
        hq: 'Ridgeland, MS',
        states: ['MS','AL'],
        technology: ['Fiber (FTTH)', 'Fixed Wireless', 'Mobile (MVNO)'],
        subscribers: 350000,
        fiberMiles: 25000,
        beadActivity: { activeBids: 2, activeStates: ['MS','AL'], recentAwards: [], strategy: 'Mississippi-first; leveraging wireless + fiber combo' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'medium',
        notes: 'Dominant Mississippi player. Strong brand recognition. Combining wireless + fiber for BEAD bids.'
    },
    {
        name: 'AT&T',
        type: 'National Telco/ISP',
        hq: 'Dallas, TX',
        states: ['TX','GA','CA','NC','AL','MS','LA','KY','OH','MI','WI','MO','VA','SC'],
        technology: ['Fiber (FTTH)', 'Fixed Wireless (FWA)', 'Copper DSL (legacy)'],
        subscribers: 15000000,
        fiberMiles: 600000,
        beadActivity: { activeBids: 8, activeStates: ['TX','GA','NC','AL','KY','LA','MS','CA'], recentAwards: [], strategy: 'Selective BEAD bids in existing footprint; FWA for hard-to-reach areas' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'high',
        notes: 'Largest US telco. Deploying fiber to 30M+ locations. Selective on BEAD but massive footprint advantage.'
    },
    {
        name: 'T-Mobile (FWA)',
        type: 'Fixed Wireless ISP',
        hq: 'Bellevue, WA',
        states: ['TX','CA','GA','NC','OH','MI','WI','MO','VA','AL','MS','KY','LA','MT','WV','WA'],
        technology: ['Fixed Wireless (5G/LTE)'],
        subscribers: 6000000,
        fiberMiles: 0,
        beadActivity: { activeBids: 2, activeStates: ['TX','MS'], recentAwards: [], strategy: 'FWA as BEAD-eligible technology in low-density areas' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'medium',
        notes: 'Fastest-growing FWA provider (6M+ subs). BEAD fiber-preference limits competitiveness, but viable in extremely rural areas.'
    },
    {
        name: 'Brightspeed',
        type: 'Fiber ISP',
        hq: 'Charlotte, NC',
        states: ['NC','VA','SC','OH','AL','MS'],
        technology: ['Fiber (FTTH)', 'Copper DSL (legacy)'],
        subscribers: 2000000,
        fiberMiles: 55000,
        beadActivity: { activeBids: 3, activeStates: ['NC','VA','SC'], recentAwards: [], strategy: 'Upgrading acquired CenturyLink footprint; aggressive BEAD participation in Southeast' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'medium',
        notes: 'Acquired CenturyLink Southeast footprint in 2022. Investing $2B+ in fiber upgrades. Active BEAD participant.'
    },
    {
        name: 'Consolidated Communications',
        type: 'Regional Fiber ISP',
        hq: 'Mattoon, IL',
        states: ['TX','CA','VA','NC','MI','OH','MO'],
        technology: ['Fiber (FTTH)', 'Copper DSL (legacy)'],
        subscribers: 800000,
        fiberMiles: 60000,
        beadActivity: { activeBids: 2, activeStates: ['TX','VA'], recentAwards: [], strategy: 'Fiber upgrade of legacy footprint; selective BEAD bids' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'low',
        notes: 'Mid-size incumbent upgrading to fiber. Focused on existing footprint rather than expansion.'
    },
    {
        name: 'Electric Co-ops (Various)',
        type: 'Cooperative Fiber',
        hq: 'Various',
        states: ['TX','VA','NC','KY','GA','AL','MS','MO','MI','WI','MT','OH'],
        technology: ['Fiber (FTTH)'],
        subscribers: 500000,
        fiberMiles: 80000,
        beadActivity: { activeBids: 15, activeStates: ['TX','VA','NC','KY','GA','AL','MS','MO'], recentAwards: ['Multiple ReConnect awards across states'], strategy: 'High trust + existing pole infrastructure. Strong BEAD contenders in rural areas.' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'high',
        notes: 'Collective of 50+ electric cooperatives building fiber. Strong community trust, existing rights-of-way, and USDA funding. Top BEAD threat in rural areas.'
    },
    {
        name: 'GeoLinks',
        type: 'Fixed Wireless ISP',
        hq: 'Camarillo, CA',
        states: ['CA'],
        technology: ['Fixed Wireless', 'Fiber (FTTH)'],
        subscribers: 50000,
        fiberMiles: 3000,
        beadActivity: { activeBids: 1, activeStates: ['CA'], recentAwards: [], strategy: 'California tribal and rural FWA; BEAD alternative tech' },
        rdofStatus: 'N/A',
        rdofAward: 0,
        rdofLocations: 0,
        threat: 'low',
        notes: 'California-focused fixed wireless. Active in tribal broadband. Niche player.'
    }
];

/* ─── Competitor quick-lookup by state ─── */
SN.data.competitorsByState = {};
(function() {
    var profiles = SN.data.competitorProfiles || [];
    profiles.forEach(function(c) {
        (c.states || []).forEach(function(st) {
            if (!SN.data.competitorsByState[st]) SN.data.competitorsByState[st] = [];
            SN.data.competitorsByState[st].push({
                name: c.name,
                type: c.type,
                threat: c.threat,
                activeBids: c.beadActivity.activeBids,
                technology: c.technology
            });
        });
    });
})();
