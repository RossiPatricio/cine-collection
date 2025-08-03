document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector(".peliculas-grid");
    const spinner = document.querySelector(".loading-spinner");
    
    spinner.style.display = 'block';
    
    fetch("/get_peliculas")
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';
        
        data.peliculas.forEach(pelicula => {
            const card = document.createElement("div");
            card.className = "pelicula-card";
            
            let contenido = `
                ${pelicula.img_url ? 
                    `<img src="${pelicula.img_url}" class="pelicula-poster" 
                         alt="${pelicula.titulo}">` : 
                    '<div class="no-poster">Poster no disponible</div>'}
                
                <div class="pelicula-info">
                    <h3 class="pelicula-titulo">${pelicula.titulo}</h3>
                    
                    <div class="pelicula-detalle">
                        <span class="material-symbols-outlined">public</span>
                        ${pelicula.pais}
                    </div>
                    
                    <div class="pelicula-detalle">
                        <span class="material-symbols-outlined">movie</span>
                        ${pelicula.director.substring(0, 100)}...
                    </div>
                </div>
            `;
            
            card.innerHTML = contenido;
            grid.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        spinner.style.display = 'none';
    });
});