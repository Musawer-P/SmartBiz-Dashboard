document.getElementById("submitBtn-vendor").addEventListener("click", () => {
  const supplier = {
    id: Date.now(),
    name: document.getElementById("name").value,
    number: document.getElementById("p-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,

  };


  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  suppliers.push(supplier);
  localStorage.setItem("suppliers", JSON.stringify(suppliers));

  alert("Customer added successfully ✅");
});

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const tableBody = document.getElementById("supplierTable");

function loadSuppliers() {
  const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

  const fromDate = fromInput.value ? new Date(fromInput.value) : null;
  const toDate = toInput.value ? new Date(toInput.value) : null;

  tableBody.innerHTML = "";

  const filtered = suppliers.filter(item => {
    const itemDate = new Date(item.date);

    if (fromDate && itemDate < fromDate) return false;
    if (toDate && itemDate > toDate) return false;

    return true;
  });

  filtered.forEach(item => {
    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>${item.date}</td>
      </tr>
    `;
  });
}

fromInput.addEventListener("change", loadSuppliers);
toInput.addEventListener("change", loadSuppliers);

loadSuppliers();