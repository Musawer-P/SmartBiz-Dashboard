// 1. SELECT UI ELEMENTS
const container = document.querySelector(".products-container");
const cartTable = document.querySelector("#cart-table tbody");
const totalDisplay = document.getElementById("cart-total");
const amountDisplay = document.getElementById("payment-amount");
const customerSelect = document.getElementById("customer-select");

const cashBtn = document.getElementById("cash");
const loanBtn = document.getElementById("loan");
const submitBtn = document.getElementById("payment-submit");

let cart = {};
let selectedPayment = "";

// 2. LOAD & RENDER PRODUCTS FROM STORAGE
function loadProducts() {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  container.innerHTML = ""; // Clear current view

  storedProducts.forEach(item => {
    // Only show products that have stock > 0
    if (item.qty > 0) {
      const productDiv = document.createElement("div");
      productDiv.className = "product-cart";
      productDiv.dataset.name = item.name;
      productDiv.dataset.price = item.salePrice;
      productDiv.dataset.stock = item.qty;

      productDiv.innerHTML = `
        <div class="p-price"><p>${item.salePrice}$</p></div>
        <div class="img"><img src="images/chocolate.png"></div>
        <div class="product-desc">
          <p><strong>${item.name}</strong></p>
          <p>${item.qty} In Stock</p>
        </div>
      `;

      productDiv.addEventListener("click", () => addToCart(item.name, item.salePrice, item.qty));
      container.appendChild(productDiv);
    }
  });
}

// 3. LOAD CUSTOMERS
function loadCustomers() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  if (customerSelect) {
    customerSelect.innerHTML = `<option value="">Select Customer</option>`;
    customers.forEach(c => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.name;
      customerSelect.appendChild(option);
    });
  }
}

// 4. ADD TO CART LOGIC
function addToCart(name, price, stock) {
  const currentQty = cart[name] ? cart[name].qty : 0;
  
  if (currentQty < stock) {
    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price: parseFloat(price), qty: 1 };
    }
    renderCart();
  } else {
    alert("Out of stock!");
  }
}

// 5. RENDER CART TABLE
function renderCart() {
  cartTable.innerHTML = "";
  let total = 0;
  for (let item in cart) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item}</td>
      <td>${cart[item].qty}</td>
      <td>$${(cart[item].price * cart[item].qty).toFixed(2)}</td>
    `;
    cartTable.appendChild(row);
    total += cart[item].price * cart[item].qty;
  }
  totalDisplay.textContent = total.toFixed(2);
  amountDisplay.textContent = "Amount: " + total.toFixed(2) + " $";
}

// 6. PAYMENT SELECTION UI
cashBtn.addEventListener("click", () => {
  selectedPayment = "Cash";
  cashBtn.style.background = "green";
  cashBtn.style.color = "white";
  loanBtn.style.background = "";
});

loanBtn.addEventListener("click", () => {
  selectedPayment = "get-loan";
  loanBtn.style.background = "red";
  loanBtn.style.color = "white";
  cashBtn.style.background = "";
});

// 7. SUBMIT SALE (The Big Logic)
submitBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) { alert("Cart is empty!"); return; }
  if (!selectedPayment) { alert("Select payment method!"); return; }

  const customerName = customerSelect ? customerSelect.options[customerSelect.selectedIndex].text : "Guest";
  
  if (selectedPayment === "get-loan" && (!customerSelect || customerSelect.value === "")) {
    alert("Please select a customer for the loan!");
    return;
  }

  // Load current databases
  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let totalCartAmount = 0;

  // Process items in cart
  for (let itemName in cart) {
    const soldQty = cart[itemName].qty;
    const sellPrice = cart[itemName].price;
    const itemTotal = sellPrice * soldQty;
    totalCartAmount += itemTotal;

    // A. Update Stock in "products"
    const productIdx = products.findIndex(p => p.name === itemName);
    if (productIdx !== -1) {
      products[productIdx].qty = parseInt(products[productIdx].qty) - soldQty;
    }

    // B. Create Sale Record
    const saleData = {
      product: itemName,
      soldQty: soldQty,
      sellPrice: sellPrice,
      total: itemTotal,
      payment: selectedPayment,
      customer: customerName,
      timestamp: new Date().toISOString()
    };

    bills.push(saleData);
  }

  // C. Save Loan Record if applicable
  if (selectedPayment === "get-loan") {
    let loans = JSON.parse(localStorage.getItem("payment-customer")) || [];
    loans.push({
      id: Date.now(),
      customer: customerName,
      amount: totalCartAmount.toFixed(2),
      status: "Unpaid",
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("payment-customer", JSON.stringify(loans));
  }

  // D. Update LocalStorage
  localStorage.setItem("bills", JSON.stringify(bills));
  localStorage.setItem("products", JSON.stringify(products));

  // 8. RESET EVERYTHING
  alert("Transaction Successful!");
  cart = {};
  selectedPayment = "";
  cashBtn.style.background = "";
  loanBtn.style.background = "";
  if(customerSelect) customerSelect.value = "";
  
  renderCart();
  loadProducts(); // Refresh the product display to show new stock levels
});

// INITIALIZE
window.onload = () => {
  loadProducts();
  loadCustomers();
};
