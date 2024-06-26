import requests
# https://beautiful-soup-4.readthedocs.io/en/latest/
from bs4 import BeautifulSoup
import csv

base_team_url = 'https://watchufa.com'
players_path = 'players'

# https://watchufa.com/league/news/2024-ufa-team-rosters-announced-season
team_names = [
    'hustle',
    'sol',
    'glory',
    'flyers',
    'union',
    'summit',
    'legion',
    'breeze',
    'mechanix',
    'havoc',
    'alleycats',
    'aviators',
    'radicals',
    'windchill',
    'royal',
    'empire',
    'spiders',
    'phoenix',
    'thunderbirds',
    'nitro',
    'shred',
    'growlers',
    'cascades',
    'rush',
]

def getTeamPage(team_name: str) -> object:
    roster_page = requests.get(f'{base_team_url}/{team_name}/{players_path}')
    if (roster_page.status_code == 404):
        raise Exception(f'Team page not found for {team_name}')
    return roster_page

def getRoster(team_name: str) -> list[str]:
    page = getTeamPage(team_name)
    soup = BeautifulSoup(page.content, 'html.parser')
    player_containers = soup.find_all('div', {'class': 'views-field-field-player-display-name'})
    players = []
    for player_container in player_containers:
        players.append(player_container.contents[1].get_text())
    return players

# Brandon Van Deusen has two entries
# keep map of entries to avoid dupes
added = set()

with open('data/ufa_rosters.csv', mode='r+', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for team_name in team_names:
        roster = getRoster(team_name)
        for person in roster:
            try:
                person = person.strip().replace('  ',' ')
                first_name, last_name = person.split(' ', maxsplit = 1)
                slug = person.lower().replace(' ','-')
            except ValueError:
                raise Exception(f'Failed to parse {person}')
            if f'{team_name}{slug}' not in added:
                writer.writerow([first_name, last_name, team_name, slug])
                added.add(f'{team_name}{slug}')
            else:
                print(f'didn\'t add {first_name} {last_name} again')
