document.addEventListener("DOMContentLoaded", () => {
    renderBills();
});

function renderBills() {
    const billTableBody = document.getElementById("bill-table-body");
    const totalDisplay = document.getElementById("bill-total"); // Optional: add an ID to your total span
    
    // 1. Get bills from localStorage
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    
    // 2. Clear current table content
    billTableBody.innerHTML = "";
    let grandTotal = 0;

    // 3. Loop through bills and create rows
    // We reverse it so the newest sales appear at the top
    bills.slice().reverse().forEach((item) => {
        const row = document.createElement("tr");
        const itemTotal = item.sellPrice * item.soldQty;
        grandTotal += itemTotal;

        row.innerHTML = `
            <td>${item.product} <small>(${item.payment})</small></td>
            <td>${item.soldQty} x $${item.sellPrice.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>${new Date(item.timestamp).toLocaleTimeString()}</td>
        `;
        billTableBody.appendChild(row);
    });

    // 4. Update Total if the element exists
    if (totalDisplay) {
        totalDisplay.textContent = grandTotal.toFixed(2) + " $";
    }
}

// Function to clear all bills (Optional: link to a button)
function clearBills() {
    if(confirm("Are you sure you want to clear all bill history?")) {
        localStorage.removeItem("bills");
        renderBills();
    }
}
