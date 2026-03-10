// 1. Load data from 'payment-supplier' on refresh
window.addEventListener("DOMContentLoaded", () => {
    const payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
    const tbody = document.querySelector("#payment-table tbody");
    if (tbody) {
        tbody.innerHTML = ""; 
        payments.forEach(pay => {
            // Note: your storage uses 'vendor', so we pass that
            addLoanToPaymentTable(pay.id, pay.vendor, pay.amount, pay.status);
        });
        reorderRows(); // Number them after loading all
    }
});

// 2. Function to add row to table
function addLoanToPaymentTable(id, vendorName, amount, statusTxt) {
    const tbody = document.querySelector("#payment-table tbody");
    if (!tbody) return;

    const row = document.createElement("tr");
    row.setAttribute("data-id", id);

    // Column 1 is empty <td> to be filled by reorderRows()
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
    reorderRows(); // Update numbers immediately
}

// 3. Function to handle Row Numbers (1, 2, 3...)
function reorderRows() {
    const rows = document.querySelectorAll("#payment-table tbody tr");
    rows.forEach((row, index) => {
        // Targets ONLY the first cell (index 0)
        if (row.cells && row.cells[0]) {
            row.cells[0].textContent = index + 1;
        }
    });
}

// 4. Handle Edit and Delete
const paymentTable = document.querySelector("#payment-table");
if (paymentTable) {
    paymentTable.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.getAttribute("data-id"));

        // --- DELETE LOGIC ---
        if (e.target.classList.contains("delete-btn-payment")) {
            row.remove();
            let payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
            payments = payments.filter(p => p.id !== id);
            localStorage.setItem("payment-supplier", JSON.stringify(payments));
            reorderRows(); // Re-number after deleting
        }
        
        // --- EDIT LOGIC ---
        if (e.target.classList.contains("edit-btn-payment")) {
            e.stopImmediatePropagation();
            const amountCell = row.querySelector(".amount");
            let newAmount = prompt("Enter new amount:", amountCell.textContent);
            
            if (newAmount !== null && newAmount.trim() !== "" && !isNaN(newAmount)) {
                const finalAmount = parseFloat(newAmount);
                amountCell.textContent = finalAmount.toFixed(2);
                
                let payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
                const index = payments.findIndex(p => p.id === id);
                if (index !== -1) {
                    payments[index].amount = finalAmount;
                    localStorage.setItem("payment-supplier", JSON.stringify(payments));
                }
            }
        }
    });
}
