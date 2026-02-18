function addToSalesReports(product) {
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  const timestamp = Date.now();

  salesReports.push({
    ...product,
    timestamp: timestamp
  });

  localStorage.setItem("salesReports", JSON.stringify(salesReports));
  renderSalesReports();
}

function renderSalesReports() {
  const tbody = document.getElementById("modal-sales-body");
  if(!tbody) return;

  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  tbody.innerHTML = "";
  salesReports.forEach((sale, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${sale.name}</td>
        <td>${sale.stockQty}</td>
        <td>${sale.soldQty}</td>
        <td>$${sale.mainPrice}</td>
        <td>$${sale.sellPrice}</td>
        <td>$${sale.profit}</td>
        <td>${new Date(sale.timestamp).toLocaleDateString()}</td>
      </tr>
    `;
  });
}

// Load on page load
document.addEventListener("DOMContentLoaded", renderSalesReports);
