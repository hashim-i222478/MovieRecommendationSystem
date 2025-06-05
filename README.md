# Movie Recommendation System

This project is a movie recommendation system built using Node.js and Express. It provides various functionalities including user management, actor and director information, movie listings, discussion forums, and admin controls.

## Features

- User management
- Actor and director information
- Movie listings
- Discussion forums
- Admin controls

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Run the application using `npm start`.

## Usage

### Movie Management
- **Add, Update, Delete Movies**: These operations require JWT token verification and admin privileges.
- **Search Movies**: Users can search for movies by actors, directors, or genres.
- **Get Movie Details**: Users can retrieve details such as directors, cast, age rating, and general information about a movie.
- **Filter Movies**: Users can filter movies by rating, release decade, release year, and get top movies by genre or for the month.
- **Box Office**: Admins can add box office data to a movie, and users can retrieve box office information by movie title.

### User and Admin Controls
- **User Management**: The system includes user registration, login, and profile management.
- **Admin Controls**: Admins have additional privileges to manage movies and other data.

### Discussion Forums
- The system includes routes for discussions, allowing users to engage in conversations about movies.

### General Usage
- The application is built using Node.js and Express, with MongoDB as the database.
- It uses environment variables for configuration, which should be set up in a `.env` file.
- The application can be run using `npm start`. 