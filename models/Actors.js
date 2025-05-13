//actors.js

import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
    
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

const Actors = mongoose.model('Actors', actorSchema);

export default Actors;