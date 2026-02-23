document.getElementById("submitBtn-expenses").addEventListener("click", () => {
  const expense = {
    id: Date.now(),
    name: document.getElementById("name").value,
    amount: document.getElementById("amount").value,
    startDate: document.getElementById("startDate").value,

  };


  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  alert("Expense added successfully ✅");
});
