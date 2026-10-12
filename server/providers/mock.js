/**
 * Comprehensive Mock Data Provider for Sports-IQ
 * Covers all 16 sports with live, upcoming, and completed matches.
 * Strictly adheres to the normalized match schema.
 */

// Helper to generate dynamic ISO timestamps relative to now
const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d, h = 0) => new Date(Date.now() - (d * 24 + h) * 60 * 60 * 1000).toISOString();
const hoursAhead = (h) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();
const daysAhead = (d, h = 0) => new Date(Date.now() + (d * 24 + h) * 60 * 60 * 1000).toISOString();

/**
 * Generate sport fixtures dynamically so timestamps remain fresh.
 */
function getMockDatabase() {
  return {
    cricket: [
      // Live matches
      {
        id: 'cric-live-1',
        sport: 'cricket',
        league: 'ICC World Cup 2026 Super 8',
        teams: [
          { name: 'India', logo: 'https://flagsapi.com/IN/flat/64.png' },
          { name: 'Australia', logo: 'https://flagsapi.com/AU/flat/64.png' }
        ],
        state: 'live',
        scores: [
          { label: 'IND', text: '298/4 (44.2 ov)' },
          { label: 'AUS', text: 'Yet to bat' }
        ],
        status: '1st Innings - Over 44.2',
        startTime: hoursAgo(2.5),
        venue: 'Eden Gardens, Kolkata',
        resultText: null,
        timeline: [
          { time: '43.6', text: 'SIX! Rohit Sharma pulls over deep mid-wicket for a massive 96m six.' },
          { time: '41.2', text: 'WICKET! Virat Kohli c Maxwell b Starc 78 (82)' },
          { time: '34.5', text: 'Fifty partnership up between Kohli and Iyer.' },
          { time: '18.1', text: 'WICKET! Gill b Hazlewood 52 (48)' }
        ]
      },
      {
        id: 'cric-live-2',
        sport: 'cricket',
        league: 'IPL 2026',
        teams: [
          { name: 'Chennai Super Kings', logo: null },
          { name: 'Mumbai Indians', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'MI', text: '184/7 (20.0 ov)' },
          { label: 'CSK', text: '142/3 (15.4 ov)' }
        ],
        status: '2nd Innings - CSK need 43 runs in 26 balls',
        startTime: hoursAgo(1.8),
        venue: 'Wankhede Stadium, Mumbai',
        resultText: null,
        timeline: [
          { time: '15.2', text: 'FOUR! Ruturaj Gaikwad drives stylishly through covers.' },
          { time: '12.4', text: 'WICKET! Dube c Rohit b Bumrah 34 (19)' },
          { time: '20.0', text: 'MI finish on 184/7 after Hardik Pandya blitz.' }
        ]
      },
      {
        id: 'cric-live-3',
        sport: 'cricket',
        league: 'Border-Gavaskar Trophy (Test)',
        teams: [
          { name: 'England', logo: 'https://flagsapi.com/GB/flat/64.png' },
          { name: 'South Africa', logo: 'https://flagsapi.com/ZA/flat/64.png' }
        ],
        state: 'live',
        scores: [
          { label: 'ENG', text: '325 & 186/4' },
          { label: 'SA', text: '290' }
        ],
        status: 'Day 3 - Tea Session (ENG lead by 221 runs)',
        startTime: daysAgo(2, 4),
        venue: "Lord's Cricket Ground, London",
        resultText: null,
        timeline: [
          { time: 'Day 3 45.1', text: 'Root brings up his 35th Test half-century.' },
          { time: 'Day 3 32.4', text: 'WICKET! Crawley lbw Rabada 41' }
        ]
      },
      // Upcoming matches
      {
        id: 'cric-up-1',
        sport: 'cricket',
        league: 'ICC T20 World Cup Warmup',
        teams: [
          { name: 'Pakistan', logo: 'https://flagsapi.com/PK/flat/64.png' },
          { name: 'New Zealand', logo: 'https://flagsapi.com/NZ/flat/64.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(18),
        venue: 'Gaddafi Stadium, Lahore',
        resultText: null,
        timeline: null
      },
      {
        id: 'cric-up-2',
        sport: 'cricket',
        league: 'IPL 2026',
        teams: [
          { name: 'Royal Challengers Bengaluru', logo: null },
          { name: 'Kolkata Knight Riders', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 4),
        venue: 'M. Chinnaswamy Stadium, Bengaluru',
        resultText: null,
        timeline: null
      },
      {
        id: 'cric-up-3',
        sport: 'cricket',
        league: 'Bilateral T20I Series',
        teams: [
          { name: 'West Indies', logo: null },
          { name: 'South Africa', logo: 'https://flagsapi.com/ZA/flat/64.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2, 6),
        venue: 'Kensington Oval, Barbados',
        resultText: null,
        timeline: null
      },
      {
        id: 'cric-up-4',
        sport: 'cricket',
        league: 'Asia Cup 2026 Group Stage',
        teams: [
          { name: 'Sri Lanka', logo: 'https://flagsapi.com/LK/flat/64.png' },
          { name: 'Bangladesh', logo: 'https://flagsapi.com/BD/flat/64.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'R. Premadasa Stadium, Colombo',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'cric-comp-1',
        sport: 'cricket',
        league: 'ICC World Cup 2026 Super 8',
        teams: [
          { name: 'India', logo: 'https://flagsapi.com/IN/flat/64.png' },
          { name: 'England', logo: 'https://flagsapi.com/GB/flat/64.png' }
        ],
        state: 'completed',
        scores: [
          { label: 'ENG', text: '229/9 (50.0 ov)' },
          { label: 'IND', text: '230/4 (41.3 ov)' }
        ],
        status: 'FT',
        startTime: daysAgo(2),
        venue: 'Narendra Modi Stadium, Ahmedabad',
        resultText: 'India won by 6 wickets (with 51 balls remaining)',
        timeline: [
          { time: '41.3', text: 'KL Rahul seals the win with a wristy flick to mid-wicket.' },
          { time: '38.0', text: 'India cross 200 mark with 6 wickets in hand.' }
        ]
      },
      {
        id: 'cric-comp-2',
        sport: 'cricket',
        league: 'The Ashes 5th Test',
        teams: [
          { name: 'Australia', logo: 'https://flagsapi.com/AU/flat/64.png' },
          { name: 'England', logo: 'https://flagsapi.com/GB/flat/64.png' }
        ],
        state: 'completed',
        scores: [
          { label: 'AUS', text: '317 & 280' },
          { label: 'ENG', text: '283 & 365' }
        ],
        status: 'Match Ended',
        startTime: daysAgo(5),
        venue: 'The Oval, London',
        resultText: 'England won by 49 runs',
        timeline: [
          { time: 'Day 5', text: 'Stuart Broad claims final wicket in his farewell Test match.' }
        ]
      },
      {
        id: 'cric-comp-3',
        sport: 'cricket',
        league: 'IPL 2026',
        teams: [
          { name: 'Gujarat Titans', logo: null },
          { name: 'Rajasthan Royals', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'RR', text: '177/7 (20.0 ov)' },
          { label: 'GT', text: '179/5 (19.2 ov)' }
        ],
        status: 'FT',
        startTime: daysAgo(3),
        venue: 'Sawai Mansingh Stadium, Jaipur',
        resultText: 'Gujarat Titans won by 5 wickets',
        timeline: [
          { time: '19.2', text: 'Tewatia finishes the match with a boundary through point.' }
        ]
      }
    ],

    football: [
      // Live matches
      {
        id: 'fb-live-1',
        sport: 'football',
        league: 'Premier League',
        teams: [
          { name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
          { name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' }
        ],
        state: 'live',
        scores: [
          { label: 'ARS', text: '2' },
          { label: 'MCI', text: '1' }
        ],
        status: "68' 2nd Half",
        startTime: hoursAgo(1.2),
        venue: 'Emirates Stadium, London',
        resultText: null,
        timeline: [
          { time: "23'", text: 'GOAL! Saka scores with a bending strike from the edge of the box.' },
          { time: "44'", text: 'GOAL! Haaland equalizes from close range header.' },
          { time: "61'", text: 'GOAL! Martinelli restores Arsenal lead following a swift counter.' }
        ]
      },
      {
        id: 'fb-live-2',
        sport: 'football',
        league: 'La Liga',
        teams: [
          { name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
          { name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' }
        ],
        state: 'live',
        scores: [
          { label: 'RMA', text: '1' },
          { label: 'BAR', text: '1' }
        ],
        status: 'HT (Halftime)',
        startTime: hoursAgo(0.8),
        venue: 'Santiago Bernabéu, Madrid',
        resultText: null,
        timeline: [
          { time: "14'", text: 'GOAL! Vinicius Jr. converts after a slalom dribble.' },
          { time: "39'", text: 'GOAL! Lamine Yamal curls an equalizer into the top corner.' }
        ]
      },
      {
        id: 'fb-live-3',
        sport: 'football',
        league: 'UEFA Champions League',
        teams: [
          { name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
          { name: 'Paris Saint-Germain', logo: 'https://media.api-sports.io/football/teams/85.png' }
        ],
        state: 'live',
        scores: [
          { label: 'BAY', text: '3' },
          { label: 'PSG', text: '2' }
        ],
        status: "83' 2nd Half",
        startTime: hoursAgo(1.5),
        venue: 'Allianz Arena, Munich',
        resultText: null,
        timeline: [
          { time: "12'", text: 'GOAL! Kane scores penalty.' },
          { time: "33'", text: 'GOAL! Dembélé fires low.' },
          { time: "55'", text: 'GOAL! Musiala solo run.' },
          { time: "70'", text: 'GOAL! Barcola pulls one back.' },
          { time: "79'", text: 'GOAL! Kane brace.' }
        ]
      },
      // Upcoming matches
      {
        id: 'fb-up-1',
        sport: 'football',
        league: 'Premier League',
        teams: [
          { name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
          { name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(20),
        venue: 'Anfield, Liverpool',
        resultText: null,
        timeline: null
      },
      {
        id: 'fb-up-2',
        sport: 'football',
        league: 'Serie A',
        teams: [
          { name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/505.png' },
          { name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/496.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 2),
        venue: 'San Siro, Milan',
        resultText: null,
        timeline: null
      },
      {
        id: 'fb-up-3',
        sport: 'football',
        league: 'UEFA Champions League',
        teams: [
          { name: 'Borussia Dortmund', logo: null },
          { name: 'Atletico Madrid', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3),
        venue: 'Signal Iduna Park, Dortmund',
        resultText: null,
        timeline: null
      },
      {
        id: 'fb-up-4',
        sport: 'football',
        league: 'Indian Super League (ISL)',
        teams: [
          { name: 'Mohun Bagan SG', logo: null },
          { name: 'Mumbai City FC', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2, 5),
        venue: 'Salt Lake Stadium, Kolkata',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'fb-comp-1',
        sport: 'football',
        league: 'Premier League',
        teams: [
          { name: 'Tottenham Hotspur', logo: 'https://media.api-sports.io/football/teams/47.png' },
          { name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' }
        ],
        state: 'completed',
        scores: [
          { label: 'TOT', text: '2' },
          { label: 'MUN', text: '1' }
        ],
        status: 'FT',
        startTime: daysAgo(1, 4),
        venue: 'Tottenham Hotspur Stadium, London',
        resultText: 'Tottenham Hotspur won 2 - 1',
        timeline: [
          { time: "90+4'", text: 'Full-time whistle blows.' },
          { time: "82'", text: 'GOAL! Son Heung-min nets the winner.' }
        ]
      },
      {
        id: 'fb-comp-2',
        sport: 'football',
        league: 'La Liga',
        teams: [
          { name: 'Atletico Madrid', logo: null },
          { name: 'Sevilla', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'ATM', text: '3' },
          { label: 'SEV', text: '0' }
        ],
        status: 'FT',
        startTime: daysAgo(2),
        venue: 'Metropolitano Stadium, Madrid',
        resultText: 'Atletico Madrid won 3 - 0',
        timeline: [
          { time: "65'", text: 'Griezmann double completes convincing home win.' }
        ]
      },
      {
        id: 'fb-comp-3',
        sport: 'football',
        league: 'UEFA Champions League',
        teams: [
          { name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
          { name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' }
        ],
        state: 'completed',
        scores: [
          { label: 'RMA', text: '3' },
          { label: 'MCI', text: '3' }
        ],
        status: 'FT',
        startTime: daysAgo(4),
        venue: 'Santiago Bernabéu, Madrid',
        resultText: 'Match drawn 3 - 3',
        timeline: [
          { time: "79'", text: 'Valverde thunderbolt equalizes in thriller.' }
        ]
      }
    ],

    f1: [
      // Live matches (Sessions / Sprint / Race)
      {
        id: 'f1-live-1',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Max Verstappen (Red Bull Racing)', logo: null },
          { name: 'Lando Norris (McLaren)', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'P1 VER', text: 'Lap 48/71 (-)' },
          { label: 'P2 NOR', text: '+1.842s' },
          { label: 'P3 LEC', text: '+6.115s' }
        ],
        status: 'Lap 48/71 - Pit window active',
        startTime: hoursAgo(1.1),
        venue: 'Autódromo José Carlos Pace (Interlagos), São Paulo',
        resultText: null,
        timeline: [
          { time: 'Lap 45', text: 'Norris sets fastest lap: 1:12.441' },
          { time: 'Lap 36', text: 'Verstappen boxes for hard compound tires.' },
          { time: 'Lap 18', text: 'Safety car deployed after Albon spin.' }
        ]
      },
      {
        id: 'f1-live-2',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Qualifying Q3 Session', logo: null },
          { name: 'Top 10 Shootout', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'P1 PIA', text: '1:19.412' },
          { label: 'P2 RUS', text: '1:19.498 (+0.086)' }
        ],
        status: 'Q3 - 2 mins remaining',
        startTime: hoursAgo(0.6),
        venue: 'Silverstone Circuit, UK',
        resultText: null,
        timeline: [
          { time: 'Q3', text: 'Oscar Piastri goes purple in sectors 2 and 3.' }
        ]
      },
      // Upcoming matches
      {
        id: 'f1-up-1',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Monaco Grand Prix', logo: null },
          { name: 'Race Day (78 Laps)', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2, 6),
        venue: 'Circuit de Monaco, Monte Carlo',
        resultText: null,
        timeline: null
      },
      {
        id: 'f1-up-2',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Spanish Grand Prix', logo: null },
          { name: 'Circuit de Barcelona-Catalunya', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(7),
        venue: 'Circuit de Barcelona-Catalunya, Montmeló',
        resultText: null,
        timeline: null
      },
      {
        id: 'f1-up-3',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Canadian Grand Prix Qualifying', logo: null },
          { name: 'Circuit Gilles Villeneuve', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(5),
        venue: 'Circuit Gilles Villeneuve, Montreal',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'f1-comp-1',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Lando Norris (McLaren)', logo: null },
          { name: 'Max Verstappen (Red Bull)', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'P1 NOR', text: '1h 28m 42s' },
          { label: 'P2 VER', text: '+4.219s' },
          { label: 'P3 HAM', text: '+12.780s' }
        ],
        status: 'Chequered Flag',
        startTime: daysAgo(3),
        venue: 'Marina Bay Street Circuit, Singapore',
        resultText: 'Lando Norris wins the Singapore Grand Prix',
        timeline: [
          { time: 'Lap 62', text: 'Chequered flag: Norris claims lights-to-flag victory.' }
        ]
      },
      {
        id: 'f1-comp-2',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'Charles Leclerc (Ferrari)', logo: null },
          { name: 'Carlos Sainz (Ferrari)', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'P1 LEC', text: '1h 22m 14s' },
          { label: 'P2 PIA', text: '+2.103s' },
          { label: 'P3 SAI', text: '+5.492s' }
        ],
        status: 'Chequered Flag',
        startTime: daysAgo(6),
        venue: 'Autodromo Nazionale Monza, Italy',
        resultText: 'Charles Leclerc wins the Italian Grand Prix for Ferrari',
        timeline: [
          { time: 'Lap 53', text: 'Ferrari one-stop masterclass pays off as Leclerc wins at Monza.' }
        ]
      },
      {
        id: 'f1-comp-3',
        sport: 'f1',
        league: 'Formula 1 World Championship',
        teams: [
          { name: 'George Russell (Mercedes)', logo: null },
          { name: 'Lewis Hamilton (Mercedes)', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'P1 RUS', text: '1h 34m 09s' },
          { label: 'P2 HAM', text: '+0.528s' }
        ],
        status: 'Chequered Flag',
        startTime: daysAgo(7),
        venue: 'Las Vegas Strip Circuit, USA',
        resultText: 'George Russell takes victory in Las Vegas',
        timeline: [
          { time: 'Lap 50', text: 'Mercedes 1-2 finish under the Vegas lights.' }
        ]
      }
    ],

    chess: [
      // Live matches
      {
        id: 'chess-live-1',
        sport: 'chess',
        league: 'FIDE Candidates Tournament 2026',
        teams: [
          { name: 'Magnus Carlsen (2832)', logo: null },
          { name: 'Hikaru Nakamura (2802)', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Carlsen (W)', text: '34 moves (+0.4 eval)' },
          { label: 'Nakamura (B)', text: '12m 45s clock' }
        ],
        status: 'Move 34 - Sicilian Defense: Najdorf',
        startTime: hoursAgo(1.4),
        venue: 'The Roundhouse, Toronto',
        resultText: null,
        timeline: [
          { time: 'Move 30', text: 'Carlsen plays 30.Nd5 sacrifice seeking kingside attack.' },
          { time: 'Move 21', text: 'Nakamura counters on c-file with 21...Rc8' }
        ]
      },
      {
        id: 'chess-live-2',
        sport: 'chess',
        league: 'Global Chess League Round 7',
        teams: [
          { name: 'Gukesh D (2794)', logo: null },
          { name: 'Ding Liren (2762)', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Gukesh (W)', text: '28 moves (Equal 0.0)' },
          { label: 'Ding (B)', text: '8m 20s clock' }
        ],
        status: 'Move 28 - Ruy Lopez: Berlin Defense',
        startTime: hoursAgo(0.9),
        venue: 'Friends Arena, Stockholm',
        resultText: null,
        timeline: [
          { time: 'Move 25', text: 'Rook endgame reached after queens traded.' }
        ]
      },
      // Upcoming matches
      {
        id: 'chess-up-1',
        sport: 'chess',
        league: 'FIDE World Championship Match',
        teams: [
          { name: 'Gukesh D (India)', logo: null },
          { name: 'Alireza Firouzja (France)', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 8),
        venue: 'Resorts World Sentosa, Singapore',
        resultText: null,
        timeline: null
      },
      {
        id: 'chess-up-2',
        sport: 'chess',
        league: 'Tata Steel Chess Masters 2026',
        teams: [
          { name: 'Praggnanandhaa R (2767)', logo: null },
          { name: 'Fabiano Caruana (2805)', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2, 4),
        venue: 'Wijk aan Zee, Netherlands',
        resultText: null,
        timeline: null
      },
      {
        id: 'chess-up-3',
        sport: 'chess',
        league: 'Champions Chess Tour Final',
        teams: [
          { name: 'Levon Aronian (2745)', logo: null },
          { name: 'Wesley So (2757)', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'Online / Lichess Broadcast',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'chess-comp-1',
        sport: 'chess',
        league: 'FIDE World Cup',
        teams: [
          { name: 'Magnus Carlsen', logo: null },
          { name: 'Praggnanandhaa R', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Carlsen', text: '2.5' },
          { label: 'Praggnanandhaa', text: '1.5' }
        ],
        status: 'Completed',
        startTime: daysAgo(2),
        venue: 'Baku Marriott Hotel Boulevard, Azerbaijan',
        resultText: 'Magnus Carlsen won tiebreak 2.5 - 1.5',
        timeline: [
          { time: 'Game 4', text: 'Carlsen secures draw in rook endgame to clinch the title.' }
        ]
      },
      {
        id: 'chess-comp-2',
        sport: 'chess',
        league: 'Candidates Tournament Game 14',
        teams: [
          { name: 'Hikaru Nakamura', logo: null },
          { name: 'Gukesh D', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Nakamura (W)', text: '½' },
          { label: 'Gukesh (B)', text: '½' }
        ],
        status: 'Draw by Agreement',
        startTime: daysAgo(4),
        venue: 'The Great Hall, Toronto',
        resultText: 'Drawn in 71 moves - Gukesh wins Candidates tournament',
        timeline: [
          { time: 'Move 71', text: 'Threefold repetition verified by arbiter.' }
        ]
      },
      {
        id: 'chess-comp-3',
        sport: 'chess',
        league: 'Speed Chess Championship',
        teams: [
          { name: 'Hans Niemann', logo: null },
          { name: 'Alireza Firouzja', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Niemann', text: '12.0' },
          { label: 'Firouzja', text: '14.0' }
        ],
        status: 'Final',
        startTime: daysAgo(5),
        venue: 'Paris Esports Arena, France',
        resultText: 'Alireza Firouzja won 14.0 - 12.0',
        timeline: [
          { time: 'Bullet segment', text: 'Firouzja streaks 4 straight wins to take match.' }
        ]
      }
    ],

    hockey: [
      // Live matches
      {
        id: 'hk-live-1',
        sport: 'hockey',
        league: 'FIH Pro League',
        teams: [
          { name: 'India', logo: null },
          { name: 'Australia', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'IND', text: '3' },
          { label: 'AUS', text: '2' }
        ],
        status: 'Q3 - 38th minute',
        startTime: hoursAgo(1.1),
        venue: 'Birsa Munda Hockey Stadium, Rourkela',
        resultText: null,
        timeline: [
          { time: "34'", text: 'PC GOAL! Harmanpreet Singh drag-flicks into the top roof.' },
          { time: "22'", text: 'FIELD GOAL! Blake Govers finishes reverse stick.' }
        ]
      },
      {
        id: 'hk-live-2',
        sport: 'hockey',
        league: 'NHL (Ice Hockey)',
        teams: [
          { name: 'Edmonton Oilers', logo: null },
          { name: 'Florida Panthers', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'EDM', text: '4' },
          { label: 'FLA', text: '3' }
        ],
        status: '3rd Period - 4:12 left',
        startTime: hoursAgo(1.7),
        venue: 'Rogers Place, Edmonton',
        resultText: null,
        timeline: [
          { time: 'P3 14:20', text: 'Power Play Goal by McDavid wrist shot.' }
        ]
      },
      // Upcoming matches
      {
        id: 'hk-up-1',
        sport: 'hockey',
        league: 'FIH Pro League',
        teams: [
          { name: 'Netherlands', logo: null },
          { name: 'Germany', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(16),
        venue: 'Wagener Stadium, Amstelveen',
        resultText: null,
        timeline: null
      },
      {
        id: 'hk-up-2',
        sport: 'hockey',
        league: 'NHL (Ice Hockey)',
        teams: [
          { name: 'New York Rangers', logo: null },
          { name: 'Boston Bruins', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 3),
        venue: 'Madison Square Garden, New York',
        resultText: null,
        timeline: null
      },
      {
        id: 'hk-up-3',
        sport: 'hockey',
        league: 'FIH Hockey World Cup Qualifier',
        teams: [
          { name: 'Belgium', logo: null },
          { name: 'Argentina', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3),
        venue: 'Sportcentrum Wilrijkse Plein, Antwerp',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'hk-comp-1',
        sport: 'hockey',
        league: 'FIH Pro League',
        teams: [
          { name: 'India', logo: null },
          { name: 'Germany', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'IND', text: '4' },
          { label: 'GER', text: '2' }
        ],
        status: 'FT',
        startTime: daysAgo(2),
        venue: 'Kalinga Stadium, Bhubaneswar',
        resultText: 'India won 4 - 2',
        timeline: [
          { time: "58'", text: 'Abhishek taps in empty-netter on break.' }
        ]
      },
      {
        id: 'hk-comp-2',
        sport: 'hockey',
        league: 'NHL',
        teams: [
          { name: 'Toronto Maple Leafs', logo: null },
          { name: 'Montreal Canadiens', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'TOR', text: '5' },
          { label: 'MTL', text: '2' }
        ],
        status: 'FT',
        startTime: daysAgo(3),
        venue: 'Scotiabank Arena, Toronto',
        resultText: 'Toronto Maple Leafs won 5 - 2',
        timeline: [
          { time: 'P3 18:30', text: 'Matthews completes hat trick.' }
        ]
      },
      {
        id: 'hk-comp-3',
        sport: 'hockey',
        league: 'Asian Champions Trophy',
        teams: [
          { name: 'Pakistan', logo: null },
          { name: 'Korea', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'PAK', text: '5' },
          { label: 'KOR', text: '2' }
        ],
        status: 'FT',
        startTime: daysAgo(5),
        venue: 'Hulunbuir Stadium, China',
        resultText: 'Pakistan won 5 - 2',
        timeline: [
          { time: "52'", text: 'Pakistan penalty stroke converted.' }
        ]
      }
    ],

    basketball: [
      // Live matches
      {
        id: 'bb-live-1',
        sport: 'basketball',
        league: 'NBA Regular Season',
        teams: [
          { name: 'Los Angeles Lakers', logo: 'https://media.api-sports.io/basketball/teams/145.png' },
          { name: 'Golden State Warriors', logo: 'https://media.api-sports.io/basketball/teams/141.png' }
        ],
        state: 'live',
        scores: [
          { label: 'LAL', text: '98 (Q1:26, Q2:24, Q3:32, Q4:16)' },
          { label: 'GSW', text: '102 (Q1:28, Q2:29, Q3:24, Q4:21)' }
        ],
        status: 'Q4 3:18 remaining',
        startTime: hoursAgo(1.8),
        venue: 'Crypto.com Arena, Los Angeles',
        resultText: null,
        timeline: [
          { time: 'Q4 3:45', text: 'Stephen Curry hits a 31-foot stepback three.' },
          { time: 'Q4 4:10', text: 'LeBron James drives and dunks with authority.' }
        ]
      },
      {
        id: 'bb-live-2',
        sport: 'basketball',
        league: 'EuroLeague',
        teams: [
          { name: 'Real Madrid Baloncesto', logo: null },
          { name: 'Panathinaikos', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'RMB', text: '74 (Q1:20, Q2:19, Q3:21, Q4:14)' },
          { label: 'PAO', text: '71 (Q1:18, Q2:22, Q3:18, Q4:13)' }
        ],
        status: 'Q4 1:45 remaining',
        startTime: hoursAgo(1.3),
        venue: 'WiZink Center, Madrid',
        resultText: null,
        timeline: [
          { time: 'Q4 2:05', text: 'Campazzo floater off the glass gives Madrid lead.' }
        ]
      },
      // Upcoming matches
      {
        id: 'bb-up-1',
        sport: 'basketball',
        league: 'NBA Regular Season',
        teams: [
          { name: 'Boston Celtics', logo: 'https://media.api-sports.io/basketball/teams/133.png' },
          { name: 'Milwaukee Bucks', logo: 'https://media.api-sports.io/basketball/teams/147.png' }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(14),
        venue: 'TD Garden, Boston',
        resultText: null,
        timeline: null
      },
      {
        id: 'bb-up-2',
        sport: 'basketball',
        league: 'NBA Regular Season',
        teams: [
          { name: 'Dallas Mavericks', logo: null },
          { name: 'Denver Nuggets', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 5),
        venue: 'American Airlines Center, Dallas',
        resultText: null,
        timeline: null
      },
      {
        id: 'bb-up-3',
        sport: 'basketball',
        league: 'FIBA World Qualifiers',
        teams: [
          { name: 'USA', logo: null },
          { name: 'Canada', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3),
        venue: 'Barclays Center, New York',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'bb-comp-1',
        sport: 'basketball',
        league: 'NBA Finals Rematch',
        teams: [
          { name: 'Boston Celtics', logo: null },
          { name: 'Dallas Mavericks', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'BOS', text: '112 (Q1:32, Q2:28, Q3:27, Q4:25)' },
          { label: 'DAL', text: '104 (Q1:24, Q2:30, Q3:26, Q4:24)' }
        ],
        status: 'FT',
        startTime: daysAgo(1, 6),
        venue: 'TD Garden, Boston',
        resultText: 'Boston Celtics won 112 - 104',
        timeline: [
          { time: 'Q4 0:00', text: 'Tatum seals victory with late free throws (34 pts total).' }
        ]
      },
      {
        id: 'bb-comp-2',
        sport: 'basketball',
        league: 'NBA Regular Season',
        teams: [
          { name: 'Miami Heat', logo: null },
          { name: 'New York Knicks', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'MIA', text: '99 (Q1:22, Q2:26, Q3:28, Q4:23)' },
          { label: 'NYK', text: '108 (Q1:30, Q2:24, Q3:25, Q4:29)' }
        ],
        status: 'FT',
        startTime: daysAgo(3),
        venue: 'Kaseya Center, Miami',
        resultText: 'New York Knicks won 108 - 99',
        timeline: [
          { time: 'Q4 1:12', text: 'Brunson dagger 3-pointer clinches game.' }
        ]
      },
      {
        id: 'bb-comp-3',
        sport: 'basketball',
        league: 'EuroLeague',
        teams: [
          { name: 'Fenerbahce Beko', logo: null },
          { name: 'Monaco', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'FEN', text: '86 (Q1:22, Q2:21, Q3:20, Q4:23)' },
          { label: 'MON', text: '79 (Q1:19, Q2:18, Q3:24, Q4:18)' }
        ],
        status: 'FT',
        startTime: daysAgo(4),
        venue: 'Ulker Sports Arena, Istanbul',
        resultText: 'Fenerbahce Beko won 86 - 79',
        timeline: [
          { time: 'Q4 0:24', text: 'Calathes defensive steal to ice the contest.' }
        ]
      }
    ],

    tennis: [
      // Live matches
      {
        id: 'ten-live-1',
        sport: 'tennis',
        league: 'Wimbledon Men’s Singles',
        teams: [
          { name: 'Carlos Alcaraz', logo: null },
          { name: 'Novak Djokovic', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Alcaraz', text: '6 4 6 4* (30-15)' },
          { label: 'Djokovic', text: '4 6 3 5 (30-15)' }
        ],
        status: 'Set 4 - Game 10 (Alcaraz serving)',
        startTime: hoursAgo(2.8),
        venue: 'Centre Court, Wimbledon, London',
        resultText: null,
        timeline: [
          { time: 'Set 4 G9', text: 'Djokovic holds to stay alive in championship.' },
          { time: 'Set 3 G8', text: 'Alcaraz breaks with backhand down the line winner.' }
        ]
      },
      {
        id: 'ten-live-2',
        sport: 'tennis',
        league: 'US Open Women’s Singles',
        teams: [
          { name: 'Iga Swiatek', logo: null },
          { name: 'Aryna Sabalenka', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Swiatek', text: '7 3 2' },
          { label: 'Sabalenka', text: '5 6 4*' }
        ],
        status: 'Set 3 - Game 7 (Sabalenka serving)',
        startTime: hoursAgo(1.9),
        venue: 'Arthur Ashe Stadium, Flushing Meadows, NY',
        resultText: null,
        timeline: [
          { time: 'Set 3 G5', text: 'Sabalenka secures critical break with forehand inside-out.' }
        ]
      },
      // Upcoming matches
      {
        id: 'ten-up-1',
        sport: 'tennis',
        league: 'Roland Garros Men’s Quarterfinal',
        teams: [
          { name: 'Jannik Sinner', logo: null },
          { name: 'Alexander Zverev', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(22),
        venue: 'Court Philippe-Chatrier, Paris',
        resultText: null,
        timeline: null
      },
      {
        id: 'ten-up-2',
        sport: 'tennis',
        league: 'ATP Finals Turin',
        teams: [
          { name: 'Daniil Medvedev', logo: null },
          { name: 'Taylor Fritz', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'Pala Alpitour, Turin',
        resultText: null,
        timeline: null
      },
      {
        id: 'ten-up-3',
        sport: 'tennis',
        league: 'WTA 1000 Indian Wells',
        teams: [
          { name: 'Coco Gauff', logo: null },
          { name: 'Elena Rybakina', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3, 4),
        venue: 'Indian Wells Tennis Garden, California',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'ten-comp-1',
        sport: 'tennis',
        league: 'Australian Open Men’s Final',
        teams: [
          { name: 'Jannik Sinner', logo: null },
          { name: 'Daniil Medvedev', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Sinner', text: '3 3 6 6 6' },
          { label: 'Medvedev', text: '6 6 4 4 3' }
        ],
        status: 'Completed',
        startTime: daysAgo(2),
        venue: 'Rod Laver Arena, Melbourne',
        resultText: 'Jannik Sinner won 3-6, 3-6, 6-4, 6-4, 6-3',
        timeline: [
          { time: 'Match Point', text: 'Sinner strikes an open-court forehand winner to win maiden Slam.' }
        ]
      },
      {
        id: 'ten-comp-2',
        sport: 'tennis',
        league: 'Madrid Open Semifinal',
        teams: [
          { name: 'Rafael Nadal', logo: null },
          { name: 'Carlos Alcaraz', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Nadal', text: '4 6 3' },
          { label: 'Alcaraz', text: '6 4 6' }
        ],
        status: 'Completed',
        startTime: daysAgo(5),
        venue: 'Caja Mágica, Madrid',
        resultText: 'Carlos Alcaraz won 6-4, 4-6, 6-3',
        timeline: [
          { time: 'Set 3', text: 'Alcaraz breaks in 8th game to secure final spot.' }
        ]
      },
      {
        id: 'ten-comp-3',
        sport: 'tennis',
        league: 'Wimbledon Women’s Final',
        teams: [
          { name: 'Barbora Krejčíková', logo: null },
          { name: 'Jasmine Paolini', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Krejčíková', text: '6 2 6' },
          { label: 'Paolini', text: '2 6 4' }
        ],
        status: 'Completed',
        startTime: daysAgo(6),
        venue: 'Centre Court, Wimbledon',
        resultText: 'Barbora Krejčíková won 6-2, 2-6, 6-4',
        timeline: [
          { time: 'Championship Point', text: 'Krejčíková serves out to love.' }
        ]
      }
    ],

    badminton: [
      // Live matches
      {
        id: 'bad-live-1',
        sport: 'badminton',
        league: 'BWF All England Open Finals',
        teams: [
          { name: 'Viktor Axelsen', logo: null },
          { name: 'Lakshya Sen', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Axelsen', text: '21 18 19*' },
          { label: 'Sen', text: '16 21 17' }
        ],
        status: 'Game 3 - 19-17 Axelsen',
        startTime: hoursAgo(1.1),
        venue: 'Utilita Arena Birmingham, UK',
        resultText: null,
        timeline: [
          { time: 'G3 18-17', text: 'Incredible 48-shot rally won by Axelsen with steep smash.' }
        ]
      },
      {
        id: 'bad-live-2',
        sport: 'badminton',
        league: 'India Open Super 750',
        teams: [
          { name: 'Satwiksairaj / Chirag', logo: null },
          { name: 'Alfian / Ardianto', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Rankireddy / Shetty', text: '21 14*' },
          { label: 'Alfian / Ardianto', text: '18 11' }
        ],
        status: 'Game 2 - 14-11 IND',
        startTime: hoursAgo(0.7),
        venue: 'K.D. Jadhav Indoor Hall, New Delhi',
        resultText: null,
        timeline: [
          { time: 'G2 11-8', text: 'Mid-game interval reached with Rankireddy jumping smash.' }
        ]
      },
      // Upcoming matches
      {
        id: 'bad-up-1',
        sport: 'badminton',
        league: 'BWF World Championships',
        teams: [
          { name: 'An Se-young', logo: null },
          { name: 'Chen Yufei', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(26),
        venue: 'Royal Arena, Copenhagen',
        resultText: null,
        timeline: null
      },
      {
        id: 'bad-up-2',
        sport: 'badminton',
        league: 'Indonesia Open Super 1000',
        teams: [
          { name: 'Shi Yuqi', logo: null },
          { name: 'Jonatan Christie', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'Istora Senayan, Jakarta',
        resultText: null,
        timeline: null
      },
      {
        id: 'bad-up-3',
        sport: 'badminton',
        league: 'Malaysia Open Men’s Singles',
        teams: [
          { name: 'Lee Zii Jia', logo: null },
          { name: 'Kunlavut Vitidsarn', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'Axiata Arena, Kuala Lumpur',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'bad-comp-1',
        sport: 'badminton',
        league: 'Thomas Cup Final',
        teams: [
          { name: 'India', logo: null },
          { name: 'Indonesia', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'IND', text: '3 matches' },
          { label: 'INA', text: '0 matches' }
        ],
        status: 'Completed',
        startTime: daysAgo(3),
        venue: 'Impact Arena, Bangkok',
        resultText: 'India won 3 - 0 to lift Thomas Cup',
        timeline: [
          { time: 'Match 3', text: 'Kidambi Srikanth wins straight games 21-15, 23-21.' }
        ]
      },
      {
        id: 'bad-comp-2',
        sport: 'badminton',
        league: 'BWF World Tour Finals',
        teams: [
          { name: 'Viktor Axelsen', logo: null },
          { name: 'Shi Yuqi', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Axelsen', text: '21 21' },
          { label: 'Shi Yuqi', text: '11 12' }
        ],
        status: 'Completed',
        startTime: daysAgo(4),
        venue: 'Hangzhou Olympic Sports Expo Center',
        resultText: 'Viktor Axelsen won 21-11, 21-12',
        timeline: [
          { time: 'Championship Point', text: 'Axelsen captures season finale.' }
        ]
      },
      {
        id: 'bad-comp-3',
        sport: 'badminton',
        league: 'Swiss Open Super 300',
        teams: [
          { name: 'P.V. Sindhu', logo: null },
          { name: 'Busanan Ongbamrungphan', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Sindhu', text: '21 21' },
          { label: 'Busanan', text: '16 8' }
        ],
        status: 'Completed',
        startTime: daysAgo(6),
        venue: 'St. Jakobshalle, Basel',
        resultText: 'P.V. Sindhu won 21-16, 21-8',
        timeline: [
          { time: 'Game 2', text: 'Dominant net play secures the title.' }
        ]
      }
    ],

    volleyball: [
      // Live matches
      {
        id: 'vol-live-1',
        sport: 'volleyball',
        league: 'FIVB Nations League',
        teams: [
          { name: 'Poland', logo: null },
          { name: 'Italy', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'POL', text: '2 (25, 23, 25, 18*)' },
          { label: 'ITA', text: '1 (22, 25, 21, 20)' }
        ],
        status: 'Set 4 - 18-20 ITA',
        startTime: hoursAgo(1.5),
        venue: 'Atlas Arena, Łódź',
        resultText: null,
        timeline: [
          { time: 'Set 4 17-18', text: 'Monster block by Giannelli.' }
        ]
      },
      {
        id: 'vol-live-2',
        sport: 'volleyball',
        league: 'Olympic Games Qualifier',
        teams: [
          { name: 'Brazil', logo: null },
          { name: 'Japan', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'BRA', text: '1 (21, 25, 12*)' },
          { label: 'JPN', text: '1 (25, 20, 15)' }
        ],
        status: 'Set 3 - 12-15 JPN',
        startTime: hoursAgo(1.0),
        venue: 'Maracanãzinho, Rio de Janeiro',
        resultText: null,
        timeline: [
          { time: 'Set 3 10-12', text: 'Ishikawa pipe attack converts.' }
        ]
      },
      // Upcoming matches
      {
        id: 'vol-up-1',
        sport: 'volleyball',
        league: 'CEV Champions League',
        teams: [
          { name: 'Trentino Volley', logo: null },
          { name: 'Jastrzębski Węgiel', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(19),
        venue: 'ilT quotidiano Arena, Trento',
        resultText: null,
        timeline: null
      },
      {
        id: 'vol-up-2',
        sport: 'volleyball',
        league: 'FIVB World Championship',
        teams: [
          { name: 'USA', logo: null },
          { name: 'France', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'Mall of Asia Arena, Manila',
        resultText: null,
        timeline: null
      },
      {
        id: 'vol-up-3',
        sport: 'volleyball',
        league: 'Prime Volleyball League (PVL)',
        teams: [
          { name: 'Calicut Heroes', logo: null },
          { name: 'Ahmedabad Defenders', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3, 4),
        venue: 'Jawaharlal Nehru Indoor Stadium, Chennai',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'vol-comp-1',
        sport: 'volleyball',
        league: 'FIVB Nations League Final',
        teams: [
          { name: 'France', logo: null },
          { name: 'Japan', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'FRA', text: '3 (25, 25, 23, 23, 15)' },
          { label: 'JPN', text: '2 (21, 23, 25, 25, 10)' }
        ],
        status: 'FT',
        startTime: daysAgo(2),
        venue: 'Atlas Arena, Lodz',
        resultText: 'France won 3 - 2 (Tie-break 15-10)',
        timeline: [
          { time: 'Set 5 15-10', text: 'Ngapeth service ace seals gold medal.' }
        ]
      },
      {
        id: 'vol-comp-2',
        sport: 'volleyball',
        league: 'Prime Volleyball League',
        teams: [
          { name: 'Bengaluru Torpedoes', logo: null },
          { name: 'Kolkata Thunderbolts', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'BEN', text: '3 (15, 15, 15)' },
          { label: 'KOL', text: '1 (13, 11, 16)' }
        ],
        status: 'FT',
        startTime: daysAgo(4),
        venue: 'Gachibowli Indoor Stadium, Hyderabad',
        resultText: 'Bengaluru Torpedoes won 3 - 1',
        timeline: [
          { time: 'Set 4', text: 'Super Point won by Bengaluru.' }
        ]
      },
      {
        id: 'vol-comp-3',
        sport: 'volleyball',
        league: 'FIVB Women’s Nations League',
        teams: [
          { name: 'Italy', logo: null },
          { name: 'Japan', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'ITA', text: '3 (25, 25, 25)' },
          { label: 'JPN', text: '1 (17, 17, 21)' }
        ],
        status: 'FT',
        startTime: daysAgo(5),
        venue: 'Indoor Stadium Huamark, Bangkok',
        resultText: 'Italy won 3 - 1',
        timeline: [
          { time: 'Set 4', text: 'Egonu delivers match-winning spike.' }
        ]
      }
    ],

    kabaddi: [
      // Live matches
      {
        id: 'kab-live-1',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Puneri Paltan', logo: null },
          { name: 'Jaipur Pink Panthers', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'PUN', text: '34' },
          { label: 'JAI', text: '29' }
        ],
        status: '2nd Half - 32nd Minute',
        startTime: hoursAgo(0.8),
        venue: 'Thyagaraj Indoor Stadium, Delhi',
        resultText: null,
        timeline: [
          { time: "30'", text: 'SUPER RAID! Aslam Inamdar picks up 3 touch points.' },
          { time: "25'", text: 'ALL OUT inflicted on Jaipur Pink Panthers.' }
        ]
      },
      {
        id: 'kab-live-2',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Bengaluru Bulls', logo: null },
          { name: 'Patna Pirates', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'BLR', text: '22' },
          { label: 'PAT', text: '25' }
        ],
        status: 'HT - Halftime',
        startTime: hoursAgo(0.5),
        venue: 'Gachibowli Indoor Stadium, Hyderabad',
        resultText: null,
        timeline: [
          { time: "18'", text: 'SUPER TACKLE by Saurabh Nandal!' }
        ]
      },
      // Upcoming matches
      {
        id: 'kab-up-1',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Dabang Delhi K.C.', logo: null },
          { name: 'U Mumba', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(6),
        venue: 'Thyagaraj Indoor Stadium, Delhi',
        resultText: null,
        timeline: null
      },
      {
        id: 'kab-up-2',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Tamil Thalaivas', logo: null },
          { name: 'Telugu Titans', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 2),
        venue: 'Jawaharlal Nehru Indoor Stadium, Chennai',
        resultText: null,
        timeline: null
      },
      {
        id: 'kab-up-3',
        sport: 'kabaddi',
        league: 'Kabaddi World Cup 2026',
        teams: [
          { name: 'India', logo: null },
          { name: 'Iran', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(5),
        venue: 'Netaji Indoor Stadium, Kolkata',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'kab-comp-1',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Puneri Paltan', logo: null },
          { name: 'Haryana Steelers', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'PUN', text: '28' },
          { label: 'HAR', text: '25' }
        ],
        status: 'FT',
        startTime: daysAgo(1, 5),
        venue: 'GMC Balayogi Indoor Stadium, Hyderabad',
        resultText: 'Puneri Paltan won 28 - 25',
        timeline: [
          { time: "40'", text: 'Full-time whistle; Pankaj Mohite empty raid confirms win.' }
        ]
      },
      {
        id: 'kab-comp-2',
        sport: 'kabaddi',
        league: 'Asian Games Kabaddi Final',
        teams: [
          { name: 'India', logo: null },
          { name: 'Iran', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'IND', text: '33' },
          { label: 'IRN', text: '29' }
        ],
        status: 'FT',
        startTime: daysAgo(4),
        venue: 'Xiaoshan Guali Sports Centre, Hangzhou',
        resultText: 'India won 33 - 29 to claim Gold Medal',
        timeline: [
          { time: "39'", text: 'Pawan Sehrawat multi-point raid seals dramatic finish.' }
        ]
      },
      {
        id: 'kab-comp-3',
        sport: 'kabaddi',
        league: 'Pro Kabaddi League Season 11',
        teams: [
          { name: 'Gujarat Giants', logo: null },
          { name: 'Bengal Warriors', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'GUJ', text: '41' },
          { label: 'BEN', text: '32' }
        ],
        status: 'FT',
        startTime: daysAgo(6),
        venue: 'Arena by TransStadia, Ahmedabad',
        resultText: 'Gujarat Giants won 41 - 32',
        timeline: [
          { time: "37'", text: 'Fazel Atrachali registers High 5.' }
        ]
      }
    ],

    rugby: [
      // Live matches
      {
        id: 'rug-live-1',
        sport: 'rugby',
        league: 'Six Nations Championship',
        teams: [
          { name: 'Ireland', logo: null },
          { name: 'France', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'IRE', text: '24' },
          { label: 'FRA', text: '21' }
        ],
        status: "62' 2nd Half",
        startTime: hoursAgo(1.3),
        venue: 'Aviva Stadium, Dublin',
        resultText: null,
        timeline: [
          { time: "58'", text: 'TRY! Lowe crashes over corner flag.' },
          { time: "45'", text: 'PENALTY! Ramos slots 45m kick.' }
        ]
      },
      {
        id: 'rug-live-2',
        sport: 'rugby',
        league: 'The Rugby Championship',
        teams: [
          { name: 'New Zealand All Blacks', logo: null },
          { name: 'South Africa Springboks', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'NZL', text: '17' },
          { label: 'RSA', text: '18' }
        ],
        status: "HT - Halftime",
        startTime: hoursAgo(0.8),
        venue: 'Eden Park, Auckland',
        resultText: null,
        timeline: [
          { time: "39'", text: 'Kolbe intercept try stunned the home crowd.' }
        ]
      },
      // Upcoming matches
      {
        id: 'rug-up-1',
        sport: 'rugby',
        league: 'Six Nations Championship',
        teams: [
          { name: 'England', logo: null },
          { name: 'Wales', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(28),
        venue: 'Twickenham Stadium, London',
        resultText: null,
        timeline: null
      },
      {
        id: 'rug-up-2',
        sport: 'rugby',
        league: 'Super Rugby Pacific',
        teams: [
          { name: 'Crusaders', logo: null },
          { name: 'Blues', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'Apollo Projects Stadium, Christchurch',
        resultText: null,
        timeline: null
      },
      {
        id: 'rug-up-3',
        sport: 'rugby',
        league: 'European Rugby Champions Cup',
        teams: [
          { name: 'Toulouse', logo: null },
          { name: 'Leinster', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'Tottenham Hotspur Stadium, London',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'rug-comp-1',
        sport: 'rugby',
        league: 'Rugby World Cup Final',
        teams: [
          { name: 'South Africa', logo: null },
          { name: 'New Zealand', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'RSA', text: '12' },
          { label: 'NZL', text: '11' }
        ],
        status: 'FT',
        startTime: daysAgo(2),
        venue: 'Stade de France, Saint-Denis',
        resultText: 'South Africa won 12 - 11',
        timeline: [
          { time: "80'", text: 'Springboks hold defensive line in final scrum to win World Cup.' }
        ]
      },
      {
        id: 'rug-comp-2',
        sport: 'rugby',
        league: 'Six Nations',
        teams: [
          { name: 'Scotland', logo: null },
          { name: 'England', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'SCO', text: '30' },
          { label: 'ENG', text: '21' }
        ],
        status: 'FT',
        startTime: daysAgo(5),
        venue: 'Murrayfield, Edinburgh',
        resultText: 'Scotland won 30 - 21 (Calcutta Cup retained)',
        timeline: [
          { time: "68'", text: 'Van der Merwe hat-trick try puts game out of reach.' }
        ]
      },
      {
        id: 'rug-comp-3',
        sport: 'rugby',
        league: 'Super Rugby Pacific',
        teams: [
          { name: 'Brumbies', logo: null },
          { name: 'Chiefs', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'BRU', text: '20' },
          { label: 'CHI', text: '34' }
        ],
        status: 'FT',
        startTime: daysAgo(7),
        venue: 'GIO Stadium, Canberra',
        resultText: 'Chiefs won 34 - 20',
        timeline: [
          { time: "74'", text: 'McKenzie penalty extends buffer to 14 points.' }
        ]
      }
    ],

    baseball: [
      // Live matches
      {
        id: 'base-live-1',
        sport: 'baseball',
        league: 'Major League Baseball (MLB)',
        teams: [
          { name: 'New York Yankees', logo: 'https://media.api-sports.io/baseball/teams/1.png' },
          { name: 'Los Angeles Dodgers', logo: 'https://media.api-sports.io/baseball/teams/2.png' }
        ],
        state: 'live',
        scores: [
          { label: 'NYY', text: '4 (R:4 H:8 E:0)' },
          { label: 'LAD', text: '5 (R:5 H:9 E:1)' }
        ],
        status: 'Top 8th - 1 Out (Runner on 2nd)',
        startTime: hoursAgo(2.2),
        venue: 'Dodger Stadium, Los Angeles',
        resultText: null,
        timeline: [
          { time: 'Bot 6th', text: 'Shohei Ohtani crushes a 440ft two-run home run!' },
          { time: 'Top 4th', text: 'Aaron Judge solo home run into left field pavilion.' }
        ]
      },
      {
        id: 'base-live-2',
        sport: 'baseball',
        league: 'Major League Baseball (MLB)',
        teams: [
          { name: 'Boston Red Sox', logo: null },
          { name: 'Houston Astros', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'BOS', text: '2 (R:2 H:5 E:0)' },
          { label: 'HOU', text: '1 (R:1 H:4 E:0)' }
        ],
        status: 'Mid 5th Inning',
        startTime: hoursAgo(1.4),
        venue: 'Fenway Park, Boston',
        resultText: null,
        timeline: [
          { time: 'Bot 3rd', text: 'Devers 2-RBI double off the Green Monster.' }
        ]
      },
      // Upcoming matches
      {
        id: 'base-up-1',
        sport: 'baseball',
        league: 'Major League Baseball (MLB)',
        teams: [
          { name: 'Atlanta Braves', logo: null },
          { name: 'Philadelphia Phillies', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(15),
        venue: 'Truist Park, Atlanta',
        resultText: null,
        timeline: null
      },
      {
        id: 'base-up-2',
        sport: 'baseball',
        league: 'Major League Baseball (MLB)',
        teams: [
          { name: 'Chicago Cubs', logo: null },
          { name: 'St. Louis Cardinals', logo: null }
        ],
        state: 'upcoming',
        startTime: daysAhead(1, 4),
        scores: [],
        status: 'Not Started',
        venue: 'Wrigley Field, Chicago',
        resultText: null,
        timeline: null
      },
      {
        id: 'base-up-3',
        sport: 'baseball',
        league: 'Nippon Professional Baseball (NPB)',
        teams: [
          { name: 'Yomiuri Giants', logo: null },
          { name: 'Hanshin Tigers', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2, 6),
        venue: 'Tokyo Dome, Tokyo',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'base-comp-1',
        sport: 'baseball',
        league: 'MLB World Series Game 5',
        teams: [
          { name: 'Los Angeles Dodgers', logo: null },
          { name: 'New York Yankees', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'LAD', text: '7 (R:7 H:7 E:0)' },
          { label: 'NYY', text: '6 (R:6 H:8 E:2)' }
        ],
        status: 'FT (Final/9)',
        startTime: daysAgo(2),
        venue: 'Yankee Stadium, New York',
        resultText: 'Los Angeles Dodgers won 7 - 6 to win World Series',
        timeline: [
          { time: 'Top 8th', text: 'Betts sacrifice fly drives in go-ahead run.' }
        ]
      },
      {
        id: 'base-comp-2',
        sport: 'baseball',
        league: 'MLB Regular Season',
        teams: [
          { name: 'San Diego Padres', logo: null },
          { name: 'San Francisco Giants', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'SD', text: '6 (R:6 H:11 E:0)' },
          { label: 'SF', text: '2 (R:2 H:5 E:1)' }
        ],
        status: 'FT (Final/9)',
        startTime: daysAgo(3),
        venue: 'Petco Park, San Diego',
        resultText: 'San Diego Padres won 6 - 2',
        timeline: [
          { time: 'Bot 7th', text: 'Machado grand slam breaks open contest.' }
        ]
      },
      {
        id: 'base-comp-3',
        sport: 'baseball',
        league: 'World Baseball Classic Final',
        teams: [
          { name: 'Japan', logo: null },
          { name: 'USA', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'JPN', text: '3 (R:3 H:5 E:0)' },
          { label: 'USA', text: '2 (R:2 H:9 E:0)' }
        ],
        status: 'FT (Final/9)',
        startTime: daysAgo(5),
        venue: 'loanDepot park, Miami',
        resultText: 'Japan won 3 - 2',
        timeline: [
          { time: 'Bot 9th', text: 'Ohtani strikes out Trout for final out of WBC.' }
        ]
      }
    ],

    'table-tennis': [
      // Live matches
      {
        id: 'tt-live-1',
        sport: 'table-tennis',
        league: 'WTT Champions Men’s Singles',
        teams: [
          { name: 'Fan Zhendong', logo: null },
          { name: 'Tomokazu Harimoto', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Fan Zhendong', text: '3 (11, 9, 11, 8, 9*)' },
          { label: 'Harimoto', text: '2 (7, 11, 6, 11, 8)' }
        ],
        status: 'Game 6 - 9-8 Fan',
        startTime: hoursAgo(0.7),
        venue: 'Lusail Sports Arena, Doha',
        resultText: null,
        timeline: [
          { time: 'G6 8-8', text: 'High spin counter-loop by Fan.' }
        ]
      },
      {
        id: 'tt-live-2',
        sport: 'table-tennis',
        league: 'WTT Star Contender',
        teams: [
          { name: 'Manika Batra', logo: null },
          { name: 'Mima Ito', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Batra', text: '1 (11, 8, 9*)' },
          { label: 'Ito', text: '1 (9, 11, 10)' }
        ],
        status: 'Game 3 - 9-10 Ito (Game Point)',
        startTime: hoursAgo(0.4),
        venue: 'Goa Indoor Stadium, Panaji',
        resultText: null,
        timeline: [
          { time: 'G3 9-9', text: 'Twiddle forehand smash winner by Batra.' }
        ]
      },
      // Upcoming matches
      {
        id: 'tt-up-1',
        sport: 'table-tennis',
        league: 'ITTF World Cup',
        teams: [
          { name: 'Wang Chuqin', logo: null },
          { name: 'Felix Lebrun', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(17),
        venue: 'Galaxy Arena, Macau',
        resultText: null,
        timeline: null
      },
      {
        id: 'tt-up-2',
        sport: 'table-tennis',
        league: 'WTT Grand Smash Men’s Semifinal',
        teams: [
          { name: 'Truls Möregårdh', logo: null },
          { name: 'Hugo Calderano', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 8),
        venue: 'Singapore Sports Hub, Singapore',
        resultText: null,
        timeline: null
      },
      {
        id: 'tt-up-3',
        sport: 'table-tennis',
        league: 'Olympic Games Qualifier',
        teams: [
          { name: 'Sharath Kamal', logo: null },
          { name: 'Quadri Aruna', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3),
        venue: 'Ali Bin Hamad Al Attiya Arena, Doha',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'tt-comp-1',
        sport: 'table-tennis',
        league: 'Olympic Games Men’s Final',
        teams: [
          { name: 'Fan Zhendong', logo: null },
          { name: 'Truls Möregårdh', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Fan Zhendong', text: '4 (7, 11, 11, 11, 11)' },
          { label: 'Möregårdh', text: '1 (11, 9, 9, 8, 8)' }
        ],
        status: 'Completed',
        startTime: daysAgo(2),
        venue: 'South Paris Arena 4, Paris',
        resultText: 'Fan Zhendong won 4 - 1 to capture Olympic Gold',
        timeline: [
          { time: 'Game 5 11-8', text: 'Forehand punch winner on match point.' }
        ]
      },
      {
        id: 'tt-comp-2',
        sport: 'table-tennis',
        league: 'WTT Champions Incheon Final',
        teams: [
          { name: 'Sun Yingsha', logo: null },
          { name: 'Wang Manyu', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Sun Yingsha', text: '4 (11, 11, 12, 11)' },
          { label: 'Wang Manyu', text: '0 (7, 5, 10, 6)' }
        ],
        status: 'Completed',
        startTime: daysAgo(4),
        venue: 'Mohegan Inspire Arena, Incheon',
        resultText: 'Sun Yingsha won 4 - 0',
        timeline: [
          { time: 'Game 4', text: 'Sun sweeps final in commanding fashion.' }
        ]
      },
      {
        id: 'tt-comp-3',
        sport: 'table-tennis',
        league: 'WTT Feeder Series',
        teams: [
          { name: 'Sathiyan Gnanasekaran', logo: null },
          { name: 'Manav Thakkar', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Sathiyan', text: '3 (11, 7, 11, 11)' },
          { label: 'Thakkar', text: '1 (9, 11, 8, 7)' }
        ],
        status: 'Completed',
        startTime: daysAgo(6),
        venue: 'Beirut Sports Complex, Lebanon',
        resultText: 'Sathiyan Gnanasekaran won 3 - 1',
        timeline: [
          { time: 'Game 4', text: 'Sathiyan converts 2nd match point.' }
        ]
      }
    ],

    golf: [
      // Live matches
      {
        id: 'golf-live-1',
        sport: 'golf',
        league: 'The Masters Tournament',
        teams: [
          { name: 'Scottie Scheffler', logo: null },
          { name: 'Rory McIlroy', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Scheffler', text: '-11 (Thru 14, R4: -3)' },
          { label: 'McIlroy', text: '-9 (Thru 15, R4: -2)' },
          { label: 'DeChambeau', text: '-8 (Thru 16, R4: -1)' }
        ],
        status: 'Round 4 - Amen Corner Hole 14',
        startTime: hoursAgo(3.5),
        venue: 'Augusta National Golf Club, Georgia',
        resultText: null,
        timeline: [
          { time: 'Hole 13', text: 'Eagle for Scheffler on par-5 13th.' },
          { time: 'Hole 12', text: 'Birdie putt dropped by McIlroy.' }
        ]
      },
      {
        id: 'golf-live-2',
        sport: 'golf',
        league: 'The Open Championship',
        teams: [
          { name: 'Xander Schauffele', logo: null },
          { name: 'Viktor Hovland', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Schauffele', text: '-8 (Thru 10)' },
          { label: 'Hovland', text: '-6 (Thru 11)' }
        ],
        status: 'Round 3 - Moving Day Hole 10',
        startTime: hoursAgo(2.1),
        venue: 'Royal Troon Golf Club, Scotland',
        resultText: null,
        timeline: [
          { time: 'Hole 8', text: 'Schauffele birdies the "Postage Stamp".' }
        ]
      },
      // Upcoming matches
      {
        id: 'golf-up-1',
        sport: 'golf',
        league: 'U.S. Open Championship',
        teams: [
          { name: 'Pinehurst No. 2 Championship Field', logo: null },
          { name: 'Round 1 Tee Times', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(1, 10),
        venue: 'Pinehurst Resort, North Carolina',
        resultText: null,
        timeline: null
      },
      {
        id: 'golf-up-2',
        sport: 'golf',
        league: 'PGA Championship',
        teams: [
          { name: 'Valhalla Golf Club', logo: null },
          { name: 'Round 1 Field', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(3),
        venue: 'Valhalla Golf Club, Louisville, Kentucky',
        resultText: null,
        timeline: null
      },
      {
        id: 'golf-up-3',
        sport: 'golf',
        league: 'Hero Indian Open (DP World Tour)',
        teams: [
          { name: 'Anirban Lahiri', logo: null },
          { name: 'Shubhankar Sharma', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(5),
        venue: 'DLF Golf & Country Club, Gurugram',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'golf-comp-1',
        sport: 'golf',
        league: 'The Masters Tournament',
        teams: [
          { name: 'Scottie Scheffler', logo: null },
          { name: 'Ludvig Åberg', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Scheffler', text: '-11 (66, 72, 71, 68 = 277)' },
          { label: 'Åberg', text: '-7 (73, 69, 70, 69 = 281)' }
        ],
        status: 'Final (72 Holes)',
        startTime: daysAgo(2),
        venue: 'Augusta National Golf Club, Augusta',
        resultText: 'Scottie Scheffler wins the Green Jacket by 4 strokes',
        timeline: [
          { time: 'Hole 18', text: 'Scheffler taps in on 18th for second Masters victory.' }
        ]
      },
      {
        id: 'golf-comp-2',
        sport: 'golf',
        league: 'PGA Championship',
        teams: [
          { name: 'Xander Schauffele', logo: null },
          { name: 'Bryson DeChambeau', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Schauffele', text: '-21 (263)' },
          { label: 'DeChambeau', text: '-20 (264)' }
        ],
        status: 'Final',
        startTime: daysAgo(4),
        venue: 'Valhalla Golf Club, Louisville',
        resultText: 'Xander Schauffele won by 1 stroke (-21 record)',
        timeline: [
          { time: 'Hole 18', text: 'Schauffele drains 6ft birdie putt to clinch major.' }
        ]
      },
      {
        id: 'golf-comp-3',
        sport: 'golf',
        league: 'The Players Championship',
        teams: [
          { name: 'Scottie Scheffler', logo: null },
          { name: 'Brian Harman', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Scheffler', text: '-20 (268)' },
          { label: 'Harman', text: '-19 (269)' }
        ],
        status: 'Final',
        startTime: daysAgo(6),
        venue: 'TPC Sawgrass, Ponte Vedra Beach',
        resultText: 'Scottie Scheffler won by 1 stroke',
        timeline: [
          { time: 'Hole 17', text: 'Safely finds the island green to defend title.' }
        ]
      }
    ],

    'boxing-mma': [
      // Live matches
      {
        id: 'box-live-1',
        sport: 'boxing-mma',
        league: 'UFC 312 Main Card',
        teams: [
          { name: 'Islam Makhachev', logo: null },
          { name: 'Arman Tsarukyan', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Makhachev', text: '2 Takedowns (10-9 Rd 1, 10-9 Rd 2)' },
          { label: 'Tsarukyan', text: '18 Sig. Strikes (9-10 Rd 1, 9-10 Rd 2)' }
        ],
        status: 'Round 3 (2:15 remaining)',
        startTime: hoursAgo(0.6),
        venue: 'T-Mobile Arena, Las Vegas',
        resultText: null,
        timeline: [
          { time: 'Round 2', text: 'Makhachev controls against the cage with double-leg takedown.' }
        ]
      },
      {
        id: 'box-live-2',
        sport: 'boxing-mma',
        league: 'Undisputed Heavyweight Championship',
        teams: [
          { name: 'Oleksandr Usyk', logo: null },
          { name: 'Tyson Fury', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Usyk', text: '87 Punches Landed (Rd 8: 10-8)' },
          { label: 'Fury', text: '79 Punches Landed (Rd 8: 8-10)' }
        ],
        status: 'Round 9 of 12',
        startTime: hoursAgo(1.0),
        venue: 'Kingdom Arena, Riyadh',
        resultText: null,
        timeline: [
          { time: 'Round 8', text: 'Usyk rocks Fury with massive left hook, standing 8-count given!' }
        ]
      },
      // Upcoming matches
      {
        id: 'box-up-1',
        sport: 'boxing-mma',
        league: 'UFC Light Heavyweight Title',
        teams: [
          { name: 'Alex Pereira', logo: null },
          { name: 'Magomed Ankalaev', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(20),
        venue: 'Madison Square Garden, New York',
        resultText: null,
        timeline: null
      },
      {
        id: 'box-up-2',
        sport: 'boxing-mma',
        league: 'WBC World Bantamweight',
        teams: [
          { name: 'Naoya Inoue', logo: null },
          { name: 'Sam Goodman', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'Ariake Arena, Tokyo',
        resultText: null,
        timeline: null
      },
      {
        id: 'box-up-3',
        sport: 'boxing-mma',
        league: 'UFC Bantamweight Championship',
        teams: [
          { name: 'Merab Dvalishvili', logo: null },
          { name: 'Umar Nurmagomedov', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'Etihad Arena, Abu Dhabi',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'box-comp-1',
        sport: 'boxing-mma',
        league: 'Undisputed Heavyweight Title',
        teams: [
          { name: 'Oleksandr Usyk', logo: null },
          { name: 'Tyson Fury', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Usyk', text: '115-112, 114-113' },
          { label: 'Fury', text: '114-113' }
        ],
        status: 'Completed (Split Decision)',
        startTime: daysAgo(2),
        venue: 'Kingdom Arena, Riyadh',
        resultText: 'Oleksandr Usyk won via Split Decision (12 Rds) to become Undisputed Champion',
        timeline: [
          { time: 'Round 12', text: 'Final bell sounds after thrilling back-and-forth round.' }
        ]
      },
      {
        id: 'box-comp-2',
        sport: 'boxing-mma',
        league: 'UFC Featherweight Championship',
        teams: [
          { name: 'Ilia Topuria', logo: null },
          { name: 'Max Holloway', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Topuria', text: 'KO Rd 3 (1:34)' },
          { label: 'Holloway', text: '0' }
        ],
        status: 'KO / TKO',
        startTime: daysAgo(3),
        venue: 'Etihad Arena, Abu Dhabi',
        resultText: 'Ilia Topuria won via KO (Round 3, 1:34)',
        timeline: [
          { time: 'Round 3 1:34', text: 'Left hook stuns Holloway followed by ground and pound finish.' }
        ]
      },
      {
        id: 'box-comp-3',
        sport: 'boxing-mma',
        league: 'Super Middleweight Championship',
        teams: [
          { name: 'Canelo Álvarez', logo: null },
          { name: 'Edgar Berlanga', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Álvarez', text: '118-109, 118-109, 117-110' },
          { label: 'Berlanga', text: '0' }
        ],
        status: 'Completed (UD)',
        startTime: daysAgo(5),
        venue: 'T-Mobile Arena, Las Vegas',
        resultText: 'Canelo Álvarez won via Unanimous Decision',
        timeline: [
          { time: 'Round 3', text: 'Left hook knockdown scored by Canelo.' }
        ]
      }
    ],

    athletics: [
      // Live matches (Events / Heats / Finals)
      {
        id: 'ath-live-1',
        sport: 'athletics',
        league: 'World Athletics Continental Tour',
        teams: [
          { name: "Men's 100m Final", logo: null },
          { name: 'Noah Lyles vs Kishane Thompson', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Lyles (USA)', text: '9.79s (Wind +1.0)' },
          { label: 'Thompson (JAM)', text: '9.79s (+0.005)' },
          { label: 'Kerley (USA)', text: '9.81s' }
        ],
        status: 'Photo Finish Review',
        startTime: hoursAgo(0.4),
        venue: 'Stade de France, Saint-Denis',
        resultText: null,
        timeline: [
          { time: 'Final', text: 'Noah Lyles leans at the tape in an extraordinary photo finish.' }
        ]
      },
      {
        id: 'ath-live-2',
        sport: 'athletics',
        league: 'Diamond League Meeting',
        teams: [
          { name: "Men's Javelin Throw", logo: null },
          { name: 'Neeraj Chopra vs Arshad Nadeem', logo: null }
        ],
        state: 'live',
        scores: [
          { label: 'Chopra (IND)', text: 'Attempt 4: 89.45m' },
          { label: 'Nadeem (PAK)', text: 'Attempt 4: 90.18m' },
          { label: 'Peters (GRN)', text: 'Attempt 4: 88.54m' }
        ],
        status: 'Round 5 in Progress',
        startTime: hoursAgo(1.2),
        venue: 'Stade Louis II, Monaco',
        resultText: null,
        timeline: [
          { time: 'Round 2', text: 'Arshad Nadeem sets mark with 90.18m throw.' },
          { time: 'Round 3', text: 'Neeraj Chopra responds with 89.45m season best.' }
        ]
      },
      // Upcoming matches
      {
        id: 'ath-up-1',
        sport: 'athletics',
        league: 'Diamond League Final',
        teams: [
          { name: "Men's 400m Hurdles", logo: null },
          { name: 'Karsten Warholm vs Rai Benjamin', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: hoursAhead(24),
        venue: 'King Baudouin Stadium, Brussels',
        resultText: null,
        timeline: null
      },
      {
        id: 'ath-up-2',
        sport: 'athletics',
        league: 'World Athletics Championships',
        teams: [
          { name: "Women's 100m Hurdles Final", logo: null },
          { name: 'Tobi Amusan vs Masai Russell', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(2),
        venue: 'National Stadium, Tokyo',
        resultText: null,
        timeline: null
      },
      {
        id: 'ath-up-3',
        sport: 'athletics',
        league: 'Berlin Marathon',
        teams: [
          { name: 'Men & Women Elite Field', logo: null },
          { name: 'Eliud Kipchoge / Sisay Lemma', logo: null }
        ],
        state: 'upcoming',
        scores: [],
        status: 'Not Started',
        startTime: daysAhead(4),
        venue: 'Brandenburg Gate, Berlin',
        resultText: null,
        timeline: null
      },
      // Completed matches
      {
        id: 'ath-comp-1',
        sport: 'athletics',
        league: 'Olympic Games Athletics',
        teams: [
          { name: "Men's Pole Vault Final", logo: null },
          { name: 'Armand Duplantis (SWE)', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Duplantis (SWE)', text: '6.25m (World Record)' },
          { label: 'Kendricks (USA)', text: '5.95m' },
          { label: 'Karalis (GRE)', text: '5.90m' }
        ],
        status: 'Final Standings',
        startTime: daysAgo(2),
        venue: 'Stade de France, Saint-Denis',
        resultText: 'Armand Duplantis wins Gold with new World Record 6.25m',
        timeline: [
          { time: 'Attempt 3', text: 'Duplantis clears 6.25m on final jump to break WR.' }
        ]
      },
      {
        id: 'ath-comp-2',
        sport: 'athletics',
        league: 'Diamond League Zurich',
        teams: [
          { name: "Women's 100m Final", logo: null },
          { name: 'Sha’Carri Richardson vs Julien Alfred', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Richardson (USA)', text: '10.84s' },
          { label: 'Alfred (LCA)', text: '10.88s' }
        ],
        status: 'Final',
        startTime: daysAgo(4),
        venue: 'Letzigrund Stadium, Zurich',
        resultText: 'Sha’Carri Richardson won in 10.84s',
        timeline: [
          { time: 'Final', text: 'Richardson takes late surge to pip Alfred.' }
        ]
      },
      {
        id: 'ath-comp-3',
        sport: 'athletics',
        league: 'Olympic Games Athletics',
        teams: [
          { name: "Men's 1500m Final", logo: null },
          { name: 'Cole Hocker vs Josh Kerr', logo: null }
        ],
        state: 'completed',
        scores: [
          { label: 'Hocker (USA)', text: '3:27.65 (OR)' },
          { label: 'Kerr (GBR)', text: '3:27.79' },
          { label: 'Ingebrigtsen (NOR)', text: '3:28.24' }
        ],
        status: 'Final',
        startTime: daysAgo(6),
        venue: 'Stade de France, Paris',
        resultText: 'Cole Hocker won in Olympic Record 3:27.65',
        timeline: [
          { time: 'Final 100m', text: 'Hocker charges through inside rail to upset favorites.' }
        ]
      }
    ]
  };
}

/**
 * Filter fixtures by state
 * @param {Array} matches
 * @param {'live'|'upcoming'|'completed'|'all'} state
 */
function filterByState(matches, state) {
  if (!matches) return [];
  if (!state || state === 'all') return matches;
  return matches.filter(m => m.state === state);
}

module.exports = {
  /**
   * Fetch all mock matches for a specific sport or all sports
   * @param {string} sportKey
   * @param {string} state
   * @returns {Promise<Array>}
   */
  async getMatches(sportKey, state = 'all') {
    const db = getMockDatabase();
    if (!sportKey || sportKey === 'all') {
      const all = Object.values(db).flat();
      return filterByState(all, state);
    }

    const sportMatches = db[sportKey] || [];
    return filterByState(sportMatches, state);
  },

  /**
   * Provider interface methods expected by registry
   */
  async fetchLive(sportKey) {
    const db = getMockDatabase();
    const matches = db[sportKey] || [];
    return matches.filter(m => m.state === 'live');
  },

  async fetchUpcoming(sportKey) {
    const db = getMockDatabase();
    const matches = db[sportKey] || [];
    return matches.filter(m => m.state === 'upcoming');
  },

  async fetchResults(sportKey) {
    const db = getMockDatabase();
    const matches = db[sportKey] || [];
    return matches.filter(m => m.state === 'completed');
  },

  /**
   * Fetch a single match by its ID
   * @param {string} matchId
   */
  async getMatchById(matchId) {
    const db = getMockDatabase();
    for (const sport of Object.keys(db)) {
      const found = db[sport].find(m => m.id === matchId);
      if (found) return found;
    }
    return null;
  }
};
