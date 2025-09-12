import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  teams : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    }
  ]})

  const Group = mongoose.model("Group", groupSchema);
  
export default Group;