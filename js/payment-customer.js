document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial load on page refresh
    renderCustomerLoanTable();
});

function renderCustomerLoanTable() {
    const tableBody = document.querySelector("#payment-table-c tbody");
    if (!tableBody) return;

    // Always pull fresh data from localStorage
    const payments = JSON.parse(localStorage.getItem("payment-customer")) || [];
    tableBody.innerHTML = ""; 

    payments.forEach((record, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", record.id);

        const statusColor = (record.status === "get-loan") ? "red" : "green";

        row.innerHTML = `
            <td class="row-number">${index + 1}</td> 
            <td>${record.customer}</td>
            <td class="amount-cell">${parseFloat(record.amount).toFixed(2)} $</td>
            <td style="color: ${statusColor}; font-weight: bold;">${record.status}</td>
            <td>
                <button class="edit-btn-c">Edit</button>
                <button class="delete-btn-c">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // RECALCULATE TOTAL EVERY TIME TABLE RENDERS
    calculateTotalAmount();
    setupTableActions();
}

function calculateTotalAmount() {
    const totalBox = document.getElementById("total-amount-c");
    if (!totalBox) return;

    const payments = JSON.parse(localStorage.getItem("payment-customer")) || [];
    let total = 0;

    payments.forEach(pay => {
        if (pay.status === "get-loan") total += parseFloat(pay.amount);
        else total -= parseFloat(pay.amount);
    });

    totalBox.textContent = total.toFixed(2) + " $";
    
    // UI Styling based on balance
    if (total > 0) {
        totalBox.style.backgroundColor = "red";
    } else if (total < 0) {
        totalBox.style.backgroundColor = "green";
    } else {
        totalBox.style.backgroundColor = "#333";
    }
    totalBox.style.color = "white";
}

function setupTableActions() {
    const tbody = document.querySelector("#payment-table-c tbody");
    // Remove old listeners to avoid duplicates
    tbody.replaceWith(tbody.cloneNode(true));
    const newTbody = document.querySelector("#payment-table-c tbody");

    newTbody.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.getAttribute("data-id"));
        let payments = JSON.parse(localStorage.getItem("payment-customer")) || [];

        // DELETE FUNCTION
        if (e.target.classList.contains("delete-btn-c")) {
            if (confirm("Are you sure you want to delete this record?")) {
                payments = payments.filter(p => p.id !== id);
                localStorage.setItem("payment-customer", JSON.stringify(payments));
                renderCustomerLoanTable(); // Re-render table and total
            }
        }

        // EDIT FUNCTION
        if (e.target.classList.contains("edit-btn-c")) {
            const currentAmount = row.querySelector(".amount-cell").textContent.replace(" $", "");
            const newAmount = prompt("Enter new amount:", currentAmount);

            if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
                const index = payments.findIndex(p => p.id === id);
                if (index !== -1) {
                    payments[index].amount = parseFloat(newAmount).toFixed(2);
                    localStorage.setItem("payment-customer", JSON.stringify(payments));
                    renderCustomerLoanTable(); // Re-render table and total
                }
            }
        }
    });
}
