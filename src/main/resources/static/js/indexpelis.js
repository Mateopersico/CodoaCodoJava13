document.addEventListener('DOMContentLoaded', function() {
    const buscarBtn = document.getElementById('buscarBtn');
    const verInput = document.getElementById('ver');
    const resultadosBusquedaSection = document.getElementById('resultados-busqueda');
    const resultadosContainer = document.getElementById('resultados');
    const verMasResultadosContainer = document.getElementById('verMasResultadosContainer');
    const verMasResultadosBtn = document.getElementById('verMasResultados');
    const estrenosContainer = document.getElementById('estrenos-peliculas');
    const generosContainer = document.getElementById('generos');
    
    let resultados = [];
    let mostrarResultadosCompletos = false;

    buscarBtn.addEventListener('click', function() {
        const query = verInput.value.trim();
        if (query) {
            fetch('http://localhost:8080/listarPeliculas')
                .then(response => response.json())
                .then(data => {
                    resultados = data.filter(pelicula => pelicula.titulo.toLowerCase().includes(query.toLowerCase()) && pelicula.mostrar === "SI");
                    mostrarResultados();
                    resultadosBusquedaSection.classList.remove('d-none');
                })
                .catch(error => console.error('Error al cargar las películas:', error));
        }
    });

    verMasResultadosBtn.addEventListener('click', function() {
        mostrarResultadosCompletos = !mostrarResultadosCompletos;
        verMasResultadosBtn.textContent = mostrarResultadosCompletos ? 'Ver menos' : 'Ver más';
        mostrarResultados();
    });

    function mostrarResultados() {
        resultadosContainer.innerHTML = '';
        const resultadosAMostrar = mostrarResultadosCompletos ? resultados : resultados.slice(0, 5);

        resultadosAMostrar.forEach(pelicula => {
            const col = document.createElement('div');
            col.classList.add('col', 'transparente');

            const moviePoster = document.createElement('div');
            moviePoster.classList.add('movie-poster');

            const img = document.createElement('img');
            img.src = pelicula.portada;
            img.alt = pelicula.titulo;

            img.addEventListener('click', function() {
                // Guardar el ID de la película seleccionada en localStorage
                localStorage.setItem('peliculaSeleccionadaId', pelicula.id);
                // Redireccionar a detallepeli.html
                window.location.href = 'detallepeli.html';
            });

            const title = document.createElement('div');
            title.classList.add('movie-title');
            title.textContent = pelicula.titulo;

            moviePoster.appendChild(img);
            moviePoster.appendChild(title);
            col.appendChild(moviePoster);
            resultadosContainer.appendChild(col);
        });

        if (resultados.length > 5) {
            verMasResultadosContainer.classList.remove('d-none');
        } else {
            verMasResultadosContainer.classList.add('d-none');
        }
    }

    function cargarEstrenos() {
        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                const estrenos = data.filter(pelicula => pelicula.mostrar === "SI").sort((a, b) => b.id - a.id).slice(0, 5);
                estrenosContainer.innerHTML = '';

                estrenos.forEach(pelicula => {
                    const col = document.createElement('div');
                    col.classList.add('col', 'transparente');

                    const moviePoster = document.createElement('div');
                    moviePoster.classList.add('movie-poster');

                    const img = document.createElement('img');
                    img.src = pelicula.portada;
                    img.alt = pelicula.titulo;

                    img.addEventListener('click', function() {
                        // Guardar el ID de la película seleccionada en localStorage
                        localStorage.setItem('peliculaSeleccionadaId', pelicula.id);
                        // Redireccionar a detallepeli.html
                        window.location.href = 'detallepeli.html';
                    });

                    const title = document.createElement('div');
                    title.classList.add('movie-title');
                    title.textContent = pelicula.titulo;

                    moviePoster.appendChild(img);
                    moviePoster.appendChild(title);
                    col.appendChild(moviePoster);
                    estrenosContainer.appendChild(col);
                });
            })
            .catch(error => console.error('Error al cargar las películas:', error));
    }

    function cargarGeneros() {
        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                const generos = [...new Set(data.filter(pelicula => pelicula.mostrar === "SI").map(pelicula => pelicula.genero))];

                generosContainer.innerHTML = '';
                generos.forEach(genero => {
                    const generoContainer = document.createElement('div');
                    generoContainer.classList.add('genero-container', 'transparente'); // Añadir clase género-container aquí

                    const generoTitle = document.createElement('h2');
                    generoTitle.classList.add('genero-title');
                    generoTitle.textContent = genero;

                    const generoRow = document.createElement('div');
                    generoRow.classList.add('row', 'row-cols-2', 'row-cols-lg-5', 'g-2', 'g-lg-3');

                    const peliculasGenero = data.filter(pelicula => pelicula.genero === genero && pelicula.mostrar === "SI");
                    peliculasGenero.slice(0, 5).forEach(pelicula => {
                        const col = document.createElement('div');
                        col.classList.add('col', 'transparente');

                        const moviePoster = document.createElement('div');
                        moviePoster.classList.add('movie-poster');

                        const img = document.createElement('img');
                        img.src = pelicula.portada;
                        img.alt = pelicula.titulo;

                        img.addEventListener('click', function() {
                            // Guardar el ID de la película seleccionada en localStorage
                            localStorage.setItem('peliculaSeleccionadaId', pelicula.id);
                            // Redireccionar a detallepeli.html
                            window.location.href = 'detallepeli.html';
                        });

                        const title = document.createElement('div');
                        title.classList.add('movie-title');
                        title.textContent = pelicula.titulo;

                        moviePoster.appendChild(img);
                        moviePoster.appendChild(title);
                        col.appendChild(moviePoster);
                        generoRow.appendChild(col);
                    });

                    generoContainer.appendChild(generoTitle);
                    generoContainer.appendChild(generoRow);

                    if (peliculasGenero.length > 5) {
                        const verMasBtn = document.createElement('button');
                        verMasBtn.textContent = 'Ver más';
                        verMasBtn.classList.add('btn', 'btn-primary', 'ver-mas-btn');
                        verMasBtn.addEventListener('click', function() {
                            mostrarMasPeliculasGenero(genero, generoRow, peliculasGenero, verMasBtn);
                        });
                        generoContainer.appendChild(verMasBtn);
                    }

                    generosContainer.appendChild(generoContainer);
                });
            })
            .catch(error => console.error('Error al cargar las películas:', error));
    }

    function mostrarMasPeliculasGenero(genero, generoRow, peliculasGenero, verMasBtn) {
        const mostrarMas = verMasBtn.textContent === 'Ver más';
        verMasBtn.textContent = mostrarMas ? 'Ver menos' : 'Ver más';

        generoRow.innerHTML = '';

        const peliculasAMostrar = mostrarMas ? peliculasGenero : peliculasGenero.slice(0, 5);

        peliculasAMostrar.forEach(pelicula => {
            const col = document.createElement('div');
            col.classList.add('col', 'transparente');

            const moviePoster = document.createElement('div');
            moviePoster.classList.add('movie-poster');

            const img = document.createElement('img');
            img.src = pelicula.portada;
            img.alt = pelicula.titulo;

            img.addEventListener('click', function() {
                // Guardar el ID de la película seleccionada en localStorage
                localStorage.setItem('peliculaSeleccionadaId', pelicula.id);
                // Redireccionar a detallepeli.html
                window.location.href = 'detallepeli.html';
            });

            const title = document.createElement('div');
            title.classList.add('movie-title');
            title.textContent = pelicula.titulo;

            moviePoster.appendChild(img);
            moviePoster.appendChild(title);
            col.appendChild(moviePoster);
            generoRow.appendChild(col);
        });
    }

    cargarEstrenos();
    cargarGeneros();
});
