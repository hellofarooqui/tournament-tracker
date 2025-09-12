import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,

    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  type:{
    type: String,
    enum: ["Single", "Team"],
    default: "Team",
  },
  format:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameFormat",
    //required: true,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      //required: true,
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  enrolledUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["scheduled", "live", "completed", "cancelled"],
    default: "scheduled",
  },
  pointsTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointsTable",
    //required: true,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  tournamentAdmin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;