function displayResume() {
    if (confirm("Resume will open another window")) {
        window.open("media/resume.pdf", "Resume", "toolbar=no, location=no");
    } else {
        return false;
    }
}
