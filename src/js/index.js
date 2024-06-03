
// Inserte el código aquí
// Variables que obtienen los valores de el Dom
let inputTarea = document.getElementById("contenido-txt");
let btn = document.getElementById("btn");
let contador = document.getElementById("contador");
let contenedorTareas = document.getElementById("contanedor-tareas")

// Evento de click para el boton para que cree div, un checkbox, un h2 y un boton de eleminar
btn.addEventListener("click", () => {

    if (inputTarea.value.trim() === "") {
        alert("No puedes crear una tarea vacia");
        // alerta para que no pueda crear tareas vacias

    } else {
        let contenedor = document.createElement("div");
        contenedor.className = "contenedor"; // clase para darle estilos a el contenedor
        contenedorTareas.appendChild(contenedor);
        console.log(contenedor);

        let checkbox = document.createElement("input");
        checkbox.className = "checkbox"; // clase para darle estilos a la checkbox
        checkbox.type = "checkbox";
        contenedor.appendChild(checkbox);

        let divs = document.createElement("h2");
        divs.className = "tareas"; // clase para darle estilos a el h2
        divs.innerHTML = inputTarea.value;
        contenedor.appendChild(divs);

        let eliminar = document.createElement("img");
        eliminar.src = "img/eliminar.png"
        eliminar.className = "eliminar";
        contenedor.appendChild(eliminar)
        eliminar.addEventListener("click", () => {
            contenedorTareas.removeChild(contenedor); 
        
            return divs, checkbox
        }) 

        const postTaks = async () => { // funcion para recibir la apy
            try {
                const response = await fetch('http://localhost:3000/api/task', {
                    method: 'POST', // metodo post para que se haga un post de lo que añadi
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Task: inputTarea.value, // task va a ser igual a mi input que mi input es inputTarea.value, 
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        postTaks()
        inputTarea.value = "";
        //limpia el input cuando se crea la tarea
    }
});

inputTarea.addEventListener("keypress", (event) => {   // un add eventen listener a el input de texto, de Presionar Key
    if (event.key === "Enter") { // si event.key es === a Enter osea a la key "Enter" que presione
        btn.click(); // se va a ejecutar el addEventListener btnAddEventListener/btn.click()
    }
});