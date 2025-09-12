import mongoose from "mongoose";

const gameFormatSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Knockout",
      "League",
      "Round-Robin",
      "Double Round Robin",
      "Double Elimination",
      "swiss",
    ],
  },
  description: {
    type: String,
  },
});

const GameFormat = mongoose.model("GameFormat", gameFormatSchema);
export default GameFormat;


