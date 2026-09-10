// Restore the demonstration seat count to 12 after testing the full-workshop case.
let availableSeats = 0;

function checkRegistration() {
    let message = document.getElementById("registrationStatus");
    message.textContent = "Registration is currently open.";
}

function checkSeats() {
    let message = document.getElementById("seatMessage");
    if (availableSeats > 0) {
        message.textContent = "Seats are available. Remaining seats: " + availableSeats;
    } else {
        message.textContent = "Sorry, no seats are available.";
    }
}

function showGreeting() {
    let name = document.getElementById("studentName").value;
    let output = document.getElementById("greetingMessage");
    output.textContent = "Welcome, " + name + "!";
}

// Additional simple interaction required by the weekly practical task.
function showReminder() {
    let message = document.getElementById("reminderMessage");
    message.textContent = "Please bring your laptop and arrive ready to practise HTML, CSS and JavaScript.";
}

// Lab 04: read, validate, group, convert and save the four form values.
function submitRegistration() {
    let name = document.getElementById("studentName").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let workshop = document.getElementById("workshop").value;
    let message = document.getElementById("formMessage");

    if (name === "") {
        message.textContent = "Please enter your full name.";
        return;
    }
    if (studentId === "") {
        message.textContent = "Please enter your student ID.";
        return;
    }
    if (email === "") {
        message.textContent = "Please enter your email address.";
        return;
    }
    if (workshop === "") {
        message.textContent = "Please select a workshop.";
        return;
    }

    let registration = {
        name: name,
        studentId: studentId,
        email: email,
        workshop: workshop
    };
    let jsonData = JSON.stringify(registration);

    // Storage can be blocked by browser settings. Only confirm after saving.
    try {
        localStorage.setItem("registration", jsonData);
    } catch (error) {
        message.textContent = "Unable to save. Please allow browser storage and try again.";
        return;
    }

    document.getElementById("jsonOutput").textContent = jsonData;
    document.getElementById("savedMessage").textContent = "";
    message.textContent = "Registration saved successfully.";
}

function showSavedRegistration() {
    let output = document.getElementById("savedMessage");
    let savedData;

    try {
        savedData = localStorage.getItem("registration");
    } catch (error) {
        output.textContent = "Unable to read saved data. Please allow browser storage and try again.";
        return;
    }

    if (savedData === null) {
        document.getElementById("jsonOutput").textContent = "No registration saved yet.";
        output.textContent = "No saved registration was found.";
        return;
    }

    // Handle damaged or unrelated data without crashing the page.
    try {
        let registration = JSON.parse(savedData);
        if (registration === null ||
            typeof registration.name !== "string" ||
            typeof registration.studentId !== "string" ||
            typeof registration.email !== "string" ||
            typeof registration.workshop !== "string") {
            output.textContent = "Saved data is not a registration. Clear it and register again.";
            return;
        }
        document.getElementById("jsonOutput").textContent = savedData;
        output.textContent = registration.name + " (Student ID: " + registration.studentId +
            ") registered for " + registration.workshop + ". Email: " + registration.email + ".";
    } catch (error) {
        output.textContent = "Saved data could not be read. Clear it and register again.";
    }
}

function clearRegistration() {
    let output = document.getElementById("savedMessage");
    try {
        localStorage.removeItem("registration");
    } catch (error) {
        output.textContent = "Unable to clear saved data. Please allow browser storage and try again.";
        return;
    }
    document.getElementById("jsonOutput").textContent = "No registration saved yet.";
    document.getElementById("formMessage").textContent = "";
    output.textContent = "Saved registration cleared.";
}
