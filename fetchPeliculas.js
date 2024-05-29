const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    getCienciaFiccion()
    getEstrenos()
    getPopulares()
    getTerror()
})


function getPopulares() {
    fetch('https://api.themoviedb.org/3/movie/popular?language=es', options)
        .then(response => response.json())
        .then(response => listarPopulares(response))
        .catch(err => console.error(err));

    function listarPopulares(response) {
        const peliculas = response.results
        let rows = ''
        for (let pelicula of peliculas) {
            rows += `
        <div class="col-md-2">
        <a href="" class="pelicula">
            <div class="overlay">
                <span class="titulo">${pelicula.title}</span>
            </div>
            <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
        </a>
        </div>
                `
        }

        document.querySelector("#popular").innerHTML = rows


        /*for (let pelicula of peliculas) {
            rows += `
            <tr>
            <th>${pelicula.title}</th>
            <td>${pelicula.release_date}</td>
            <td>${pelicula.vote_average}</td>
            <td> <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
            </td>
            
            </tr>
            
            `
        }
    
        document.querySelector("#tbody").innerHTML = rows*/


    }
}

function getEstrenos() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=es', options)
        .then(response => response.json())
        .then(response => listarEstrenos(response))
        .catch(err => console.error(err));

    function listarEstrenos(response) {
        const peliculas = response.results
        let rows = ''
        for (let pelicula of peliculas) {
            rows += `
                <div class="col-md-2">
                <a href="" class="pelicula">
                    <div class="overlay">
                        <span class="titulo">${pelicula.title}</span>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
                </a>
                </div>
                        `
        }

        document.querySelector("#estrenos").innerHTML = rows


        /*for (let pelicula of peliculas) {
            rows += `
            <tr>
            <th>${pelicula.title}</th>
            <td>${pelicula.release_date}</td>
            <td>${pelicula.vote_average}</td>
            <td> <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
            </td>
            
            </tr>
            
            `
        }
    
        document.querySelector("#tbody").innerHTML = rows*/


    }
}

function getUpcoming() {

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=es', options)
        .then(response => response.json())
        .then(response => listarUpcoming(response))
        .catch(err => console.error(err));
    function listarUpcoming(response) {
        const peliculas = response.results
        let rows = ''
        for (let pelicula of peliculas) {
            rows += `
                <div class="col-md-2">
                <a href="" class="pelicula">
                    <div class="overlay">
                        <span class="titulo">${pelicula.title}</span>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
                </a>
                </div>
                        `
        }

        document.querySelector("#proximamente").innerHTML = rows


        /*for (let pelicula of peliculas) {
            rows += `
            <tr>
            <th>${pelicula.title}</th>
            <td>${pelicula.release_date}</td>
            <td>${pelicula.vote_average}</td>
            <td> <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
            </td>
            
            </tr>
            
            `
        }
    
        document.querySelector("#tbody").innerHTML = rows*/


    }
}


function getCienciaFiccion() {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es&page=1&sort_by=popularity.desc&with_genres=878', options)
        .then(response => response.json())
        .then(response => listarCienciaFiccion(response))
        .catch(err => console.error(err));

    function listarCienciaFiccion(response) {
        const peliculas = response.results
        let rows = ''
        for (let pelicula of peliculas) {
            rows += `
                <div class="col-md-2">
                <a href="" class="pelicula">
                    <div class="overlay">
                        <span class="titulo">${pelicula.title}</span>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
                </a>
                </div>
                        `

        }

        document.querySelector("#scifi").innerHTML = rows


    }
}


function getTerror() {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es&page=1&sort_by=popularity.desc&with_genres=27', options)
        .then(response => response.json())
        .then(response => listarTerror(response))
        .catch(err => console.error(err));

    function listarTerror(response) {
        const peliculas = response.results
        let rows = ''
        for (let pelicula of peliculas) {
            rows += `
                <div class="col-md-2">
                <a href="" class="pelicula">
                    <div class="overlay">
                        <span class="titulo">${pelicula.title}</span>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}" alt="Portada" class="img-fluid">
                </a>
                </div>
                        `

        }

        document.querySelector("#terror").innerHTML = rows


    }
}
