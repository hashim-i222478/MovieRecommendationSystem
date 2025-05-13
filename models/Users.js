//Users.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        type: [String],
        required: true
    },
    wishlist: [{ //array of movie ids
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    }],
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    lastLogin: {
        type: [Date]
    }

});

const Users = mongoose.model('Users', userSchema);

export default Users;