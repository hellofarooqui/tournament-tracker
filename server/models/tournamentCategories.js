import mongoose from 'mongoose';

const tournamentCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    icon:{
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TournamentCategory = mongoose.model('TournamentCategory', tournamentCategorySchema);

export default TournamentCategory;

