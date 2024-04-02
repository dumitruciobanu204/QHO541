const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    Title: String,
    Genre: String,
    Director: String,
    Year: Number,
    IMDbRating: Number,
    Runtime: Number,
    Image: String,
    Summary: String,
    Price: String,
    Quantity: Number
}, { collection: 'MoviesData' });

const MoviesData = mongoose.model('MoviesData', moviesSchema);

module.exports = MoviesData;
