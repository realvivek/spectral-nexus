# ETL Scripts

Data processing scripts for transforming raw downloads into app-ready data.

## Planned Scripts (v0.3.0)

| Script | Purpose | Input | Output |
|--------|---------|-------|--------|
| `process-bdc.js` | Parse FCC BDC bulk download | `data/federal/bdc_*.csv` | Updated `src/js/data.js` BSL fields |
| `process-rdof.js` | Map RDOF results to counties | `data/rdof/*.csv` | `src/js/data-rdof-counties.js` |
| `process-funding-map.js` | Aggregate federal awards | `data/federal/funding_map_*.csv` | Per-county award totals |
| `snapshot-scores.js` | Weekly score snapshot | Current `data.js` | `data/snapshots/YYYY-MM-DD.json` |
| `validate-data.js` | Check data integrity | All data files | Console report |

## Running Scripts

```bash
# Requires Node.js 18+
node scripts/process-bdc.js
node scripts/process-rdof.js
```
