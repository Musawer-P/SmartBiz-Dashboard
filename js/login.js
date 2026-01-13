// Select elements (no HTML changes required)
const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const errorMsg = document.querySelector(".login-error");

// Simple validation
function validateLogin(email, password) {
  if (!email || !password) {
    return "Please fill in all fields";
  }

  if (!email.includes("@")) {
    return "Invalid email address";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

// Login handler
loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const error = validateLogin(email, password);
  if (error) {
    showError(error);
    return;
  }

  loginBtn.innerText = "Logging in...";
  loginBtn.disabled = true;

  // ===== DEMO LOGIN (Replace with API later) =====
  setTimeout(() => {
    if (email === "admin@smartbiz.com" && password === "123456") {
      // Save session
      localStorage.setItem("smartbiz_logged_in", "true");
      localStorage.setItem("smartbiz_user", email);

      window.location.href = "dashboard.html";
    } else {
      showError("Invalid email or password");
      loginBtn.innerText = "Login";
      loginBtn.disabled = false;
    }
  }, 1200);
});

// Show error message
function showError(message) {
  if (!errorMsg) return alert(message);

  errorMsg.innerText = message;
  errorMsg.style.display = "block";

  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}

// ===== AUTO REDIRECT IF LOGGED IN =====
if (localStorage.getItem("smartbiz_logged_in") === "true") {
  window.location.href = "dashboard.html";
}
