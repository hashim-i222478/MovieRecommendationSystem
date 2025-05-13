//--------------------IMPORTS--------------------
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './Routers/UserRoutes.js';
import actorRoutes from './Routers/ActorsRoutes.js';
import directorRoutes from './Routers/DirectorRoutes.js';
import movieRoutes from './Routers/MovieRoutes.js';
import Discussionroutes from './Routers/DiscussionRoute.js';
import AdminRoute from './Routers/AdminRoute.js';
import { verify_jwt_token } from './middleWares/authMiddleware.js';
//-----------------------------------------------------------

dotenv.config(); //to use environment variables

const app = express(); //initialize express
app.use(express.json()); //to parse json data

const port = 3000; //port number
app.listen(port, () => console.log(`App is running on port ${port}`)); //listen to port

//--------------------DATABASE CONNECTION--------------------
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected Successfully'))
.catch(err => console.log(err));
//-----------------------------------------------------------

//--------------------ROUTES--------------------
app.use('/api/users', UserRoutes); //user routes
app.use('/api/actors', actorRoutes); //actor routes
app.use('/api/directors', directorRoutes); //director routes
app.use('/api/movies', movieRoutes); //movie routes
app.use('/api/discussions', Discussionroutes); //discussion routes
app.use('/api/admin', AdminRoute); //admin routes

