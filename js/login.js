// Select elements based on your HTML
const loginForm = document.querySelector("form");
const userInput = document.querySelector("#user");
const passInput = document.querySelector("#pass");
const loginBtn = document.querySelector("#login-btn");
const errorMsg = document.querySelector(".login-error");

// Login handler
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = userInput.value.trim();
  const password = passInput.value.trim();

  if (!username || !password) {
    showError("Please enter username and password");
    return;
  }

  loginBtn.innerText = "Logging in...";
  loginBtn.disabled = true;

  setTimeout(() => {

    // YOUR LOGIN DATA
    if (username === "admin" && password === "123456") {

      localStorage.setItem("loggedIn", "true");

      // redirect
      window.location.href = "index.html";

    } else {

      showError("Incorrect username or password");

      loginBtn.innerText = "Login";
      loginBtn.disabled = false;

    }

  }, 800);
});

function showError(message) {

  errorMsg.innerText = message;
  errorMsg.style.display = "block";

  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}