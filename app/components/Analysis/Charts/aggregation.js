const power_rankings = {
    'empire': 1,
    'shred': 2,
    'breeze': 3,
    'sol': 4,
    'hustle': 5,
    'flyers': 6,
    'windchill': 7,
    'aviators': 8,
    'summit': 9,
    'glory': 10,
    'alleycats': 11,
    'spiders': 12,
    'phoenix': 13,
    'union': 14,
    'rush': 15,
    'cascades': 16,
    'radicals': 17,
    'thunderbirds': 18,
    'growlers': 19,
    'legion': 20,
    'havoc': 21,
    'nitro': 22,
    'royal': 23,
    'mechanix': 24,
}

function calcTeamStats(players) {
    // first_name,last_name,ufa_team,club_team,division,rank,rating
    const team_stats = {};
    for (let player of players) {
        if (!player['ufa_team']) {
            continue;
        }
        if (!Object.hasOwn(team_stats, player['ufa_team'])) {
            team_stats[player['ufa_team']] = {
                name: player['ufa_team'],
                num_open: 0,
                open_rating_sum: 0,
                open_rating_mean: 0,
                num_mixed: 0,
                mixed_rating_sum: 0,
                mixed_rating_mean: 0,
                num_non_club: 0,
                unique_clubs: new Set(),
                unique_open: new Set(),
                unique_mixed: new Set(),
                power_ranking: power_rankings[player['ufa_team']]
            };
        }
        let team = team_stats[player['ufa_team']];
        if (player['division'] == 'open' && player['rating']) {
            team.open_rating_sum += Number(player['rating']);
            team.num_open += 1;
            team.unique_open.add(player['club_team']);
        } else if (player['division'] == 'mixed' && player['rating']) {
            team.mixed_rating_sum += Number(player['rating']);
            team.num_mixed += 1;
            team.unique_mixed.add(player['club_team']);
        } else {
            team.num_non_club += 1;
        }
        if (player['club_team']) {
            team.unique_clubs.add(player['club_team']);
        }
    }
    for (let [_, stats] of Object.entries(team_stats)) {
        stats.open_rating_mean = stats.open_rating_sum / stats.num_open;
        stats.mixed_rating_mean = stats.mixed_rating_sum / stats.num_mixed;
    }
    return team_stats;
}

export { calcTeamStats };