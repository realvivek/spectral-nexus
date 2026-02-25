/**
 * Spectral Nexus — Map Layers Module
 * Manages all toggleable map layers including county circles.
 * Organized into intuitive categories: Base, Spectrum, Infrastructure, Programs.
 */

window.SN = window.SN || {};

SN.layers = {

    /* Layer groups */
    groups: {},
    visible: {},

    /* Layer definitions — organized into categories */
    categories: [
        {
            name: 'Base Layers',
            layers: [
                { id: 'counties',   label: 'County Markers',          icon: '●',  color: '#06d6a0', defaultOn: false }
            ]
        },
        {
            name: 'RF Coverage & Gaps',
            layers: [
                { id: 'cellular',   label: 'Cellular Dead Zones',      icon: 'RF', color: '#ef4444', defaultOn: false },
                { id: 'fccserved',  label: 'FCC Underserved Areas',    icon: 'US', color: '#f59e0b', defaultOn: false },
                { id: 'fixedwl',    label: 'Fixed Wireless Coverage',  icon: 'FW', color: '#6ee7b7', defaultOn: false }
            ]
        },
        {
            name: 'Infrastructure',
            layers: [
                { id: 'grants',     label: 'Fiber Grant Areas',        icon: '$F', color: '#fbbf24', defaultOn: false }
            ]
        },
        {
            name: 'Programs & Funding',
            layers: [
                { id: 'smartcities',label: 'Smart City Programs',      icon: 'SC', color: '#38bdf8', defaultOn: false },
                { id: 'rdof',       label: 'RDOF Default Zones',       icon: 'RD', color: '#f97316', defaultOn: false }
            ]
        },
        {
            name: 'Municipal & Private Networks',
            layers: [
                { id: 'munifiber',  label: 'Municipal Fiber Networks', icon: 'MF', color: '#22d3ee', defaultOn: false },
                { id: 'cbrs',       label: 'CBRS Spectrum Zones',      icon: '5G', color: '#a78bfa', defaultOn: false },
                { id: 'priv5g',     label: 'Private 5G Deployments',   icon: 'P5', color: '#c084fc', defaultOn: false },
                { id: 'datacenters',label: 'Data Centers',             icon: 'DC', color: '#818cf8', defaultOn: false }
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
            // Skip counties — handled differently (not a standard layer group)
            if (def.id === 'counties') {
                SN.layers.visible[def.id] = def.defaultOn;
                return;
            }
            SN.layers.groups[def.id] = L.layerGroup();
            SN.layers.visible[def.id] = def.defaultOn;
            if (def.defaultOn) {
                SN.layers.groups[def.id].addTo(map);
            }
        });

        this.buildCellularLayer();
        this.buildFCCUnderservedLayer();
        this.buildFixedWirelessLayer();

        this.buildGrantsLayer();
        this.buildSmartCitiesLayer();
        this.buildRDOFLayer();
        this.buildMuniFiberLayer();
        this.buildCBRSLayer();
        this.buildPrivate5GLayer();
        this.buildDataCentersLayer();
        this.renderTogglePanel();

        // Sync integrated legend with current choropleth metric
        if (SN.map && SN.map.updateLegend) {
            SN.map.updateLegend(SN.state.choroplethMetric);
        }
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

            // Look up GAA data for this zone
            var gaaData = SN.data.cbrsGAA && SN.data.cbrsGAA[zone.name] ? SN.data.cbrsGAA[zone.name] : null;

            var gaaHtml = '';
            if (gaaData) {
                var gaaBadgeCls = gaaData.exclusionPct > 30 ? 'gaa-limited' :
                                  gaaData.exclusionPct > 0 ? 'gaa-limited' : 'gaa-available';
                var gaaBadgeText = gaaData.exclusionPct > 30 ? 'LIMITED' :
                                   gaaData.exclusionPct > 0 ? 'PARTIAL' : 'OPEN';
                gaaHtml = '<div style="margin:8px 0;padding:8px;background:var(--bg-elevated);border-radius:6px;border-left:3px solid #a78bfa">' +
                    '<div style="font-size:0.62rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;font-weight:600;margin-bottom:4px">GAA Spectrum Intelligence</div>' +
                    '<div class="layer-popup-grid">' +
                        '<div class="layer-popup-stat"><span class="stat-val">' + gaaData.gaaChannels + '</span><span class="stat-lbl">GAA Channels</span></div>' +
                        '<div class="layer-popup-stat"><span class="stat-val">' + gaaData.gaaMaxPower + ' dBm</span><span class="stat-lbl">Max EIRP</span></div>' +
                        '<div class="layer-popup-stat"><span class="stat-val">' + gaaData.avgUtilization + '%</span><span class="stat-lbl">Avg Utilization</span></div>' +
                        '<div class="layer-popup-stat"><span class="stat-val"><span class="gaa-badge ' + gaaBadgeCls + '">' + gaaBadgeText + '</span></span><span class="stat-lbl">GAA Status</span></div>' +
                    '</div>' +
                    '<div style="font-size:0.68rem;color:var(--text-secondary);margin-top:4px"><strong>SAS Providers:</strong> ' + gaaData.sasProviders.join(', ') + '</div>' +
                    (gaaData.incumbentType !== 'None' ? '<div style="font-size:0.66rem;color:var(--accent-warm);margin-top:2px">Incumbent: ' + gaaData.incumbentType + ' (' + gaaData.exclusionPct + '% area excluded)</div>' : '') +
                    '<div style="font-size:0.66rem;color:var(--text-muted);margin-top:2px;font-style:italic">' + gaaData.note + '</div>' +
                '</div>';
            }

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
                gaaHtml +
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
     * Build FCC Underserved Areas layer.
     * Shows regions with service between 25/3 and 100/20 Mbps — BEAD upgrade targets.
     */
    buildFCCUnderservedLayer() {
        var group = this.groups.fccserved;
        if (!SN.data.fccUnderserved) return;

        SN.data.fccUnderserved.forEach(function(area) {
            var circle = L.circle([area.lat, area.lng], {
                radius: area.radius,
                fillColor: '#f59e0b',
                fillOpacity: 0.10,
                color: '#f59e0b',
                weight: 1.5,
                opacity: 0.4,
                dashArray: '4,3'
            });

            var speedBadge = area.maxDown <= 25 ? '<span style="color:#ef4444;font-weight:700">UNSERVED</span>' :
                             area.maxDown <= 50 ? '<span style="color:#f97316;font-weight:700">UNDERSERVED</span>' :
                             '<span style="color:#fbbf24;font-weight:700">UNDERSERVED</span>';

            var popupHtml = '<div class="layer-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#f59e0b">US</span>' +
                    '<div>' +
                        '<h4>' + area.region + '</h4>' +
                        '<span class="layer-popup-tier">' + area.primaryTech + ' · ' + speedBadge + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.bslCount.toLocaleString() + '</span><span class="stat-lbl">BSLs</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.maxDown + '/' + area.maxUp + '</span><span class="stat-lbl">Max Mbps ↓/↑</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + area.providers + '</span><span class="stat-lbl">Providers</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (area.beadEligible ? 'Yes' : 'No') + '</span><span class="stat-lbl">BEAD Eligible</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + area.note + '</p>' +
                '<p class="layer-popup-opp">BEAD upgrade target — fiber deployment opportunity.</p>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 320 });
            circle.addTo(group);
        });
    },

    /**
     * Build Fixed Wireless Access coverage layer.
     * Shows FWA providers (T-Mobile, Verizon, WISPs) — competitive landscape for fiber.
     */
    buildFixedWirelessLayer() {
        var group = this.groups.fixedwl;
        if (!SN.data.fixedWirelessCoverage) return;

        SN.data.fixedWirelessCoverage.forEach(function(fwa) {
            var color = fwa.operator === 'T-Mobile' ? '#e91e8e' :
                        fwa.operator === 'Verizon' ? '#cd040b' :
                        '#6ee7b7';
            var fillOpacity = fwa.capacity === 'High' ? 0.12 : fwa.capacity === 'Medium' ? 0.08 : 0.05;

            var circle = L.circle([fwa.lat, fwa.lng], {
                radius: fwa.radius,
                fillColor: color,
                fillOpacity: fillOpacity,
                color: color,
                weight: 1,
                opacity: 0.35
            });

            var popupHtml = '<div class="layer-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:' + color + '">FW</span>' +
                    '<div>' +
                        '<h4>' + fwa.region + '</h4>' +
                        '<span class="layer-popup-tier">' + fwa.operator + ' · ' + fwa.technology + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fwa.maxDown + '/' + fwa.maxUp + '</span><span class="stat-lbl">Max Mbps ↓/↑</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (fwa.subscribers / 1000).toFixed(0) + 'K</span><span class="stat-lbl">Subscribers</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fwa.capacity + '</span><span class="stat-lbl">Capacity</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fwa.technology + '</span><span class="stat-lbl">Technology</span></div>' +
                '</div>' +
                '<p class="layer-popup-note">' + fwa.note + '</p>' +
                '<p class="layer-popup-opp">FWA competitor — fiber offers superior reliability & speeds.</p>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 340 });
            circle.addTo(group);
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
     * Build Smart Cities markers.
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
                '<p class="layer-popup-opp">Opportunity: BEAD priority targets with proven demand.</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'rdof\', \'' + area.region.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            circle.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 340 });
            circle.addTo(group);
        });
    },

    /**
     * Build Municipal Fiber Network markers.
     */
    buildMuniFiberLayer() {
        var group = this.groups.munifiber;
        if (!SN.data.municipalFiber) return;

        SN.data.municipalFiber.forEach(function(net) {
            var radius = Math.max(6, Math.min(16, Math.sqrt(net.fiberMiles / 100) * 4));
            var color = net.darkFiberAvailable ? '#22d3ee' : '#67e8f9';

            var marker = L.circleMarker([net.lat, net.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.8,
                color: '#fff',
                weight: 2,
                opacity: 0.9
            });

            var fmtInvestment = net.investmentTotal >= 1e9 ? '$' + (net.investmentTotal / 1e9).toFixed(1) + 'B' :
                                net.investmentTotal >= 1e6 ? '$' + (net.investmentTotal / 1e6).toFixed(0) + 'M' :
                                '$' + (net.investmentTotal / 1e3).toFixed(0) + 'K';

            var popupHtml = '<div class="layer-popup munifiber-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#22d3ee">MF</span>' +
                    '<div>' +
                        '<h4>' + net.name + '</h4>' +
                        '<span class="layer-popup-tier">' + net.city + ', ' + net.state + ' · ' + net.operator + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="layer-popup-desc">' + net.description + '</p>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + net.fiberMiles.toLocaleString() + '</span><span class="stat-lbl">Fiber Miles</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (net.homesPassed / 1000).toFixed(0) + 'K</span><span class="stat-lbl">Homes Passed</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + net.marketShare + '%</span><span class="stat-lbl">Market Share</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + fmtInvestment + '</span><span class="stat-lbl">Investment</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + net.maxSpeed + '</span><span class="stat-lbl">Max Speed</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (net.darkFiberAvailable ? 'Yes' : 'No') + '</span><span class="stat-lbl">Dark Fiber</span></div>' +
                '</div>' +
                '<div class="layer-popup-infra">' +
                    '<strong>Services:</strong> ' + net.services.join(' · ') +
                '</div>' +
                '<div class="layer-popup-infra">' +
                    '<strong>Funding:</strong> ' + net.fundingSources.join(', ') +
                '</div>' +
                (net.darkFiberAvailable ? '<p class="layer-popup-opp">Dark fiber available for leasing — potential private 5G backhaul.</p>' : '') +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'munifiber\', \'' + net.name.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            marker.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 380, minWidth: 280 });
            marker.addTo(group);
        });
    },

    /**
     * Build Private 5G Deployment markers.
     */
    buildPrivate5GLayer() {
        var group = this.groups.priv5g;
        if (!SN.data.private5GDeployments) return;

        SN.data.private5GDeployments.forEach(function(dep) {
            var radius = Math.max(8, Math.min(18, dep.areaSqMiles * 2));
            var color = dep.coverage === 'Indoor + Outdoor' ? '#c084fc' :
                        dep.coverage === 'Outdoor' ? '#a855f7' : '#7c3aed';

            var marker = L.circleMarker([dep.lat, dep.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.85,
                color: '#fff',
                weight: 2.5,
                opacity: 0.95
            });

            var popupHtml = '<div class="layer-popup priv5g-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#c084fc">P5</span>' +
                    '<div>' +
                        '<h4>' + dep.city + ', ' + dep.state + '</h4>' +
                        '<span class="layer-popup-tier">' + dep.networkType + ' · ' + dep.phase + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + dep.spectrum + '</span><span class="stat-lbl">Spectrum</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + dep.coverage + '</span><span class="stat-lbl">Coverage Type</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + dep.areaSqMiles + ' sq mi</span><span class="stat-lbl">Coverage Area</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">$' + dep.investmentM + 'M</span><span class="stat-lbl">Investment</span></div>' +
                '</div>' +
                '<div class="layer-popup-infra">' +
                    '<strong>Operator:</strong> ' + dep.operator + '<br>' +
                    '<strong>RAN Vendor:</strong> ' + dep.ranVendor + '<br>' +
                    '<strong>Core Network:</strong> ' + dep.coreNetwork + '<br>' +
                    '<strong>Backhaul:</strong> ' + dep.backhaul +
                '</div>' +
                '<div class="layer-popup-initiatives">' +
                    '<strong>Use Cases:</strong> ' + dep.useCases.join(', ') +
                '</div>' +
                '<p class="layer-popup-note">' + dep.note + '</p>' +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'priv5g\', \'' + dep.city.replace(/'/g, "\\'") + ', ' + dep.state + '\')">+ Add to Sales Report</button>' +
            '</div>';

            marker.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 380, minWidth: 300 });
            marker.addTo(group);
        });
    },

    /**
     * Build Data Center markers.
     */
    buildDataCentersLayer() {
        var group = this.groups.datacenters;
        if (!SN.data.dataCenters) return;

        SN.data.dataCenters.forEach(function(dc) {
            var color = dc.status === 'Under Construction' ? '#f59e0b' :
                        dc.status === 'Expanding' ? '#818cf8' : '#6366f1';
            var radius = Math.max(6, Math.min(14, Math.sqrt(dc.capacityMW) * 1.2));

            var marker = L.circleMarker([dc.lat, dc.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.80,
                color: '#fff',
                weight: 2,
                opacity: 0.9
            });

            var popupHtml = '<div class="layer-popup dc-popup">' +
                '<div class="layer-popup-header">' +
                    '<span class="layer-popup-icon" style="background:#818cf8">DC</span>' +
                    '<div>' +
                        '<h4>' + dc.name + '</h4>' +
                        '<span class="layer-popup-tier">' + dc.operator + ' · ' + dc.status + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="layer-popup-grid">' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + dc.capacityMW + ' MW</span><span class="stat-lbl">Power Capacity</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (dc.totalSqFt / 1000).toFixed(0) + 'K sqft</span><span class="stat-lbl">Floor Space</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + dc.type + '</span><span class="stat-lbl">Type</span></div>' +
                    '<div class="layer-popup-stat"><span class="stat-val">' + (dc.cbrsOpportunity ? 'Yes' : 'No') + '</span><span class="stat-lbl">CBRS Opp.</span></div>' +
                '</div>' +
                '<div class="layer-popup-infra">' +
                    '<strong>Fiber Providers:</strong> ' + dc.fiberProviders.join(', ') + '<br>' +
                    (dc.integrators && dc.integrators.length ? '<strong>Integrators:</strong> ' + dc.integrators.join(', ') : '') +
                '</div>' +
                '<p class="layer-popup-note">' + dc.note + '</p>' +
                (dc.contactName ? '<div style="margin:6px 0;padding:6px;background:var(--bg-elevated);border-radius:4px;font-size:0.7rem">' +
                    '<strong>' + dc.contactName + '</strong>' +
                    (dc.contactEmail ? '<br>' + dc.contactEmail : '') +
                    (dc.contactPhone ? '<br>' + dc.contactPhone : '') +
                '</div>' : '') +
                '<button class="btn-add-to-report" onclick="SN.executive.addToReport(\'datacenter\', \'' + dc.name.replace(/'/g, "\\'") + '\')">+ Add to Sales Report</button>' +
            '</div>';

            marker.bindPopup(popupHtml, { className: 'sn-popup', maxWidth: 360, minWidth: 280 });
            marker.addTo(group);
        });
    },

    /**
     * Render the categorized layer toggle panel.
     */
    renderTogglePanel() {
        var panel = document.getElementById('layer-toggles');
        if (!panel) return;

        var anyOverlayOn = false;
        var allDefs = this._allDefs();
        allDefs.forEach(function(d) {
            if (d.id !== 'counties' && SN.layers.visible[d.id]) anyOverlayOn = true;
        });

        var html = '<div class="layer-panel-header">' +
            '<span class="layer-panel-title">Map Layers</span>' +
            '<button class="layer-toggle-all" id="btn-toggle-all-layers">' + (anyOverlayOn ? 'Clear All' : 'Show All') + '</button>' +
        '</div>';

        this.categories.forEach(function(cat) {
            html += '<div class="layer-category">';
            html += '<span class="layer-category-name">' + cat.name + '</span>';
            cat.layers.forEach(function(def) {
                var checked = SN.layers.visible[def.id] ? 'checked' : '';
                html += '<label class="layer-toggle" data-layer="' + def.id + '">' +
                    '<span class="layer-toggle-label">' + def.label + '</span>' +
                    '<span class="layer-toggle-switch">' +
                        '<input type="checkbox" ' + checked + ' data-layer-id="' + def.id + '">' +
                        '<span class="switch-track"></span>' +
                        '<span class="switch-thumb"></span>' +
                    '</span>' +
                '</label>';
            });
            html += '</div>';
        });

        // Integrated legend section
        var colors = SN.config.choroplethColors;
        html += '<div class="layer-legend-section">';
        html += '<div class="layer-legend-title" id="legend-title">Opportunity Score</div>';
        html += '<div class="layer-legend-scale">';
        for (var ci = 0; ci < colors.length; ci++) {
            html += '<span style="background:' + colors[ci] + '"></span>';
        }
        html += '</div>';
        html += '<div class="layer-legend-labels" id="legend-labels"><span>100 (Best)</span><span>50</span><span>0 (Low)</span></div>';
        html += '<div class="layer-legend-hint" id="legend-hint">Circle size = population · Color = score</div>';
        html += '</div>';

        panel.innerHTML = html;

        // Bind toggle events
        panel.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
            cb.addEventListener('change', function() {
                SN.layers.toggleLayer(cb.dataset.layerId, cb.checked);
            });
        });

        // Bind Show All / Clear All (overlays only, not base layers)
        var toggleAllBtn = document.getElementById('btn-toggle-all-layers');
        if (toggleAllBtn) {
            toggleAllBtn.addEventListener('click', function() {
                var turnOn = toggleAllBtn.textContent === 'Show All';
                var allDefs = SN.layers._allDefs();
                allDefs.forEach(function(def) {
                    if (def.id !== 'counties') {
                        SN.layers.toggleLayer(def.id, turnOn);
                    }
                });
                SN.layers.renderTogglePanel();
                // Sync legend with current choropleth metric
                if (SN.map && SN.map.updateLegend) {
                    SN.map.updateLegend(SN.state.choroplethMetric);
                }
            });
        }
    },

    /**
     * Toggle a layer on/off.
     */
    toggleLayer(layerId, show) {
        var map = SN.map.leafletMap;
        if (!map) return;

        // Special handling for county circles
        if (layerId === 'counties') {
            this.visible.counties = show;
            if (SN.map.countyLayer) {
                if (show) {
                    SN.map.countyLayer.addTo(map);
                } else {
                    map.removeLayer(SN.map.countyLayer);
                }
            }
            return;
        }

        // Standard overlay layers
        var group = this.groups[layerId];
        if (!group) return;

        if (show) {
            group.addTo(map);
            this.visible[layerId] = true;
        } else {
            map.removeLayer(group);
            this.visible[layerId] = false;
        }
    }
};
