/**
 * Spectral Nexus — Onboarding Tutorial
 * Step-by-step welcome guide for first-time users.
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
                '<br><br><strong>Click any county</strong> to see detailed broadband, funding, and demographic data.' +
                '<br><br><strong>Change metric</strong> using the "Choropleth Metric" dropdown in the top-left corner of the map.' +
                '<br><br><em>Example: Select "Unserved %" to see where the greatest coverage gaps are.</em>',
            icon: 'MAP'
        },
        {
            title: 'Map Layers — Toggle Data Overlays',
            content: 'The <strong>Map Layers</strong> panel (left side) has organized toggle buttons in 3 categories:' +
                '<br><br>' +
                '<strong>Spectrum & Coverage</strong>' +
                '<br><span style="color:#a78bfa">5G — CBRS/Private 5G Zones</span> · <span style="color:#ef4444">RF — Cellular Gaps</span>' +
                '<br><br>' +
                '<strong>Infrastructure</strong>' +
                '<br><span style="color:#06d6a0">FB — Fiber Routes</span> · <span style="color:#fbbf24">$F — Fiber Grants</span>' +
                '<br><br>' +
                '<strong>Programs & Funding</strong>' +
                '<br><span style="color:#38bdf8">SC — Smart Cities</span> · <span style="color:#f97316">RD — RDOF Defaults</span>' +
                '<br><br>Use "Show All" to see everything, or toggle individual layers. Click any overlay for details.',
            icon: 'LYR'
        },
        {
            title: 'Right Panel — Data, Charts, Insights & Funding Intel',
            content: 'The <strong>right panel</strong> has four tabs:' +
                '<br><br>' +
                '<strong>Table</strong> — Sortable data for all counties. Click any row to fly to it on the map.' +
                '<br><br>' +
                '<strong>Charts</strong> — Visual analytics: scatter plots, top counties, score distribution.' +
                '<br><br>' +
                '<strong>Insights</strong> — Top opportunities, quick wins, best ROI, underserved areas, and BEAD tracker.' +
                '<br><br>' +
                '<strong>Funding Intel</strong> — Grant pursuit guide, past winners, competitive landscape, and scoring methodology.' +
                '<br><br>' +
                'Use <strong>State filter</strong> and <strong>Score slider</strong> at the top to narrow your view.',
            icon: 'TBL'
        },
        {
            title: 'Example Workflow — Finding Your Next Opportunity',
            content: 'Here\'s how a telecom professional uses Spectral Nexus:' +
                '<br><br>' +
                '<strong>Step 1:</strong> Filter by your target state (e.g., Texas) using the State dropdown.' +
                '<br><br>' +
                '<strong>Step 2:</strong> Set Score slider to 50+ to focus on high-opportunity counties.' +
                '<br><br>' +
                '<strong>Step 3:</strong> Toggle on <span style="color:#fbbf24">Fiber Grants</span> and <span style="color:#f97316">RDOF Defaults</span> layers to see where money is flowing and where it failed.' +
                '<br><br>' +
                '<strong>Step 4:</strong> Click a high-score county to see its funding details. Hit "Add to Sales Report" on promising areas.' +
                '<br><br>' +
                '<strong>Step 5:</strong> Check the <strong>Funding Intel</strong> tab for competitive landscape — who\'s already building, who defaulted, and what grants are open.' +
                '<br><br>' +
                '<strong>Step 6:</strong> Export your Sales Report as HTML and share with your team.',
            icon: 'ACT'
        }
    ],

    /**
     * Initialize onboarding — show if first visit.
     */
    init() {
        // Always show the help button
        var helpBtn = document.getElementById('btn-help');
        if (helpBtn) {
            helpBtn.addEventListener('click', function() {
                SN.onboarding.show();
            });
        }

        // Show on first visit
        if (!localStorage.getItem('sn-onboarded')) {
            setTimeout(function() { SN.onboarding.show(); }, 800);
        }
    },

    /**
     * Show the onboarding modal.
     */
    show() {
        this.currentStep = 0;
        this.render();
        var modal = document.getElementById('onboarding-modal');
        if (modal) modal.classList.add('open');
    },

    /**
     * Close the onboarding modal.
     */
    close() {
        var modal = document.getElementById('onboarding-modal');
        if (modal) modal.classList.remove('open');
        localStorage.setItem('sn-onboarded', '1');
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

        content.innerHTML = '<div class="onb-step">' +
            '<div class="onb-icon">' + step.icon + '</div>' +
            '<h2 class="onb-title">' + step.title + '</h2>' +
            '<div class="onb-body">' + step.content + '</div>' +
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

        // Bind buttons
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
