import mongoose from "mongoose";

const chessTournamentSchema = new mongoose.Schema(
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
      default: "Single", // Chess is typically individual
    },
    // Chess-specific fields
    tournamentSystem: {
      type: String,
      enum: ["Round Robin", "Swiss", "Knockout", "Double Elimination"],
      default: "Swiss",
    },
    timeControl: {
      type: String,
      enum: ["Bullet", "Blitz", "Rapid", "Classical"],
      default: "Rapid",
    },
    timeControlMinutes: {
      type: Number,
      default: 10, // Minutes per player
    },
    increment: {
      type: Number,
      default: 0, // Increment in seconds per move
    },
    numberOfRounds: {
      type: Number,
      default: 5,
      min: 1,
    },
    format: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TournamentFormat",
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChessGame",
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
    // Chess-specific standings
    standings: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        points: {
          type: Number,
          default: 0,
        },
        wins: {
          type: Number,
          default: 0,
        },
        draws: {
          type: Number,
          default: 0,
        },
        losses: {
          type: Number,
          default: 0,
        },
        tieBreak: {
          type: Number,
          default: 0,
        },
        rating: {
          type: Number,
        },
      },
    ],
    // Pairings for current round
    currentRound: {
      type: Number,
      default: 0,
    },
    pairings: [
      {
        round: {
          type: Number,
          required: true,
        },
        matches: [
          {
            white: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            black: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            result: {
              type: String,
              enum: ["1-0", "0-1", "1/2-1/2", "pending"],
              default: "pending",
            },
            gameRef: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "ChessGame",
            },
          },
        ],
      },
    ],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Individual player for Single type
    },
    winnerTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team", // For Team type tournaments
    },
    tournamentAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

chessTournamentSchema.pre("save", function (next) {
  if (!this.isModified("updatedAt")) {
    this.updatedAt = Date.now();
  }
  next();
});

chessTournamentSchema.index({ status: 1, startDate: 1 });
chessTournamentSchema.index({ tournamentSystem: 1 });
chessTournamentSchema.index({ timeControl: 1 });

const ChessTournament = mongoose.model("ChessTournament", chessTournamentSchema);
export default ChessTournament;