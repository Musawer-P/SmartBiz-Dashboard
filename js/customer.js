document.getElementById("submitBtn-customer").addEventListener("click", () => {
  const customer = {
    id: Date.now(),
    name: document.getElementById("customer-name").value,
    number: document.getElementById("p-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    gender: document.getElementById("gender").value,
    discount: document.getElementById("discount").value
  };


  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));

  alert("Customer added successfully ✅");
});

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const tableBody = document.getElementById("customersTable")

function loadSuppliers() {
  const suppliers = JSON.parse(localStorage.getItem("customers")) || [];

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