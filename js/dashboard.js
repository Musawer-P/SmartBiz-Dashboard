function renderTodaySales() {
  const tbody = document.getElementById("today-sales-body");
  if (!tbody) return;

  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  todaySales = todaySales.filter(sale => now - sale.timestamp < twentyFourHours);

  localStorage.setItem("todaySales", JSON.stringify(todaySales));

  tbody.innerHTML = "";
  todaySales.forEach((sale, index) => {
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

document.addEventListener("DOMContentLoaded", renderTodaySales);
