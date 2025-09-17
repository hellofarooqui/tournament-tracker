export const getTournamentStats = (teams, gamesPerDay = 3) => {
  if (!teams || teams.length < 2) {
    throw new Error('At least 2 teams are required');
  }
  
  const totalGames = (teams.length * (teams.length - 1)) / 2;
  const totalDays = Math.ceil(totalGames / gamesPerDay);
  
  return {
    teamsCount: teams.length,
    totalGames: totalGames,
    totalDays: totalDays,
    gamesPerDay: gamesPerDay
  };
}