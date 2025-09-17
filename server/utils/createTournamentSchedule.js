export const createTournamentSchedule = async (teams, tournamentId, startDate, gamesPerDay = 3) => {
  try {
    // Generate the schedule
    const games = generateRoundRobinSchedule(teams, tournamentId, startDate, gamesPerDay);
    
    // Save to database
    const savedGames = await saveGamesToDatabase(games);
    
    // Calculate tournament duration
    const totalGames = games.length;
    const totalDays = Math.ceil(totalGames / gamesPerDay);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + totalDays - 1);
    
    return {
      games: savedGames,
      totalGames: totalGames,
      totalDays: totalDays,
      startDate: new Date(startDate),
      endDate: endDate,
      teamsCount: teams.length
    };
  } catch (error) {
    throw new Error(`Failed to create tournament schedule: ${error.message}`);
  }
}