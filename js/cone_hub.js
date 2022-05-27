function pull() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:5000/DeviceBoot", true);
    request.setRequestHeader("Access-Control-Allow_Origin", "*");
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            // Logging the new json file to the console
            var data = JSON.parse(request.responseText);
            console.log(data);
            document.getElementById("devices").appendChild(makeUL(data["devices"]));
        }
    };
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement("ul");

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement("li");

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo: