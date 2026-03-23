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
        <td>${item.date}</td>
        <td><button onclick="deleteSupplier(${item.id})">Delete</button></td>
      </tr>`;
  });
}

window.deleteSupplier = (id) => {
    let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    suppliers = suppliers.filter(s => s.id !== id);
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    loadSuppliers();
};

[fromInput, toInput].forEach(el => el?.addEventListener("change", loadSuppliers));
loadSuppliers();
