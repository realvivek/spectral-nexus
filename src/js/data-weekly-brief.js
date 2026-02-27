/**
 * Spectral Nexus — Weekly Intelligence Brief
 * Manually curated summary of the week's top opportunities.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  HOW TO UPDATE (takes ~2 minutes):                              │
 * │                                                                 │
 * │  1. Change `weekOf` to the current Monday date                  │
 * │  2. Replace the 5 items in the `bullets` array                  │
 * │  3. Each bullet needs: icon, text, and optional tag             │
 * │  4. Commit and push — that's it                                 │
 * │                                                                 │
 * │  ICON OPTIONS:                                                  │
 * │    'bead'   — BEAD funding / subgrant news                     │
 * │    '5g'     — Private 5G / CBRS / spectrum                     │
 * │    'dc'     — Data center builds / expansions                  │
 * │    'fiber'  — Fiber / dark fiber / municipal networks          │
 * │    'deal'   — Competitive bids / awards / contracts            │
 * │    'alert'  — Urgent deadlines / breaking changes              │
 * │    'rdof'   — RDOF defaults / recapture                        │
 * │    'policy' — Regulatory / policy changes                      │
 * │                                                                 │
 * │  TAG OPTIONS (optional, shown as colored pill):                 │
 * │    'urgent'     — Red pill, for deadlines < 30 days            │
 * │    'new'        — Green pill, for brand new opportunities      │
 * │    'update'     — Blue pill, for status changes                │
 * │    'opportunity'— Purple pill, for actionable leads            │
 * │    null         — No tag shown                                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

window.SN = window.SN || {};
SN.data = SN.data || {};

SN.data.weeklyBrief = {

    /* ── Date of this brief (Monday of the week) ── */
    weekOf: '2026-02-23',

    /* ── 5 bullet points — the week's top stories ── */
    bullets: [
        {
            icon: 'bead',
            text: 'Texas BEAD subgrant window closes <strong>March 2026</strong> — 22 applicants competing for $3.3B across 580K unserved locations. Last chance to submit or partner.',
            tag: 'urgent'
        },
        {
            icon: '5g',
            text: 'Las Vegas Smart City program ($120M budget, 35K IoT sensors) still has <strong>no private 5G deployment</strong>. CBRS spectrum only 18% utilized — wide open for CBRS/private wireless.',
            tag: 'opportunity'
        },
        {
            icon: 'dc',
            text: 'QTS Richmond data center (120 MW) <strong>under construction</strong> and flagged CBRS-ready. Contact facility team for wireless backhaul RFP timeline.',
            tag: 'new'
        },
        {
            icon: 'deal',
            text: 'Mississippi BEAD subgrant has only <strong>10 applicants</strong> for $1.2B — lowest competition of any open state. Delta region priority areas especially underserved.',
            tag: 'opportunity'
        },
        {
            icon: 'fiber',
            text: 'Cedar Falls Utilities (Iowa) has <strong>dark fiber available</strong> across 280 miles but no smart city or private 5G program — greenfield wireless opportunity.',
            tag: 'new'
        }
    ],

    /* ── Previous briefs (for archive / history view) ── */
    archive: [
        // Older briefs can be moved here for reference
        // { weekOf: '2026-02-16', bullets: [ ... ] }
    ]
};
