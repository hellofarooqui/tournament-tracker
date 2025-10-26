import mongoose from "mongoose";

const carromChallengeSchema = new mongoose.Schema(
  {
    // Challenge Type
    challengeType: {
      type: String,
      enum: ["Singles", "Doubles"],
      default: "Singles",
    },
    
    // Players involved
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengerPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // For doubles
    },
    opponent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    opponentPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // For doubles
    },
    
    // Challenge Details
    title: {
      type: String,
      trim: true,
      default: "Carrom Challenge",
    },
    description: {
      type: String,
      trim: true,
    },
    
    // Game Settings
    gameFormat: {
      type: String,
      enum: ["Points", "Boards"],
      default: "Points",
    },
    pointsToWin: {
      type: Number,
      default: 25,
      min: 15,
      max: 50,
    },
    numberOfBoards: {
      type: Number,
      default: 1, // Single board game by default
      min: 1,
      max: 5,
    },
    timeLimit: {
      type: Number, // Minutes per game
      default: 30,
    },
    
    // Stakes (optional)
    isStaked: {
      type: Boolean,
      default: false,
    },
    stakeAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    // Challenge Status
    status: {
      type: String,
      enum: [
        "pending",      // Challenge sent, awaiting acceptance
        "accepted",     // Challenge accepted, not started
        "declined",     // Challenge declined
        "cancelled",    // Cancelled by challenger
        "live",         // Game in progress
        "completed",    // Game finished
        "expired"       // Challenge expired without response
      ],
      default: "pending",
    },
    
    // Match Scheduling
    proposedDateTime: {
      type: Date,
    },
    acceptedDateTime: {
      type: Date,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    
    // Venue
    venue: {
      name: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      isOnline: {
        type: Boolean,
        default: false,
      },
    },
    
    // Game Reference
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    
    // Match Result
    result: {
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      winnerPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      challengerScore: {
        type: Number,
        default: 0,
      },
      opponentScore: {
        type: Number,
        default: 0,
      },
      boardsWon: {
        challenger: {
          type: Number,
          default: 0,
        },
        opponent: {
          type: Number,
          default: 0,
        },
      },
      resultType: {
        type: String,
        enum: ["victory", "forfeit", "draw", "no-show"],
      },
    },
    
    // Response tracking
    respondedAt: {
      type: Date,
    },
    declineReason: {
      type: String,
      trim: true,
    },
    
    // Expiry
    expiresAt: {
      type: Date,
      default: function() {
        // Challenge expires in 48 hours if not responded
        return new Date(Date.now() + 48 * 60 * 60 * 1000);
      },
    },
    
    // Privacy
    isPublic: {
      type: Boolean,
      default: true, // Public challenges visible to all
    },
    
    // Rematch
    isRematch: {
      type: Boolean,
      default: false,
    },
    previousChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarromChallenge",
    },
    rematchRequested: {
      type: Boolean,
      default: false,
    },
    
    // Notifications
    notificationsSent: {
      challengeSent: {
        type: Boolean,
        default: false,
      },
      challengeAccepted: {
        type: Boolean,
        default: false,
      },
      challengeDeclined: {
        type: Boolean,
        default: false,
      },
      reminderSent: {
        type: Boolean,
        default: false,
      },
    },
    
    // Chat/Comments
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
          trim: true,
          maxlength: 500,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    
    // Rating impact (optional)
    ratingChange: {
      challenger: {
        type: Number,
        default: 0,
      },
      opponent: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Indexes
carromChallengeSchema.index({ challenger: 1, status: 1 });
carromChallengeSchema.index({ opponent: 1, status: 1 });
carromChallengeSchema.index({ status: 1, proposedDateTime: 1 });
carromChallengeSchema.index({ expiresAt: 1 });
carromChallengeSchema.index({ "venue.city": 1, status: 1 });
carromChallengeSchema.index({ isPublic: 1, status: 1 });

// Virtual for challenge participants
carromChallengeSchema.virtual("allParticipants").get(function () {
  const participants = [this.challenger];
  if (this.opponent) participants.push(this.opponent);
  if (this.challengerPartner) participants.push(this.challengerPartner);
  if (this.opponentPartner) participants.push(this.opponentPartner);
  return participants;
});

// Virtual for checking if user is participant
carromChallengeSchema.methods.isParticipant = function(userId) {
  return (
    this.challenger.equals(userId) ||
    (this.opponent && this.opponent.equals(userId)) ||
    (this.challengerPartner && this.challengerPartner.equals(userId)) ||
    (this.opponentPartner && this.opponentPartner.equals(userId))
  );
};

// Virtual for checking if challenge is expired
carromChallengeSchema.virtual("isExpired").get(function () {
  return this.status === "pending" && new Date() > this.expiresAt;
});

// Method to accept challenge
carromChallengeSchema.methods.acceptChallenge = function(userId) {
  if (!this.opponent || !this.opponent.equals(userId)) {
    throw new Error("Only the challenged player can accept");
  }
  if (this.status !== "pending") {
    throw new Error("Challenge cannot be accepted in current state");
  }
  this.status = "accepted";
  this.respondedAt = new Date();
  this.acceptedDateTime = this.proposedDateTime || new Date();
  return this.save();
};

// Method to decline challenge
carromChallengeSchema.methods.declineChallenge = function(userId, reason) {
  if (!this.opponent || !this.opponent.equals(userId)) {
    throw new Error("Only the challenged player can decline");
  }
  if (this.status !== "pending") {
    throw new Error("Challenge cannot be declined in current state");
  }
  this.status = "declined";
  this.respondedAt = new Date();
  this.declineReason = reason;
  return this.save();
};

// Method to cancel challenge
carromChallengeSchema.methods.cancelChallenge = function(userId) {
  if (!this.challenger.equals(userId)) {
    throw new Error("Only the challenger can cancel");
  }
  if (!["pending", "accepted"].includes(this.status)) {
    throw new Error("Challenge cannot be cancelled in current state");
  }
  this.status = "cancelled";
  return this.save();
};

// Method to start game
carromChallengeSchema.methods.startGame = function() {
  if (this.status !== "accepted") {
    throw new Error("Challenge must be accepted before starting");
  }
  this.status = "live";
  this.startedAt = new Date();
  return this.save();
};

// Method to complete game
carromChallengeSchema.methods.completeGame = function(resultData) {
  if (this.status !== "live") {
    throw new Error("Game must be live to complete");
  }
  this.status = "completed";
  this.completedAt = new Date();
  this.result = { ...this.result, ...resultData };
  return this.save();
};

// Pre-save validation
carromChallengeSchema.pre("save", function (next) {
  // Validate doubles requires partners
  if (this.challengeType === "Doubles") {
    if (!this.challengerPartner) {
      return next(new Error("Challenger partner required for doubles"));
    }
    if (this.status !== "pending" && !this.opponentPartner) {
      return next(new Error("Opponent partner required for doubles"));
    }
  }
  
  // Validate stake amount
  if (this.isStaked && this.stakeAmount <= 0) {
    return next(new Error("Stake amount must be greater than 0"));
  }
  
  // Auto-expire pending challenges
  if (this.status === "pending" && new Date() > this.expiresAt) {
    this.status = "expired";
  }
  
  next();
});

// Ensure virtuals are included in JSON
carromChallengeSchema.set("toJSON", { virtuals: true });
carromChallengeSchema.set("toObject", { virtuals: true });

const CarromChallenge = mongoose.model("CarromChallenge", carromChallengeSchema);
export default CarromChallenge;