import pandas as pd
import os
import numpy as np

dirname = os.path.dirname(__file__).replace("/scripts/combine_sources","")


club_df = pd.read_csv(f'{dirname}/data/club_data.csv')
ufa_df = pd.read_csv(f'{dirname}/data/ufa_rosters.csv', header=None, names=['first_name','last_name','ufa_team','player_slug'])
men_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_men.csv', header=None, names=['rank','club_team','rating', 'division'])
mixed_rankings_df = pd.read_csv(f'{dirname}/data/frisbee_rankings_mixed.csv', header=None, names=['rank','club_team','rating', 'division'])
nicknames_df = pd.read_csv(f'{dirname}/data/nicknames.csv', names=['id','fullgiven','nickname'])

rankings_df = pd.concat([men_rankings_df, mixed_rankings_df])

combined_df = ufa_df.merge(club_df[['club_team','player_slug','division']], on=['player_slug'], how='left')
combined_df = combined_df.merge(rankings_df, on=['club_team','division'], how='left')

# for people missing club teams, they may use multiple given names.
missing_club = combined_df[combined_df['club_team'].isnull()].drop(columns=['club_team', 'division', 'rank', 'rating'])
# join on other versions of their given name
missing_club1 = missing_club.merge(nicknames_df, left_on='first_name', right_on='fullgiven', how='left').drop(columns = ['id', 'fullgiven'])
missing_club1 = missing_club1.rename(columns={'nickname': 'alt_given'})
missing_club2 = missing_club.merge(nicknames_df, left_on='first_name', right_on='nickname', how='left').drop(columns = ['id', 'nickname']) # nickname_x
missing_club1 = missing_club2.rename(columns={'fullgiven': 'alt_given'})
missing_club = pd.concat([missing_club1, missing_club2])
# find club teams rostering these alternative names
missing_club = missing_club.merge(club_df[['club_team','first_name','last_name', 'division']],
                                  left_on=['alt_given', 'last_name'],
                                  right_on=['first_name', 'last_name'],
                                  how='left')
missing_club = missing_club.merge(rankings_df, on=['club_team','division'], how='left')
missing_club = missing_club[missing_club['club_team'].notna()].drop_duplicates(subset=['player_slug', 'club_team'])

# add players with alt names back to combined dataset and dedupe
combined_df = combined_df.merge(missing_club[['club_team', 'division', 'rank', 'rating', 'first_name_x', 'last_name', 'ufa_team']], left_on=['first_name', 'last_name', 'ufa_team'], right_on=['first_name_x', 'last_name', 'ufa_team'], how='left')
combined_df['rank'] = np.where(combined_df['rank_x'].isnull(), combined_df['rank_y'], combined_df['rank_x'])
combined_df['club_team'] = np.where(combined_df['club_team_x'].isnull(), combined_df['club_team_y'], combined_df['club_team_x'])
combined_df['rating'] = np.where(combined_df['rating_x'].isnull(), combined_df['rating_y'], combined_df['rating_x'])
combined_df['division'] = np.where(combined_df['division_x'].isnull(), combined_df['division_y'], combined_df['division_x'])

combined_df[['first_name','last_name','ufa_team','club_team','division','rank','rating']].to_csv(f'{dirname}/data/combined_data.csv', index=False)
print(f'combined row count: {combined_df.count()}')
