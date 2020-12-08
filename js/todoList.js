var currentId = "";

const app = new Vue({
    el: '#taskList',
    data: {
        tasks: []
    }
});

// Function that adds a task
function addTask() {
    if (app.tasks.length > 6) {
        taskAddedAlert("Too many tasks");
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

// Function that prompts the user to see if they want to remove a task from the list
function removeTask(id) {
    document.getElementById("popupWindow").style.display = "block";
    let message = "Are you sure you want to remove the task \"" + id + "\" ?";
    document.getElementById("popupWindow-text").innerText = message;
    currentId = id;
}

// Function that remove
function yesRemoveTask() {
    document.getElementById("popupWindow").style.display = "none";
    let index = app.tasks.indexOf(currentId);
    app.tasks.splice(index, 1);
    currentId = "";
}

function noRemoveTask() {
    document.getElementById("popupWindow").style.display = "none";
}