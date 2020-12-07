function validateInput() {
    alert("Data Sent!");
    // Resetting display of errros
    displayError("");

    // Defining the regex expression to only allow alpha characters
    const regex = /^[a-zA-Z]+$/;

    // Fetching the names from the form
    const fname = document.applicationForm.firstName.value;
    const lname = document.applicationForm.lastName.value;
    const facilitator = document.applicationForm.facilitator.value;

    // Checking to make sure the names match the regex
    const fnameMatch = fname.match(regex);
    const lnameMatch = lname.match(regex);
    if (fnameMatch == null || lnameMatch == null) {
        displayError("Non alpha characters used, or empty field. Please use only letter A-Z");
        return false;
    }

    // Checking if names are at least 2 characters long
    if (fname.length < 2 || lname.length < 2) {
        displayError("First name or last name too short");
        return false;
    }

    // Making sure the facilitator is in the list of active facilitators
    if (!facilitators.includes(facilitator)) {
        displayError("Facilitator does not exist");
        return false;
    }

    // If all is correct, return true and submit the POST request
    return true;
}

