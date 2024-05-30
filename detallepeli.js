const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const pelicula = JSON.parse(localStorage.getItem('peliculaSeleccionada'));

    if (pelicula) {
        const detalleContainer = document.querySelector('#peliculaDetalle');
        
        detalleContainer.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
            <div class="pelicula-info">
                <h1>${pelicula.title}</h1>
                <p><strong>Año:</strong> ${pelicula.release_date.split('-')[0]}</p>
                <p><strong>Director:</strong> <span id="director"></span></p>
                <p><strong>Puntuaciones:</strong> ${pelicula.vote_average}</p>
                <p><strong>Sinopsis:</strong> ${pelicula.overview}</p>
            </div>
        `;

        // Llamar a la API para obtener los detalles del director
        fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}/credits`, options)
            .then(response => response.json())
            .then(data => {
                const director = data.crew.find(person => person.job === 'Director');
                if (director) {
                    document.querySelector('#director').innerText = director.name;
                }
            })
            .catch(error => console.error('Error al obtener los detalles del director:', error));
    } else {
        detalleContainer.innerHTML = '<p>No se ha seleccionado ninguna película.</p>';
    }
});


