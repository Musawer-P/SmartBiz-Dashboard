const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const tableBody = document.getElementById("supplierTable");

function loadSuppliers() {
  const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  const fromDate = fromInput.value;
  const toDate = toInput.value;

  tableBody.innerHTML = "";

  const filtered = suppliers.filter(item => {
    if (fromDate && item.date < fromDate) return false;
    if (toDate && item.date > toDate) return false;
    return true;
  });

  filtered.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td> 
        <td>${item.name}</td>
        <td>${item.number}</td>
                <td>${item.email}</td>
                <td>${item.address}</td>

        <td>${item.date}</td>
        <td>
          <button onclick="editSupplier(${item.id})">Edit</button>
          <button onclick="deleteSupplier(${item.id})">Delete</button>
        </td>
      </tr>`;
  });
}

// Edit Function
window.editSupplier = (id) => {
  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  const index = suppliers.findIndex(s => s.id === id);
  
  if (index !== -1) {
    const item = suppliers[index];
    
    // Simple prompt for editing (you can replace this with a formal modal/form)
    const newName = prompt("Edit Name:", item.name);
    const newNumber = prompt("Edit Phone:", item.number);
    const newemail = prompt("Edit Email:", item.email);
    const newaddress = prompt("Edit Address:", item.address);

    const newDate = prompt("Edit Date:", item.date);

    if (newName && newNumber && newemail && newaddress && newDate) {
      suppliers[index] = { ...item, name: newName, number: newNumber, email: newemail,address: newaddress, date: newDate };
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

[fromInput, toInput].forEach(el => el?.addEventListener("change", loadSuppliers));
loadSuppliers();
