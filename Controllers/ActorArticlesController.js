// Desc: Actor Articles Controller
//controller
import ActorNewArticle from '../models/ActorNewArticles.js';
import Actor from '../models/Actors.js';

//add article
export const addActorArticle = async (req, res) => {
    const { title, content, aboutActor } = req.body;

    try {
        const actorArticle = await ActorNewArticle.create({ title, content, aboutActor });
        res.status(201).json(actorArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all articles
export const getAllActorArticles = async (req, res) => {
    try {
        const actorArticles = await ActorNewArticle.find()
        .populate('aboutActor', 'name'); //populate aboutActor field with name

        if (!actorArticles || actorArticles.length === 0) {
            return res.status(404).json({ message: 'No articles found' });
        }

        res.status(200).json(actorArticles);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get articles by actor name
export const getActorArticles = async (req, res) => {
    const { aboutActor } = req.params;

    try {
        const actor = await Actor.findOne({ name: aboutActor });

        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }

        const actorArticles = await ActorNewArticle.find({ aboutActor: actor._id })
        .populate('aboutActor', 'name');

        if (!actorArticles || actorArticles.length === 0) {
            return res.status(404).json({ message: 'No articles found for the given actor name' });
        }

        res.status(200).json(actorArticles);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};