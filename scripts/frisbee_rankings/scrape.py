import requests
# https://beautiful-soup-4.readthedocs.io/en/latest/
from bs4 import BeautifulSoup
import csv
import pprint

# https://www.frisbee-rankings.com/usau/club/mixed
# https://www.frisbee-rankings.com/usau/club/men

def writeDataForDivision(division):
    soup = BeautifulSoup(requests.get(f'https://www.frisbee-rankings.com/usau/club/{division}').content, 'html.parser')
    rows = soup.find_all('tr')

    with open(f'data/frisbee_rankings_{division}.csv', mode='r+', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        prev_rank = 0
        prev_rating = 0
        # for combining purposes later
        if division == 'men':
            division = 'open'
        for row in rows:
            tds = row.find_all('td')
            if len(tds) > 5:
                rank = tds[0].get_text()
                # team without sufficient games are provisional
                # give provisional teams the same rank as the team above them in the ratings
                if rank == '-':
                    rank = prev_rank
                name = tds[2].a.get_text()
                rating = tds[4].get_text()
                # last team doesn't have rating, give them the prev rating
                if not rating:
                    rating = prev_rating
                prev_rank = rank
                prev_rating = rating
                writer.writerow([rank, str.lower(name), rating, division])
            else: 
                print(pprint.pprint(tds))

writeDataForDivision('men')
writeDataForDivision('mixed')
