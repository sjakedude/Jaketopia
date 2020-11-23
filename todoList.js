const app = new Vue({
    el: '#taskList',
    data: {
        tasks: []
    },
    created() {
        fetch("https://api.myjson.com/bins/74163")
            .then(response => response.json())
            .then(json => {
                this.products = json.products
            })
    }
})

function changeTask() {
    let task = document.getElementById("task").value
    app.tasks.push(task)
    alert("Task added");
}