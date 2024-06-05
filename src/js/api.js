
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
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}
const deleteTask = async (taskId) => {
    try {
        const deleteResponse = await fetch(`http://localhost:3000/api/task/${taskId}`, {
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
export { postTaks, getTask, deleteTask }
