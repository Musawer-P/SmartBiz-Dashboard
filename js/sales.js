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
`;

    tbody.appendChild(row);

    // ✅ Calculate totals
    totalSoldQty += sale.soldQty;
    totalSalesAmount += sale.soldQty * sale.sellPrice;
  });

  // ✅ Update UI
  if (totalQtyElement) {
    totalQtyElement.textContent = totalSoldQty;
  }

  if (totalSalesElement) {
    totalSalesElement.textContent = totalSalesAmount.toFixed(2);
  }
}

document.addEventListener("DOMContentLoaded", renderSalesReports);