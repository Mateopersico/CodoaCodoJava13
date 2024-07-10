document.addEventListener('DOMContentLoaded', function() {
    const peliculaId = localStorage.getItem('peliculaSeleccionadaId');

    if (peliculaId) {
        fetch(`http://localhost:8080/listarPeliculas`)
            .then(response => response.json())
            .then(data => {
                const pelicula = data.find(pelicula => pelicula.id == peliculaId);
                if (pelicula) {
                    // Crear contenedor principal centrado
                    const peliculaContainer = document.createElement('div');
                    peliculaContainer.classList.add('pelicula-container');
                    peliculaContainer.style.width = '80%';
                    peliculaContainer.style.margin = 'auto';
                    peliculaContainer.style.backgroundColor = '#333'; // Fondo oscuro
                    peliculaContainer.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.8)'; // Sombra
                    peliculaContainer.style.display = 'flex';

                    // División izquierda para la portada
                    const portadaDiv = document.createElement('div');
                    portadaDiv.style.width = '50%';
                    portadaDiv.style.textAlign = 'center'; // Centrar contenido
                    portadaDiv.style.padding = '20px';

                    // Imagen de la portada
                    const img = document.createElement('img');
                    img.src = pelicula.portada;
                    img.alt = 'Portada';
                    img.classList.add('img-fluid');
                    portadaDiv.appendChild(img);
                    peliculaContainer.appendChild(portadaDiv);

                    // División derecha para la información de la película
                    const infoDiv = document.createElement('div');
                    infoDiv.style.width = '50%';
                    infoDiv.style.color = '#fff'; // Texto blanco
                    infoDiv.style.padding = '20px';

                    // Título de la película con sombra
                    const titulo = document.createElement('h1');
                    titulo.textContent = pelicula.titulo;
                    titulo.classList.add('titulo-pelicula');
                    titulo.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)'; // Sombra al texto
                    infoDiv.appendChild(titulo);

                    // Detalles adicionales de la película
                    const detalles = document.createElement('div');
                    detalles.innerHTML = `
                        <p><strong>Año:</strong> ${pelicula.anio}</p>
                        <p><strong>Director:</strong> ${pelicula.director}</p>
                        <p><strong>Puntaje:</strong> ${pelicula.puntuacion}</p>
                        <p><strong>Género:</strong> ${pelicula.genero}</p>
                        <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
                    `;
                    detalles.style.lineHeight = '1.6'; // Espacio entre líneas
                    infoDiv.appendChild(detalles);

                    peliculaContainer.appendChild(infoDiv);

                    // Agregar contenedor principal al detalleContainer
                    const detalleContainer = document.querySelector('#peliculaDetalle');
                    detalleContainer.innerHTML = '';
                    detalleContainer.appendChild(peliculaContainer);

                    // Crear contenedor de botones
                    const botonesContainer = document.createElement('div');
                    botonesContainer.style.textAlign = 'center'; // Centrar botones
                    botonesContainer.style.marginTop = '20px'; // Margen superior

                    // Botón Ver Online
                    const btnVerOnline = document.createElement('button');
                    btnVerOnline.textContent = 'Ver Online';
                    btnVerOnline.classList.add('btn', 'btn-danger', 'me-3');
                    btnVerOnline.addEventListener('click', function() {
                        alert('No disponible');
                    });
                    botonesContainer.appendChild(btnVerOnline);

                    // Botón Descargar
                    const btnDescargar = document.createElement('button');
                    btnDescargar.textContent = 'Descargar';
                    btnDescargar.classList.add('btn', 'btn-danger', 'me-3');
                    btnDescargar.addEventListener('click', function() {
                        alert('No disponible');
                    });
                    botonesContainer.appendChild(btnDescargar);

                    // Botón Volver
                    const btnVolver = document.createElement('button');
                    btnVolver.textContent = 'Volver';
                    btnVolver.classList.add('btn', 'btn-success');
                    btnVolver.addEventListener('click', function() {
                        window.location.href = 'index.html'; 
                    });
                    botonesContainer.appendChild(btnVolver);

                    detalleContainer.appendChild(botonesContainer);

                } else {
                    const detalleContainer = document.querySelector('#peliculaDetalle');
                    detalleContainer.innerHTML = '<p>No se encontraron detalles para esta película.</p>';
                }
            })
            .catch(error => console.error('Error al cargar los detalles de la película:', error));
    } else {
        const detalleContainer = document.querySelector('#peliculaDetalle');
        detalleContainer.innerHTML = '<p>No se seleccionó ninguna película.</p>';
    }
});

