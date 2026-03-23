const tableBody = document.getElementById("customersTable");
const fromInput = document.getElementById("from-cust"); // Ensure this ID exists in Records HTML
const toInput = document.getElementById("to-cust");     // Ensure this ID exists in Records HTML

function loadCustomers() {
    if (!tableBody) return;
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    const fromDate = fromInput ? fromInput.value : "";
    const toDate = toInput ? toInput.value : "";

    tableBody.innerHTML = "";

    // Filter by date if inputs exist
    const filtered = customers.filter(item => {
        if (fromDate && item.date < fromDate) return false;
        if (toDate && item.date > toDate) return false;
        return true;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No customers found</td></tr>";
        return;
    }

    filtered.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${item.address}</td>
                <td>${item.discount}%</td>
                <td>
                    <button onclick="deleteCustomer(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Global delete function
window.deleteCustomer = (id) => {
    if (confirm("Delete this customer?")) {
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem("customers", JSON.stringify(customers));
        loadCustomers();
    }
};

// Listen for date changes
if (fromInput) fromInput.addEventListener("change", loadCustomers);
if (toInput) toInput.addEventListener("change", loadCustomers);

// Initial Load
loadCustomers();
