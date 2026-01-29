// Get input elements
const title = document.getElementById("title");
const description = document.getElementById("description");
const locationInput = document.getElementById("location");
const email = document.getElementById("email");
const statusInput = document.getElementById("status");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const time = document.getElementById("time");

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("id", id);

// Get tasks from localStorage
const tasks = JSON.parse(localStorage.getItem("myTodoTask")) || [];

// Find the task if editing
const editTasks = tasks.find(task => task.id === id);
console.log("editTasks", editTasks);

// If editing, populate the form
if (editTasks) {
    title.value = editTasks.title;
    description.value = editTasks.description;
    locationInput.value = editTasks.location;
    email.value = editTasks.email;
    statusInput.value = editTasks.status;
    category.value = editTasks.category;
    priority.value = editTasks.priority;
    time.value = editTasks.time;
}

// Handle form submit
document.getElementById("todoForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Create task object
    const todoObject = {
        id: editTasks ? editTasks.id : Date.now().toString(), // keep id if editing
        title: title.value,
        description: description.value,
        location: locationInput.value,
        email: email.value,
        status: statusInput.value,
        category: category.value,
        priority: priority.value,
        time: time.value
    };

    if (editTasks) {
        // Update existing task
        const index = tasks.findIndex(task => task.id === editTasks.id);
        if (index !== -1) {
            tasks[index] = todoObject;
            console.log("Task updated:", todoObject);
        }
    } else {
        // Add new task
        tasks.push(todoObject);
        console.log("New task added:", todoObject);
        window.location.href="main.html"
    }

    // Save to localStorage
    localStorage.setItem("myTodoTask", JSON.stringify(tasks));

    // Reset form
    this.reset();

    // Refresh table if exists
    if (typeof showTable === "function") {
        showTable();
    }
});
