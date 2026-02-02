document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("customersTable");

  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  if (customers.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='9'>No customers found</td></tr>";
    return;
  }

  tableBody.innerHTML = "";

  customers.forEach(customer => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.number}</td>
      <td>${customer.email}</td>
      <td>${customer.address}</td>
      <td>${customer.gender}</td>
      <td>${customer.discount}</td>
      <td>Edit</td>
    `;

    tableBody.appendChild(row);
  });
});
