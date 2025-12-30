
// Get elements
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const addProductBtn = document.getElementById("addProductBtn");
const productsTable = document.getElementById("productsTable");

// Load products from localStorage
let products = JSON.parse(localStorage.getItem("smartbiz_products")) || [];

// Render products on page load
document.addEventListener("DOMContentLoaded", renderProducts);

// Add product
addProductBtn.addEventListener("click", () => {
  if (
    productName.value === "" ||
    productPrice.value === "" ||
    productStock.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const product = {
    id: Date.now(),
    name: productName.value,
    price: productPrice.value,
    stock: productStock.value,
  };

  products.push(product);
  saveProducts();
  renderProducts();
  clearInputs();
});

// Render products
function renderProducts() {
  productsTable.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;

    productsTable.appendChild(row);
  });
}

// Delete product
function deleteProduct(id) {
  products = products.filter(product => product.id !== id);
  saveProducts();
  renderProducts();
}

// Save to localStorage
function saveProducts() {
  localStorage.setItem("smartbiz_products", JSON.stringify(products));
}

// Clear input fields
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productStock.value = "";
}
