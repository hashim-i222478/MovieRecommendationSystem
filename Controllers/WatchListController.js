import Movie from "../models/Movies.js";
import WatchList from "../models/WatchList.js";
import Users from "../models/Users.js";


//create a new watchlist
export const createWatchList = async (req, res) => {
    try {
        const { WatchListname, movieNames } = req.body; //get watchlist name and movie names from request body

        const movies = await Movie.find({ title: { $in: movieNames } }); //find movies with the given titles
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'Movies not found' });
        }
        
        const watchList = new WatchList({ //create a new watchlist
            WatchListname,
            movies,
            CreatedBy: req.user.id
        });

        await watchList.save(); //save the watchlist to the database
        res.status(201).json({ message: 'Watchlist created', watchList });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all watchlists with movie titles and user names
export const getAllWatchLists = async (req, res) => {
    try {
        const watchLists = await WatchList.find() //find all watchlists
            .populate({ //populate the movies field with movie titles
                path: 'movies',
                select: 'title'
            });
           
        
        if (!watchLists || watchLists.length === 0) {
            return res.status(404).json({ message: 'No watchlists found' });
        }

        const watchListsWithDetails = watchLists.map(watchList => ({ //map the watchlists to an array of objects with required fields
            WatchListname: watchList.WatchListname, 
            movies: watchList.movies.map(movie => movie.title),
            CreatedBy: watchList.CreatedBy.name,
            followedBy: watchList.followedBy.map(user => user.name)
        }));

        res.status(200).json(watchListsWithDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get watchlist of the user with movie titles and user names
export const getWatchList = async (req, res) => {
    try {
        const watchList = await WatchList.find({ CreatedBy: req.user.id })
            .populate({
                path: 'movies',
                select: 'title'
            })
            .populate({
                path: 'CreatedBy',
                select: 'name'
            })
            .populate({
                path: 'followedBy',
                select: 'name'
            });

        if (!watchList || watchList.length === 0) {
            return res.status(404).json({ message: 'No watchlist found' });
        }

        const watchListWithDetails = watchList.map(wl => ({
            WatchListname: wl.WatchListname,
            movies: wl.movies.map(movie => movie.title),
            CreatedBy: wl.CreatedBy.name,
            followedBy: wl.followedBy.map(user => user.name)
        }));

        res.status(200).json(watchListWithDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Follow a watchlist by name
export const followWatchListByName = async (req, res) => {
    try {
        const { WatchListname } = req.body;
        const watchList = await WatchList.findOne({ WatchListname });
        if (!watchList) {
            return res.status(404).json({ message: 'Watchlist not found' });
        }
        watchList.followedBy.push(req.user.id);
        await watchList.save();
        res.status(200).json(watchList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all watchlists followed by the user with movie titles and user names
export const getFollowedWatchLists = async (req, res) => {
    try {
        const watchLists = await WatchList.find({ followedBy: req.user.id })
            .populate({
                path: 'movies',
                select: 'title'
            })
            .populate({
                path: 'CreatedBy',
                select: 'name'
            })
            .populate({
                path: 'followedBy',
                select: 'name'
            });

        if (!watchLists || watchLists.length === 0) {
            return res.status(404).json({ message: 'No watchlists found' });
        }

        const watchListsWithDetails = watchLists.map(watchList => ({
            WatchListname: watchList.WatchListname,
            movies: watchList.movies.map(movie => movie.title),
            CreatedBy: watchList.CreatedBy.name,
            followedBy: watchList.followedBy.map(user => user.name)
        }));

        res.status(200).json(watchListsWithDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

