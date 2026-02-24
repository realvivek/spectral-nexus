/**
 * Spectral Nexus — Insights Module (Revamped)
 * Actionable intelligence with specific next steps, contact info,
 * and funding amounts for each insight category.
 */

window.SN = window.SN || {};

SN.insights = {

    /**
     * Render the Insights tab — actionable, funding-first intelligence.
     */
    render(counties) {
        const container = document.getElementById('insights-container');
        if (!container) return;

        container.innerHTML = `
            ${this.renderBeadUrgency(counties)}
            ${this.renderTopTargets(counties)}
            ${this.renderQuickWinPlaybook(counties)}
            ${this.renderCoopPartnerships(counties)}
            ${this.renderRdofRecapture(counties)}
            ${this.renderTribalOpportunities()}
            ${this.renderBeadTracker()}
            ${this.renderMethodologyLink()}
        `;
    },

    /**
     * BEAD Urgency Banner — what's happening NOW.
     */
    renderBeadUrgency(counties) {
        var beadApproved = counties.filter(function(c) { return c.beadStatus === 'Approved'; });
        var highGap = beadApproved.filter(function(c) { return c.unservedPct > 0.15; });
        var totalFunding = beadApproved.reduce(function(s, c) { return s + c.fundingEstimate; }, 0);

        return '<div class="insight-section insight-bead insight-urgency">' +
            '<h3 class="insight-title">BEAD Subgrant Window Open</h3>' +
            '<div class="insight-urgency-grid">' +
                '<div class="insight-urgency-stat">' +
                    '<span class="urgency-val">' + beadApproved.length + '</span>' +
                    '<span class="urgency-lbl">Counties BEAD-Approved</span>' +
                '</div>' +
                '<div class="insight-urgency-stat">' +
                    '<span class="urgency-val">' + SN.kpi.fmt(totalFunding, 'currency') + '</span>' +
                    '<span class="urgency-lbl">Funding Available</span>' +
                '</div>' +
                '<div class="insight-urgency-stat">' +
                    '<span class="urgency-val">' + highGap.length + '</span>' +
                    '<span class="urgency-lbl">High-Gap (>15%) Ready</span>' +
                '</div>' +
            '</div>' +
            '<div class="insight-action-box">' +
                '<strong>Next Step:</strong> States are opening BEAD subgrant applications now. ' +
                'Filter to your target state, identify >15% unserved counties, and contact the state broadband office to register as a qualified bidder. ' +
                'Click any county on the map to see the state broadband director\'s contact info.' +
            '</div>' +
        '</div>';
    },

    /**
     * Top Targets — ranked by opportunity with specific action items.
     */
    renderTopTargets(counties) {
        var sorted = counties.slice().sort(function(a, b) { return b.opportunityScore - a.opportunityScore; });
        var top = sorted.slice(0, 8);

        if (!top.length) return '';

        var rows = top.map(function(c, i) {
            var scoreColor = c.opportunityScore >= 70 ? '#06d6a0' :
                            c.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';
            var name = c.county.replace(' County','').replace(' Parish','');

            // Get state director if available
            var directorInfo = '';
            if (SN.decisionMakers) {
                var director = SN.decisionMakers.getStateDirector(c.state);
                if (director) {
                    directorInfo = '<span class="insight-contact-hint">Contact: ' + director.name + ' (' + director.agency + ')</span>';
                }
            }

            return '<div class="insight-item" data-fips="' + c.fips + '">' +
                '<span class="insight-rank">' + (i + 1) + '</span>' +
                '<div class="insight-info">' +
                    '<span class="insight-name">' + name + ', ' + c.state + '</span>' +
                    '<span class="insight-detail">' +
                        SN.kpi.fmt(c.fundingEstimate, 'currency') + ' est. funding · ' +
                        (c.unservedPct * 100).toFixed(0) + '% unserved · ' +
                        c.unservedBSLs.toLocaleString() + ' BSLs · ' +
                        SN.kpi.fmt(c.population, 'compact') + ' pop' +
                    '</span>' +
                    directorInfo +
                '</div>' +
                '<span class="insight-badge" style="background:' + scoreColor + '">' + c.opportunityScore + '</span>' +
            '</div>';
        }).join('');

        return '<div class="insight-section insight-accent">' +
            '<h3 class="insight-title">Top Deployment Targets</h3>' +
            '<p class="insight-context">Highest composite scores combining coverage gap, funding eligibility, population density, and 5G readiness. Click to view on map with full contact details.</p>' +
            '<div class="insight-list">' + rows + '</div>' +
        '</div>';
    },

    /**
     * Quick Win Playbook — specific BEAD-eligible counties with actionable steps.
     */
    renderQuickWinPlaybook(counties) {
        var cfg = SN.config.insights.quickWin;
        var wins = counties.filter(function(c) {
            return c.opportunityScore >= cfg.minScore &&
                   c.population >= cfg.minPop &&
                   c.population <= cfg.maxPop &&
                   c.unservedPct >= cfg.minUnserved &&
                   c.beadStatus === 'Approved';
        }).sort(function(a, b) { return b.opportunityScore - a.opportunityScore; }).slice(0, 5);

        if (!wins.length) {
            return '<div class="insight-section insight-warm">' +
                '<h3 class="insight-title">Quick Win Targets</h3>' +
                '<p class="insight-empty">No Quick Win counties match current filters. Try lowering the minimum score or broadening state selection.</p>' +
            '</div>';
        }

        var rows = wins.map(function(c, i) {
            var name = c.county.replace(' County','').replace(' Parish','');
            return '<div class="insight-item insight-item-win" data-fips="' + c.fips + '">' +
                '<span class="insight-rank">' + (i + 1) + '</span>' +
                '<div class="insight-info">' +
                    '<span class="insight-name">' + name + ', ' + c.state + '</span>' +
                    '<span class="insight-detail">' +
                        'Score ' + c.opportunityScore + ' · BEAD Approved · ' +
                        SN.kpi.fmt(c.fundingEstimate, 'currency') + ' · ' +
                        SN.kpi.fmt(c.population, 'compact') + ' pop · ' +
                        (c.fiberAvailPct * 100).toFixed(0) + '% fiber today' +
                    '</span>' +
                    '<span class="insight-why">Why: Moderate pop + high gap + BEAD funded = fast deployment, strong ROI</span>' +
                '</div>' +
                '<span class="insight-badge" style="background:#fbbf24">' + c.opportunityScore + '</span>' +
            '</div>';
        }).join('');

        return '<div class="insight-section insight-warm">' +
            '<h3 class="insight-title">Quick Win Targets</h3>' +
            '<p class="insight-context">BEAD-approved counties with high scores and manageable population sizes — the ideal first projects to pursue. Moderate cost-per-BSL with strong funding backing.</p>' +
            '<div class="insight-list">' + rows + '</div>' +
            '<div class="insight-action-box">' +
                '<strong>Playbook:</strong> 1) Contact state broadband office for subgrant timeline. ' +
                '2) Partner with local electric co-op for middle-mile access. ' +
                '3) Prepare letter of intent with cost-per-BSL under $10K.' +
            '</div>' +
        '</div>';
    },

    /**
     * Electric Co-op Partnership Opportunities.
     */
    renderCoopPartnerships(counties) {
        if (!SN.data.coopDecisionMakers || !SN.data.coopDecisionMakers.length) return '';

        var coops = SN.data.coopDecisionMakers;
        var buildingCoops = coops.filter(function(c) { return c.fiberStatus === 'Building'; });

        var rows = buildingCoops.slice(0, 6).map(function(coop) {
            return '<div class="insight-item">' +
                '<div class="insight-info">' +
                    '<span class="insight-name">' + coop.name + ' (' + coop.state + ')</span>' +
                    '<span class="insight-detail">' +
                        coop.members.toLocaleString() + ' members · ' +
                        coop.milesPlanned.toLocaleString() + ' mi planned · ' +
                        coop.fiberStatus +
                    '</span>' +
                    '<span class="insight-contact-hint">Contact: ' + coop.contact + ' · ' + coop.phone + '</span>' +
                '</div>' +
                '<span class="insight-badge" style="background:#a78bfa">CO-OP</span>' +
            '</div>';
        }).join('');

        return '<div class="insight-section insight-purple">' +
            '<h3 class="insight-title">Electric Co-op Partners — Building Fiber Now</h3>' +
            '<p class="insight-context">' + buildingCoops.length + ' electric co-ops are actively building fiber networks. They need system integrators for OSP construction, splicing, and network design. These are active RFP opportunities.</p>' +
            '<div class="insight-list">' + rows + '</div>' +
            '<div class="insight-action-box">' +
                '<strong>SI Opportunity:</strong> Co-ops building fiber need turn-key construction partners. Contact the broadband VP/GM directly. Most co-ops issue RFPs through NRECA\'s procurement platform.' +
            '</div>' +
        '</div>';
    },

    /**
     * RDOF Default Recapture Opportunities.
     */
    renderRdofRecapture(counties) {
        if (!SN.data.rdofDefaults || !SN.data.rdofDefaults.length) return '';

        var defaults = SN.data.rdofDefaults.slice(0, 5);
        var totalDefaulted = SN.data.rdofDefaults.reduce(function(s, d) { return s + (d.award || 0); }, 0);

        var rows = defaults.map(function(d) {
            return '<div class="insight-item">' +
                '<div class="insight-info">' +
                    '<span class="insight-name">' + d.awardee + '</span>' +
                    '<span class="insight-detail">' +
                        d.locations.toLocaleString() + ' locations · ' +
                        (d.award ? SN.kpi.fmt(d.award, 'currency') : 'N/A') + ' award · ' +
                        'Status: ' + d.status +
                    '</span>' +
                    '<span class="insight-why">Reason: ' + d.reason + '</span>' +
                '</div>' +
                '<span class="insight-badge" style="background:#ef4444">DEFAULT</span>' +
            '</div>';
        }).join('');

        return '<div class="insight-section insight-hot">' +
            '<h3 class="insight-title">RDOF Default Zones — Recapture Opportunities</h3>' +
            '<p class="insight-context">' + SN.kpi.fmt(totalDefaulted, 'currency') + ' in RDOF awards were defaulted or rejected. These ' + SN.data.rdofDefaults.reduce(function(s, d) { return s + d.locations; }, 0).toLocaleString() + ' locations are now BEAD-eligible priority targets with proven demand.</p>' +
            '<div class="insight-list">' + rows + '</div>' +
            '<div class="insight-action-box">' +
                '<strong>Strategy:</strong> RDOF default areas get priority scoring in BEAD subgrant applications. Reference the default in your bid as evidence of unmet need. Contact the state broadband office to confirm re-allocation status.' +
            '</div>' +
        '</div>';
    },

    /**
     * Tribal Broadband Opportunities.
     */
    renderTribalOpportunities() {
        if (!SN.data.tribalDecisionMakers || !SN.data.tribalDecisionMakers.length) return '';

        var tribal = SN.data.tribalDecisionMakers;
        var totalHouseholds = tribal.reduce(function(s, t) { return s + t.unservedHouseholds; }, 0);
        var totalFunding = tribal.reduce(function(s, t) { return s + t.fundingReceived; }, 0);

        var rows = tribal.slice(0, 5).map(function(t) {
            return '<div class="insight-item">' +
                '<div class="insight-info">' +
                    '<span class="insight-name">' + t.tribe + ' (' + t.region + ')</span>' +
                    '<span class="insight-detail">' +
                        t.unservedHouseholds.toLocaleString() + ' unserved households · ' +
                        SN.kpi.fmt(t.fundingReceived, 'currency') + ' funded · ' +
                        t.program +
                    '</span>' +
                    '<span class="insight-contact-hint">Contact: ' + t.contact + ' · ' + t.phone + '</span>' +
                '</div>' +
                '<span class="insight-badge" style="background:#06d6a0">TRIBAL</span>' +
            '</div>';
        }).join('');

        return '<div class="insight-section insight-accent">' +
            '<h3 class="insight-title">Tribal Broadband — Active Programs</h3>' +
            '<p class="insight-context">' + totalHouseholds.toLocaleString() + ' unserved tribal households with ' + SN.kpi.fmt(totalFunding, 'currency') + ' in active funding. Tribal programs have separate NTIA TBCP funding streams and prefer certified MBE/tribal enterprise partners.</p>' +
            '<div class="insight-list">' + rows + '</div>' +
            '<div class="insight-action-box">' +
                '<strong>Approach:</strong> Tribal broadband requires cultural competency and sovereignty awareness. Partner with tribal telecom entities rather than bidding directly. TBCP Phase III applications expected Q2 2026.' +
            '</div>' +
        '</div>';
    },

    /**
     * BEAD Status Tracker — state-level.
     */
    renderBeadTracker() {
        const states = SN.config.activeStates;
        const alloc = SN.config.beadAllocations;
        const status = SN.config.beadStatus;

        const rows = states.map(s => {
            const st = status[s] || 'Unknown';
            const al = alloc[s] || 0;
            const statusClass = st === 'Approved' ? 'bead-approved' : st === 'Pending' ? 'bead-pending' : 'bead-unknown';

            // Get state director if available
            var directorName = '—';
            if (SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[s]) {
                directorName = SN.data.stateDecisionMakers[s].name;
            }

            return `
                <tr>
                    <td>${s}</td>
                    <td><span class="bead-badge ${statusClass}">${st}</span></td>
                    <td class="cell-num">${SN.kpi.fmt(al, 'currency')}</td>
                    <td class="cell-num">${st === 'Approved' ? 'Q2-Q3 2026' : 'TBD'}</td>
                    <td class="bead-director">${directorName}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="insight-section insight-bead">
                <h3 class="insight-title">BEAD Program Tracker by State</h3>
                <p class="bead-context">$42.45B across all states. Construction timelines are being set. Click a state in the filter to see its specific allocation and broadband director contact.</p>
                <table class="bead-table">
                    <thead>
                        <tr><th>State</th><th>Status</th><th>Allocation</th><th>Est. Timeline</th><th>Director</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    renderMethodologyLink() {
        return `
            <div class="insight-methodology">
                <button id="btn-methodology" class="btn-methodology" onclick="SN.app.showMethodology()">
                    View Scoring Methodology & Data Sources
                </button>
            </div>
        `;
    },

    /**
     * Update insights with new filtered data.
     */
    update(counties) {
        this.render(counties);

        // Attach click handlers on insight items
        document.querySelectorAll('.insight-item[data-fips]').forEach(el => {
            el.addEventListener('click', () => {
                SN.map.flyTo(el.dataset.fips);
            });
        });
    }
};
