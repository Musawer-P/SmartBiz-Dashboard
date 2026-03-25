const tableBody = document.getElementById("customersTable");
const fromInput = document.getElementById("from-cust");
const toInput = document.getElementById("to-cust");

function loadCustomers() {
    if (!tableBody) return;
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    const fromDate = fromInput ? fromInput.value : "";
    const toDate = toInput ? toInput.value : "";

    tableBody.innerHTML = "";

    // Filter Logic
    const filtered = customers.filter(item => {
        if (fromDate && item.date < fromDate) return false;
        if (toDate && item.date > toDate) return false;
        return true;
    });

    if (filtered.length === 0) {
        // Updated colspan to 10 to match the new column count
        tableBody.innerHTML = "<tr><td colspan='10' style='text-align:center'>No customers found</td></tr>";
        return;
    }

    filtered.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name || ''}</td>
                <td>${item.number || ''}</td>
                <td>${item.email || ''}</td>
                <td>${item.address || ''}</td>
                <td>${item.gender || ''}</td>
                <td>${item.discount || 0}%</td>
                <td>${item.account || 0}</td>
                <td>${item.date || 'No Date'}</td> 
                <td>
                    <button onclick="editCustomer(${item.id})">Edit</button>
                    <button onclick="deleteCustomer(${item.id})" style="color:red">Delete</button>
                </td>
            </tr>
        `;
    });
}

window.editCustomer = (id) => {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    const index = customers.findIndex(c => c.id === id);

    if (index !== -1) {
        const c = customers[index];

        const name = prompt("Edit Name:", c.name);
        const number = prompt("Edit Phone:", c.number);
        const email = prompt("Edit E-mail:", c.email);
        const address = prompt("Edit Address:", c.address);
        const gender = prompt("Edit Gender:", c.gender);
        const discount = prompt("Edit Discount %:", c.discount);
        const account = prompt("Edit Account Balance:", c.account);
        const date = prompt("Edit Date (YYYY-MM-DD):", c.date || "");

        if (name !== null) {
            customers[index] = {
                ...c,
                name, number, email, address, gender, discount, account, date
            };

            localStorage.setItem("customers", JSON.stringify(customers));
            loadCustomers();
        }
    }
};

window.deleteCustomer = (id) => {
    if (confirm("Delete this customer?")) {
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem("customers", JSON.stringify(customers));
        loadCustomers();
    }
};

// Event listeners for the Date Filter
if (fromInput) fromInput.addEventListener("change", loadCustomers);
if (toInput) toInput.addEventListener("change", loadCustomers);

loadCustomers();
