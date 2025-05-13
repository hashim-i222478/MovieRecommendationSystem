import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Movies from '../models/Movies.js';
import Reviews from '../models/Reviews.js';

//UserController.js
export const registerUser = async (req, res) => {
    const { name, email, password, preferences, role } = req.body;
    try {
        const foundUser = await Users.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const encryptPass = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new Users({ name, email, password: encryptPass, preferences, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        //print the issue in the console
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Assuming the email and password are sent in the request body
    const lastLogin = new Date();
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user.lastLogin.push(lastLogin);

        await user.save();

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'User logged in successfully', token });
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const { name, email, preferences } = req.body;
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.user.id,
            { name, email, preferences },
            { new: true }
        ).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Add a movie to the wishlist
export const addToWishlist = async (req, res) => {
    const { movieId } = req.body;
    try {
        const user = await Users.findById(req.user.id);
        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if the movieId is already in the wishlist
        if (!user.wishlist.includes(movie._id)) {
            user.wishlist.push(movie._id);
            await user.save();
            res.status(200).json({ message: 'Movie added to wishlist', movieName: movie.title }); // Assuming 'title' is the correct field name in the Movies schema
        } else {
            res.status(400).json({ message: 'Movie already in wishlist' });
        }
    } catch (error) {
        console.error("Error adding movie to wishlist:", error); // Logging the error to the console for better debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get the wishlist of a user
export const getWishlist = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'User ID not provided' });
    }

    try {
        const user = await Users.findById(req.user.id).select('wishlist');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.wishlist == null || user.wishlist.length === 0) {
            return res.status(200).json({ message: 'Wishlist is empty' });
        }

        const wishlistMovies = await Movies.find({ _id: { $in: user.wishlist } }).select('title');
        const wishlistTitles = wishlistMovies.map(movie => movie.title);
        res.status(200).json({ message: 'Wishlist: ' + wishlistTitles});
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Remove a movie from the wishlist
export const removeFromWishlist = async (req, res) => {
    const { movieId } = req.params;
    try {
        const user = await Users.findById(req.user.id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== movieId);
        await user.save();
        res.status(200).json({ message: 'Movie removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Add a preference to the user
export const addPreference = async (req, res) => {
    const { preference } = req.body;
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.preferences.includes(preference)) {
            user.preferences.push(preference);
            await user.save();
            res.status(200).json({ message: 'Preference added successfully', preferences: user.preferences });
        } else {
            res.status(400).json({ message: 'Preference already exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const deleteUserById = async (req, res) => {
    // Get the id from request body correctly
    const { id } = req.body;  // Assuming the 'id' is sent directly in the body

    try {
        // Find the user by id and delete it
        const user = await Users.findByIdAndDelete(id);
        console.log("User ID attempted to delete:", id); // Log the user id being attempted to delete

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Changed to 404, which is more appropriate for "not found" errors
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error); // Logging the error to console for debug
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//add review to a movie
export const addReview = async (req, res) => {
    const { movieId, rating, review } = req.body;
    try {
        const user = await Users.findById(req.user.id);
        const movie = await Movies.findById(movieId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const newReview = new Reviews({ movie: movieId, userId: req.user.id, rating, review });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//update review
export const updateReview = async (req, res) => {
    const { movieId, rating, review } = req.body;
    try {
        const user = await Users.findById(req.user.id);
        const movie = await Movies.findById(movieId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const updatedReview = await Reviews.findOneAndUpdate(
            { movie: movieId, userId: req.user.id },
            { rating, review },
            { new: true }
        );
        res.status(200).json({ message: 'Review updated successfully', updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Allow users to view ratings and reviews of others, and display Review
// Highlights for top-rated and most-discussed reviews.

// Get all reviews given by a user
export const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Reviews.find({ userId: req.user.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find();
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        
        //when returning reviews show the user name and movie name
        const reviewsWithDetails = await Promise.all(reviews.map(async review => {
            const user = await Users.findById(review.userId).select('name');
            const movie = await Movies.findById(review.movie).select('title');
            return { ...review._doc, user: user.name, movie: movie.title };
        }
        ));
        res.status(200).json(reviewsWithDetails);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// display Review
// Highlights for top-rated and most-discussed reviews.
export const getReviewHighlights = async (req, res) => {
    try {
        // Get top-rated reviews
        const topRatedReviews = await Reviews.find().sort({ rating: -1 }).limit(5);
        
        // Get most-discussed reviews (assuming most-discussed means most reviews for a movie)
        const mostDiscussedReviews = await Reviews.aggregate([
            { $group: { _id: "$movie", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Fetch details for top-rated reviews
        const topRatedReviewsWithDetails = await Promise.all(topRatedReviews.map(async review => {
            const user = await Users.findById(review.userId).select('name');
            const movie = await Movies.findById(review.movie).select('title');
            return { ...review._doc, user: user.name, movie: movie.title };
        }));

        // Fetch details for most-discussed reviews
        const mostDiscussedReviewsWithDetails = await Promise.all(mostDiscussedReviews.map(async review => {
            const movie = await Movies.findById(review._id).select('title');
            const reviews = await Reviews.find({ movie: review._id }).limit(5);
            const reviewsWithUserDetails = await Promise.all(reviews.map(async rev => {
                const user = await Users.findById(rev.userId).select('name');
                return { ...rev._doc, user: user.name , movie: movie.title };
            }));
            return { movie: movie.name, reviews: reviewsWithUserDetails };
        }));

        res.status(200).json({ topRatedReviews: topRatedReviewsWithDetails, mostDiscussedReviews: mostDiscussedReviewsWithDetails });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};