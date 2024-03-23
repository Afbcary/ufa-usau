import requests

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
    'pheonix',
    'thunderbirds',
    'nitro',
    'shred',
    'growlers',
    'cascades',
    'rush',
]

def getTeamPage(team_name: str):
    roster_page = requests.get(f'{base_team_url}/{team_name}/{players_path}')
    if (roster_page.status_code == 404):
        raise Exception(f'Team page not found for {team_name}')
    # roster_page.content
    return roster_page

# for team_name in team_names:
#     getTeamPage(team_name)