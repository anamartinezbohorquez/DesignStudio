const names = ["Change", "Evolve", "Improve"];
const nameBox = document.getElementById("name");
let i = 0;

function showName() {
  // Insert a new span with the sliding class
  nameBox.innerHTML = `<span class="name">${names[i]}</span>`;
  
  // Move to next name (loop back at the end)
  i = (i + 1) % names.length;
}

// Show the first name immediately
showName();

// Change name every 8 seconds
setInterval(showName, 8000);
