import Movie from '../models/Movies.js';
import MovieNews from '../models/MovieNews.js';

//add news
export const addMovieNews = async (req, res) => {
    const { title, content, aboutMovie } = req.body;

    try {
        const movieNews = await MovieNews.create({ title, content, aboutMovie });
        res.status(201).json(movieNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all news
export const getAllMovieNews = async (req, res) => {
    try {
        const movieNews = await MovieNews.find().populate('aboutMovie', 'title');

        if (!movieNews || movieNews.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }

        res.status(200).json(movieNews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get news by movie title
export const getMovieNewsByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        const movie = await Movie.findOne({ title });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const movieNews = await MovieNews.find({ aboutMovie: movie._id }).populate('aboutMovie', 'title');

        if (!movieNews || movieNews.length === 0) {
            return res.status(404).json({ message: 'No news found for this movie' });
        }

        res.status(200).json(movieNews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};