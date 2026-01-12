const form = document.getElementById("settingsForm");
const status = document.getElementById("status");
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

let userSettings = {
  username: "",
  email: "",
  password: "",
  photo: ""
};

// Preview uploaded photo
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
      userSettings.photo = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Save settings
form.addEventListener("submit", (e) => {
  e.preventDefault();

  userSettings.username = document.getElementById("username").value;
  userSettings.email = document.getElementById("email").value;
  userSettings.password = document.getElementById("password").value;

  // Basic validation
  if (!userSettings.username || !userSettings.email) {
    status.textContent = "Username and Email are required.";
    status.style.color = "red";
    return;
  }

  // Simulate saving (replace with backend API)
  localStorage.setItem("userSettings", JSON.stringify(userSettings));

  status.textContent = "Settings updated successfully!";
  status.style.color = "green";

  // Clear password field
  document.getElementById("password").value = "";
});



