import mongoose from "mongoose";
import { CARROM_GAME_STAGES, FOUL_TYPES, GAME_STATUS, WIN_TYPES } from "../../../constants/carromConstants";

const carromGameSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      trim: true,
    },
    
    // Tournament Reference
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    
    // Tournament Stage Information
    stage: {
      type: String,
      enum: CARROM_GAME_STAGES,
      required: true,
    },
    
    // Round and Match Details
    round: {
      type: Number, // e.g., Round 1, Round 2
      required: true,
    },
    matchNumber: {
      type: String, // e.g., "M1", "QF1", "SF2", "F"
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    
    // Teams (exactly 2 teams per match)
    team1: {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      // Players representing this team in this match
      players: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      // Side assignment
      side: {
        type: String,
        enum: ["white", "black"],
      },
    },
    
    team2: {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      players: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      side: {
        type: String,
        enum: ["white", "black"],
      },
    },
    
    // Toss
    toss: {
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      choice: {
        type: String,
        enum: ["white", "black"],
      },
    },
    
    // Scheduling
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTime: {
      type: String, // e.g., "10:00 AM"
    },
    actualStartTime: {
      type: Date,
    },
    actualEndTime: {
      type: Date,
    },
    duration: {
      type: Number, // Duration in minutes
    },
    
    // Venue
    board: {
      type: String, // Board number/identifier (e.g., "Board 1", "Court A")
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    
    // Game Status
    status: {
      type: String,
      enum: GAME_STATUS,
      default: "scheduled",
    },
    
    // Match Result
    result: {
      // Winner and Loser
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      loser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      
      // Win Type
      winType: {
        type: String,
        enum: WIN_TYPES,
        default: "normal",
      },
      
      // Final Score (coins pocketed by each team)
      team1Score: {
        type: Number,
        default: 0,
        min: 0,
        max: 9, // Maximum 9 coins per side
      },
      team2Score: {
        type: Number,
        default: 0,
        min: 0,
        max: 9,
      },
      
      // Remaining Coins of Loser (for bonus calculation)
      loserRemainingCoins: {
        type: Number,
        default: 0,
        min: 0,
        max: 9,
      },
      
      // Queen Details
      queenPocketedBy: {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        covered: {
          type: Boolean,
          default: false,
        },
      },
      
      // Points Breakdown (for Points Table)
      pointsAwarded: {
        // Base points for winning
        basePoints: {
          type: Number,
          default: 0, // Winner gets 2, Loser gets 0
        },
        // Bonus score based on remaining coins + queen
        bonusScore: {
          type: Number,
          default: 0,
        },
        // Total = basePoints + bonusScore
        totalPoints: {
          type: Number,
          default: 0,
        },
        // Calculation breakdown string
        calculation: {
          type: String, // e.g., "2 (win) + 7 (coins) + 5 (queen) = 14"
        },
      },
    },
    
    // Detailed Game Statistics
    statistics: {
      // Total strikes in the game
      totalStrikes: {
        type: Number,
        default: 0,
      },
      
      // Individual Player Performance
      playerStats: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
          coinsPocketed: {
            type: Number,
            default: 0,
          },
          strikes: {
            type: Number,
            default: 0,
          },
          successfulStrikes: {
            type: Number,
            default: 0,
          },
          accuracy: {
            type: Number, // Percentage
            default: 0,
          },
          foulsCommitted: {
            type: Number,
            default: 0,
          },
        },
      ],
      
      // Fouls (recorded but not penalized in points)
      fouls: {
        team1: {
          count: {
            type: Number,
            default: 0,
          },
          details: [
            {
              player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
              foulType: {
                type: String,
                enum: FOUL_TYPES,
              },
              strikeNumber: {
                type: Number,
              },
              timestamp: {
                type: Date,
                default: Date.now,
              },
              notes: {
                type: String,
                trim: true,
              },
            },
          ],
        },
        team2: {
          count: {
            type: Number,
            default: 0,
          },
          details: [
            {
              player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
              foulType: {
                type: String,
                enum: FOUL_TYPES,
              },
              strikeNumber: {
                type: Number,
              },
              timestamp: {
                type: Date,
                default: Date.now,
              },
              notes: {
                type: String,
                trim: true,
              },
            },
          ],
        },
      },
      
      // Breaks (consecutive successful pockets)
      breaks: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
          coinsPocketed: {
            type: Number,
            min: 2,
          },
          startStrike: {
            type: Number,
          },
          endStrike: {
            type: Number,
          },
        },
      ],
    },
    
    // Match Officials
    referee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    umpire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    scorer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    // Additional Information
    notes: {
      type: String,
      trim: true,
    },
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    
    // Walkover/Forfeit Details
    walkoverDetails: {
      reason: {
        type: String,
        trim: true,
      },
      absentTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    
    // Media
    media: {
      photos: [
        {
          type: String, // URL
        },
      ],
      video: {
        type: String, // URL
      },
    },
    
    // Verification and Approval
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: {
      type: Date,
    },
    
    // Signatures (for official records)
    signatures: {
      team1Captain: {
        signed: {
          type: Boolean,
          default: false,
        },
        signedAt: {
          type: Date,
        },
      },
      team2Captain: {
        signed: {
          type: Boolean,
          default: false,
        },
        signedAt: {
          type: Date,
        },
      },
      referee: {
        signed: {
          type: Boolean,
          default: false,
        },
        signedAt: {
          type: Date,
        },
      },
    },
  },
  { timestamps: true }
);

// Indexes
carromGameSchema.index({ tournament: 1, stage: 1, round: 1 });
carromGameSchema.index({ scheduledDate: 1, status: 1 });
carromGameSchema.index({ "result.winner": 1 });
carromGameSchema.index({ "team1.team": 1, "team2.team": 1 });
carromGameSchema.index({ status: 1 });
carromGameSchema.index({ group: 1 });

// Virtual for game duration
carromGameSchema.virtual("gameDuration").get(function () {
  if (this.actualStartTime && this.actualEndTime) {
    return Math.round((this.actualEndTime - this.actualStartTime) / (1000 * 60));
  }
  return null;
});

// Virtual for total fouls
carromGameSchema.virtual("totalFouls").get(function () {
  const team1Fouls = this.statistics?.fouls?.team1?.count || 0;
  const team2Fouls = this.statistics?.fouls?.team2?.count || 0;
  return team1Fouls + team2Fouls;
});

// Method to calculate and award points
carromGameSchema.methods.calculateAndAwardPoints = function () {
  if (!this.result.winner) {
    throw new Error("Winner must be set before calculating points");
  }

  // Base points for winning
  const basePoints = 2;
  
  // Bonus score calculation
  let bonusScore = 0;
  
  // Add points for remaining coins of loser
  bonusScore += this.result.loserRemainingCoins || 0;
  
  // Add points if winner pocketed and covered the queen
  if (
    this.result.queenPocketedBy?.team?.equals(this.result.winner) &&
    this.result.queenPocketedBy?.covered === true
  ) {
    bonusScore += 5; // Queen bonus
  }
  
  // Total points
  const totalPoints = basePoints + bonusScore;
  
  // Build calculation string
  let calculation = `${basePoints} (win)`;
  if (this.result.loserRemainingCoins > 0) {
    calculation += ` + ${this.result.loserRemainingCoins} (coins)`;
  }
  if (
    this.result.queenPocketedBy?.team?.equals(this.result.winner) &&
    this.result.queenPocketedBy?.covered
  ) {
    calculation += ` + 5 (queen)`;
  }
  calculation += ` = ${totalPoints}`;
  
  // Update result
  this.result.pointsAwarded = {
    basePoints,
    bonusScore,
    totalPoints,
    calculation,
  };
  
  return {
    basePoints,
    bonusScore,
    totalPoints,
  };
};

// Method to record a foul
carromGameSchema.methods.recordFoul = function (
  teamNumber,
  playerId,
  foulType,
  strikeNumber,
  notes = ""
) {
  const teamKey = `team${teamNumber}`;

  if (!this.statistics.fouls[teamKey]) {
    this.statistics.fouls[teamKey] = { count: 0, details: [] };
  }

  this.statistics.fouls[teamKey].count += 1;
  this.statistics.fouls[teamKey].details.push({
    player: playerId,
    foulType,
    strikeNumber,
    timestamp: new Date(),
    notes,
  });

  return this.save();
};

// Method to start the game
carromGameSchema.methods.startGame = function () {
  if (this.status !== "scheduled") {
    throw new Error("Game must be scheduled to start");
  }
  this.status = "in-progress";
  this.actualStartTime = new Date();
  return this.save();
};

// Method to complete the game
carromGameSchema.methods.completeGame = function (resultData) {
  if (this.status !== "in-progress") {
    throw new Error("Game must be in progress to complete");
  }

  this.status = "completed";
  this.actualEndTime = new Date();
  this.duration = this.gameDuration;

  // Merge result data
  if (resultData) {
    this.result = { ...this.result, ...resultData };
  }

  // Calculate and award points
  this.calculateAndAwardPoints();

  return this.save();
};

// Method to record walkover
carromGameSchema.methods.recordWalkover = function (
  winningTeamId,
  absentTeamId,
  reason,
  reportedBy
) {
  this.status = "walkover";
  this.result.winner = winningTeamId;
  this.result.loser = absentTeamId;
  this.result.winType = "walkover";
  
  // Winner gets base 2 points only (no bonus for walkover)
  this.result.pointsAwarded = {
    basePoints: 2,
    bonusScore: 0,
    totalPoints: 2,
    calculation: "2 (walkover)",
  };
  
  this.walkoverDetails = {
    reason,
    absentTeam: absentTeamId,
    reportedBy,
  };
  
  this.actualStartTime = new Date();
  this.actualEndTime = new Date();
  
  return this.save();
};

// Pre-save middleware
carromGameSchema.pre("save", function (next) {
  // Auto-calculate duration if both times are set
  if (this.actualStartTime && this.actualEndTime && !this.duration) {
    this.duration = Math.round(
      (this.actualEndTime - this.actualStartTime) / (1000 * 60)
    );
  }

  // Validate team sides are different
  if (
    this.team1.side &&
    this.team2.side &&
    this.team1.side === this.team2.side
  ) {
    return next(new Error("Teams must have different sides (white/black)"));
  }

  next();
});

// Ensure virtuals are included in JSON
carromGameSchema.set("toJSON", { virtuals: true });
carromGameSchema.set("toObject", { virtuals: true });

const CarromGame = mongoose.model("CarromGame", carromGameSchema);
export default CarromGame;