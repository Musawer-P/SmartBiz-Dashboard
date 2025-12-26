document.addEventListener("DOMContentLoaded", () => {

  const table = document.getElementById("customerTable");
  const nameInput = document.getElementById("customerName");
  const emailInput = document.getElementById("customerEmail");
  const statusInput = document.getElementById("customerStatus");
  const addBtn = document.getElementById("addCustomerBtn");
  const searchInput = document.getElementById("searchCustomer");

  // 🔹 Add Customer
  addBtn.addEventListener("click", () => {
    if (!nameInput.value || !emailInput.value) {
      alert("Please fill all fields");
      return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${nameInput.value}</td>
      <td>${emailInput.value}</td>
      <td class="status ${statusInput.value.toLowerCase()}">${statusInput.value}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    table.appendChild(row);

    nameInput.value = "";
    emailInput.value = "";
  });

  // 🔹 Delete Customer
  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest("tr").remove();
    }
  });

  // 🔹 Search Customer
  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = table.querySelectorAll("tr");

    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(filter)
        ? ""
        : "none";
    });
  });

});