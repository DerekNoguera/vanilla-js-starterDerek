// // Inserte el código aquí
import { postTaks, getTask, deleteTask, putTask, putTask2 } from "./api.js";

let inputTarea = document.getElementById("contenido-txt");
let btn = document.getElementById("btn");
let contador = document.getElementById("contador");
let sinT = document.getElementById("sinT")
let contenedorTareas = document.getElementById("contanedor-tareas");
contador.textContent = 0

btn.addEventListener("click", async () => {          // funcion async para que pueda ejecutar mis promesas
    if (inputTarea.value.trim() === "") {
        alert("Ingrese un Texto");
    } else {
        let res = await postTaks();// si es else se va a ejecurtar el subir tareas
        if (res.length > 0) {
            console.log("hola", res.length)
            sinT.innerHTML = ""
        }
        await actualizar();                            // lo mismo con cargar tareas
        inputTarea.value = ""
    }
})

const actualizar = async () => {                        // funcion async para poder llamar las promesas
    contador.textContent = 0
    const data = await getTask();
    contenedorTareas.innerHTML = "";
    data.forEach(e => {
        sinT.innerHTML = ""
        let contenedor = document.createElement("div"); // crea divs para cada tarea
        contenedor.className = "contenedor";

        var checkbox = document.createElement("input"); // crear un checkbox para cada tarea y se crea dentro de el div
        checkbox.className = "checkbox";
        checkbox.type = "checkbox";
        contenedor.appendChild(checkbox);

        checkbox.id = e.id
        let cid = checkbox.id
        checkbox.addEventListener('click', async () => { // Una funcion async para validar cuando una tarea esta hecha o no
            if (checkbox.checked) {
                putTask2(cid, "completo")
            } else {
                putTask2(cid, "incompleto")
            }
            location.reload() // recarga la pagina para que se actualice cada que se checkee el checkbox
        });

        if (e.check === "completo") {
            checkbox.checked = true
            if (checkbox.checked) {
                contador.textContent++
            }
        }
        let divs = document.createElement("h2"); // crea e texto de la tarea 
        divs.className = "tareas";
        divs.innerHTML = e.Task;
        contenedor.appendChild(divs);
        divs.addEventListener("click", () => {
            let inputEdit = document.createElement("input")// al tocar el campo de texto te permite editar la tarea
            inputEdit.type = "text"
            inputEdit.placeholder = "Reescribe tu tarea"
            inputEdit.className = "textEdit"
            contenedor.appendChild(inputEdit);
            inputEdit.addEventListener("keypress", async (event) => {
                // funcion de el input que edita la tarea se puede usar con la tecla ENTER
                if (event.key == "Enter") {
                    if (inputEdit.value.trim() === "") {
                        alert("No puedes dejar campos en blanco")
                    } else {
                        divs.textContent = inputEdit.value
                        let parametroDivs = divs.textContent
                        // el contenido de el input se reescribe en pantalla
                        divs.id = e.id

                        let idPutTask = divs.id
                        contenedor.removeChild(inputEdit)
                        console.log(parametroDivs)
                        putTask(idPutTask,parametroDivs)
                        // se le envian como parametro el valor de el input y el ID a el PUT
                    }
                }
            })
        })
        let eliminar = document.createElement("img");
        //crea una imagen
        eliminar.src = "https://img.icons8.com/?size=60&id=67884&format=png"
        eliminar.alt = "error"

        eliminar.className = "eliminar";
        eliminar.dataset.taskId = e.id; // el dataset es propio de HTML para poder guardar y leer datos entonces contenedor
        // dataset.taskId va a ser igual a el ID 
        contenedor.appendChild(eliminar);

        eliminar.addEventListener("click", async () => {
            // la funcion de la imagen es Eliminar de el API y de la parte visual y tambien elimina toda la tarea
            const ID = eliminar.dataset.taskId; // se guarda en taskId el valor de contenedor.dataset.taskId que es e.id
            await deleteTask(ID);// se llama la funcion deleteTask(taskId) para que elimine de la API el elemento encontra con el taskId que es el ID
            // se le envia el id como parametro para que lo reciba en la API
            console.log("Se ha eliminado el id " + ID);
            contenedorTareas.removeChild(contenedor);
            location.reload()
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
window.addEventListener("load", () => {// recarga la pagina para que se actualice actualizar
    actualizar()
})