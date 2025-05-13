import Movie from '../models/Movies.js';
import Actor from '../models/Actors.js';
import Director from '../models/Directors.js';

//add movie
export const addMovie = async (req, res) => {

    const { title, genre, directors, cast, releaseDate, runtime, synopsis, averageRating, trivia, goofs, soundtrack, ageRating } = req.body;

    const movie = new Movie({ title, genre, directors, cast, releaseDate, runtime, synopsis, averageRating, trivia, goofs, soundtrack, ageRating });

    try {
        await movie.save();
        res.status(201).json({ message: "movie added successfully with details: ", movie });
    } catch (error) {
        res.status(409).json({ message: "unable to add movie" });
    }

    //save the movie in the filmography of the actors of the movie
    for (let i = 0; i < req.body.cast.length; i++) {
        const actor = await Actor.findById(req.body.cast[i]);
        if (actor) {
            actor.filmography.push(movie._id);
            await actor.save();
        }
    }

    //save the movie in the filmography of the directors of the movie
    for (let i = 0; i < req.body.directors.length; i++) {
        const director = await Director.findById(req.body.directors[i]);
        if (director) {
            director.filmography.push(movie._id);
            await director.save();
        }
    }

};

//update movie
export const updateMovie = async (req, res) => {
    
    //update by name
    try {
        const movie = await Movie.findOneAndUpdate({ title: req.params.title }, req.body, { new: true });
        res.status(200).json({ message: "movie updated successfully with details: ", movie });
    } catch (error) {
        res.status(404).json({ message: "unable to update movie" });
    }

};

//delete movie
export const deleteMovie = async (req, res) => {
    try {
        //find movie by title and delete
        await Movie.findOneAndDelete({ title: req.params.title });
        res.status(200).json({ message: "movie deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "unable to delete movie" });
    }
};

//get directors of a movie
export const getDirectorsOfMovie = async (req, res) => {
    try {
        const movie = await Movie.find({ title: req.params.title }).select('title directors');
        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({ message: "unable to get directors of movie" });
    }
};

//get cast of a movie
export const getCastOfMovie = async (req, res) => {
    try {
        const cast = await Movie.find({ title: req.params.title }).select('cast');
        res.status(200).json(cast);
    } catch (error) {
        res.status(404).json({ message: "unable to get cast of movie" });
    }
};

//get age rating of a movie
export const getAgeRatingOfMovie = async (req, res) => {
    try {
        const ageRating = await Movie.find({ title: req.params.title }).select('ageRating');
        res.status(200).json(ageRating);
    } catch (error) {
        res.status(404).json({ message: "unable to get age rating of movie" });
    }
};

//get movie details by title
export const getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.find({ title: req.params.title });
        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({ message: "unable to get movie details" });
    }
};

//get all movies
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get movies" });
    }
};

//get most popular movies
export const getMostPopularMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ averageRating: -1 }).limit(10);
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get most popular movies" });
    }
};

//seaarch movies by genre
//in the output get title, genre, directors names, cast names, releaseDate, runtime, synopsis, averageRating
export const searchMoviesByGenre = async (req, res) => {
    try {
        const movies = await Movie.find({ genre: req.params.genre });
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found with the genre', genre: req.params.genre });
        }
        // movies
        //     .populate({ path: 'directors', select: 'name' })
        //     .populate({ path: 'cast', select: 'name' });
           // .select('title genre directors cast releaseDate runtime synopsis averageRating');
        res.status(200).json(movies);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "unable to search movies by genre" });
    }
}

//search movies by actors
//in the output get title, genre, directors names, cast names, releaseDate, runtime, synopsis, averageRating
export const searchMoviesByActors = async (req, res) => {
    try {
        const movies = await Movie.find({ cast: req.params.actorId });
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found with the actor', actorId: req.params.actorId });
        }
        // movies
        //     .populate({ path: 'directors', select: 'name' })
        //     .populate({ path: 'cast', select: 'name' })
        //     .select('title genre directors cast releaseDate runtime synopsis averageRating');
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(404).json({ message: "unable to search movies by actors" });
    }
};

//search movies by directors
//in the output get title, genre, directors names, cast names, releaseDate, runtime, synopsis, averageRating
export const searchMoviesByDirectors = async (req, res) => {
    try {
        const movies = await Movie.find({ directors: req.params.directorId });
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found with the director', directorId: req.params.directorId });
        }
        // movies
        //     .populate({ path: 'directors', select: 'name' })
        //     .populate({ path: 'cast', select: 'name' })
        //     .select('title genre directors cast releaseDate runtime synopsis averageRating');
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(404).json({ message: "unable to search movies by directors" });
    }
};


//get movies by rating
export const getMoviesByRating = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ averageRating: -1 })
            .populate({ path: 'directors', select: 'name' })
            .populate({ path: 'cast', select: 'name' })
            .select('title genre directors cast releaseDate runtime synopsis averageRating');

            if (!movies || movies.length === 0) {
                return res.status(404).json({ message: 'No movies found' });
            }

        res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "unable to get movies by rating", error });
    }
};

//get movies by release year
export const getMoviesByReleaseYear = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ releaseDate: -1 })
            .populate({ path: 'directors', select: 'name' })
            .populate({ path: 'cast', select: 'name' })
            .select('title genre directors cast releaseDate runtime synopsis averageRating');
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get movies by release year" });
    }
};

//get movies by release decade
export const getMoviesByReleaseDecade = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ releaseDate: -1 })
            .populate({ path: 'directors', select: 'name' })
            .populate({ path: 'cast', select: 'name' })
            .select('title genre directors cast releaseDate runtime synopsis averageRating');
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get movies by release decade" });
    }
};


//get top movies of the month
export const getTopMoviesOfTheMonth = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth();
        const movies = await Movie.find({
            releaseDate: { //get movies released in the current month
                $gte: new Date(new Date().setMonth(currentMonth, 1)), //get movies released in the current month
                $lt: new Date(new Date().setMonth(currentMonth + 1, 1)) //get movies released in the next month
            }
        })
            .sort({ averageRating: -1 })
            .limit(10)
            .populate({ path: 'directors', select: 'name' })
            .populate({ path: 'cast', select: 'name' })
            .select('title genre directors cast releaseDate runtime synopsis averageRating');

            if (!movies || movies.length === 0) {
                return res.status(404).json({ message: 'No movies found' });
            }

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get top movies of the month" });
    }
};

//get top 10 movies by genre
export const getTop10MoviesByGenre = async (req, res) => {
    try {
        const movies = await Movie.find({ genre: req.params.genre })
            .sort({ averageRating: -1 })
            .limit(10)
            .populate({ path: 'directors', select: 'name' })
            .populate({ path: 'cast', select: 'name' })
            .select('title genre directors cast releaseDate runtime synopsis averageRating');

            if (!movies || movies.length === 0) {
                return res.status(404).json({ message: 'No movies found with the genre', genre: req.params.genre });
            }

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: "unable to get top 10 movies by genre" });
    }
};


