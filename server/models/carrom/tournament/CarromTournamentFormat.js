import mongoose from "mongoose";

const tournamentFormatSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Knockout",
      "League",
      "Round-Robin",
      "Double Round Robin",
      "Double Elimination",
      "Swiss",
    ],
  },
  description: {
    type: String,
  },
  rules: {
    type: [{title: String, points: [String]}]
  }
});

const TournamentFormat = mongoose.model("TournamentFormat", tournamentFormatSchema);
export default TournamentFormat;


