#!/usr/bin/env node
/**
 * Spectral Nexus — Curated Date Expiry Check (advisory)
 *
 * Scans curated data files for dates that have gone stale and prints
 * GitHub-Actions `::warning::` annotations. This is intentionally NON-FATAL
 * (always exits 0): it flags curated content that needs a human/agentic
 * update — it does not edit the curated prose itself.
 *
 * Usage:  node scripts/check-dates.js
 */

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().slice(0, 7); // YYYY-MM
let warnings = 0;

function warn(msg) {
    warnings++;
    console.log('::warning::' + msg);
}

/* ─── BEAD: subgrant_open states whose subgrantClose date has passed ─── */
(function checkBead() {
    const file = path.join(__dirname, '..', 'src', 'js', 'data-bead-timeline.js');
    let code;
    try {
        code = fs.readFileSync(file, 'utf8');
    } catch (e) {
        console.log('[check-dates] skip BEAD: cannot read data-bead-timeline.js (' + e.message + ')');
        return;
    }
    const blocks = code.match(/phase:\s*'subgrant_open'[\s\S]*?subgrantClose:\s*'(\d{4}-\d{2})'/g) || [];
    blocks.forEach(function (m) {
        const d = m.match(/subgrantClose:\s*'(\d{4}-\d{2})'/)[1];
        if (d < today) {
            warn('BEAD state still marked subgrant_open with a past subgrantClose (' + d +
                 ') — flip phase to subgrant_closed in data-bead-timeline.js');
        }
    });
})();

/* ─── Weekly brief: weekOf older than ~2 weeks ─── */
(function checkWeeklyBrief() {
    const file = path.join(__dirname, '..', 'src', 'js', 'data-weekly-brief.js');
    let code;
    try {
        code = fs.readFileSync(file, 'utf8');
    } catch (e) {
        console.log('[check-dates] skip weekly brief: cannot read data-weekly-brief.js (' + e.message + ')');
        return;
    }
    const m = code.match(/weekOf:\s*'(\d{4}-\d{2}-\d{2})'/);
    if (m) {
        const weekOf = new Date(m[1] + 'T00:00:00Z');
        const ageDays = (Date.now() - weekOf.getTime()) / 86400000;
        if (ageDays > 14) {
            warn('Weekly brief weekOf is ' + m[1] + ' (' + Math.round(ageDays) +
                 ' days old) — refresh data-weekly-brief.js');
        }
    }
})();

if (warnings === 0) {
    console.log('[check-dates] All curated dates are current (as of ' + today + ').');
} else {
    console.log('[check-dates] ' + warnings + ' stale-date warning(s) — curated update recommended.');
}

// Advisory only: never fail the build.
process.exit(0);
