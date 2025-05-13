//controller for director

import Director from '../models/Directors.js';

//create director
export const createDirector = async (req, res) => {
    const director = new Director(req.body);
    try {
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
