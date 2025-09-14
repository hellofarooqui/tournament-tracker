import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }
  ],
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  pointsTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointsTable",
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

groupSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Group = mongoose.model("Group", groupSchema);

export default Group;