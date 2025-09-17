export const previewTournamentSchedule = (teams, tournamentId, startDate, gamesPerDay = 3) => {
  const games = generateRoundRobinSchedule(teams, tournamentId, startDate, gamesPerDay);
  const stats = getTournamentStats(teams, gamesPerDay);
  
  // Group games by date for better visualization
  const gamesByDate = {};
  games.forEach(game => {
    const dateKey = game.scheduledDate.toDateString();
    if (!gamesByDate[dateKey]) {
      gamesByDate[dateKey] = [];
    }
    gamesByDate[dateKey].push(game);
  });
  
  return {
    stats: stats,
    games: games,
    gamesByDate: gamesByDate,
    schedule: Object.keys(gamesByDate).map(date => ({
      date: date,
      games: gamesByDate[date].length,
      matchups: gamesByDate[date].map(game => ({
        name: game.name,
        teams: game.teams
      }))
    }))
  };
}