
// SIDEBAR TOGGLE
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});


// DASHBOARD STATS (Top Cards)

const stats = {
  revenue: 12540,
  expenses: 5340,
  profit: 7200,
  customers: 183
};

document.getElementById("revenue").innerText = `$${stats.revenue}`;
document.getElementById("expenses").innerText = `$${stats.expenses}`;
document.getElementById("profit").innerText = `$${stats.profit}`;
document.getElementById("customers").innerText = stats.customers;


// STATUS COLOR AUTO-DETECT

document.querySelectorAll(".status").forEach(statusEl => {
  const value = statusEl.innerText.toLowerCase();

  if (value === "success") statusEl.classList.add("status-success");
  else if (value === "failed") statusEl.classList.add("status-failed");
  else statusEl.classList.add("status-pending");
});


// RECENT TRANSACTIONS (Table)

const transactions = [
  { name: "Invoice #1023", amount: 450, status: "Success" },
  { name: "Invoice #1024", amount: 120, status: "Pending" },
  { name: "Invoice #1025", amount: 300, status: "Failed" }
];

const tbody = document.getElementById("transactionsBody");

transactions.forEach(t => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${t.name}</td>
    <td>$${t.amount}</td>
    <td><span class="status">${t.status}</span></td>
  `;

  tbody.appendChild(row);
});


// DATE & TIME (Header)

function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").innerText =
    now.toLocaleDateString() + " • " + now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();


// DARK / LIGHT MODE

const themeBtn = document.getElementById("themeToggle");

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
