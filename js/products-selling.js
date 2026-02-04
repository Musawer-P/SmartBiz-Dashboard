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
