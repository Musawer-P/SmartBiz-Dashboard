/**
 * SALES.JS
 * Handles rendering, filtering, calculations, and deletion.
 * Includes event dispatchers to trigger Notifications and Charts.
 */

// 1. RENDER SALES REPORTS TABLE & ALL FINANCIALS
function renderSalesReports() {
  const tbody = document.getElementById("modal-sales-body");
  const totalQtyElement = document.getElementById("total-sold-qty");
  const totalSalesElement = document.getElementById("total-sales-amount");
  const totalSalesProfitElement = document.getElementById("total-sales-profit"); 
  const totalExpensesElement = document.getElementById("total-expenses"); 
  const pureProfitElement = document.getElementById("total-profit"); 

  const fromInput = document.getElementById("from")?.value;
  const toInput = document.getElementById("to")?.value;

  if (!tbody) return;

  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  
  // --- DATE FILTER ---
  if (fromInput && toInput) {
    const fromTime = new Date(fromInput).getTime();
    const toTime = new Date(toInput).getTime();
    salesReports = salesReports.filter(sale => {
      const saleTime = typeof sale.timestamp === "string" ? new Date(sale.timestamp).getTime() : sale.timestamp;
      return saleTime >= fromTime && saleTime <= toTime;
    });
  }

  tbody.innerHTML = "";

  // --- EMPTY STATE ---
  if (salesReports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 20px; color: gray;">No data found for this time frame.</td></tr>`;
    if (totalQtyElement) totalQtyElement.textContent = "0";
    if (totalSalesElement) totalSalesElement.textContent = "0.00";
    if (totalSalesProfitElement) totalSalesProfitElement.textContent = "0.00";
    calculateNetProfit(0); 
    return;
  }

  let totalSoldQty = 0;
  let totalSalesAmount = 0;
  let totalGrossProfit = 0;

  salesReports.forEach((sale, index) => {
    const row = document.createElement("tr");
    const mPrice = Number(sale.mainPrice || 0);
    const sPrice = Number(sale.sellPrice || 0);
    const profit = Number(sale.profit || 0);
    const qty = Number(sale.soldQty || 0);
const discount =
  Number(sale.discount || 0);
    row.innerHTML = `
  <td>${index + 1}</td>
  <td>${sale.product}</td>
  <td>${sale.stockQty || 0}</td>
  <td>${qty}</td>
  <td>$${mPrice.toFixed(2)}</td>
  <td>$${sPrice.toFixed(2)}</td>

  <td>$${discount.toFixed(2)}</td> <!-- NEW -->

  <td>$${profit.toFixed(2)}</td>
  <td>${new Date(sale.timestamp).toLocaleDateString()}</td>
  <td><button class="delete-btn" data-index="${index}">Delete</button></td>
`;
    tbody.appendChild(row);

    totalSoldQty += qty;
    totalSalesAmount += (qty * sPrice);
    totalGrossProfit += profit;
  });

  if (totalQtyElement) totalQtyElement.textContent = totalSoldQty;
  if (totalSalesElement) totalSalesElement.textContent = totalSalesAmount.toFixed(2);
  if (totalSalesProfitElement) totalSalesProfitElement.textContent = totalGrossProfit.toFixed(2);

  calculateNetProfit(totalGrossProfit);
}

// 2. THE CALCULATION FUNCTION
function calculateNetProfit(currentGrossProfit) {
  const totalExpensesUI = document.getElementById("total-expenses");
  const pureProfitUI = document.getElementById("total-profit");

  if (currentGrossProfit === undefined) {
      let sales = JSON.parse(localStorage.getItem("salesReports")) || [];
      currentGrossProfit = sales.reduce((sum, s) => sum + Number(s.profit || 0), 0);
  }

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const netProfit = currentGrossProfit - totalExpenses;

  if (totalExpensesUI) totalExpensesUI.textContent = totalExpenses.toFixed(2);
  if (pureProfitUI) {
    pureProfitUI.textContent = netProfit.toFixed(2);
    pureProfitUI.style.color = netProfit >= 0 ? "#2fdd63" : "#dd2f2f";
  }
}

// 3. LISTENERS (Cross-tab and Internal)
window.addEventListener('storage', (e) => {
    if (e.key === 'expenses' || e.key === 'salesReports') {
        renderSalesReports();
    }
});

// Listener for the same-page event
window.addEventListener('salesUpdated', renderSalesReports);

// 4. HANDLE DELETE (Sales)
document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("delete-btn")) return;
  if (!confirm("Restore stock and delete sale?")) return;

  const index = parseInt(e.target.getAttribute("data-index"));
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  let stock = JSON.parse(localStorage.getItem("stock")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];

  if (index >= 0 && index < salesReports.length) {
    const sale = salesReports[index];
    
    // Restore Stock logic
    let sItem = stock.find(s => s.name === sale.product);
    if (sItem) {
        sItem.soldQty = (Number(sItem.soldQty) || 0) - sale.soldQty;
        sItem.availableQty = (Number(sItem.availableQty) || 0) + sale.soldQty;
        sItem.profit = (Number(sItem.salePrice) - Number(sItem.realPrice)) * sItem.soldQty;
    }

    let pItem = products.find(p => p.name === sale.product);
    if (pItem) pItem.qty = (Number(pItem.qty) || 0) + sale.soldQty;

    todaySales = todaySales.filter(ts => ts.timestamp !== sale.timestamp);
    salesReports.splice(index, 1);

    // Save all changes
    localStorage.setItem("salesReports", JSON.stringify(salesReports));
    localStorage.setItem("stock", JSON.stringify(stock));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("todaySales", JSON.stringify(todaySales));

    // TRIGGER REFRESH: This tells charts and notifications to update
    window.dispatchEvent(new Event('salesUpdated'));
    
    renderSalesReports(); 
    if (typeof renderStockTable === "function") renderStockTable();
    if (typeof renderTodaySales === "function") renderTodaySales();
  }
});

// 5. INITIALIZE
document.getElementById("from")?.addEventListener("change", renderSalesReports);
document.getElementById("to")?.addEventListener("change", renderSalesReports);
document.addEventListener("DOMContentLoaded", renderSalesReports);
