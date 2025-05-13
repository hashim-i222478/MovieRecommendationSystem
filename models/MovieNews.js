import mongoose from "mongoose";

const MovieNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    aboutMovie: { //movie id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MovieNews = mongoose.model('MovieNews', MovieNewsSchema);

export default MovieNews;