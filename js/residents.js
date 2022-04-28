users = ["MorganB676", "KristaW347"];
passwords = ["1234", "pass"];

function login() {
    // Parsing credentials
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;
    index = NaN;
    console.log("Attempting login for: " + user);

    // Checking if users exists
    if (users.includes(user)) {
        console.log("User " + user + " exists");
        index = users.indexOf(user);
    } else {
        console.log("User " + user + " does not exist");
    }

    // Checking correct password for user
    if (index >= 0) {
        console.log("Verifying password");
        if (pass == passwords[index]) {
            console.log("Password correct");
            displayDashboard(user);
        } else {
            console.log("Incorrect password");
        }
    }
}

function displayDashboard(user) {
    document.getElementById("userLabel").style.visibility = "hidden";
    document.getElementById("passLabel").style.visibility = "hidden";
    document.getElementById("user").style.visibility = "hidden";
    document.getElementById("pass").style.visibility = "hidden";
    document.getElementById("login").style.visibility = "hidden";

    document.getElementById("content").innerText = "Hello, " + user;
}