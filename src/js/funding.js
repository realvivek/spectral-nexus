/**
 * Spectral Nexus — Funding Intel Module
 * Grants pursuit guide, grants awarded table, decision makers directory,
 * competitive landscape, past winners, scoring methodology.
 */

window.SN = window.SN || {};

SN.funding = {

    sortCol: 'award',
    sortDir: 'desc',
    grantsSortCol: 'amount',
    grantsSortDir: 'desc',
    dmSortCol: 'state',
    dmSortDir: 'asc',
    activeSection: 'grants',

    init() {
        // nothing needed — rendered on tab switch
    },

    /**
     * Render the full Funding Intel panel.
     */
    render() {
        var container = document.getElementById('funding-container');
        if (!container) return;

        container.innerHTML =
            this.renderSubTabs() +
            '<div id="funding-content">' +
                this.renderActiveSection() +
            '</div>';

        this.bindSubTabs();
    },

    renderActiveSection() {
        switch (this.activeSection) {
            case 'grants': return this.renderGrants();
            case 'awarded': return this.renderGrantsAwarded();
            case 'decisionmakers': return this.renderDecisionMakers();
            case 'winners': return this.renderWinners();
            case 'competitive': return this.renderCompetitive();
            case 'scoring': return this.renderScoring();
            default: return this.renderGrants();
        }
    },

    renderSubTabs() {
        var tabs = [
            { id: 'grants', label: 'Grants Guide' },
            { id: 'awarded', label: 'Grants Awarded' },
            { id: 'decisionmakers', label: 'Decision Makers' },
            { id: 'winners', label: 'Past Winners' },
            { id: 'competitive', label: 'Competitive' },
            { id: 'scoring', label: 'Scoring' }
        ];

        return '<div class="funding-subtabs">' +
            tabs.map(function(t) {
                return '<button class="funding-subtab' + (SN.funding.activeSection === t.id ? ' active' : '') + '" data-section="' + t.id + '">' + t.label + '</button>';
            }).join('') +
        '</div>';
    },

    bindSubTabs() {
        var self = this;
        document.querySelectorAll('.funding-subtab').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.activeSection = btn.dataset.section;
                self.render();
            });
        });
    },

    /* ═══════════════════════════════════════════════
     * GRANTS PURSUIT GUIDE
     * ═══════════════════════════════════════════════ */

    renderGrants() {
        var grants = SN.data.grants;
        if (!grants) return '<p>No grant data available.</p>';

        var totalFederal = 0;
        var openCount = 0;
        grants.federal.forEach(function(g) {
            totalFederal += g.totalFunding || 0;
            if (g.statusCode === 'open' || g.statusCode === 'rolling') openCount++;
        });

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Fiber & Broadband Grants — Pursuit Guide</h3>' +
                '<p>How to win broadband contracts as a system integrator or fiber infrastructure company.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(totalFederal, 'currency') + '</span><span class="fhs-lbl">Total Federal Funding</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + openCount + '</span><span class="fhs-lbl">Programs Open Now</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + grants.federal.length + '</span><span class="fhs-lbl">Federal Programs</span></div>' +
                '</div>' +
            '</div>';

        html += '<div class="funding-playbook">' +
            '<h4>System Integrator Playbook</h4>' +
            '<div class="playbook-steps">' +
                '<div class="playbook-step"><span class="step-num">1</span><div><strong>Identify BEAD Subgrant Opportunities</strong><br>States are awarding BEAD subgrants to ISPs and contractors. Partner with awarded ISPs as the build-out contractor, or apply directly in states that allow SI participation.</div></div>' +
                '<div class="playbook-step"><span class="step-num">2</span><div><strong>Layer Private 5G on New Fiber</strong><br>Every new fiber route is a backhaul opportunity for CBRS/private 5G. Offer ISPs and enterprises a bundled solution: fiber last-mile + private wireless coverage for industrial/campus sites nearby.</div></div>' +
                '<div class="playbook-step"><span class="step-num">3</span><div><strong>Target RDOF Default Areas</strong><br>$3.3B in RDOF defaults left ~1.9M locations unserved. These areas are BEAD-eligible and actively seeking new providers. Toggle the RDOF Defaults layer on the map to find them.</div></div>' +
                '<div class="playbook-step"><span class="step-num">4</span><div><strong>Build Smart City Use Cases</strong><br>Municipalities with new fiber can expand into smart city services: smart traffic, public safety cameras, IoT sensors, EV charging. Pitch the city on a connected infrastructure package.</div></div>' +
                '<div class="playbook-step"><span class="step-num">5</span><div><strong>Stack Multiple Funding Sources</strong><br>Combine BEAD + state programs + E-Rate + Digital Equity. Many projects can draw from 2-3 programs to reduce match requirements and increase total project funding.</div></div>' +
            '</div>' +
        '</div>';

        html += '<h4>Federal Grant Programs</h4>' +
            '<div class="funding-table-wrap"><table class="funding-table" id="grants-table">' +
            '<thead><tr>' +
                '<th>Program</th>' +
                '<th>Funding</th>' +
                '<th>Status</th>' +
                '<th>Type</th>' +
                '<th>Key Date</th>' +
            '</tr></thead><tbody>';

        grants.federal.forEach(function(g) {
            var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
            html += '<tr>' +
                '<td><strong>' + g.name + '</strong><br><span class="funding-agency">' + g.agency + '</span></td>' +
                '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                '<td>' + g.type + '</td>' +
                '<td class="funding-date">' + (g.keyDate || 'TBD') + '</td>' +
            '</tr>';
        });

        html += '</tbody></table></div>';

        html += '<h4>State Programs</h4>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>State</th><th>Program</th><th>Funding</th><th>Status</th></tr></thead><tbody>';

        Object.keys(grants.state).forEach(function(st) {
            grants.state[st].forEach(function(g) {
                var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td><strong>' + g.name + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                    '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                '</tr>';
            });
        });

        html += '</tbody></table></div></div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * GRANTS AWARDED — Sortable Table
     * Fiber grants awarded, past and current.
     * ═══════════════════════════════════════════════ */

    renderGrantsAwarded() {
        var self = this;

        // Build combined list from fiber grants + past awards + co-op data
        var awardedList = [];

        // Fiber grants from data-layers.js
        if (SN.data.fiberGrants && SN.data.fiberGrants.length) {
            SN.data.fiberGrants.forEach(function(g) {
                awardedList.push({
                    program: g.type || g.program || 'Fiber Grant',
                    recipient: g.name || g.awardee || 'Unknown',
                    state: g.state || '—',
                    amount: g.amount || g.award || g.totalFunding || 0,
                    locations: g.homesPassed || g.locations || 0,
                    miles: g.miles || 0,
                    status: g.status || 'Active',
                    year: g.startDate || g.year || '—',
                    type: 'Fiber',
                    contact: g.contact || '—',
                    opportunity: g.siOpportunity || 'Construction/splicing contractor'
                });
            });
        }

        // Past awards from data-awards.js
        if (SN.data.pastAwards && SN.data.pastAwards.length) {
            SN.data.pastAwards.forEach(function(w) {
                awardedList.push({
                    program: w.program,
                    recipient: w.awardee,
                    state: w.states ? w.states.join(', ') : '—',
                    amount: w.award || 0,
                    locations: w.locations || 0,
                    miles: 0,
                    status: w.status || 'Active',
                    year: w.year || '—',
                    type: w.technology || 'Fiber',
                    contact: '—',
                    opportunity: 'Subcontractor for buildout'
                });
            });
        }

        // Electric co-op fiber builds from decision makers data
        if (SN.data.coopDecisionMakers && SN.data.coopDecisionMakers.length) {
            SN.data.coopDecisionMakers.forEach(function(coop) {
                awardedList.push({
                    program: 'Co-op Fiber Build',
                    recipient: coop.name,
                    state: coop.state,
                    amount: 0,
                    locations: coop.members || 0,
                    miles: coop.milesPlanned || 0,
                    status: coop.fiberStatus || 'Building',
                    year: '2024-2026',
                    type: 'Fiber FTTH',
                    contact: coop.contact + ' · ' + coop.phone,
                    opportunity: coop.note || 'Construction partner needed'
                });
            });
        }

        // Sort the list
        awardedList.sort(function(a, b) {
            var va = a[self.grantsSortCol];
            var vb = b[self.grantsSortCol];
            if (typeof va === 'string') {
                return self.grantsSortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            return self.grantsSortDir === 'asc' ? va - vb : vb - va;
        });

        var totalAmount = awardedList.reduce(function(s, a) { return s + a.amount; }, 0);
        var totalLocations = awardedList.reduce(function(s, a) { return s + a.locations; }, 0);

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Fiber Grants Awarded — All Programs</h3>' +
                '<p>Awarded grants across BEAD, ReConnect, RDOF, state programs, and co-op fiber builds. Sortable by any column. Each entry includes contact info for follow-up.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + awardedList.length + '</span><span class="fhs-lbl">Awards Tracked</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(totalAmount, 'currency') + '</span><span class="fhs-lbl">Total Awarded</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(totalLocations, 'compact') + '</span><span class="fhs-lbl">Locations/Members</span></div>' +
                '</div>' +
            '</div>';

        html += '<div class="funding-table-wrap"><table class="funding-table grants-awarded-table" id="grants-awarded-table">' +
            '<thead><tr>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'program' ? ' sorted' : '') + '" data-sort="program">Program ' + self.getSortArrow('program', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'recipient' ? ' sorted' : '') + '" data-sort="recipient">Recipient ' + self.getSortArrow('recipient', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'state' ? ' sorted' : '') + '" data-sort="state">State ' + self.getSortArrow('state', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'amount' ? ' sorted' : '') + '" data-sort="amount">Amount ' + self.getSortArrow('amount', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'locations' ? ' sorted' : '') + '" data-sort="locations">Locations ' + self.getSortArrow('locations', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th class="sortable-th' + (self.grantsSortCol === 'status' ? ' sorted' : '') + '" data-sort="status">Status ' + self.getSortArrow('status', self.grantsSortCol, self.grantsSortDir) + '</th>' +
                '<th>Contact / Follow-Up</th>' +
            '</tr></thead><tbody>';

        awardedList.forEach(function(a) {
            var statusCls = a.status === 'Active' || a.status === 'Building' ? 'status-open' :
                           a.status === 'Complete' || a.status === 'Completed' ? 'status-rolling' :
                           a.status === 'Planned' ? 'status-upcoming' : 'status-closed';
            html += '<tr>' +
                '<td>' + a.program + '</td>' +
                '<td><strong>' + a.recipient + '</strong></td>' +
                '<td class="cell-state">' + a.state + '</td>' +
                '<td class="cell-num">' + (a.amount > 0 ? SN.kpi.fmt(a.amount, 'currency') : '—') + '</td>' +
                '<td class="cell-num">' + (a.locations > 0 ? a.locations.toLocaleString() : '—') + '</td>' +
                '<td><span class="funding-status ' + statusCls + '">' + a.status.toUpperCase() + '</span></td>' +
                '<td class="grants-contact-cell">' + a.contact + '<br><span class="grants-opp">' + a.opportunity + '</span></td>' +
            '</tr>';
        });

        html += '</tbody></table></div>';
        html += '<div class="grants-awarded-footer">Showing ' + awardedList.length + ' awarded grants/builds. Click column headers to sort.</div>';
        html += '</div>';

        // Bind sort handlers after render
        setTimeout(function() { self.bindGrantsSort(); }, 0);

        return html;
    },

    getSortArrow(col, currentCol, currentDir) {
        if (col === currentCol) {
            return currentDir === 'asc' ? '<span class="sort-arrow active">&#9650;</span>' : '<span class="sort-arrow active">&#9660;</span>';
        }
        return '<span class="sort-arrow">&#8693;</span>';
    },

    bindGrantsSort() {
        var self = this;
        document.querySelectorAll('#grants-awarded-table .sortable-th').forEach(function(th) {
            th.addEventListener('click', function() {
                var col = th.dataset.sort;
                if (self.grantsSortCol === col) {
                    self.grantsSortDir = self.grantsSortDir === 'asc' ? 'desc' : 'asc';
                } else {
                    self.grantsSortCol = col;
                    self.grantsSortDir = 'desc';
                }
                self.render();
            });
        });
    },

    /* ═══════════════════════════════════════════════
     * DECISION MAKERS DIRECTORY
     * ═══════════════════════════════════════════════ */

    renderDecisionMakers() {
        var self = this;
        var html = '<div class="funding-section">';

        html += '<div class="funding-hero">' +
            '<h3>Decision Makers Directory</h3>' +
            '<p>Key contacts for broadband funding: state broadband office directors, electric co-op leaders, and tribal broadband administrators. These are the people who control subgrant awards, partnerships, and RFP processes.</p>' +
        '</div>';

        // State Broadband Directors
        html += '<h4>State Broadband Office Directors — BEAD Subgrant Authority</h4>' +
            '<p class="dm-context">These directors control BEAD subgrant allocations in their states. Contact them to register as a qualified bidder, learn subgrant timelines, and understand state-specific requirements.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table dm-table" id="dm-state-table">' +
            '<thead><tr>' +
                '<th class="sortable-th" data-sort="state">State</th>' +
                '<th>Name</th>' +
                '<th>Agency</th>' +
                '<th>Contact</th>' +
            '</tr></thead><tbody>';

        if (SN.data.stateDecisionMakers) {
            var states = Object.keys(SN.data.stateDecisionMakers).sort();
            states.forEach(function(st) {
                var d = SN.data.stateDecisionMakers[st];
                var alloc = SN.config.beadAllocations[st] || 0;
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td><strong>' + d.name + '</strong><br><span class="dm-title">' + d.title + '</span></td>' +
                    '<td>' + d.agency + '<br><span class="dm-alloc">BEAD: ' + SN.kpi.fmt(alloc, 'currency') + '</span></td>' +
                    '<td class="dm-contact-cell">' + (d.email || '') + '<br>' + (d.phone || '') + '</td>' +
                '</tr>';
            });
        }

        html += '</tbody></table></div>';

        // Electric Co-op Leaders
        html += '<h4>Electric Co-op Broadband Leaders</h4>' +
            '<p class="dm-context">Co-ops building fiber need construction contractors, OSP engineers, and network equipment. These are active projects seeking system integrator partners.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>Co-op</th><th>State</th><th>Contact</th><th>Members</th><th>Miles</th><th>Status</th></tr></thead><tbody>';

        if (SN.data.coopDecisionMakers) {
            SN.data.coopDecisionMakers.forEach(function(c) {
                var statusCls = c.fiberStatus === 'Active' ? 'status-open' : c.fiberStatus === 'Building' ? 'status-upcoming' : 'status-rolling';
                html += '<tr>' +
                    '<td><strong>' + c.name + '</strong></td>' +
                    '<td class="cell-state">' + c.state + '</td>' +
                    '<td>' + c.contact + '<br><span class="dm-phone">' + c.phone + '</span></td>' +
                    '<td class="cell-num">' + c.members.toLocaleString() + '</td>' +
                    '<td class="cell-num">' + c.milesPlanned.toLocaleString() + '</td>' +
                    '<td><span class="funding-status ' + statusCls + '">' + c.fiberStatus.toUpperCase() + '</span></td>' +
                '</tr>';
            });
        }

        html += '</tbody></table></div>';

        // Tribal Administrators
        html += '<h4>Tribal Broadband Administrators</h4>' +
            '<p class="dm-context">Tribal broadband programs have separate NTIA TBCP funding streams. Partner with tribal telecom entities — they prefer certified MBE/tribal enterprise partnerships.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>Tribe/Program</th><th>Region</th><th>Contact</th><th>Funding</th><th>Unserved HH</th></tr></thead><tbody>';

        if (SN.data.tribalDecisionMakers) {
            SN.data.tribalDecisionMakers.forEach(function(t) {
                html += '<tr>' +
                    '<td><strong>' + t.tribe + '</strong><br><span class="dm-program">' + t.program + '</span></td>' +
                    '<td class="cell-state">' + t.region + '</td>' +
                    '<td>' + t.contact + '<br><span class="dm-phone">' + t.phone + '</span></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(t.fundingReceived, 'currency') + '</td>' +
                    '<td class="cell-num">' + t.unservedHouseholds.toLocaleString() + '</td>' +
                '</tr>';
            });
        }

        html += '</tbody></table></div>';

        // Smart City CIOs
        if (SN.data.smartCities) {
            var citiesWithDM = SN.data.smartCities.filter(function(c) { return c.decisionMaker; });
            if (citiesWithDM.length) {
                html += '<h4>Smart City CIOs & Technology Officers</h4>' +
                    '<p class="dm-context">Smart city leaders commissioning broadband-dependent projects: smart traffic, public safety, IoT, digital equity. Contact to pitch infrastructure packages.</p>' +
                    '<div class="funding-table-wrap"><table class="funding-table">' +
                    '<thead><tr><th>City</th><th>Name/Title</th><th>Program</th><th>Contact</th></tr></thead><tbody>';

                citiesWithDM.forEach(function(city) {
                    var dm = city.decisionMaker;
                    html += '<tr>' +
                        '<td class="cell-state">' + city.name + ', ' + city.state + '</td>' +
                        '<td><strong>' + dm.name + '</strong><br><span class="dm-title">' + dm.title + '</span></td>' +
                        '<td>' + city.program + '</td>' +
                        '<td class="dm-contact-cell">' + (dm.email || '') + '<br>' + (dm.phone || '') + '</td>' +
                    '</tr>';
                });

                html += '</tbody></table></div>';
            }
        }

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * PAST WINNERS
     * ═══════════════════════════════════════════════ */

    renderWinners() {
        var html = '<div class="funding-section">';

        var rdof = SN.data.rdofSummary;
        if (rdof) {
            html += '<div class="funding-hero">' +
                '<h3>RDOF Auction Results & Defaults</h3>' +
                '<p>The $9.2B RDOF auction saw $3.3B in defaults — creating massive re-funding opportunities.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.totalAwarded, 'currency') + '</span><span class="fhs-lbl">Total Awarded</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.totalDefaulted, 'currency') + '</span><span class="fhs-lbl">Total Defaulted</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + (rdof.defaultRate * 100).toFixed(0) + '%</span><span class="fhs-lbl">Default Rate</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(rdof.defaultedLocations, 'compact') + '</span><span class="fhs-lbl">Locations Stranded</span></div>' +
                '</div>' +
            '</div>';
        }

        var defaults = SN.data.rdofDefaults;
        if (defaults && defaults.length) {
            html += '<h4>Major RDOF Defaulters</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Awardee</th><th>Award</th><th>Locations</th><th>Status</th><th>Reason</th></tr></thead><tbody>';

            defaults.forEach(function(d) {
                html += '<tr>' +
                    '<td><strong>' + d.awardee + '</strong></td>' +
                    '<td class="cell-num">' + (d.award ? SN.kpi.fmt(d.award, 'currency') : 'N/A') + '</td>' +
                    '<td class="cell-num">' + d.locations.toLocaleString() + '</td>' +
                    '<td><span class="funding-status status-closed">' + d.status + '</span></td>' +
                    '<td class="funding-reason">' + d.reason + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        var winners = SN.data.pastAwards;
        if (winners && winners.length) {
            html += '<h4>Active Award Recipients — Building Now</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Program</th><th>Awardee</th><th>Award</th><th>Locations</th><th>Tech</th><th>Status</th></tr></thead><tbody>';

            winners.forEach(function(w) {
                html += '<tr>' +
                    '<td>' + w.program + '</td>' +
                    '<td><strong>' + w.awardee + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award, 'currency') + '</td>' +
                    '<td class="cell-num">' + w.locations.toLocaleString() + '</td>' +
                    '<td>' + w.technology + '</td>' +
                    '<td>' + w.status + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        var byState = SN.data.rdofDefaultsByState;
        if (byState) {
            html += '<h4>RDOF Defaults by State</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>State</th><th>Original Award</th><th>Defaulted</th><th>Locations Lost</th><th>Default %</th></tr></thead><tbody>';

            Object.keys(byState).sort().forEach(function(st) {
                var d = byState[st];
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(d.originalAward, 'currency') + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(d.defaultedAmount, 'currency') + '</td>' +
                    '<td class="cell-num">' + d.defaultedLocations.toLocaleString() + '</td>' +
                    '<td class="cell-num"><span class="funding-status status-closed">' + (d.defaultPct * 100).toFixed(0) + '%</span></td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * COMPETITIVE LANDSCAPE
     * ═══════════════════════════════════════════════ */

    renderCompetitive() {
        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Competitive Landscape</h3>' +
                '<p>Who is building where? Know the competitive landscape before you bid.</p>' +
            '</div>';

        var winners = SN.data.pastAwards || [];
        if (winners.length) {
            html += '<h4>Active Builders by Region</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Builder</th><th>Program</th><th>Award</th><th>Locations</th><th>Technology</th><th>States</th><th>Status</th></tr></thead><tbody>';

            winners.forEach(function(w) {
                html += '<tr>' +
                    '<td><strong>' + w.awardee + '</strong></td>' +
                    '<td>' + w.program + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award, 'currency') + '</td>' +
                    '<td class="cell-num">' + w.locations.toLocaleString() + '</td>' +
                    '<td>' + w.technology + '</td>' +
                    '<td class="cell-state">' + w.states.join(', ') + '</td>' +
                    '<td>' + w.status + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        html += '<h4>Market Intelligence Summary</h4>' +
            '<div class="competitive-grid">';

        var segments = [
            { name: 'Fiber Incumbents', players: 'AT&T, Lumen, Frontier, Windstream, Consolidated', risk: 'High', note: 'Dominant in urban/suburban. Less competitive in deep rural where BEAD targets.' },
            { name: 'Cable Overbuilders', players: 'Charter, Comcast, Cox, Mediacom', risk: 'Medium', note: 'Strong in suburbs. Rarely bid on rural BEAD subgrants due to ROI.' },
            { name: 'Rural Telcos', players: 'TDS, Shentel, Mid-States, Consolidated Telcom', risk: 'Medium', note: 'Strong local relationships. Often win on community trust. Partner opportunity.' },
            { name: 'Electric Co-ops', players: 'Various (120+ building fiber)', risk: 'High in territory', note: 'Owning fiber-to-the-home in their service area. Best approached as partners, not competitors.' },
            { name: 'Fixed Wireless (FWA)', players: 'T-Mobile, Verizon FWA, Tarana, Siklu', risk: 'Low for fiber bids', note: 'FWA losing BEAD favor after NTIA fiber-first mandate. But competitive for non-BEAD rural.' },
            { name: 'Satellite', players: 'Starlink, Project Kuiper', risk: 'Low for grants', note: 'FCC rejected Starlink RDOF. Not eligible for most BEAD fiber subgrants.' }
        ];

        segments.forEach(function(s) {
            html += '<div class="competitive-card">' +
                '<div class="competitive-card-header"><strong>' + s.name + '</strong><span class="competitive-risk">' + s.risk + '</span></div>' +
                '<div class="competitive-players">' + s.players + '</div>' +
                '<div class="competitive-note">' + s.note + '</div>' +
            '</div>';
        });

        html += '</div>';

        html += '<h4>Strategic Positioning for System Integrators</h4>' +
            '<div class="playbook-steps">' +
                '<div class="playbook-step"><span class="step-num">A</span><div><strong>Partner with Rural Telcos & Electric Co-ops</strong><br>They have the local trust and franchise rights. You bring engineering, project management, and equipment. Win-win subcontracting arrangements.</div></div>' +
                '<div class="playbook-step"><span class="step-num">B</span><div><strong>Target RDOF Default Zones</strong><br>1.9M locations need a new provider. States are re-assigning these to BEAD. Be first to offer a credible fiber plan for these areas.</div></div>' +
                '<div class="playbook-step"><span class="step-num">C</span><div><strong>Differentiate with Private 5G/CBRS</strong><br>Most bidders offer fiber-only. Add private wireless for industrial/campus sites along your fiber routes. This is a unique value-add that wins RFPs.</div></div>' +
                '<div class="playbook-step"><span class="step-num">D</span><div><strong>Build a Multi-State Presence</strong><br>BEAD is state-administered. Having relationships with multiple state broadband offices lets you follow the funding across borders.</div></div>' +
            '</div>';

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * SCORING EXPLAINED
     * ═══════════════════════════════════════════════ */

    renderScoring() {
        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>How the Opportunity Score Works</h3>' +
                '<p>Each of the 3,100+ US counties receives a composite Funding Opportunity Score (0-100) identifying the best broadband investment targets.</p>' +
            '</div>';

        var w = SN.config.weights;
        var factors = [
            { name: 'Coverage Gap', weight: w.coverageGap, color: '#ef4444', desc: '% of BSLs underserved or unserved. Higher gap = higher opportunity. Uses sqrt transform for real-data distribution.' },
            { name: 'Unserved %', weight: w.unservedPct, color: '#f97316', desc: '% below 25/3 Mbps. Highest priority for BEAD funding.' },
            { name: 'Funding Eligibility', weight: w.funding, color: '#fbbf24', desc: 'BEAD approval status + unserved BSL concentration.' },
            { name: 'Income Need', weight: w.incomeNeed, color: '#a78bfa', desc: 'Lower income = higher grant eligibility. $30K scores 90, $60K scores 60.' },
            { name: 'Population Density', weight: w.popDensity, color: '#38bdf8', desc: 'Sweet spot 50-200/sq mi — cost-effective but not saturated.' },
            { name: 'Infrastructure Readiness', weight: w.readiness5g, color: '#06d6a0', desc: 'Existing providers, fiber, density. Higher = easier buildout.' }
        ];

        html += '<div class="scoring-factors">';
        factors.forEach(function(f) {
            var pct = Math.round(f.weight * 100);
            html += '<div class="scoring-factor">' +
                '<div class="scoring-factor-header">' +
                    '<span class="scoring-factor-name">' + f.name + '</span>' +
                    '<span class="scoring-factor-weight" style="background:' + f.color + '">' + pct + '%</span>' +
                '</div>' +
                '<div class="scoring-factor-bar"><div class="scoring-factor-fill" style="width:' + pct + '%;background:' + f.color + '"></div></div>' +
                '<p class="scoring-factor-desc">' + f.desc + '</p>' +
            '</div>';
        });
        html += '</div>';

        var counties = SN.data.counties;
        if (counties && counties.length) {
            var top = counties[0];
            var breakdown = SN.scoring.getBreakdown(top);
            html += '<h4>Example: ' + top.county + ', ' + top.state + ' (Score: ' + top.opportunityScore + ')</h4>' +
                '<div class="scoring-breakdown">';
            Object.keys(breakdown).forEach(function(key) {
                var b = breakdown[key];
                var label = key === 'coverageGap' ? 'Coverage Gap' :
                            key === 'unservedPct' ? 'Unserved %' :
                            key === 'popDensity' ? 'Pop. Density' :
                            key === 'incomeNeed' ? 'Income Need' :
                            key === 'readiness5g' ? 'Infra. Readiness' :
                            key === 'funding' ? 'Funding Eligibility' : key;
                var weighted = Math.round(b.weight * b.score);
                html += '<div class="breakdown-row">' +
                    '<span class="breakdown-label">' + label + '</span>' +
                    '<span class="breakdown-raw">' + b.score + '/100</span>' +
                    '<span class="breakdown-weight">x ' + (b.weight * 100).toFixed(0) + '%</span>' +
                    '<span class="breakdown-result">= ' + weighted + '</span>' +
                '</div>';
            });
            html += '</div>';
        }

        html += '<div class="scoring-sources">' +
            '<h4>Data Sources</h4>' +
            '<ul>' +
                '<li><strong>BSL / Coverage:</strong> FCC Broadband Data Collection (BDC)</li>' +
                '<li><strong>Demographics:</strong> US Census ACS 5-Year Estimates (2022)</li>' +
                '<li><strong>Funding:</strong> NTIA BEAD Allocations (June 2023) — $42.45B</li>' +
                '<li><strong>CBRS:</strong> FCC ULS Database — PAL license counts</li>' +
                '<li><strong>Smart Cities:</strong> City government reports, Smart Cities Council</li>' +
            '</ul>' +
        '</div>';

        html += '</div>';
        return html;
    },

    /**
     * Update funding panel with current data.
     */
    update() {
        this.render();
    }
};
