/**
 * Spectral Nexus — App Controller
 * Main entry point. Wires modules, manages filters and global state.
 */

window.SN = window.SN || {};

SN.state = {
    selectedCounty: null,
    filters: { state: 'all', minScore: 0, lensFilter: null },
    choroplethMetric: 'opportunityScore',
    activeTab: 'table',
    theme: 'dark'
};

SN.app = {

    init() {
        // Restore saved theme before making visible
        var savedTheme = localStorage.getItem('sn-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            SN.state.theme = 'light';
        }

        // Always make page visible and bind core UI first
        document.body.classList.add('loaded');

        // Bind executive and onboarding buttons early so they work
        // even if map/scoring fails
        try { SN.executive.init(); } catch(e) { console.error('Executive init failed:', e); }
        try { SN.onboarding.init(); } catch(e) { console.error('Onboarding init failed:', e); }

        // Scoring, map, layers — wrap each so one failure doesn't block others
        try { SN.scoring.computeAll(); } catch(e) { console.error('Scoring failed:', e); }
        try { SN.map.init(); } catch(e) { console.error('Map init failed:', e); }
        try { SN.layers.init(); } catch(e) { console.error('Layers init failed:', e); }

        this.buildFilters();
        var all = this.getFilteredData();
        try { SN.kpi.render(all); } catch(e) { console.error('KPI render failed:', e); }
        try { SN.table.render(all); } catch(e) { console.error('Table render failed:', e); }
        try { SN.charts.render(all); } catch(e) { console.error('Charts render failed:', e); }
        try { SN.insights.render(all); } catch(e) { console.error('Insights render failed:', e); }
        try { SN.insights.update(all); } catch(e) { console.error('Insights update failed:', e); }
        try { SN.funding.init(); } catch(e) { console.error('Funding init failed:', e); }

        // Enhanced UI — new features (dashboard, modals, rolodex, etc.)
        try { SN.enhancedUI.init(); } catch(e) { console.error('EnhancedUI init failed:', e); }

        this.bindEvents();
        this.switchTab('table');
        console.log('%c⟡ Spectral Nexus v' + SN.config.version + ' — ' + SN.data.counties.length + ' counties + ' + (SN.data.smartCities ? SN.data.smartCities.length : 0) + ' smart cities loaded', 'color:#06d6a0;font-weight:bold;font-size:14px');
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
        if (stateSelect) stateSelect.addEventListener('change', function() {
            // Clear lens when user manually changes filters
            if (SN.enhancedUI && SN.enhancedUI.activeLens) {
                SN.enhancedUI.activeLens = null;
                SN.state.filters.lensFilter = null;
                SN.enhancedUI.initFilterLenses();
            }
            self.onFilterChange();
        });

        var scoreSlider = document.getElementById('filter-score');
        if (scoreSlider) scoreSlider.addEventListener('input', function(e) {
            // Clear lens when user manually changes filters
            if (SN.enhancedUI && SN.enhancedUI.activeLens) {
                SN.enhancedUI.activeLens = null;
                SN.state.filters.lensFilter = null;
                SN.enhancedUI.initFilterLenses();
            }
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

        var themeBtn = document.getElementById('btn-theme');
        if (themeBtn) {
            // Update button label to match current theme
            if (SN.state.theme === 'light') {
                themeBtn.innerHTML = '<span class="theme-toggle-icon">&#9728;</span> Light';
            }
            themeBtn.addEventListener('click', function() { self.toggleTheme(); });
        }

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
        try { SN.map.update(filtered); } catch(e) {}
        if (SN.state.activeTab === 'table') SN.table.update(filtered);
        if (SN.state.activeTab === 'charts') SN.charts.update(filtered);
        if (SN.state.activeTab === 'insights') SN.insights.update(filtered);
        if (SN.state.activeTab === 'funding') SN.funding.update();
    },

    getFilteredData() {
        var f = SN.state.filters;
        return SN.data.counties.filter(function(c) {
            if (f.state !== 'all' && c.state !== f.state) return false;
            if (c.opportunityScore < f.minScore) return false;
            // Smart filter lens
            if (f.lensFilter && typeof f.lensFilter === 'function') {
                if (!f.lensFilter(c)) return false;
            }
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
        if (tab === 'funding') SN.funding.update();
    },

    updateScoreLabel(val) {
        var lbl = document.getElementById('score-label');
        if (lbl) lbl.textContent = 'Min Score: ' + val;
    },

    resetFilters() {
        document.getElementById('filter-state').value = 'all';
        document.getElementById('filter-score').value = 0;
        SN.state.filters = { state: 'all', minScore: 0, lensFilter: null };
        this.updateScoreLabel(0);
        // Clear lens
        try { if (SN.enhancedUI) { SN.enhancedUI.activeLens = null; SN.enhancedUI.initFilterLenses(); } } catch(e) {}
        this.onFilterChange();
        try { SN.map.reset(); } catch(e) {}
        try { SN.map.updateChoropleth('opportunityScore'); } catch(e) {}
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
    },

    toggleTheme() {
        var isLight = document.body.classList.toggle('light-mode');
        SN.state.theme = isLight ? 'light' : 'dark';
        localStorage.setItem('sn-theme', SN.state.theme);

        // Update toggle button
        var btn = document.getElementById('btn-theme');
        if (btn) {
            btn.innerHTML = isLight
                ? '<span class="theme-toggle-icon">&#9728;</span> Light'
                : '<span class="theme-toggle-icon">&#9790;</span> Dark';
        }

        // Swap map tiles
        try {
            var map = SN.map.leafletMap;
            var cfg = SN.config.map;
            if (map && SN.map.tileLayer) {
                map.removeLayer(SN.map.tileLayer);
                SN.map.tileLayer = L.tileLayer(
                    isLight ? cfg.tileUrlLight : cfg.tileUrl,
                    { attribution: cfg.tileAttribution, subdomains: 'abcd', maxZoom: 19 }
                ).addTo(map);
            }
        } catch(e) { console.error('Tile swap failed:', e); }

        // Re-render charts with new color scheme
        try {
            var filtered = this.getFilteredData();
            SN.charts.render(filtered);
        } catch(e) { console.error('Chart re-render failed:', e); }
    }
};

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', function() {
    SN.app.init();
});
