/**
 * Spectral Nexus — Map Module
 * Leaflet-based choropleth with layer toggles, popups, and county selection.
 */

window.SN = window.SN || {};

SN.map = {

    leafletMap: null,
    countyLayer: null,
    stateLayer: null,
    selectedLayer: null,
    countyLookup: {},  // fips → layer

    /**
     * Initialize the Leaflet map.
     */
    init() {
        const cfg = SN.config.map;

        this.leafletMap = L.map('map-container', {
            center: cfg.center,
            zoom: cfg.zoom,
            minZoom: cfg.minZoom,
            maxZoom: cfg.maxZoom,
            zoomControl: false,
            attributionControl: false
        });

        // Dark basemap
        L.tileLayer(cfg.tileUrl, {
            attribution: cfg.tileAttribution,
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.leafletMap);

        // Zoom control (top-right)
        L.control.zoom({ position: 'topright' }).addTo(this.leafletMap);

        // Attribution (bottom-right, collapsed)
        L.control.attribution({ position: 'bottomright', prefix: '' }).addTo(this.leafletMap);

        // Build county lookup and add layers
        this.buildCountyGeoJSON();
        this.buildStateOutlines();
    },

    /**
     * Generate GeoJSON circles for counties (using centroids).
     * Full polygon GeoJSON would be loaded from file in production.
     * For MVP, we use proportional circles which are performant and visually effective.
     */
    buildCountyGeoJSON() {
        this.countyLookup = {};

        this.countyLayer = L.layerGroup().addTo(this.leafletMap);

        SN.data.counties.forEach(county => {
            const color = this.getColor(county, SN.state.choroplethMetric);
            const radius = this.getRadius(county.population);

            const circle = L.circleMarker([county.lat, county.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.75,
                color: '#06d6a0',
                weight: 1,
                opacity: 0.3
            });

            circle.countyData = county;

            circle.on('click', () => this.selectCounty(county));
            circle.on('mouseover', (e) => {
                e.target.setStyle({ weight: 2, opacity: 0.8, fillOpacity: 0.9 });
                this.showTooltip(e, county);
            });
            circle.on('mouseout', (e) => {
                if (SN.state.selectedCounty !== county.fips) {
                    e.target.setStyle({ weight: 1, opacity: 0.3, fillOpacity: 0.75 });
                }
                this.hideTooltip();
            });

            circle.addTo(this.countyLayer);
            this.countyLookup[county.fips] = circle;
        });
    },

    /**
     * Draw state outlines for all 50 states.
     * Active states get a brighter treatment; inactive get "coming soon" style.
     */
    buildStateOutlines() {
        // We create approximate state center markers for inactive states
        // In production, we'd load a full state boundary GeoJSON
        const inactiveStates = [
            {s:'AL',lt:32.8,ln:-86.8},{s:'AK',lt:64.2,ln:-152.5},{s:'AZ',lt:34.0,ln:-111.1},
            {s:'AR',lt:35.2,ln:-91.8},{s:'CO',lt:39.5,ln:-105.8},{s:'CT',lt:41.6,ln:-72.7},
            {s:'DE',lt:39.0,ln:-75.5},{s:'FL',lt:27.6,ln:-81.5},{s:'HI',lt:19.9,ln:-155.6},
            {s:'ID',lt:44.1,ln:-114.7},{s:'IL',lt:40.6,ln:-89.4},{s:'IN',lt:40.3,ln:-86.1},
            {s:'KS',lt:38.5,ln:-98.8},{s:'KY',lt:37.8,ln:-84.3},{s:'ME',lt:45.3,ln:-69.4},
            {s:'MD',lt:39.0,ln:-76.6},{s:'MA',lt:42.4,ln:-71.4},{s:'MI',lt:44.3,ln:-85.6},
            {s:'MN',lt:46.7,ln:-94.7},{s:'MS',lt:32.3,ln:-89.4},{s:'MO',lt:37.9,ln:-91.8},
            {s:'NE',lt:41.1,ln:-98.3},{s:'NV',lt:38.8,ln:-116.4},{s:'NH',lt:43.2,ln:-71.6},
            {s:'NJ',lt:40.1,ln:-74.5},{s:'NY',lt:43.0,ln:-75.0},{s:'NC',lt:35.8,ln:-79.0},
            {s:'ND',lt:47.5,ln:-100.5},{s:'OK',lt:35.0,ln:-97.1},{s:'OR',lt:43.8,ln:-120.5},
            {s:'PA',lt:41.2,ln:-77.2},{s:'RI',lt:41.6,ln:-71.5},{s:'SD',lt:43.9,ln:-99.4},
            {s:'TN',lt:35.5,ln:-86.6},{s:'UT',lt:39.3,ln:-111.1},{s:'VT',lt:44.0,ln:-72.7},
            {s:'WA',lt:47.8,ln:-120.7},{s:'WV',lt:38.6,ln:-80.6},{s:'WI',lt:43.8,ln:-88.8},
            {s:'WY',lt:43.1,ln:-107.6}
        ].filter(s => !SN.config.activeStates.includes(s.s));

        inactiveStates.forEach(st => {
            const marker = L.circleMarker([st.lt, st.ln], {
                radius: 4,
                fillColor: '#334155',
                fillOpacity: 0.5,
                color: '#475569',
                weight: 1,
                opacity: 0.4
            });
            marker.bindPopup(`
                <div class="popup-inactive">
                    <strong>${st.s}</strong><br>
                    <span class="popup-coming-soon">Data coming in Phase 2</span>
                </div>
            `, { className: 'sn-popup-inactive' });
            marker.addTo(this.leafletMap);
        });
    },

    /**
     * Get choropleth color based on metric value.
     */
    getColor(county, metric) {
        const colors = SN.config.choroplethColors;
        let val;

        switch (metric) {
            case 'opportunityScore': val = county.opportunityScore / 100; break;
            case 'unservedPct': val = Math.min(county.unservedPct / 0.5, 1); break;
            case 'coverageGap': val = Math.min(county.coverageGap / 0.6, 1); break;
            case 'medianIncome': val = 1 - Math.min(county.medianIncome / 120000, 1); break;
            case 'populationDensity': val = Math.min(county.populationDensity / 2000, 1); break;
            case 'fiberAvailPct': val = 1 - county.fiberAvailPct; break;
            default: val = county.opportunityScore / 100;
        }

        const idx = Math.min(colors.length - 1, Math.floor(val * colors.length));
        return colors[idx];
    },

    /**
     * Get circle radius based on population.
     */
    getRadius(pop) {
        if (pop > 1000000) return 18;
        if (pop > 500000) return 14;
        if (pop > 200000) return 11;
        if (pop > 100000) return 9;
        if (pop > 50000) return 7;
        if (pop > 10000) return 5.5;
        return 4;
    },

    /**
     * Select a county — highlight on map, update detail panel.
     */
    selectCounty(county) {
        // Deselect previous
        if (this.selectedLayer) {
            this.selectedLayer.setStyle({ weight: 1, opacity: 0.3, fillOpacity: 0.75, color: '#06d6a0' });
        }

        // Select new
        const layer = this.countyLookup[county.fips];
        if (layer) {
            layer.setStyle({ weight: 3, opacity: 1, fillOpacity: 0.95, color: '#fbbf24' });
            layer.bringToFront();
            this.selectedLayer = layer;
        }

        SN.state.selectedCounty = county.fips;

        // Show popup
        this.showPopup(county);

        // Notify other modules
        if (SN.table && SN.table.highlightRow) SN.table.highlightRow(county.fips);
    },

    /**
     * Show detail popup for a county.
     */
    showPopup(county) {
        const breakdown = SN.scoring.getBreakdown(county);
        const scoreColor = county.opportunityScore >= 70 ? '#06d6a0' :
                          county.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';

        const html = `
            <div class="popup-detail">
                <div class="popup-header">
                    <h3>${county.county}</h3>
                    <span class="popup-state">${county.stateName}</span>
                </div>
                <div class="popup-score" style="color:${scoreColor}">
                    <span class="popup-score-num">${county.opportunityScore}</span>
                    <span class="popup-score-label">Opportunity Score</span>
                </div>
                <div class="popup-grid">
                    <div class="popup-metric">
                        <span class="popup-metric-val">${(county.unservedPct * 100).toFixed(1)}%</span>
                        <span class="popup-metric-lbl">Unserved</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${(county.coverageGap * 100).toFixed(1)}%</span>
                        <span class="popup-metric-lbl">Coverage Gap</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${county.population.toLocaleString()}</span>
                        <span class="popup-metric-lbl">Population</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">$${(county.medianIncome / 1000).toFixed(0)}K</span>
                        <span class="popup-metric-lbl">Median Income</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${(county.fiberAvailPct * 100).toFixed(0)}%</span>
                        <span class="popup-metric-lbl">Fiber Avail.</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${county.readiness5g}</span>
                        <span class="popup-metric-lbl">5G Readiness</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${county.towerCount}</span>
                        <span class="popup-metric-lbl">Cell Towers</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${county.beadStatus}</span>
                        <span class="popup-metric-lbl">BEAD Status</span>
                    </div>
                </div>
                <div class="popup-funding">
                    Est. Funding: <strong>${SN.kpi.fmt(county.fundingEstimate, 'currency')}</strong>
                    · BEAD State Alloc: <strong>${SN.kpi.fmt(county.beadStateAllocation, 'currency')}</strong>
                </div>
            </div>
        `;

        L.popup({ className: 'sn-popup', maxWidth: 360, minWidth: 280 })
            .setLatLng([county.lat, county.lng])
            .setContent(html)
            .openOn(this.leafletMap);
    },

    /**
     * Show hover tooltip.
     */
    showTooltip(e, county) {
        const tip = document.getElementById('map-tooltip');
        if (!tip) return;
        tip.innerHTML = `<strong>${county.county}</strong>, ${county.state} · Score: ${county.opportunityScore}`;
        tip.style.display = 'block';
        tip.style.left = (e.originalEvent.pageX + 15) + 'px';
        tip.style.top = (e.originalEvent.pageY - 10) + 'px';
    },

    hideTooltip() {
        const tip = document.getElementById('map-tooltip');
        if (tip) tip.style.display = 'none';
    },

    /**
     * Update choropleth when metric changes.
     */
    updateChoropleth(metric) {
        SN.state.choroplethMetric = metric;
        this.countyLayer.eachLayer(layer => {
            if (layer.countyData) {
                const color = this.getColor(layer.countyData, metric);
                layer.setStyle({ fillColor: color });
            }
        });
    },

    /**
     * Update map with filtered dataset.
     */
    update(filteredCounties) {
        const filteredFips = new Set(filteredCounties.map(c => c.fips));

        this.countyLayer.eachLayer(layer => {
            if (layer.countyData) {
                const visible = filteredFips.has(layer.countyData.fips);
                layer.setStyle({
                    fillOpacity: visible ? 0.75 : 0.1,
                    opacity: visible ? 0.3 : 0.05
                });
            }
        });
    },

    /**
     * Fly to a county on the map.
     */
    flyTo(fips) {
        const county = SN.data.counties.find(c => c.fips === fips);
        if (county) {
            this.leafletMap.flyTo([county.lat, county.lng], 8, { duration: 0.8 });
            this.selectCounty(county);
        }
    },

    /**
     * Reset map to default view.
     */
    reset() {
        const cfg = SN.config.map;
        this.leafletMap.flyTo(cfg.center, cfg.zoom, { duration: 0.5 });
        if (this.selectedLayer) {
            this.selectedLayer.setStyle({ weight: 1, opacity: 0.3, fillOpacity: 0.75, color: '#06d6a0' });
            this.selectedLayer = null;
        }
        SN.state.selectedCounty = null;
    }
};
