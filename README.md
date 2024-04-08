# ufa-usau
### Analyzing Ultimate's UFA vs USAU data
Live site: https://afbcary.github.io/ufa-usau/

## Running Data Gathering Scripts
To query the ulti-verse.com data you'll need to ask for a dump of their SQLLite database from Anders using https://ulti-verse.com/support.

The data gathering scripts are written in Python. You'll need Python and pip installed.

1. `$ pip install`
1. `$ python scripts/club/extract_club_data.py`
1. `$ python scripts/frisbee_rankings/scrape.py`
1. `$ python scripts/ufa_rosters/scrape.py`
1. `$ python scripts/combine_sources/combine_sources.py`
1. `$ npm run convert_to_json`
1. Data is output to the /data dir


## Site - Local Development
To run the site locally you must have npm installed. 

1. `$ npm install`
1. Comment out or delete the whole next.config.mjs file
1. `$ npm run dev`
1. navigate to http://localhost:3000
