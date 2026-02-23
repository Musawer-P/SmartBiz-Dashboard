document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("expensesTable");

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (expenses.length === 0) {
        tableBody.innerHTML =
            "<tr><td colspan='9'>No expenses found</td></tr>";
        return;
    }

    tableBody.innerHTML = "";

    expenses.forEach(expense => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
      <td>${expense.startDate}</td>
      <td>Edit</td>
    `;

        tableBody.appendChild(row);
    });
});
