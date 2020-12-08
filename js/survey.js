const woodTypes = ["oak", "cherry", "balsa", "maple", "birch", "hickory", "mahogany"];
var wood_type = "";

function findWood(value) {
    if (document.getElementById(value).checked) {
        wood_type = value.charAt(0).toUpperCase() + value.slice(1);
    }
}

function pushData() {
    alert("Pushing data...");

    // Create the http get request and send it
    const httpGetRequest = new XMLHttpRequest();
    httpGetRequest.open("GET", "https://api.jsonbin.io/b/5fcd9b91516f9d127028f8ad", true);
    httpGetRequest.setRequestHeader("Content-Type","application/json");
    httpGetRequest.setRequestHeader("versioning", "false");
    httpGetRequest.setRequestHeader("secret-key", "$2b$10$uAkM9kVDr02pUm9ChKrKEOdiNSQoNQqhNlAw8rcIsN18VtoE.sotO");
    httpGetRequest.send();

    // As soon as we receive a response, process it
    httpGetRequest.onreadystatechange = function() {
        if (httpGetRequest.readyState === 4 && httpGetRequest.status === 200) {

            // Adding the form data to the put response
            const json = JSON.parse(httpGetRequest.responseText);
            const first_name = document.getElementById("firstName").value;
            const last_name = document.getElementById("lastName").value;
            woodTypes.forEach(findWood);
            json['person'].push({"first_name": first_name, "last_name": last_name, "wood_type": wood_type});
            jsonStr = JSON.stringify(json);
            // Logging the new json file to the console
            console.log(jsonStr);

            // Creating and sending the updated json data to the database
            const httpPutRequest = new XMLHttpRequest();
            httpPutRequest.open("PUT", "https://api.jsonbin.io/b/5fcd9b91516f9d127028f8ad", true);
            httpPutRequest.setRequestHeader("Content-Type", "application/json");
            httpPutRequest.setRequestHeader("versioning", "false");
            httpPutRequest.setRequestHeader("secret-key", "$2b$10$uAkM9kVDr02pUm9ChKrKEOdiNSQoNQqhNlAw8rcIsN18VtoE.sotO");
            httpPutRequest.send(jsonStr);
            httpPutRequest.onreadystatechange = function () {
                if (httpPutRequest.readyState === 4 && httpPutRequest.status === 200) {
                    alert("Database updated!");
                }
            };
        }
    };
}