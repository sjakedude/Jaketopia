const app = new Vue({
    el: '#woodTable',
    data: {
        woodTableRows: []
    }
});

// Function that fetches the data from the json file and
// displays it in the table
function fetchData() {
    // If the table is already populated, do nothing
    if (app.woodTableRows.length > 0) {
        return false;
    }

    // Create the http get request and send it
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "https://api.jsonbin.io/b/5fcd8f84516f9d127028f553", true);
    httpRequest.send();
    // As soon as we receive a response, process it
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            // Parsing out the json into an object and pushing it into the array collegeCareer
            let json = JSON.parse(httpRequest.responseText);
            for (let x in json.person) {
                let first_name = json.person[x].first_name;
                let last_name = json.person[x].last_name;
                let wood_type = json.person[x].wood_type;
                let person = {first_name: first_name, last_name: last_name, wood_type: wood_type};
                app.woodTableRows.push(person);
            }
        }
    };
}
