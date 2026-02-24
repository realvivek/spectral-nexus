/**
 * Spectral Nexus — KPI Cards
 * Actionable summary metrics with click-through actions.
 * Each card tells the user what the number means and what to do about it.
 */

window.SN = window.SN || {};

SN.kpi = {

    /**
     * Compute KPI values from filtered dataset.
     */
    compute(counties) {
        if (!counties.length) return this.empty();

        const totalPop = counties.reduce((s, c) => s + c.population, 0);
        const totalFunding = counties.reduce((s, c) => s + c.fundingEstimate, 0);
        const avgUnserved = counties.reduce((s, c) => s + c.unservedPct, 0) / counties.length;
        const avgScore = counties.reduce((s, c) => s + c.opportunityScore, 0) / counties.length;
        const topCounty = counties.reduce((top, c) => c.opportunityScore > top.opportunityScore ? c : top, counties[0]);
        const totalUnservedBSLs = counties.reduce((s, c) => s + c.unservedBSLs, 0);
        const highOppCount = counties.filter(c => c.opportunityScore >= 60).length;
        const beadEligible = counties.filter(c => c.beadStatus === 'Approved' && c.unservedPct > 0.05).length;

        return {
            countiesAnalyzed: counties.length,
            totalPopulation: totalPop,
            avgUnservedPct: avgUnserved,
            totalFunding: totalFunding,
            avgScore: avgScore,
            topCounty: topCounty,
            totalUnservedBSLs: totalUnservedBSLs,
            highOppCount: highOppCount,
            beadEligible: beadEligible
        };
    },

    empty() {
        return {
            countiesAnalyzed: 0, totalPopulation: 0, avgUnservedPct: 0,
            totalFunding: 0, avgScore: 0, topCounty: null, totalUnservedBSLs: 0,
            highOppCount: 0, beadEligible: 0
        };
    },

    /**
     * Format large numbers for display.
     */
    fmt(n, type) {
        if (type === 'currency') {
            if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
            if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
            if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
            return '$' + n;
        }
        if (type === 'compact') {
            if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
            if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
            return n.toString();
        }
        if (type === 'pct') return (n * 100).toFixed(1) + '%';
        if (type === 'score') return Math.round(n).toString();
        return n.toLocaleString();
    },

    /**
     * Render actionable KPI cards into the DOM.
     * Each card includes context on what the metric means and what the user can do.
     */
    render(counties) {
        const kpi = this.compute(counties);
        const container = document.getElementById('kpi-bar');
        if (!container) return;

        const topName = kpi.topCounty ? kpi.topCounty.county.replace(' County','').replace(' Parish','') : '—';
        const topState = kpi.topCounty ? kpi.topCounty.state : '';
        const topFips = kpi.topCounty ? kpi.topCounty.fips : '';

        const cards = [
            {
                value: kpi.highOppCount,
                label: 'High-Opportunity Counties',
                action: 'Score 60+ — click to filter',
                icon: '◎',
                cls: 'kpi-accent',
                clickAction: 'filterHighOpp'
            },
            {
                value: this.fmt(kpi.totalUnservedBSLs, 'compact'),
                label: 'Unserved Locations',
                action: 'BEAD-eligible buildout targets',
                icon: '◉',
                cls: 'kpi-hot',
                clickAction: 'showInsights'
            },
            {
                value: this.fmt(kpi.totalFunding, 'currency'),
                label: 'Available Funding',
                action: 'View grants & BEAD allocations',
                icon: '$',
                cls: 'kpi-accent',
                clickAction: 'showFunding'
            },
            {
                value: kpi.beadEligible,
                label: 'BEAD-Ready Counties',
                action: 'Approved + >5% unserved — bid now',
                icon: '⚡',
                cls: 'kpi-warm',
                clickAction: 'filterBead'
            },
            {
                value: topName,
                label: '#1 Opportunity',
                action: topState + ' · Score ' + (kpi.topCounty ? kpi.topCounty.opportunityScore : 0) + ' — click to view',
                icon: '★',
                cls: 'kpi-accent',
                clickAction: 'flyToTop',
                fips: topFips
            }
        ];

        container.innerHTML = cards.map((c, i) => `
            <div class="kpi-card ${c.cls} kpi-clickable" data-action="${c.clickAction}" ${c.fips ? 'data-fips="' + c.fips + '"' : ''} style="animation-delay: ${i * 60}ms" title="${c.action}">
                <div class="kpi-icon">${c.icon}</div>
                <div class="kpi-content">
                    <div class="kpi-value">${c.value}</div>
                    <div class="kpi-label">${c.label}</div>
                    <div class="kpi-action">${c.action}</div>
                </div>
            </div>
        `).join('');

        this.bindActions();
    },

    /**
     * Bind click actions on KPI cards.
     */
    bindActions() {
        var container = document.getElementById('kpi-bar');
        if (!container) return;

        container.querySelectorAll('.kpi-clickable').forEach(function(card) {
            card.addEventListener('click', function() {
                var action = card.dataset.action;
                switch (action) {
                    case 'filterHighOpp':
                        document.getElementById('filter-score').value = 60;
                        SN.state.filters.minScore = 60;
                        SN.app.updateScoreLabel(60);
                        SN.app.onFilterChange();
                        SN.app.switchTab('table');
                        break;
                    case 'showInsights':
                        SN.app.switchTab('insights');
                        break;
                    case 'showFunding':
                        SN.app.switchTab('funding');
                        break;
                    case 'filterBead':
                        document.getElementById('filter-score').value = 40;
                        SN.state.filters.minScore = 40;
                        SN.app.updateScoreLabel(40);
                        SN.app.onFilterChange();
                        SN.app.switchTab('insights');
                        break;
                    case 'flyToTop':
                        var fips = card.dataset.fips;
                        if (fips) SN.map.flyTo(fips);
                        break;
                }
            });
        });
    }
};
