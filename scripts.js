document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `${taskText} <button>Delete</button>`;
            taskList.appendChild(li);
            saveTask(taskText);
            taskInput.value = '';
        }
    }

    function handleTaskActions(e) {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            deleteTask(li.innerText.slice(0, -7));
            taskList.removeChild(li);
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task} <button>Delete</button>`;
            taskList.appendChild(li);
        });
    }
});
k
