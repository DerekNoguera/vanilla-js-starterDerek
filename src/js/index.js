// // Inserte el código aquí
// // Variables que obtienen los valores de el Dom
import { postTaks, getTask, deleteTask } from "./api.js";

let inputTarea = document.getElementById("contenido-txt");
let btn = document.getElementById("btn");
let contador = document.getElementById("contador");
let contenedorTareas = document.getElementById("contanedor-tareas");


btn.addEventListener("click", async () => { // funcion async para que pueda ejecutar mis promesas
    if (inputTarea.value.trim() === "") {
        alert("No puedes crear una tarea vacia");
    } else {
        await postTaks(); // si es else se va a ejecurtar el subir tareas
        await perrito(); // lo mismo con cargar tareas
        inputTarea.value = ""
    }
})

const perrito = async () => { // funcion async para poder llamar las promesas
    const data = await getTask();
    contenedorTareas.innerHTML = "";
    data.forEach(e => {
        let contenedor = document.createElement("div");
        contenedor.className = "contenedor";
        contenedor.dataset.taskId = e.id; // el dataset es propio de HTML para poder guardar y leer datos entonces contenedor
        // dataset.taskId va a ser igual a el ID 

        let checkbox = document.createElement("input");
        checkbox.className = "checkbox";
        checkbox.type = "checkbox";
        contenedor.appendChild(checkbox);
        let cont = 0
        console.log(cont);
        if (checkbox.checked) {
            contador++
        }

        let divs = document.createElement("h2");
        divs.className = "tareas";
        divs.innerHTML = e.Task;
        contenedor.appendChild(divs);

        let eliminar = document.createElement("img");
        eliminar.src = "img/eliminar.png";
        eliminar.className = "eliminar";
        contenedor.appendChild(eliminar);

        eliminar.addEventListener("click", async () => {
            const taskId = contenedor.dataset.taskId; // se guarda en taskId el valor de contenedor.dataset.taskId que es e.id
            await deleteTask(taskId);// se llama la funcion deleteTask(taskId) para que elimine de la API el elemento encontra con el taskId que es el ID
            console.log(taskId);// se le envia el id como parametro para que lo reciba en la API
            contenedorTareas.removeChild(contenedor);
        });
        contenedorTareas.appendChild(contenedor);
    });
};
inputTarea.addEventListener("keypress", (event) => {
    // un add eventen listener a el input de texto, de Presionar Key
    if (event.key === "Enter") {
        // si event.key es === a Enter osea a la key "Enter" que presione
        btn.click(); // se va a ejecutar el addEventListener btnAddEventListener/btn.click()
    }
});
window.addEventListener("load", () => {// recarga la pagina para que se actualice perrito
    perrito()
})
