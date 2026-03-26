const tableBody = document.getElementById("customersTable");
const fromInput = document.getElementById("from-cust");
const toInput = document.getElementById("to-cust");

function loadCustomers() {
    if (!tableBody) return;
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    // Get values from inputs
    const fromValue = fromInput ? fromInput.value : "";
    const toValue = toInput ? toInput.value : "";

    tableBody.innerHTML = "";

    // 1. IMPROVED FILTER LOGIC (Matches your first code)
    const filtered = customers.filter(item => {
        if (!item.date) return true; 

        // Convert dates to numbers (ms) for accurate range checking
        const itemTime = new Date(item.date).getTime();
        
        if (fromValue && itemTime < new Date(fromValue).getTime()) return false;
        if (toValue && itemTime > new Date(toValue).getTime()) return false;
        
        return true;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='10' style='text-align:center'>No customers found</td></tr>";
        return;
    }

    // 2. RENDER ROWS
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
                    <button onclick="editCustomer(${item.id})" id = "edit-btn">Edit</button>
                    <button onclick="deleteCustomer(${item.id})" id = "delete-btn">Delete</button>
                </td>
            </tr>
        `;
    });
}

// 3. EDIT FUNCTION (Matching prompt style)
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
        // Added the time-sensitive hint to the prompt
        const date = prompt("Enter Date (YYYY-MM-DDTHH:MM):", c.date || "");

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

// 4. REAL-TIME EVENT LISTENERS (Changed from 'change' to 'input')
if (fromInput) fromInput.addEventListener("input", loadCustomers);
if (toInput) toInput.addEventListener("input", loadCustomers);

// Initial load
loadCustomers();
