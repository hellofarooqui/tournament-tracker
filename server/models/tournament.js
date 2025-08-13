import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
       
        trim: true,     
    },
    startDate: {
        type: Date,
      
    },
    endDate: {
        type: Date,
       
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;