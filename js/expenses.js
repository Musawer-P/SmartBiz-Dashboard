document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("expensesTable");
    const submitBtn = document.getElementById("submitBtn-expenses");
    const totalDisplay = document.getElementById("total-expenses");

    // Load data from LocalStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // 1. Function to draw the table (No refresh needed)
    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = "";
        let totalAmount = 0;

        if (expenses.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center'>No expenses found</td></tr>";
            if (totalDisplay) totalDisplay.textContent = "0.00";
            return;
        }

        expenses.forEach((expense, index) => {
            totalAmount += Number(expense.amount) || 0;
            
            // We use 'expense.name' here - ensure this matches the saving logic
            const row = `
              <tr>
                <td>${expense.name || "N/A"}</td>
                <td>${expense.amount}</td>
                <td>${expense.startDate}</td>
                <td>
                  <button onclick="editExpense(${index})">Edit</button>
                  <button onclick="deleteExpense(${index})">Delete</button>
                </td>
              </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        if (totalDisplay) totalDisplay.textContent = totalAmount.toFixed(2);
    }

    // 2. Handle Submit Click (Instant update)
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const nameVal = document.getElementById('name').value;
            const amountVal = document.getElementById('amount').value;
            const dateVal = document.getElementById('startDate').value;

            if (!nameVal || !amountVal) {
                alert("Please enter both a name and an amount.");
                return;
            }

            const newEntry = {
                name: nameVal, // This MUST match the key in renderTable
                amount: amountVal,
                startDate: dateVal
            };

            expenses.push(newEntry);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            
            renderTable(); // Update the UI immediately
            clearInputs();
        });
    }

    // 3. Action Functions (Delete/Edit)
    window.deleteExpense = (index) => {
        if (confirm("Delete this expense?")) {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderTable();
        }
    };

    window.editExpense = (index) => {
        const exp = expenses[index];
        const newName = prompt("Edit Name:", exp.name);
        const newAmount = prompt("Edit Amount:", exp.amount);
        
        if (newName !== null) exp.name = newName;
        if (newAmount !== null) exp.amount = newAmount;
        
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderTable();
    };

    function clearInputs() {
        document.getElementById('name').value = "";
        document.getElementById('amount').value = "";
        document.getElementById('startDate').value = "";
    }

    // Initial load
    renderTable();
});
