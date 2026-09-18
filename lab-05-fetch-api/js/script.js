// Lab 05: HTTP, Fetch and Simple API Use

async function loadWorkshop() {
  const msg = document.getElementById("loadMessage");
  msg.textContent = "Loading...";

  try {
    const response = await fetch("data/workshop.json");

    if (response.status === 200) {
      const workshop = await response.json();

      document.getElementById("workshopTitle").textContent = workshop.title;
      document.getElementById("workshopDate").textContent = workshop.date;
      document.getElementById("workshopVenue").textContent = workshop.venue;
      document.getElementById("workshopSeats").textContent = workshop.seats;

      msg.textContent = "Workshop data loaded successfully.";
    } else {
      msg.textContent = "Could not load workshop data. Status: " + response.status;
    }
  } catch (err) {
    msg.textContent = "Error: " + err.message;
  }
}

async function loadSampleUser() {
  const output = document.getElementById("apiUser");
  output.textContent = "Loading...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (response.status === 200) {
      const user = await response.json();
      output.textContent = user.name + " - " + user.email;
    } else {
      output.textContent = "Could not load API data. Status: " + response.status;
    }
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}
