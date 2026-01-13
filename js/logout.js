function smartbizLogout() {
  localStorage.removeItem("smartbiz_logged_in");
  localStorage.removeItem("smartbiz_user");
  window.location.href = "login.html";
}



