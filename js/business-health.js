// Business Health Script

const businessData = {
  revenue: 1240,     // today revenue
  orders: 34,        // total orders
  expenses: 420,     // today expenses
  pendingInvoices: 3 // unpaid invoices
};

function calculateHealth(data) {
  let score = 100;

  if (data.revenue < 500) score -= 20;
  if (data.orders < 10) score -= 15;
  if (data.expenses > data.revenue) score -= 25;
  if (data.pendingInvoices > 5) score -= 20;

  return Math.max(score, 0);
}

function healthStatus(score) {
  if (score >= 80) return "🟢 Excellent";
  if (score >= 60) return "🟡 Good";
  return "🔴 Needs Attention";
}

function renderBusinessHealth() {
  const score = calculateHealth(businessData);

  document.getElementById("healthScore").textContent = score;
  document.getElementById("healthStatus").textContent = healthStatus(score);

  document.getElementById("revenue").textContent = `$${businessData.revenue}`;
  document.getElementById("orders").textContent = businessData.orders;
  document.getElementById("expenses").textContent = `$${businessData.expenses}`;
  document.getElementById("pending").textContent = businessData.pendingInvoices;
}

renderBusinessHealth();
