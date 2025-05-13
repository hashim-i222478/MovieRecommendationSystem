import {
    getMostPopularMovies,
    getMostSearchedActors,
    getTrendingGenres,
    getUserActivity
}from '../Controllers/AdminController.js';
import express from 'express';
import { verify_jwt_token, check_admin } from '../middleWares/authMiddleware.js';

const router = express.Router();

//admin routes
//get user activity, most searched actors, trending genres, most popular movies
router.get('/user-activity', verify_jwt_token, check_admin, getUserActivity);
router.get('/most-searched-actors', verify_jwt_token, check_admin, getMostSearchedActors);
router.get('/trending-genres', verify_jwt_token, check_admin, getTrendingGenres);
router.get('/most-popular-movies', verify_jwt_token, check_admin, getMostPopularMovies);

export default router;