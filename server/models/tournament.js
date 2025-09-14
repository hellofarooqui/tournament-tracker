// import mongoose from "mongoose";

// const tournamentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,

//     trim: true,
//   },
// startDate: {
//   type: Date,
// },
// endDate: {
//   type: Date,
//   validate: {
//     validator: function(value) {
//       return value > this.startDate;
//     },
//     message: "End date must be after the start date.",
//   },
// },
//   type:{
//     type: String,
//     enum: ["Single", "Team"],
//     default: "Team",
//   },
//   format:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "GameFormat",
//     //required: true,
//   },
//   games: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Game",
//       //required: true,
//     },
//   ],
//   teams: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Team",
//     },
//   ],
//   groups: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Group",
//     },
//   ],
//   enrolledUser: [
//     {
//       user:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       unique: true,
//     },
//     assigned: {
//       type: Boolean,
//       default: false,
//     },
//     assignedGroup: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Group",
//       required: function() {
//         return this.assigned === true; // Only require if assigned is true
//       },
//     },
//     }
//   ],
//   status: {
//     type: String,
//     enum: ["scheduled", "live", "completed", "cancelled"],
//     default: "scheduled",
//   },
//   pointsTable: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "PointsTable",
//   },
//   winner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Team",
//   },
//   tournamentAdmin:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// tournamentSchema.pre("save", function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// tournamentSchema.index({ status: 1, startDate: 1 });


// const Tournament = mongoose.model("Tournament", tournamentSchema);
// export default Tournament;

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
        validator: function(value) {
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
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          unique: true,
        },
        assigned: {
          type: Boolean,
          default: false,
        },
        assignedGroup: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
          required: function() {
            return this.assigned === true;
          },
        },
      },
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
