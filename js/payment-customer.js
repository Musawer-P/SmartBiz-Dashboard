// Function to load the table when the page opens
function renderCustomerLoanTable() {
    const tableBody = document.querySelector("#payment-table-c tbody");
    if (!tableBody) return;

    // Get the data saved from the selling page
    const payments = JSON.parse(localStorage.getItem("payment-customer")) || [];
    
    tableBody.innerHTML = ""; // Clear current table

    payments.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.customer}</td>
            <td>${record.amount} $</td>
            <td style="color: red; font-weight: bold;">${record.status}</td>
            <td>${new Date(record.id).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Run the function automatically
document.addEventListener("DOMContentLoaded", renderCustomerLoanTable);
