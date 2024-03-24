import pandas as pd
import os

dirname = os.path.dirname(__file__).replace("/scripts/combine_sources","")


club_df = pd.read_csv(f'{dirname}/data/club_data.csv')
ufa_df = pd.read_csv(f'{dirname}/data/ufa_rosters.csv', header=None, names=['first_name','last_name','ufa_team'])
men_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_men.csv', header=None, names=['rank','club_team','rating', 'division'])
mixed_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_mixed.csv', header=None, names=['rank','club_team','rating', 'division'])

combined_df = ufa_df.merge(club_df, on=['first_name','last_name'], how='left')
combined_df = combined_df.merge(men_rankings_df, on=['club_team'], how='left')
combined_df = combined_df.merge(mixed_rankings_df, on=['club_team'], how='left')

combined_df.to_csv(f'{dirname}/data/combined_data.csv', index=False)