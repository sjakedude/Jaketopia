function displayResume() {
    if (confirm("Resume will open another window")) {
        const resumeWindow = window.open("media/resume.pdf", "Resume", "toolbar=no, location=no");
    } else {
        return false;
    }
}
