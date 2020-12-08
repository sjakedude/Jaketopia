function resetDatabase() {
    alert("Resetting Database...");

    // Creating and sending the updated json data to the database
    const httpPutRequest = new XMLHttpRequest();
    httpPutRequest.open("PUT", "https://api.jsonbin.io/b/5fcd9b91516f9d127028f8ad", true);
    httpPutRequest.setRequestHeader("Content-Type", "application/json");
    httpPutRequest.setRequestHeader("versioning", "false");
    httpPutRequest.setRequestHeader("secret-key", "$2b$10$uAkM9kVDr02pUm9ChKrKEOdiNSQoNQqhNlAw8rcIsN18VtoE.sotO");
    httpPutRequest.send('{"person": [{"first_name":"Jake","last_name":"Stephens","wood_type":"Balsa"}]}');
    httpPutRequest.onreadystatechange = function () {
        if (httpPutRequest.readyState === 4 && httpPutRequest.status === 200) {
            alert("Database reset!");
        }
    };

}