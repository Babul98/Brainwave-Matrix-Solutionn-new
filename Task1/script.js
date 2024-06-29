// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', deleteTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        taskInput.value = '';
    }

    function deleteTask(event) {
        if (event.target.classList.contains('delete')) {
            const li = event.target.parentElement;
            taskList.removeChild(li);
        }
    }
});
