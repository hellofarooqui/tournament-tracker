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
    games : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        //required: true,
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    pointsTable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PointsTable',
        //required: true,
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

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;