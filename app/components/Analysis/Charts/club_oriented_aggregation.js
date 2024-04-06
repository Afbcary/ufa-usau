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

function topClubStats(players) {
    // first_name,last_name,ufa_team,club_team,division,rank,rating
    const team_stats = {};
    for (let player of players) {
        if (player['division'] == 'open' && player['rank'] && player['rank'] <= 25){
            if (!Object.hasOwn(team_stats, player['club_team'])) {
                team_stats[player['club_team']] = {
                    name: player['club_team'],
                    rating: player['rating'],
                    rank: Number(player['rank']),
                    num_ufa: 0,
                    num_non_ufa: 0,
                    ufa_power_rank_sum: 0,
                    ufa_power_rank_mean: 0,
                    unique_ufa: new Set()
                };
            }
            
            let team = team_stats[player['club_team']];
            if (player['ufa_team']) {
                team.num_ufa += 1;
                team.ufa_power_rank_sum += power_rankings[player['ufa_team']];
                team.unique_ufa.add(player['club_team']);
            } else {
                team.num_non_ufa += 1;
            }
        }
    }
    for (let [_, stats] of Object.entries(team_stats)) {
        stats.ufa_power_rank_mean = stats.ufa_power_rank_sum / stats.num_ufa;
    }
    return team_stats;
}

export { topClubStats };