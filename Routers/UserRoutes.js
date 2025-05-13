//--------------------------------Importing Libraries and middlewares--------------------------------
import express from 'express';
import { verify_jwt_token, check_admin } from '../middleWares/authMiddleware.js';

import{
registerUser,
loginUser,
getUserProfile,
updateUserProfile,
addToWishlist,
getWishlist,
removeFromWishlist,
deleteUserById,
addReview,
updateReview,
getAllReviews,
getReviewHighlights,
addPreference
} from '../Controllers/UserController.js';

import {
    getRecommendations,
    getPersonalizedRecommendations,
    getSimilarTitles,
    getTrendingMovies,
    getTopRatedMovies
} from '../Controllers/RecommendationSystem.js';

import {
    createWatchList,
    getAllWatchLists,
    getWatchList,
    followWatchListByName,
    getFollowedWatchLists
} from '../Controllers/WatchListController.js';

import {
    addUpcomingMovie,
    getAllUpcomingMovies,
    setReminder

} from '../Controllers/UpcomingMovieController.js';

import {
    addActorArticle,
    getActorArticles,
    getAllActorArticles
} from '../Controllers/ActorArticlesController.js';

import {
    addMovieNews,
    getAllMovieNews,
    getMovieNewsByTitle
} from '../Controllers/MovieAtriclesController.js';
//----------------------------------------------------------

//create the routes for the users
const router = express.Router(); 

//user related routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verify_jwt_token, getUserProfile);
router.put('/profile', verify_jwt_token, updateUserProfile);
router.post('/wishlist', verify_jwt_token, addToWishlist);
router.get('/wishlist', verify_jwt_token, getWishlist);
router.delete('/wishlist/:movieId', verify_jwt_token, removeFromWishlist);
router.delete('/deleteUser', verify_jwt_token, check_admin, deleteUserById);

//review related routes
router.post('/review', verify_jwt_token, addReview);
router.put('/review', verify_jwt_token, updateReview);
router.get('/review', getAllReviews);
router.get('/reviewHighlights', getReviewHighlights);
router.post('/preference', verify_jwt_token, addPreference);

//recommendation related routes
router.get('/recommendation/getRcommendations', verify_jwt_token, getRecommendations);
router.get('/recommendation/getPersonalizedRecommendations', verify_jwt_token, getPersonalizedRecommendations);
router.get('/recommendation/getSimilarTitles/:movieId', verify_jwt_token, getSimilarTitles);
router.get('/recommendation/getTrendingMovies', verify_jwt_token, getTrendingMovies);
router.get('/recommendation/getTopRatedMovies', verify_jwt_token, getTopRatedMovies);

//watchlist related routes
router.post('/watchlist/createWatchlist', verify_jwt_token, createWatchList);
router.get('/watchlist/getAllWatchLists', verify_jwt_token, getAllWatchLists);
router.get('/watchlist/getWatchList', verify_jwt_token, getWatchList);  
router.post('/watchlist/followWatchListByName', verify_jwt_token, followWatchListByName);
router.get('/watchlist/getFollowedWatchLists', verify_jwt_token, getFollowedWatchLists);

//upcoming movie related routes
router.post('/upcomingMovie/add', verify_jwt_token, addUpcomingMovie);
router.get('/upcomingMovie/getAll', verify_jwt_token, getAllUpcomingMovies);
router.post('/upcomingMovie/setReminder/:title', setReminder);

//actor articles related routes
router.post('/actorArticles/add', verify_jwt_token, addActorArticle);
router.get('/actorArticles/getAll', verify_jwt_token, getAllActorArticles);
router.get('/actorArticles/getArticles/:aboutActor', verify_jwt_token, getActorArticles);

//movie articles related routes
router.post('/movieArticles/add', verify_jwt_token, addMovieNews);
router.get('/movieArticles/getAll', verify_jwt_token, getAllMovieNews);
router.get('/movieArticles/getByTitle/:title', verify_jwt_token, getMovieNewsByTitle);

export default router;