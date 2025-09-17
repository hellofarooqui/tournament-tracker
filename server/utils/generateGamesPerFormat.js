const getNextDay = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
}

export const generateRoundRobinSchedule = (teams, tournamentId, startDate, gamesPerDay = 3) => {
  if (!teams || teams.length < 2) {
    throw new Error('At least 2 teams are required for a tournament');
  }

  if (!tournamentId || !startDate) {
    throw new Error('Tournament ID and start date are required');
  }

  // Generate all possible matchups (combinations)
  const matchups = generateMatchups(teams);
  
  // Create games with scheduled dates
  const games = [];
  let currentDate = new Date(startDate);
  let gamesScheduledToday = 0;

  matchups.forEach((matchup, index) => {
    // If we've scheduled the max games for today, move to next day
    if (gamesScheduledToday >= gamesPerDay) {
      currentDate = getNextDay(currentDate);
      gamesScheduledToday = 0;
    }

    const game = {
      name: `Game ${index + 1}`,
      tournament: tournamentId,
      teams: matchup,
      winner: null, // Will be set after the game is played
      scheduledDate: new Date(currentDate)
    };

    games.push(game);
    gamesScheduledToday++;
  });

  return games;
}
