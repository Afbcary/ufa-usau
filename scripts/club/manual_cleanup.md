
### extract_club_data.py
Steps taken manually to clean data where there are multiple people with the same first and last name

1. remove James Pollard, BW 
2. remove Max Williams, Power Point Ultimate
3. remove Jonathan Mast, Legion
4. remove Jordan Smith, Capitol City Chaos

### missing roster data
Some roster data is missing on ulti-verse. When a team doesn't have a roster specified for regionals or sectionals we were missing data. We added `2023-usa-ultimate-club-championships-open` to capture some missing teams and manually looked up Havoc players on Clutch and Harvey Cats.

### combine_sources.py
Handling name mismatches
- christopher lung usau mischeif, chris lung spiders
- matthew rowanmcdonnel usau truck stop, rowen mcdonnell breeze
- jonathan/jacob schlaefer usau bux, biz schlaefer radicals
- matt/matthew grinde noise radicals

open rankings - teams with same name
- two scoops
  - colin sunde plays for rank 32
- two hazards
  - cy toriello on rank 74 LA hazard
  - Ryan Kindell on rank 139 PA hazard
