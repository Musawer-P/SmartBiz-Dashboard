let sales = [];

// DOM Elements
const salesForm = document.getElementById("salesForm");
const salesTableBody = document.getElementById("salesTableBody");
const totalSalesEl = document.getElementById("totalSales");
const totalProfitEl = document.getElementById("totalProfit");

// Add Sale
function addSale(product, price, cost, qty) {
    const sale = {
        id: Date.now(),
        product,
        price,
        cost,
        qty,
        profit: (price - cost) * qty,
        date: new Date().toLocaleDateString()
    };

    sales.push(sale);
    renderSales();
    updateSummary();
}

// Render Sales Table
function renderSales() {
    salesTableBody.innerHTML = "";

    sales.forEach((sale, index) => {
        salesTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${sale.product}</td>
                <td>${sale.qty}</td>
                <td>$${sale.price}</td>
                <td>$${sale.profit}</td>
                <td>${sale.date}</td>
            </tr>
        `;
    });
}

// Update Summary
function updateSummary() {
    let totalSales = 0;
    let totalProfit = 0;

    sales.forEach(sale => {
        totalSales += sale.price * sale.qty;
        totalProfit += sale.profit;
    });

    totalSalesEl.textContent = `$${totalSales}`;
    totalProfitEl.textContent = `$${totalProfit}`;
}

// Form Submit
if (salesForm) {
    salesForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const product = document.getElementById("saleProduct").value;
        const price = Number(document.getElementById("salePrice").value);
        const cost = Number(document.getElementById("saleCost").value);
        const qty = Number(document.getElementById("saleQty").value);

        addSale(product, price, cost, qty);
        salesForm.reset();
    });
}
