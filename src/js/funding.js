/**
 * Spectral Nexus — Funding Intel Module
 * Grants pursuit guide, competitive landscape, past winners, opportunity score explanation.
 * Actionable intelligence for system integrators chasing broadband opportunities.
 */

window.SN = window.SN || {};

SN.funding = {

    sortCol: 'award',
    sortDir: 'desc',
    activeSection: 'grants',

    init() {
        // nothing needed — rendered on tab switch
    },

    /**
     * Render the full Funding Intel panel.
     */
    render() {
        var container = document.getElementById('funding-container');
        if (!container) return;

        container.innerHTML =
            this.renderSubTabs() +
            '<div id="funding-content">' +
                this.renderGrants() +
            '</div>';

        this.bindSubTabs();
    },

    renderSubTabs() {
        var tabs = [
            { id: 'grants', label: 'Grants Guide' },
            { id: 'winners', label: 'Past Winners' },
            { id: 'competitive', label: 'Competitive Landscape' },
            { id: 'scoring', label: 'Scoring Explained' }
        ];

        return '<div class="funding-subtabs">' +
            tabs.map(function(t) {
                return '<button class="funding-subtab' + (SN.funding.activeSection === t.id ? ' active' : '') + '" data-section="' + t.id + '">' + t.label + '</button>';
            }).join('') +
        '</div>';
    },

    bindSubTabs() {
        var self = this;
        document.querySelectorAll('.funding-subtab').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.activeSection = btn.dataset.section;
                self.render();
            });
        });
    },

    /* ═══════════════════════════════════════════════
     * GRANTS PURSUIT GUIDE
     * ═══════════════════════════════════════════════ */

    renderGrants() {
        if (this.activeSection !== 'grants') {
            if (this.activeSection === 'winners') return this.renderWinners();
            if (this.activeSection === 'competitive') return this.renderCompetitive();
            if (this.activeSection === 'scoring') return this.renderScoring();
        }

        var grants = SN.data.grants;
        if (!grants) return '<p>No grant data available.</p>';

        // Summary stats
        var totalFederal = 0;
        var openCount = 0;
        grants.federal.forEach(function(g) {
            totalFederal += g.totalFunding || 0;
            if (g.statusCode === 'open' || g.statusCode === 'rolling') openCount++;
        });

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Fiber & Broadband Grants — Pursuit Guide</h3>' +
                '<p>How to win broadband contracts as a system integrator or fiber infrastructure company.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(totalFederal, 'currency') + '</span><span class="fhs-lbl">Total Federal Funding</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + openCount + '</span><span class="fhs-lbl">Programs Open Now</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + grants.federal.length + '</span><span class="fhs-lbl">Federal Programs</span></div>' +
                '</div>' +
            '</div>';

        // SI Pursuit Playbook
        html += '<div class="funding-playbook">' +
            '<h4>System Integrator Playbook</h4>' +
            '<div class="playbook-steps">' +
                '<div class="playbook-step"><span class="step-num">1</span><div><strong>Identify BEAD Subgrant Opportunities</strong><br>States are awarding BEAD subgrants to ISPs and contractors. Partner with awarded ISPs as the build-out contractor, or apply directly in states that allow SI participation.</div></div>' +
                '<div class="playbook-step"><span class="step-num">2</span><div><strong>Layer Private 5G on New Fiber</strong><br>Every new fiber route is a backhaul opportunity for CBRS/private 5G. Offer ISPs and enterprises a bundled solution: fiber last-mile + private wireless coverage for industrial/campus sites nearby.</div></div>' +
                '<div class="playbook-step"><span class="step-num">3</span><div><strong>Target RDOF Default Areas</strong><br>$3.3B in RDOF defaults left ~1.9M locations unserved. These areas are BEAD-eligible and actively seeking new providers. Toggle the RDOF Defaults layer on the map to find them.</div></div>' +
                '<div class="playbook-step"><span class="step-num">4</span><div><strong>Build Smart City Use Cases</strong><br>Municipalities with new fiber can expand into smart city services: smart traffic, public safety cameras, IoT sensors, EV charging. Pitch the city on a connected infrastructure package.</div></div>' +
                '<div class="playbook-step"><span class="step-num">5</span><div><strong>Stack Multiple Funding Sources</strong><br>Combine BEAD + state programs + E-Rate + Digital Equity. Many projects can draw from 2-3 programs to reduce match requirements and increase total project funding.</div></div>' +
            '</div>' +
        '</div>';

        // Federal Grants Table
        html += '<h4>Federal Grant Programs</h4>' +
            '<div class="funding-table-wrap"><table class="funding-table" id="grants-table">' +
            '<thead><tr>' +
                '<th data-sort="name">Program</th>' +
                '<th data-sort="totalFunding">Funding</th>' +
                '<th data-sort="statusCode">Status</th>' +
                '<th data-sort="type">Type</th>' +
                '<th>Key Date</th>' +
            '</tr></thead><tbody>';

        grants.federal.forEach(function(g) {
            var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
            html += '<tr>' +
                '<td><strong>' + g.name + '</strong><br><span class="funding-agency">' + g.agency + '</span></td>' +
                '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                '<td>' + g.type + '</td>' +
                '<td class="funding-date">' + (g.keyDate || 'TBD') + '</td>' +
            '</tr>';
        });

        html += '</tbody></table></div>';

        // State Grants
        html += '<h4>State Programs</h4>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>State</th><th>Program</th><th>Funding</th><th>Status</th></tr></thead><tbody>';

        Object.keys(grants.state).forEach(function(st) {
            grants.state[st].forEach(function(g) {
                var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td><strong>' + g.name + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                    '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                '</tr>';
            });
        });

        html += '</tbody></table></div></div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * PAST WINNERS
     * ═══════════════════════════════════════════════ */

    renderWinners() {
        var html = '<div class="funding-section">';

        // RDOF Defaults Summary
        var rdof = SN.data.rdofSummary;
        if (rdof) {
            html += '<div class="funding-hero">' +
                '<h3>RDOF Auction Results & Defaults</h3>' +
                '<p>The $9.2B RDOF auction saw $3.3B in defaults — creating massive re-funding opportunities.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.totalAwarded, 'currency') + '</span><span class="fhs-lbl">Total Awarded</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.totalDefaulted, 'currency') + '</span><span class="fhs-lbl">Total Defaulted</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + (rdof.defaultRate * 100).toFixed(0) + '%</span><span class="fhs-lbl">Default Rate</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.defaultedLocations, 'compact') + '</span><span class="fhs-lbl">Locations Stranded</span></div>' +
                '</div>' +
            '</div>';
        }

        // Major Defaulters Table
        var defaults = SN.data.rdofDefaults;
        if (defaults && defaults.length) {
            html += '<h4>Major RDOF Defaulters</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Awardee</th><th>Award</th><th>Locations</th><th>Status</th><th>Reason</th></tr></thead><tbody>';

            defaults.forEach(function(d) {
                html += '<tr>' +
                    '<td><strong>' + d.awardee + '</strong></td>' +
                    '<td class="cell-num">' + (d.award ? SN.kpi.fmt(d.award, 'currency') : 'N/A') + '</td>' +
                    '<td class="cell-num">' + d.locations.toLocaleString() + '</td>' +
                    '<td><span class="funding-status status-closed">' + d.status + '</span></td>' +
                    '<td class="funding-reason">' + d.reason + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        // Past Winners Table
        var winners = SN.data.pastAwards;
        if (winners && winners.length) {
            html += '<h4>Active Award Recipients — Building Now</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Program</th><th>Awardee</th><th>Award</th><th>Locations</th><th>Tech</th><th>Status</th></tr></thead><tbody>';

            winners.forEach(function(w) {
                html += '<tr>' +
                    '<td>' + w.program + '</td>' +
                    '<td><strong>' + w.awardee + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award, 'currency') + '</td>' +
                    '<td class="cell-num">' + w.locations.toLocaleString() + '</td>' +
                    '<td>' + w.technology + '</td>' +
                    '<td>' + w.status + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        // RDOF Defaults by State
        var byState = SN.data.rdofDefaultsByState;
        if (byState) {
            html += '<h4>RDOF Defaults by State</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>State</th><th>Original Award</th><th>Defaulted</th><th>Locations Lost</th><th>Default %</th></tr></thead><tbody>';

            Object.keys(byState).sort().forEach(function(st) {
                var d = byState[st];
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(d.originalAward, 'currency') + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(d.defaultedAmount, 'currency') + '</td>' +
                    '<td class="cell-num">' + d.defaultedLocations.toLocaleString() + '</td>' +
                    '<td class="cell-num"><span class="funding-status status-closed">' + (d.defaultPct * 100).toFixed(0) + '%</span></td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * COMPETITIVE LANDSCAPE
     * ═══════════════════════════════════════════════ */

    renderCompetitive() {
        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Competitive Landscape</h3>' +
                '<p>Who is building where? Know the competitive landscape before you bid.</p>' +
            '</div>';

        // Active Builders
        var winners = SN.data.pastAwards || [];
        if (winners.length) {
            html += '<h4>Active Builders by Region</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Builder</th><th>Program</th><th>Award</th><th>Locations</th><th>Technology</th><th>States</th><th>Status</th></tr></thead><tbody>';

            winners.forEach(function(w) {
                html += '<tr>' +
                    '<td><strong>' + w.awardee + '</strong></td>' +
                    '<td>' + w.program + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award, 'currency') + '</td>' +
                    '<td class="cell-num">' + w.locations.toLocaleString() + '</td>' +
                    '<td>' + w.technology + '</td>' +
                    '<td class="cell-state">' + w.states.join(', ') + '</td>' +
                    '<td>' + w.status + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        // Market Assessment
        html += '<h4>Market Intelligence Summary</h4>' +
            '<div class="competitive-grid">';

        var segments = [
            { name: 'Fiber Incumbents', players: 'AT&T, Lumen, Frontier, Windstream, Consolidated', risk: 'High', note: 'Dominant in urban/suburban. Less competitive in deep rural where BEAD targets.' },
            { name: 'Cable Overbuilders', players: 'Charter, Comcast, Cox, Mediacom', risk: 'Medium', note: 'Strong in suburbs. Rarely bid on rural BEAD subgrants due to ROI.' },
            { name: 'Rural Telcos', players: 'TDS, Shentel, Mid-States, Consolidated Telcom', risk: 'Medium', note: 'Strong local relationships. Often win on community trust. Partner opportunity.' },
            { name: 'Electric Co-ops', players: 'Various (120+ building fiber)', risk: 'High in their territory', note: 'Owning fiber-to-the-home in their service area. Best approached as partners, not competitors.' },
            { name: 'Fixed Wireless (FWA)', players: 'T-Mobile, Verizon FWA, Tarana, Siklu', risk: 'Low for fiber bids', note: 'FWA losing BEAD favor after NTIA fiber-first mandate. But competitive for non-BEAD rural.' },
            { name: 'Satellite', players: 'Starlink, Project Kuiper', risk: 'Low for grants', note: 'FCC rejected Starlink RDOF. Not eligible for most BEAD fiber subgrants.' }
        ];

        segments.forEach(function(s) {
            html += '<div class="competitive-card">' +
                '<div class="competitive-card-header"><strong>' + s.name + '</strong><span class="competitive-risk">' + s.risk + '</span></div>' +
                '<div class="competitive-players">' + s.players + '</div>' +
                '<div class="competitive-note">' + s.note + '</div>' +
            '</div>';
        });

        html += '</div>';

        // Strategic Recommendations
        html += '<h4>Strategic Positioning for System Integrators</h4>' +
            '<div class="playbook-steps">' +
                '<div class="playbook-step"><span class="step-num">A</span><div><strong>Partner with Rural Telcos & Electric Co-ops</strong><br>They have the local trust and franchise rights. You bring engineering, project management, and equipment. Win-win subcontracting arrangements.</div></div>' +
                '<div class="playbook-step"><span class="step-num">B</span><div><strong>Target RDOF Default Zones</strong><br>1.9M locations need a new provider. States are re-assigning these to BEAD. Be first to offer a credible fiber plan for these areas.</div></div>' +
                '<div class="playbook-step"><span class="step-num">C</span><div><strong>Differentiate with Private 5G/CBRS</strong><br>Most bidders offer fiber-only. Add private wireless for industrial/campus sites along your fiber routes. This is a unique value-add that wins RFPs.</div></div>' +
                '<div class="playbook-step"><span class="step-num">D</span><div><strong>Build a Multi-State Presence</strong><br>BEAD is state-administered. Having relationships with multiple state broadband offices lets you follow the funding across borders.</div></div>' +
            '</div>';

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * SCORING EXPLAINED
     * ═══════════════════════════════════════════════ */

    renderScoring() {
        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>How the Opportunity Score Works</h3>' +
                '<p>Each of the 3,100+ US counties receives a composite Funding Opportunity Score (0-100) identifying the best broadband investment targets.</p>' +
            '</div>';

        var w = SN.config.weights;
        var factors = [
            { name: 'Coverage Gap', weight: w.coverageGap, color: '#ef4444', desc: '% of Broadband Serviceable Locations (BSLs) that are underserved or unserved. Higher gap = higher opportunity. Uses sqrt transform to spread the real-data distribution where most counties cluster (5-30%).' },
            { name: 'Unserved %', weight: w.unservedPct, color: '#f97316', desc: '% of BSLs below 25/3 Mbps (FCC definition of "unserved"). These locations are the highest priority for BEAD funding and have the strongest grant eligibility.' },
            { name: 'Funding Eligibility', weight: w.funding, color: '#fbbf24', desc: 'Based on BEAD approval status and unserved BSL concentration. All 50 states are BEAD-approved, so the differentiator is now unserved % — more unserved = more BEAD-eligible locations = more money available.' },
            { name: 'Income Need', weight: w.incomeNeed, color: '#a78bfa', desc: 'Lower median household income means higher grant eligibility and less competition from private capital. Continuous scale: $30K income scores 90, $60K scores 60, $90K scores 30.' },
            { name: 'Population Density', weight: w.popDensity, color: '#38bdf8', desc: 'Sweet spot is 50-200 people/sq mi — dense enough for cost-effective fiber deployment but not so urban that incumbents already serve everyone.' },
            { name: 'Infrastructure Readiness', weight: w.readiness5g, color: '#06d6a0', desc: 'Composite of existing provider count, fiber penetration, and density factors. Higher readiness means easier buildout (existing poles, conduit, backhaul).' }
        ];

        html += '<div class="scoring-factors">';
        factors.forEach(function(f) {
            var pct = Math.round(f.weight * 100);
            html += '<div class="scoring-factor">' +
                '<div class="scoring-factor-header">' +
                    '<span class="scoring-factor-name">' + f.name + '</span>' +
                    '<span class="scoring-factor-weight" style="background:' + f.color + '">' + pct + '%</span>' +
                '</div>' +
                '<div class="scoring-factor-bar"><div class="scoring-factor-fill" style="width:' + pct + '%;background:' + f.color + '"></div></div>' +
                '<p class="scoring-factor-desc">' + f.desc + '</p>' +
            '</div>';
        });
        html += '</div>';

        // Example breakdown for top county
        var counties = SN.data.counties;
        if (counties && counties.length) {
            var top = counties[0]; // already sorted by score
            var breakdown = SN.scoring.getBreakdown(top);
            html += '<h4>Example: ' + top.county + ', ' + top.state + ' (Score: ' + top.opportunityScore + ')</h4>' +
                '<div class="scoring-breakdown">';
            Object.keys(breakdown).forEach(function(key) {
                var b = breakdown[key];
                var label = key === 'coverageGap' ? 'Coverage Gap' :
                            key === 'unservedPct' ? 'Unserved %' :
                            key === 'popDensity' ? 'Pop. Density' :
                            key === 'incomeNeed' ? 'Income Need' :
                            key === 'readiness5g' ? 'Infra. Readiness' :
                            key === 'funding' ? 'Funding Eligibility' : key;
                var weighted = Math.round(b.weight * b.score);
                html += '<div class="breakdown-row">' +
                    '<span class="breakdown-label">' + label + '</span>' +
                    '<span class="breakdown-raw">' + b.score + '/100</span>' +
                    '<span class="breakdown-weight">x ' + (b.weight * 100).toFixed(0) + '%</span>' +
                    '<span class="breakdown-result">= ' + weighted + '</span>' +
                '</div>';
            });
            html += '</div>';
        }

        html += '<div class="scoring-sources">' +
            '<h4>Data Sources</h4>' +
            '<ul>' +
                '<li><strong>BSL / Coverage:</strong> FCC Broadband Data Collection (BDC) — real county-level data for all 3,100+ counties</li>' +
                '<li><strong>Demographics:</strong> US Census ACS 5-Year Estimates (2022) — population, income, poverty</li>' +
                '<li><strong>Funding:</strong> NTIA BEAD Allocations (June 2023) — $42.45B across all states</li>' +
                '<li><strong>CBRS:</strong> FCC ULS Database — PAL license counts and exclusion zones</li>' +
                '<li><strong>Smart Cities:</strong> City government reports, press releases, Smart Cities Council</li>' +
            '</ul>' +
        '</div>';

        html += '</div>';
        return html;
    },

    /**
     * Update funding panel with current data.
     */
    update() {
        this.render();
    }
};
