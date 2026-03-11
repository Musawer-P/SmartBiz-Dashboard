document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector("#payment-table-c tbody");
    const totalBox = document.getElementById("total-amount-c");

    // LOAD DATA 
function loadData() {
    if (!tbody) return;
    tbody.innerHTML = ""; 
    
    const savedPayments = JSON.parse(localStorage.getItem("payment-customer")) || [];

    savedPayments.forEach(pay => {
        const displayName = pay.customer || "Unknown Customer";
        renderRow(pay.id, displayName, pay.amount, pay.status);
    });

    reorderRows();
    calculateTotal(); 
}
    // RENDER ROW (Draws the row on the screen) 
    function renderRow(id, name, amount, status) {
        if (!tbody) return;
        const row = document.createElement("tr");
        row.setAttribute("data-id", id);
        
        const statusColor = (status === "loan") ? "red" : "green";

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
        reorderRows(); // Updates the 1, 2, 3 numbering
    }

    // MATH & TOTAL 
     function calculateTotal() {
        if (!totalBox) return;
        let total = 0;
        const savedPayments = JSON.parse(localStorage.getItem("payment-customer")) || [];

        savedPayments.forEach(pay => {
           
            if (pay.status === "loan") total -= parseFloat(pay.amount);
            else total += parseFloat(pay.amount);
        });

        totalBox.textContent = total.toFixed(2) + " $";
        totalBox.style.color = "white";
        
        if (total < 0) {
            totalBox.style.backgroundColor = "red"; 
        } 
        else if (total > 0) {
            totalBox.style.backgroundColor = "green";
        } 
        else {
            totalBox.style.backgroundColor = "#333";
        }
    }

    // MANUAL ACTIONS (Pay & Get Buttons)
   function addNewEntry(statusType) {
    const customerName = prompt("Enter Customer Name:");
    if (!customerName) return;

    let amountInput = prompt(`Enter ${statusType} amount:`);
    if (amountInput === null) return;
    
    let amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount.");
        return;
    }

    const newEntry = {
        id: Date.now(),
        customer: customerName,
        amount: amount,
        status: statusType
    };

    let currentData = JSON.parse(localStorage.getItem("payment-customer")) || [];
    currentData.push(newEntry);

    localStorage.setItem("payment-customer", JSON.stringify(currentData));

    loadData(); // redraw table
}
    // Assign Buttons
    const payBtn = document.getElementById("pay-btn-c"); 
    const getBtn = document.getElementById("get-btn-c"); 
    if (payBtn) payBtn.onclick = () => addNewEntry("paid");
    if (getBtn) getBtn.onclick = () => addNewEntry("loan");

    // EDIT & DELETE LOGIC 
    if (tbody) {
        tbody.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (!row) return;
            const id = Number(row.getAttribute("data-id"));

            if (e.target.classList.contains("delete-btn-payment")) {
                if(!confirm("Are you sure you want to delete this record?")) return;
                let currentData = JSON.parse(localStorage.getItem("payment-customer")) || [];
                currentData = currentData.filter(item => item.id !== id);
                localStorage.setItem("payment-customer", JSON.stringify(currentData));
                row.remove();
                reorderRows();
                calculateTotal();
            }

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

    // ROW NUMBERING (1, 2, 3...) 
    function reorderRows() {
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            const billNoCell = row.querySelector(".bill-no");
            if (billNoCell) {
                billNoCell.textContent = index + 1;
            }
        });
    }

    loadData(); // Runs once when you open/refresh the page
});
