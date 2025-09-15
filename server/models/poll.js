import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    nominations: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        votes: { type: Number, default: 0 }
    }],
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;