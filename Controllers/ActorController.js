import Actor from '../models/Actors.js';

//add actor
export const addActor = async (req, res) => {
    const { name, biography, awards } = req.body;
    try {
        const actor = new Actor({ name, biography, awards });
        await actor.save();
        res.status(201).send({ message: 'Actor added successfully', data: actor });
    } catch (error) {
        res.status(400).send({ message: 'Error adding actor', error: error.message });
    }
};

//get actor awards
export const getActorAwards = async (req, res) => {
    const { name } = req.params;
    try {
        const actor = await Actor.findOne ({ name });
        if (!actor) {
            return res.status(404).send({ message: 'Actor not found' });
        }
        res.status(200).send({ message: 'Actor awards', data: actor.awards });
    }
    catch (error) {
        res.status(500).send({ message: 'Error getting actor awards', error: error.message });
    }
};

//get all actors
export const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        if (!actors || actors.length === 0) {
            return res.status(404).send({ message: 'No actors found' });
        }
        res.status(200).send({ message: 'All actors', data: actors });
    } catch (error) {
        res.status(500).send({ message: 'Error getting actors', error: error.message });
    }
};

