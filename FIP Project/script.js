// Select DOM elements
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Handle form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  const task = { taskName, dueDate, priority, category, done: false };
  addTaskToUI(task);
  saveTaskToLocalStorage(task);

  taskForm.reset();
});

// Add a task to the UI
function addTaskToUI(task) {
  const li = document.createElement("li");
  li.className = "task-item";

  li.innerHTML = `
    <span>${task.taskName} - ${task.dueDate} - ${task.priority} - ${task.category}</span>
    <button class="delete-btn">Delete</button>
  `;

  if (task.done) li.classList.add("done");

  li.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      toggleTaskStatus(task, li);
    } else if (e.target.classList.contains("delete-btn")) {
      deleteTask(task, li);
    }
  });

  taskList.appendChild(li);
}

// Toggle task done status
function toggleTaskStatus(task, li) {
  task.done = !task.done;
  li.classList.toggle("done");
  updateTaskInLocalStorage(task);
}

// Delete a task
function deleteTask(task, li) {
  taskList.removeChild(li);
  deleteTaskFromLocalStorage(task);
}

// Save task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.findIndex(t => t.taskName === task.taskName && t.dueDate === task.dueDate);
  tasks[index] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => !(t.taskName === task.taskName && t.dueDate === task.dueDate));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToUI);
}