const express = require('express');
const path = require('path');

const basketRoutes = require('./controllers/basketController');
const moviesRoutes = require('./controllers/moviesController');
const connectToDatabase = require('./controllers/databaseController');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

// database connection
connectToDatabase();

// basket routes
app.use(basketRoutes);

// movies routes
app.use(moviesRoutes);

// index page (redirect to /all-movies)
app.get('/', (req, res) => {
    res.redirect('/all-movies');
});

// movie details page (redirect to /more)
app.get('/more', (req, res) => {
    res.render('more');
});

// add movie page
app.get('/add-movie', (req, res) => {
    res.render('add-movie');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`App run on port: ${PORT}`);
});