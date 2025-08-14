import mongoose from "mongoose";

const tableEntrySchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    gamesPlayed: {
        type: Number,
        required: true,
        default: 0,
    },
    wins: {
        type: Number,
        required: true,
        default: 0,
    },
    losses: {
        type: Number,
        required: true,
        default: 0,
    },
    draws: {
        type: Number,
        required: true,
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
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    entries: [tableEntrySchema],

});
const PointsTable = mongoose.model("PointsTable", pointsTableSchema);
export default PointsTable;

