import pandas as pd
import os

dirname = os.path.dirname(__file__).replace("/scripts/combine_sources","")


club_df = pd.read_csv(f'{dirname}/data/club_data.csv')
ufa_df = pd.read_csv(f'{dirname}/data/ufa_rosters.csv', header=None, names=['first_name','last_name','ufa_team','player_slug'])
men_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_men.csv', header=None, names=['rank','club_team','rating', 'division'])
mixed_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_mixed.csv', header=None, names=['rank','club_team','rating', 'division'])

rankings_df = pd.concat([men_rankings_df, mixed_rankings_df])

combined_df = ufa_df.merge(club_df[['club_team','player_slug','division']], on=['player_slug'], how='left')
combined_df = combined_df.merge(rankings_df, on=['club_team','division'], how='left')

combined_df[['first_name','last_name','ufa_team','club_team','division','rank','rating']].to_csv(f'{dirname}/data/combined_data.csv', index=False)
print(combined_df.count())