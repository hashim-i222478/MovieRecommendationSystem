//create the routes for the movies
import express from 'express';
 //import the functions from the controller
import { addMovie,
    updateMovie,
    deleteMovie,
    getDirectorsOfMovie,
    getCastOfMovie,
    getAgeRatingOfMovie,
    getMovieDetails,
    getAllMovies,
    getMostPopularMovies,
    getMoviesByRating,
    getMoviesByReleaseDecade,
    getMoviesByReleaseYear,
    getTop10MoviesByGenre,
    getTopMoviesOfTheMonth,
    searchMoviesByActors,
    searchMoviesByDirectors,
    searchMoviesByGenre,
 } from '../Controllers/MoviesController.js';

import {verify_jwt_token,
     check_admin 
} from '../middleWares/authMiddleware.js';

import {
     addBoxOfficeToMovie,
     getBoxOfficeWithMovieTitle
} from '../Controllers/BoxOfficeController.js';

//create the routes for the movies
const router = express.Router();

//movie routes Add, Update, Delete, Get
router.post('/add',verify_jwt_token, check_admin, addMovie);
router.put('/update/:title',verify_jwt_token,check_admin, updateMovie);
router.delete('/delete/:title',verify_jwt_token,check_admin, deleteMovie);
router.get('/searchByActors/:actorId',verify_jwt_token, searchMoviesByActors);
router.get('/searchByDirectors/:directorId',verify_jwt_token, searchMoviesByDirectors);
router.get('/searchByGenre/:genre',verify_jwt_token, searchMoviesByGenre);

//get routes 
//get directors, cast, age rating, details of a movie
router.get('/directors/:title',verify_jwt_token, getDirectorsOfMovie);
router.get('/cast/:title',verify_jwt_token, getCastOfMovie);
router.get('/ageRating/:title',verify_jwt_token, getAgeRatingOfMovie);
router.get('/details/:title',verify_jwt_token, getMovieDetails);
router.get('/all',verify_jwt_token, getAllMovies);
router.get('/mostPopular',verify_jwt_token, getMostPopularMovies);

//filtering routes
//filter movies by rating, release decade, release year, top 10 by genre, top movies of the month
router.get('/filterByRating', verify_jwt_token, getMoviesByRating);
router.get('/filterByReleaseDecade', verify_jwt_token, getMoviesByReleaseDecade);
router.get('/filterByReleaseYear', verify_jwt_token, getMoviesByReleaseYear);
router.get('/top10ByGenre/:genre', verify_jwt_token, getTop10MoviesByGenre);
router.get('/topMoviesOfTheMonth', verify_jwt_token, getTopMoviesOfTheMonth);

//box office routes
//add box office to a movie, get box office with movie title
router.post('/addBoxOffice',verify_jwt_token, check_admin, addBoxOfficeToMovie);
router.get('/getboxOffice/:title',verify_jwt_token, getBoxOfficeWithMovieTitle);

export default router;