import Game from "../models/game";

export const saveGamesToDatabase = async (games) =>  {
  try {
    const savedGames = await Game.insertMany(games);
    return savedGames;
  } catch (error) {
    throw new Error(`Failed to save games to database: ${error.message}`);
  }
}