# State Program Data

Curated grant program details from state broadband office websites. Updated monthly.

## State Portals

| State | Portal URL | Last Checked |
|-------|-----------|-------------|
| TX | https://comptroller.texas.gov/programs/broadband/ | 2026-02-20 |
| CA | https://broadbandforall.cdt.ca.gov | 2026-02-20 |
| VA | https://www.dhcd.virginia.gov/vati | 2026-02-20 |
| LA | https://connect.la.gov/ | 2026-02-20 |
| GA | https://gta.georgia.gov/broadband | 2026-02-20 |
| MT | https://connectmt.mt.gov/ | 2026-02-20 |
| IA | https://ocio.iowa.gov/broadband | 2026-02-20 |
| SC | https://ors.sc.gov/broadband | 2026-02-20 |
| OH | https://broadband.ohio.gov/ | 2026-02-20 |
| NM | https://www.dfa.nm.gov/ | 2026-02-20 |

## File Format

Each state gets a JSON file: `{state_abbr}.json`

```json
{
  "state": "TX",
  "lastUpdated": "2026-02-20",
  "programs": [
    {
      "name": "Texas BOOT Program",
      "funding": 634800000,
      "status": "open",
      "deadline": "2026-06-30",
      "url": "https://...",
      "eligibility": "ISPs, cooperatives",
      "match": "20-50%",
      "notes": "..."
    }
  ]
}
```
