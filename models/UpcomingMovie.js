import mongoose from 'mongoose';

const UpcomingMovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    }
});

const UpcomingMovie = mongoose.model('UpcomingMovie', UpcomingMovieSchema);

export default UpcomingMovie;