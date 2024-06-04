
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
export { postTaks, getTask }

// let inputTarea = document.getElementById("contenido-txt");
// const postTaks = async () => { // funcion para recibir la apy
//     try {
//         const response = await fetch('http://localhost:3000/api/task', {
//             method: 'POST', // metodo post para que se haga un post de lo que añadi
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Task: inputTarea.value, // task va a ser igual a mi input que mi input es inputTarea.value,
//             })
//         });
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error(error)
//     }
// }
// export {postTaks}

// async function getId() {
//     const response = await fetch('http://localhost:3000/api/task');
//     const data = await response.json();
//     divs.innerHTML = data
//     };
// getId()


// const deleteTask = async () => {
//     // try {
//     //     const deletResponse = await fetch("http://localhost:3000/api/task");
//     //     const data = await deletResponse.json();
//     //     data.forEach(async (e) => {
//     //         if (e.id) {
//     //             try {
//     //                 const deleteResponse = await fetch(`http://localhost:3000/api/task/${e.id}`, {
//     //                     method: 'DELETE'
//     //                 });
//     //                 if (deleteResponse.ok) {
//     //                     contenedorTareas.removeChild(contenedor);
//     //                     console.log("Tarea eliminada con ID:", e.id);
//     //                 } else {
//     //                     console.error("error:", e.id);
//     //                 }
//     //             } catch (error) {
//     //                 console.error("error", e.id,);
//     //             }
//     //         }
//     //     });
//     // } catch (error) {
//     //     console.error("Error:", error);
//     // }
// };


// async function getId() {
//     const response = await fetch('http://localhost:3000/api/task');
//     const data = await response.json();
//     divs.innerHTML = data
//     };
// getId() 