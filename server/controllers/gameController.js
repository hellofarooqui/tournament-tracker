import Game from "../models/game.js";
import Tournament from "../models/tournament.js";

export const createTournamentGame = async (req, res) => {
  const { tournamentId } = req.params;
  console.log("Trying to crete game")

  try {
    const gameCreated = await Game.create(req.body);
    if (!gameCreated) {
      return res.status(400).json({ message: "Game creation failed" });
    }
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    tournament.games.push(gameCreated._id);
    await tournament.save();
    return res.status(201).json(gameCreated);
  } catch (error) {
    console.error("Error creating game:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTournamentGames = async (req, res) => {
    const { tournamentId } = req.params;

    try {
        const tournament = await Tournament.findById(tournamentId).populate("games");
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        return res.status(200).json(tournament.games);
    } catch (error) {
        console.error("Error fetching tournament games:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
