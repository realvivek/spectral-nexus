/**
 * Spectral Nexus — Map Module
 * Leaflet-based choropleth with layer toggles, popups, and county selection.
 */

window.SN = window.SN || {};

SN.map = {

    leafletMap: null,
    countyLayer: null,
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
                    <span class="popup-score-label">Funding Opportunity Score</span>
                </div>
                <div class="popup-funding">
                    Est. Funding: <strong>${SN.kpi.fmt(county.fundingEstimate, 'currency')}</strong>
                    · BEAD State Alloc: <strong>${SN.kpi.fmt(county.beadStateAllocation, 'currency')}</strong>
                    · Status: <strong>${county.beadStatus}</strong>
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
                        <span class="popup-metric-val">${county.towerCount}</span>
                        <span class="popup-metric-lbl">Providers</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${county.unservedBSLs.toLocaleString()}</span>
                        <span class="popup-metric-lbl">Unserved BSLs</span>
                    </div>
                    <div class="popup-metric">
                        <span class="popup-metric-val">${(county.povertyRate * 100).toFixed(1)}%</span>
                        <span class="popup-metric-lbl">Poverty Rate</span>
                    </div>
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
