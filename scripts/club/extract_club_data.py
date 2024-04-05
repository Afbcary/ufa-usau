import pandas as pd
import os
import sqlite3

dirname = os.path.dirname(__file__).replace("scripts/club","")
con = sqlite3.connect(f'{dirname}/data/ultiverse/ultiverse.db')

teams_query = """
    WITH team_tournament_rosters AS (
      SELECT
        people.id,
        people.first_name,
        people.last_name,
        people.slug,
        teams.name,
        teams.slug AS team_slug,
        CASE 
          WHEN teams.gender = 0 
          THEN 'open'
          ELSE 'mixed'
        END AS division,
        rosters.id AS roster_id,
        tournaments.date
      FROM teams
      LEFT JOIN rosters
        ON teams.id = rosters.team_id
      LEFT JOIN tournaments
        ON tournaments.id = rosters.tournament_id
      LEFT JOIN person_rosters 
        ON person_rosters.roster_id = rosters.id AND role = 'player'
      LEFT JOIN people
              ON person_rosters.person_id = people.id
      WHERE 
        (teams.gender = 0 OR teams.gender = 1)
        AND teams.division = 1
        AND date >= '2023-03-01'
    ) SELECT
          id,
          first_name,
          last_name,
          slug as player_slug,
          CASE WHEN LOWER(name) = 'lax' THEN 'lax-senior'
            WHEN LOWER(name) = 'dark star' THEN 'dark star-d'
            ELSE LOWER(name)
            END AS club_team,
          team_slug,
          division,
          date,
          roster_id,
          date
        FROM (
            SELECT 
              *,
              ROW_NUMBER() OVER (PARTITION BY slug ORDER BY date DESC) AS row_num 
            FROM team_tournament_rosters
        ) AS date_ordered_data
        WHERE row_num = 1
"""

teams_df = pd.read_sql_query(teams_query, con)


# MANUAL CLEAN UP
duplicates_to_remove = [
    ['James', 'Pollard', 'bw ultimate'],
    ['Max', 'Williams', 'power point ultimate'],
    ['Jonathan', 'Mast', 'legion'],
    ['Jordan', 'Smith', 'capitol city chaos'],
]
for record in duplicates_to_remove:
    teams_df.drop(teams_df[
        (teams_df['first_name'] == record[0]) & 
        (teams_df['last_name'] == record[1]) & 
        (teams_df['club_team'] == record[2])].index, inplace=True)

teams_df.to_csv(f'{dirname}/data/club_data.csv', index=False)