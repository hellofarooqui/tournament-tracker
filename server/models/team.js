import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  // members: [
  //   {type: String}
  // ],
  tournaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
