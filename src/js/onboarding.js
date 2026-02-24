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
            content: 'This platform helps <strong>Private 5G business executives</strong> identify the best deployment opportunities across 3,100+ US counties.' +
                '<br><br>Powered by real FCC BDC data, BEAD funding allocations, and CBRS spectrum intelligence.',
            icon: 'SN'
        },
        {
            title: 'The Map — Your Command Center',
            content: '<strong>Choropleth counties</strong> — Each dot is a county, colored by the selected metric (Opportunity Score by default). Bigger dots = larger population.' +
                '<br><br><strong>Click any county</strong> to see detailed broadband, funding, and demographic data.' +
                '<br><br><strong>Change metric</strong> using the dropdown in the top-left corner of the map.',
            icon: 'MAP'
        },
        {
            title: 'Map Layers — Toggle Overlays',
            content: 'Use the <strong>Map Layers</strong> panel on the left to toggle data overlays:' +
                '<br><br>' +
                '<span style="color:#a78bfa"><strong>5G — CBRS / Private 5G Zones</strong></span><br>PAL license areas, enterprise demand index, and incumbent exclusion zones.' +
                '<br><br>' +
                '<span style="color:#ef4444"><strong>RF — Cellular Coverage Gaps</strong></span><br>Areas with no/poor public carrier coverage — perfect for private network sales.' +
                '<br><br>' +
                '<span style="color:#06d6a0"><strong>FB — Fiber Backbone Routes</strong></span><br>Existing fiber corridors for backhaul connection.' +
                '<br><br>' +
                '<span style="color:#fbbf24"><strong>$F — Fiber Grant Build-outs</strong></span><br>Active BEAD grants — new fiber being built. Layer private 5G on top.' +
                '<br><br>' +
                '<span style="color:#38bdf8"><strong>SC — Smart Cities</strong></span><br>Cities with active smart city programs, budgets, and infrastructure details.',
            icon: 'LYR'
        },
        {
            title: 'Filters, Table & Insights',
            content: '<strong>Right panel</strong> has three tabs:' +
                '<br><br>' +
                '<strong>Table</strong> — Sortable data for all counties. Click any row to fly to it on the map.' +
                '<br><br>' +
                '<strong>Charts</strong> — Visual analytics: scatter plots, top counties, score distribution.' +
                '<br><br>' +
                '<strong>Insights</strong> — Curated findings: top funding opportunities, quick wins, best ROI, BEAD tracker.' +
                '<br><br>' +
                'Use <strong>State filter</strong> and <strong>Score slider</strong> to narrow your view.',
            icon: 'TBL'
        },
        {
            title: 'Executive Actions — Build Your Sales Pipeline',
            content: 'This platform is built for action:' +
                '<br><br>' +
                '<strong>Export CSV</strong> — Download filtered county data for your CRM or analysis.' +
                '<br><br>' +
                '<strong>Sales Report</strong> — Click "Add to Sales Report" on any map popup to collect targets. Export as a formatted HTML report or email to your sales team.' +
                '<br><br>' +
                '<strong>Think like this:</strong> Find counties with high broadband gaps → check if BEAD fiber is coming → overlay private 5G on that new infrastructure → target nearby enterprises.',
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
