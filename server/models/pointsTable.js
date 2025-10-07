import mongoose from "mongoose";

const tableEntrySchema = new mongoose.Schema({
    teamType:{
        type: String,
        enum: ['Team', 'User'],
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'teamType',
        required: true,
    },
    points: {
        type: Number,
  
        default: 0,
    },
    gamesPlayed: {
        type: Number,
      
        default: 0,
    },
    wins: {
        type: Number,
   
        default: 0,
    },
    losses: {
        type: Number,
    
        default: 0,
    },
    draws: {
        type: Number,
  
        default: 0,
    },
    results: [{
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
            required: true,
        },
        result: {
            type: String,
            enum: ['win', 'loss', 'draw'],
            required: true,
        },
    }]
})

const pointsTableSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    entries: [tableEntrySchema],

});
const PointsTable = mongoose.model("PointsTable", pointsTableSchema);
export default PointsTable;

