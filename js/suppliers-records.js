document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("supplierTable");

    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

    if (suppliers.length === 0) {
        tableBody.innerHTML =
            "<tr><td colspan='9'>No suppliers found</td></tr>";
        return;
    }

    tableBody.innerHTML = "";

    suppliers.forEach(supplier => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${supplier.name}</td>
      <td>${supplier.number}</td>
      <td>${supplier.email}</td>
      <td>${supplier.address}</td>
      <td>Pay</td>
      <td>Loan</td>
      <td>Account</td>
      <td>Edit</td>
    `;

        tableBody.appendChild(row);
    });
});
