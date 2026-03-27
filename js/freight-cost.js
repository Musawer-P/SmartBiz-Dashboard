document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("freightTableBody");
    const submitBtn = document.getElementById("submitBtn-freight-cost");
    const fromInput = document.getElementById("from-freight");
    const toInput = document.getElementById("to-freight");

    // Load data from LocalStorage
    let freightCosts = JSON.parse(localStorage.getItem("freight_costs")) || [];

    // 1. Function to draw the table
    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        const fromValue = fromInput ? fromInput.value : "";
        const toValue = toInput ? toInput.value : "";

        // Filter Logic (Time-Sensitive)
        const filtered = freightCosts.filter(item => {
            if (!item.date || (!fromValue && !toValue)) return true;
            const itemTime = new Date(item.date).getTime();
            if (fromValue && itemTime < new Date(fromValue).getTime()) return false;
            if (toValue && itemTime > new Date(toValue).getTime()) return false;
            return true;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5' style='text-align:center'>No freight records found</td></tr>";
            return;
        }

        filtered.forEach((item, index) => {
            const row = `
              <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.amount}</td>
                <td>${item.date}</td>
                <td>
                  <button onclick="editFreight(${index})"id = "edit-btn">Edit</button>
                  <button onclick="deleteFreight(${index})" id = "delete-btn">Delete</button>
                </td>
              </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // 2. Handle Submit Click (Matches your working style)
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const nameVal = document.getElementById('expenseName').value;
            const locVal = document.getElementById('location').value;
            const amountVal = document.getElementById('amount').value;
            const dateVal = document.getElementById('entryDate').value;

            if (!nameVal || !amountVal) {
                alert("Please enter Name and Amount.");
                return;
            }

            const newEntry = {
                name: nameVal,
                location: locVal,
                amount: amountVal,
                date: dateVal
            };

            freightCosts.push(newEntry);
            localStorage.setItem("freight_costs", JSON.stringify(freightCosts));
            
            renderTable(); 
            clearInputs();
        });
    }

    // 3. Global Functions for Buttons
    window.deleteFreight = (index) => {
        if (confirm("Delete this record?")) {
            freightCosts.splice(index, 1);
            localStorage.setItem("freight_costs", JSON.stringify(freightCosts));
            renderTable();
        }
    };

    window.editFreight = (index) => {
        const item = freightCosts[index];
        const newName = prompt("Edit Name:", item.name);
        const newLoc = prompt("Edit Location:", item.location);
        const newAmount = prompt("Edit Amount:", item.amount);
        
        if (newName !== null) item.name = newName;
        if (newLoc !== null) item.location = newLoc;
        if (newAmount !== null) item.amount = newAmount;
        
        localStorage.setItem("freight_costs", JSON.stringify(freightCosts));
        renderTable();
    };

    function clearInputs() {
        document.getElementById('expenseName').value = "";
        document.getElementById('location').value = "";
        document.getElementById('amount').value = "";
        document.getElementById('entryDate').value = "";
    }

    // Filter Listeners
    if (fromInput) fromInput.addEventListener("input", renderTable);
    if (toInput) toInput.addEventListener("input", renderTable);

    renderTable();
});
