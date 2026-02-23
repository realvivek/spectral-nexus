/**
 * Spectral Nexus — Configuration
 * Scoring weights, BEAD statuses, map settings, and constants.
 */

window.SN = window.SN || {};

SN.config = {
    version: '0.2.0',
    buildDate: '2026-02-20',

    /* ─── Active States (Phase 1) ─── */
    activeStates: ['TX','LA','GA','VA','MT','IA','SC','CA','OH','NM'],

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

    /* ─── Funding Score Matrix ─── */
    fundingScore: {
        approvedHighUnserved: 95,
        approvedModUnserved: 80,
        approvedLowUnserved: 60,
        pendingHighUnserved: 75,
        pendingModUnserved: 60,
        pendingLowUnserved: 40,
        noBeadHighUnserved: 50,
        noBeadDefault: 30
    },

    /* ─── BEAD Program Status by State ─── */
    beadStatus: {
        TX: 'Approved', LA: 'Approved', GA: 'Approved', VA: 'Approved',
        MT: 'Approved', IA: 'Approved', SC: 'Approved',
        CA: 'Pending', OH: 'Pending', NM: 'Pending'
    },

    /* ─── BEAD State Allocations ─── */
    beadAllocations: {
        TX: 3300000000, LA: 498000000, GA: 1300000000, VA: 1500000000,
        MT: 629000000, IA: 415000000, SC: 919000000,
        CA: 1860000000, OH: 794000000, NM: 675000000
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
