const loginForm = document.querySelector("form");
const userInput = document.querySelector("#user");
const passInput = document.querySelector("#pass");
const loginBtn = document.querySelector("#login-btn");
const errorMsg = document.querySelector(".login-error");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputUser = userInput.value.trim();
    const inputPass = passInput.value.trim();

    // Get the updated credentials from localStorage
    const savedData = JSON.parse(localStorage.getItem("smartbiz_settings"));
    
    // Fallback defaults if settings haven't been saved yet
    const validUser = savedData ? savedData.username : "admin";
const validPass = savedData ? savedData.password : "123";
    loginBtn.innerText = "Logging in...";

    setTimeout(() => {
        if (inputUser === validUser && inputPass === validPass) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            showError("Invalid Username or Password");
            loginBtn.innerText = "Login";
        }
    }, 800);
});

function showError(message) {
    errorMsg.innerText = message;
    errorMsg.style.display = "block";
    setTimeout(() => { errorMsg.style.display = "none"; }, 3000);
}
