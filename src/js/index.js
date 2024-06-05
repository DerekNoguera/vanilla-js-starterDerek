// // Inserte el código aquí

import { postTaks, getTask, deleteTask } from "./api.js";

let inputTarea = document.getElementById("contenido-txt");
let btn = document.getElementById("btn");
let contador = document.getElementById("contador");
let contenedorTareas = document.getElementById("contanedor-tareas");
let sinTarea = document.createElement("h1")

export { inputTarea }
// const conta = async () => {
//     await putTask(contador.textContent)
// }
// conta(contador)

sinTarea.className = "tarea"
sinTarea.innerHTML = "No existen tareas Creadas"
contenedorTareas.appendChild(sinTarea)

btn.addEventListener("click", async () => { // funcion async para que pueda ejecutar mis promesas
    if (inputTarea.value.trim() === "") {
        alert("Ingrese un Texto");
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
        console.log(e.id);
        let contenedor = document.createElement("div");
        contenedor.className = "contenedor";

        var checkbox = document.createElement("input");
        checkbox.className = "checkbox";
        checkbox.type = "checkbox";
        contenedor.appendChild(checkbox);
        checkbox.id = e.id
        console.log(checkbox.id);

        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {
                contador.textContent++
            } else {
                contador.textContent--
            }
        });

        let divs = document.createElement("h2");
        divs.className = "tareas";
        divs.innerHTML = e.Task;
        contenedor.appendChild(divs);

        let eliminar = document.createElement("img");
        eliminar.src = "/img/delete.png"
        eliminar.alt = "error"
        eliminar.className = "eliminar";
        eliminar.dataset.taskId = e.id; // el dataset es propio de HTML para poder guardar y leer datos entonces contenedor
        // dataset.taskId va a ser igual a el ID 
        contenedor.appendChild(eliminar);

        eliminar.addEventListener("click", async () => {
            const ID = eliminar.dataset.taskId; // se guarda en taskId el valor de contenedor.dataset.taskId que es e.id
            await deleteTask(ID);// se llama la funcion deleteTask(taskId) para que elimine de la API el elemento encontra con el taskId que es el ID
            // se le envia el id como parametro para que lo reciba en la API
            console.log("Se ha eliminado el id " + ID);
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

