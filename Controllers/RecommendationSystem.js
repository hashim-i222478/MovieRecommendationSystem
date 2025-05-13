import Movie from '../models/Movies.js';
import Users from '../models/Users.js';
import Reviews from '../models/Reviews.js';
// Recommendation Algorithm
export const getRecommendations = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate('wishlist');
        const userPreferences = user.preferences;

        // Find movies based on user preferences and ratings greater than 7
        const recommendedMovies = await Movie.find({
            genre: { $in: userPreferences },
            averageRating: { $gt: 7 }
        }).sort({ averageRating: -1 }).limit(10).select('title averageRating');

        if (recommendedMovies.length === 0) {
            return res.status(404).json({ message: 'No recommendations found' });
        }

        res.status(200).json(recommendedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Similar Titles Section
export const getSimilarTitles = async (req, res) => {
    
    try {
        const movie = await Movie.findById(req.params.movieId);
        const similarMovies = await Movie.find({ // Find movies with the same genre or director
            $or: [
                { genre: movie.genre }, 
                { directors: { $in: movie.directors } }
            ],
            _id: { $ne: req.params.movieId }
        }).sort({ averageRating: -1 }).limit(10).select('title averageRating');

        if (similarMovies.length === 0) {
            return res.status(404).json({ message: 'No similar movies found' });
        }

        res.status(200).json(similarMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Personalized Recommendations
export const getPersonalizedRecommendations = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate('wishlist');
        const userPreferences = user.preferences;

        // Find movies based on user preferences and wishlist
        const personalizedMovies = await Movie.find({
            genre: { $in: userPreferences },
            _id: { $nin: user.wishlist }
        }).sort({ averageRating: -1 }).limit(10).select('title averageRating');

        res.status(200).json(personalizedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Trending Movies
export const getTrendingMovies = async (req, res) => {
    try { // Find movies sorted by release date and average rating
        const trendingMovies = await Movie.find().sort({ releaseDate: -1, averageRating: -1 }).limit(10).select('title averageRating');
        res.status(200).json(trendingMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Top Rated Movies
export const getTopRatedMovies = async (req, res) => {
    try { // Find movies sorted by average rating
        const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(10).select('title averageRating');
        res.status(200).json(topRatedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
