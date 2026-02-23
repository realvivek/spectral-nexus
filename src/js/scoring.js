/**
 * Spectral Nexus — Scoring Engine
 * Computes opportunityScore (0-100) for each county.
 * Weights are configurable in config.js.
 */

window.SN = window.SN || {};

SN.scoring = {

    /**
     * Score population density on a non-linear curve.
     * Sweet spot is moderate density (50-200/sq mi).
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
     * Normalized against US median (~$75K).
     */
    scoreIncomeNeed(medianIncome) {
        const usMedian = 75000;
        const ratio = medianIncome / usMedian;
        if (ratio <= 0.5) return 95;
        if (ratio <= 0.65) return 80;
        if (ratio <= 0.80) return 65;
        if (ratio <= 1.0) return 50;
        if (ratio <= 1.2) return 35;
        return 20;
    },

    /**
     * Score funding availability based on BEAD status + unserved %.
     */
    scoreFunding(beadStatus, unservedPct) {
        const cfg = SN.config.fundingScore;
        const highUnserved = unservedPct > 0.15;
        const modUnserved = unservedPct > 0.05;

        if (beadStatus === 'Approved') {
            if (highUnserved) return cfg.approvedHighUnserved;
            if (modUnserved) return cfg.approvedModUnserved;
            return cfg.approvedLowUnserved;
        }
        if (beadStatus === 'Pending') {
            if (highUnserved) return cfg.pendingHighUnserved;
            if (modUnserved) return cfg.pendingModUnserved;
            return cfg.pendingLowUnserved;
        }
        if (highUnserved) return cfg.noBeadHighUnserved;
        return cfg.noBeadDefault;
    },

    /**
     * Normalize a 0-1 value to a 0-100 score.
     */
    pctToScore(pct) {
        return Math.min(100, Math.max(0, pct * 100));
    },

    /**
     * Compute the composite opportunity score for a single county.
     */
    computeScore(county) {
        const w = SN.config.weights;

        const coverageGapScore = this.pctToScore(county.coverageGap);
        const unservedScore    = this.pctToScore(county.unservedPct);
        const densityScore     = this.scoreDensity(county.populationDensity);
        const incomeScore      = this.scoreIncomeNeed(county.medianIncome);
        const readinessScore   = county.readiness5g;  // Already 0-100
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
            coverageGap: { weight: w.coverageGap, score: this.pctToScore(county.coverageGap) },
            unservedPct: { weight: w.unservedPct, score: this.pctToScore(county.unservedPct) },
            popDensity:  { weight: w.popDensity,  score: this.scoreDensity(county.populationDensity) },
            incomeNeed:  { weight: w.incomeNeed,  score: this.scoreIncomeNeed(county.medianIncome) },
            readiness5g: { weight: w.readiness5g, score: county.readiness5g },
            funding:     { weight: w.funding,     score: this.scoreFunding(county.beadStatus, county.unservedPct) }
        };
    }
};
