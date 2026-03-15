function renderSalesReports() {
  const tbody = document.getElementById("modal-sales-body");
  const totalQtyElement = document.getElementById("total-sold-qty");
  const totalSalesElement = document.getElementById("total-sales-amount");

  if (!tbody) return;

  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  tbody.innerHTML = "";

  let totalSoldQty = 0;
  let totalSalesAmount = 0;

  salesReports.forEach((sale, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sale.product}</td>
      <td>${sale.stockQty}</td>
      <td>${sale.soldQty}</td>
      <td>$${sale.mainPrice.toFixed(2)}</td>
      <td>$${sale.sellPrice.toFixed(2)}</td>
      <td>$${sale.profit.toFixed(2)}</td>
      <td>${new Date(sale.timestamp).toLocaleDateString()}</td>
      <td><button class="delete-sale-btn">Delete</button></td>
    `;

    tbody.appendChild(row);

    // Calculate totals
    totalSoldQty += sale.soldQty;
    totalSalesAmount += sale.soldQty * sale.sellPrice;
  });

  // Update UI totals
  if (totalQtyElement) totalQtyElement.textContent = totalSoldQty;
  if (totalSalesElement) totalSalesElement.textContent = totalSalesAmount.toFixed(2);
}

// --- Handle delete click ---
document.getElementById("modal-sales-body").addEventListener("click", function(e) {
  if (!e.target.classList.contains("delete-sale-btn")) return;

  const row = e.target.closest("tr");
  const index = row.rowIndex - 1; // subtract header row if needed
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];

  if (index >= 0 && index < salesReports.length) {
    salesReports.splice(index, 1);
    localStorage.setItem("salesReports", JSON.stringify(salesReports));
    renderSalesReports(); // refresh table
  }
});

// Render on page load
document.addEventListener("DOMContentLoaded", renderSalesReports);