//create router for actors
import express from 'express';
import { addActor,
    getActorAwards,
    getAllActors
 } from '../Controllers/ActorController.js';
import { verify_jwt_token, check_admin } from '../middleWares/authMiddleware.js';

const router = express.Router();

//actor related routes
//add actor, get actor awards
router.post('/addActors',verify_jwt_token,check_admin, addActor);
router.get('/getActorAwards/:name',verify_jwt_token, getActorAwards);
router.get('/getAllActors',verify_jwt_token, getAllActors);


export default router;