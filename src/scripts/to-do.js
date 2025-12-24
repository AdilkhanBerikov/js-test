const form = document.querySelector('.to-do__form');
const input = document.querySelector('.to-do__input');
const button = document.querySelector('.to-do__button');
const list = document.querySelector('.to-do__list');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function renderTask(task) {
    const taskItem = `
        <li class="to-do__item ${task.done ? "done" : ""}" id="${task.id}">
            <div class="to-do__task">
                <label>
                    <input class="task__input" type="checkbox" ${task.done ? "checked" : ""}>
                    <span>${task.text}</span>
                </label>
                <div>
                    <button class="task__delete" type="button">
                        Delete
                    </button>
                </div>
            </div>
        </li>`;

    list.insertAdjacentHTML('beforeend', taskItem);
}

tasks.forEach(task => {
    renderTask(task);
})

function addTask(event) {
    event.preventDefault();

    const task = input.value;

    const taskInfo = {
        id: Date.now(),
        text: task,
        done: false,
    }

    tasks.push(taskInfo);

    renderTask(taskInfo);

    input.value = '';

    saveLocalStorage();
}

function removeTask(event) {

    if (!event.target.classList.contains('task__delete')) return;

    const targetItem = event.target.closest('.to-do__item');

    const taskID = Number(targetItem.id);

    tasks = tasks.filter(function (task) {
        return task.id !== taskID;
    })

    targetItem.remove();

    saveLocalStorage();
}

function toggleTask(event) {

    const isCheckBox = event.target.classList.contains('task__input');

    if (!isCheckBox) return;

    const targetItem = event.target.closest('.to-do__item');

    const checkBox = targetItem.querySelector('.task__input');

    const taskID = Number(targetItem.id);

    const task = tasks.find(function (task) {
        if (task.id === taskID) {
            return true;
        }
    })

    task.done = checkBox.checked;

    checkBox.classList.toggle('done', task.done);

    targetItem.classList.toggle('done', task.done);

    saveLocalStorage();
}

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', addTask);
list.addEventListener('click', removeTask);
list.addEventListener('click', toggleTask);