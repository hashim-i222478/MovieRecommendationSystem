// Purpose: Define the schema for the BoxOffice model
import mongoose from "mongoose";

const BoxOfficeSchema = new mongoose.Schema({
    movie: { //movie id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    },
    revenue: {
        type: Number,
        required: true
    },
    ticketsSold: {
        type: Number,
        required: true
    }
});

const BoxOffice = mongoose.model('BoxOffice', BoxOfficeSchema);

export default BoxOffice;