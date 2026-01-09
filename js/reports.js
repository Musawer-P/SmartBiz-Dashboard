let reports = {
    totalSales: 0,
    totalProfit: 0,
    totalTransactions: 0
};

// Generate report from payments & sales
function generateReport(payments = [], sales = []) {
    reports.totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    reports.totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
    reports.totalTransactions = payments.length;

    renderReport();
}

// Display report data
function renderReport() {
    const salesEl = document.getElementById("reportSales");
    const profitEl = document.getElementById("reportProfit");
    const transEl = document.getElementById("reportTransactions");

    if (salesEl) salesEl.innerText = `$${reports.totalSales.toFixed(2)}`;
    if (profitEl) profitEl.innerText = `$${reports.totalProfit.toFixed(2)}`;
    if (transEl) transEl.innerText = reports.totalTransactions;
}

// Example sales data structure
// {
//   id: 1,
//   total: 500,
//   profit: 120,
//   date: "2026-01-08"
// }
