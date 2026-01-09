let payments = [];

// Add a new payment
function addPayment(customer, amount, method, date = new Date().toISOString().split("T")[0]) {
    if (!customer || !amount || amount <= 0) {
        alert("Please enter valid payment details");
        return;
    }

    const payment = {
        id: payments.length + 1,
        customer,
        amount: parseFloat(amount),
        method, // Cash, Card, Bank, Mobile Money
        date
    };

    payments.push(payment);
    renderPayments();
    updateTotalPayments();
}

// Render payment table
function renderPayments() {
    const tbody = document.getElementById("paymentTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    payments.forEach(p => {
        const row = `
            <tr>
                <td>${p.id}</td>
                <td>${p.customer}</td>
                <td>$${p.amount.toFixed(2)}</td>
                <td>${p.method}</td>
                <td>${p.date}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Calculate total payments
function updateTotalPayments() {
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalEl = document.getElementById("totalPayments");

    if (totalEl) {
        totalEl.innerText = `$${total.toFixed(2)}`;
    }
}
