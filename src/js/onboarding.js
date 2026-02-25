/**
 * Spectral Nexus — Onboarding Tutorial
 * Step-by-step welcome guide with visual workflow examples.
 * Shows on first visit (stored in localStorage).
 * Updated for v0.8.0: Wireless & Fiber Pipeline Intelligence.
 */

window.SN = window.SN || {};

SN.onboarding = {

    currentStep: 0,

    steps: [
        {
            title: 'Welcome to Wireless & Fiber Pipeline Intelligence',
            content: '<strong>Spectral Nexus</strong> helps telecom professionals and system integrators find the best <strong>private 5G, CBRS, fiber, and broadband</strong> opportunities across 3,100+ US counties.' +
                '<br><br>What\'s inside:' +
                '<br>&bull; <strong>Private 5G & Smart City opportunities</strong> — cities ready for CBRS/private wireless' +
                '<br>&bull; <strong>Data Center connectivity</strong> — new builds, expansions, CBRS-ready facilities' +
                '<br>&bull; <strong>BEAD funding pipeline</strong> — $42.45B in state allocations, open bids, deadlines' +
                '<br>&bull; <strong>Decision Maker contacts</strong> — CIOs, state directors, co-ops, tribal offices' +
                '<br>&bull; <strong>Competitive intelligence</strong> — who\'s bidding where, RDOF defaults',
            icon: 'SN'
        },
        {
            title: 'Dashboard Home — Your Starting Point',
            content: 'The <strong>Home</strong> page is your intelligence brief. It\'s organized top to bottom by priority:' +
                '<br><br>' +
                '<strong>1. Private 5G & Smart City Opportunities</strong> — Cities with fiber backbone but no private 5G. Each card shows the city program, budget, IoT sensors, CBRS utilization, dark fiber availability, and the decision maker to contact.' +
                '<br><br>' +
                '<strong>2. Data Center Connectivity</strong> — New builds and expansions that need wireless backhaul. Flagged for CBRS opportunity.' +
                '<br><br>' +
                '<strong>3. Active Bids & Contracts</strong> — Competitive BEAD subgrant bids with deadlines, known bidders, and competition level.' +
                '<br><br>' +
                '<strong>4. Top Counties, BEAD Pipeline, Dark Fiber, RDOF, Grants</strong> — Paired sections below with detailed data.' +
                '<br><br>Every section has <strong>"+ Report"</strong> buttons — click them to build your sales report as you browse.',
            icon: 'HOME'
        },
        {
            title: 'Maps & Data — Deep Analysis',
            content: 'Click <strong>"Maps & Data"</strong> in the top nav to open the interactive analysis view:' +
                '<br><br>' +
                '<strong>The Map</strong> — Each dot is a county, colored by opportunity score. Click any county for a detailed popup with funding estimates, coverage gaps, and contacts.' +
                '<br><br>' +
                '<strong>Map Layers</strong> — Toggle overlays on/off:' +
                '<br>&bull; <span style="color:var(--accent-purple)">CBRS Spectrum Zones</span> with GAA utilization data' +
                '<br>&bull; <span style="color:#c084fc">Private 5G Deployments</span> — active networks' +
                '<br>&bull; <span style="color:#818cf8">Data Centers</span> — facilities with contacts' +
                '<br>&bull; <span style="color:#22d3ee">Municipal Fiber</span> — dark fiber networks' +
                '<br>&bull; <span style="color:#38bdf8">Smart Cities</span> · <span style="color:#ef4444">Cellular Dead Zones</span> · <span style="color:#f97316">RDOF Defaults</span> · <span style="color:#fbbf24">Fiber Grants</span>' +
                '<br><br>' +
                '<strong>Filters</strong> — State dropdown and minimum score slider to narrow results.' +
                '<br><strong>Table & Charts</strong> — Sortable county data and visual analysis in the right panel.',
            icon: 'MAP'
        },
        {
            title: 'Contacts, Funding & Top Targets',
            content: 'Use the <strong>top navigation bar</strong> to access specialized views:' +
                '<br><br>' +
                '<strong>Contacts</strong> — Full rolodex of decision makers. Filter by type:' +
                '<br>&bull; <span style="color:#38bdf8">State Broadband Directors</span> — the people who approve BEAD subgrants' +
                '<br>&bull; <span style="color:#fbbf24">City CIOs/CTOs</span> — smart city technology leaders' +
                '<br>&bull; <span style="color:#818cf8">Data Center Contacts</span> — facility leasing and operations' +
                '<br>&bull; <span style="color:#a78bfa">Electric Co-ops</span> · <span style="color:#06d6a0">Tribal Offices</span>' +
                '<br>Search by name, state, org, or email.' +
                '<br><br>' +
                '<strong>Funding Intel</strong> — Complete grant database, BEAD state timelines, awarded contracts, and competitive landscape in a full-page view.' +
                '<br><br>' +
                '<strong>Insights</strong> — Automated analysis of BEAD urgency, quick wins, emerging markets, and co-op/tribal opportunities.' +
                '<br><br>' +
                '<strong>Top Targets</strong> — Pre-ranked list of highest-opportunity counties with one-click report building.',
            icon: 'DIR'
        },
        {
            title: 'Workflow: Land a Deal in 5 Steps',
            content: '',
            icon: 'ACT',
            isWorkflow: true
        }
    ],

    /**
     * Initialize onboarding.
     */
    init() {
        var helpBtn = document.getElementById('btn-help');
        if (helpBtn) {
            helpBtn.addEventListener('click', function() {
                SN.onboarding.show();
            });
        }

        if (!localStorage.getItem('sn-onboarded')) {
            setTimeout(function() { SN.onboarding.show(); }, 800);
        }
    },

    show() {
        this.currentStep = 0;
        this.render();
        var modal = document.getElementById('onboarding-modal');
        if (modal) modal.classList.add('open');
    },

    close() {
        var modal = document.getElementById('onboarding-modal');
        if (modal) modal.classList.remove('open');
        localStorage.setItem('sn-onboarded', '1');
    },

    /**
     * Build the visual workflow step content.
     */
    buildWorkflowContent() {
        return '' +
            '<div class="workflow-visual">' +
                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">1</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Scan the Dashboard for Opportunities</div>' +
                        '<div class="wf-step-desc">Start on the <strong>Home</strong> page. Review the <strong>Private 5G opportunities</strong> at the top — these are smart cities with fiber backbone but no private wireless network. Check <strong>Data Center</strong> new builds that need connectivity.</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">2</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Build Your Target List</div>' +
                        '<div class="wf-step-desc">Click <strong>"+ Sales Report"</strong> on any card to save it. Add cities, counties, data centers, grants, and contacts. Everything accumulates in your report.</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup">' +
                                '<span class="wf-mock-label">Report</span>' +
                                '<span class="wf-mock-select">3 items saved</span>' +
                                '<span class="wf-mock-label">Types</span>' +
                                '<span style="color:var(--accent-purple);font-size:0.64rem">Smart City</span> ' +
                                '<span style="color:#818cf8;font-size:0.64rem">Data Center</span> ' +
                                '<span style="color:var(--accent);font-size:0.64rem">County</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">3</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Deep-Dive with Maps & Data</div>' +
                        '<div class="wf-step-desc">Go to <strong>Maps & Data</strong>. Toggle on layers like <span style="color:var(--accent-purple)">CBRS Zones</span>, <span style="color:#818cf8">Data Centers</span>, and <span style="color:#22d3ee">Municipal Fiber</span>. Click any marker for detail popups with contacts.</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup wf-mockup-map">' +
                                '<span class="wf-dot wf-dot-green" style="left:30%;top:40%"></span>' +
                                '<span class="wf-dot wf-dot-green" style="left:50%;top:25%"></span>' +
                                '<span class="wf-dot wf-dot-yellow" style="left:70%;top:55%"></span>' +
                                '<span class="wf-dot wf-dot-red" style="left:20%;top:65%"></span>' +
                                '<span class="wf-dot wf-dot-green" style="left:60%;top:70%"></span>' +
                                '<span class="wf-label-overlay">Click any marker for details</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">4</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Find the Right Contact</div>' +
                        '<div class="wf-step-desc">Go to <strong>Contacts</strong> to search the decision maker rolodex. Filter by <strong>City CIOs</strong> for smart city deals, <strong>State Directors</strong> for BEAD subgrants, or <strong>Data Center</strong> contacts for facility partnerships.</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup wf-mockup-popup">' +
                                '<div class="wf-popup-head">Michael Sherwood</div>' +
                                '<div class="wf-popup-score" style="color:var(--accent-blue)">Chief Innovation Officer</div>' +
                                '<div class="wf-popup-line">City of Las Vegas — Smart City Program</div>' +
                                '<div class="wf-popup-contact">msherwood@lasvegasnevada.gov</div>' +
                                '<div class="wf-popup-contact">(702) 229-6301</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card wf-step-final">' +
                    '<div class="wf-step-num">5</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Export & Take Action</div>' +
                        '<div class="wf-step-desc">Click <strong>Sales Report</strong> in the header to review everything you\'ve saved. Export as an HTML report to share with your team, or email it directly. You now have specific targets, funding amounts, competitive intel, and the right person to call.</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    },

    /**
     * Render current step.
     */
    render() {
        var step = this.steps[this.currentStep];
        var total = this.steps.length;
        var current = this.currentStep + 1;

        var content = document.getElementById('onboarding-content');
        if (!content) return;

        var bodyHtml = step.isWorkflow ? this.buildWorkflowContent() : step.content;

        content.innerHTML = '<div class="onb-step">' +
            '<div class="onb-icon">' + step.icon + '</div>' +
            '<h2 class="onb-title">' + step.title + '</h2>' +
            '<div class="onb-body">' + bodyHtml + '</div>' +
            '<div class="onb-progress">' +
                '<div class="onb-dots">' + this.steps.map(function(_, i) {
                    return '<span class="onb-dot' + (i === SN.onboarding.currentStep ? ' active' : '') + '"></span>';
                }).join('') + '</div>' +
                '<span class="onb-counter">' + current + ' / ' + total + '</span>' +
            '</div>' +
            '<div class="onb-actions">' +
                (this.currentStep > 0 ? '<button class="onb-btn onb-btn-prev" id="onb-prev">Back</button>' : '<span></span>') +
                (this.currentStep < total - 1 ?
                    '<button class="onb-btn onb-btn-next" id="onb-next">Next</button>' :
                    '<button class="onb-btn onb-btn-done" id="onb-done">Get Started</button>') +
            '</div>' +
            '<button class="onb-skip" id="onb-skip">Skip tutorial</button>' +
        '</div>';

        var self = this;
        var nextBtn = document.getElementById('onb-next');
        if (nextBtn) nextBtn.addEventListener('click', function() { self.next(); });

        var prevBtn = document.getElementById('onb-prev');
        if (prevBtn) prevBtn.addEventListener('click', function() { self.prev(); });

        var doneBtn = document.getElementById('onb-done');
        if (doneBtn) doneBtn.addEventListener('click', function() { self.close(); });

        var skipBtn = document.getElementById('onb-skip');
        if (skipBtn) skipBtn.addEventListener('click', function() { self.close(); });
    },

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.render();
        }
    },

    prev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
        }
    }
};
