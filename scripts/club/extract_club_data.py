import pandas as pd
import os
import sqlite3

dirname = os.path.dirname(__file__).replace("scripts/club","")
con = sqlite3.connect(f'{dirname}/data/ultiverse/ultiverse.db')

teams_query = """
    WITH team_rosters AS (
        SELECT DISTINCT
            t.name,
            t.location,
            r.team_slug,
            CASE WHEN t.gender = 0 THEN 'open'
                ELSE 'mixed'
                END AS gender,
            r.id as roster_id
        FROM teams t
        JOIN rosters r
            ON t.id = r.team_id
        JOIN tournaments tn
            ON tn.id = r.tournament_id
        WHERE 
            1 = 1
            AND t.division = 1
            AND t.gender < 2
            AND (tn.slug LIKE '%2023%sectional%' OR tn.slug LIKE '%2023%regional%')
    ) 
    SELECT DISTINCT
        LOWER(t.name) as club_team,
        t.gender as division,
        p.first_name,
        p.last_name
    FROM team_rosters t
    JOIN person_rosters pr
        ON t.roster_id = pr.roster_id
        AND role = 'player'
    JOIN people p
        ON pr.person_id = p.id;
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