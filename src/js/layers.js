/**
 * Spectral Nexus — Map Layers Module
 * Manages toggleable overlay layers: CBRS, Cellular Gaps, Fiber, Grants, Smart Cities, RDOF Defaults.
 * Organized into categories with larger, clearer toggle buttons.
 */

window.SN = window.SN || {};

SN.layers = {

    /* Layer groups */
    groups: {},
    visible: {},

    /* Layer definitions — organized into categories */
    categories: [
        {
            name: 'Spectrum & Coverage',
            layers: [
                { id: 'cbrs',       label: 'CBRS / Private 5G',       icon: '5G', color: '#a78bfa', defaultOn: false },
                { id: 'cellular',   label: 'Cellular Gaps',            icon: 'RF', color: '#ef4444', defaultOn: false }
            ]
        },
        {
            name: 'Infrastructure',
            layers: [
                { id: 'fiber',      label: 'Fiber Routes',             icon: 'FB', color: '#06d6a0', defaultOn: false },
                { id: 'grants',     label: 'Fiber Grants',             icon: '$F', color: '#fbbf24', defaultOn: false }
            ]
        },
        {
            name: 'Programs & Funding',
            layers: [
                { id: 'smartcities',label: 'Smart Cities',             icon: 'SC', color: '#38bdf8', defaultOn: false },
                { id: 'rdof',       label: 'RDOF Defaults',            icon: 'RD', color: '#f97316', defaultOn: false }
            ]
        }
    ],

    /* Flat list for internal use */
    _allDefs: function() {
        var defs = [];
        this.categories.forEach(function(cat) {
            cat.layers.forEach(function(l) { defs.push(l); });
        });
        return defs;
    },

    /**
     * Initialize all layers and build toggle panel.
     */
    init() {
        var map = SN.map.leafletMap;
        if (!map) return;

        var allDefs = this._allDefs();
        allDefs.forEach(function(def) {
            SN.layers.groups[def.id] = L.layerGroup();
            SN.layers.visible[def.id] = def.defaultOn;
            if (def.defaultOn) {
                SN.layers.groups[def.id].addTo(map);
            }
        });

        this.buildCBRSLayer();
        this.buildCellularLayer();
        this.buildFiberLayer();
        this.buildGrantsLayer();
        this.buildSmartCitiesLayer();
        this.buildRDOFLayer();
        this.renderTogglePanel();
    },

    /**
     * Build CBRS/Private 5G zone circles.
     */
    buildCBRSLayer() {
        var group = this.groups.cbrs;
        if (!SN.data.cbrsZones) return;

        SN.data.cbrsZones.forEach(function(zone) {
            var radiusMeters = zone.radius * 1000;
            var fillColor = zone.tier === 'Tier 1' ? '#a78bfa' :
                            zone.tier === 'Tier 2' ? '#8b5cf6' : '#7c3aed';
            var fillOpacity = zone.incumbentExclusion ? 0.08 : 0.15;

            var circle = L.circle([zone.lat, zone.lng], {
                radius: radiusMeters,
                fillColor: fillColor,
                fillOpacity: fillOpacity,
                color: fillColor,
                weight: 1.5,
                opacity: 0.5,
                dashArray: zone.incumbentExclusion ? '6,4' : null
            });

            var popupHtml = '<div class="layer-popup cbrs-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#a78bfa">5G</span>' +
                    '<div>' +
                        '<h4>' + zone.name + '</h4>' +
                        '<span class="layer-popup-tier">' + zone.tier + (zone.incumbentExclusion ? ' · Navy Exclusion Zone' : '') + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.palLicenses + '</span><span class="stat-lbl">PAL Licenses</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.demandIndex + '/100</span><span class="stat-lbl">Demand Index</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.enterprises.toLocaleString() + '</span><span class="stat-lbl">Enterprises</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.industrialParks + '</span><span class="stat-lbl">Industrial Parks</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.campuses + '</span><span class="stat-lbl">Campuses</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + zone.ports + '</span><span class="stat-lbl">Ports</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + zone.note + '</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'cbrs\', \'' + zone.name.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 320, minWidth: 260 });
            circle.addTo(group);
        });
    },

    /**
     * Build cellular coverage gap markers.
     */
    buildCellularLayer() {
        var group = this.groups.cellular;
        if (!SN.data.cellularGaps) return;

        SN.data.cellularGaps.forEach(function(gap) {
            var color = gap.quality === 1 ? '#ef4444' : '#fbbf24';
            var radius = gap.quality === 1 ? 25000 : 18000;

            var circle = L.circle([gap.lat, gap.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.12,
                color: color,
                weight: 1,
                opacity: 0.4
            });

            var qualLabel = gap.quality === 1 ? 'No Coverage' : 'Poor Coverage';
            var popupHtml = '<div class="layer-popup cellular-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:' + color + '">RF</span>' +
                    '<div>' +
                        '<h4>' + gap.region + '</h4>' +
                        '<span class="layer-popup-tier">' + qualLabel + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (gap.pop / 1000).toFixed(0) + 'K</span><span class="stat-lbl">Affected Pop.</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + qualLabel + '</span><span class="stat-lbl">Coverage</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + gap.note + '</p>' +
                '<p class="layer-popup-opp">Private 5G/CBRS opportunity — fill public carrier gaps.</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'cellular\', \'' + gap.region.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 300 });
            circle.addTo(group);
        });
    },

    /**
     * Build fiber backbone route polylines.
     */
    buildFiberLayer() {
        var group = this.groups.fiber;
        if (!SN.data.fiberRoutes) return;

        SN.data.fiberRoutes.forEach(function(route) {
            var polyline = L.polyline(route.points, {
                color: '#06d6a0',
                weight: 2.5,
                opacity: 0.6,
                dashArray: route.status === 'Active' ? null : '8,6'
            });

            var popupHtml = '<div class="layer-popup fiber-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#06d6a0">FB</span>' +
                    '<div>' +
                        '<h4>' + route.name + '</h4>' +
                        '<span class="layer-popup-tier">' + route.owner + ' · ' + route.capacity + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="layer-popup-note">Existing backbone. Private 5G can connect to this fiber for backhaul.</p>' +
            '</div>';

            polyline.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 280 });
            polyline.addTo(group);
        });
    },

    /**
     * Build fiber grant opportunity markers.
     */
    buildGrantsLayer() {
        var group = this.groups.grants;
        if (!SN.data.fiberGrants) return;

        SN.data.fiberGrants.forEach(function(grant) {
            var radius = Math.max(8, Math.min(30, Math.sqrt(grant.amount / 1e6) * 2));
            var color = grant.type === 'BEAD' ? '#fbbf24' : '#f97316';

            var marker = L.circleMarker([grant.lat, grant.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.35,
                color: color,
                weight: 2,
                opacity: 0.7
            });

            var fmtAmt = grant.amount >= 1e9 ? '$' + (grant.amount / 1e9).toFixed(1) + 'B' : '$' + (grant.amount / 1e6).toFixed(0) + 'M';
            var popupHtml = '<div class="layer-popup grant-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:' + color + '">$F</span>' +
                    '<div>' +
                        '<h4>' + grant.name + '</h4>' +
                        '<span class="layer-popup-tier">' + grant.type + ' · ' + grant.status + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fmtAmt + '</span><span class="stat-lbl">Funding</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + grant.miles.toLocaleString() + '</span><span class="stat-lbl">Route Miles</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (grant.homesPassed / 1000).toFixed(0) + 'K</span><span class="stat-lbl">Homes Passed</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + grant.startDate + '</span><span class="stat-lbl">Construction Start</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + grant.note + '</p>' +
                '<p class="layer-popup-opp">Opportunity: Layer private 5G on new fiber infrastructure.</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'grant\', \'' + grant.name.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            marker.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 320 });
            marker.addTo(group);
        });
    },

    /**
     * Build Smart Cities markers — includes decision maker contacts and SI info.
     */
    buildSmartCitiesLayer() {
        var group = this.groups.smartcities;
        if (!SN.data.smartCities) return;

        SN.data.smartCities.forEach(function(city) {
            var statusColor = city.status === 'Active' ? '#38bdf8' :
                              city.status === 'Pilot' ? '#fbbf24' : '#a78bfa';

            var marker = L.circleMarker([city.lat, city.lng], {
                radius: Math.max(6, Math.min(14, Math.sqrt(city.population / 50000) * 4)),
                fillColor: statusColor,
                fillOpacity: 0.8,
                color: '#fff',
                weight: 2,
                opacity: 0.9
            });

            var fmtBudget = city.budget >= 1e9 ? '$' + (city.budget / 1e9).toFixed(1) + 'B' :
                            city.budget >= 1e6 ? '$' + (city.budget / 1e6).toFixed(0) + 'M' :
                            '$' + (city.budget / 1e3).toFixed(0) + 'K';

            var infraList = [];
            if (city.infrastructure.fiberBackbone) infraList.push('Fiber Backbone');
            if (city.infrastructure.fiveGDeployed) infraList.push('5G Deployed');
            if (city.infrastructure.cbrsActive) infraList.push('CBRS Active');
            if (city.infrastructure.smartTraffic) infraList.push('Smart Traffic');
            if (city.infrastructure.smartLighting) infraList.push('Smart Lighting');
            if (city.infrastructure.iotSensors) infraList.push(city.infrastructure.iotSensors.toLocaleString() + ' IoT Sensors');

            // Decision maker & SI info
            var contactHtml = '';
            if (city.decisionMaker) {
                contactHtml += '<div class="layer-popup-contact">' +
                    '<strong>Key Decision Maker:</strong><br>' +
                    '<span class="contact-name">' + city.decisionMaker.name + '</span>' +
                    '<span class="contact-title">' + city.decisionMaker.title + '</span>';
                if (city.decisionMaker.email) contactHtml += '<span class="contact-info">' + city.decisionMaker.email + '</span>';
                if (city.decisionMaker.phone) contactHtml += '<span class="contact-info">' + city.decisionMaker.phone + '</span>';
                contactHtml += '</div>';
            }

            var siHtml = '';
            if (city.systemIntegrators && city.systemIntegrators.length) {
                siHtml = '<div class="layer-popup-si">' +
                    '<strong>System Integrators:</strong> ' + city.systemIntegrators.join(', ') +
                '</div>';
            }

            var popupHtml = '<div class="layer-popup smartcity-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:' + statusColor + '">SC</span>' +
                    '<div>' +
                        '<h4>' + city.name + ', ' + city.state + '</h4>' +
                        '<span class="layer-popup-tier">' + city.program + ' · ' + city.status + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="layer-popup-desc">' + city.description + '</p>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fmtBudget + '</span><span class="stat-lbl">Budget</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (city.population / 1000).toFixed(0) + 'K</span><span class="stat-lbl">Population</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + city.startYear + '</span><span class="stat-lbl">Started</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + city.status + '</span><span class="stat-lbl">Status</span></div>' +
                '</div>' +
                '<div class="layer-popup-infra">' +
                    '<strong>Infrastructure:</strong> ' + infraList.join(' · ') +
                '</div>' +
                '<div class="layer-popup-initiatives">' +
                    '<strong>Initiatives:</strong> ' + city.initiatives.join(', ') +
                '</div>' +
                (city.partners.length ? '<div class="layer-popup-partners"><strong>Partners:</strong> ' + city.partners.join(', ') + '</div>' : '') +
                contactHtml +
                siHtml +
                '<div class="layer-popup-highlight">' + city.highlights + '</div>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'smartcity\', \'' + city.name.replace(/'/g, "\\'") + ', ' + city.state + '\')">+ Add to Sales Report</button>' +
            '</div>';

            marker.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 400, minWidth: 300 });
            marker.addTo(group);
        });
    },

    /**
     * Build RDOF Default Areas markers.
     * Shows areas where RDOF winners defaulted — creating new funding opportunities.
     */
    buildRDOFLayer() {
        var group = this.groups.rdof;
        if (!SN.data.rdofDefaultAreas) return;

        SN.data.rdofDefaultAreas.forEach(function(area) {
            var circle = L.circle([area.lat, area.lng], {
                radius: area.radius || 30000,
                fillColor: '#f97316',
                fillOpacity: 0.15,
                color: '#f97316',
                weight: 1.5,
                opacity: 0.5,
                dashArray: '6,4'
            });

            var fmtAmt = area.defaultedAmount >= 1e9 ? '$' + (area.defaultedAmount / 1e9).toFixed(1) + 'B' : '$' + (area.defaultedAmount / 1e6).toFixed(0) + 'M';
            var popupHtml = '<div class="layer-popup rdof-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#f97316">RD</span>' +
                    '<div>' +
                        '<h4>' + area.region + '</h4>' +
                        '<span class="layer-popup-tier">RDOF Default · ' + area.originalAwardee + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fmtAmt + '</span><span class="stat-lbl">Defaulted Amount</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.defaultedLocations.toLocaleString() + '</span><span class="stat-lbl">Unserved Locations</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.defaultYear + '</span><span class="stat-lbl">Default Year</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.newFundingStatus + '</span><span class="stat-lbl">Refunding Status</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + area.note + '</p>' +
                '<p class="layer-popup-opp">Opportunity: These locations need a new provider. BEAD or future programs may fund buildout here.</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'rdof\', \'' + area.region.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 340 });
            circle.addTo(group);
        });
    },

    /**
     * Render the categorized layer toggle panel on the map.
     */
    renderTogglePanel() {
        var panel = document.getElementById('layer-toggles');
        if (!panel) return;

        var anyOn = false;
        var allDefs = this._allDefs();
        allDefs.forEach(function(d) { if (SN.layers.visible[d.id]) anyOn = true; });

        var html = '<div class="layer-panel-header">' +
            '<span class="layer-panel-title">Map Layers</span>' +
            '<button class="layer-toggle-all" id="btn-toggle-all-layers">' + (anyOn ? 'Clear All' : 'Show All') + '</button>' +
        '</div>';

        this.categories.forEach(function(cat) {
            html += '<div class="layer-category">';
            html += '<span class="layer-category-name">' + cat.name + '</span>';
            cat.layers.forEach(function(def) {
                var checked = SN.layers.visible[def.id] ? 'checked' : '';
                html += '<label class="layer-toggle" data-layer="' + def.id + '">' +
                    '<input type="checkbox" ' + checked + ' data-layer-id="' + def.id + '">' +
                    '<span class="layer-toggle-icon" style="background:' + def.color + '">' + def.icon + '</span>' +
                    '<span class="layer-toggle-label">' + def.label + '</span>' +
                '</label>';
            });
            html += '</div>';
        });

        panel.innerHTML = html;

        // Bind toggle events
        panel.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
            cb.addEventListener('change', function() {
                SN.layers.toggleLayer(cb.dataset.layerId, cb.checked);
            });
        });

        // Bind Show All / Clear All
        var toggleAllBtn = document.getElementById('btn-toggle-all-layers');
        if (toggleAllBtn) {
            toggleAllBtn.addEventListener('click', function() {
                var turnOn = toggleAllBtn.textContent === 'Show All';
                var allDefs = SN.layers._allDefs();
                allDefs.forEach(function(def) {
                    SN.layers.toggleLayer(def.id, turnOn);
                });
                SN.layers.renderTogglePanel();
            });
        }
    },

    /**
     * Toggle a layer on/off.
     */
    toggleLayer(layerId, show) {
        var map = SN.map.leafletMap;
        var group = this.groups[layerId];
        if (!map || !group) return;

        if (show) {
            group.addTo(map);
            this.visible[layerId] = true;
        } else {
            map.removeLayer(group);
            this.visible[layerId] = false;
        }
    }
};
