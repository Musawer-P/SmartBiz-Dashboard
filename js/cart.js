let cart = JSON.parse(localStorage.getItem("smartbiz_cart")) || [];

const cartTableBody = document.getElementById("cartTableBody");
const cartTotalEl = document.getElementById("cartTotal");

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("smartbiz_cart", JSON.stringify(cart));
}

// Render cart table
function renderCart() {
  cartTableBody.innerHTML = "";
  let totalAmount = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalAmount += itemTotal;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <input 
          type="number" 
          min="1" 
          value="${item.qty}" 
          class="qty-input"
          data-index="${index}"
        >
      </td>
      <td>$${itemTotal}</td>
      <td>
        <button class="remove-btn" data-index="${index}">✖</button>
      </td>
    `;

    cartTableBody.appendChild(row);
  });

  cartTotalEl.textContent = totalAmount;
}

// Update quantity
cartTableBody.addEventListener("input", function (e) {
  if (e.target.classList.contains("qty-input")) {
    const index = e.target.dataset.index;
    const newQty = parseInt(e.target.value);

    if (newQty > 0) {
      cart[index].qty = newQty;
      saveCart();
      renderCart();
    }
  }
});

// Remove item
cartTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
});

// Checkout button
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  alert("Checkout successful (demo)");
  cart = [];
  saveCart();
  renderCart();
});

// Initial render
renderCart();
