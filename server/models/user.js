import mongoose, { Schema } from "mongoose";

const gameStatsSchema = new Schema(
  {
    game: {
      type: String, // e.g., "chess", "carrom", "cricket"
      required: true,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    },
    ranking: {
      type: Number, // Could store ELO rating or custom ranking
      default: 0,
    },
    tournamentsPlayed: {
      type: Number,
      default: 0,
    },
    tournamentsWon: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const tournamentHistorySchema = new Schema(
  {
    tournamentId: {
      type: Schema.Types.ObjectId,
      ref: "Tournament",
    },
    game: String,
    position: Number, // e.g., 1 for winner, 2 for runner-up
    matchesPlayed: Number,
    matchesWon: Number,
    matchesLost: Number,
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "root-admin", "tournament-admin", "corporate-admin"], //tournament-admin can add games in the tournament, corporate-admin can create tournaments for their corporates after subscription in future
    default: "user",
  },
  tournaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
  ],
  teamName: {
    type: String,
    trim: true,
  },
  gameStats: [gameStatsSchema], // stats per game
  tournamentHistory: [tournamentHistorySchema], // past tournaments
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
