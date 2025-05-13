
import Users from "../models/Users.js";
import Movies from "../models/Movies.js";


//get most popular movies
export const getMostPopularMovies = async (req, res) => {
    try {
        const movies = await Movies.find({ averageRating: { $gt: 7 } }).sort({ averageRating: -1 }).limit(10);
        const popularMovies = movies.map(movie => ({
            name: movie.title,
            rating: movie.averageRating
        }));
        res.status(200).json(popularMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get user activity by last login
export const getUserActivity = async (req, res) => {
    try {
        const users = await Users.find().sort({ lastLogin: -1 }).limit(10);
        const userActivity = users.map(user => ({ //map user data to new object
            name: user.name,
            email: user.email,
            lastLogin: user.lastLogin,
            loginCount: user.lastLogin.length
        }));
        res.status(200).json(userActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get most searched actors
export const getMostSearchedActors = async (req, res) => {
    try {
        const actors = await Movies.aggregate([ //aggregate movies collection
            { $unwind: "$cast" }, //deconstruct cast array
            { $group: { _id: "$cast", count: { $sum: 1 } } }, //group by cast and count
            { $sort: { count: -1 } }, //sort by count in descending order
            { $limit: 10 } //limit to 10 results
        ]);
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get trending genres
export const getTrendingGenres = async (req, res) => {
    try {
        const genres = await Movies.aggregate([
            { $unwind: "$genre" },
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};