// bulkInsertGames.js
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Game from "../models/game.js"; // adjust path
import dotenv from 'dotenv';
import {games} from './../data/gamesData.js'
import Tournament from "../models/tournament.js";
import axios from "axios";

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Read and parse JSON file
// const gamesPath = path.join(__dirname, "../data/gamesData.json");
// const gamesData = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));

// async function bulkInsertGames() {
//   dotenv.config();
//   try {
//     await mongoose.connect(process.env.MONGO_URI); // change to your DB
//     const insertedGames = await Game.insertMany(gamesData, { ordered: true });
//     console.log(
//       "Inserted game IDs:",
//       insertedGames.map((g) => g._id)
//     );
//     await mongoose.disconnect();
//   } catch (error) {
//     console.error("Error inserting games:", error);
//   }
// }

const bulkInsertGames = async () => {
  // const tournamentId = "68c711f35aa607255f289078";
  // const tournament = await Tournament.findById(tournamentId);

  // //${server}/api/tournaments/${tournamentId}/games

  // if (!tournament) {
  //   console.log("Tournament not found");
  // }
  try {
    games.forEach(async (game) => {
      const gameCreated = await axios.post(
        `http://localhost:3000/api/tournaments/68c711f35aa607255f289078/games`,game
      );
      if (gameCreated) {
        console.log("Create game ID:", gameCreated._id);
        //tournament.games.push(gameCreated._id);
      }
      console.log("Inserted game ID:", gameCreated._id);
    });
  } catch (error) {
    console.error("Error inserting games:", error);
  }
}

bulkInsertGames();
