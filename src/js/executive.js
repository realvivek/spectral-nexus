/**
 * Spectral Nexus — Executive Actions Module
 * Export CSV, generate sales reports, send-to-team functionality.
 * Designed for private 5G business unit executives.
 */

window.SN = window.SN || {};

SN.executive = {

    /* Report items collected via "Add to Report" buttons */
    reportItems: [],

    /**
     * Initialize executive panel.
     */
    init() {
        this.bindEvents();
        this.updateBadge();
    },

    bindEvents() {
        var self = this;

        var exportBtn = document.getElementById('btn-export-csv');
        if (exportBtn) exportBtn.addEventListener('click', function() { self.exportCSV(); });

        var reportBtn = document.getElementById('btn-open-report');
        if (reportBtn) reportBtn.addEventListener('click', function() { self.openReportPanel(); });

        var closeReport = document.getElementById('report-close');
        if (closeReport) closeReport.addEventListener('click', function() { self.closeReportPanel(); });

        var sendReport = document.getElementById('btn-send-report');
        if (sendReport) sendReport.addEventListener('click', function() { self.sendReport(); });

        var clearReport = document.getElementById('btn-clear-report');
        if (clearReport) clearReport.addEventListener('click', function() { self.clearReport(); });

        var exportReport = document.getElementById('btn-export-report');
        if (exportReport) exportReport.addEventListener('click', function() { self.exportReport(); });
    },

    /**
     * Add an item to the sales report.
     */
    addToReport(type, name) {
        // Prevent duplicates
        var exists = this.reportItems.some(function(item) { return item.name === name && item.type === type; });
        if (exists) return;

        var item = { type: type, name: name, addedAt: new Date().toISOString() };

        // Enrich with data
        if (type === 'cbrs') {
            var zone = SN.data.cbrsZones.find(function(z) { return z.name === name; });
            if (zone) {
                item.detail = zone.tier + ' · ' + zone.palLicenses + ' PALs · ' + zone.enterprises.toLocaleString() + ' enterprises';
                item.demandIndex = zone.demandIndex;
                item.note = zone.note;
            }
        } else if (type === 'cellular') {
            var gap = SN.data.cellularGaps.find(function(g) { return g.region === name; });
            if (gap) {
                item.detail = (gap.pop / 1000).toFixed(0) + 'K affected · Coverage gap';
                item.note = gap.note;
            }
        } else if (type === 'grant') {
            var grant = SN.data.fiberGrants.find(function(g) { return g.name === name; });
            if (grant) {
                var fmtAmt = grant.amount >= 1e9 ? '$' + (grant.amount / 1e9).toFixed(1) + 'B' : '$' + (grant.amount / 1e6).toFixed(0) + 'M';
                item.detail = fmtAmt + ' · ' + grant.miles.toLocaleString() + ' miles · ' + grant.startDate;
                item.note = grant.note;
            }
        } else if (type === 'smartcity') {
            var parts = name.split(', ');
            var city = SN.data.smartCities ? SN.data.smartCities.find(function(c) { return c.name === parts[0]; }) : null;
            if (city) {
                var fmtBudget = city.budget >= 1e9 ? '$' + (city.budget / 1e9).toFixed(1) + 'B' : '$' + (city.budget / 1e6).toFixed(0) + 'M';
                item.detail = city.program + ' · ' + fmtBudget + ' budget · ' + city.status;
                item.note = city.highlights;
            }
        } else if (type === 'rdof') {
            var rdofArea = SN.data.rdofDefaultAreas ? SN.data.rdofDefaultAreas.find(function(a) { return a.region === name; }) : null;
            if (rdofArea) {
                var fmtDefault = rdofArea.defaultedAmount >= 1e9 ? '$' + (rdofArea.defaultedAmount / 1e9).toFixed(1) + 'B' : '$' + (rdofArea.defaultedAmount / 1e6).toFixed(0) + 'M';
                item.detail = fmtDefault + ' defaulted · ' + rdofArea.defaultedLocations.toLocaleString() + ' locations · ' + rdofArea.originalAwardee;
                item.note = rdofArea.note;
            }
        } else if (type === 'county') {
            var county = SN.data.counties.find(function(c) { return c.fips === name; });
            if (county) {
                item.name = county.county + ', ' + county.state;
                item.detail = 'Score: ' + county.opportunityScore + ' · ' + (county.coverageGap * 100).toFixed(0) + '% gap · Est. ' + SN.kpi.fmt(county.fundingEstimate, 'currency');
                item.note = county.population.toLocaleString() + ' pop · ' + (county.unservedPct * 100).toFixed(1) + '% unserved';
            }
        } else if (type === 'decisionmaker') {
            item.detail = 'Decision Maker Contact';
            if (SN.data.stateDecisionMakers) {
                Object.keys(SN.data.stateDecisionMakers).forEach(function(state) {
                    var d = SN.data.stateDecisionMakers[state];
                    if (d.name === name) {
                        item.detail = d.title + ' · ' + d.agency + ' (' + state + ')';
                        item.note = (d.email || '') + (d.phone ? ' · ' + d.phone : '');
                    }
                });
            }
        } else if (type === 'beadstate') {
            var alloc = SN.config.beadAllocations[name] || 0;
            var status = SN.config.beadStatus[name] || 'Unknown';
            item.detail = 'BEAD ' + status + ' · ' + SN.kpi.fmt(alloc, 'currency') + ' allocation';
            if (SN.data.stateDecisionMakers && SN.data.stateDecisionMakers[name]) {
                item.note = 'Director: ' + SN.data.stateDecisionMakers[name].name;
            }
        } else if (type === 'competitor') {
            item.detail = 'Competitive Intelligence';
        } else if (type === 'munifiber') {
            item.detail = 'Municipal Fiber Network — Dark Fiber Available';
            if (SN.data.municipalFiber) {
                var net = SN.data.municipalFiber.find(function(n) { return n.name === name; });
                if (net) {
                    item.detail = net.city + ', ' + net.state + ' — ' + net.fiberMiles.toLocaleString() + ' miles, ' + net.maxSpeed;
                    item.note = net.darkFiberAvailable ? 'Dark fiber available for leasing' : '';
                }
            }
        } else if (type === 'datacenter') {
            item.detail = 'Data Center Connectivity Opportunity';
            if (SN.data.dataCenters) {
                var dc = SN.data.dataCenters.find(function(d) { return d.name === name; });
                if (dc) {
                    item.detail = dc.operator + ' — ' + dc.city + ', ' + dc.state + ' — ' + dc.capacityMW + ' MW, ' + dc.status;
                    item.note = dc.cbrsOpportunity ? 'CBRS/Private 5G opportunity' : '';
                }
            }
        }

        this.reportItems.push(item);
        this.updateBadge();
        // Update action bar if enhanced UI is loaded
        try { if (SN.enhancedUI) SN.enhancedUI.updateActionBar(); } catch(e) {}
        // Re-render if panel is currently open
        var panel = document.getElementById('report-panel');
        if (panel && panel.classList.contains('open')) {
            this.renderReportPanel();
        }
        this.showToast('Added to report: ' + item.name);
    },

    /**
     * Show a brief toast notification.
     */
    showToast(msg) {
        var existing = document.querySelector('.exec-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'exec-toast';
        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(function() { toast.classList.add('show'); }, 10);
        setTimeout(function() { toast.classList.remove('show'); }, 2500);
        setTimeout(function() { toast.remove(); }, 3000);
    },

    /**
     * Update the report badge count.
     */
    updateBadge() {
        var badge = document.getElementById('report-badge');
        if (badge) {
            badge.textContent = this.reportItems.length;
            badge.style.display = this.reportItems.length > 0 ? 'inline-flex' : 'none';
        }
    },

    /**
     * Export current filtered county data to CSV.
     */
    exportCSV() {
        var filtered = SN.app.getFilteredData();
        if (!filtered.length) {
            this.showToast('No data to export. Adjust filters.');
            return;
        }

        var headers = ['County','State','FIPS','Opportunity Score','Population','Median Income','Coverage Gap %',
            'Unserved %','Fiber Availability %','Unserved BSLs','Total BSLs','Providers','5G Readiness',
            'BEAD Status','Est. Funding','Poverty Rate','Pop. Density'];

        var rows = filtered.map(function(c) {
            return [
                '"' + c.county + '"', c.state, c.fips, c.opportunityScore, c.population,
                c.medianIncome, (c.coverageGap * 100).toFixed(1), (c.unservedPct * 100).toFixed(1),
                (c.fiberAvailPct * 100).toFixed(1), c.unservedBSLs, c.totalBSLs, c.towerCount,
                c.readiness5g, c.beadStatus, c.fundingEstimate, (c.povertyRate * 100).toFixed(1),
                c.populationDensity.toFixed(1)
            ].join(',');
        });

        var csv = headers.join(',') + '\n' + rows.join('\n');
        this.downloadFile('broadband-intelligence-' + new Date().toISOString().slice(0,10) + '.csv', csv, 'text/csv');
        this.showToast('Exported ' + filtered.length + ' counties to CSV');
    },

    /**
     * Open the sales report panel.
     */
    openReportPanel() {
        var panel = document.getElementById('report-panel');
        if (panel) {
            this.renderReportPanel();
            panel.classList.add('open');
        }
    },

    closeReportPanel() {
        var panel = document.getElementById('report-panel');
        if (panel) panel.classList.remove('open');
    },

    /**
     * Render the sales report panel contents.
     */
    renderReportPanel() {
        var container = document.getElementById('report-items');
        if (!container) return;

        if (!this.reportItems.length) {
            container.innerHTML = '<div class="report-empty">' +
                '<p>No items in your report yet.</p>' +
                '<p class="report-hint">Click "Add to Sales Report" buttons on map popups, or use the county table to build your sales target list.</p>' +
            '</div>';
            return;
        }

        var typeLabels = { cbrs: 'CBRS Zone', cellular: 'Coverage Gap', grant: 'Fiber Grant', smartcity: 'Smart City', county: 'County', decisionmaker: 'Decision Maker', beadstate: 'BEAD State', competitor: 'Competitor', munifiber: 'Municipal Fiber', rdof: 'RDOF Default', datacenter: 'Data Center' };
        var typeColors = { cbrs: '#a78bfa', cellular: '#ef4444', grant: '#fbbf24', smartcity: '#38bdf8', county: '#06d6a0', decisionmaker: '#38bdf8', beadstate: '#06d6a0', competitor: '#f97316', munifiber: '#22d3ee', rdof: '#f97316', datacenter: '#818cf8' };

        var html = this.reportItems.map(function(item, i) {
            return '<div class="report-item">' +
                '<div class="report-item-header">' +
                    '<span class="report-item-type" style="background:' + (typeColors[item.type] || '#06d6a0') + '">' + (typeLabels[item.type] || item.type) + '</span>' +
                    '<button class="report-item-remove" data-idx="' + i + '">x</button>' +
                '</div>' +
                '<div class="report-item-name">' + item.name + '</div>' +
                (item.detail ? '<div class="report-item-detail">' + item.detail + '</div>' : '') +
                (item.note ? '<div class="report-item-note">' + item.note + '</div>' : '') +
            '</div>';
        }).join('');

        container.innerHTML = html;

        // Bind remove buttons
        container.querySelectorAll('.report-item-remove').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                SN.executive.reportItems.splice(parseInt(btn.dataset.idx), 1);
                SN.executive.renderReportPanel();
                SN.executive.updateBadge();
            });
        });
    },

    /**
     * Export the sales report as formatted text / HTML file.
     */
    exportReport() {
        if (!this.reportItems.length) {
            this.showToast('Report is empty.');
            return;
        }

        var date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        var typeLabels = { cbrs: 'CBRS/Private 5G Zone', cellular: 'Cellular Coverage Gap', grant: 'Fiber Grant Opportunity', smartcity: 'Smart City', county: 'Target County' };

        var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Private 5G Sales Intelligence Report</title>' +
            '<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#1a1a2e}' +
            'h1{color:#1a1a2e;border-bottom:3px solid #06d6a0;padding-bottom:12px}' +
            'h2{color:#38bdf8;margin-top:32px}' +
            '.item{background:#f8fafc;border-left:4px solid #06d6a0;padding:16px;margin:12px 0;border-radius:0 8px 8px 0}' +
            '.item-type{display:inline-block;font-size:12px;font-weight:700;padding:3px 10px;border-radius:4px;color:#fff;margin-bottom:8px}' +
            '.item h3{margin:4px 0}' +
            '.item p{margin:4px 0;color:#64748b;font-size:14px}' +
            '.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px}' +
            '</style></head><body>' +
            '<h1>Private 5G Sales Intelligence Report</h1>' +
            '<p>Generated: ' + date + ' | Items: ' + this.reportItems.length + '</p>' +
            '<p><em>Prepared using Spectral Nexus Broadband Funding Intelligence</em></p>';

        // Group by type
        var grouped = {};
        this.reportItems.forEach(function(item) {
            if (!grouped[item.type]) grouped[item.type] = [];
            grouped[item.type].push(item);
        });

        var typeColors = { cbrs: '#a78bfa', cellular: '#ef4444', grant: '#fbbf24', smartcity: '#38bdf8', county: '#06d6a0' };

        Object.keys(grouped).forEach(function(type) {
            html += '<h2>' + (typeLabels[type] || type) + 's</h2>';
            grouped[type].forEach(function(item) {
                html += '<div class="item" style="border-left-color:' + (typeColors[type] || '#06d6a0') + '">' +
                    '<span class="item-type" style="background:' + (typeColors[type] || '#06d6a0') + '">' + (typeLabels[type] || type) + '</span>' +
                    '<h3>' + item.name + '</h3>' +
                    (item.detail ? '<p><strong>' + item.detail + '</strong></p>' : '') +
                    (item.note ? '<p>' + item.note + '</p>' : '') +
                '</div>';
            });
        });

        html += '<div class="footer">' +
            '<p>This report was generated by Spectral Nexus — Broadband Funding Intelligence Platform.</p>' +
            '<p>Data sources: FCC BDC, Census ACS, NTIA BEAD Allocations, FCC ULS CBRS Database.</p>' +
            '<p>For the interactive dashboard: <em>https://realvivek.github.io/spectral-nexus/</em></p>' +
            '</div></body></html>';

        this.downloadFile('5G-Sales-Report-' + new Date().toISOString().slice(0,10) + '.html', html, 'text/html');
        this.showToast('Sales report exported!');
    },

    /**
     * Send report — generates email-ready content and opens mailto.
     */
    sendReport() {
        if (!this.reportItems.length) {
            this.showToast('Report is empty. Add items first.');
            return;
        }

        var subject = 'Private 5G Sales Intelligence - ' + this.reportItems.length + ' Opportunities';
        var body = 'PRIVATE 5G SALES INTELLIGENCE REPORT\n' +
            'Generated: ' + new Date().toLocaleDateString() + '\n' +
            '═══════════════════════════════════════\n\n';

        var typeLabels = { cbrs: 'CBRS Zone', cellular: 'Coverage Gap', grant: 'Fiber Grant', smartcity: 'Smart City', county: 'Target County' };

        this.reportItems.forEach(function(item, i) {
            body += (i + 1) + '. [' + (typeLabels[item.type] || item.type).toUpperCase() + '] ' + item.name + '\n';
            if (item.detail) body += '   ' + item.detail + '\n';
            if (item.note) body += '   Note: ' + item.note + '\n';
            body += '\n';
        });

        body += '═══════════════════════════════════════\n';
        body += 'Dashboard: https://realvivek.github.io/spectral-nexus/\n';
        body += 'Data: FCC BDC, Census ACS, NTIA BEAD, FCC ULS CBRS\n';

        var mailto = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.open(mailto, '_blank');
        this.showToast('Opening email client...');
    },

    /**
     * Clear all report items.
     */
    clearReport() {
        this.reportItems = [];
        this.updateBadge();
        this.renderReportPanel();
        this.showToast('Report cleared.');
    },

    /**
     * Utility: download a file.
     */
    downloadFile(filename, content, mimeType) {
        var blob = new Blob([content], { type: mimeType });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
