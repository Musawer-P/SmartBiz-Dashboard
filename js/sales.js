function renderSalesReports() {
  const tbody = document.getElementById("modal-sales-body");
  if (!tbody) return;

  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  tbody.innerHTML = "";
  salesReports.forEach((sale, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sale.product}</td>
      <td>${sale.soldQty}</td>
      <td>$${sale.sellPrice.toFixed(2)}</td>
      <td>$${sale.profit.toFixed(2)}</td>
      <td>${new Date(sale.timestamp).toLocaleDateString()}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", renderSalesReports);
