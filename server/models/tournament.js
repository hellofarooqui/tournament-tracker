import mongoose from "mongoose";
import { TOURNAMENT_FORMATS, TOURNAMENT_STATUS } from "../constants/carromConstants.js";

const tournamentSchema = new mongoose.Schema(
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
      enum: ["Single", "Doubles", "Team"],
      default: "Team",
    },
    format: {
      type: String,
      enum: TOURNAMENT_FORMATS,
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
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
      enum: TOURNAMENT_STATUS,
      default: "scheduled",
    },
    pointsTable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PointsTable",
      },
    ],

    // Winner with dynamic reference (Team or User based on tournament type)
    winnerType: {
      type: String,
      enum: ["Team", "User"],
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "winnerType", // Dynamic reference
    },

    // // Runner-up with dynamic reference
    // runnerUpType: {
    //   type: String,
    //   enum: ["Team", "User"],
    // },
    // runnerUp: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   refPath: "runnerUpType",
    // },

    // // Third place with dynamic reference
    // thirdPlaceType: {
    //   type: String,
    //   enum: ["Team", "User"],
    // },
    // thirdPlace: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   refPath: "thirdPlaceType",
    // },

    tournamentAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Pre-save middleware to auto-set winner/runner-up/third place types based on tournament type
tournamentSchema.pre("save", function (next) {
  // Auto-set winnerType based on tournament type when winner is set
  if (this.isModified("winner") && this.winner && !this.winnerType) {
    this.winnerType = this.type === "Single" ? "User" : "Team";
  }

  // // Auto-set runnerUpType based on tournament type when runnerUp is set
  // if (this.isModified("runnerUp") && this.runnerUp && !this.runnerUpType) {
  //   this.runnerUpType = this.type === "Single" ? "User" : "Team";
  // }

  // // Auto-set thirdPlaceType based on tournament type when thirdPlace is set
  // if (this.isModified("thirdPlace") && this.thirdPlace && !this.thirdPlaceType) {
  //   this.thirdPlaceType = this.type === "Single" ? "User" : "Team";
  // }

  if (!this.isModified("updatedAt")) {
    this.updatedAt = Date.now();
  }

  next();
});

// Indexes
tournamentSchema.index({ status: 1, startDate: 1 });
tournamentSchema.index({ type: 1, status: 1 });
tournamentSchema.index({ tournamentAdmin: 1 });

// Method to set winner
tournamentSchema.methods.setWinner = function (winnerId) {
  this.winner = winnerId;
  this.winnerType = this.type === "Single" ? "User" : "Team";
  return this.save();
};

// Method to set runner-up
tournamentSchema.methods.setRunnerUp = function (runnerUpId) {
  this.runnerUp = runnerUpId;
  this.runnerUpType = this.type === "Single" ? "User" : "Team";
  return this.save();
};

// Method to set third place
tournamentSchema.methods.setThirdPlace = function (thirdPlaceId) {
  this.thirdPlace = thirdPlaceId;
  this.thirdPlaceType = this.type === "Single" ? "User" : "Team";
  return this.save();
};

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;
