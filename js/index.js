/**
 * ! CAPTURING VARIABLES
 */
let errorMsg = document.querySelector('.error');
let errorDateMsg = document.querySelector('.errorDate');
let errorDesc = document.querySelector('.errorDesc');

let addButton = document.querySelector('#addButton');

let container = document.querySelector('.container');

/** 
 * ! SHOWING MODEL FUNCTION
 */

let showModalFunction = (e)=> {

    // Get the modal
    let showModal = document.querySelector('#addNew');

    
    

    showModal.addEventListener('click', ()=> {
       container.style.display = 'block';
    });

    let closeButton = document.querySelector('.close-btn');

    closeButton.addEventListener('click', ()=> {
        container.style.display = 'none';
    });

    let closeModal = document.querySelector('.modal__close-btn');

    closeModal.addEventListener('click', ()=> { 
        container.style.display = 'none';
    });



}

showModalFunction();

// FORM VALIDATION 

const form = document.querySelector(".form");
form.addEventListener("submit", (e)=> {
    e.preventDefault();

    formValidation();
})

let formValidation = (e) => {
   if(taskInput.value === "" || dateInput.value === "" || descriptionInput === "") {
        errorMsg.innerHTML = 'All fields must be filled';
   } else {
    errorMsg.innerHTML = '';
    acceptData();

    (()=> {
        container.style.display = "none";
    })();
   }
}

// CAPTURING AND ACCEPTING DATA 
let taskInput = document.querySelector('#task');
let dateInput = document.querySelector('#date');
let descriptionInput = document.querySelector('#description');

let data = [];

let acceptData = () => {

    data.push({
        text: taskInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    })
    console.log(data);
    // data["text"] = taskInput.value;
    // data["date"] = dateInput.value;
    // data["description"] = descriptionInput.value;
    // console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
}

// CREATE TASKS
let taskContainer = document.querySelector('#tasks');
let createTasks = ()=> {
    taskContainer.innerHTML = "";
    data.map((x, y)=> {
        return (
            taskContainer.innerHTML += `
                <div id=${y}>
                    <span class="bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <span>${x.description}</span>

                    <span class="options">
                        <i onClick="editTask(this)" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
                    </span>
                </div>
                `
                );
    })
    
    reset();
}

// RESET FORM
let reset = ()=> {
    taskInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
}

//DELETE and EDIT BUTTON FUNCTIONALITY
let deleteTask = (e)=> {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(e.parentElement.parentElement.id);
    console.log(data);
}

let editTask = (e)=> {
    container.style.display = 'block';
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask);
    taskInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    descriptionInput.value = selectedTask.children[2].innerHTML;

    // selectedTask.remove(); -- replace with the following 
    deleteTask(e);
}

//RETRIEVING DATA FROM LOCAL STORAGE

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})();