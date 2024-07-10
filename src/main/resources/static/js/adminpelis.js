const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const btnAddPelicula = document.getElementById('btnAddPelicula');
    const addPeliculaForm = document.getElementById('addPeliculaForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const cancelButton = document.getElementById('cancelButton');
    const searchResultsTable = document.getElementById('searchResultsTable');
    const searchResults = document.getElementById('searchResults');

    const sortIdButton = document.getElementById('sortId');
    const sortTituloButton = document.getElementById('sortTitulo');
    const sortAnioButton = document.getElementById('sortAnio');
    const sortPuntuacionButton = document.getElementById('sortPuntuacion');
    const sortGeneroButton = document.getElementById('sortGenero');

    const filterGenero = document.getElementById('filterGenero');
    const filterAnio = document.getElementById('filterAnio');

    let currentSortKey = '';
    let currentSortOrder = 'asc';

    // Nuevo elemento de entrada para la búsqueda por título
    const searchInputTitle = document.getElementById('searchInputTitle');
    const searchButtonTitle = document.getElementById('searchButtonTitle');

    const btnVolver = document.createElement('button');
    btnVolver.id = 'btnVolver';
    btnVolver.className = 'btn btn-success';
    btnVolver.textContent = 'Volver';

    btnAddPelicula.parentElement.appendChild(btnVolver);

    btnVolver.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    btnAddPelicula.addEventListener('click', function() {
        addPeliculaForm.style.display = 'block';
    });


    cancelButton.addEventListener('click', function() {
        addPeliculaForm.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResultsTable.style.display = 'none';
    });

    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        if (query) {
            fetch(`https://api.themoviedb.org/3/search/movie?language=es&query=${query}`, options)
                .then(response => response.json())
                .then(data => {
                    searchResults.innerHTML = '';
                    const resultsToShow = data.results.slice(0, 5); 
                    resultsToShow.forEach(movie => {
                        const row = createSearchResultRow(movie);
                        searchResults.appendChild(row);
                    });
                    searchResultsTable.style.display = 'table';
                })
                .catch(error => console.error('Error:', error));
        }
    });

    searchButtonTitle.addEventListener('click', function() {
        const query = searchInputTitle.value.toLowerCase();
        filterTableByTitle(query);
    });

    function filterTableByTitle(query) {
        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(pelicula => pelicula.titulo.toLowerCase().includes(query));
                const peliculasContainer = document.getElementById('peliculas');
                peliculasContainer.innerHTML = '';
                filteredData.forEach(pelicula => {
                    const row = createPeliculaTableRow(pelicula);
                    peliculasContainer.appendChild(row);
                });
            })
            .catch(error => console.error('Error al filtrar las películas por título:', error));
    }

    sortIdButton.addEventListener('click', function() {
        toggleSort('id');
    });

    sortTituloButton.addEventListener('click', function() {
        toggleSort('titulo');
    });

    sortAnioButton.addEventListener('click', function() {
        toggleSort('anio');
    });

    sortPuntuacionButton.addEventListener('click', function() {
        toggleSort('puntuacion');
    });

    sortGeneroButton.addEventListener('click', function() {
        toggleSort('genero');
    });

    filterGenero.addEventListener('change', function() {
        filterTable();
    });

    filterAnio.addEventListener('change', function() {
        filterTable();
    });

    function createSearchResultRow(movie) {
        const row = document.createElement('tr');
        row.classList.add('table-dark'); 
    
        const tituloCell = document.createElement('td');
        tituloCell.textContent = movie.title;
        tituloCell.classList.add('text-light'); 
    
        const anioCell = document.createElement('td');
        anioCell.textContent = new Date(movie.release_date).getFullYear();
        anioCell.classList.add('text-light');
    
        const portadaCell = document.createElement('td');
        portadaCell.classList.add('text-light'); 
        const portadaImg = document.createElement('img');
        portadaImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        portadaImg.alt = movie.title;
        portadaImg.style.maxWidth = '100px';
        portadaCell.appendChild(portadaImg);
    
        const accionesCell = document.createElement('td');
        accionesCell.classList.add('text-light'); 
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar';
        addButton.classList.add('btn', 'btn-danger', 'me-2');
        addButton.addEventListener('click', function() {
            fetchMovieDetailsAndAdd(movie.id);
        });
    
        accionesCell.appendChild(addButton);
    
        row.appendChild(tituloCell);
        row.appendChild(anioCell);
        row.appendChild(portadaCell);
        row.appendChild(accionesCell);
    
        return row;
    }

    function fetchMovieDetailsAndAdd(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es`, options)
            .then(response => response.json())
            .then(movie => {
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=es`, options)
                    .then(response => response.json())
                    .then(credits => {
                        const director = credits.crew.find(crewMember => crewMember.job === 'Director');
                        const directorName = director ? director.name : 'Desconocido';

                        const firstGenre = movie.genres.length > 0 ? movie.genres[0].name : 'Sin género especificado';

                        const pelicula = {
                            titulo: movie.title,
                            anio: movie.release_date,
                            puntuacion: movie.vote_average,
                            portada: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                            genero: firstGenre, 
                            sinopsis: movie.overview, 
                            director: directorName, 
                            mostrar: 'NO' 
                        };

                        fetch('http://localhost:8080/addPelicula', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(pelicula)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al agregar la película a la base de datos');
                            }
                            return response.json();
                        })
                        .then(data => {
                            alert('Película agregada exitosamente');
                            addPeliculaForm.style.display = 'none';
                            searchInput.value = '';
                            searchResults.innerHTML = '';
                            searchResultsTable.style.display = 'none';
                            loadPeliculas();
                        })
                        .catch(error => console.error('Error:', error));
                    })
                    .catch(error => console.error('Error al obtener detalles de los créditos:', error));
            })
            .catch(error => console.error('Error al obtener detalles de la película:', error));
    }

    function createPeliculaTableRow(pelicula) {
        const row = document.createElement('tr');
    
        const idCell = document.createElement('td');
        idCell.textContent = pelicula.id;
    
        const tituloCell = document.createElement('td');
        tituloCell.textContent = pelicula.titulo;
    
        const anioCell = document.createElement('td');
        anioCell.textContent = new Date(pelicula.anio).getFullYear();
    
        const puntuacionCell = document.createElement('td');
        puntuacionCell.textContent = pelicula.puntuacion;
    
        const generoCell = document.createElement('td');
        generoCell.textContent = pelicula.genero;
    
       
        const portadaCell = document.createElement('td');
        const portadaImg = document.createElement('img');
        portadaImg.src = pelicula.portada;
        portadaImg.alt = pelicula.titulo;
        portadaImg.style.maxWidth = '100px'; 
        portadaImg.addEventListener('load', function() {const portadaHeight = portadaImg.offsetHeight + 2 * parseInt(getComputedStyle(portadaImg).marginTop); 
        operacionesCell.style.height = `${portadaHeight}px`; 
        });
        portadaCell.appendChild(portadaImg);
    
      
        const operacionesCell = document.createElement('td');
        operacionesCell.classList.add('operaciones-cell');
    
       
        const toggleButton = document.createElement('button');
        toggleButton.textContent = pelicula.mostrar === 'SI' ? 'Ocultar' : 'Mostrar';
        toggleButton.classList.add('btn', 'me-2','align-self-center', 'ms-auto');
        toggleButton.classList.add(pelicula.mostrar === 'SI' ? 'btn-warning' : 'btn-success');
        toggleButton.addEventListener('click', function() {
            if (confirm(`¿Está seguro de ${pelicula.mostrar === 'SI' ? 'ocultar' : 'mostrar'} la película "${pelicula.titulo}"?`)) {
                toggleMostrarPelicula(pelicula);
            }
        });
        toggleButton.addEventListener('mouseover', function() {
            if (toggleButton.classList.contains('btn-warning')) {
                toggleButton.style.color = 'white'; 
            }
        });
        toggleButton.addEventListener('mouseout', function() {
            if (toggleButton.classList.contains('btn-warning')) {
                toggleButton.style.color = ''; 
            }
        });
    
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger','align-self-center', 'ms-auto');
        deleteButton.addEventListener('click', function() {
            if (confirm(`¿Estás seguro de eliminar la película "${pelicula.titulo}"?`)) {
                deletePelicula(pelicula.id);
            }
        });
    
    
        operacionesCell.appendChild(toggleButton);
        operacionesCell.appendChild(deleteButton);
    
      
        row.appendChild(idCell);
        row.appendChild(tituloCell);
        row.appendChild(anioCell);
        row.appendChild(puntuacionCell);
        row.appendChild(generoCell);
        row.appendChild(portadaCell);
        row.appendChild(operacionesCell);
    
        return row;
    }

    function toggleMostrarPelicula(pelicula) {
        fetch(`http://localhost:8080/toggleMostrar/${pelicula.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la película');
            }
            return response.json();
        })
        .then(data => {
            alert(`Estado de la película "${pelicula.titulo}" cambiado exitosamente`);
            loadPeliculas(); 
        })
        .catch(error => console.error('Error:', error));
    }

    function deletePelicula(id) {
        fetch(`http://localhost:8080/delPelicula/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la película');
            }
            return response.json();
        })
        .then(data => {
            alert('Película eliminada exitosamente');
            loadPeliculas();
        })
        .catch(error => console.error('Error:', error));
    }

    function toggleSort(key) {
        if (currentSortKey === key) {
            currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortKey = key;
            currentSortOrder = 'asc';
        }
        sortTable(key, currentSortOrder);
    }

    function sortTable(key, order) {
        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => {
                    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
                    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
                    return 0;
                });

                const peliculasContainer = document.getElementById('peliculas');
                peliculasContainer.innerHTML = '';
                data.forEach(pelicula => {
                    const row = createPeliculaTableRow(pelicula);
                    peliculasContainer.appendChild(row);
                });
            })
            .catch(error => console.error('Error al ordenar las películas:', error));
    }

    function filterTable() {
        const genero = filterGenero.value;
        const anio = filterAnio.value;

        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                let filteredData = data;
                if (genero) {
                    filteredData = filteredData.filter(pelicula => pelicula.genero === genero);
                }
                if (anio) {
                    filteredData = filteredData.filter(pelicula => new Date(pelicula.anio).getFullYear() === parseInt(anio));
                }

                const peliculasContainer = document.getElementById('peliculas');
                peliculasContainer.innerHTML = '';
                filteredData.forEach(pelicula => {
                    const row = createPeliculaTableRow(pelicula);
                    peliculasContainer.appendChild(row);
                });
            })
            .catch(error => console.error('Error al filtrar las películas:', error));
    }

    function loadPeliculas() {
        fetch('http://localhost:8080/listarPeliculas')
            .then(response => response.json())
            .then(data => {
                const peliculasContainer = document.getElementById('peliculas');
                peliculasContainer.innerHTML = '';
                data.forEach(pelicula => {
                    const row = createPeliculaTableRow(pelicula);
                    peliculasContainer.appendChild(row);
                });
                populateGeneros(data);
                populateAnios(data); 
            })
            .catch(error => console.error('Error al cargar las películas:', error));
    }

    function populateGeneros(peliculas) {
        filterGenero.innerHTML = '<option value="">Todos</option>';
        const generos = new Set(peliculas.map(pelicula => pelicula.genero));
        generos.forEach(genero => {
            const option = document.createElement('option');
            option.value = genero;
            option.textContent = genero;
            filterGenero.appendChild(option);
        });
    }

    function populateAnios(peliculas) {
        filterAnio.innerHTML = '<option value="">Todos</option>';
        const anios = new Set(peliculas.map(pelicula => new Date(pelicula.anio).getFullYear()));
        const sortedAnios = Array.from(anios).sort((a, b) => a - b); 
        sortedAnios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            filterAnio.appendChild(option);
        });
    }

    loadPeliculas();
});
