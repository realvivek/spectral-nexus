# RDOF Data

Place FCC Auction 904 results and default summaries here.

## Expected Files

- `auction_904_winning_bidders.csv` — Original winning bidders (12/07/2020)
- `auction_904_pre_auth_defaults.csv` — Pre-authorization defaults (12/20/2023)
- `auction_904_post_auth_defaults.csv` — Post-authorization defaults (01/14/2025)
- `cbg_to_county_crosswalk.csv` — Census Block Group → County FIPS mapping

## Download Source

https://www.fcc.gov/auction/904/round-results

Click "Results" tab → download all CSV files.

## Processing

Run `scripts/process-rdof.js` (TODO) to:
1. Parse winning bidders → per-county award totals
2. Parse defaults → per-county default amounts + locations
3. Cross-reference with BDC to identify BEAD-eligible default zones
4. Output `data-rdof-counties.js` for app consumption
