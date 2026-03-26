const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const tableBody = document.getElementById("supplierTable");

function loadSuppliers() {
  if (!tableBody) return;
  const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  
  const fromValue = fromInput ? fromInput.value : ""; 
  const toValue = toInput ? toInput.value : "";

  tableBody.innerHTML = "";

  // 1. IMPROVED FILTER LOGIC (Matches your first code)
  const filtered = suppliers.filter(item => {
    if (!item.date) return true; 

    // Convert strings to Time numbers for accurate comparison
    const itemTime = new Date(item.date).getTime();
    
    if (fromValue && itemTime < new Date(fromValue).getTime()) return false;
    if (toValue && itemTime > new Date(toValue).getTime()) return false;
    
    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7' style='text-align:center'>No suppliers found</td></tr>";
    return;
  }

  // 2. RENDER ROWS
  filtered.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td> 
        <td>${item.name}</td>
        <td>${item.number}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
        <td>${item.date || 'No Date'}</td>
        <td>
          <button onclick="editSupplier(${item.id})" id = "edit-btn">Edit</button>
          <button onclick="deleteSupplier(${item.id})" id = "delete-btn">Delete</button>
        </td>
      </tr>`;
  });
}

// 3. EDIT FUNCTION (With Date Prompt matching first code)
window.editSupplier = (id) => {
  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  const index = suppliers.findIndex(s => s.id === id);
  
  if (index !== -1) {
    const item = suppliers[index];
    
    const newName = prompt("Enter Name:", item.name);
    const newNumber = prompt("Enter Phone:", item.number);
    const newEmail = prompt("Enter Email:", item.email);
    const newAddress = prompt("Enter Address:", item.address);
    // Matches the date prompt style of your first code
    const newDate = prompt("Enter Date (YYYY-MM-DDTHH:MM):", item.date || "");

    if (newName !== null && newNumber !== null) {
      suppliers[index] = { 
        ...item, 
        name: newName, 
        number: newNumber, 
        email: newEmail, 
        address: newAddress, 
        date: newDate 
      };
      localStorage.setItem("suppliers", JSON.stringify(suppliers));
      loadSuppliers();
    }
  }
};

window.deleteSupplier = (id) => {
  if (confirm("Are you sure?")) {
    let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    suppliers = suppliers.filter(s => s.id !== id);
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    loadSuppliers();
  }
};

// 4. REAL-TIME LISTENERS (Changed from 'change' to 'input')
if (fromInput) fromInput.addEventListener("input", loadSuppliers);
if (toInput) toInput.addEventListener("input", loadSuppliers);

// Initial load
loadSuppliers();
