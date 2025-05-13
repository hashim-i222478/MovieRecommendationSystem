import UpcomingMovie from '../models/UpcomingMovie.js';
import nodemailer from 'nodemailer';

//add upcoming movie
export const addUpcomingMovie = async (req, res) => {
    const { title, releaseDate, genre, trailer } = req.body;

    try {
        const upcomingMovie = await UpcomingMovie.create({ title, releaseDate, genre, trailer });
        res.status(201).json(upcomingMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all upcoming movies
export const getAllUpcomingMovies = async (req, res) => {
    try {
        const upcomingMovies = await UpcomingMovie.find();
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//set reminder for upcoming movie by title containing the movie title in the URL
export const setReminder = async (req, res) => {
    const { title } = req.params; //get movie title from URL
    try {
        const upcomingMovie = await UpcomingMovie.findOne({ title });
        if (!upcomingMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        
        const transporter = nodemailer.createTransport({ //create a transporter object
            service: 'gmail',
            auth: {
                user: 'hashim.ahmad531@gmail.com',
                pass: 'fqhl ijto dlda ruhx', // Be cautious with hardcoding sensitive credentials!
            }
        });

        const mailOptions = { //set mail options
            from: 'hashim.ahmad531@gmail.com',
            to: 'i222478@nu.edu.pk',
            subject: `Reminder: Upcoming Movie - ${upcomingMovie.title}`,
            text: `Don't miss the upcoming movie "${upcomingMovie.title}" releasing on ${upcomingMovie.releaseDate}.`
        };

        //send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send reminder email', error: error.message });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Reminder set successfully' });
        });

    } catch (error) {
        console.error('Error setting reminder:', error);
        res.status(500).json({ message: error.message });
    }
};

//notify upcoming content
export const notifyUpcomingContent = async (req, res) => {
    const { genre, email } = req.body;

    try {
        const upcomingMovies = await UpcomingMovie.find({ genre });
        if (upcomingMovies.length === 0) {
            return res.status(404).json({ message: 'No upcoming movies found in this genre' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hashim.ahmad531@gmail.com',
                pass: 'fqhl ijto dlda ruhx', // Be cautious with hardcoding sensitive credentials!
            }
        });

        const mailOptions = {
            from: 'hashim.ahmad531@gmail.com',
            to: email,
            subject: `Upcoming Movies in Your Favorite Genre - ${genre}`,
            text: `Here are some upcoming movies in your favorite genre "${genre}":\n\n` +
                  upcomingMovies.map(movie => `${movie.title} - Releasing on ${movie.releaseDate}`).join('\n')
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send notification email', error: error.message });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Notification sent successfully' });
        });

    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ message: error.message });
    }
};

