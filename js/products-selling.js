const productsContainer = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h4>${product.name}</h4>
      <p>Price: $${product.salePrice}</p>
      <p>Stock: ${product.qty}</p>
    `;

    card.addEventListener("click", () => addToCart(product));
    productsContainer.appendChild(card);
  });
}


function addToCart(product) {
  const item = cart.find(p => p.id === product.id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.salePrice),
      qty: 1
    });
  }

  renderCart();
}


function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty} — $${item.price * item.qty}
    `;
    cartItems.appendChild(li);
  });

  totalPriceEl.textContent = total;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Checkout successful ✅");

  cart = [];
  renderCart();
});


renderProducts();



const soldItems = []; 


function getTodaysSales(items) {
  const today = new Date();
  return items.filter(item => {
    const soldDate = new Date(item.soldAt);
    return soldDate.toDateString() === today.toDateString();
  });
}

function renderSalesTable() {
  const tableBody = document.querySelector("#sales-table tbody");
  tableBody.innerHTML = ""; // clear old rows

  const todaySales = getTodaysSales(soldItems);

  todaySales.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>$${item.price}</td>
      <td>${new Date(item.soldAt).toLocaleTimeString()}</td>
    `;
    tableBody.appendChild(row);
  });
}


function addSale(item) {
  soldItems.push({ ...item, soldAt: new Date().toISOString() });
  renderSalesTable(); // update table immediately
}