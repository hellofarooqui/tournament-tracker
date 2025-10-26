import mongoose from "mongoose";

const cricketTournamentSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after the start date.",
      },
    },
    type: {
      type: String,
      enum: ["Single", "Team"],
      default: "Team",
    },
    // Cricket-specific fields
    matchFormat: {
      type: String,
      enum: ["T20", "ODI", "Test", "T10", "The Hundred"],
      default: "T20",
    },
    oversPerInning: {
      type: Number,
      default: 20,
    },
    ballType: {
      type: String,
      enum: ["Leather", "Tennis", "Rubber"],
      default: "Leather",
    },
    playersPerTeam: {
      type: Number,
      default: 11,
      min: 7,
      max: 15,
    },
    format: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TournamentFormat",
    },
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CricketMatch",
      },
    ],
    teams: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        assigned: {
          type: Boolean,
          default: false,
        },
        assignedGroup: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
          default: null,
        },
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
        unique: true,
      },
    ],
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
    pointsTable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PointsTable",
      },
    ],
    // Cricket-specific statistics
    topScorer: {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      runs: {
        type: Number,
        default: 0,
      },
    },
    topWicketTaker: {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      wickets: {
        type: Number,
        default: 0,
      },
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    runnerUp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tournamentAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

cricketTournamentSchema.pre("save", function (next) {
  if (!this.isModified("updatedAt")) {
    this.updatedAt = Date.now();
  }
  next();
});

cricketTournamentSchema.index({ status: 1, startDate: 1 });
cricketTournamentSchema.index({ matchFormat: 1 });

const CricketTournament = mongoose.model("CricketTournament", cricketTournamentSchema);
export default CricketTournament;