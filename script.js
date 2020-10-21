const addTaskButton = document.querySelector('#add-task-button');
const taskNameInput = document.querySelector('#task-name-input');
const tasksList = document.querySelector('#tasks-list');
const errorMessage = document.querySelector('#error-message');

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

    const template = document.querySelector('#list-element');
    const clone = template.content.cloneNode(true);
    const taskNameElement = clone.querySelector('.task-name');
    const taskCompleteButton = clone.querySelector('.complete-button');
    
    taskCompleteButton.addEventListener('click', completeTask);

    taskNameElement.append(taskNameInput.value);
    tasksList.appendChild(clone);
    return true;
}

function completeTask(e) {
    const taskCompleteButton = e.target;
    const taskCompleteIcon = taskCompleteButton.querySelector('i');
    const taskElement = taskCompleteButton.parentElement;

    taskCompleteIcon.classList.toggle('fas');
    taskElement.classList.toggle('task-list-item-completed');
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

addTaskButton.addEventListener('click', e => {
    e.preventDefault();
    const taskAdded = addTask();
    if (taskAdded) {
        clearTaskNameInput();
    }
});

taskNameInput.addEventListener('input', validateTaskNameInput);
