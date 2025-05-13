
//Models/Movies.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    directors: { //array of director ids
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Director',
        required: true,
    },
    cast: { //array of actor ids
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Actors',
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    runtime: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
        required: true,
    },
    trivia: {
        type: String,
    },
    goofs: {
        type: String,
    },
    soundtrack: {
        type: String,
    },
    ageRating: {
        type: String,
        required: true,
    },
});



const Movie = mongoose.model('Movies', movieSchema);

export default Movie;