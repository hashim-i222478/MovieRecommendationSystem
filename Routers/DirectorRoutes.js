//create router for director
import express from 'express';
import { createDirector } from '../Controllers/DirectorController.js';

const router = express.Router();

router.post('/addDirector', createDirector);

export default router;