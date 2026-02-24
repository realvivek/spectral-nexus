#!/usr/bin/env node
/**
 * Spectral Nexus — Data Build Script
 * Pulls real FCC BDC + Census ACS data and generates src/js/data.js
 *
 * Data Sources:
 *   1. ArcGIS FCC BDC (County Layer)  → BSL breakdown by service status & technology
 *   2. Census ACS 5-Year (2022)       → Demographics (population, income, poverty)
 *   3. Census TIGERweb                → Land area & county interior points
 *
 * Usage:  node scripts/build-data.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/* ─── API Endpoints ─── */

const ARCGIS_BDC_URL =
    'https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/' +
    'FCC_Broadband_Data_Collection_June_2022/FeatureServer/1/query';

const CENSUS_ACS_URL = 'https://api.census.gov/data/2022/acs/acs5';

const TIGERWEB_URL =
    'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/' +
    'tigerWMS_Census2020/MapServer/82/query';

/* ─── BEAD Allocations (NTIA Official, June 2023) ─── */

const BEAD_ALLOCATIONS = {
    AL: 1401221902, AK: 1017139672, AZ: 993112231, AR: 1024303994,
    CA: 1864136509, CO: 826522650, CT: 144180793, DE: 107748385,
    FL: 1169947393, GA: 1307214371, HI: 149484494, ID: 583256250,
    IL: 1040420752, IN: 868109930, IA: 415331313, KS: 451725998,
    KY: 1086172537, LA: 1355554553, ME: 271977723, MD: 267738401,
    MA: 147422464, MI: 1559362479, MN: 651839368, MS: 1203561563,
    MO: 1736302708, MT: 628973799, NE: 405281070, NV: 416666230,
    NH: 196560279, NJ: 263689549, NM: 675372312, NY: 664618251,
    NC: 1532999481, ND: 130162815, OH: 793688108, OK: 797435691,
    OR: 688914932, PA: 1161778272, RI: 108718821, SC: 551535983,
    SD: 207227524, TN: 813319680, TX: 3312616455, UT: 317399742,
    VT: 228913019, VA: 1481489573, WA: 1227742066, WV: 1210800970,
    WI: 1055823574, WY: 347877921
};

const SQ_METERS_PER_SQ_MILE = 2589988.11;

/* ─── Helpers ─── */

function fetchJSON(url) {
    const result = execSync(`curl -s "${url}"`, {
        maxBuffer: 50 * 1024 * 1024,
        timeout: 120000
    });
    return JSON.parse(result.toString());
}

function log(msg) { console.log(`[build-data] ${msg}`); }

/* ─── Step 1: Fetch FCC BDC County Data ─── */

function fetchBDCCounties() {
    log('Fetching FCC BDC county data from ArcGIS...');

    const fields = [
        'GEOID', 'CountyName', 'StateName', 'StateAbbr', 'StateGEOID',
        'TotalPop', 'TotalBSLs', 'UnservedBSLs', 'UnderservedBSLs', 'ServedBSLs',
        'ServedBSLsFiber', 'ServedBSLsCable', 'ServedBSLsLTFW',
        'UnservedBSLsFiber', 'UnservedBSLsCable', 'UnservedBSLsLTFW',
        'UnderservedBSLsFiber', 'UnderservedBSLsCable', 'UnderservedBSLsLTFW',
        'UniqueProviders', 'UniqueProvidersFiber', 'UniqueProvidersCable',
        'UniqueProvidersLTFW'
    ].join(',');

    const allFeatures = [];
    let offset = 0;
    const pageSize = 2000;

    while (true) {
        const params = new URLSearchParams({
            where: '1=1',
            outFields: fields,
            returnGeometry: 'false',
            returnCentroid: 'true',
            outSR: '4326',
            resultOffset: String(offset),
            resultRecordCount: String(pageSize),
            f: 'json'
        });

        const url = `${ARCGIS_BDC_URL}?${params}`;
        const data = fetchJSON(url);

        if (!data.features || data.features.length === 0) break;
        allFeatures.push(...data.features);
        log(`  Page fetched: ${allFeatures.length} counties so far`);

        if (!data.exceededTransferLimit) break;
        offset += pageSize;
    }

    log(`  Total BDC counties: ${allFeatures.length}`);

    const map = new Map();
    for (const feat of allFeatures) {
        const a = feat.attributes;
        const cent = feat.centroid || {};
        map.set(a.GEOID, {
            fips: a.GEOID,
            state: a.StateAbbr,
            stateName: a.StateName,
            county: a.CountyName,
            totalPop: a.TotalPop || 0,
            totalBSLs: a.TotalBSLs || 0,
            servedBSLs: a.ServedBSLs || 0,
            underservedBSLs: a.UnderservedBSLs || 0,
            unservedBSLs: a.UnservedBSLs || 0,
            servedFiber: a.ServedBSLsFiber || 0,
            servedCable: a.ServedBSLsCable || 0,
            servedFW: a.ServedBSLsLTFW || 0,
            unservedFiber: a.UnservedBSLsFiber || 0,
            unservedCable: a.UnservedBSLsCable || 0,
            unservedFW: a.UnservedBSLsLTFW || 0,
            underservedFiber: a.UnderservedBSLsFiber || 0,
            underservedCable: a.UnderservedBSLsCable || 0,
            underservedFW: a.UnderservedBSLsLTFW || 0,
            providers: a.UniqueProviders || 0,
            providersFiber: a.UniqueProvidersFiber || 0,
            providersCable: a.UniqueProvidersCable || 0,
            providersFW: a.UniqueProvidersLTFW || 0,
            centLat: cent.y || null,
            centLng: cent.x || null
        });
    }
    return map;
}

/* ─── Step 2: Fetch Census ACS Demographics ─── */

function fetchCensusDemographics() {
    log('Fetching Census ACS 5-Year demographics...');

    const vars = 'NAME,B01003_001E,B19013_001E,B17001_002E,B17001_001E';
    const url = `${CENSUS_ACS_URL}?get=${vars}&for=county:*`;
    const data = fetchJSON(url);

    const headers = data[0];
    const rows = data.slice(1);
    log(`  Census counties: ${rows.length}`);

    const map = new Map();
    for (const row of rows) {
        const stFips = row[headers.indexOf('state')];
        const coFips = row[headers.indexOf('county')];
        const fips = stFips + coFips;

        const pop = parseInt(row[headers.indexOf('B01003_001E')]) || 0;
        const income = parseInt(row[headers.indexOf('B19013_001E')]);
        const povPop = parseInt(row[headers.indexOf('B17001_002E')]) || 0;
        const povTotal = parseInt(row[headers.indexOf('B17001_001E')]) || 0;

        map.set(fips, {
            population: pop,
            medianIncome: income > 0 ? income : null,
            povertyRate: povTotal > 0 ? +(povPop / povTotal).toFixed(4) : 0
        });
    }
    return map;
}

/* ─── Step 3: Fetch TIGERweb County Geography ─── */

function fetchCountyGeography() {
    log('Fetching TIGERweb county geography...');

    const params = new URLSearchParams({
        where: '1=1',
        outFields: 'GEOID,AREALAND,CENTLAT,CENTLON',
        returnGeometry: 'false',
        resultRecordCount: '5000',
        f: 'json'
    });

    const url = `${TIGERWEB_URL}?${params}`;
    const data = fetchJSON(url);

    log(`  TIGERweb counties: ${data.features.length}`);

    const map = new Map();
    for (const feat of data.features) {
        const a = feat.attributes;
        const areaLand = parseFloat(a.AREALAND) || 0;
        map.set(a.GEOID, {
            areaLandSqMi: areaLand / SQ_METERS_PER_SQ_MILE,
            lat: parseFloat(a.CENTLAT) || null,
            lng: parseFloat(a.CENTLON) || null
        });
    }
    return map;
}

/* ─── Step 4: Merge & Compute Derived Fields ─── */

function mergeData(bdcMap, censusMap, geoMap) {
    log('Merging data sources...');

    // Compute state-level unserved totals for funding allocation
    const stateUnserved = {};
    for (const [, bdc] of bdcMap) {
        if (!stateUnserved[bdc.state]) stateUnserved[bdc.state] = 0;
        stateUnserved[bdc.state] += bdc.unservedBSLs;
    }

    const counties = [];
    let matched = 0, skipped = 0;

    for (const [fips, bdc] of bdcMap) {
        const census = censusMap.get(fips);
        const geo = geoMap.get(fips);

        // Skip territories (PR, GU, AS, VI, MP) — only 50 states + DC
        const stateCode = parseInt(fips.substring(0, 2));
        if (stateCode > 56) { skipped++; continue; }

        // Use Census population if available, fall back to BDC
        const population = census ? census.population : bdc.totalPop;
        const medianIncome = census && census.medianIncome ? census.medianIncome : 50000;
        const povertyRate = census ? census.povertyRate : 0.15;

        // Geography
        const areaLandSqMi = geo ? geo.areaLandSqMi : 0;
        const lat = geo ? geo.lat : bdc.centLat;
        const lng = geo ? geo.lng : bdc.centLng;

        // Density
        const populationDensity = areaLandSqMi > 0
            ? +(population / areaLandSqMi).toFixed(1)
            : 0;

        // BSL percentages
        const totalBSLs = bdc.totalBSLs || 1;
        const coverageGap = +((bdc.underservedBSLs + bdc.unservedBSLs) / totalBSLs).toFixed(4);
        const unservedPct = +(bdc.unservedBSLs / totalBSLs).toFixed(4);
        const fiberAvailPct = +(bdc.servedFiber / totalBSLs).toFixed(3);

        // Providers as proxy for tower count
        const towerCount = bdc.providers;
        const towerDensity = areaLandSqMi > 0
            ? +(bdc.providers / areaLandSqMi).toFixed(4)
            : 0;

        // 5G readiness proxy: providers + fiber penetration + density factor
        const providerScore = Math.min(40, bdc.providers * 2);
        const fiberScore = fiberAvailPct * 40;
        const densityFactor = Math.min(20, populationDensity / 100 * 20);
        const readiness5g = Math.round(Math.min(100, providerScore + fiberScore + densityFactor));

        // Funding estimate: proportional share of state BEAD allocation
        const stateAlloc = BEAD_ALLOCATIONS[bdc.state] || 0;
        const stTotal = stateUnserved[bdc.state] || 1;
        const fundingEstimate = Math.round(stateAlloc * (bdc.unservedBSLs / stTotal));

        // E-Rate estimate (rough: $20/student-age pop, assume 18% of pop is school-age)
        const eRateFunding = Math.round(population * 0.18 * 20);

        // Rural-Urban code from density
        let ruralUrbanCode;
        if (populationDensity > 1000) ruralUrbanCode = 1;
        else if (populationDensity > 200) ruralUrbanCode = 3;
        else if (populationDensity > 50) ruralUrbanCode = 5;
        else if (populationDensity > 10) ruralUrbanCode = 7;
        else ruralUrbanCode = 9;

        counties.push({
            fips,
            state: bdc.state,
            stateName: bdc.stateName,
            county: bdc.county,
            population,
            populationDensity,
            medianIncome,
            povertyRate,
            totalBSLs: bdc.totalBSLs,
            servedBSLs: bdc.servedBSLs,
            underservedBSLs: bdc.underservedBSLs,
            unservedBSLs: bdc.unservedBSLs,
            coverageGap,
            unservedPct,
            fiberAvailPct,
            towerCount,
            towerDensity,
            eRateFunding,
            fundingEstimate,
            crimeIndex: 0,
            readiness5g,
            ruralUrbanCode,
            lat,
            lng
        });

        matched++;
    }

    log(`  Merged: ${matched} counties, skipped ${skipped} territories`);
    return counties;
}

/* ─── Step 5: Write data.js ─── */

function writeDataJS(counties) {
    const outPath = path.join(__dirname, '..', 'src', 'js', 'data.js');
    log(`Writing ${counties.length} counties to ${outPath}...`);

    const lines = [];
    lines.push(`/**`);
    lines.push(` * Spectral Nexus — County Dataset (Real Data)`);
    lines.push(` * ${counties.length} counties across all US states`);
    lines.push(` *`);
    lines.push(` * Generated by scripts/build-data.js on ${new Date().toISOString().split('T')[0]}`);
    lines.push(` *`);
    lines.push(` * Data Sources:`);
    lines.push(` *   FCC Broadband Data Collection (BDC) via ArcGIS Living Atlas`);
    lines.push(` *   Census ACS 5-Year Estimates (2022)`);
    lines.push(` *   Census TIGERweb (county geography)`);
    lines.push(` *   NTIA BEAD Allocations (June 2023)`);
    lines.push(` *`);
    lines.push(` * BSL data and provider counts are from FCC BDC.`);
    lines.push(` * Demographics (population, income, poverty) from Census ACS.`);
    lines.push(` * Opportunity scores are computed at runtime by scoring.js.`);
    lines.push(` */`);
    lines.push(``);
    lines.push(`window.SN = window.SN || {};`);
    lines.push(``);
    lines.push(`SN.data = SN.data || {};`);
    lines.push(``);
    lines.push(`SN.data.counties = [`);

    // Group by state for readability
    const byState = {};
    for (const c of counties) {
        if (!byState[c.state]) byState[c.state] = [];
        byState[c.state].push(c);
    }

    const stateAbbrs = Object.keys(byState).sort();
    for (const st of stateAbbrs) {
        const stCounties = byState[st].sort((a, b) => a.fips.localeCompare(b.fips));
        const stateName = stCounties[0].stateName;
        const alloc = BEAD_ALLOCATIONS[st] || 0;
        const allocStr = alloc >= 1e9
            ? `$${(alloc / 1e9).toFixed(1)}B`
            : `$${(alloc / 1e6).toFixed(0)}M`;

        lines.push(`    // ═══════════════════════════════════════════════`);
        lines.push(`    // ${stateName.toUpperCase()} (${stCounties.length} counties) — BEAD ${allocStr}`);
        lines.push(`    // ═══════════════════════════════════════════════`);

        for (const c of stCounties) {
            const obj = {
                fips: c.fips,
                state: c.state,
                stateName: c.stateName,
                county: c.county,
                population: c.population,
                populationDensity: c.populationDensity,
                medianIncome: c.medianIncome,
                povertyRate: c.povertyRate,
                totalBSLs: c.totalBSLs,
                servedBSLs: c.servedBSLs,
                underservedBSLs: c.underservedBSLs,
                unservedBSLs: c.unservedBSLs,
                coverageGap: c.coverageGap,
                unservedPct: c.unservedPct,
                fiberAvailPct: c.fiberAvailPct,
                towerCount: c.towerCount,
                towerDensity: c.towerDensity,
                beadStatus: 'Approved',
                beadStateAllocation: BEAD_ALLOCATIONS[c.state] || 0,
                eRateFunding: c.eRateFunding,
                fundingEstimate: c.fundingEstimate,
                crimeIndex: c.crimeIndex,
                readiness5g: c.readiness5g,
                ruralUrbanCode: c.ruralUrbanCode,
                lat: c.lat,
                lng: c.lng,
                opportunityScore: 0
            };

            // Compact single-line JSON per county
            lines.push(`    ${JSON.stringify(obj)},`);
        }
    }

    lines.push(`];`);
    lines.push(``);

    fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
    log(`Done. Wrote ${counties.length} counties.`);
}

/* ─── Main ─── */

function main() {
    log('Starting data build...');
    const t0 = Date.now();

    try {
        const bdcMap = fetchBDCCounties();
        const censusMap = fetchCensusDemographics();
        const geoMap = fetchCountyGeography();

        const counties = mergeData(bdcMap, censusMap, geoMap);

        // Summary stats
        const totalPop = counties.reduce((s, c) => s + c.population, 0);
        const totalUnserved = counties.reduce((s, c) => s + c.unservedBSLs, 0);
        const totalBSLs = counties.reduce((s, c) => s + c.totalBSLs, 0);
        const states = new Set(counties.map(c => c.state));

        log('');
        log('═══ Summary ═══');
        log(`  Counties: ${counties.length}`);
        log(`  States: ${states.size}`);
        log(`  Total Population: ${(totalPop / 1e6).toFixed(1)}M`);
        log(`  Total BSLs: ${(totalBSLs / 1e6).toFixed(1)}M`);
        log(`  Unserved BSLs: ${(totalUnserved / 1e6).toFixed(2)}M (${(totalUnserved / totalBSLs * 100).toFixed(1)}%)`);
        log(`  Time: ${((Date.now() - t0) / 1000).toFixed(1)}s`);

        writeDataJS(counties);

    } catch (err) {
        console.error('Build failed:', err);
        process.exit(1);
    }
}

main();
