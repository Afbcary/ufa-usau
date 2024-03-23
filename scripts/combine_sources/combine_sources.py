import pandas as pd
import os

dirname = os.path.dirname(__file__).replace("/scripts/combine_sources","")


club_df = pd.read_csv(f'{dirname}/data/club_data.csv')
ufa_df = pd.read_csv(f'{dirname}/data/ufa_rosters.csv', header=None, names=['first_name','last_name','ufa_team'])
# rankings_df = pd.read_csv(f'{dirname}/data/ufa_rosters.csv')

combined_df = ufa_df.merge(club_df, on=['first_name','last_name'],how='left')
# combined_df = combined_df.merge(rankings_df)

print(combined_df.sort_values(by=['ufa_team','division','club_team','last_name']).head(50))
combined_df.to_csv(f'{dirname}/data/combined_data.csv', index=False)