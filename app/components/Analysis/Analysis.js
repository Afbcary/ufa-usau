import { useEffect } from "react";
import { Chart } from 'chart.js/auto';
import players from "../../../pages/combined.json"
import { calcTeamStats } from "./Charts/aggregation"
import WrappedChart from "./Charts/WrappedChart";

function compareParticipation(s1, s2) {
    let o1 = s1[1];
    let o2 = s2[1];
    if (o1.num_open > o2.num_open) {
        return 1;
    } else if (o1.num_open == o2.num_open && o1.num_mixed > o2.num_mixed) {
        return 1;
    }
    return -1;
}

function participationBar(team_stats) {
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

function ratingBar(team_stats) {
    let sorted = Object.entries(team_stats).sort((s1, s2) => s1[1].open_rating_mean > s2[1].open_rating_mean ? 1 : -1);
    let labels = sorted.map(s => s[0]);
    let stats = sorted.map(s => s[1]);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Open Rating Mean',
            data: stats.map(s => (s.open_rating_mean)),
            borderWidth: 1
        }, {
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
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        },
    };
}

function ratingUniqueScatter(team_stats) {
    // todo: add team labels on hover or always
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
    console.log(open_points)
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

export default function Analysis() {
    var team_stats = calcTeamStats(players);

    return (
        <section id="analysis">
            <div className="container">
                <WrappedChart title='Club Participation by UFA Team' chartConfig={participationBar(team_stats)}/>
                <WrappedChart title='Unique Club Teams by UFA Team' chartConfig={uniqueClubsBar(team_stats)}/>
                <WrappedChart title='Average USAU Team Rating by UFA Team' chartConfig={ratingBar(team_stats)}/>
                <WrappedChart title='UFA Team Average Rating vs Unique USAU Clubs' chartConfig={ratingUniqueScatter(team_stats)}/> 
                {/* TODO: Consider pre-aggregating data*/}
            </div>
        </section>
    )
}