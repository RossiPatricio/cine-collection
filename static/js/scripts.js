document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector(".peliculas-grid");
    const spinner = document.querySelector(".loading-spinner");
    
    // Muestra el spinner mientras se cargan los datos
    spinner.style.display = 'block';
    
    fetch("/get_peliculas")
    .then(response => response.json())
    .then(data => {
        // Oculta el spinner una vez que los datos han sido recibidos
        spinner.style.display = 'none';
        
        // Itera sobre cada película para crear su tarjeta
        data.peliculas.forEach(pelicula => {
            const card = document.createElement("div");
            card.className = "pelicula-card";
            
            // Crea el contenido HTML de la tarjeta
            let contenido = `
                <div class="pelicula-header">
                    ${pelicula.poster ? 
                        `<img src="${pelicula.poster}" class="pelicula-poster" alt="Póster de ${pelicula.title}">` : 
                        '<div class="no-poster">Póster no disponible</div>'}
                </div>
                
                <div class="pelicula-info">
                    <h3 class="pelicula-titulo">${pelicula.title}</h3>
                    
                    <div class="pelicula-detalle">
                        <span class="material-symbols-outlined">person</span>
                        <span>${pelicula.director}</span>
                    </div>
                    
                    <div class="pelicula-detalle">
                        <span class="material-symbols-outlined">groups</span>
                        <span>${pelicula.team}</span>
                    </div>

                    <div class="pelicula-detalle">
                        <span class="material-symbols-outlined">description</span>
                        <p>${pelicula.synopsis.substring(0, 150)}...</p>
                    </div>
                </div>
            `;
            
            card.innerHTML = contenido;
            grid.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
        spinner.style.display = 'none'; // Asegura que el spinner se oculte incluso si hay un error
        // Opcional: mostrar un mensaje de error al usuario
        grid.innerHTML = '<p class="error-message">No se pudieron cargar las películas. Por favor, inténtalo de nuevo más tarde.</p>';
    });
});