const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", function () {

  localStorage.removeItem("loggedIn");

  window.location.href = "login.html";

});