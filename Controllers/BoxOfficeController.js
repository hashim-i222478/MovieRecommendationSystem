
import BoxOffice from '../models/BoxOffice.js';
import Movie from '../models/Movies.js';

//add box office record to a movie
export const addBoxOfficeToMovie = async (req, res) => {
    try {
        const { movieName, revenue, ticketsSold } = req.body;
        const movie = await Movie.findOne({ title: movieName });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const boxOffice = new BoxOffice({
            movie: movie._id,
            revenue,
            ticketsSold
        });

        await boxOffice.save();
        res.status(201).json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all box office records with movie title
export const getBoxOfficeWithMovieTitle = async (req, res) => {
    const { title } = req.params;

    try {
        const movie = await Movie.findOne({ title });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const boxOffice = await BoxOffice.findOne({ movie: movie._id });

        if (!boxOffice) {
            return res.status(404).json({ message: 'Box office not found for this movie' });
        }

        const result = {
            movieTitle: movie.title,
            revenue: boxOffice.revenue,
            ticketsSold: boxOffice.ticketsSold
        };

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

