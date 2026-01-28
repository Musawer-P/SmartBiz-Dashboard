document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("customerTable");
  const nameInput = document.getElementById("customerName");
  const emailInput = document.getElementById("customerEmail");
  const statusInput = document.getElementById("customerStatus");
  const addBtn = document.getElementById("addCustomerBtn");
  const searchInput = document.getElementById("searchCustomer");

  // 🔹 Load saved customers from localStorage
  let customers = JSON.parse(localStorage.getItem("customers")) || [];

  function renderCustomers() {
    table.innerHTML = ""; // clear table
    customers.forEach((customer, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td class="status ${customer.status.toLowerCase()}">${customer.status}</td>
        <td><button class="delete-btn" data-id="${customer.id}">Delete</button></td>
      `;
      table.appendChild(row);
    });
  }

  renderCustomers(); // initial render

  // 🔹 Add Customer
  addBtn.addEventListener("click", () => {
    if (!nameInput.value || !emailInput.value) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(), // unique ID
      name: nameInput.value,
      email: emailInput.value,
      status: statusInput.value
    };

    customers.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(customers)); // SAVE
    renderCustomers();

    // Clear inputs
    nameInput.value = "";
    emailInput.value = "";
  });

  // 🔹 Delete Customer
  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      customers = customers.filter(c => c.id !== id);
      localStorage.setItem("customers", JSON.stringify(customers)); // UPDATE STORAGE
      renderCustomers();
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
