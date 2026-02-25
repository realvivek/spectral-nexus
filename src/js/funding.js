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
        // Pre-render so content is ready when tab is clicked
        try { this.render(); } catch(e) { console.error('Funding pre-render failed:', e); }
    },

    /**
     * Render the full Funding Intel panel.
     */
    render() {
        var container = document.getElementById('funding-container');
        if (!container) return;

        var sectionHtml;
        try {
            sectionHtml = this.renderActiveSection();
        } catch(e) {
            console.error('Funding section render failed:', e);
            sectionHtml = '<div class="funding-section"><p style="color:#ef4444;padding:20px;">Error rendering this section. Try another tab.</p></div>';
        }

        container.innerHTML =
            this.renderSubTabs() +
            '<div id="funding-content">' + sectionHtml + '</div>';

        this.bindSubTabs();
    },

    renderActiveSection() {
        switch (this.activeSection) {
            case 'grants': return this.renderGrants();
            case 'awarded': return this.renderGrantsAwarded();
            case 'beadtimeline': return this.renderBEADTimeline();
            case 'bidtracker': return this.renderBidTracker();
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
            { id: 'beadtimeline', label: 'BEAD Timeline' },
            { id: 'bidtracker', label: 'Bid Tracker' },
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
        if (!grants || !grants.federal) return '<div class="funding-section"><p>No grant data available.</p></div>';

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
            '<p class="grant-expand-hint">Click any program row to expand application details, eligibility, and step-by-step checklist.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table" id="grants-table">' +
            '<thead><tr>' +
                '<th>Program</th>' +
                '<th>Funding</th>' +
                '<th>Status</th>' +
                '<th>Type</th>' +
                '<th>Deadline</th>' +
                '<th>Notes</th>' +
            '</tr></thead><tbody>';

        grants.federal.forEach(function(g, idx) {
            var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
            html += '<tr class="grant-playbook-row" data-grant-idx="' + idx + '">' +
                '<td><strong>' + g.name + '</strong><br><span class="funding-agency">' + g.agency + '</span></td>' +
                '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                '<td>' + g.type + '</td>' +
                '<td class="funding-date">' + (g.applicationDeadline || g.keyDate || 'TBD') + '</td>' +
                '<td class="funding-reason">' + (g.notes || '') + '</td>' +
            '</tr>';

            // Expandable detail row (hidden by default)
            html += '<tr class="grant-detail-row" id="grant-detail-' + idx + '" style="display:none"><td colspan="6">' +
                SN.funding.renderGrantDetail(g) +
            '</td></tr>';
        });

        html += '</tbody></table></div>';

        // Bind grant row expansion
        setTimeout(function() { SN.funding.bindGrantExpand(); }, 0);

        html += '<h4>State Programs</h4>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>State</th><th>Program</th><th>Funding</th><th>Status</th><th>Notes</th></tr></thead><tbody>';

        var stateKeys = grants.state ? Object.keys(grants.state).sort() : [];
        stateKeys.forEach(function(st) {
            grants.state[st].forEach(function(g) {
                var statusCls = g.statusCode === 'open' ? 'status-open' : g.statusCode === 'upcoming' ? 'status-upcoming' : g.statusCode === 'rolling' ? 'status-rolling' : 'status-closed';
                html += '<tr>' +
                    '<td class="cell-state">' + st + '</td>' +
                    '<td><strong>' + g.name + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(g.totalFunding || 0, 'currency') + '</td>' +
                    '<td><span class="funding-status ' + statusCls + '">' + g.statusCode.toUpperCase() + '</span></td>' +
                    '<td class="funding-reason">' + (g.notes || '') + '</td>' +
                '</tr>';
            });
        });

        html += '</tbody></table></div></div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * GRANTS AWARDED — Sortable Table
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
                    program: w.program || '—',
                    recipient: w.awardee || '—',
                    state: (w.states && w.states.length) ? w.states.join(', ') : '—',
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
                    recipient: coop.name || '—',
                    state: coop.state || '—',
                    amount: 0,
                    locations: coop.members || 0,
                    miles: coop.milesPlanned || 0,
                    status: coop.fiberStatus || 'Building',
                    year: '2024-2026',
                    type: 'Fiber FTTH',
                    contact: (coop.contact || '') + (coop.phone ? ' · ' + coop.phone : ''),
                    opportunity: coop.note || 'Construction partner needed'
                });
            });
        }

        // Sort the list
        awardedList.sort(function(a, b) {
            var va = a[self.grantsSortCol] || '';
            var vb = b[self.grantsSortCol] || '';
            if (typeof va === 'string' && typeof vb === 'string') {
                return self.grantsSortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            var na = Number(va) || 0;
            var nb = Number(vb) || 0;
            return self.grantsSortDir === 'asc' ? na - nb : nb - na;
        });

        var totalAmount = awardedList.reduce(function(s, a) { return s + (a.amount || 0); }, 0);
        var totalLocations = awardedList.reduce(function(s, a) { return s + (a.locations || 0); }, 0);

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Grants, Awards & Active Contracts</h3>' +
                '<p>All tracked broadband projects: BEAD subgrants, ReConnect awards, RDOF, state programs, and co-op fiber builds. Click column headers to sort. Each row includes contacts for follow-up.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + awardedList.length + '</span><span class="fhs-lbl">Awards & Contracts</span></div>' +
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
                '<th>Date</th>' +
                '<th>Contact / Follow-Up</th>' +
            '</tr></thead><tbody>';

        awardedList.forEach(function(a) {
            var statusCls = (a.status === 'Active' || a.status === 'Building' || a.status.indexOf('Building') >= 0) ? 'status-open' :
                           (a.status === 'Complete' || a.status === 'Authorized') ? 'status-rolling' :
                           (a.status === 'Planned' || a.status.indexOf('Awarded') >= 0) ? 'status-upcoming' : 'status-closed';
            var shortStatus = a.status.length > 20 ? a.status.substring(0, 20) + '...' : a.status;
            html += '<tr>' +
                '<td>' + a.program + '</td>' +
                '<td><strong>' + a.recipient + '</strong><br><span class="funding-agency">' + a.type + '</span></td>' +
                '<td class="cell-state">' + a.state + '</td>' +
                '<td class="cell-num">' + (a.amount > 0 ? SN.kpi.fmt(a.amount, 'currency') : '—') + '</td>' +
                '<td class="cell-num">' + (a.locations > 0 ? a.locations.toLocaleString() : '—') + (a.miles > 0 ? '<br><span class="funding-agency">' + a.miles.toLocaleString() + ' mi</span>' : '') + '</td>' +
                '<td><span class="funding-status ' + statusCls + '">' + shortStatus.toUpperCase() + '</span></td>' +
                '<td class="funding-date">' + a.year + '</td>' +
                '<td class="grants-contact-cell">' + a.contact + '<br><span class="grants-opp">' + a.opportunity + '</span></td>' +
            '</tr>';
        });

        html += '</tbody></table></div>';
        html += '<div class="grants-awarded-footer">Showing ' + awardedList.length + ' awards, contracts & active builds. Click column headers to sort.</div>';
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
                '<th>State</th>' +
                '<th>Name</th>' +
                '<th>Agency</th>' +
                '<th>BEAD Allocation</th>' +
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
                    '<td>' + d.agency + '</td>' +
                    '<td class="cell-num"><span class="dm-alloc">' + SN.kpi.fmt(alloc, 'currency') + '</span></td>' +
                    '<td class="dm-contact-cell">' + (d.email || '') + '<br>' + (d.phone || '') + '</td>' +
                '</tr>';
            });
        }

        html += '</tbody></table></div>';

        // Electric Co-op Leaders
        html += '<h4>Electric Co-op Broadband Leaders</h4>' +
            '<p class="dm-context">Co-ops building fiber need construction contractors, OSP engineers, and network equipment. These are active projects seeking system integrator partners.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>Co-op</th><th>State</th><th>Contact</th><th>Members</th><th>Miles Planned</th><th>Status</th><th>Notes</th></tr></thead><tbody>';

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
                    '<td class="funding-reason">' + (c.note || '') + '</td>' +
                '</tr>';
            });
        }

        html += '</tbody></table></div>';

        // Tribal Administrators
        html += '<h4>Tribal Broadband Administrators</h4>' +
            '<p class="dm-context">Tribal broadband programs have separate NTIA TBCP funding streams. Partner with tribal telecom entities — they prefer certified MBE/tribal enterprise partnerships.</p>' +
            '<div class="funding-table-wrap"><table class="funding-table">' +
            '<thead><tr><th>Tribe/Program</th><th>Region</th><th>Contact</th><th>Funding</th><th>Unserved HH</th><th>Notes</th></tr></thead><tbody>';

        if (SN.data.tribalDecisionMakers) {
            SN.data.tribalDecisionMakers.forEach(function(t) {
                html += '<tr>' +
                    '<td><strong>' + t.tribe + '</strong><br><span class="dm-program">' + t.program + '</span></td>' +
                    '<td class="cell-state">' + t.region + '</td>' +
                    '<td>' + t.contact + '<br><span class="dm-phone">' + t.phone + '</span></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(t.fundingReceived, 'currency') + '</td>' +
                    '<td class="cell-num">' + t.unservedHouseholds.toLocaleString() + '</td>' +
                    '<td class="funding-reason">' + (t.note || '') + '</td>' +
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
                    '<thead><tr><th>City</th><th>Name/Title</th><th>Program</th><th>Budget</th><th>Contact</th></tr></thead><tbody>';

                citiesWithDM.forEach(function(city) {
                    var dm = city.decisionMaker;
                    var fmtBudget = city.budget >= 1e6 ? SN.kpi.fmt(city.budget, 'currency') : '—';
                    html += '<tr>' +
                        '<td class="cell-state">' + city.name + ', ' + city.state + '</td>' +
                        '<td><strong>' + dm.name + '</strong><br><span class="dm-title">' + dm.title + '</span></td>' +
                        '<td>' + city.program + '</td>' +
                        '<td class="cell-num">' + fmtBudget + '</td>' +
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
                '<thead><tr><th>Awardee</th><th>Award</th><th>Locations</th><th>Status</th><th>Reason</th><th>FCC Action</th></tr></thead><tbody>';

            defaults.forEach(function(d) {
                html += '<tr>' +
                    '<td><strong>' + d.awardee + '</strong></td>' +
                    '<td class="cell-num">' + (d.award ? SN.kpi.fmt(d.award, 'currency') : 'N/A') + '</td>' +
                    '<td class="cell-num">' + d.locations.toLocaleString() + '</td>' +
                    '<td><span class="funding-status status-closed">' + d.status + '</span></td>' +
                    '<td class="funding-reason">' + d.reason + '</td>' +
                    '<td class="funding-reason">' + (d.fccAction || '—') + '</td>' +
                '</tr>';
            });
            html += '</tbody></table></div>';
        }

        var winners = SN.data.pastAwards;
        if (winners && winners.length) {
            html += '<h4>Active Award Recipients — Building Now</h4>' +
                '<div class="funding-table-wrap"><table class="funding-table">' +
                '<thead><tr><th>Program</th><th>Awardee</th><th>Award</th><th>Locations</th><th>Tech</th><th>States</th><th>Status</th></tr></thead><tbody>';

            winners.forEach(function(w) {
                html += '<tr>' +
                    '<td>' + (w.program || '—') + '</td>' +
                    '<td><strong>' + (w.awardee || '—') + '</strong></td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award || 0, 'currency') + '</td>' +
                    '<td class="cell-num">' + (w.locations || 0).toLocaleString() + '</td>' +
                    '<td>' + (w.technology || '—') + '</td>' +
                    '<td class="cell-state">' + (w.states && w.states.length ? w.states.join(', ') : '—') + '</td>' +
                    '<td>' + (w.status || '—') + '</td>' +
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
                    '<td><strong>' + (w.awardee || '—') + '</strong></td>' +
                    '<td>' + (w.program || '—') + '</td>' +
                    '<td class="cell-num">' + SN.kpi.fmt(w.award || 0, 'currency') + '</td>' +
                    '<td class="cell-num">' + (w.locations || 0).toLocaleString() + '</td>' +
                    '<td>' + (w.technology || '—') + '</td>' +
                    '<td class="cell-state">' + (w.states && w.states.length ? w.states.join(', ') : '—') + '</td>' +
                    '<td>' + (w.status || '—') + '</td>' +
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
                '<p>Each of the 3,100+ US counties receives a composite Funding Opportunity Score (0-100). Use this score to prioritize which counties to target for broadband investment. Higher score = bigger opportunity.</p>' +
            '</div>';

        html += '<div class="scoring-howto">' +
            '<h4>How to Use the Score</h4>' +
            '<div class="playbook-steps">' +
                '<div class="playbook-step"><span class="step-num">1</span><div><strong>Sort the Map by Opportunity Score</strong><br>Select "Opportunity Score" in the Choropleth Metric dropdown above the map. Green circles = highest opportunity. Red = lowest.</div></div>' +
                '<div class="playbook-step"><span class="step-num">2</span><div><strong>Filter by Score Threshold</strong><br>Use the "Score ≥" slider in the filter bar to hide low-opportunity counties. Set it to 60+ to see only high-value targets.</div></div>' +
                '<div class="playbook-step"><span class="step-num">3</span><div><strong>Click a County for Details</strong><br>Click any circle on the map to see the full score breakdown, funding estimate, unserved locations, and decision maker contacts.</div></div>' +
                '<div class="playbook-step"><span class="step-num">4</span><div><strong>Sort the Table</strong><br>Go to the Table tab and click the "Score" column header to rank all counties. Cross-reference with Coverage Gap and Unserved % columns.</div></div>' +
            '</div>' +
        '</div>';

        var w = SN.config.weights;
        var factors = [
            { name: 'Coverage Gap', weight: w.coverageGap, color: '#ef4444', desc: '% of BSLs underserved or unserved. Higher gap = higher opportunity. Uses sqrt transform to spread real-data distribution where most counties cluster (5-30%).' },
            { name: 'Unserved %', weight: w.unservedPct, color: '#f97316', desc: '% below 25/3 Mbps — the FCC definition of "unserved." Highest priority for BEAD funding. Counties above 15% unserved are top targets.' },
            { name: 'Funding Eligibility', weight: w.funding, color: '#fbbf24', desc: 'BEAD approval status + unserved BSL concentration. All 50 states are BEAD-approved, so the score differentiates on how many unserved locations exist.' },
            { name: 'Income Need', weight: w.incomeNeed, color: '#a78bfa', desc: 'Lower median income = higher need = more grant-eligible. Counties with $30K median score 90, $60K scores 60, $90K scores 30.' },
            { name: 'Population Density', weight: w.popDensity, color: '#38bdf8', desc: 'Sweet spot is 50-200 people/sq mi — dense enough for cost-effective fiber deployment but not already saturated by incumbents.' },
            { name: 'Infrastructure Readiness', weight: w.readiness5g, color: '#06d6a0', desc: 'Existing providers, fiber penetration, and tower density. Higher readiness means easier and cheaper buildout.' }
        ];

        html += '<h4>Scoring Factors (6 Weighted Components)</h4>';
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
            html += '<h4>Example Breakdown: ' + top.county + ', ' + top.state + ' (Score: ' + top.opportunityScore + ')</h4>' +
                '<p class="dm-context">Each factor produces a raw score (0-100), multiplied by its weight, then summed for the final composite score.</p>' +
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
            var totalWeighted = Object.keys(breakdown).reduce(function(s, key) { return s + Math.round(breakdown[key].weight * breakdown[key].score); }, 0);
            html += '<div class="breakdown-row" style="border-top:2px solid var(--accent);font-weight:700;margin-top:4px;padding-top:6px">' +
                '<span class="breakdown-label" style="color:var(--accent)">TOTAL SCORE</span>' +
                '<span class="breakdown-raw"></span>' +
                '<span class="breakdown-weight"></span>' +
                '<span class="breakdown-result" style="font-size:0.85rem">= ' + totalWeighted + '</span>' +
            '</div>';
            html += '</div>';
        }

        html += '<div class="scoring-sources">' +
            '<h4>Data Sources</h4>' +
            '<ul>' +
                '<li><strong>BSL / Coverage:</strong> FCC Broadband Data Collection (BDC) — county-level coverage data for all 3,143 US counties</li>' +
                '<li><strong>Demographics:</strong> US Census ACS 5-Year Estimates (2022) — population, income, density, poverty</li>' +
                '<li><strong>Funding:</strong> NTIA BEAD Allocations (June 2023) — $42.45B distributed across all states + DC</li>' +
                '<li><strong>CBRS Spectrum:</strong> FCC ULS Database — PAL license counts and incumbent exclusion zones</li>' +
                '<li><strong>Smart Cities:</strong> City government reports, Smart Cities Council, DOT Smart City Challenge records</li>' +
                '<li><strong>RDOF:</strong> FCC Auction 904 results, Benton Institute defaults analysis (Feb 2025)</li>' +
            '</ul>' +
        '</div>';

        html += '</div>';
        return html;
    },

    /* ═══════════════════════════════════════════════
     * GRANT APPLICATION PLAYBOOK (expandable detail)
     * ═══════════════════════════════════════════════ */

    renderGrantDetail(g) {
        var html = '<div class="grant-detail-panel">';

        html += '<div class="grant-detail-grid">';

        // Deadline
        html += '<div class="grant-detail-item"><div class="grant-detail-label">Application Deadline</div><div class="grant-detail-value">' + (g.applicationDeadline || 'TBD') + '</div></div>';

        // Match requirement
        html += '<div class="grant-detail-item"><div class="grant-detail-label">Match Requirement</div><div class="grant-detail-value">' + (g.match || 'N/A') + '</div></div>';

        // Tech requirements
        html += '<div class="grant-detail-item"><div class="grant-detail-label">Technical Requirements</div><div class="grant-detail-value">' + (g.techReq || 'N/A') + '</div></div>';

        // Cost benchmarks
        if (g.costBenchmarks) {
            var benchStr = Object.keys(g.costBenchmarks).map(function(k) {
                return '<strong>' + k + ':</strong> ' + g.costBenchmarks[k];
            }).join(' · ');
            html += '<div class="grant-detail-item"><div class="grant-detail-label">Cost Benchmarks</div><div class="grant-detail-value">' + benchStr + '</div></div>';
        }

        html += '</div>';

        // Eligibility
        if (g.eligibility && g.eligibility.length) {
            html += '<div class="grant-detail-item full-width" style="margin-bottom:8px"><div class="grant-detail-label">Who Can Apply</div>';
            html += '<div class="grant-checklist">';
            g.eligibility.forEach(function(e) {
                html += '<div class="grant-checklist-item"><span class="grant-check-icon">&#10003;</span> ' + e + '</div>';
            });
            html += '</div></div>';
        }

        // Required certifications
        if (g.requiredCerts && g.requiredCerts.length) {
            html += '<div class="grant-detail-item full-width" style="margin-bottom:8px"><div class="grant-detail-label">Required Certifications</div>';
            html += '<div class="grant-checklist">';
            g.requiredCerts.forEach(function(c) {
                html += '<div class="grant-checklist-item"><span class="grant-check-icon">&#9675;</span> ' + c + '</div>';
            });
            html += '</div></div>';
        }

        // Application steps
        if (g.applicationSteps && g.applicationSteps.length) {
            html += '<div class="grant-detail-item full-width" style="margin-bottom:8px"><div class="grant-detail-label">Application Steps</div>';
            html += '<div class="grant-checklist">';
            g.applicationSteps.forEach(function(s, i) {
                html += '<div class="grant-checklist-item"><span class="grant-check-icon" style="color:var(--accent-blue)">' + (i + 1) + '.</span> ' + s + '</div>';
            });
            html += '</div></div>';
        }

        // Stacking rules
        if (g.canStackWith && g.canStackWith.length) {
            html += '<div class="grant-detail-item full-width"><div class="grant-detail-label">Can Stack With</div>';
            html += '<div class="grant-detail-value">' + g.canStackWith.join(' · ') + '</div></div>';
        }

        // Link
        if (g.url) {
            html += '<a class="grant-detail-link" href="' + g.url + '" target="_blank" rel="noopener">View Official Program Page &rarr;</a>';
        }

        html += '</div>';
        return html;
    },

    bindGrantExpand() {
        document.querySelectorAll('.grant-playbook-row').forEach(function(row) {
            row.addEventListener('click', function() {
                var idx = row.dataset.grantIdx;
                var detail = document.getElementById('grant-detail-' + idx);
                if (detail) {
                    var isOpen = detail.style.display !== 'none';
                    detail.style.display = isOpen ? 'none' : 'table-row';
                    row.style.background = isOpen ? '' : 'rgba(6,214,160,0.04)';
                }
            });
        });
    },

    /* ═══════════════════════════════════════════════
     * BEAD SUBGRANT TIMELINE TRACKER
     * ═══════════════════════════════════════════════ */

    beadTimelineFilter: 'all',

    renderBEADTimeline() {
        var self = this;
        var timeline = SN.data.beadTimeline;
        if (!timeline) return '<div class="funding-section"><p>No BEAD timeline data available.</p></div>';

        var states = Object.keys(timeline).sort();
        var totalAlloc = 0;
        var openCount = 0;
        var awardedCount = 0;
        states.forEach(function(st) {
            totalAlloc += timeline[st].allocation || 0;
            if (timeline[st].phase === 'subgrant_open') openCount++;
            if (timeline[st].phase === 'awards_made' || timeline[st].phase === 'construction') awardedCount++;
        });

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>BEAD Subgrant Timeline Tracker</h3>' +
                '<p>Track each state\'s BEAD subgrant process: from plan approval through construction deadlines. Know where to bid NOW vs. where to pre-register for upcoming rounds.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + states.length + '</span><span class="fhs-lbl">States Tracked</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + openCount + '</span><span class="fhs-lbl">Subgrants Open</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + awardedCount + '</span><span class="fhs-lbl">Awards Made</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + SN.kpi.fmt(totalAlloc, 'currency') + '</span><span class="fhs-lbl">Total Tracked</span></div>' +
                '</div>' +
            '</div>';

        // Filter buttons
        html += '<div class="bead-timeline-filter">' +
            '<button class="bead-filter-btn' + (self.beadTimelineFilter === 'all' ? ' active' : '') + '" data-bead-filter="all">All States</button>' +
            '<button class="bead-filter-btn' + (self.beadTimelineFilter === 'subgrant_open' ? ' active' : '') + '" data-bead-filter="subgrant_open">Bidding Open</button>' +
            '<button class="bead-filter-btn' + (self.beadTimelineFilter === 'challenge_complete' ? ' active' : '') + '" data-bead-filter="challenge_complete">Opening Soon</button>' +
            '<button class="bead-filter-btn' + (self.beadTimelineFilter === 'awards_made' ? ' active' : '') + '" data-bead-filter="awards_made">Awards Made</button>' +
        '</div>';

        var filteredStates = states.filter(function(st) {
            if (self.beadTimelineFilter === 'all') return true;
            return timeline[st].phase === self.beadTimelineFilter;
        });

        var phases = ['plan_approved', 'challenge_complete', 'subgrant_open', 'subgrant_closed', 'awards_made', 'construction'];
        var phaseLabels = { plan_approved: 'Plan', challenge_complete: 'Challenge', subgrant_open: 'Bidding', subgrant_closed: 'Closed', awards_made: 'Awards', construction: 'Build' };

        filteredStates.forEach(function(st) {
            var t = timeline[st];
            var director = SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[st] ? SN.data.stateDecisionMakers[st] : null;
            var currentPhaseIdx = phases.indexOf(t.phase);

            html += '<div class="bead-timeline-card">';
            html += '<div class="bead-timeline-header">' +
                '<span class="bead-timeline-state">' + st + '</span>' +
                '<span class="bead-timeline-alloc">' + SN.kpi.fmt(t.allocation, 'currency') + '</span>' +
            '</div>';

            // Phase progress bar
            html += '<div class="bead-timeline-bar">';
            phases.forEach(function(p, i) {
                var cls = i < currentPhaseIdx ? 'bead-phase-complete' :
                          i === currentPhaseIdx ? 'bead-phase-active' : 'bead-phase-upcoming';
                var flex = i <= currentPhaseIdx ? 1 : 0.6;
                html += '<div class="bead-timeline-phase ' + cls + '" style="flex:' + flex + '">' + phaseLabels[p] + '</div>';
            });
            html += '</div>';

            // Key dates
            html += '<div class="bead-timeline-dates">';
            if (t.subgrantOpen) html += '<div class="bead-date-item"><span class="bead-date-label">Bidding Opens</span><span class="bead-date-value">' + t.subgrantOpen + '</span></div>';
            if (t.subgrantClose) html += '<div class="bead-date-item"><span class="bead-date-label">Bidding Closes</span><span class="bead-date-value">' + t.subgrantClose + '</span></div>';
            if (t.awardsExpected) html += '<div class="bead-date-item"><span class="bead-date-label">Awards Expected</span><span class="bead-date-value">' + t.awardsExpected + '</span></div>';
            if (t.constructionStart) html += '<div class="bead-date-item"><span class="bead-date-label">Construction</span><span class="bead-date-value">' + t.constructionStart + '</span></div>';
            if (t.subgrantApplicants) html += '<div class="bead-date-item"><span class="bead-date-label">Known Applicants</span><span class="bead-date-value">' + t.subgrantApplicants + '</span></div>';
            html += '</div>';

            // Notes
            if (t.notes) html += '<p class="layer-popup-note" style="margin-top:6px">' + t.notes + '</p>';

            // Director contact
            if (director) {
                html += '<div class="bead-timeline-director">' +
                    '<strong>' + director.name + '</strong> · ' + director.title +
                    (director.email ? ' · <span style="color:var(--accent-blue);font-family:var(--font-mono);font-size:0.66rem">' + director.email + '</span>' : '') +
                '</div>';
            }

            html += '</div>';
        });

        html += '</div>';

        // Bind filter buttons
        setTimeout(function() {
            document.querySelectorAll('.bead-filter-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    self.beadTimelineFilter = btn.dataset.beadFilter;
                    self.render();
                });
            });
        }, 0);

        return html;
    },

    /* ═══════════════════════════════════════════════
     * COMPETITIVE BID TRACKER
     * ═══════════════════════════════════════════════ */

    bidTrackerFilter: 'all',

    renderBidTracker() {
        var self = this;
        var bids = SN.data.competitiveBids;
        if (!bids || !bids.length) return '<div class="funding-section"><p>No competitive bid data available.</p></div>';

        // Get unique states for filter
        var statesSet = {};
        bids.forEach(function(b) { statesSet[b.state] = true; });
        var bidStates = Object.keys(statesSet).sort();

        var filtered = self.bidTrackerFilter === 'all' ? bids : bids.filter(function(b) { return b.state === self.bidTrackerFilter; });

        var lowCount = filtered.filter(function(b) { return b.competitionLevel === 'Low'; }).length;
        var medCount = filtered.filter(function(b) { return b.competitionLevel === 'Medium'; }).length;
        var highCount = filtered.filter(function(b) { return b.competitionLevel === 'High'; }).length;

        var html = '<div class="funding-section">' +
            '<div class="funding-hero">' +
                '<h3>Competitive Bid Tracker</h3>' +
                '<p>Who else is bidding? Track known BEAD subgrant applicants and competition levels by region. Low competition = higher win probability. Target regions where you can differentiate.</p>' +
                '<div class="funding-hero-stats">' +
                    '<div class="funding-hero-stat"><span class="fhs-val">' + filtered.length + '</span><span class="fhs-lbl">Regions Tracked</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val" style="color:var(--accent)">' + lowCount + '</span><span class="fhs-lbl">Low Competition</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val" style="color:var(--accent-warm)">' + medCount + '</span><span class="fhs-lbl">Medium</span></div>' +
                    '<div class="funding-hero-stat"><span class="fhs-val" style="color:var(--accent-hot)">' + highCount + '</span><span class="fhs-lbl">High</span></div>' +
                '</div>' +
            '</div>';

        // Legend
        html += '<div class="bid-tracker-legend">' +
            '<div class="bid-legend-item"><span class="bid-heat-dot bid-heat-low"></span> Low — 1-2 bidders</div>' +
            '<div class="bid-legend-item"><span class="bid-heat-dot bid-heat-medium"></span> Medium — 3 bidders</div>' +
            '<div class="bid-legend-item"><span class="bid-heat-dot bid-heat-high"></span> High — 4+ bidders</div>' +
        '</div>';

        // State filter
        html += '<div class="bead-timeline-filter">' +
            '<button class="bead-filter-btn' + (self.bidTrackerFilter === 'all' ? ' active' : '') + '" data-bid-filter="all">All States</button>';
        bidStates.forEach(function(st) {
            html += '<button class="bead-filter-btn' + (self.bidTrackerFilter === st ? ' active' : '') + '" data-bid-filter="' + st + '">' + st + '</button>';
        });
        html += '</div>';

        // Bid table
        html += '<div class="funding-table-wrap"><table class="funding-table" id="bid-tracker-table">' +
            '<thead><tr>' +
                '<th>State</th>' +
                '<th>Region</th>' +
                '<th>Program</th>' +
                '<th>Competition</th>' +
                '<th>Bidders</th>' +
                '<th>Known Applicants</th>' +
                '<th>Deadline</th>' +
                '<th>Notes</th>' +
            '</tr></thead><tbody>';

        filtered.forEach(function(b) {
            var heatCls = b.competitionLevel === 'Low' ? 'bid-heat-low' :
                          b.competitionLevel === 'Medium' ? 'bid-heat-medium' : 'bid-heat-high';
            html += '<tr>' +
                '<td class="cell-state">' + b.state + '</td>' +
                '<td><strong>' + b.region + '</strong></td>' +
                '<td>' + b.program + '</td>' +
                '<td><div class="bid-heat-indicator"><span class="bid-heat-dot ' + heatCls + '"></span> ' + b.competitionLevel + '</div></td>' +
                '<td class="cell-num">' + b.bidCount + '</td>' +
                '<td class="bid-applicants">' + b.knownBidders.join(', ') + '</td>' +
                '<td class="funding-date">' + (b.deadline || 'TBD') + '</td>' +
                '<td class="funding-reason">' + (b.notes || '') + '</td>' +
            '</tr>';
        });

        html += '</tbody></table></div>';
        html += '</div>';

        // Bind filter
        setTimeout(function() {
            document.querySelectorAll('[data-bid-filter]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    self.bidTrackerFilter = btn.dataset.bidFilter;
                    self.render();
                });
            });
        }, 0);

        return html;
    },

    /**
     * Update funding panel with current data.
     */
    update() {
        try { this.render(); } catch(e) { console.error('Funding render error:', e); }
    }
};
