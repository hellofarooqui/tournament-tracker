import Game from "../models/game.js";
import PointsTable from "../models/pointsTable.js";
import Tournament from "../models/tournament.js";
import updateGamesDrawn from "../utils/updateGamesDrawn.js";
import updateGamesLost from "../utils/updateGamesLost.js";
import updateGamesWon from "../utils/updateGamesWon.js";

export const createTournamentGame = async (req, res) => {
  const { tournamentId } = req.params;
  console.log("Trying to crete game");

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
    const tournament = await Tournament.findById(tournamentId).populate({
      path: "games",
      populate: [{ path: "teams" }, { path: "winner" }],
    });
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    return res.status(200).json(tournament.games);
  } catch (error) {
    console.error("Error fetching tournament games:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateWinner = async (req, res) => {
  const { id } = req.params;    //Game ID
  const { winnerId, result } = req.body;

  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }


    if (!winnerId && !result) {
      game.result = false
      await game.save()
      await updateGamesDrawn(game.tournament, game.teams)
      return res.status(200).json(game)
    }

    if (game.winner) {
      if (game.winner.toString() === winnerId) {
        return res
          .status(400)
          .json({ message: "Winner already set for this game" });
      }
      return res
        .status(400)
        .json({ message: "Winner already set for this game, cannot change" });
    }


    game.winner = winnerId;
    const looserId = game.teams.find((team) => team._id != winnerId)?._id.toString();
    await game.save();


    await updateGamesWon(game.tournament, winnerId, {
      game: game._id,
      result: "win",
    })
    await updateGamesLost(game.tournament, looserId, {
      game: game._id,
      result: "loss",
    })

    //const tournament = await Tournament.findById(game.tournament);
    // if (!tournament) {
    //     return res.status(404).json({ message: "Tournament not found" });
    // }

    // const pointsTable = await PointsTable.findOne({
    //   tournament: game.tournament,
    // });
    // if (!pointsTable) {
    //   return res.status(404).json({ message: "Points table not found" });
    // }

    // //find the teams and update gamesPlayed by one
    // pointsTable.entries.map((entry) => {
    //   if (game.teams.includes(entry.team)) {
    //     entry.gamesPlayed += 1;
    //   }
    //   return entry;
    // });

    // //find the winner team in the points table and update wins by one
    // pointsTable.entries.map((entry) => {
    //   if (winnerId == entry.team) {
    //     entry.wins += 1;
    //   }
    //   return entry;
    // });

    // //find the winner team in the points table and update points by two
    // pointsTable.entries.map((entry) => {
    //   if (winnerId == entry.team) {
    //     entry.points += 2;
    //   }
    //   return entry;
    // });

    // //find the losing team in the points table and update losses by one
    // pointsTable.entries.map((entry) => {
    //   if (looserId == entry.team) {
    //     entry.losses += 1;
    //   }
    //   return entry;
    // });

    // //find the winning team in the points table and update the results of the game
    // pointsTable.entries.map((entry) => {
    //   if (winnerId == entry.team) {
    //     const newResult = {
    //       game: game._id,
    //       result: "win",
    //     };
    //     entry.results.push(newResult);
    //   }
    //   return entry;
    // });

    // //find the loosing team in the points table and update the results of the game
    // pointsTable.entries.map((entry) => {
    //   if (looserId == entry.team) {
    //     const newResult = {
    //       game: game._id,
    //       result: "loss",
    //     };
    //     entry.results.push(newResult);
    //   }
    //   return entry;
    // });

    // // Update points for the winning team
    // const winningTeam = game.winner;
    // const losingTeam = game.teams.find(team => team._id !== winningTeam._id);
    // pointsTable.points[winningTeam._id] = (pointsTable.points[winningTeam._id] || 0) + 3;
    // pointsTable.points[losingTeam._id] = (pointsTable.points[losingTeam._id] || 0) + 1;
    await pointsTable.save();

    return res.status(200).json(game);
  } catch (error) {
    console.error("Error updating game winner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
