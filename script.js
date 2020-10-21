const addTaskButton = document.querySelector('#add-task-button');
const taskNameInput = document.querySelector('#task');
const tasksList = document.querySelector('.tasks-list');
const showErrorMessage = document.querySelector('.error-message');

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
    const taskText = clone.querySelector('.task-text');

    taskText.append(taskNameInput.value);
    tasksList.appendChild(clone);
    return true;
}

function clearTaskNameInput() {
    taskNameInput.value = "";
}

function validateTaskNameInput() {
    if (taskNameInput.value == null || taskNameInput.value === '') {
        showErrorMessage.classList.add('error-message-active');
        taskNameInput.classList.add('new-task-error');
        return false;
    } else {
        showErrorMessage.classList.remove('error-message-active');
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


