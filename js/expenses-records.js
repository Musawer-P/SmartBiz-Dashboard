document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("expensesTable");
    const submitBtn = document.getElementById("submitBtn-expenses");
    
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = "";
        let totalAmount = 0;

        expenses.forEach((expense, index) => {
            totalAmount += Number(expense.amount) || 0;
            const row = `
              <tr>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.startDate}</td>
                <td>
                  <button onclick="editExpense(${index})" id = "editExpense">Edit</button>
                  <button onclick="deleteExpense(${index})" id = "deleteExpense">Delete</button>
                </td>
              </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        const totalElem = document.getElementById("total-expenses");
        if (totalElem) totalElem.textContent = totalAmount.toFixed(2);
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            // Using the new unique IDs
            const nameInput = document.getElementById('exp-name');
            const amountInput = document.getElementById('exp-amount');
            const dateInput = document.getElementById('exp-startDate');

            const newExpense = {
                name: nameInput.value.trim(), // trim() removes accidental spaces
                amount: amountInput.value,
                startDate: dateInput.value
            };

            if (!newExpense.name || !newExpense.amount) {
                alert("Please enter Name and Amount");
                return;
            }

            expenses.push(newExpense);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            
            // This line makes it show WITHOUT refreshing
            renderTable(); 
            
            // Clear inputs
            nameInput.value = "";
            amountInput.value = "";
            dateInput.value = "";
        });
    }

    // Move functions to window so the HTML 'onclick' can see them
    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderTable();
    };

    window.editExpense = (index) => {
        const exp = expenses[index];
        const n = prompt("New Name:", exp.name);
        const a = prompt("New Amount:", exp.amount);
        if (n !== null) exp.name = n;
        if (a !== null) exp.amount = a;
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderTable();
    };

    renderTable(); // Load table on start
});
