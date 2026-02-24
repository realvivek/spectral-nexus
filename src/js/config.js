/**
 * Spectral Nexus — Configuration
 * Scoring weights, BEAD statuses, map settings, and constants.
 */

window.SN = window.SN || {};

SN.config = {
    version: '0.4.0',
    buildDate: '2026-02-24',

    /* ─── Active States — all 50 states + DC ─── */
    activeStates: [
        'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
        'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
        'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
        'VT','VA','WA','WV','WI','WY'
    ],

    /* ─── Scoring Weights (must sum to 1.0) ─── */
    weights: {
        coverageGap: 0.25,
        unservedPct: 0.20,
        popDensity:  0.10,
        incomeNeed:  0.15,
        readiness5g: 0.10,
        funding:     0.20
    },

    /* ─── Density Scoring Curve ─── */
    densityCurve: [
        { max: 5,    score: 40 },
        { max: 20,   score: 55 },
        { max: 50,   score: 70 },
        { max: 100,  score: 80 },
        { max: 200,  score: 90 },
        { max: 500,  score: 75 },
        { max: 1000, score: 55 },
        { max: 2000, score: 40 },
        { max: 5000, score: 30 }
    ],

    /* ─── Funding Score Matrix (calibrated to real data, v0.3.0) ─── */
    fundingScore: {
        approvedVeryHigh: 100,  // >30% unserved
        approvedHigh: 85,       // >15% unserved
        approvedMod: 65,        // >5% unserved
        approvedLow: 45,        // >2% unserved
        approvedMinimal: 25,    // ≤2% unserved
        pendingHigh: 70,
        pendingMod: 50,
        pendingLow: 30,
        noBeadHigh: 45,
        noBeadDefault: 20
    },

    /* ─── BEAD Program Status by State (all approved as of 2025) ─── */
    beadStatus: {
        AL: 'Approved', AK: 'Approved', AZ: 'Approved', AR: 'Approved',
        CA: 'Approved', CO: 'Approved', CT: 'Approved', DE: 'Approved',
        DC: 'Approved', FL: 'Approved', GA: 'Approved', HI: 'Approved',
        ID: 'Approved', IL: 'Approved', IN: 'Approved', IA: 'Approved',
        KS: 'Approved', KY: 'Approved', LA: 'Approved', ME: 'Approved',
        MD: 'Approved', MA: 'Approved', MI: 'Approved', MN: 'Approved',
        MS: 'Approved', MO: 'Approved', MT: 'Approved', NE: 'Approved',
        NV: 'Approved', NH: 'Approved', NJ: 'Approved', NM: 'Approved',
        NY: 'Approved', NC: 'Approved', ND: 'Approved', OH: 'Approved',
        OK: 'Approved', OR: 'Approved', PA: 'Approved', RI: 'Approved',
        SC: 'Approved', SD: 'Approved', TN: 'Approved', TX: 'Approved',
        UT: 'Approved', VT: 'Approved', VA: 'Approved', WA: 'Approved',
        WV: 'Approved', WI: 'Approved', WY: 'Approved'
    },

    /* ─── BEAD State Allocations (NTIA Official, June 2023) ─── */
    beadAllocations: {
        AL: 1401221902, AK: 1017139672, AZ: 993112231, AR: 1024303994,
        CA: 1864136509, CO: 826522650, CT: 144180793, DE: 107748385,
        FL: 1169947393, GA: 1307214371, HI: 149484494, ID: 583256250,
        IL: 1040420752, IN: 868109930, IA: 415331313, KS: 451725998,
        KY: 1086172537, LA: 1355554553, ME: 271977723, MD: 267738401,
        MA: 147422464, MI: 1559362479, MN: 651839368, MS: 1203561563,
        MO: 1736302708, MT: 628973799, NE: 405281070, NV: 416666230,
        NH: 196560279, NJ: 263689549, NM: 675372312, NY: 664618251,
        NC: 1532999481, ND: 130162815, OH: 793688108, OK: 797435691,
        OR: 688914932, PA: 1161778272, RI: 108718821, SC: 551535983,
        SD: 207227524, TN: 813319680, TX: 3312616455, UT: 317399742,
        VT: 228913019, VA: 1481489573, WA: 1227742066, WV: 1210800970,
        WI: 1055823574, WY: 347877921
    },

    /* ─── Map Settings ─── */
    map: {
        center: [39.5, -98.35],
        zoom: 4.5,
        minZoom: 3,
        maxZoom: 14,
        tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        tileAttribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    },

    /* ─── Choropleth Color Scale (low → high opportunity) ─── */
    choroplethColors: [
        '#06d6a0', '#0bc49a', '#10b294', '#15a08e',
        '#38bdf8', '#5298c8', '#6b7298', '#845c78',
        '#fbbf24', '#ef4444'
    ],

    /* ─── Insights Configuration ─── */
    insights: {
        underservedMinPop: 5000,
        quickWin: {
            minScore: 50,
            minPop: 10000,
            maxPop: 200000,
            minUnserved: 0.10,
            requireApproved: true
        },
        emerging: {
            minScore: 40,
            minDensity: 20,
            maxDensity: 300,
            maxFiber: 0.40
        }
    }
};
