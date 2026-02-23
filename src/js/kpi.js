/**
 * Spectral Nexus — KPI Cards
 * Computes and renders the top-level summary metrics.
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

        return {
            countiesAnalyzed: counties.length,
            totalPopulation: totalPop,
            avgUnservedPct: avgUnserved,
            totalFunding: totalFunding,
            avgScore: avgScore,
            topCounty: topCounty,
            totalUnservedBSLs: totalUnservedBSLs
        };
    },

    empty() {
        return {
            countiesAnalyzed: 0, totalPopulation: 0, avgUnservedPct: 0,
            totalFunding: 0, avgScore: 0, topCounty: null, totalUnservedBSLs: 0
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
     * Render KPI cards into the DOM.
     */
    render(counties) {
        const kpi = this.compute(counties);
        const container = document.getElementById('kpi-bar');
        if (!container) return;

        const cards = [
            { label: 'Counties Analyzed', value: kpi.countiesAnalyzed, icon: '◎', cls: 'kpi-neutral' },
            { label: 'Total Population', value: this.fmt(kpi.totalPopulation, 'compact'), icon: '⊚', cls: 'kpi-neutral' },
            { label: 'Avg Unserved', value: this.fmt(kpi.avgUnservedPct, 'pct'), icon: '⚠', cls: kpi.avgUnservedPct > 0.2 ? 'kpi-hot' : 'kpi-warm' },
            { label: 'Unserved Locations', value: this.fmt(kpi.totalUnservedBSLs, 'compact'), icon: '◉', cls: 'kpi-hot' },
            { label: 'Est. Funding Available', value: this.fmt(kpi.totalFunding, 'currency'), icon: '$', cls: 'kpi-accent' },
            { label: 'Top Scoring County', value: kpi.topCounty ? kpi.topCounty.county.replace(' County','').replace(' Parish','') : '—', sub: kpi.topCounty ? kpi.topCounty.state + ' · Score: ' + kpi.topCounty.opportunityScore : '', icon: '★', cls: 'kpi-accent' }
        ];

        container.innerHTML = cards.map((c, i) => `
            <div class="kpi-card ${c.cls}" style="animation-delay: ${i * 60}ms">
                <div class="kpi-icon">${c.icon}</div>
                <div class="kpi-content">
                    <div class="kpi-value">${c.value}</div>
                    <div class="kpi-label">${c.label}</div>
                    ${c.sub ? `<div class="kpi-sub">${c.sub}</div>` : ''}
                </div>
            </div>
        `).join('');
    }
};
