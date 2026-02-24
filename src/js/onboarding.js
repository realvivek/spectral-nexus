/**
 * Spectral Nexus — Onboarding Tutorial
 * Step-by-step welcome guide with visual workflow examples.
 * Shows on first visit (stored in localStorage).
 */

window.SN = window.SN || {};

SN.onboarding = {

    currentStep: 0,

    steps: [
        {
            title: 'Welcome to Broadband Funding Intelligence',
            content: 'Spectral Nexus helps <strong>telecom professionals</strong> identify the best broadband deployment and funding opportunities across 3,100+ US counties.' +
                '<br><br>Powered by real FCC BDC data, $42.45B in BEAD funding allocations, CBRS spectrum zones, smart city programs, and RDOF default tracking.',
            icon: 'SN'
        },
        {
            title: 'The Map — Your Command Center',
            content: '<strong>Each dot is a county</strong>, colored by the selected metric (Opportunity Score by default). Bigger dots = larger population.' +
                '<br><br><strong>Click any county</strong> to see detailed broadband, funding, and demographic data — plus key decision maker contacts.' +
                '<br><br><strong>Change metric</strong> using the "Choropleth Metric" dropdown in the top-left corner of the map.',
            icon: 'MAP'
        },
        {
            title: 'Map Layers — Toggle Everything On/Off',
            content: 'The <strong>Map Layers</strong> panel (below the map metric selector) lets you control all map elements:' +
                '<br><br>' +
                '<strong>Base Layers</strong> — Toggle county markers and basemap on/off' +
                '<br><br>' +
                '<strong>Spectrum & Coverage</strong>' +
                '<br><span style="color:#a78bfa">5G — CBRS Zones</span> · <span style="color:#ef4444">RF — Cellular Dead Zones</span>' +
                '<br><br>' +
                '<strong>Infrastructure</strong>' +
                '<br><span style="color:#06d6a0">FB — Fiber Routes</span> · <span style="color:#fbbf24">$F — Grant Areas</span>' +
                '<br><br>' +
                '<strong>Programs & Funding</strong>' +
                '<br><span style="color:#38bdf8">SC — Smart Cities</span> · <span style="color:#f97316">RD — RDOF Defaults</span>' +
                '<br><br>Use "Show All" / "Clear All" for quick control. Click any overlay for details.',
            icon: 'LYR'
        },
        {
            title: 'KPI Bar, Tabs & Decision Makers',
            content: 'The <strong>top KPI bar</strong> shows actionable metrics — click any card to filter or navigate:' +
                '<br><br>' +
                '<strong>High-Opportunity Counties</strong> — Click to filter to score 60+' +
                '<br><strong>Available Funding</strong> — Click to view Grants Guide' +
                '<br><strong>BEAD-Ready Counties</strong> — Click to filter approved areas' +
                '<br><strong>#1 Opportunity</strong> — Click to fly to top county on map' +
                '<br><br>' +
                'The <strong>right panel</strong> has 5 tabs: Table, Charts, Insights, Funding Intel, and each with data you can sort and click through.' +
                '<br><br>The <strong>Funding Intel</strong> tab now includes a Decision Makers directory with state broadband office directors, electric co-op contacts, and tribal administrators.',
            icon: 'TBL'
        },
        {
            title: 'Workflow: Find an Opportunity in 5 Steps',
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
                        '<div class="wf-step-title">Choose Your Target State</div>' +
                        '<div class="wf-step-desc">Use the <strong>State filter</strong> dropdown to narrow to your focus area (e.g., Texas, Virginia).</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup">' +
                                '<span class="wf-mock-label">State</span>' +
                                '<span class="wf-mock-select">TX - Texas</span>' +
                                '<span class="wf-mock-label">Min Score</span>' +
                                '<span class="wf-mock-slider">&#9608;&#9608;&#9608;&#9608;&#9608;&#9601;&#9601; 50+</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">2</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Identify High-Score Counties on the Map</div>' +
                        '<div class="wf-step-desc">Green/bright dots = high opportunity scores. Toggle on <span style="color:#f97316">RDOF Defaults</span> and <span style="color:#fbbf24">Fiber Grants</span> layers to see where money is flowing.</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup wf-mockup-map">' +
                                '<span class="wf-dot wf-dot-green" style="left:30%;top:40%"></span>' +
                                '<span class="wf-dot wf-dot-green" style="left:50%;top:25%"></span>' +
                                '<span class="wf-dot wf-dot-yellow" style="left:70%;top:55%"></span>' +
                                '<span class="wf-dot wf-dot-red" style="left:20%;top:65%"></span>' +
                                '<span class="wf-dot wf-dot-green" style="left:60%;top:70%"></span>' +
                                '<span class="wf-label-overlay">Click a green dot</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">3</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Review County Details & Decision Makers</div>' +
                        '<div class="wf-step-desc">Click a county to see its <strong>popup</strong> with funding estimate, coverage gap, unserved BSLs, and <strong>key decision maker contacts</strong> — state broadband director, co-ops, tribal admins.</div>' +
                        '<div class="wf-step-visual">' +
                            '<div class="wf-mockup wf-mockup-popup">' +
                                '<div class="wf-popup-head">Wheeler County, TX</div>' +
                                '<div class="wf-popup-score" style="color:#06d6a0">Score: 82</div>' +
                                '<div class="wf-popup-line">Est. Funding: $4.2M · 28% unserved</div>' +
                                '<div class="wf-popup-contact">State Director: Greg Conte</div>' +
                                '<div class="wf-popup-contact">broadband@cpa.texas.gov</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card">' +
                    '<div class="wf-step-num">4</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Check Funding Intel & Build Your Report</div>' +
                        '<div class="wf-step-desc">Go to <strong>Funding Intel</strong> tab &rarr; <strong>Decision Makers</strong> for full contact directory. Check <strong>Grants Awarded</strong> to see who is already building. Add promising areas to your <strong>Sales Report</strong>.</div>' +
                    '</div>' +
                '</div>' +

                '<div class="wf-arrow">&#8595;</div>' +

                '<div class="workflow-step-card wf-step-final">' +
                    '<div class="wf-step-num">5</div>' +
                    '<div class="wf-step-content">' +
                        '<div class="wf-step-title">Export & Take Action</div>' +
                        '<div class="wf-step-desc">Click <strong>Sales Report</strong> in the header to review your saved items. Export as HTML and share with your team. You now have specific counties, funding amounts, and decision maker contacts — schedule your first meeting.</div>' +
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
