function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const title = getQueryParam('id');
fetch(`/movie?title=${title}`)
    .then(response => response.json())
    .then(movie => {
        const movieDetailsContainer = document.getElementById('movieDetailsContainer');
        if (movie) {
            let imdbRating = movie.IMDbRating;
            if (imdbRating !== undefined) {
                imdbRating = parseFloat(imdbRating.toString());
            } else {
                imdbRating = 'N/A';
            }

            const html = `
                <img src="img/${movie.Image}" alt="${movie.Title}">
                <div class="info">
                    <h2>${movie.Title}</h2>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                    <p><strong>Runtime:</strong> ${movie.Runtime} minutes</p>
                    <p><strong>Summary:</strong> ${movie.Summary}</p>
                    <p><strong>In Stock:</strong> ${movie.Quantity}</p>
                    <p><strong>Price:</strong> ${movie.Price}</p>
                </div>
            `;
            movieDetailsContainer.innerHTML = html;
        } else {
            movieDetailsContainer.innerHTML = '<h3>Movie not found.</h3>';
        }
    })
    .catch(error => {
        console.error('Error fetching movie details:', error);
        document.getElementById('movieDetailsContainer').innerHTML = '<h3>Failed to fetch movie details.</h3>';
    });