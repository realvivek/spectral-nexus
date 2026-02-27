/**
 * Spectral Nexus — Enhanced UI Module
 * Features: Dashboard Home, Full-Screen Funding Modal, Pursuit Builder,
 * Top Targets Page, County Deep-Dive, Sticky Action Bar, Smart Filters,
 * Decision Maker Rolodex.
 */

window.SN = window.SN || {};

SN.enhancedUI = {

    currentView: 'dashboard', // 'dashboard' | 'main' | 'targets' | 'rolodex'

    /* ═══════════════════════════════════════════════ */
    /* INITIALIZATION                                  */
    /* ═══════════════════════════════════════════════ */

    init: function() {
        // Each sub-init wrapped in try/catch so one failure doesn't prevent others
        try { this.initNavigation(); } catch(e) { console.error('EnhancedUI: navigation init failed:', e); }
        try { this.initActionBar(); } catch(e) { console.error('EnhancedUI: action bar init failed:', e); }
        try { this.initFilterLenses(); } catch(e) { console.error('EnhancedUI: filter lenses init failed:', e); }
        try { this.initFundingModal(); } catch(e) { console.error('EnhancedUI: funding modal init failed:', e); }
        try { this.initCountyDive(); } catch(e) { console.error('EnhancedUI: county dive init failed:', e); }
        try { this.initPursuitBuilder(); } catch(e) { console.error('EnhancedUI: pursuit builder init failed:', e); }
        try { this.showView('dashboard'); } catch(e) { console.error('EnhancedUI: showView failed:', e); }
    },

    /* ═══════════════════════════════════════════════ */
    /* NAVIGATION — Hash-based page switching          */
    /* ═══════════════════════════════════════════════ */

    initNavigation: function() {
        var self = this;

        // Header nav buttons
        var navBtns = document.querySelectorAll('[data-nav]');
        navBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.showView(btn.dataset.nav);
            });
        });

        // Handle browser back/forward
        window.addEventListener('hashchange', function() {
            var hash = location.hash.replace('#', '') || 'dashboard';
            self.showView(hash, true);
        });
    },

    showView: function(view, fromHash) {
        this.currentView = view;
        if (!fromHash) location.hash = view === 'dashboard' ? '' : view;

        // Hide all views
        var views = document.querySelectorAll('.sn-view');
        views.forEach(function(v) { v.classList.remove('sn-view-active'); });

        // Show target view
        var target = document.getElementById('view-' + view);
        if (target) target.classList.add('sn-view-active');

        // Update nav active states
        document.querySelectorAll('[data-nav]').forEach(function(btn) {
            btn.classList.toggle('nav-active', btn.dataset.nav === view);
        });

        // Render view-specific content
        if (view === 'dashboard') this.renderDashboardHome();
        if (view === 'targets') this.renderTopTargets();
        if (view === 'rolodex') this.renderRolodex();
        if (view === 'insights') this.renderInsightsView();
        if (view === 'funding') this.renderFundingView();
        if (view === 'main') {
            // Invalidate map size after view switch
            setTimeout(function() {
                if (SN.map && SN.map.leafletMap) SN.map.leafletMap.invalidateSize();
            }, 100);
        }
    },

    /* ═══════════════════════════════════════════════ */
    /* #9 — DASHBOARD HOME / INTELLIGENCE BRIEF       */
    /* ═══════════════════════════════════════════════ */

    renderDashboardHome: function() {
        var container = document.getElementById('dashboard-home-content');
        if (!container) return;

        try {
        var self = this;
        var fmt = SN.kpi.fmt ? SN.kpi.fmt.bind(SN.kpi) : function(n) { return String(n); };
        var counties = SN.data.counties || [];
        var kpi = SN.kpi.compute ? SN.kpi.compute(counties) : { highOppCount: 0, totalUnservedBSLs: 0, totalFunding: 0 };

        var topCounties = counties.slice().sort(function(a, b) {
            return b.opportunityScore - a.opportunityScore;
        }).slice(0, 8);

        // BEAD timeline — object keyed by state, convert to array
        var beadObj = SN.data.beadTimeline || {};
        var beadStates = Object.keys(beadObj).map(function(st) {
            var d = beadObj[st]; d.stateCode = st; return d;
        });
        var openSubgrants = beadStates.filter(function(s) {
            return s.phase === 'subgrant_open';
        }).sort(function(a, b) {
            return (a.subgrantClose || 'z') < (b.subgrantClose || 'z') ? -1 : 1;
        });

        // Competitive bids with deadlines — filter out expired (< current month)
        var nowMonth = new Date().toISOString().slice(0, 7); // '2026-02'
        var bids = (SN.data.competitiveBids || []).filter(function(b) {
            return b.deadline && b.deadline >= nowMonth;
        }).sort(function(a, b) { return a.deadline < b.deadline ? -1 : 1; }).slice(0, 6);

        // RDOF defaults
        var rdofDefaults = SN.data.rdofDefaults || [];

        // Private 5G deployments & Smart City ROI opportunities
        var priv5g = SN.data.private5GDeployments || [];
        var smartCities = SN.data.smartCities || [];

        // Cross-reference: cities with dark fiber + funding + private 5G ROI potential
        var muniNetworks = SN.data.municipalFiber || [];
        var darkFiberCities = {};
        muniNetworks.forEach(function(n) { if (n.darkFiberAvailable) darkFiberCities[n.city.toLowerCase()] = n; });

        // Smart cities without private 5G = opportunity for private 5G ROI
        var priv5gCities = {};
        priv5g.forEach(function(d) { priv5gCities[d.city.toLowerCase()] = true; });

        var private5gOpps = smartCities.filter(function(c) {
            return !priv5gCities[c.name.toLowerCase()] && c.infrastructure && c.infrastructure.fiberBackbone;
        }).sort(function(a, b) { return (b.budget || 0) - (a.budget || 0); }).slice(0, 6);

        // Data centers
        var dataCenters = SN.data.dataCenters || [];
        var newBuildDCs = dataCenters.filter(function(dc) { return dc.status === 'Under Construction' || dc.status === 'Expanding'; });
        var cbrsReadyDCs = dataCenters.filter(function(dc) { return dc.cbrsOpportunity; });

        // Dark fiber opportunities (cities w/ dark fiber but no smart city or private 5G)
        var smartCityNames = {};
        smartCities.forEach(function(c) { smartCityNames[c.name.toLowerCase()] = true; });
        var darkFiberOpps = muniNetworks.filter(function(net) {
            return net.darkFiberAvailable && !smartCityNames[net.city.toLowerCase()] && !priv5gCities[net.city.toLowerCase()];
        });

        // Open grants
        var fiberGrants = SN.data.fiberGrants || [];
        var grantPrograms = [];
        if (SN.data.grants) {
            (SN.data.grants.federal || []).forEach(function(g) {
                if (g.statusCode === 'open' || g.statusCode === 'rolling') grantPrograms.push(g);
            });
            var stObj = SN.data.grants.state || {};
            Object.keys(stObj).forEach(function(st) {
                (stObj[st] || []).forEach(function(g) {
                    if (g.statusCode === 'open' || g.statusCode === 'rolling') { g._state = st; grantPrograms.push(g); }
                });
            });
        }

        // Total addressable market
        var totalUnserved = counties.reduce(function(s, c) { return s + (c.unservedBSLs || 0); }, 0);
        var totalFunding = 0;
        try { totalFunding = Object.values(SN.config.beadAllocations).reduce(function(s, v) { return s + v; }, 0); } catch(e) {}

        // Weekly brief data
        var brief = SN.data.weeklyBrief || null;
        var briefBullets = brief && brief.bullets ? brief.bullets : [];
        var briefDate = brief && brief.weekOf ? brief.weekOf : '';
        var briefIconMap = {
            'bead': { icon: 'B', color: '#06d6a0' },
            '5g': { icon: '5G', color: '#a78bfa' },
            'dc': { icon: 'DC', color: '#818cf8' },
            'fiber': { icon: 'FB', color: '#22d3ee' },
            'deal': { icon: '$', color: '#fbbf24' },
            'alert': { icon: '!', color: '#ef4444' },
            'rdof': { icon: 'RD', color: '#f97316' },
            'policy': { icon: 'P', color: '#64748b' }
        };
        var briefTagMap = {
            'urgent': { label: 'URGENT', color: '#ef4444' },
            'new': { label: 'NEW', color: '#06d6a0' },
            'update': { label: 'UPDATE', color: '#38bdf8' },
            'opportunity': { label: 'OPPORTUNITY', color: '#a78bfa' }
        };

        // BEAD alert feed — upcoming deadlines within 90 days
        var today = new Date();
        var beadAlerts = [];
        beadStates.forEach(function(s) {
            if (!s.subgrantClose || s.subgrantClose.indexOf('Q') !== -1) return;
            var close = new Date(s.subgrantClose + '-28');
            var daysUntil = Math.ceil((close - today) / 86400000);
            if (daysUntil >= -7 && daysUntil <= 90) {
                s._daysUntil = daysUntil;
                s._urgency = daysUntil <= 14 ? 'critical' : daysUntil <= 30 ? 'high' : daysUntil <= 60 ? 'medium' : 'low';
                beadAlerts.push(s);
            }
        });
        beadAlerts.sort(function(a, b) { return a._daysUntil - b._daysUntil; });

        // Competitor landscape summary
        var competitors = SN.data.competitorProfiles || [];
        var highThreat = competitors.filter(function(c) { return c.threat === 'high'; });
        var totalActiveBids = competitors.reduce(function(s, c) { return s + (c.beadActivity ? c.beadActivity.activeBids : 0); }, 0);
        var rdofDefaulters = SN.data.rdofDefaults || [];
        var rdofTotalDefault = rdofDefaulters.reduce(function(s, d) { return s + (d.award || 0); }, 0);

        // Partnership suggestions — match counties with co-ops, muni fiber, smart cities
        var partnerSuggestions = [];
        var coops = SN.data.electricCoops || [];
        var stateDirectors = SN.data.stateDecisionMakers || {};
        // Find high-opp counties that have co-ops or muni fiber nearby
        topCounties.slice(0, 12).forEach(function(county) {
            var st = county.state;
            var partners = [];
            // Check for co-ops in the state
            coops.forEach(function(coop) {
                if (coop.state === st && coop.fiberStatus) {
                    partners.push({ name: coop.name, type: 'Electric Co-op', detail: coop.fiberStatus + (coop.milesPlanned ? ' · ' + coop.milesPlanned + ' mi planned' : '') });
                }
            });
            // Check for muni fiber in the state
            muniNetworks.forEach(function(net) {
                if (net.state === st && net.darkFiberAvailable) {
                    partners.push({ name: net.name, type: 'Municipal Fiber', detail: net.fiberMiles.toLocaleString() + ' mi · Dark fiber available' });
                }
            });
            // Check for state director
            var dir = stateDirectors[st];
            if (dir) {
                partners.push({ name: dir.name, type: 'State Director', detail: dir.title + (dir.agency ? ' · ' + dir.agency : '') });
            }
            if (partners.length > 0) {
                partnerSuggestions.push({
                    county: county.county.replace(' County','').replace(' Parish',''),
                    state: county.state,
                    score: county.opportunityScore,
                    funding: county.fundingEstimate,
                    partners: partners.slice(0, 3)
                });
            }
        });
        partnerSuggestions = partnerSuggestions.slice(0, 4);

        container.innerHTML =
            // ═══ HERO ═══
            '<div class="home-hero">' +
                '<h1 class="home-title">Wireless & Fiber Pipeline Intelligence</h1>' +
                '<p class="home-subtitle">Actionable sales intelligence across 3,100+ US counties · Private 5G · CBRS · Fiber · Data Centers</p>' +
                '<div class="home-hero-stats">' +
                    '<div class="home-stat home-stat-accent">' +
                        '<span class="home-stat-val">' + priv5g.length + '</span>' +
                        '<span class="home-stat-lbl">Active Private 5G Networks</span>' +
                    '</div>' +
                    '<div class="home-stat">' +
                        '<span class="home-stat-val">' + dataCenters.length + '</span>' +
                        '<span class="home-stat-lbl">Data Centers Tracked</span>' +
                    '</div>' +
                    '<div class="home-stat">' +
                        '<span class="home-stat-val">' + fmt(totalFunding, 'currency') + '</span>' +
                        '<span class="home-stat-lbl">Total BEAD Funding</span>' +
                    '</div>' +
                    '<div class="home-stat">' +
                        '<span class="home-stat-val">' + openSubgrants.length + '</span>' +
                        '<span class="home-stat-lbl">States Taking Bids</span>' +
                    '</div>' +
                    '<div class="home-stat">' +
                        '<span class="home-stat-val">' + smartCities.length + '</span>' +
                        '<span class="home-stat-lbl">Smart Cities Tracked</span>' +
                    '</div>' +
                    '<div class="home-stat home-stat-hot">' +
                        '<span class="home-stat-val">' + newBuildDCs.length + '</span>' +
                        '<span class="home-stat-lbl">New DC Builds</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            // ═══ SINGLE-COLUMN LAYOUT (no empty right panel) ═══
            '<div class="home-full-width">' +

            // ── SECTION 0: WEEKLY INTELLIGENCE BRIEF ──
            (briefBullets.length > 0 ?
            '<div class="home-section home-section-brief">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">This Week\'s Intelligence Brief</h2>' +
                    '<span class="home-section-badge home-badge-green">Week of ' + briefDate + '</span>' +
                '</div>' +
                '<div class="home-brief-list">' +
                    briefBullets.map(function(b) {
                        var ic = briefIconMap[b.icon] || { icon: '?', color: '#64748b' };
                        var tg = b.tag && briefTagMap[b.tag] ? briefTagMap[b.tag] : null;
                        return '<div class="home-brief-item">' +
                            '<span class="home-brief-icon" style="background:' + ic.color + '">' + ic.icon + '</span>' +
                            '<div class="home-brief-text">' + b.text + '</div>' +
                            (tg ? '<span class="home-brief-tag" style="background:' + tg.color + '">' + tg.label + '</span>' : '') +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' : '') +

            // ── SECTION 0b: BEAD DEADLINE ALERTS ──
            (beadAlerts.length > 0 ?
            '<div class="home-section home-section-alerts">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">BEAD Deadline Tracker</h2>' +
                    '<span class="home-section-badge home-badge-red">' + beadAlerts.filter(function(a) { return a._urgency === 'critical' || a._urgency === 'high'; }).length + ' urgent</span>' +
                '</div>' +
                '<div class="home-alert-grid">' +
                    beadAlerts.slice(0, 8).map(function(s) {
                        var urgClass = 'home-alert-' + s._urgency;
                        var daysText = s._daysUntil <= 0 ? 'Closing now' : s._daysUntil + ' days left';
                        return '<div class="home-alert-card ' + urgClass + '">' +
                            '<div class="home-alert-header">' +
                                '<strong>' + s.stateCode + '</strong>' +
                                '<span class="home-alert-days">' + daysText + '</span>' +
                            '</div>' +
                            '<div class="home-alert-details">' +
                                '<span>Close: <strong>' + s.subgrantClose + '</strong></span>' +
                                '<span>' + fmt(s.allocation, 'currency') + '</span>' +
                                '<span>' + (s.subgrantApplicants || '?') + ' applicants</span>' +
                            '</div>' +
                            '<div class="home-alert-note">' + (s.notes || '') + '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' : '') +

            // ── SECTION 1: PRIVATE 5G & SMART CITY OPPORTUNITIES (TOP) ──
            '<div class="home-section home-section-featured">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Private 5G & Smart City Opportunities</h2>' +
                    '<span class="home-section-badge home-badge-purple">' + private5gOpps.length + ' cities ready for private 5G</span>' +
                '</div>' +
                '<p class="home-section-desc">Smart cities with <strong>fiber backbone but no private 5G deployment</strong> — highest ROI targets for CBRS/private wireless.</p>' +
                '<div class="home-card-grid home-card-grid-3">' +
                    private5gOpps.map(function(city) {
                        var dm = city.decisionMaker;
                        var hasDarkFiber = darkFiberCities[city.name.toLowerCase()];
                        var gaaData = SN.data.cbrsGAA || {};
                        var gaa = null;
                        Object.keys(gaaData).forEach(function(k) {
                            if (k.toLowerCase().indexOf(city.name.toLowerCase()) !== -1) gaa = gaaData[k];
                        });
                        // Build opportunity narrative
                        var oppDesc = '';
                        var beadSt = SN.config.beadStatus && SN.config.beadStatus[city.state];
                        var beadAlloc = SN.config.beadAllocations && SN.config.beadAllocations[city.state];
                        var beadInfo = beadSt && beadAlloc ? ' BEAD ' + beadSt.toLowerCase() + ' with ' + fmt(beadAlloc, 'currency') + ' state allocation.' : '';
                        var darkFiberNote = hasDarkFiber ? ' Dark fiber is available via ' + hasDarkFiber.name + ' (' + hasDarkFiber.fiberMiles.toLocaleString() + ' miles).' : '';
                        var gaaNote = gaa ? ' CBRS spectrum is only ' + gaa.avgUtilization + '% utilized — wide open for private wireless.' : '';
                        var iotCount = (city.infrastructure && city.infrastructure.iotSensors) || 0;
                        oppDesc = city.name + ' has an active ' + city.program + ' program (since ' + city.startYear + ') with ' + fmt(city.budget, 'currency') + ' budget and ' + iotCount.toLocaleString() + ' IoT sensors, but no private 5G network.' + darkFiberNote + gaaNote + beadInfo;
                        if (dm) oppDesc += ' Contact ' + dm.name + ' (' + dm.title + ').';

                        return '<div class="home-opp-card home-opp-5g">' +
                            '<div class="home-opp-header">' +
                                '<strong>' + city.name + ', ' + city.state + '</strong>' +
                                '<span class="home-opp-badge home-opp-badge-5g">5G OPPORTUNITY</span>' +
                            '</div>' +
                            '<div class="home-opp-body">' +
                                '<span class="home-opp-name">' + city.program + '</span>' +
                                '<p class="home-opp-desc">' + oppDesc + '</p>' +
                                '<div class="home-opp-metrics">' +
                                    '<span>Pop: ' + (city.population / 1000).toFixed(0) + 'K</span>' +
                                    '<span>Budget: ' + fmt(city.budget, 'currency') + '</span>' +
                                    '<span>IoT: ' + iotCount.toLocaleString() + ' sensors</span>' +
                                    (hasDarkFiber ? '<span class="home-tag-green">Dark Fiber Available</span>' : '') +
                                    (gaa ? '<span class="home-tag-blue">CBRS ' + gaa.avgUtilization + '% utilized</span>' : '') +
                                '</div>' +
                                (dm ? '<div class="home-opp-contact">' +
                                    '<span class="home-opp-contact-name">' + dm.name + '</span>' +
                                    '<span class="home-opp-contact-title">' + dm.title + '</span>' +
                                    (dm.email ? '<span class="home-opp-contact-info">' + dm.email + '</span>' : '') +
                                '</div>' : '') +
                            '</div>' +
                            '<div class="home-opp-actions">' +
                                '<button class="home-rpt-btn" data-rpt-type="smartcity" data-rpt-name="' + city.name.replace(/"/g, '&quot;') + ', ' + city.state + '">+ Sales Report</button>' +
                                (dm ? '<button class="home-rpt-btn home-rpt-btn-sec" data-rpt-type="decisionmaker" data-rpt-name="' + dm.name.replace(/"/g, '&quot;') + '">+ Add Contact</button>' : '') +
                            '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +
                '<div class="home-section-sub">' +
                    '<h3>Active Private 5G Deployments</h3>' +
                    '<div class="home-existing-5g">' +
                    priv5g.slice(0, 6).map(function(d) {
                        return '<div class="home-5g-pill">' +
                            '<strong>' + d.city + ', ' + d.state + '</strong>' +
                            '<span>' + d.operator + ' · ' + d.networkType + ' · ' + d.phase + '</span>' +
                        '</div>';
                    }).join('') +
                    '</div>' +
                '</div>' +
            '</div>' +

            // ── SECTION 2: DATA CENTER CONNECTIVITY ──
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Data Center Connectivity Opportunities</h2>' +
                    '<span class="home-section-badge home-badge-indigo">' + cbrsReadyDCs.length + ' CBRS-ready</span>' +
                '</div>' +
                '<p class="home-section-desc">Data centers needing wireless connectivity — new builds, expansions, and CBRS campus opportunities.</p>' +
                '<div class="home-bid-table-wrap">' +
                    '<table class="home-bid-table">' +
                        '<thead><tr>' +
                            '<th>Facility</th><th>Location</th><th>Operator</th><th>Capacity</th><th>Status</th><th>CBRS</th><th></th>' +
                        '</tr></thead>' +
                        '<tbody>' +
                        newBuildDCs.concat(dataCenters.filter(function(dc) { return dc.status === 'Operational' && dc.cbrsOpportunity; })).slice(0, 8).map(function(dc) {
                            var statusClass = dc.status === 'Under Construction' ? 'home-comp-low' : dc.status === 'Expanding' ? 'home-comp-med' : '';
                            return '<tr>' +
                                '<td><strong>' + dc.name.substring(0, 30) + (dc.name.length > 30 ? '...' : '') + '</strong></td>' +
                                '<td>' + dc.city + ', ' + dc.state + '</td>' +
                                '<td>' + dc.operator + '</td>' +
                                '<td>' + dc.capacityMW + ' MW</td>' +
                                '<td><span class="home-comp-badge ' + statusClass + '">' + dc.status + '</span></td>' +
                                '<td>' + (dc.cbrsOpportunity ? '<span class="home-tag-green">Yes</span>' : 'No') + '</td>' +
                                '<td><button class="home-rpt-btn-sm" data-rpt-type="datacenter" data-rpt-name="' + dc.name.replace(/"/g, '&quot;') + '">+ Report</button></td>' +
                            '</tr>';
                        }).join('') +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
            '</div>' +

            // ── SECTION 3: COMPETITIVE LANDSCAPE ──
            (competitors.length > 0 ?
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Competitive Landscape</h2>' +
                    '<span class="home-section-badge home-badge-amber">' + highThreat.length + ' high-threat competitors</span>' +
                '</div>' +
                '<p class="home-section-desc">' + competitors.length + ' competitors tracked across ' + totalActiveBids + ' active BEAD bids. RDOF defaults freed <strong>' + fmt(rdofTotalDefault, 'currency') + '</strong> in recaptured territory.</p>' +
                '<div class="home-bid-table-wrap">' +
                    '<table class="home-bid-table">' +
                        '<thead><tr><th>Competitor</th><th>Type</th><th>States</th><th>Active Bids</th><th>RDOF Status</th><th>Threat</th><th></th></tr></thead>' +
                        '<tbody>' +
                        competitors.filter(function(c) { return c.threat === 'high' || c.beadActivity.activeBids >= 3; }).slice(0, 8).map(function(c) {
                            var threatClass = c.threat === 'high' ? 'home-comp-high' : c.threat === 'medium' ? 'home-comp-med' : 'home-comp-low';
                            return '<tr>' +
                                '<td><strong>' + c.name + '</strong></td>' +
                                '<td>' + c.type + '</td>' +
                                '<td>' + c.states.slice(0, 5).join(', ') + (c.states.length > 5 ? '...' : '') + '</td>' +
                                '<td>' + c.beadActivity.activeBids + '</td>' +
                                '<td>' + c.rdofStatus + '</td>' +
                                '<td><span class="home-comp-badge ' + threatClass + '">' + c.threat.toUpperCase() + '</span></td>' +
                                '<td><button class="home-rpt-btn-sm" data-rpt-type="competitor" data-rpt-name="' + c.name.replace(/"/g, '&quot;') + '">+ Report</button></td>' +
                            '</tr>';
                        }).join('') +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
                '<button class="home-link-btn home-link-full" data-nav="funding">View Full Competitive Analysis</button>' +
            '</div>' : '') +

            // ── Remaining sections: single-column flow, use grids within ──

            // ── ACTIVE BIDS & CONTRACTS ──
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Active Bids & Contracts</h2>' +
                    '<span class="home-section-badge home-badge-amber">' + bids.length + ' open</span>' +
                '</div>' +
                '<div class="home-bid-table-wrap">' +
                    '<table class="home-bid-table">' +
                        '<thead><tr><th>State</th><th>Region</th><th>Bidders</th><th>Competition</th><th>Deadline</th><th></th></tr></thead>' +
                        '<tbody>' +
                        bids.map(function(b) {
                            var compClass = b.competitionLevel === 'Low' ? 'home-comp-low' :
                                            b.competitionLevel === 'Medium' ? 'home-comp-med' : 'home-comp-high';
                            return '<tr>' +
                                '<td><strong>' + b.state + '</strong></td>' +
                                '<td>' + b.region + '</td>' +
                                '<td class="home-bid-bidders">' + b.knownBidders.join(', ') + '</td>' +
                                '<td><span class="home-comp-badge ' + compClass + '">' + b.competitionLevel + '</span></td>' +
                                '<td class="home-bid-deadline">' + b.deadline + '</td>' +
                                '<td><button class="home-rpt-btn-sm" data-rpt-type="competitor" data-rpt-name="' + b.state + ' ' + b.region + '">+ Report</button></td>' +
                            '</tr>';
                        }).join('') +
                        (bids.length === 0 ? '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No active bids with upcoming deadlines</td></tr>' : '') +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
            '</div>' +

            // ── TWO-UP ROW: Top Opportunities + BEAD Pipeline ──
            '<div class="home-two-up">' +

            // ── TOP COUNTIES ──
            '<div class="home-section">' +
                '<h2 class="home-section-title">Top Opportunities</h2>' +
                '<div class="home-top-list">' +
                    topCounties.map(function(c, i) {
                        var scoreColor = c.opportunityScore >= 70 ? '#06d6a0' :
                                        c.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';
                        var name = c.county.replace(' County','').replace(' Parish','');
                        return '<div class="home-top-item" data-fips="' + c.fips + '">' +
                            '<span class="home-top-rank">' + (i + 1) + '</span>' +
                            '<div class="home-top-info">' +
                                '<span class="home-top-name">' + name + ', ' + c.state + '</span>' +
                                '<span class="home-top-detail">' +
                                    fmt(c.fundingEstimate, 'currency') + ' · ' +
                                    (c.unservedPct * 100).toFixed(0) + '% unserved' +
                                '</span>' +
                            '</div>' +
                            '<span class="home-top-score" style="background:' + scoreColor + '">' + c.opportunityScore + '</span>' +
                            '<button class="home-rpt-btn-sm home-rpt-inline" data-rpt-type="county" data-rpt-name="' + c.fips + '">+</button>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' +

            // ── BEAD PIPELINE ──
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">BEAD Pipeline — Open for Bids</h2>' +
                    '<span class="home-section-badge home-badge-blue">' + openSubgrants.length + ' states</span>' +
                '</div>' +
                '<div class="home-bead-grid">' +
                    openSubgrants.slice(0, 6).map(function(s) {
                        return '<div class="home-bead-card">' +
                            '<div class="home-bead-header">' +
                                '<strong>' + s.stateCode + '</strong>' +
                                '<span class="home-bead-alloc">' + fmt(s.allocation, 'currency') + '</span>' +
                            '</div>' +
                            '<div class="home-bead-details">' +
                                '<span>Close: <strong>' + (s.subgrantClose || 'TBD') + '</strong></span>' +
                                '<span>Applicants: <strong>' + (s.subgrantApplicants || '?') + '</strong></span>' +
                            '</div>' +
                            '<div class="home-bead-note">' + (s.notes || '') + '</div>' +
                            '<button class="home-rpt-btn-sm" data-rpt-type="beadstate" data-rpt-name="' + s.stateCode + '">+ Report</button>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' +

            '</div>' + // end home-two-up

            // ── TWO-UP ROW: Dark Fiber + RDOF Recapture ──
            '<div class="home-two-up">' +

            // ── DARK FIBER OPPORTUNITIES ──
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Dark Fiber — Untapped Cities</h2>' +
                    '<span class="home-section-badge home-badge-teal">' + darkFiberOpps.length + ' cities</span>' +
                '</div>' +
                '<div class="home-card-grid">' +
                    darkFiberOpps.slice(0, 4).map(function(net) {
                        var director = SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[net.state];
                        return '<div class="home-opp-card home-opp-fiber">' +
                            '<div class="home-opp-header">' +
                                '<strong>' + net.city + ', ' + net.state + '</strong>' +
                                '<span class="home-opp-badge">DARK FIBER</span>' +
                            '</div>' +
                            '<div class="home-opp-body">' +
                                '<span class="home-opp-name">' + net.name + '</span>' +
                                '<div class="home-opp-metrics">' +
                                    '<span>' + net.fiberMiles.toLocaleString() + ' mi</span>' +
                                    '<span>' + (net.homesPassed / 1000).toFixed(0) + 'K homes</span>' +
                                    '<span>' + net.maxSpeed + '</span>' +
                                '</div>' +
                                (director ? '<div class="home-opp-contact"><span class="home-opp-contact-name">' + director.name + '</span></div>' : '') +
                            '</div>' +
                            '<div class="home-opp-actions">' +
                                '<button class="home-rpt-btn" data-rpt-type="munifiber" data-rpt-name="' + net.name.replace(/"/g, '&quot;') + '">+ Report</button>' +
                            '</div>' +
                        '</div>';
                    }).join('') +
                    (darkFiberOpps.length === 0 ? '<div class="home-empty">No untapped dark fiber cities found.</div>' : '') +
                '</div>' +
            '</div>' +

            // ── RDOF RECAPTURE ──
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">RDOF Recapture Targets</h2>' +
                    '<span class="home-section-badge home-badge-red">' + rdofDefaults.length + '</span>' +
                '</div>' +
                '<div class="home-rdof-list">' +
                    rdofDefaults.map(function(d) {
                        return '<div class="home-rdof-item">' +
                            '<div class="home-rdof-info">' +
                                '<strong>' + d.awardee + '</strong>' +
                                '<span>' + d.locations.toLocaleString() + ' locations · ' + fmt(d.award, 'currency') + '</span>' +
                            '</div>' +
                            '<button class="home-rpt-btn-sm" data-rpt-type="rdof" data-rpt-name="' + d.awardee.replace(/"/g, '&quot;') + '">+ Report</button>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' +

            '</div>' + // end home-two-up

            // ── PARTNERSHIP SUGGESTIONS ──
            (partnerSuggestions.length > 0 ?
            '<div class="home-section">' +
                '<div class="home-section-header">' +
                    '<h2 class="home-section-title">Partnership Opportunities</h2>' +
                    '<span class="home-section-badge home-badge-teal">' + partnerSuggestions.length + ' matches</span>' +
                '</div>' +
                '<p class="home-section-desc">High-opportunity counties matched with potential partners — co-ops, municipal fiber operators, and state directors.</p>' +
                '<div class="home-card-grid home-card-grid-partner">' +
                    partnerSuggestions.map(function(ps) {
                        var scoreColor = ps.score >= 70 ? '#06d6a0' : ps.score >= 45 ? '#fbbf24' : '#ef4444';
                        return '<div class="home-opp-card home-opp-partner">' +
                            '<div class="home-opp-header">' +
                                '<strong>' + ps.county + ', ' + ps.state + '</strong>' +
                                '<span class="home-top-score" style="background:' + scoreColor + '">' + ps.score + '</span>' +
                            '</div>' +
                            '<div class="home-opp-body">' +
                                '<span style="font-size:0.72rem;color:var(--text-muted)">Funding: ' + fmt(ps.funding, 'currency') + '</span>' +
                                '<div class="home-partner-list">' +
                                    ps.partners.map(function(p) {
                                        var typeColor = p.type === 'Electric Co-op' ? '#06d6a0' : p.type === 'Municipal Fiber' ? '#22d3ee' : '#fbbf24';
                                        return '<div class="home-partner-item">' +
                                            '<span class="home-partner-type" style="border-color:' + typeColor + '">' + p.type + '</span>' +
                                            '<strong>' + p.name + '</strong>' +
                                            '<span class="home-partner-detail">' + p.detail + '</span>' +
                                        '</div>';
                                    }).join('') +
                                '</div>' +
                            '</div>' +
                            '<div class="home-opp-actions">' +
                                '<button class="home-rpt-btn" data-rpt-type="county" data-rpt-name="' + (function() { var match = counties.find(function(c) { return c.state === ps.state && c.county.indexOf(ps.county) !== -1; }); return match ? match.fips : ps.county; })() + '">+ Sales Report</button>' +
                            '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' : '') +

            // ── TWO-UP ROW: Open Grants + Quick Actions ──
            '<div class="home-two-up">' +

            // ── OPEN GRANTS ──
            '<div class="home-section">' +
                '<h2 class="home-section-title">Open Grant Programs</h2>' +
                '<div class="home-grants-list">' +
                    grantPrograms.slice(0, 6).map(function(g) {
                        var amt = g.totalFunding ? fmt(g.totalFunding, 'currency') : 'Varies';
                        return '<div class="home-grant-item">' +
                            '<div class="home-grant-info">' +
                                '<strong>' + g.name + (g._state ? ' (' + g._state + ')' : '') + '</strong>' +
                                '<span>' + amt + ' · ' + (g.agency || '') + '</span>' +
                            '</div>' +
                            '<button class="home-rpt-btn-sm" data-rpt-type="grant" data-rpt-name="' + g.name.replace(/"/g, '&quot;') + '">+ Report</button>' +
                        '</div>';
                    }).join('') +
                '</div>' +
                '<button class="home-link-btn home-link-full" data-nav="funding">View All Funding Intel</button>' +
            '</div>' +

            // ── QUICK ACTIONS ──
            '<div class="home-section">' +
                '<h2 class="home-section-title">Quick Actions</h2>' +
                '<div class="home-quick-actions">' +
                    '<button class="home-action-btn home-action-btn-primary" data-action="pursuit">Pursuit Builder</button>' +
                    '<button class="home-action-btn" data-nav="main">Map & Analysis</button>' +
                    '<button class="home-action-btn" data-nav="targets">Top Targets</button>' +
                    '<button class="home-action-btn" data-action="report">Sales Report</button>' +
                '</div>' +
            '</div>' +

            '</div>' + // end home-two-up
            '</div>'; // end home-full-width

        // Bind events
        this._bindHomeEvents(container);
        } catch(e) {
            console.error('Dashboard home render failed:', e);
            container.innerHTML = '<div class="home-hero"><h1 class="home-title">Wireless & Fiber Pipeline Intelligence</h1>' +
                '<p class="home-subtitle">Error loading dashboard. Use navigation above to explore data.</p>' +
                '<pre style="color:var(--accent-hot);font-size:0.7rem;margin-top:12px">' + e.message + '</pre></div>';
        }
    },

    _renderReportPreview: function() {
        var items = (SN.executive && SN.executive.reportItems) ? SN.executive.reportItems : [];
        if (!items.length) {
            return '<div class="home-report-empty">' +
                '<p>No items in your report yet.</p>' +
                '<p>Click <strong>+ Sales Report</strong> on any item above to start building.</p>' +
            '</div>';
        }

        var preview = items.slice(0, 4).map(function(item) {
            return '<div class="home-report-item">' +
                '<strong>' + item.name + '</strong>' +
                (item.detail ? '<span>' + item.detail + '</span>' : '') +
            '</div>';
        }).join('');

        if (items.length > 4) {
            preview += '<div class="home-report-more">+ ' + (items.length - 4) + ' more items</div>';
        }

        return '<div class="home-report-preview">' + preview +
            '<button class="home-link-btn home-link-full" data-action="report">Open Full Report</button>' +
        '</div>';
    },

    _bindHomeEvents: function(container) {
        var self = this;

        // Top county clicks -> fly to on map
        container.querySelectorAll('.home-top-item').forEach(function(el) {
            el.addEventListener('click', function(e) {
                if (e.target.closest('.home-rpt-btn-sm')) return; // Don't nav when clicking report btn
                self.showView('main');
                setTimeout(function() {
                    try { SN.map.flyTo(el.dataset.fips); } catch(err) {}
                }, 200);
            });
        });

        // All + Sales Report buttons
        container.querySelectorAll('.home-rpt-btn, .home-rpt-btn-sm').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var type = btn.dataset.rptType;
                var name = btn.dataset.rptName;
                var extra = btn.dataset.rptExtra;
                try {
                    SN.executive.addToReport(type, name, extra);
                    btn.textContent = 'Added!';
                    btn.classList.add('home-rpt-added');
                    setTimeout(function() {
                        btn.textContent = type === 'county' ? '+' : '+ Report';
                        btn.classList.remove('home-rpt-added');
                    }, 1200);
                    self._refreshReportPreview();
                } catch(err) { console.error('Add to report failed:', err); }
            });
        });

        // Quick action / nav buttons
        container.querySelectorAll('.home-action-btn, .home-link-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var nav = btn.dataset.nav;
                var action = btn.dataset.action;
                if (nav) self.showView(nav);
                else if (action === 'pursuit') self.openPursuitBuilder();
                else if (action === 'report') SN.executive.openReportPanel();
            });
        });
    },

    _refreshReportPreview: function() {
        var section = document.querySelector('.home-section:last-child');
        if (!section) return;
        var title = section.querySelector('.home-section-title');
        if (title && title.textContent === 'Your Report') {
            var html = this._renderReportPreview();
            var container = title.parentElement;
            var wrapper = container.querySelector('.home-report-preview, .home-report-empty');
            if (wrapper) wrapper.outerHTML = html;
        }
    },

    /* ═══════════════════════════════════════════════ */
    /* INSIGHTS VIEW (full page)                       */
    /* ═══════════════════════════════════════════════ */

    renderInsightsView: function() {
        var container = document.getElementById('insights-view-content');
        if (!container) return;
        try {
            var filtered = SN.app.getFilteredData();
            container.innerHTML = '<div class="insights-fullpage">' +
                '<h1 class="view-page-title">Actionable Insights</h1>' +
                '<div id="insights-view-inner"></div>' +
            '</div>';
            SN.insights.render(filtered);
            SN.insights.update(filtered);
            // Move rendered content
            var original = document.getElementById('insights-container');
            var dest = document.getElementById('insights-view-inner');
            if (original && dest) dest.innerHTML = original.innerHTML;
        } catch(e) {
            container.innerHTML = '<div class="view-page-title">Insights</div><p>Failed to load insights.</p>';
        }
    },

    /* ═══════════════════════════════════════════════ */
    /* FUNDING VIEW (full page)                        */
    /* ═══════════════════════════════════════════════ */

    renderFundingView: function() {
        var container = document.getElementById('funding-view-content');
        if (!container) return;
        try {
            // Render into full page using funding modal content
            this.fundingModalOpen = true;
            this.renderFundingModalContent();
            var modal = document.getElementById('funding-modal-content');
            if (modal) {
                container.innerHTML = '<div class="funding-fullpage" style="max-width:100%;width:100%">' + modal.innerHTML + '</div>';
                // Fix layout: ensure funding content fills the viewport
                var fp = container.querySelector('.funding-fullpage');
                if (fp) {
                    fp.style.display = 'flex';
                    fp.style.gap = '0';
                }
                // Make the content area fill remaining space
                var body = container.querySelector('.fm-body');
                if (body) body.style.flex = '1';
                // Re-bind events on the cloned content
                this._bindFundingViewEvents(container);
            }
        } catch(e) {
            container.innerHTML = '<div class="view-page-title">Funding Intel</div><p>Failed to load funding data.</p>';
        }
    },

    _bindFundingViewEvents: function(container) {
        var self = this;
        container.querySelectorAll('.fm-nav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.fundingModalSection = btn.dataset.section;
                self.renderFundingView();
            });
        });
        this._injectFundingReportButtons(container);
    },

    /* ═══════════════════════════════════════════════ */
    /* #1 — FULL-SCREEN FUNDING INTEL MODAL           */
    /* ═══════════════════════════════════════════════ */

    fundingModalOpen: false,

    initFundingModal: function() {
        var self = this;
        var expandBtn = document.getElementById('btn-expand-funding');
        if (expandBtn) {
            expandBtn.addEventListener('click', function() { self.openFundingModal(); });
        }
    },

    openFundingModal: function() {
        var modal = document.getElementById('funding-fullscreen-modal');
        if (!modal) return;
        this.fundingModalOpen = true;
        this.renderFundingModalContent();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    },

    closeFundingModal: function() {
        var modal = document.getElementById('funding-fullscreen-modal');
        if (modal) modal.classList.remove('open');
        this.fundingModalOpen = false;
        document.body.style.overflow = '';
    },

    fundingModalSection: 'grants',

    renderFundingModalContent: function() {
        var container = document.getElementById('funding-modal-content');
        if (!container) return;

        var self = this;
        var sections = [
            { id: 'grants', label: 'Grants Guide', icon: '$' },
            { id: 'awarded', label: 'Grants Awarded', icon: 'A' },
            { id: 'beadtimeline', label: 'BEAD Timeline', icon: 'B' },
            { id: 'bidtracker', label: 'Bid Tracker', icon: 'T' },
            { id: 'decisionmakers', label: 'Decision Makers', icon: 'D' },
            { id: 'winners', label: 'Past Winners', icon: 'W' },
            { id: 'competitive', label: 'Competitive', icon: 'C' },
            { id: 'scoring', label: 'Scoring', icon: 'S' }
        ];

        var sidebar = '<div class="fm-sidebar">' +
            sections.map(function(s) {
                return '<button class="fm-nav-btn' + (s.id === self.fundingModalSection ? ' fm-nav-active' : '') + '" data-section="' + s.id + '">' +
                    '<span class="fm-nav-icon">' + s.icon + '</span>' +
                    '<span class="fm-nav-label">' + s.label + '</span>' +
                '</button>';
            }).join('') +
        '</div>';

        // Use existing funding module to render the section content
        var sectionContent = '';
        try {
            var oldSection = SN.funding.activeSection;
            SN.funding.activeSection = this.fundingModalSection;
            sectionContent = SN.funding.renderActiveSection();
            SN.funding.activeSection = oldSection;
        } catch(e) {
            sectionContent = '<div class="funding-section"><p style="color:#ef4444;">Error rendering section.</p></div>';
        }

        container.innerHTML = sidebar +
            '<div class="fm-content">' +
                '<div class="fm-content-header">' +
                    '<h2>' + (sections.find(function(s) { return s.id === self.fundingModalSection; }) || {}).label + '</h2>' +
                    '<button class="fm-close" id="fm-close-btn">Close</button>' +
                '</div>' +
                '<div class="fm-content-body" id="fm-content-body">' + sectionContent + '</div>' +
            '</div>';

        // Bind sidebar navigation
        container.querySelectorAll('.fm-nav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.fundingModalSection = btn.dataset.section;
                self.renderFundingModalContent();
            });
        });

        // Bind close
        var closeBtn = document.getElementById('fm-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', function() { self.closeFundingModal(); });

        // Bind sort headers in tables
        this._bindFundingModalSorts(container);

        // Inject report buttons into funding modal
        this._injectFundingReportButtons(container);
    },

    _bindFundingModalSorts: function(container) {
        container.querySelectorAll('.funding-table th[data-sort]').forEach(function(th) {
            th.style.cursor = 'pointer';
            th.addEventListener('click', function() {
                // delegate to funding module sort
                var col = th.dataset.sort;
                if (SN.funding.activeSection === 'awarded') {
                    if (SN.funding.sortCol === col) {
                        SN.funding.sortDir = SN.funding.sortDir === 'asc' ? 'desc' : 'asc';
                    } else {
                        SN.funding.sortCol = col;
                        SN.funding.sortDir = 'desc';
                    }
                }
                SN.enhancedUI.renderFundingModalContent();
            });
        });
    },

    /* ═══════════════════════════════════════════════ */
    /* #2 — ADD-TO-REPORT BUTTONS IN FUNDING INTEL    */
    /* ═══════════════════════════════════════════════ */

    _injectFundingReportButtons: function(container) {
        var section = this.fundingModalSection;

        // Add section-level bulk report button at top of content body
        var body = container.querySelector('.fm-content-body');
        if (body && !body.querySelector('.fm-bulk-report')) {
            var bulkBtn = document.createElement('div');
            bulkBtn.className = 'fm-bulk-report';
            bulkBtn.innerHTML = '<button class="btn-add-report" style="margin:10px 14px">+ Add This Section to Report</button>';
            bulkBtn.querySelector('button').addEventListener('click', function() {
                SN.executive.addToReport('grant', section + ' — Funding Intel Section');
                SN.executive.showToast('Section added to report');
            });
            body.insertBefore(bulkBtn, body.firstChild);
        }

        // Add per-row report buttons to funding tables
        container.querySelectorAll('.funding-table tbody tr').forEach(function(row) {
            if (row.querySelector('.btn-add-report') || row.classList.contains('grant-detail-row')) return;
            // Get the name from first cell
            var firstCell = row.querySelector('td');
            if (!firstCell) return;
            var nameText = firstCell.textContent.trim().split('\n')[0].trim();
            if (!nameText || nameText.length > 100) return;

            var td = document.createElement('td');
            td.style.whiteSpace = 'nowrap';
            td.innerHTML = '<button class="btn-add-report btn-add-report-sm" title="Add to report">+ Report</button>';
            td.querySelector('button').addEventListener('click', function(e) {
                e.stopPropagation();
                var type = section === 'decisionmakers' ? 'decisionmaker' : section === 'beadtimeline' ? 'beadstate' : section === 'competitive' ? 'competitor' : 'grant';
                SN.executive.addToReport(type, nameText);
            });
            row.appendChild(td);
        });

        // Also add to competitive cards
        container.querySelectorAll('.competitive-card').forEach(function(card) {
            if (card.querySelector('.btn-add-report')) return;
            var header = card.querySelector('.competitive-card-header strong');
            var name = header ? header.textContent.trim() : 'Unknown';
            var btn = document.createElement('button');
            btn.className = 'btn-add-report btn-add-report-sm';
            btn.style.marginTop = '6px';
            btn.textContent = '+ Add to Report';
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                SN.executive.addToReport('competitor', name);
            });
            card.appendChild(btn);
        });
    },

    /* ═══════════════════════════════════════════════ */
    /* #3 — PURSUIT BUILDER WIZARD                    */
    /* ═══════════════════════════════════════════════ */

    pursuitStep: 0,
    pursuitStates: [],
    pursuitTargets: [],

    initPursuitBuilder: function() {
        var self = this;
        var btn = document.getElementById('btn-pursuit-builder');
        if (btn) btn.addEventListener('click', function() { self.openPursuitBuilder(); });
    },

    openPursuitBuilder: function() {
        this.pursuitStep = 0;
        this.pursuitStates = [];
        this.pursuitTargets = [];
        var modal = document.getElementById('pursuit-modal');
        if (modal) {
            modal.classList.add('open');
            this.renderPursuitStep();
        }
    },

    closePursuitBuilder: function() {
        var modal = document.getElementById('pursuit-modal');
        if (modal) modal.classList.remove('open');
    },

    renderPursuitStep: function() {
        var container = document.getElementById('pursuit-content');
        if (!container) return;

        var self = this;
        var step = this.pursuitStep;
        var html = '';

        if (step === 0) {
            // Step 1: Pick target states
            var states = SN.config.activeStates;
            html = '<div class="pursuit-step">' +
                '<div class="pursuit-step-header">' +
                    '<span class="pursuit-step-num">1</span>' +
                    '<h3>Choose Your Target States</h3>' +
                    '<p>Select one or more states to focus your pursuit on.</p>' +
                '</div>' +
                '<div class="pursuit-state-grid">' +
                    states.map(function(s) {
                        var active = self.pursuitStates.indexOf(s) !== -1;
                        return '<button class="pursuit-state-chip' + (active ? ' active' : '') + '" data-state="' + s + '">' + s + '</button>';
                    }).join('') +
                '</div>' +
                '<div class="pursuit-actions">' +
                    '<button class="pursuit-btn pursuit-btn-next" id="pursuit-next" ' + (this.pursuitStates.length === 0 ? 'disabled' : '') + '>Next: View Opportunities</button>' +
                '</div>' +
            '</div>';
        } else if (step === 1) {
            // Step 2: Top opportunities
            var filtered = SN.data.counties.filter(function(c) {
                return self.pursuitStates.indexOf(c.state) !== -1;
            }).sort(function(a, b) {
                return b.opportunityScore - a.opportunityScore;
            }).slice(0, 15);

            html = '<div class="pursuit-step">' +
                '<div class="pursuit-step-header">' +
                    '<span class="pursuit-step-num">2</span>' +
                    '<h3>Top Opportunities in ' + this.pursuitStates.join(', ') + '</h3>' +
                    '<p>Click checkboxes to select counties for your report.</p>' +
                '</div>' +
                '<div class="pursuit-results">' +
                    filtered.map(function(c, i) {
                        var scoreColor = c.opportunityScore >= 70 ? '#06d6a0' :
                                        c.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';
                        var checked = self.pursuitTargets.indexOf(c.fips) !== -1;
                        var name = c.county.replace(' County','').replace(' Parish','');
                        return '<div class="pursuit-result-row">' +
                            '<input type="checkbox" class="pursuit-check" data-fips="' + c.fips + '"' + (checked ? ' checked' : '') + '>' +
                            '<span class="pursuit-rank">' + (i + 1) + '</span>' +
                            '<div class="pursuit-result-info">' +
                                '<strong>' + name + ', ' + c.state + '</strong>' +
                                '<span>' + SN.kpi.fmt(c.fundingEstimate, 'currency') + ' · ' +
                                    (c.unservedPct * 100).toFixed(0) + '% unserved · ' +
                                    SN.kpi.fmt(c.population, 'compact') + ' pop</span>' +
                            '</div>' +
                            '<span class="pursuit-score" style="background:' + scoreColor + '">' + c.opportunityScore + '</span>' +
                        '</div>';
                    }).join('') +
                '</div>' +
                '<div class="pursuit-actions">' +
                    '<button class="pursuit-btn pursuit-btn-back" id="pursuit-back">Back</button>' +
                    '<button class="pursuit-btn pursuit-btn-next" id="pursuit-next">Next: Funding & Contacts</button>' +
                '</div>' +
            '</div>';
        } else if (step === 2) {
            // Step 3: Funding & Contacts for selected states
            var stateContacts = [];
            this.pursuitStates.forEach(function(s) {
                if (SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[s]) {
                    var dir = SN.data.stateDecisionMakers[s];
                    stateContacts.push({ state: s, name: dir.name, title: dir.title, email: dir.email, phone: dir.phone, agency: dir.agency });
                }
            });

            var stateGrants = (SN.data.fiberGrants || []).filter(function(g) {
                return g.status === 'Open' || g.status === 'Rolling';
            }).slice(0, 5);

            html = '<div class="pursuit-step">' +
                '<div class="pursuit-step-header">' +
                    '<span class="pursuit-step-num">3</span>' +
                    '<h3>Funding & Key Contacts</h3>' +
                    '<p>State broadband directors and open funding programs for your target states.</p>' +
                '</div>' +
                '<div class="pursuit-contacts-section">' +
                    '<h4>State Broadband Directors</h4>' +
                    (stateContacts.length > 0 ? stateContacts.map(function(c) {
                        return '<div class="pursuit-contact-card">' +
                            '<strong>' + c.name + '</strong>' +
                            '<span>' + c.title + ', ' + c.agency + ' (' + c.state + ')</span>' +
                            (c.email ? '<span class="pursuit-contact-info">' + c.email + '</span>' : '') +
                            (c.phone ? '<span class="pursuit-contact-info">' + c.phone + '</span>' : '') +
                        '</div>';
                    }).join('') : '<p class="pursuit-empty">No directors found for selected states.</p>') +
                '</div>' +
                '<div class="pursuit-contacts-section">' +
                    '<h4>Open Grant Programs</h4>' +
                    (stateGrants.length > 0 ? stateGrants.map(function(g) {
                        var fmtAmt = g.amount >= 1e9 ? '$' + (g.amount / 1e9).toFixed(1) + 'B' : '$' + (g.amount / 1e6).toFixed(0) + 'M';
                        return '<div class="pursuit-contact-card">' +
                            '<strong>' + g.name + '</strong>' +
                            '<span>' + fmtAmt + ' · ' + g.agency + ' · ' + g.status + '</span>' +
                        '</div>';
                    }).join('') : '<p class="pursuit-empty">No open grants currently.</p>') +
                '</div>' +
                '<div class="pursuit-actions">' +
                    '<button class="pursuit-btn pursuit-btn-back" id="pursuit-back">Back</button>' +
                    '<button class="pursuit-btn pursuit-btn-next" id="pursuit-next">Next: Build Report</button>' +
                '</div>' +
            '</div>';
        } else if (step === 3) {
            // Step 4: Build report
            var selectedCount = this.pursuitTargets.length;
            html = '<div class="pursuit-step">' +
                '<div class="pursuit-step-header">' +
                    '<span class="pursuit-step-num">4</span>' +
                    '<h3>Build Your Sales Report</h3>' +
                    '<p>' + selectedCount + ' counties selected. Add them all to your sales report with one click.</p>' +
                '</div>' +
                '<div class="pursuit-summary">' +
                    '<div class="pursuit-summary-stat">' +
                        '<span class="pursuit-summary-val">' + selectedCount + '</span>' +
                        '<span class="pursuit-summary-lbl">Target Counties</span>' +
                    '</div>' +
                    '<div class="pursuit-summary-stat">' +
                        '<span class="pursuit-summary-val">' + this.pursuitStates.length + '</span>' +
                        '<span class="pursuit-summary-lbl">States</span>' +
                    '</div>' +
                '</div>' +
                '<div class="pursuit-actions pursuit-actions-center">' +
                    '<button class="pursuit-btn pursuit-btn-back" id="pursuit-back">Back</button>' +
                    '<button class="pursuit-btn pursuit-btn-accent" id="pursuit-add-all">Add All to Report</button>' +
                '</div>' +
            '</div>';
        } else if (step === 4) {
            // Step 5: Done
            html = '<div class="pursuit-step pursuit-step-done">' +
                '<div class="pursuit-done-icon">&#10003;</div>' +
                '<h3>Report Ready!</h3>' +
                '<p>' + this.pursuitTargets.length + ' counties added to your sales report.</p>' +
                '<div class="pursuit-actions pursuit-actions-center">' +
                    '<button class="pursuit-btn pursuit-btn-accent" id="pursuit-open-report">Open Sales Report</button>' +
                    '<button class="pursuit-btn pursuit-btn-next" id="pursuit-go-map">Explore on Map</button>' +
                    '<button class="pursuit-btn" id="pursuit-close-final">Close</button>' +
                '</div>' +
            '</div>';
        }

        // Progress bar
        var progress = '<div class="pursuit-progress">' +
            [1,2,3,4,5].map(function(n) {
                var cls = n <= step + 1 ? ' pursuit-prog-active' : '';
                var curr = n === step + 1 ? ' pursuit-prog-current' : '';
                return '<span class="pursuit-prog-dot' + cls + curr + '">' + n + '</span>';
            }).join('<span class="pursuit-prog-line"></span>') +
        '</div>';

        container.innerHTML = progress + html;
        this._bindPursuitEvents(container);
    },

    _bindPursuitEvents: function(container) {
        var self = this;

        // State chips
        container.querySelectorAll('.pursuit-state-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var s = chip.dataset.state;
                var idx = self.pursuitStates.indexOf(s);
                if (idx === -1) self.pursuitStates.push(s);
                else self.pursuitStates.splice(idx, 1);
                self.renderPursuitStep();
            });
        });

        // Checkboxes
        container.querySelectorAll('.pursuit-check').forEach(function(cb) {
            cb.addEventListener('change', function() {
                var fips = cb.dataset.fips;
                if (cb.checked && self.pursuitTargets.indexOf(fips) === -1) {
                    self.pursuitTargets.push(fips);
                } else if (!cb.checked) {
                    var idx = self.pursuitTargets.indexOf(fips);
                    if (idx !== -1) self.pursuitTargets.splice(idx, 1);
                }
            });
        });

        // Navigation
        var nextBtn = container.querySelector('#pursuit-next');
        if (nextBtn) nextBtn.addEventListener('click', function() {
            // Capture checkboxes before advancing
            if (self.pursuitStep === 1) {
                self.pursuitTargets = [];
                container.querySelectorAll('.pursuit-check:checked').forEach(function(cb) {
                    self.pursuitTargets.push(cb.dataset.fips);
                });
            }
            self.pursuitStep++;
            self.renderPursuitStep();
        });

        var backBtn = container.querySelector('#pursuit-back');
        if (backBtn) backBtn.addEventListener('click', function() {
            self.pursuitStep--;
            self.renderPursuitStep();
        });

        // Add all to report
        var addAllBtn = container.querySelector('#pursuit-add-all');
        if (addAllBtn) addAllBtn.addEventListener('click', function() {
            self.pursuitTargets.forEach(function(fips) {
                SN.executive.addToReport('county', fips);
            });
            self.pursuitStep = 4;
            self.renderPursuitStep();
        });

        // Final actions
        var openReportBtn = container.querySelector('#pursuit-open-report');
        if (openReportBtn) openReportBtn.addEventListener('click', function() {
            self.closePursuitBuilder();
            SN.executive.openReportPanel();
        });

        var goMapBtn = container.querySelector('#pursuit-go-map');
        if (goMapBtn) goMapBtn.addEventListener('click', function() {
            self.closePursuitBuilder();
            self.showView('main');
            if (self.pursuitStates.length === 1) {
                document.getElementById('filter-state').value = self.pursuitStates[0];
                SN.state.filters.state = self.pursuitStates[0];
                SN.app.onFilterChange();
            }
        });

        var closeFinalBtn = container.querySelector('#pursuit-close-final');
        if (closeFinalBtn) closeFinalBtn.addEventListener('click', function() {
            self.closePursuitBuilder();
        });
    },

    /* ═══════════════════════════════════════════════ */
    /* #4 — TOP TARGETS PAGE                          */
    /* ═══════════════════════════════════════════════ */

    targetsScoreMin: 0,
    targetsState: 'all',

    renderTopTargets: function() {
        var container = document.getElementById('targets-content');
        if (!container) return;

        var self = this;
        var counties = SN.data.counties.filter(function(c) {
            if (self.targetsState !== 'all' && c.state !== self.targetsState) return false;
            if (c.opportunityScore < self.targetsScoreMin) return false;
            return true;
        }).sort(function(a, b) {
            return b.opportunityScore - a.opportunityScore;
        }).slice(0, 20);

        // Quick wins
        var cfg = SN.config.insights.quickWin;
        var quickWins = SN.data.counties.filter(function(c) {
            if (self.targetsState !== 'all' && c.state !== self.targetsState) return false;
            return c.opportunityScore >= cfg.minScore &&
                   c.population >= cfg.minPop && c.population <= cfg.maxPop &&
                   c.unservedPct >= cfg.minUnserved && c.beadStatus === 'Approved';
        }).sort(function(a, b) { return b.opportunityScore - a.opportunityScore; }).slice(0, 6);

        // Co-ops
        var coops = (SN.data.coopDecisionMakers || []).filter(function(c) {
            return c.fiberStatus === 'Building';
        }).slice(0, 6);

        // RDOF defaults
        var rdofDefaults = (SN.data.rdofDefaults || []).slice(0, 5);

        // Build filter bar
        var states = SN.config.activeStates;
        var filterHtml = '<div class="targets-filter">' +
            '<select id="targets-state-filter">' +
                '<option value="all">All States</option>' +
                states.map(function(s) {
                    return '<option value="' + s + '"' + (s === self.targetsState ? ' selected' : '') + '>' + s + '</option>';
                }).join('') +
            '</select>' +
            '<div class="targets-score-filter">' +
                '<label>Score &ge;</label>' +
                '<input type="range" id="targets-score-filter" min="0" max="100" value="' + this.targetsScoreMin + '" step="5">' +
                '<span id="targets-score-label">' + this.targetsScoreMin + '</span>' +
            '</div>' +
        '</div>';

        container.innerHTML = '<div class="targets-layout">' +
            // Main column
            '<div class="targets-main">' +
                '<h1 class="targets-title">Top Deployment Targets</h1>' +
                '<p class="targets-subtitle">Highest composite scores combining coverage gap, funding eligibility, population density, and 5G readiness.</p>' +
                filterHtml +
                '<div class="targets-list">' +
                    counties.map(function(c, i) {
                        var scoreColor = c.opportunityScore >= 70 ? '#06d6a0' :
                                        c.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';
                        var name = c.county.replace(' County','').replace(' Parish','');
                        var directorInfo = '';
                        if (SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[c.state]) {
                            var dir = SN.data.stateDecisionMakers[c.state];
                            directorInfo = '<span class="targets-contact">Contact: ' + dir.name + ' &middot; ' + (dir.email || dir.phone || '') + '</span>';
                        }
                        return '<div class="targets-card" data-fips="' + c.fips + '">' +
                            '<div class="targets-card-rank">' + (i + 1) + '</div>' +
                            '<div class="targets-card-body">' +
                                '<div class="targets-card-header">' +
                                    '<h3>' + name + ', ' + c.state + '</h3>' +
                                    '<span class="targets-card-score" style="background:' + scoreColor + '">' + c.opportunityScore + '</span>' +
                                '</div>' +
                                '<div class="targets-card-metrics">' +
                                    '<span>' + SN.kpi.fmt(c.fundingEstimate, 'currency') + ' funding</span>' +
                                    '<span>' + (c.unservedPct * 100).toFixed(0) + '% unserved</span>' +
                                    '<span>' + SN.kpi.fmt(c.population, 'compact') + ' pop</span>' +
                                    '<span>' + (c.fiberAvailPct * 100).toFixed(0) + '% fiber</span>' +
                                    '<span>BEAD: ' + c.beadStatus + '</span>' +
                                '</div>' +
                                directorInfo +
                                '<div class="targets-card-actions">' +
                                    '<button class="targets-btn targets-btn-map" data-fips="' + c.fips + '">View on Map</button>' +
                                    '<button class="targets-btn targets-btn-report" data-fips="' + c.fips + '">+ Add to Report</button>' +
                                    '<button class="targets-btn targets-btn-dive" data-fips="' + c.fips + '">Deep Dive</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>' +

            // Sidebar
            '<div class="targets-sidebar">' +
                // Quick Wins
                '<div class="targets-sidebar-section">' +
                    '<h3>Quick Wins</h3>' +
                    '<p>BEAD-approved, manageable size, high ROI potential.</p>' +
                    (quickWins.length > 0 ? quickWins.map(function(c) {
                        var name = c.county.replace(' County','').replace(' Parish','');
                        return '<div class="targets-sidebar-item" data-fips="' + c.fips + '">' +
                            '<strong>' + name + ', ' + c.state + '</strong>' +
                            '<span>Score ' + c.opportunityScore + ' &middot; ' + SN.kpi.fmt(c.fundingEstimate, 'currency') + '</span>' +
                        '</div>';
                    }).join('') : '<p class="targets-empty">No quick wins match current filters.</p>') +
                '</div>' +

                // Co-op Partners
                '<div class="targets-sidebar-section">' +
                    '<h3>Co-op Partners Building Now</h3>' +
                    (coops.length > 0 ? coops.map(function(c) {
                        return '<div class="targets-sidebar-item">' +
                            '<strong>' + c.name + ' (' + c.state + ')</strong>' +
                            '<span>' + c.members.toLocaleString() + ' members &middot; ' + c.milesPlanned.toLocaleString() + ' mi</span>' +
                        '</div>';
                    }).join('') : '<p class="targets-empty">No co-ops found.</p>') +
                '</div>' +

                // RDOF Defaults
                '<div class="targets-sidebar-section">' +
                    '<h3>RDOF Defaults</h3>' +
                    (rdofDefaults.length > 0 ? rdofDefaults.map(function(d) {
                        return '<div class="targets-sidebar-item">' +
                            '<strong>' + d.awardee + '</strong>' +
                            '<span>' + d.locations.toLocaleString() + ' locations &middot; ' + d.reason + '</span>' +
                        '</div>';
                    }).join('') : '<p class="targets-empty">No defaults found.</p>') +
                '</div>' +
            '</div>' +
        '</div>';

        this._bindTargetEvents(container);
    },

    _bindTargetEvents: function(container) {
        var self = this;

        // Filter changes
        var stateFilter = container.querySelector('#targets-state-filter');
        if (stateFilter) stateFilter.addEventListener('change', function() {
            self.targetsState = stateFilter.value;
            self.renderTopTargets();
        });

        var scoreFilter = container.querySelector('#targets-score-filter');
        if (scoreFilter) scoreFilter.addEventListener('input', function() {
            self.targetsScoreMin = parseInt(scoreFilter.value) || 0;
            var label = container.querySelector('#targets-score-label');
            if (label) label.textContent = self.targetsScoreMin;
            self.renderTopTargets();
        });

        // Card action buttons
        container.querySelectorAll('.targets-btn-map').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                self.showView('main');
                setTimeout(function() { SN.map.flyTo(btn.dataset.fips); }, 200);
            });
        });

        container.querySelectorAll('.targets-btn-report').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                SN.executive.addToReport('county', btn.dataset.fips);
            });
        });

        container.querySelectorAll('.targets-btn-dive').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                self.openCountyDive(btn.dataset.fips);
            });
        });

        // Sidebar item clicks
        container.querySelectorAll('.targets-sidebar-item[data-fips]').forEach(function(el) {
            el.addEventListener('click', function() {
                self.openCountyDive(el.dataset.fips);
            });
        });

        // Card clicks
        container.querySelectorAll('.targets-card').forEach(function(card) {
            card.addEventListener('click', function() {
                self.openCountyDive(card.dataset.fips);
            });
        });
    },

    /* ═══════════════════════════════════════════════ */
    /* #5 — COUNTY DEEP-DIVE MODAL                   */
    /* ═══════════════════════════════════════════════ */

    countyDiveTab: 'overview',

    initCountyDive: function() {
        // Will be opened programmatically
    },

    openCountyDive: function(fips) {
        var county = SN.data.counties.find(function(c) { return c.fips === fips; });
        if (!county) return;

        this.countyDiveTab = 'overview';
        var modal = document.getElementById('county-dive-modal');
        if (!modal) return;
        modal.classList.add('open');
        this.renderCountyDive(county);
    },

    closeCountyDive: function() {
        var modal = document.getElementById('county-dive-modal');
        if (modal) modal.classList.remove('open');
    },

    renderCountyDive: function(county) {
        var container = document.getElementById('county-dive-content');
        if (!container) return;

        var self = this;
        var scoreColor = county.opportunityScore >= 70 ? '#06d6a0' :
                        county.opportunityScore >= 45 ? '#fbbf24' : '#ef4444';
        var name = county.county;

        // Tabs
        var tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'funding', label: 'Funding' },
            { id: 'contacts', label: 'Contacts' },
            { id: 'competition', label: 'Competition' },
            { id: 'action', label: 'Action' }
        ];

        var tabsHtml = '<div class="cd-tabs">' +
            tabs.map(function(t) {
                return '<button class="cd-tab' + (t.id === self.countyDiveTab ? ' cd-tab-active' : '') + '" data-tab="' + t.id + '">' + t.label + '</button>';
            }).join('') +
        '</div>';

        var contentHtml = '';
        if (this.countyDiveTab === 'overview') {
            var breakdown = SN.scoring.getBreakdown(county);
            contentHtml = '<div class="cd-overview">' +
                '<div class="cd-score-hero" style="border-color:' + scoreColor + '">' +
                    '<span class="cd-score-num" style="color:' + scoreColor + '">' + county.opportunityScore + '</span>' +
                    '<span class="cd-score-label">Opportunity Score</span>' +
                '</div>' +
                '<div class="cd-metrics-grid">' +
                    this._cdMetric('Population', county.population.toLocaleString()) +
                    this._cdMetric('Median Income', '$' + (county.medianIncome / 1000).toFixed(0) + 'K') +
                    this._cdMetric('Coverage Gap', (county.coverageGap * 100).toFixed(1) + '%') +
                    this._cdMetric('Unserved %', (county.unservedPct * 100).toFixed(1) + '%') +
                    this._cdMetric('Unserved BSLs', county.unservedBSLs.toLocaleString()) +
                    this._cdMetric('Fiber Availability', (county.fiberAvailPct * 100).toFixed(0) + '%') +
                    this._cdMetric('Providers', county.towerCount.toString()) +
                    this._cdMetric('5G Readiness', county.readiness5g.toString()) +
                    this._cdMetric('Poverty Rate', (county.povertyRate * 100).toFixed(1) + '%') +
                    this._cdMetric('Pop. Density', county.populationDensity.toFixed(0) + '/sq mi') +
                    this._cdMetric('BEAD Status', county.beadStatus) +
                    this._cdMetric('Est. Funding', SN.kpi.fmt(county.fundingEstimate, 'currency')) +
                '</div>' +
                '<h4>Score Breakdown</h4>' +
                '<div class="cd-breakdown">' +
                    Object.keys(breakdown).map(function(key) {
                        var b = breakdown[key];
                        var labels = { coverageGap: 'Coverage Gap', unservedPct: 'Unserved %', popDensity: 'Pop. Density', incomeNeed: 'Income Need', readiness5g: '5G Readiness', funding: 'Funding' };
                        return '<div class="cd-breakdown-row">' +
                            '<span class="cd-breakdown-name">' + (labels[key] || key) + '</span>' +
                            '<div class="cd-breakdown-bar"><div style="width:' + b.score + '%;background:' + scoreColor + '"></div></div>' +
                            '<span class="cd-breakdown-score">' + b.score + '</span>' +
                            '<span class="cd-breakdown-weight">' + Math.round(b.weight * 100) + '%</span>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>';
        } else if (this.countyDiveTab === 'funding') {
            var stateAlloc = SN.config.beadAllocations[county.state] || 0;
            var beadTimeline = (SN.data.beadTimeline || []).find(function(t) { return t.state === county.state; });
            var stateGrants = (SN.data.fiberGrants || []).slice(0, 5);

            contentHtml = '<div class="cd-funding">' +
                '<div class="cd-funding-hero">' +
                    this._cdMetric('County Funding Est.', SN.kpi.fmt(county.fundingEstimate, 'currency')) +
                    this._cdMetric('State BEAD Allocation', SN.kpi.fmt(stateAlloc, 'currency')) +
                    this._cdMetric('BEAD Status', county.beadStatus) +
                    this._cdMetric('Unserved BSLs', county.unservedBSLs.toLocaleString()) +
                '</div>' +
                (beadTimeline ? '<div class="cd-section"><h4>BEAD Timeline — ' + county.state + '</h4>' +
                    '<p>Phase: ' + (beadTimeline.phase || 'N/A') + '</p>' +
                    (beadTimeline.rfpDate ? '<p>RFP Date: ' + beadTimeline.rfpDate + '</p>' : '') +
                '</div>' : '') +
                '<div class="cd-section"><h4>Applicable Grant Programs</h4>' +
                    stateGrants.map(function(g) {
                        var fmtAmt = g.amount >= 1e9 ? '$' + (g.amount / 1e9).toFixed(1) + 'B' : '$' + (g.amount / 1e6).toFixed(0) + 'M';
                        return '<div class="cd-grant-row">' +
                            '<strong>' + g.name + '</strong> (' + g.agency + ')' +
                            '<span>' + fmtAmt + ' · ' + g.status + '</span>' +
                        '</div>';
                    }).join('') +
                '</div>' +
            '</div>';
        } else if (this.countyDiveTab === 'contacts') {
            var contacts = [];
            if (SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[county.state]) {
                var dir = SN.data.stateDecisionMakers[county.state];
                contacts.push({ type: 'State Broadband Director', name: dir.name, title: dir.title, org: dir.agency, email: dir.email, phone: dir.phone });
            }
            if (SN.data.coopDecisionMakers) {
                SN.data.coopDecisionMakers.filter(function(c) { return c.state === county.state; }).forEach(function(coop) {
                    contacts.push({ type: 'Electric Co-op', name: coop.name, title: coop.contact, org: coop.name, email: null, phone: coop.phone });
                });
            }
            if (SN.data.tribalDecisionMakers) {
                SN.data.tribalDecisionMakers.filter(function(t) { return t.region === county.state; }).forEach(function(t) {
                    contacts.push({ type: 'Tribal', name: t.tribe, title: t.contact, org: t.program, email: null, phone: t.phone });
                });
            }

            contentHtml = '<div class="cd-contacts">' +
                (contacts.length > 0 ? contacts.map(function(c) {
                    return '<div class="cd-contact-card">' +
                        '<span class="cd-contact-type">' + c.type + '</span>' +
                        '<strong>' + c.name + '</strong>' +
                        '<span>' + c.title + '</span>' +
                        (c.org ? '<span class="cd-contact-org">' + c.org + '</span>' : '') +
                        (c.email ? '<span class="cd-contact-info">' + c.email + '</span>' : '') +
                        (c.phone ? '<span class="cd-contact-info">' + c.phone + '</span>' : '') +
                    '</div>';
                }).join('') : '<p class="cd-empty">No contacts found for this county.</p>') +
            '</div>';
        } else if (this.countyDiveTab === 'competition') {
            var beadBids = (SN.data.beadCompetitiveBids || []).filter(function(b) {
                return b.state === county.state;
            }).slice(0, 5);

            contentHtml = '<div class="cd-competition">' +
                '<h4>Active Competitive Bids in ' + county.state + '</h4>' +
                (beadBids.length > 0 ? beadBids.map(function(b) {
                    return '<div class="cd-bid-row">' +
                        '<strong>' + b.bidder + '</strong>' +
                        '<span>' + (b.counties || 0) + ' counties &middot; ' + (b.technology || 'N/A') + '</span>' +
                    '</div>';
                }).join('') : '<p class="cd-empty">No competitive bids found for ' + county.state + '.</p>') +
                '<h4>Market Overview</h4>' +
                '<div class="cd-market-info">' +
                    this._cdMetric('Providers', county.towerCount.toString()) +
                    this._cdMetric('Fiber Penetration', (county.fiberAvailPct * 100).toFixed(0) + '%') +
                    this._cdMetric('5G Readiness', county.readiness5g + '/100') +
                '</div>' +
            '</div>';
        } else if (this.countyDiveTab === 'action') {
            contentHtml = '<div class="cd-action">' +
                '<h4>Add to Sales Report</h4>' +
                '<div class="cd-action-checks">' +
                    '<label><input type="checkbox" checked class="cd-action-check" data-type="county" data-id="' + county.fips + '"> County Profile</label>' +
                '</div>' +
                '<button class="cd-action-btn" id="cd-add-report" data-fips="' + county.fips + '">Add Selected to Report</button>' +
                '<button class="cd-action-btn cd-action-btn-map" id="cd-view-map" data-fips="' + county.fips + '">View on Map</button>' +
            '</div>';
        }

        container.innerHTML =
            '<div class="cd-header">' +
                '<div class="cd-header-info">' +
                    '<h2>' + name + '</h2>' +
                    '<span class="cd-header-state">' + county.stateName + ' &middot; FIPS: ' + county.fips + '</span>' +
                '</div>' +
                '<button class="cd-close" id="cd-close-btn">&times;</button>' +
            '</div>' +
            tabsHtml +
            '<div class="cd-body">' + contentHtml + '</div>';

        // Bind events
        container.querySelectorAll('.cd-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                self.countyDiveTab = tab.dataset.tab;
                self.renderCountyDive(county);
            });
        });

        var closeBtn = container.querySelector('#cd-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', function() { self.closeCountyDive(); });

        var addReportBtn = container.querySelector('#cd-add-report');
        if (addReportBtn) addReportBtn.addEventListener('click', function() {
            SN.executive.addToReport('county', county.fips);
        });

        var viewMapBtn = container.querySelector('#cd-view-map');
        if (viewMapBtn) viewMapBtn.addEventListener('click', function() {
            self.closeCountyDive();
            self.showView('main');
            setTimeout(function() { SN.map.flyTo(county.fips); }, 200);
        });
    },

    _cdMetric: function(label, value) {
        return '<div class="cd-metric">' +
            '<span class="cd-metric-val">' + value + '</span>' +
            '<span class="cd-metric-lbl">' + label + '</span>' +
        '</div>';
    },

    /* ═══════════════════════════════════════════════ */
    /* #6 — STICKY ACTION BAR                         */
    /* ═══════════════════════════════════════════════ */

    initActionBar: function() {
        this.updateActionBar();
    },

    updateActionBar: function() {
        var bar = document.getElementById('action-bar');
        if (!bar) return;

        var items = SN.executive.reportItems || [];
        var count = items.length;
        var lastItem = count > 0 ? items[items.length - 1] : null;

        var countEl = bar.querySelector('#action-bar-count');
        if (countEl) countEl.textContent = count + ' item' + (count !== 1 ? 's' : '') + ' in report';

        var lastEl = bar.querySelector('#action-bar-last');
        if (lastEl) {
            lastEl.textContent = lastItem ? 'Last: ' + lastItem.name : '';
            lastEl.style.display = lastItem ? 'inline' : 'none';
        }

        // Show/hide bar based on items
        bar.classList.toggle('action-bar-visible', count > 0);
    },

    /* ═══════════════════════════════════════════════ */
    /* #8 — SMART FILTER LENSES / PRESETS             */
    /* ═══════════════════════════════════════════════ */

    activeLens: null,

    lenses: [
        { id: 'bead-hot', label: 'BEAD Hot Zones', filter: function(c) { return c.beadStatus === 'Approved' && c.unservedPct > 0.05; } },
        { id: 'quick-wins', label: 'Quick Wins', filter: function(c) { return c.opportunityScore >= 60 && c.population < 200000 && c.beadStatus === 'Approved'; } },
        { id: 'high-gap', label: 'High Gap (>25%)', filter: function(c) { return c.coverageGap > 0.25; } },
        { id: 'rural-opp', label: 'Rural Opportunity', filter: function(c) { return c.populationDensity < 50 && c.unservedPct > 0.15; } },
        { id: 'top-score', label: 'Score 70+', filter: function(c) { return c.opportunityScore >= 70; } }
    ],

    initFilterLenses: function() {
        var container = document.getElementById('filter-lenses');
        if (!container) return;

        var self = this;
        container.innerHTML = this.lenses.map(function(l) {
            return '<button class="lens-chip' + (self.activeLens === l.id ? ' lens-active' : '') + '" data-lens="' + l.id + '">' + l.label + '</button>';
        }).join('') + '<button class="lens-chip lens-clear" id="lens-clear" style="display:' + (this.activeLens ? 'inline-flex' : 'none') + '">Clear Lens</button>';

        container.querySelectorAll('.lens-chip[data-lens]').forEach(function(chip) {
            chip.addEventListener('click', function() {
                self.applyLens(chip.dataset.lens);
            });
        });

        var clearBtn = container.querySelector('#lens-clear');
        if (clearBtn) clearBtn.addEventListener('click', function() { self.clearLens(); });
    },

    applyLens: function(lensId) {
        var lens = this.lenses.find(function(l) { return l.id === lensId; });
        if (!lens) return;

        this.activeLens = lensId;

        // Reset standard filters first
        document.getElementById('filter-state').value = 'all';
        document.getElementById('filter-score').value = 0;
        SN.state.filters.state = 'all';
        SN.state.filters.minScore = 0;
        SN.app.updateScoreLabel(0);

        // Apply lens filter
        SN.state.filters.lensFilter = lens.filter;
        SN.app.onFilterChange();

        // Update lens UI
        this.initFilterLenses();
    },

    clearLens: function() {
        this.activeLens = null;
        SN.state.filters.lensFilter = null;
        SN.app.onFilterChange();
        this.initFilterLenses();
    },

    /* ═══════════════════════════════════════════════ */
    /* #10 — DECISION MAKER ROLODEX                   */
    /* ═══════════════════════════════════════════════ */

    rolodexSearch: '',
    rolodexGroup: 'all',

    renderRolodex: function() {
        var container = document.getElementById('rolodex-content');
        if (!container) return;

        var self = this;
        var contacts = this._gatherContacts();

        // Filter by search — match across all fields
        if (this.rolodexSearch) {
            var q = this.rolodexSearch.toLowerCase();
            contacts = contacts.filter(function(c) {
                return (c.name && c.name.toLowerCase().indexOf(q) !== -1) ||
                       (c.state && c.state.toLowerCase().indexOf(q) !== -1) ||
                       (c.type && c.type.toLowerCase().indexOf(q) !== -1) ||
                       (c.org && c.org.toLowerCase().indexOf(q) !== -1) ||
                       (c.title && c.title.toLowerCase().indexOf(q) !== -1) ||
                       (c.email && c.email.toLowerCase().indexOf(q) !== -1);
            });
        }

        // Filter by group
        if (this.rolodexGroup !== 'all') {
            contacts = contacts.filter(function(c) { return c.type === self.rolodexGroup; });
        }

        container.innerHTML =
            '<div class="rolodex-header">' +
                '<h1 class="rolodex-title">Decision Maker Rolodex</h1>' +
                '<p class="rolodex-subtitle">' + contacts.length + ' contacts across all states</p>' +
            '</div>' +
            '<div class="rolodex-controls">' +
                '<input type="text" class="rolodex-search" id="rolodex-search" placeholder="Search by name, state, or organization..." value="' + this.rolodexSearch + '">' +
                '<div class="rolodex-group-btns">' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'all' ? ' active' : '') + '" data-group="all">All</button>' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'Director' ? ' active' : '') + '" data-group="Director">Directors</button>' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'CIO' ? ' active' : '') + '" data-group="CIO">City CIOs</button>' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'Co-op' ? ' active' : '') + '" data-group="Co-op">Co-ops</button>' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'Tribal' ? ' active' : '') + '" data-group="Tribal">Tribal</button>' +
                    '<button class="rolodex-group-btn' + (this.rolodexGroup === 'DC Contact' ? ' active' : '') + '" data-group="DC Contact">Data Centers</button>' +
                '</div>' +
            '</div>' +
            '<div class="rolodex-grid">' +
                contacts.map(function(c) {
                    var typeColors = { Director: '#38bdf8', 'Co-op': '#a78bfa', Tribal: '#06d6a0', CIO: '#fbbf24', 'DC Contact': '#818cf8' };
                    return '<div class="rolodex-card">' +
                        '<div class="rolodex-card-header">' +
                            '<span class="rolodex-card-type" style="background:' + (typeColors[c.type] || '#06d6a0') + '">' + c.type + '</span>' +
                            '<span class="rolodex-card-state">' + c.state + '</span>' +
                        '</div>' +
                        '<strong class="rolodex-card-name">' + c.name + '</strong>' +
                        (c.title ? '<span class="rolodex-card-title">' + c.title + '</span>' : '') +
                        (c.org ? '<span class="rolodex-card-org">' + c.org + '</span>' : '') +
                        '<div class="rolodex-card-contacts">' +
                            (c.email ? '<span class="rolodex-card-email">' + c.email + '</span>' : '') +
                            (c.phone ? '<span class="rolodex-card-phone">' + c.phone + '</span>' : '') +
                        '</div>' +
                        '<div class="rolodex-card-actions">' +
                            '<button class="rolodex-btn rolodex-btn-report" data-type="decisionmaker" data-name="' + c.name + '">+ Report</button>' +
                            (c.email ? '<button class="rolodex-btn rolodex-btn-copy" data-copy="' + c.email + '">Copy Email</button>' : '') +
                        '</div>' +
                    '</div>';
                }).join('') +
                (contacts.length === 0 ? '<div class="rolodex-empty">No contacts match your search.</div>' : '') +
            '</div>';

        this._bindRolodexEvents(container);
    },

    _gatherContacts: function() {
        var contacts = [];

        // State directors
        if (SN.data.stateDecisionMakers) {
            Object.keys(SN.data.stateDecisionMakers).forEach(function(state) {
                var d = SN.data.stateDecisionMakers[state];
                contacts.push({
                    type: 'Director', name: d.name, title: d.title, org: d.agency,
                    state: state, email: d.email, phone: d.phone
                });
            });
        }

        // Co-ops
        if (SN.data.coopDecisionMakers) {
            SN.data.coopDecisionMakers.forEach(function(c) {
                contacts.push({
                    type: 'Co-op', name: c.name, title: c.contact, org: c.name,
                    state: c.state, email: null, phone: c.phone
                });
            });
        }

        // Tribal
        if (SN.data.tribalDecisionMakers) {
            SN.data.tribalDecisionMakers.forEach(function(t) {
                contacts.push({
                    type: 'Tribal', name: t.tribe, title: t.contact, org: t.program,
                    state: t.region || '', email: null, phone: t.phone
                });
            });
        }

        // City CIOs/CTOs from smart cities (decisionMaker field)
        var seen = {};
        if (SN.data.smartCities) {
            SN.data.smartCities.forEach(function(c) {
                if (c.decisionMaker && c.decisionMaker.name) {
                    var key = c.decisionMaker.name + c.state;
                    if (!seen[key]) {
                        seen[key] = true;
                        contacts.push({
                            type: 'CIO', name: c.decisionMaker.name,
                            title: c.decisionMaker.title || 'City Technology Official',
                            org: c.name + ', ' + c.state,
                            state: c.state,
                            email: c.decisionMaker.email || null,
                            phone: c.decisionMaker.phone || null
                        });
                    }
                }
            });
        }

        // Data center contacts
        if (SN.data.dataCenters) {
            SN.data.dataCenters.forEach(function(dc) {
                if (dc.contactName && dc.contactEmail) {
                    contacts.push({
                        type: 'DC Contact', name: dc.contactName,
                        title: dc.operator + ' — ' + dc.city + ', ' + dc.state,
                        org: dc.name,
                        state: dc.state,
                        email: dc.contactEmail,
                        phone: dc.contactPhone || null
                    });
                }
            });
        }

        return contacts;
    },

    _bindRolodexEvents: function(container) {
        var self = this;
        var searchTimeout;

        var searchInput = container.querySelector('#rolodex-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    self.rolodexSearch = searchInput.value;
                    self.renderRolodex();
                    // Refocus and restore cursor
                    var newInput = document.getElementById('rolodex-search');
                    if (newInput) { newInput.focus(); newInput.selectionStart = newInput.selectionEnd = newInput.value.length; }
                }, 300);
            });
        }

        container.querySelectorAll('.rolodex-group-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.rolodexGroup = btn.dataset.group;
                self.renderRolodex();
            });
        });

        container.querySelectorAll('.rolodex-btn-report').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                SN.executive.addToReport(btn.dataset.type, btn.dataset.name);
            });
        });

        container.querySelectorAll('.rolodex-btn-copy').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var text = btn.dataset.copy;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                    SN.executive.showToast('Copied: ' + text);
                }
            });
        });
    }
};
