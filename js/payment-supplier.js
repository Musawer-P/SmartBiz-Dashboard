// 1. Load data and calculate total on refresh
window.addEventListener("DOMContentLoaded", () => {
    const payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
    const tbody = document.querySelector("#payment-table tbody");
    if (tbody) {
        tbody.innerHTML = ""; 
        payments.forEach(pay => {
            addLoanToPaymentTable(pay.id, pay.vendor, pay.amount, pay.status);
        });
        reorderRows();
        calculateTotal(); // <--- Added this to show total on refresh
    }
});

// 2. Function to add row to table
function addLoanToPaymentTable(id, vendorName, amount, statusTxt) {
    const tbody = document.querySelector("#payment-table tbody");
    if (!tbody) return;

    const row = document.createElement("tr");
    row.setAttribute("data-id", id);

    row.innerHTML = `
        <td class="row-number"></td> 
        <td>${vendorName || "Unknown"}</td> 
        <td class="amount">${parseFloat(amount).toFixed(2)}</td>
        <td><p style="color: ${statusTxt === 'get-loan' ? 'red' : 'green'}; font-weight: bold;">${statusTxt}</p></td>
        <td>
            <button class="edit-btn-payment">Edit</button>
            <button class="delete-btn-payment">Delete</button>
        </td>
    `;
    tbody.appendChild(row);
    reorderRows();
    calculateTotal(); // <--- Added this to update total when a new row is added
}

// 3. THE NEW TOTAL FUNCTION (This was missing)
function calculateTotal() {
    const totalBox = document.getElementById("total-amount"); // Make sure this ID exists in HTML
    if (!totalBox) return;

    const payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
    let total = 0;

    payments.forEach(pay => {
        // Match your logic: get-loan means you owe money (-)
        if (pay.status === "get-loan") {
            total -= parseFloat(pay.amount);
        } else {
            total += parseFloat(pay.amount);
        }
    });

    totalBox.textContent = total.toFixed(2) + " $";
    
    // Optional: Color logic for the box
    if (total < 0) totalBox.style.backgroundColor = "red";
    else if (total > 0) totalBox.style.backgroundColor = "green";
    else totalBox.style.backgroundColor = "#333";
    
    totalBox.style.color = "white";
}

// 4. Function to handle Row Numbers
function reorderRows() {
    const rows = document.querySelectorAll("#payment-table tbody tr");
    rows.forEach((row, index) => {
        if (row.cells && row.cells[0]) {
            row.cells[0].textContent = index + 1;
        }
    });
}
// 5. Handle Edit and Delete with Live Total
const paymentTable = document.querySelector("#payment-table");
if (paymentTable) {
    paymentTable.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.getAttribute("data-id"));

        // --- DELETE WITH ALERT ---
        if (e.target.classList.contains("delete-btn-payment")) {
            // Added confirmation alert here
            if (confirm("Are you sure you want to delete this record?")) {
                row.remove();
                let payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
                payments = payments.filter(p => p.id !== id);
                localStorage.setItem("payment-supplier", JSON.stringify(payments));
                reorderRows();
                calculateTotal(); // Update total after delete
            }
        }
        
        // --- EDIT ---
        if (e.target.classList.contains("edit-btn-payment")) {
            const amountCell = row.querySelector(".amount");
            let newAmount = prompt("Enter new amount:", amountCell.textContent);
            
            if (newAmount !== null && !isNaN(newAmount)) {
                const finalAmount = parseFloat(newAmount);
                
                let payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
                const index = payments.findIndex(p => p.id === id);
                if (index !== -1) {
                    payments[index].amount = finalAmount;
                    localStorage.setItem("payment-supplier", JSON.stringify(payments));
                    amountCell.textContent = finalAmount.toFixed(2);
                    calculateTotal(); // Update total after edit
                }
            }
        }
    });
}
