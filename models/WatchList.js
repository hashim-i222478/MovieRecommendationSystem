// Purpose: Define the schema for the watchlist collection in the database.
import mongoose from 'mongoose';

const watchListSchema = new mongoose.Schema({
    WatchListname: {
        type: String,
        required: true
    },
    movies: [{ //array of movie ids
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    }],
    CreatedBy: { //user who created the watchlist
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    followedBy: [{ //array of user ids who follow the watchlist
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

const WatchList = mongoose.model('WatchList', watchListSchema);

export default WatchList;