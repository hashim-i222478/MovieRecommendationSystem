// Description: This file contains the logic for the discussion routes.
import Discussion from '../models/Discussion.js';
import User from '../models/Users.js';
import Movie from '../models/Movies.js';

//create a discussion
export const createDiscussion = async (req, res) => {
   
   try{
    const { title, content, movietitle, genre } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const movie = await Movie.findOne({ title: movietitle });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    const discussion = new Discussion({
        title,
        content,
        author: user._id,
        movie: movie._id,
        genre
    });

    await discussion.save();

    res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//get all discussions
export const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('author', 'name')
            .populate('movie', 'title')
            .populate({
                path: 'comments.author',
                select: 'name'
            });

        if (!discussions || discussions.length === 0) {
            return res.status(404).json({ message: 'No discussions found' });
        }
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//add comment to a discussion
export const addComment = async (req, res) => {
    const { content } = req.body;
    const Userid = req.user.id;

    try {
        //const discussion = await Discussion.findById(req.params.id);
        const discussion = await Discussion.findOne({ title: req.params.title });

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        console.log(Userid);
        const user = await User.findById(Userid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newComment = {
            content,
            author: user._id
        };

        discussion.comments.push(newComment);

        await discussion.save();

        res.status(201).json(discussion);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    
    }

};