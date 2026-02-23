/**
 * Spectral Nexus — Table Module
 * Sortable, filterable table with row-click → map highlight.
 */

window.SN = window.SN || {};

SN.table = {

    sortCol: 'opportunityScore',
    sortDir: 'desc',
    currentData: [],

    columns: [
        { key: 'opportunityScore', label: 'Score', fmt: 'score', width: '65px' },
        { key: 'state', label: 'State', fmt: 'text', width: '55px' },
        { key: 'county', label: 'County', fmt: 'county', width: '150px' },
        { key: 'population', label: 'Population', fmt: 'compact', width: '90px' },
        { key: 'coverageGap', label: 'Coverage Gap', fmt: 'pct', width: '95px' },
        { key: 'unservedPct', label: 'Unserved %', fmt: 'pct', width: '85px' },
        { key: 'fiberAvailPct', label: 'Fiber Avail.', fmt: 'pct', width: '85px' },
        { key: 'medianIncome', label: 'Med. Income', fmt: 'currency', width: '95px' },
        { key: 'fundingEstimate', label: 'Est. Funding', fmt: 'bigcurrency', width: '95px' },
        { key: 'readiness5g', label: '5G Ready', fmt: 'score', width: '70px' },
        { key: 'crimeIndex', label: 'Crime Idx', fmt: 'score', width: '75px' },
        { key: 'towerCount', label: 'Towers', fmt: 'number', width: '65px' }
    ],

    /**
     * Render the full table.
     */
    render(counties) {
        this.currentData = counties;
        const container = document.getElementById('table-container');
        if (!container) return;

        const sorted = this.sort(counties);

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="sn-table">
                    <thead>
                        <tr>
                            ${this.columns.map(col => `
                                <th class="sortable ${this.sortCol === col.key ? 'sorted-' + this.sortDir : ''}"
                                    data-col="${col.key}" style="width:${col.width}">
                                    ${col.label}
                                    <span class="sort-arrow">${this.sortCol === col.key ? (this.sortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${sorted.map(c => `
                            <tr data-fips="${c.fips}" class="${SN.state.selectedCounty === c.fips ? 'row-selected' : ''}">
                                <td><span class="score-badge" style="background:${this.getScoreColor(c.opportunityScore)}">${c.opportunityScore}</span></td>
                                <td class="cell-state">${c.state}</td>
                                <td class="cell-county" title="${c.county}">${c.county.replace(' County','').replace(' Parish','').replace(' City','')}</td>
                                <td class="cell-num">${this.fmtVal(c.population, 'compact')}</td>
                                <td class="cell-num">${this.fmtBar(c.coverageGap, 'gap')}</td>
                                <td class="cell-num">${this.fmtBar(c.unservedPct, 'unserved')}</td>
                                <td class="cell-num">${this.fmtBar(c.fiberAvailPct, 'fiber')}</td>
                                <td class="cell-num">$${(c.medianIncome / 1000).toFixed(0)}K</td>
                                <td class="cell-num">${SN.kpi.fmt(c.fundingEstimate, 'currency')}</td>
                                <td class="cell-num"><span class="readiness-badge r5g-${Math.floor(c.readiness5g/25)}">${c.readiness5g}</span></td>
                                <td class="cell-num">${c.crimeIndex}</td>
                                <td class="cell-num">${c.towerCount}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="table-footer">
                Showing ${sorted.length} of ${SN.data.counties.length} counties
            </div>
        `;

        // Attach event listeners
        container.querySelectorAll('th.sortable').forEach(th => {
            th.addEventListener('click', () => this.onSort(th.dataset.col));
        });

        container.querySelectorAll('tbody tr').forEach(tr => {
            tr.addEventListener('click', () => {
                const fips = tr.dataset.fips;
                SN.map.flyTo(fips);
            });
        });
    },

    /**
     * Sort data by column.
     */
    sort(data) {
        return [...data].sort((a, b) => {
            let va = a[this.sortCol];
            let vb = b[this.sortCol];
            if (typeof va === 'string') {
                return this.sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            return this.sortDir === 'asc' ? va - vb : vb - va;
        });
    },

    onSort(col) {
        if (this.sortCol === col) {
            this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortCol = col;
            this.sortDir = 'desc';
        }
        this.render(this.currentData);
    },

    /**
     * Format a value for display.
     */
    fmtVal(val, fmt) {
        if (fmt === 'compact') return SN.kpi.fmt(val, 'compact');
        if (fmt === 'pct') return (val * 100).toFixed(1) + '%';
        if (fmt === 'currency') return '$' + val.toLocaleString();
        return val;
    },

    /**
     * Render an inline bar for percentage values.
     */
    fmtBar(val, type) {
        const pct = Math.round(val * 100);
        let color;
        if (type === 'fiber') {
            color = val > 0.5 ? '#06d6a0' : val > 0.25 ? '#fbbf24' : '#ef4444';
        } else {
            color = val > 0.3 ? '#ef4444' : val > 0.15 ? '#fbbf24' : '#06d6a0';
        }
        return `<div class="inline-bar"><div class="inline-bar-fill" style="width:${Math.min(pct, 100)}%;background:${color}"></div><span>${pct}%</span></div>`;
    },

    /**
     * Get score badge color.
     */
    getScoreColor(score) {
        if (score >= 75) return '#06d6a0';
        if (score >= 55) return '#38bdf8';
        if (score >= 40) return '#fbbf24';
        return '#ef4444';
    },

    /**
     * Highlight a specific row.
     */
    highlightRow(fips) {
        document.querySelectorAll('.sn-table tbody tr').forEach(tr => {
            tr.classList.toggle('row-selected', tr.dataset.fips === fips);
        });
        // Scroll into view
        const row = document.querySelector(`tr[data-fips="${fips}"]`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    /**
     * Update table with new filtered data.
     */
    update(counties) {
        this.render(counties);
    }
};
