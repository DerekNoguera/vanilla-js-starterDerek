
// import { inputTarea } from "./index.js";
const getTask = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/task')
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}
let inputTarea = document.getElementById("contenido-txt");
const postTaks = async () => { // funcion para recibir la apy
    try {
        const response = await fetch('http://localhost:3000/api/task', {
            method: 'POST', // metodo post para que se haga un post de lo que añadi
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Task: inputTarea.value, // task va a ser igual a mi input que mi input es inputTarea.value, 
                check: "Incompleto"
            })
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error)
    }
}
const putTask = async (cid, parametroDivs) => { // funcion para recibir la apy
    console.log(parametroDivs)
    try {
        const response = await fetch(`http://localhost:3000/api/task/` + cid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Task: parametroDivs,
            })
        });
        const data = await response.json();
        console.log(data);

    } catch (error) {
    }
}
const putTask2 = async (cid, completo) => { // funcion para recibir la apy
    try {
        const response = await fetch(`http://localhost:3000/api/task/` + cid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check: completo    
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
    }
}
const deleteTask = async (ID) => {
    try {
        const deleteResponse = await fetch(`http://localhost:3000/api/task/${ID}`, {
            //recibe iD como parametro y lo concatena al API
            method: 'DELETE'
        });
        if (!deleteResponse.ok) {
            console.error("Error eliminando tarea");
        }
    } catch (error) {
        console.error("Error de red al eliminar la tarea:", error);
    }
};
export { postTaks, getTask, deleteTask, putTask, putTask2 }
