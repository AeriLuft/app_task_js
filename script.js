const form = document.getElementById ("todo-form");
const input = document.getElementById ("todo-input");
const list = document.getElementById ("todo-list");
const clearBtn = document.getElementById ("clear-completed");
const countEl = document.getElementById ("count");

let tareas =[];

form.addEventListener("submit", function (e){
        e.preventDefault (); 
        const texto = input.value.trim();
        if (texto === '') {
            alert ('Por favor escribe una tarea');
            return;
        }

        const nuevaTarea = {
            texto: texto,
            compleada: false,
        };
        
        tareas.push(nuevaTarea);

        input.value = "";
        input.focus();
        //Actualizamos la lista jijiji
        mostrarTareas();
});

function mostrarTareas() {
    list.innerHTML = "";
    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";
        const divIzq = document.createElement("div");
        divIzq.className="todo-left";
        const check = document.createElement ("input");
        check.type = "checkbox";
        check.checked = tarea.completada;
        const texto = document.createElement("span");
        texto.textContent = tarea.texto;
        texto.className = "todo-title";
        if(tarea.compleada) {
            texto.classList.add("Completed");           
        }

        check.addEventListener("change",()=>{
            tarea.completada = check.checked;
            mostrarTareas();
        });

        divIzq.appendChild(check);
        divIzq.appendChild(texto);

        const divDer = document.createElement("div")
        divDer.className = "todo-actions";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent="🗑️"
        btnEliminar.addEventListener("click",()=>{
            tareas.splice(index,1);
            mostrarTareas();
        });

        divDer.appendChild(btnEliminar);

        li.appendChild(divIzq);
        li.appendChild(divDer);
        list.appendChild(li);
    });

    //actualizar el contador de tareas
    actualizarContador();
}

//DARLE FUNCION A NUESTRO BOTON DE TAREAS COMPLETADAS

clearBtn.addEventListener("click", ()=>{
    tareas = tareas.filter((t)=>!t.completada);
    mostrarTareas();
});

//mostrar cantidad de tareas pendientes

function actualizarContador (){
    const pendientes = tareas.filter((t)=>!t.completada).length;
    countEl.textContent= pendientes + (pendientes === 1 ? "tarea pendiente" : "tareas pendientes");
}