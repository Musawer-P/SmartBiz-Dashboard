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






// ROLE DEFINITIONS
const ROLE_PERMISSIONS = {
  admin: [
    "dashboard_view",
    "users_manage",
    "settings_manage",
    "products_manage",
    "sales_manage",
    "reports_view",
    "payments_manage"
  ],

  manager: [
    "dashboard_view",
    "products_manage",
    "sales_manage",
    "reports_view"
  ],

  staff: [
    "dashboard_view",
    "sales_manage"
  ]
};

// SET CURRENT USER ROLE 
function setUserRole(role) {
  if (!ROLE_PERMISSIONS[role]) {
    console.error("Invalid role");
    return;
  }
  localStorage.setItem("smartbiz_user_role", role);
}

//GET CURRENT USER ROL
function getUserRole() {
  return localStorage.getItem("smartbiz_user_role");
}

// CHECK PERMISSION
function hasPermission(permission) {
  const role = getUserRole();
  if (!role) return false;

  return ROLE_PERMISSIONS[role].includes(permission);
}

//BLOCK UNAUTHORIZED ACTION 
function requirePermission(permission) {
  if (!hasPermission(permission)) {
    alert("Access denied");
    throw new Error("Permission denied");
  }
}

// APPLY PERMISSIONS TO UI
function applyRolePermissions() {
  document.querySelectorAll("[data-permission]").forEach(el => {
    const permission = el.dataset.permission;
    if (!hasPermission(permission)) {
      el.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", applyRolePermissions);
