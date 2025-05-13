//director.js
import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    filmography: [{ //array of movie ids
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    }],
    biography: {
        type: String,
        required: true
    },
    awards: {
        type: String,
        required: true
    }
});

const Director = mongoose.model('Director', directorSchema);

export default Director;