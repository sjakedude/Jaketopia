const app = new Vue({
    el: '#woodTable',
    data: {
        woodTableRows: []
    }
});


function sendData() {
    var formData = document.getElementById("form").serializeObject();
    console.log("HI");
    console.log(formData);
}


// Function that fetches the data from the json file and
// displays it in the table
function fetchData() {
    // If the table is already populated, do nothing
    if (app.person.length > 0) {
        return false;
    }
    // Create the http get request and send it
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "data/wood.json", true);
    httpRequest.send();
    // As soon as we receive a response, process it
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            // Parsing out the json into an object and pushing it into the array collegeCareer
            let json = JSON.parse(httpRequest.responseText);
            for (let x in json.person) {
                let first_name = json.person[x].first_name;
                let last_name = json.person[x].last_name;
                let wood = json.person[x].wood;
                let person = {first_name: first_name, last_name: last_name, wood: wood};
                app.woodTableRows.push(person);
            }
        }
    };
}