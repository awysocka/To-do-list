const addTaskButton = document.querySelector('#add-task-button');
const taskNameInput = document.querySelector('#task-name-input');
const tasksList = document.querySelector('#tasks-list');
const errorMessage = document.querySelector('#error-message');

let list = JSON.parse(localStorage.getItem('tasks')) || [];

function randerList() {
    list.forEach(task => {
        renderTask(task);
    });
}

function renderTask(task) {
    const template = document.querySelector('#list-element');
    const clone = template.content.cloneNode(true);
    const taskNameElement = clone.querySelector('.task-name');
    const taskCompleteButton = clone.querySelector('.complete-button');
    const taskDeleteButton = clone.querySelector('.delete-button');
    const taskElement = clone.querySelector('.tasks-list-item');
    const taskCompleteIcon = taskCompleteButton.querySelector('i');
    
    taskCompleteButton.addEventListener('click', completeTask);
    taskDeleteButton.addEventListener('click', deleteTask);
    taskNameElement.textContent = task.name;
    taskElement.dataset.id = task.id; 
    if(task.completed === true) {
        taskCompleteIcon.classList.toggle('fas');
        taskElement.classList.toggle('task-list-item-completed');
    }
    tasksList.appendChild(clone);
}

function addTask() {
    // checks if the browser supports template element
    if(!'content' in document.createElement('template')) {
        alert("Please try using newer browser");
        return false;
    }

    const validTaskName = validateTaskNameInput();
    if (!validTaskName) {
        return false;
    }

    const task = {name: taskNameInput.value, id: Date.now().toString(), completed: false};
    list.push(task);
    localStorage.setItem('tasks', JSON.stringify(list)); 

    renderTask(task);

    return true;
}

function completeTask(e) {
    const taskCompleteButton = e.target;
    const taskCompleteIcon = taskCompleteButton.querySelector('i');
    const taskElement = taskCompleteButton.parentElement;
    const taskId = taskCompleteButton.parentElement.dataset.id;

    const completedTask = list.filter(el => {
        return el.id === taskId;
    })[0];

    completedTask.completed = !completedTask.completed;
    localStorage.setItem('tasks', JSON.stringify(list)); 

    taskCompleteIcon.classList.toggle('fas');
    taskElement.classList.toggle('task-list-item-completed');
}

function deleteTask(e) {
    const taskDeleteButton = e.target;
    const taskId = taskDeleteButton.parentElement.dataset.id;
    
    list = list.filter(el => {
        return el.id != taskId;
    });

    localStorage.setItem('tasks', JSON.stringify(list)); 

    taskDeleteButton.parentElement.remove();
}

function clearTaskNameInput() {
    taskNameInput.value = "";
}

function validateTaskNameInput() {
    if (taskNameInput.value == null || taskNameInput.value === '') {
        errorMessage.classList.add('error-message-visible');
        taskNameInput.classList.add('new-task-error');
        return false;
    } else {
        errorMessage.classList.remove('error-message-visible');
        taskNameInput.classList.remove('new-task-error');
        return true;
    }
}

function handleAddTask() {
    const taskAdded = addTask();
    if (taskAdded) {
        clearTaskNameInput();
    }
}

window.addEventListener('load', randerList);

addTaskButton.addEventListener('click', handleAddTask);

taskNameInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        handleAddTask();
    }
});

taskNameInput.addEventListener('input', validateTaskNameInput);
