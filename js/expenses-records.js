document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("expensesTable");
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function renderTable() {
        tableBody.innerHTML = "";
        let totalAmount = 0;

        if (expenses.length === 0) {
            tableBody.innerHTML =
                "<tr><td colspan='4'>No expenses found</td></tr>";
            document.getElementById("total-expenses").textContent = "0.00";
            return;
        }

        expenses.forEach((expense, index) => {
            const row = document.createElement("tr");

            totalAmount += Number(expense.amount) || 0;

            row.innerHTML = `
              <td>${expense.name}</td>
              <td>${expense.amount}</td>
              <td>${expense.startDate}</td>
              <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </td>
            `;

            tableBody.appendChild(row);
        });

        // Update total
        document.getElementById("total-expenses").textContent =
            totalAmount.toFixed(2);

        // Delete functionality
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                expenses.splice(index, 1); // Remove from array
                localStorage.setItem("expenses", JSON.stringify(expenses));
                renderTable();
            });
        });

        // Edit functionality
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                const expense = expenses[index];

                // Prompt user for new values
                const newName = prompt("Enter new name:", expense.name);
                const newAmount = prompt("Enter new amount:", expense.amount);
                const newDate = prompt("Enter new start date:", expense.startDate);

                if (newName !== null) expense.name = newName;
                if (newAmount !== null) expense.amount = newAmount;
                if (newDate !== null) expense.startDate = newDate;

                localStorage.setItem("expenses", JSON.stringify(expenses));
                renderTable();
            });
        });
    }

    renderTable(); // Initial render
});