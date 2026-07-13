let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const title = taskInput.value.trim();

    if (title === "") {
        alert("Enter task");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        priority: priority.value,
        completed: false,
        date: new Date().toLocaleString()
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();

    renderTasks();
}

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "pending") {
        filtered = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filtered = tasks.filter(task => task.completed);
    }

    filtered.forEach(task => {

        const div = document.createElement("div");

        div.className = `task ${task.completed ? "completed" : ""}`;

        div.innerHTML = `
        <div class="left">

        <input type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${task.id})">

        <div>

        <div class="title">${task.title}</div>

        <div class="info">

        <span class="badge ${task.priority}">
        ${task.priority}
        </span>

        ${task.date}

        </div>

        </div>

        </div>

        <button class="delete"
        onclick="deleteTask(${task.id})">
        Delete
        </button>
        `;

        taskList.appendChild(div);

    });

    updateCounter();
}

function updateCounter() {

    totalCount.textContent = tasks.length;

    pendingCount.textContent =
        tasks.filter(task => !task.completed).length;
}

document.getElementById("addBtn")
.addEventListener("click", addTask);

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        renderTasks();

    });

});

renderTasks();