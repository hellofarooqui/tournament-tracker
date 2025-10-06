
import mongoose from "mongoose";

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
      enum: ["Single", "Team"],
      default: "Team",
    },
    format: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TournamentFormat",
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
      }
    }
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
      }
    ],
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
    pointsTable: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PointsTable",
    }],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tournamentAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

tournamentSchema.pre("save", function (next) {
  if (!this.isModified("updatedAt")) {
    this.updatedAt = Date.now();
  }
  next();
});

tournamentSchema.index({ status: 1, startDate: 1 });

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;
