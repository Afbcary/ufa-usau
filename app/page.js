'use client'

import { useEffect } from 'react'
import { Chart } from 'chart.js/auto';
import players from "../pages/combined.json"

function calcTeamStats(players) {
  // {"first_name":"Trip","last_name":"Crowley","ufa_team":"hustle","club_team":"space cowboys","division":"open","rank":"85.0","rating":"1312.3"},
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
        unique_mixed: new Set()
      };
    }
    let team = team_stats[player['ufa_team']];
    if (player['division'] == 'open') {
      team.open_rating_sum += Number(player['rating']);
      team.num_open += 1;
      team.unique_open.add(player['club_team']);
    } else if (player['division'] == 'mixed') {
      team.mixed_rating_sum += Number(player['rating']);
      team.num_mixed += 1;
      team.unique_mixed.add(player['club_team']);
    } else {
      team.num_non_club += 1;
    }
    if (player['club_team']){
      team.unique_clubs.add(player['club_team']);
    }
  }
  for (let [_, stats] of Object.entries(team_stats)) {
    stats.open_rating_mean = stats.open_rating_sum/ stats.num_open;
    stats.mixed_rating_mean = stats.mixed_rating_sum / stats.num_mixed;
  }
  return team_stats;
}

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

function participationBar(team_stats){
  let sorted = Object.entries(team_stats).sort(compareParticipation);
  let labels = sorted.map(s => s[0]);
  let stats = sorted.map(s => s[1]);
  const data = {
    labels: labels,
    datasets: [{
      label: 'Club Open',
      data: stats.map(s => (s.num_open)),
      borderWidth: 1
    },{
      label: 'Club Mixed',
      data: stats.map(s => (s.num_mixed)),
      borderWidth: 1
    },{
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

function uniqueClubsBar(team_stats){
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

function ratingBar(team_stats){
  let sorted = Object.entries(team_stats).sort((s1, s2) => s1[1].open_rating_mean > s2[1].open_rating_mean ? 1 : -1);
  let labels = sorted.map(s => s[0]);
  let stats = sorted.map(s => s[1]);
  const data = {
    labels: labels,
    datasets: [{
      label: 'Open Rating Mean',
      data: stats.map(s => (s.open_rating_mean)),
      borderWidth: 1
    },{
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
    return {x: o[1].unique_open.size,
     y: o[1].open_rating_mean,
     label: o[0]
    }
  })
  var mixed_points = Object.entries(team_stats).map((o) => {
    return {x: o[1].unique_mixed.size,
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
            label: function(context) {
              return context.dataset.data[context.dataIndex].label + '\nunique clubs:' +  context.dataset.data[context.dataIndex].x  + '\nmean rating:' +  context.dataset.data[context.dataIndex].y;
            }
          }
        }
      }
    }
  };
}

export default function Home() {
  useEffect(() => {
    
    var team_stats = calcTeamStats(players);

    var ctx = document.getElementById('participationChart').getContext('2d');
    var participationChart = new Chart(ctx, participationBar(team_stats));

    var ctx = document.getElementById('uniqueClubsChart').getContext('2d');
    var uniqueClubsChart = new Chart(ctx, uniqueClubsBar(team_stats));

    var ctx = document.getElementById('ratingChart').getContext('2d');
    var ratingChart = new Chart(ctx, ratingBar(team_stats));

    var ctx = document.getElementById('ratingUniqueChart').getContext('2d');
    var ratingUniqueChart = new Chart(ctx, ratingUniqueScatter(team_stats));

    
    return () => {
      participationChart.destroy();
      uniqueClubsChart.destroy();
      ratingChart.destroy();
      ratingUniqueChart.destroy();
    }

  }, [])

  return (
    <main>
      <canvas id='participationChart'></canvas>
      <canvas id='uniqueClubsChart'></canvas>
      <canvas id='ratingChart'></canvas>
      <canvas id='ratingUniqueChart'></canvas>
    </main>
  );
}
