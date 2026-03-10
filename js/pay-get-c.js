document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#payment-table-c tbody");
    const totalBox = document.getElementById("total-amount-c");

    // --- 1. LOAD ALL DATA (Manual + From Selling Page) ---
    function loadData() {
        if (!tbody) return;
        tbody.innerHTML = ""; 
        // This gets the data saved by your product-selling.js
        const savedPayments = JSON.parse(localStorage.getItem("payment-customer")) || [];
        
        savedPayments.forEach(pay => {
            const displayName = pay.customer || "Unknown Customer";
            // Every item gets passed to renderRow, which adds the buttons
            renderRow(pay.id, displayName, pay.amount, pay.status);
        });
        calculateTotal();
    }

    // --- 2. RENDER ROW (This adds the Edit/Delete buttons to EVERYTHING) ---
    function renderRow(id, name, amount, status) {
        const row = document.createElement("tr");
        row.setAttribute("data-id", id);
        
        const statusColor = (status === "loan") ? "red" : "green";

        row.innerHTML = `
            <td class="bill-no"></td>
            <td>${name}</td>
            <td class="amount">${parseFloat(amount).toFixed(2)}</td>
            <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
            <td>
                <!-- These buttons will now appear for sales from product-selling too -->
                <button class="edit-btn-payment">Edit</button>
                <button class="delete-btn-payment">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
        reorderRows();
    }

    // --- 3. MATH & TOTAL COLORS ---
    function calculateTotal() {
        if (!totalBox) return;
        let total = 0;
        const savedPayments = JSON.parse(localStorage.getItem("payment-customer")) || [];
        savedPayments.forEach(pay => {
            if (pay.status === "loan") total += parseFloat(pay.amount);
            else total -= parseFloat(pay.amount);
        });
        totalBox.textContent = total.toFixed(2) + " $";
        if (total > 0) totalBox.style.backgroundColor = "red"; 
        else if (total < 0) totalBox.style.backgroundColor = "green";
        else totalBox.style.backgroundColor = "#333";
    }

    // --- 4. MANUAL BUTTON ACTIONS (PAY & GET) ---
    function addNewEntry(statusType) {
        const customerName = prompt("Enter Customer Name:");
        if (!customerName) return;
        let amountInput = prompt(`Enter ${statusType} amount:`);
        if (amountInput === null) return;
        let amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0) return alert("Invalid amount.");

        const newEntry = {
            id: Date.now(),
            customer: customerName,
            amount: amount,
            status: statusType
        };

        const currentData = JSON.parse(localStorage.getItem("payment-customer")) || [];
        currentData.push(newEntry);
        localStorage.setItem("payment-customer", JSON.stringify(currentData));

        renderRow(newEntry.id, newEntry.customer, newEntry.amount, newEntry.status);
        calculateTotal();
    }

    const payBtn = document.getElementById("pay-btn-c"); 
    const getBtn = document.getElementById("get-btn-c"); 
    if (payBtn) payBtn.onclick = () => addNewEntry("paid");
    if (getBtn) getBtn.onclick = () => addNewEntry("loan");

    // --- 5. CLICK ACTIONS FOR EDIT & DELETE ---
    if (tbody) {
        tbody.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (!row) return;
            const id = Number(row.getAttribute("data-id"));

            // DELETE
            if (e.target.classList.contains("delete-btn-payment")) {
                if(!confirm("Delete this record?")) return;
                let currentData = JSON.parse(localStorage.getItem("payment-customer")) || [];
                currentData = currentData.filter(item => item.id !== id);
                localStorage.setItem("payment-customer", JSON.stringify(currentData));
                row.remove();
                reorderRows();
                calculateTotal();
            }

            // EDIT
            if (e.target.classList.contains("edit-btn-payment")) {
                const amountCell = row.querySelector(".amount");
                let newAmount = prompt("Edit amount:", amountCell.textContent);
                if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
                    const finalAmount = parseFloat(newAmount);
                    let currentData = JSON.parse(localStorage.getItem("payment-customer")) || [];
                    const idx = currentData.findIndex(item => item.id === id);
                    if (idx !== -1) {
                        currentData[idx].amount = finalAmount;
                        localStorage.setItem("payment-customer", JSON.stringify(currentData));
                        amountCell.textContent = finalAmount.toFixed(2);
                        calculateTotal();
                    }
                }
            }
        });
    }

    function reorderRows() {
        tbody.querySelectorAll("tr").forEach((row, index) => {
            if (row.cells[0]) row.cells[0].textContent = index + 1;
        });
    }

    loadData();
});
