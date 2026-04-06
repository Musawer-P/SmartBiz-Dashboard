// 0. NOTIFICATION SYSTEM
const notificationCenter = document.querySelector(".notification-center");
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

function renderNotifications() {
    if (!notificationCenter) return;
    notificationCenter.innerHTML = "<h3>Notifications</h3>";

    notifications.forEach((note, i) => {
        const div = document.createElement("div");
        div.className = "notification-item";
        div.innerHTML = `
            <span>${note}</span>
            <button class="clear-btn" data-index="${i}">×</button>
        `;
        notificationCenter.appendChild(div);
    });

    if (notifications.length > 0) {
        const clearAllBtn = document.createElement("button");
        clearAllBtn.className = "clear-all-btn";
        clearAllBtn.textContent = "Clear All";
        notificationCenter.appendChild(clearAllBtn);

        clearAllBtn.addEventListener("click", () => {
            notifications = [];
            localStorage.setItem("notifications", JSON.stringify(notifications));
            renderNotifications();
        });
    }
}

function addNotification(message) {
    notifications.push(message);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    renderNotifications();
}

// Handle clearing single notification
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-btn")) {
        const idx = parseInt(e.target.dataset.index);
        notifications.splice(idx, 1);
        localStorage.setItem("notifications", JSON.stringify(notifications));
        renderNotifications();
    }
});

// Initial render
renderNotifications();


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
  container.innerHTML = ""; 

  storedProducts.forEach(item => {
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
  if (!cartTable) return;
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
  if (totalDisplay) totalDisplay.textContent = total.toFixed(2);
  if (amountDisplay) amountDisplay.textContent = "Amount: " + total.toFixed(2) + " $";
}

// 6. PAYMENT SELECTION UI
cashBtn?.addEventListener("click", () => {
  selectedPayment = "Cash";
  cashBtn.style.background = "green";
  cashBtn.style.color = "white";
  loanBtn.style.background = "";
  loanBtn.style.color = "";
});

loanBtn?.addEventListener("click", () => {
  selectedPayment = "get-loan";
  loanBtn.style.background = "red";
  loanBtn.style.color = "white";
  cashBtn.style.background = "";
  cashBtn.style.color = "";
});

// 7. SUBMIT SALE (Updated for Sales Reports & Today Sales)
submitBtn?.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) { alert("Cart is empty!"); return; }
  if (!selectedPayment) { alert("Select payment method!"); return; }

  const customerName = customerSelect && customerSelect.selectedIndex !== -1 
    ? customerSelect.options[customerSelect.selectedIndex].text 
    : "Guest";
  
  if (selectedPayment === "get-loan" && (!customerSelect || customerSelect.value === "")) {
    alert("Please select a customer for the loan!");
    return;
  }

  // Load current databases
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let stock = JSON.parse(localStorage.getItem("stock")) || [];
  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  
  let totalCartAmount = 0;

  // Process items in cart
  for (let itemName in cart) {
    const soldQty = cart[itemName].qty;
    const sellPrice = cart[itemName].price;
    const itemTotal = sellPrice * soldQty;
    totalCartAmount += itemTotal;

    // Get stock info for "Main Price" and "Profit"
    let stockItem = stock.find(s => s.name === itemName);
    const mainPrice = stockItem ? Number(stockItem.realPrice || 0) : 0;
    const currentStockQty = stockItem ? Number(stockItem.availableQty || 0) : 0;
    const currentProfit = (sellPrice - mainPrice) * soldQty;

    // 1. Update "products" array
    const productIdx = products.findIndex(p => p.name === itemName);
    if (productIdx !== -1) {
      products[productIdx].qty = parseInt(products[productIdx].qty) - soldQty;
    }

    // 2. Update "stock" array
    if (stockItem) {
        stockItem.soldQty = (Number(stockItem.soldQty) || 0) + soldQty;
        stockItem.availableQty = currentStockQty - soldQty;
        stockItem.profit = (Number(stockItem.profit) || 0) + currentProfit;
    }

    // 3. Create the data object (Formatted for sales.js)
    const saleEntry = {
      product: itemName,
      stockQty: currentStockQty, // Stock before this sale
      soldQty: soldQty,
      mainPrice: mainPrice,
      sellPrice: sellPrice,
      profit: currentProfit,
      total: itemTotal,
      payment: selectedPayment,
      customer: customerName,
      timestamp: new Date().toISOString()
    };

    // Save to all 3 necessary tables
    bills.push(saleEntry);
    salesReports.push(saleEntry);
    todaySales.push(saleEntry);
  }

  // Save Loan Record if applicable
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

  // SAVE ALL CHANGES
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("stock", JSON.stringify(stock));
  localStorage.setItem("bills", JSON.stringify(bills));
  localStorage.setItem("salesReports", JSON.stringify(salesReports));
  localStorage.setItem("todaySales", JSON.stringify(todaySales));


  // --- ADD NOTIFICATIONS FOR EACH ITEM SOLD ---
for (let itemName in cart) {
    const soldQty = cart[itemName].qty;
    const message = `Sold ${soldQty} × ${itemName}`;
    addNotification(message); // <-- Call the function from notification.js
}


  // 8. RESET UI
  alert("Transaction Successful! ✅");
  cart = {};
  selectedPayment = "";
  cashBtn.style.background = "";
  cashBtn.style.color = "";
  loanBtn.style.background = "";
  loanBtn.style.color = "";
  if(customerSelect) customerSelect.value = "";
  
  renderCart();
  loadProducts(); 
});

// INITIALIZE
window.onload = () => {
  loadProducts();
  loadCustomers();
};
