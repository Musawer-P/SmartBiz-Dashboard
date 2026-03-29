function renderTodaySales() {
  const tbody = document.getElementById("today-sales-body");
  if (!tbody) return;

  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  
  // 1. Filter: Keep only sales from the last 24 hours
  todaySales = todaySales.filter(sale => {
    const saleTime = typeof sale.timestamp === "string" ? new Date(sale.timestamp).getTime() : sale.timestamp;
    return (now - saleTime < twentyFourHours) && !isNaN(saleTime);
  });

  // Save filtered list back to storage
  localStorage.setItem("todaySales", JSON.stringify(todaySales));

  tbody.innerHTML = "";

  if (todaySales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;">No sales in the last 24 hours.</td></tr>`;
    return;
  }

  // 2. Render Rows (Matches your requested columns)
  todaySales.forEach((sale, index) => {
    const row = document.createElement("tr");

    // Math safety
    const mainP = Number(sale.mainPrice || 0);
    const sellP = Number(sale.sellPrice || 0);
    const prof = Number(sale.profit || 0);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sale.product}</td>
      <td>${sale.stockQty || 0}</td>
      <td>${sale.soldQty}</td>
      <td>$${mainP.toFixed(2)}</td>
      <td>$${sellP.toFixed(2)}</td>
      <td>$${prof.toFixed(2)}</td>
      <td>${new Date(sale.timestamp).toLocaleDateString()} ${new Date(sale.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", renderTodaySales);
