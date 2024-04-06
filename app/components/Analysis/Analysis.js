import players from "../../../pages/combined.json"
import { calcTeamStats } from "./Charts/aggregation"
import { topClubStats } from "./Charts/club_oriented_aggregation"
import WrappedChart from "./Charts/WrappedChart";

function compareParticipation(s1, s2) {
    let o1 = s1[1];
    let o2 = s2[1];
    if (o1.num_open + o1.num_mixed > o2.num_open + o2.num_mixed) {
        return 1;
    }
    return -1;
}

function clubParticipationBar(team_stats) {
    let sorted = Object.entries(team_stats).sort(compareParticipation);
    let labels = sorted.map(s => s[0]);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Club Open',
            data: stats.map(s => (s.num_open)),
            borderWidth: 1
        }, {
            label: 'Club Mixed',
            data: stats.map(s => (s.num_mixed)),
            borderWidth: 1
        }, {
            label: 'Didn\'t play club',
            data: stats.map(s => (s.num_non_club)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        },
    };
}

function ufaParticipationBar(team_stats) {
    let sorted = Object.entries(team_stats).sort((s1,s2) => s1[1].rank > s2[1].rank ? 1 : -1);
    let labels = sorted.map(s => `${s[1].rank}. ${s[0]}`);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Played UFA',
            data: stats.map(s => (s.num_ufa)),
            borderWidth: 1
        }, {
            label: 'Didn\'t play UFA',
            data: stats.map(s => (s.num_non_ufa)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        },
    };
}

function uniqueClubsBar(team_stats) {
    let sorted = Object.entries(team_stats).sort((s1, s2) => s1[1].unique_clubs.size > s2[1].unique_clubs.size ? 1 : -1);
    let labels = sorted.map(s => s[0]);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Unique Clubs',
            data: stats.map(s => (s.unique_clubs.size)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        },
    };
}

function compareMixedRating(s1, s2) {
    let o1 = s1[1];
    let o2 = s2[1];
    if (!o1.mixed_rating_mean) {
        return -1;
    }
    if (!o2.mixed_rating_mean) {
        return 1;
    }
    if (o1.mixed_rating_mean > o2.mixed_rating_mean) {
        return 1;
    }
    return -1;
}

function ratingBarMixed(team_stats) {
    let sorted = Object.entries(team_stats).filter(s => s[1].num_mixed >= 4).sort(compareMixedRating);
    let labels = sorted.map(s => s[0]);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Mixed Rating Mean',
            data: stats.map(s => (s.mixed_rating_mean)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            }
        },
    };
}

function ratingBarMen(team_stats) {
    let sorted = Object.entries(team_stats).sort((s1, s2) => s1[1].open_rating_mean > s2[1].open_rating_mean ? 1 : -1);
    let labels = sorted.map(s => s[0]);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Open Rating Mean',
            data: stats.map(s => (s.open_rating_mean)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
}

function ratingUniqueScatter(team_stats) {
    var open_points = Object.entries(team_stats).map((o) => {
        return {
            x: o[1].unique_open.size,
            y: o[1].open_rating_mean,
            label: o[0]
        }
    })
    var mixed_points = Object.entries(team_stats).map((o) => {
        return {
            x: o[1].unique_mixed.size,
            y: o[1].mixed_rating_mean,
            label: o[0]
        }
    })
    let labels = mixed_points.map(s => s[0]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Open Ratings',
            data: open_points,
        },
        {
            label: 'Mixed Ratings',
            data: mixed_points,
        }],
    };
    return {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.data[context.dataIndex].label + '\nunique clubs:' + context.dataset.data[context.dataIndex].x + '\nmean rating:' + context.dataset.data[context.dataIndex].y;
                        }
                    }
                }
            }
        }
    };
}

function ratingVsPowerRankingBar(team_stats) {
    let sorted = Object.entries(team_stats).sort((s1, s2) => s1[1].power_ranking > s2[1].power_ranking ? 1 : -1);
    let labels = sorted.map(s => `${s[1].power_ranking}. ${s[0]}`);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Open Rating Mean',
            data: stats.map(s => (s.open_rating_mean)),
            borderWidth: 1
        }]
    };
    return {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
}

export default function Analysis() {
    var team_stats = calcTeamStats(players);
    var top_club_stats = topClubStats(players);

    return (
        <section id="analysis">
            <div className="container">
                <WrappedChart title='Club Participation by UFA Team' chartConfig={clubParticipationBar(team_stats)} />
                <p>{`Many people don't play club at the beginning or end of their career.
                   The Rush have a cohort that play for U24 Team Canada but didn't play club in 2023.
                   Old dogs may get injured if they try to play both divisions. The UFA format is friendlier to league
                   veterans because it doesn't demand so many games in a single weekend.`}
                </p>
                <p>{`There isn't a clear story relating club participation to UFA success.`}</p>
                <WrappedChart title='UFA Participation of Top Open Club Teams' chartConfig={ufaParticipationBar(top_club_stats)} />
                <p>{`Over time, the top teams in both open club and UFA increasingly share the same core star players.
                   Top UFA teams sometimes draw from multiple elite open teams. For example, the Breeze have Truck Stop and Vault players;
                   RDU and Ring of Fire play for the Flyers.`}</p>
                <p>{`The northwest still resists the UFA.
                   Driving up the west coast, the UFA lacks the majority of the talented players on San Fransisco Revolver, Portland Rhino Slam!, Seattle Sockeye, and Vancouver Furious George.
                   Any team that could harness this latent power source could surge to UFA Glory.`}</p>
                <WrappedChart title='Unique Club Teams by UFA Team' chartConfig={uniqueClubsBar(team_stats)} />
                <WrappedChart title='Open - Average USAU Team Rating by UFA Team' chartConfig={ratingBarMen(team_stats)} />
                <WrappedChart title='Mixed - Average USAU Team Rating by UFA Team' chartConfig={ratingBarMixed(team_stats)} />
                <p>Only UFA teams with four or more players on mixed teams are included.</p>
                <WrappedChart title='UFA Team Average Rating vs Unique USAU Clubs' chartConfig={ratingUniqueScatter(team_stats)} />
                <WrappedChart title='UFA Power Ranking vs Club Ratings Bar' chartConfig={ratingVsPowerRankingBar(team_stats)} />
                <p>These power rankings come from 
                    <a href='https://watchufa.com/league/power-rankings/2024-ufa-way-too-early-preseason'> UFA Power ranking: Way too early 2024 by Adam Ruffner</a>
                </p>

                <p>{`The Shred overperform their club rating. Given the Shred's finals appearance last year,
                   Adam has high expectations for this team in 2024. Coach of the year Bryce Merrill leads
                   a bought in team. Many of their players don't play club, nor do they play on Sundays because
                   of their Mormon values. In fact, the team has zero games scheduled on Sundays this season.`}
                </p>
                <p>{`Several teams show their potential to rise to the next level: Breeze, Flyers, Summit, Glory, and Spiders.`}</p>

                <p>{`At the bottom, the Nitro and Royal underperform in the UFA. Both teams suffered from spotty attendance from their stars.
                   In Portland, community leaders like Dylan Freechild still have their doubts about the UFA enterprise.`}
                </p>

                {/* TODO: Consider pre-aggregating data*/}
                {/* TODO: Could color the bars the same as team colors */}
            </div>
        </section>
    )
}