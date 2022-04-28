users = ["MorganB676", "KristaW347"];
usernames = ["Morgan", "Krista"];
passwords = ["1234", "pass"];
bins = ["626ae50725069545a32a84a5"];
api_key = "$2b$10$tHgr1cxqS0Dsh7wk5ZEpdOnD2k8OD09lSqB42L8tg/Tr3OHGrnTFe";

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
            displayDashboard(user, index);
        } else {
            console.log("Incorrect password");
        }
    }
}

function returnDate() {
    var today = new Date();
    // Change this to simulate next month
    today.setMonth(4, 3);

    return today;
}

function displayDashboard(user, index) {
    document.getElementById("loginConent").style.display = "none";
    document.getElementById("welcomeMessage").innerText =
        "Hello, " + usernames[index];

    var date = returnDate();
    console.log(date);

    var year = date.getFullYear();
    var nextPaymentDate;
    var nextPaymentGraceEnd;

    // Determine if payment is needed
    const httpGetRequest = new XMLHttpRequest();
    getUserData(user, index, httpGetRequest);
    httpGetRequest.onreadystatechange = function() {
        if (httpGetRequest.readyState === 4 && httpGetRequest.status === 200) {
            // Logging the new json file to the console
            var data = JSON.parse(httpGetRequest.responseText);
            console.log("User Data:");
            console.log(data);
            console.log(date.getMonth() + 1 + "/" + date.getFullYear());
            var paidThisMonth =
                data["record"][user]["payments"][
                    date.getMonth() + 1 + "/" + date.getFullYear()
                ]["paid"];
            var paymentMsg = "";
            if (paidThisMonth) {
                paymentMsg = "== You have paid this month";
                nextPaymentDate = date.getMonth() + 2 + "/1/" + year + " 12:00 AM";
                nextPaymentGraceEnd = date.getMonth() + 2 + "/10/" + year + " 11:59 PM";
            } else {
                paymentMsg = "== You have NOT paid this month yet";
                nextPaymentDate = date.getMonth() + 1 + "/1/" + year + " 12:00 AM";
                nextPaymentGraceEnd = date.getMonth() + 1 + "/10/" + year + " 11:59 PM";
            }

            document.getElementById("content").innerText =
                "== Today is " +
                date +
                "\n\n" +
                "You next payment is due: " +
                nextPaymentDate +
                "\n\n" +
                "10 day grace period ends: " +
                nextPaymentGraceEnd +
                "\n\n" +
                paymentMsg;

            if (paidThisMonth) {
                document.getElementById("message").style.color = "Black";
                document.getElementById("message").style.background = "Green";
                document.getElementById("message").innerText = "THANK YOU";
            } else {
                var amount =
                    data["record"][user]["payments"][
                        date.getMonth() + 1 + "/" + date.getFullYear()
                    ]["amount"];
                document.getElementById("message").style.color = "Black";
                document.getElementById("message").style.background = "Red";
                document.getElementById("message").innerText =
                    "YOU HAVE NOT PAID, CLICK BELOW TO PAY";
                document.getElementById("paymentCollection").style.display = "block";
                document.getElementById("amount").innerText = "\nYou owe: $" + amount;
                document.getElementById("confirm").checked = false;
            }
        }
    };
}

function getUserData(user, index, request) {
    request.open("GET", "https://api.jsonbin.io/v3/b/" + bins[index], true);
    request.setRequestHeader("X-Master-Key", api_key);
    request.send();
}