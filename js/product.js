let selectedPayment = "";

// payment buttons
document.getElementById("cash-btn").onclick = () => selectedPayment = "Cash";
document.getElementById("loan-btn").onclick = () => selectedPayment = "Loan";
document.getElementById("bank-btn").onclick = () => selectedPayment = "Bank";

document.getElementById("submitBtn").addEventListener("click", () => {
  const product = {
    id: Date.now(),
    name: document.getElementById("p-name").value,
    qty: document.getElementById("p-qty").value,
    category: document.getElementById("p-category").value,
    barcode: document.getElementById("p-barcode").value,
    realPrice: document.getElementById("p-real-price").value,
    salePrice: document.getElementById("p-sale-price").value,
    payment: selectedPayment,
    supplier: document.getElementById("vendor").value
  };

  if (
    !product.name ||
    !product.qty ||
    !product.category ||
    !product.barcode ||
    !product.realPrice ||
    !product.salePrice ||
    !product.payment ||
    !product.supplier
  ) {
    alert("Please fill all fields");
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added successfully ✅");
});



const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const tableBody = document.getElementById("productsTable")

function loadSuppliers() {
  const suppliers = JSON.parse(localStorage.getItem("products")) || [];

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