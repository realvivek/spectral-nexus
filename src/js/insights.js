/**
 * Spectral Nexus — Insights Module
 * Funding-focused insights, BEAD status tracker, and grant eligibility analysis.
 */

window.SN = window.SN || {};

SN.insights = {

    /**
     * Render the Insights tab — funding-first ordering.
     */
    render(counties) {
        const container = document.getElementById('insights-container');
        if (!container) return;

        const topOpps = this.topOpportunities(counties);
        const quickWins = this.quickWins(counties);
        const roi = this.roiRanking(counties);
        const underserved = this.mostUnderserved(counties);
        const emerging = this.emergingMarkets(counties);

        container.innerHTML = `
            ${this.renderBeadTracker()}
            ${this.renderSection('★ Top Funding Opportunities', topOpps, 'accent')}
            ${this.renderSection('⚡ Quick Wins — BEAD Eligible', quickWins, 'warm')}
            ${this.renderSection('📈 Best ROI Potential', roi, 'blue')}
            ${this.renderSection('⚠ Most Underserved', underserved, 'hot')}
            ${this.renderSection('🔮 Emerging Markets', emerging, 'purple')}
            ${this.renderMethodologyLink()}
        `;
    },

    renderSection(title, items, theme) {
        if (!items.length) return `
            <div class="insight-section insight-${theme}">
                <h3 class="insight-title">${title}</h3>
                <p class="insight-empty">No counties match this criteria with current filters.</p>
            </div>
        `;

        return `
            <div class="insight-section insight-${theme}">
                <h3 class="insight-title">${title}</h3>
                <div class="insight-list">
                    ${items.map((item, i) => `
                        <div class="insight-item" data-fips="${item.fips}">
                            <span class="insight-rank">${i + 1}</span>
                            <div class="insight-info">
                                <span class="insight-name">${item.name}</span>
                                <span class="insight-detail">${item.detail}</span>
                            </div>
                            <span class="insight-badge" style="background:${item.badgeColor}">${item.badge}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    topOpportunities(counties) {
        return [...counties]
            .sort((a, b) => b.opportunityScore - a.opportunityScore)
            .slice(0, 5)
            .map(c => ({
                fips: c.fips,
                name: `${c.county.replace(' County','').replace(' Parish','')}, ${c.state}`,
                detail: `Est. ${SN.kpi.fmt(c.fundingEstimate,'currency')} · ${(c.coverageGap*100).toFixed(0)}% gap · ${SN.kpi.fmt(c.population,'compact')} pop · BEAD ${c.beadStatus}`,
                badge: c.opportunityScore,
                badgeColor: '#06d6a0'
            }));
    },

    mostUnderserved(counties) {
        const cfg = SN.config.insights;
        return [...counties]
            .filter(c => c.population >= cfg.underservedMinPop)
            .sort((a, b) => b.unservedPct - a.unservedPct)
            .slice(0, 5)
            .map(c => ({
                fips: c.fips,
                name: `${c.county.replace(' County','').replace(' Parish','')}, ${c.state}`,
                detail: `${(c.unservedPct*100).toFixed(1)}% unserved · ${c.unservedBSLs.toLocaleString()} locations without service`,
                badge: (c.unservedPct * 100).toFixed(0) + '%',
                badgeColor: '#ef4444'
            }));
    },

    quickWins(counties) {
        const cfg = SN.config.insights.quickWin;
        return counties
            .filter(c =>
                c.opportunityScore >= cfg.minScore &&
                c.population >= cfg.minPop &&
                c.population <= cfg.maxPop &&
                c.unservedPct >= cfg.minUnserved &&
                (!cfg.requireApproved || c.beadStatus === 'Approved')
            )
            .sort((a, b) => b.opportunityScore - a.opportunityScore)
            .slice(0, 5)
            .map(c => ({
                fips: c.fips,
                name: `${c.county.replace(' County','').replace(' Parish','')}, ${c.state}`,
                detail: `High score + moderate pop + BEAD funded · Est: ${SN.kpi.fmt(c.fundingEstimate,'currency')}`,
                badge: '⚡ ' + c.opportunityScore,
                badgeColor: '#fbbf24'
            }));
    },

    roiRanking(counties) {
        return [...counties]
            .filter(c => c.fundingEstimate > 0 && c.population > 5000)
            .map(c => ({
                ...c,
                roi: c.opportunityScore / (c.fundingEstimate / c.population)
            }))
            .sort((a, b) => b.roi - a.roi)
            .slice(0, 5)
            .map(c => ({
                fips: c.fips,
                name: `${c.county.replace(' County','').replace(' Parish','')}, ${c.state}`,
                detail: `Score ${c.opportunityScore} · ${SN.kpi.fmt(c.fundingEstimate,'currency')} for ${SN.kpi.fmt(c.population,'compact')} people`,
                badge: 'ROI ' + c.roi.toFixed(1),
                badgeColor: '#38bdf8'
            }));
    },

    emergingMarkets(counties) {
        const cfg = SN.config.insights.emerging;
        return counties
            .filter(c =>
                c.opportunityScore >= cfg.minScore &&
                c.populationDensity >= cfg.minDensity &&
                c.populationDensity <= cfg.maxDensity &&
                c.fiberAvailPct < cfg.maxFiber
            )
            .sort((a, b) => b.opportunityScore - a.opportunityScore)
            .slice(0, 5)
            .map(c => ({
                fips: c.fips,
                name: `${c.county.replace(' County','').replace(' Parish','')}, ${c.state}`,
                detail: `Moderate density (${c.populationDensity}/sq mi) · Low fiber (${(c.fiberAvailPct*100).toFixed(0)}%) · Growing market`,
                badge: '🔮 ' + c.opportunityScore,
                badgeColor: '#a78bfa'
            }));
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
            return `
                <tr>
                    <td>${s}</td>
                    <td><span class="bead-badge ${statusClass}">${st}</span></td>
                    <td class="cell-num">${SN.kpi.fmt(al, 'currency')}</td>
                    <td class="cell-num">${st === 'Approved' ? 'Q2-Q3 2026' : 'TBD'}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="insight-section insight-bead">
                <h3 class="insight-title">📡 BEAD Program Tracker</h3>
                <p class="bead-context">The $42.45B BEAD program is the largest broadband funding initiative in US history. All 50 states have Final Proposals approved. Construction timelines are being set — the funding window is open.</p>
                <table class="bead-table">
                    <thead>
                        <tr><th>State</th><th>Status</th><th>Allocation</th><th>Est. Construction</th></tr>
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
                    ℹ View Scoring Methodology & Data Sources
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
