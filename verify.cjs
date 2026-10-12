const { getMatches } = require('./server/providers');

async function check() {
  const matches = await getMatches('all', 'all');
  console.log('Total matches:', matches.length);
  let liveWithoutScores = 0;
  let completedWithoutScores = 0;
  let completedWithoutResult = 0;
  let upcomingWithScores = 0;

  for (const m of matches) {
    if (m.state === 'live') {
      if (!m.scores || m.scores.length === 0) liveWithoutScores++;
    } else if (m.state === 'completed') {
      if (!m.scores || m.scores.length === 0) completedWithoutScores++;
      if (!m.resultText) completedWithoutResult++;
    } else if (m.state === 'upcoming') {
      if (m.scores && m.scores.length > 0) upcomingWithScores++;
    }
  }

  console.log('Live matches without scores:', liveWithoutScores);
  console.log('Completed matches without scores:', completedWithoutScores);
  console.log('Completed matches without resultText:', completedWithoutResult);
  console.log('Upcoming matches with scores:', upcomingWithScores);

  if (liveWithoutScores === 0 && completedWithoutScores === 0 && completedWithoutResult === 0 && upcomingWithScores === 0) {
    console.log('>>> ALL SCHEMA & BUG INVARIANTS SATISFIED 100%! <<<');
  } else {
    console.error('>>> INVARIANT VIOLATION DETECTED! <<<');
    process.exit(1);
  }
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
