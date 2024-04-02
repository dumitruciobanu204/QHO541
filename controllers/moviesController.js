const express = require('express');
const router = express.Router();
const MoviesData = require('../models/moviesSchema');
const upload = require('../middleware/multerMiddleware');

router.get('/all-movies', (req, res) => {
    MoviesData.find()
        .then((result) => {
            res.render('index', { movie: result })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).render('error', { message: 'Internal Server Error' });
        });
});

router.get('/movie', (req, res) => {
    const title = req.query.title;
    MoviesData.findOne({ Title: title })
        .then((movie) => {
            if (movie) {
                res.json(movie);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.post('/add-movie', upload.single('img'), async (req, res) => {
    try {
        const { title, genre, director, year, imdb_rating, runtime, summary, price, quantity } = req.body;
        const imgPath = req.file.filename;

        // console.log(imgPath);

        const newMovie = new MoviesData({
            Title: title,
            Genre: genre,
            Director: director,
            Year: parseInt(year),
            IMDbRating: parseFloat(imdb_rating),
            Runtime: parseInt(runtime),
            Image: imgPath,
            Summary: summary,
            Price: price,
            Quantity: parseInt(quantity)
        });

        await newMovie.save();

        // console.log('Movie added:', newMovie);

        res.redirect('/');
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).send('Error adding movie');
    }
});


module.exports = router;