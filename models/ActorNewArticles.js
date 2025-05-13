import mongoose from 'mongoose';

const ActorNewArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    aboutActor: { //actor id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actors'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ActorNewArticle = mongoose.model('ActorNewArticle', ActorNewArticleSchema);

export default ActorNewArticle;
