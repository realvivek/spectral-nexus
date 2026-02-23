/**
 * Spectral Nexus — App Controller
 * Main entry point. Wires modules, manages filters and global state.
 */

window.SN = window.SN || {};

SN.state = {
    selectedCounty: null,
    filters: { state: 'all', minScore: 0 },
    choroplethMetric: 'opportunityScore',
    activeTab: 'table'
};

SN.app = {

    init() {
        SN.scoring.computeAll();
        SN.map.init();
        this.buildFilters();
        const all = this.getFilteredData();
        SN.kpi.render(all);
        SN.table.render(all);
        SN.charts.render(all);
        SN.insights.render(all);
        SN.insights.update(all);
        this.bindEvents();
        this.switchTab('table');
        document.body.classList.add('loaded');
        console.log('%c⟡ Spectral Nexus v' + SN.config.version + ' — ' + SN.data.counties.length + ' counties loaded', 'color:#06d6a0;font-weight:bold;font-size:14px');
    },

    buildFilters() {
        var sel = document.getElementById('filter-state');
        if (sel) {
            var states = [];
            var seen = {};
            SN.data.counties.forEach(function(c) { if (!seen[c.state]) { seen[c.state] = true; states.push(c.state); }});
            states.sort();
            sel.innerHTML = '<option value="all">All States</option>' + states.map(function(s) { return '<option value="' + s + '">' + s + '</option>'; }).join('');
        }
        this.updateScoreLabel(0);
    },

    bindEvents() {
        var self = this;

        var stateSelect = document.getElementById('filter-state');
        if (stateSelect) stateSelect.addEventListener('change', function() { self.onFilterChange(); });

        var scoreSlider = document.getElementById('filter-score');
        if (scoreSlider) scoreSlider.addEventListener('input', function(e) {
            self.updateScoreLabel(e.target.value);
            self.onFilterChange();
        });

        var metricSelect = document.getElementById('metric-select');
        if (metricSelect) metricSelect.addEventListener('change', function(e) {
            SN.map.updateChoropleth(e.target.value);
        });

        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.addEventListener('click', function() { self.switchTab(btn.dataset.tab); });
        });

        var resetBtn = document.getElementById('btn-reset');
        if (resetBtn) resetBtn.addEventListener('click', function() { self.resetFilters(); });

        var methClose = document.getElementById('methodology-close');
        if (methClose) methClose.addEventListener('click', function() { self.hideMethodology(); });

        var methOverlay = document.getElementById('methodology-modal');
        if (methOverlay) methOverlay.addEventListener('click', function(e) {
            if (e.target === methOverlay) self.hideMethodology();
        });
    },

    onFilterChange() {
        var stateVal = document.getElementById('filter-state').value;
        var scoreVal = parseInt(document.getElementById('filter-score').value) || 0;
        SN.state.filters.state = stateVal;
        SN.state.filters.minScore = scoreVal;
        var filtered = this.getFilteredData();
        SN.kpi.render(filtered);
        SN.map.update(filtered);
        if (SN.state.activeTab === 'table') SN.table.update(filtered);
        if (SN.state.activeTab === 'charts') SN.charts.update(filtered);
        if (SN.state.activeTab === 'insights') SN.insights.update(filtered);
    },

    getFilteredData() {
        var f = SN.state.filters;
        return SN.data.counties.filter(function(c) {
            if (f.state !== 'all' && c.state !== f.state) return false;
            if (c.opportunityScore < f.minScore) return false;
            return true;
        });
    },

    switchTab(tab) {
        SN.state.activeTab = tab;
        document.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.tab-panel').forEach(function(panel) {
            panel.classList.toggle('active', panel.id === 'panel-' + tab);
        });
        var filtered = this.getFilteredData();
        if (tab === 'table') SN.table.update(filtered);
        if (tab === 'charts') SN.charts.update(filtered);
        if (tab === 'insights') SN.insights.update(filtered);
    },

    updateScoreLabel(val) {
        var lbl = document.getElementById('score-label');
        if (lbl) lbl.textContent = 'Min Score: ' + val;
    },

    resetFilters() {
        document.getElementById('filter-state').value = 'all';
        document.getElementById('filter-score').value = 0;
        SN.state.filters = { state: 'all', minScore: 0 };
        this.updateScoreLabel(0);
        this.onFilterChange();
        SN.map.reset();
        SN.map.updateChoropleth('opportunityScore');
        var metricSelect = document.getElementById('metric-select');
        if (metricSelect) metricSelect.value = 'opportunityScore';
    },

    showMethodology() {
        var modal = document.getElementById('methodology-modal');
        if (modal) modal.classList.add('open');
    },

    hideMethodology() {
        var modal = document.getElementById('methodology-modal');
        if (modal) modal.classList.remove('open');
    }
};

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', function() {
    SN.app.init();
});
