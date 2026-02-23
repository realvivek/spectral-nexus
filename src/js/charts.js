/**
 * Spectral Nexus — Charts Module
 * Chart.js: Scatter, Bar (Top 10), Histogram.
 */

window.SN = window.SN || {};

SN.charts = {

    scatterChart: null,
    barChart: null,
    histChart: null,

    /* Chart.js global dark theme */
    applyTheme() {
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.borderColor = 'rgba(30, 41, 59, 0.8)';
        Chart.defaults.font.family = "'DM Sans', sans-serif";
        Chart.defaults.font.size = 11;
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    },

    /**
     * Render all charts.
     */
    render(counties) {
        this.applyTheme();
        this.renderScatter(counties);
        this.renderBar(counties);
        this.renderHistogram(counties);
    },

    /**
     * Scatter: Population Density vs Coverage Gap, sized by score.
     */
    renderScatter(counties) {
        const ctx = document.getElementById('chart-scatter');
        if (!ctx) return;
        if (this.scatterChart) this.scatterChart.destroy();

        const data = counties.map(c => ({
            x: Math.min(c.populationDensity, 3000),
            y: c.coverageGap * 100,
            r: Math.max(3, c.opportunityScore / 10),
            label: c.county.replace(' County','').replace(' Parish',''),
            state: c.state,
            score: c.opportunityScore
        }));

        this.scatterChart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Counties',
                    data: data,
                    backgroundColor: data.map(d =>
                        d.score >= 70 ? 'rgba(6,214,160,0.6)' :
                        d.score >= 45 ? 'rgba(251,191,36,0.6)' :
                        'rgba(239,68,68,0.5)'
                    ),
                    borderColor: data.map(d =>
                        d.score >= 70 ? '#06d6a0' :
                        d.score >= 45 ? '#fbbf24' :
                        '#ef4444'
                    ),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Population Density vs Coverage Gap',
                        color: '#f1f5f9',
                        font: { size: 13, weight: '600' },
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: '#334155',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label(ctx) {
                                const d = ctx.raw;
                                return [
                                    `${d.label}, ${d.state}`,
                                    `Density: ${d.x}/sq mi`,
                                    `Coverage Gap: ${d.y.toFixed(1)}%`,
                                    `Score: ${d.score}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Population Density (per sq mi)', color: '#64748b' },
                        grid: { color: 'rgba(30,41,59,0.6)' },
                        ticks: { color: '#64748b' }
                    },
                    y: {
                        title: { display: true, text: 'Coverage Gap (%)', color: '#64748b' },
                        grid: { color: 'rgba(30,41,59,0.6)' },
                        ticks: { color: '#64748b' }
                    }
                }
            }
        });
    },

    /**
     * Bar: Top 10 counties by opportunity score.
     */
    renderBar(counties) {
        const ctx = document.getElementById('chart-bar');
        if (!ctx) return;
        if (this.barChart) this.barChart.destroy();

        const top10 = [...counties]
            .sort((a, b) => b.opportunityScore - a.opportunityScore)
            .slice(0, 10);

        const labels = top10.map(c =>
            c.county.replace(' County','').replace(' Parish','') + ', ' + c.state
        );

        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Opportunity Score',
                    data: top10.map(c => c.opportunityScore),
                    backgroundColor: top10.map((c, i) => {
                        const colors = [
                            '#06d6a0','#08c493','#0ab286','#0c9f79',
                            '#38bdf8','#45aae0','#5298c8','#5f85b0',
                            '#6b7298','#786080'
                        ];
                        return colors[i] || '#06d6a0';
                    }),
                    borderColor: 'transparent',
                    borderRadius: 4,
                    barThickness: 28
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 10 Counties by Opportunity Score',
                        color: '#f1f5f9',
                        font: { size: 13, weight: '600' },
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: '#334155',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        min: 0, max: 100,
                        grid: { color: 'rgba(30,41,59,0.6)' },
                        ticks: { color: '#64748b' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { size: 11 } }
                    }
                }
            }
        });
    },

    /**
     * Histogram: Distribution of opportunity scores.
     */
    renderHistogram(counties) {
        const ctx = document.getElementById('chart-hist');
        if (!ctx) return;
        if (this.histChart) this.histChart.destroy();

        // Bucket into 10-point bins
        const bins = Array(10).fill(0);
        counties.forEach(c => {
            const idx = Math.min(9, Math.floor(c.opportunityScore / 10));
            bins[idx]++;
        });

        const labels = bins.map((_, i) => `${i * 10}-${i * 10 + 9}`);

        this.histChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Counties',
                    data: bins,
                    backgroundColor: SN.config.choroplethColors.slice(0, 8).concat(['#ef4444','#ef4444']).map(c => c + 'cc'),
                    borderColor: SN.config.choroplethColors.slice(0, 8).concat(['#ef4444','#ef4444']),
                    borderWidth: 1,
                    borderRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Score Distribution',
                        color: '#f1f5f9',
                        font: { size: 13, weight: '600' },
                        padding: { bottom: 12 }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: '#334155',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Opportunity Score Range', color: '#64748b' },
                        grid: { display: false },
                        ticks: { color: '#64748b' }
                    },
                    y: {
                        title: { display: true, text: 'Number of Counties', color: '#64748b' },
                        grid: { color: 'rgba(30,41,59,0.6)' },
                        ticks: { color: '#64748b', stepSize: 5 }
                    }
                }
            }
        });
    },

    /**
     * Update charts with new filtered data.
     */
    update(counties) {
        this.render(counties);
    }
};
