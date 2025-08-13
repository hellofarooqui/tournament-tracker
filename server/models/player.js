import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,     
    },
    games:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',    
    }]
})

const Player = mongoose.model("Player", playerSchema);
export default Player;