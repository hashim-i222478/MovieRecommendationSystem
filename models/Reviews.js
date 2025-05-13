// Purpose: Define the schema for the Reviews collection in the database.
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movie: { //movie id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true,
    },
    userId: { //user id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true,
    },

});

const Reviews = mongoose.model('Reviews', reviewSchema);

export default Reviews;