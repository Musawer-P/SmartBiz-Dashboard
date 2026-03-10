
document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#payment-table tbody");
    const totalBox = document.getElementById("total-amount");

    // --- 1. LOAD DATA ON REFRESH ---
    function loadData() {
        if (!tbody) return;
        tbody.innerHTML = ""; 
        const savedPayments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
        savedPayments.forEach(pay => {
            // Fix: Check for 'vendor' OR 'name' to avoid "Unknown"
            const displayName = pay.vendor || pay.name || "Unknown Vendor";
            renderRow(pay.id, displayName, pay.amount, pay.status);
        });
        calculateTotal();
    }

    // --- 2. RENDER ROW TO TABLE ---
    function renderRow(id, name, amount, status) {
        const row = document.createElement("tr");
        row.setAttribute("data-id", id);
        
        const statusColor = (status === "get-loan") ? "red" : "green";

        row.innerHTML = `
            <td class="bill-no"></td>
            <td>${name}</td>
            <td class="amount">${parseFloat(amount).toFixed(2)}</td>
            <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
            <td>
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
        const savedPayments = JSON.parse(localStorage.getItem("payment-supplier")) || [];

        savedPayments.forEach(pay => {
            if (pay.status === "get-loan") total -= pay.amount;
            else total += pay.amount;
        });

        totalBox.textContent = total.toFixed(2) + " $";
        totalBox.style.color = "white";
        
        if (total < 0) totalBox.style.backgroundColor = "red";
        else if (total > 0) totalBox.style.backgroundColor = "green";
        else totalBox.style.backgroundColor = "#333";
    }

    // --- 4. BUTTON CLICK ACTIONS (Pay/Get) ---
    function addNewEntry(statusType) {
        const vendorName = prompt("Enter Vendor Name:");
        if (!vendorName) return;

        let amountInput = prompt(`Enter ${statusType} amount:`);
        if (amountInput === null) return;
        
        let amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0) return alert("Invalid amount.");

        const newEntry = {
            id: Date.now(),
            vendor: vendorName, // Saved as vendor to match product logic
            amount: amount,
            status: statusType
        };

        const currentData = JSON.parse(localStorage.getItem("payment-supplier")) || [];
        currentData.push(newEntry);
        localStorage.setItem("payment-supplier", JSON.stringify(currentData));

        renderRow(newEntry.id, newEntry.vendor, newEntry.amount, newEntry.status);
        calculateTotal();
    }

    // Assign Buttons
    const pBtn = document.getElementById("pay-btn");
    const gBtn = document.getElementById("get-btn");
    if (pBtn) pBtn.onclick = () => addNewEntry("pay-loan");
    if (gBtn) gBtn.onclick = () => addNewEntry("get-loan");

    // --- 5. EDIT & DELETE ACTIONS ---
    if (tbody) {
        tbody.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (!row) return;
            const id = Number(row.getAttribute("data-id"));

            // DELETE
            if (e.target.classList.contains("delete-btn-payment")) {
                let currentData = JSON.parse(localStorage.getItem("payment-supplier")) || [];
                currentData = currentData.filter(item => item.id !== id);
                localStorage.setItem("payment-supplier", JSON.stringify(currentData));
                
                row.remove();
                reorderRows();
                calculateTotal(); // Updates total immediately
            }

            // EDIT
            if (e.target.classList.contains("edit-btn-payment")) {
                e.stopImmediatePropagation();
                const amountCell = row.querySelector(".amount");
                let newAmount = prompt("Edit amount:", amountCell.textContent);
                
                if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
                    const finalAmount = parseFloat(newAmount);
                    amountCell.textContent = finalAmount.toFixed(2);
                    
                    let currentData = JSON.parse(localStorage.getItem("payment-supplier")) || [];
                    const idx = currentData.findIndex(item => item.id === id);
                    if (idx !== -1) {
                        currentData[idx].amount = finalAmount;
                        localStorage.setItem("payment-supplier", JSON.stringify(currentData));
                        calculateTotal(); // Updates total immediately
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

