document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();

    document.getElementById('categorias').addEventListener('change', (event) => {
        const categoriaSeleccionada = event.target.value;
        cargarProductos(categoriaSeleccionada);
    });
});

function cargarCategorias() {
    const categoriasSelect = document.getElementById('categorias');

    fetch('https://dummyjson.com/recipes/tags')
        .then(res => res.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                categoriasSelect.appendChild(new Option(categoria, categoria));
            });
            
            if (categorias.length > 0) {
                cargarProductos(categorias[0]);
            }
        })
        .catch(error => console.log('¡Ocurrió un error al momento de cargar las categorías!', error));
}

function cargarProductos(categoria) {
    const listaProductos = document.getElementById('listaProductos');
     fetch(`https://dummyjson.com/recipes/tag/${categoria}`)
        .then(res => res.json())
        .then(datos => {
            listaProductos.innerHTML = ''; 
            
            datos.recipes.forEach(receta => {
                const tarjetaProducto = document.createElement('div');
                tarjetaProducto.classList.add('card');
                
                
            tarjetaProducto.innerHTML = `
                <img src="${receta.image}" alt="${receta.name}" style="width:100%; max-width:200px;">
                <div>
                    <p class="card-text">Dificultad: ${receta.difficulty}</p>
                    <h3>${receta.name}</h3>
                    <hr>
                    <p>Ingredients:</p>
                    <ul>
                        ${receta.ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    <hr>
                    <p>Instrucciones:</p>
                    <ol>
                        
                        ${receta.instructions.map( instruction => `<li>${instruction}</li>`).join('')}
                        
                    </ol>
                    <hr>
                    <tr>
                        <td>Cousine: ${receta.cuisine},</td>
                        <hr>
                        <td>Calories: ${receta.calories},</td>
                        <hr>
                        <td>Cook Time Minutes: ${receta.cookTimeMinutes}</td>
                        <hr>
                        <td>Prep Time Minutes: ${receta.prepTimeMinutes}
                        <hr>
                        <td>Tags: ${receta.tags}</td>
                        <hr>
                    </tr>
                </div>
            `;
            listaProductos.appendChild(tarjetaProducto);
        });
        console.log(datos);
    })
     .catch(error => console.log('¡Ocurrió un error al momento de cargar las recetas!', error));
}