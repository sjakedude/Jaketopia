const app = new Vue({
    el: '#taskList',
    data: {
        tasks: []
    }
})

// Function that adds a task
function addTask() {
    if (app.tasks.length > 6) {
        taskAddedAlert("Too many tasks")
        return false;
    }
    let task = document.getElementById("taskTextBox").value;
    if (task == null || task === "") {
        taskAddedAlert("Task not added");
        return false;
    }
    app.tasks.push(task);
    taskAddedAlert("Task added!");
    document.getElementById("taskTextBox").value = "";
}

// Function that sets the status text
function taskAddedAlert(alertText) {
    document.getElementById("alert").innerText = alertText;
    setTimeout(taskRemoveAlert, 3000);
}

// Function that removes the status text and sets it to empty
function taskRemoveAlert() {
    document.getElementById("alert").innerText = "";

}

// Function that removes a task from the list
function removeTask(id) {
    if (confirm("Are you sure you want to remove the task \"" + id + "\" ?")) {
        // Removing item
        let index = app.tasks.indexOf(id);
        app.tasks.splice(index, 1);
    } else {
        // Do nothing
        return false;
    }
}