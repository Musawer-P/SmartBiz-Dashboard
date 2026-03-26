const tableBody = document.getElementById("freightTableBody");
const fromInput = document.getElementById("from-freight");
const toInput = document.getElementById("to-freight");

// Load data on page start
function loadFreightCosts() {
    if (!tableBody) return;
    const records = JSON.parse(localStorage.getItem("freight_costs")) || [];
    
    const fromValue = fromInput ? fromInput.value : "";
    const toValue = toInput ? toInput.value : "";

    tableBody.innerHTML = "";

    // 1. FILTER LOGIC (Time-Sensitive)
    const filtered = records.filter(item => {
        if (!item.date) return true; 
        const itemTime = new Date(item.date).getTime();
        
        if (fromValue && itemTime < new Date(fromValue).getTime()) return false;
        if (toValue && itemTime > new Date(toValue).getTime()) return false;
        return true;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center'>No records found</td></tr>";
        return;
    }

    // 2. RENDER ROWS
    filtered.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr data-id="${item.id}">
                <td>${index + 1}</td>
                <td>${item.description || ''}</td>
                <td>$${item.amount || 0}</td>
                <td>${item.carrier || ''}</td>
                <td>${item.date || 'No Date'}</td>
                <td>
                    <button onclick="editFreight(${item.id})">Edit</button>
                    <button onclick="deleteFreight(${item.id})" style="color:red">Delete</button>
                </td>
            </tr>
        `;
    });
}

// 3. SAVE / ADD FUNCTION
function addFreight(description, amount, carrier, date) {
    const records = JSON.parse(localStorage.getItem("freight_costs")) || [];
    const newRecord = {
        id: Date.now(), // Unique ID based on timestamp
        description,
        amount,
        carrier,
        date
    };
    records.push(newRecord);
    localStorage.setItem("freight_costs", JSON.stringify(records));
    loadFreightCosts();
}

// 4. EDIT FUNCTION
window.editFreight = (id) => {
    let records = JSON.parse(localStorage.getItem("freight_costs")) || [];
    const index = records.findIndex(r => r.id === id);

    if (index !== -1) {
        const r = records[index];
        const desc = prompt("Edit Description:", r.description);
        const amt = prompt("Edit Amount:", r.amount);
        const carr = prompt("Edit Carrier:", r.carrier);
        const dt = prompt("Edit Date (YYYY-MM-DDTHH:MM):", r.date);

        if (desc !== null) {
            records[index] = { ...r, description: desc, amount: amt, carrier: carr, date: dt };
            localStorage.setItem("freight_costs", JSON.stringify(records));
            loadFreightCosts();
        }
    }
};

// 5. DELETE FUNCTION
window.deleteFreight = (id) => {
    if (confirm("Delete this freight record?")) {
        let records = JSON.parse(localStorage.getItem("freight_costs")) || [];
        records = records.filter(r => r.id !== id);
        localStorage.setItem("freight_costs", JSON.stringify(records));
        loadFreightCosts();
    }
};

// 6. EVENT LISTENERS
if (fromInput) fromInput.addEventListener("input", loadFreightCosts);
if (toInput) toInput.addEventListener("input", loadFreightCosts);

loadFreightCosts();
