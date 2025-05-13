
import {
    createDiscussion,
    getDiscussions,
    addComment

} from '../Controllers/DiscussionController.js';
import { verify_jwt_token } from '../middleWares/authMiddleware.js';
import express from 'express';

const router = express.Router();

//discussion routes
//create a discussion, get all discussions, add a comment to a discussion
router.post('/create',verify_jwt_token, createDiscussion);

router.get('/get',verify_jwt_token, getDiscussions);

router.post('/addcomment/:title',verify_jwt_token, addComment);

export default router;


