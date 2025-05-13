import mongoose from "mongoose";

const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: { //user id
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    movie: { //movie id
        type: Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{ //array of comments
        author: { //author id
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;