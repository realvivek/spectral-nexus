/**
 * Spectral Nexus — Scoring Engine
 * Computes opportunityScore (0-100) for each county.
 * Weights are configurable in config.js.
 *
 * Calibrated to real FCC BDC data (v0.3.0).
 * Uses sqrt transforms for coverageGap/unservedPct to spread
 * distributions where most real-world data lives (0-30%).
 */

window.SN = window.SN || {};

SN.scoring = {

    /**
     * Score coverage gap using sqrt transform.
     * Real data: median=10.6%, p75=25.5%, p95=59%.
     * sqrt spreads out the low end where most counties cluster.
     * Calibrated so p75 (~25%) → ~70.
     */
    scoreCoverageGap(gap) {
        return Math.round(Math.min(100, Math.sqrt(gap) * 140));
    },

    /**
     * Score unserved percentage using sqrt transform.
     * Real data: median=6.5%, p75=16.8%, p95=44%.
     * Calibrated so p75 (~17%) → ~70.
     */
    scoreUnserved(pct) {
        return Math.round(Math.min(100, Math.sqrt(pct) * 170));
    },

    /**
     * Score population density on a non-linear curve.
     * Sweet spot is moderate density (50-200/sq mi) —
     * dense enough for cost-effective deployment but not already saturated.
     */
    scoreDensity(density) {
        const curve = SN.config.densityCurve;
        for (const band of curve) {
            if (density <= band.max) return band.score;
        }
        return 25;
    },

    /**
     * Score income need — lower income = higher need = more grant-eligible.
     * Continuous linear curve instead of step function.
     * Real data: median=$60.8K, p5=$41K, p95=$95K.
     * $30K → 90, $60K → 60, $90K → 30, $120K+ → 20.
     */
    scoreIncomeNeed(medianIncome) {
        return Math.round(Math.max(20, Math.min(95, 120 - (medianIncome / 1000))));
    },

    /**
     * Score funding eligibility based on BEAD status + unserved %.
     * With all states now BEAD-approved, the key differentiator
     * is unserved percentage — higher unserved = more BEAD-eligible BSLs.
     */
    scoreFunding(beadStatus, unservedPct) {
        const cfg = SN.config.fundingScore;

        if (beadStatus === 'Approved') {
            if (unservedPct > 0.30) return cfg.approvedVeryHigh;
            if (unservedPct > 0.15) return cfg.approvedHigh;
            if (unservedPct > 0.05) return cfg.approvedMod;
            if (unservedPct > 0.02) return cfg.approvedLow;
            return cfg.approvedMinimal;
        }
        if (beadStatus === 'Pending') {
            if (unservedPct > 0.15) return cfg.pendingHigh;
            if (unservedPct > 0.05) return cfg.pendingMod;
            return cfg.pendingLow;
        }
        if (unservedPct > 0.15) return cfg.noBeadHigh;
        return cfg.noBeadDefault;
    },

    /**
     * Compute the composite opportunity score for a single county.
     */
    computeScore(county) {
        const w = SN.config.weights;

        const coverageGapScore = this.scoreCoverageGap(county.coverageGap);
        const unservedScore    = this.scoreUnserved(county.unservedPct);
        const densityScore     = this.scoreDensity(county.populationDensity);
        const incomeScore      = this.scoreIncomeNeed(county.medianIncome);
        const readinessScore   = county.readiness5g;
        const fundingScore     = this.scoreFunding(county.beadStatus, county.unservedPct);

        const raw = (
            w.coverageGap * coverageGapScore +
            w.unservedPct * unservedScore +
            w.popDensity  * densityScore +
            w.incomeNeed  * incomeScore +
            w.readiness5g * readinessScore +
            w.funding     * fundingScore
        );

        return Math.round(Math.min(100, Math.max(0, raw)));
    },

    /**
     * Compute scores for all counties in the dataset.
     */
    computeAll() {
        SN.data.counties.forEach(county => {
            county.opportunityScore = this.computeScore(county);
        });

        // Sort by score descending for initial display
        SN.data.counties.sort((a, b) => b.opportunityScore - a.opportunityScore);
    },

    /**
     * Get score breakdown for a county (used in popups/methodology).
     */
    getBreakdown(county) {
        const w = SN.config.weights;
        return {
            coverageGap: { weight: w.coverageGap, score: this.scoreCoverageGap(county.coverageGap) },
            unservedPct: { weight: w.unservedPct, score: this.scoreUnserved(county.unservedPct) },
            popDensity:  { weight: w.popDensity,  score: this.scoreDensity(county.populationDensity) },
            incomeNeed:  { weight: w.incomeNeed,  score: this.scoreIncomeNeed(county.medianIncome) },
            readiness5g: { weight: w.readiness5g, score: county.readiness5g },
            funding:     { weight: w.funding,     score: this.scoreFunding(county.beadStatus, county.unservedPct) }
        };
    }
};
