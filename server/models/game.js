import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',    
    },
    scheduledDate : {
        type: Date,
    }
})

const Game = mongoose.model("Game", gameSchema);
export default Game;
