const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Apply saved theme or default to standard
let savedTheme = localStorage.getItem('savedTheme') || 'standard';
changeTheme(savedTheme);

// Fetch todos from backend
async function getTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/todos', { method: 'GET' });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
        const todos = await response.json();
        todos.forEach(todo => {
            addTodoToDOM(todo.text, todo._id, todo.completed);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to load todos: ' + error.message);
    }
}

// Add todo to DOM
function addTodoToDOM(text, id, completed) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);
    if (completed) toDoDiv.classList.add('completed');

    const newToDo = document.createElement('li');
    newToDo.innerText = text;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    checked.dataset.id = id;
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    deleted.dataset.id = id;
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
}

// Add new todo
async function addToDo(event) {
    event.preventDefault();
    if (toDoInput.value === '') {
        alert("You must write something!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: toDoInput.value })
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
        const todo = await response.json();
        addTodoToDOM(todo.text, todo._id, todo.completed);
        toDoInput.value = '';
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Error adding todo: ' + error.message);
    }
}

// Handle delete and check actions
async function deleteCheck(event) {
    const item = event.target;
    const id = item.dataset.id;

    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
            todo.addEventListener('transitionend', () => todo.remove());
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('Error deleting todo: ' + error.message);
        }
    }

    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        const completed = !todo.classList.contains('completed');
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
            todo.classList.toggle('completed');
        } catch (error) {
            console.error('Error updating todo:', error);
            alert('Error updating todo: ' + error.message);
        }
    }
}

// Change theme
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;
    document.body.className = color;
    color === 'darker' ?
        document.getElementById('title').classList.add('darker-title') :
        document.getElementById('title').classList.remove('darker-title');
    document.querySelector('input').className = `todo-input ${color}-input`;
    document.querySelectorAll('.todo').forEach(todo => {
        todo.className = `todo ${color}-todo ${todo.classList.contains('completed') ? 'completed' : ''}`;
    });
    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`;
        } else if (button.classList.contains('todo-btn')) {
            button.className = `todo-btn ${color}-button`;
        }
    });
}