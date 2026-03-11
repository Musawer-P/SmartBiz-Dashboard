// 1. LOAD PRODUCTS FROM STORAGE
const container = document.querySelector(".products-container");
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

storedProducts.forEach(item => {
  container.innerHTML += `
  <div class="product-cart"
       data-name="${item.name}"
       data-price="${item.salePrice}">
    <div class="p-price">
      <p>${item.salePrice}$</p>
    </div>
    <div class="img">
      <img src="images/chocolate.png">
    </div>
    <div class="product-desc">
      <p>${item.name}</p>
      <p>${item.qty}-PCS</p>
    </div>
  </div>
  `;
});

// 2. LOAD CUSTOMERS INTO DROPDOWN (Your logic)
window.addEventListener("DOMContentLoaded", () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const select = document.getElementById("customer-select");
    if (select) {
        select.innerHTML = `<option value="">Select Customer</option>`;
        customers.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.name; 
            select.appendChild(option);
        });
    }
});

// SELECT UI ELEMENTS
const productCards = document.querySelectorAll(".product-cart");
const cartTable = document.querySelector("#cart-table tbody");
const totalDisplay = document.getElementById("cart-total");
const amountDisplay = document.getElementById("payment-amount");

const cashBtn = document.getElementById("cash");
const loanBtn = document.getElementById("loan");
const submitBtn = document.getElementById("payment-submit");

let cart = {};
let selectedPayment = "";

// ADD TO CART
productCards.forEach(product => {
  product.addEventListener("click", () => {
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price: price, qty: 1 };
    }
    renderCart();
  });
});

function renderCart() {
  cartTable.innerHTML = "";
  let total = 0;
  for (let item in cart) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item}</td>
      <td>${cart[item].qty}</td>
      <td>${(cart[item].price * cart[item].qty).toFixed(2)} $</td>
    `;
    cartTable.appendChild(row);
    total += cart[item].price * cart[item].qty;
  }
  totalDisplay.textContent = total.toFixed(2);
  amountDisplay.textContent = "Amount: " + total.toFixed(2) + " $";
}

// PAYMENT SELECT
cashBtn.addEventListener("click", () => {
  selectedPayment = "Cash";
  cashBtn.style.background = "green";
  loanBtn.style.background = "";
});

loanBtn.addEventListener("click", () => {
  selectedPayment = "loan";
  loanBtn.style.background = "red";
  cashBtn.style.background = "";
});

// SUBMIT CART
submitBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }
  if (!selectedPayment) {
    alert("Select payment method!");
    return;
  }
// Inside your product-selling.js submitBtn listener:
if (selectedPayment.toLowerCase() === "loan") {
    const select = document.getElementById("customer-select");
    const customerName = select.options[select.selectedIndex].text;

    const loanRecord = {
        id: Date.now(), // <--- THIS SAVES THE UNIQUE ID
        customer: customerName,
        amount: totalCartAmount.toFixed(2),
        status: "loan"
    };

    let payments = JSON.parse(localStorage.getItem("payment-customer")) || [];
    payments.push(loanRecord);
    localStorage.setItem("payment-customer", JSON.stringify(payments));
}

  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];
  
  let totalCartAmount = 0; 

  // Process Sales Data
  for (let item in cart) {
    const soldQty = cart[item].qty;
    const sellPrice = cart[item].price;
    totalCartAmount += (sellPrice * soldQty);

    const mainPrice = sellPrice - 2; 
    const profit = sellPrice - mainPrice;

    const productData = {
      product: item,
      stockQty: "-",
      soldQty,
      mainPrice,
      sellPrice,
      profit,
      payment: selectedPayment,
      timestamp: Date.now()
    };

    bills.push(productData);
    todaySales.push(productData);
    salesReports.push(productData);
  }

  // --- SAVE LOAN DATA USING DROPDOWN ---
  if (selectedPayment.toLowerCase() === "loan") {
    const select = document.getElementById("customer-select");
    const customerName = select.options[select.selectedIndex].text;
    const customerValue = select.value;

    if (!customerValue) {
        alert("Please select a customer for the loan!");
        return; // Prevent saving if no customer selected
    }

    const loanRecord = {
        id: Date.now(),
        customer: customerName,
        amount: totalCartAmount.toFixed(2),
        status: "loan"
    };

    let payments = JSON.parse(localStorage.getItem("payment-customer")) || [];
    payments.push(loanRecord);
    localStorage.setItem("payment-customer", JSON.stringify(payments));
  }

  // Save all reports
  localStorage.setItem("bills", JSON.stringify(bills));
  localStorage.setItem("todaySales", JSON.stringify(todaySales));
  localStorage.setItem("salesReports", JSON.stringify(salesReports));

  // Reset UI
  cart = {};
  selectedPayment = "";
  cashBtn.style.background = "";
  loanBtn.style.background = "";
  if(document.getElementById("customer-select")) {
      document.getElementById("customer-select").value = "";
  }

  renderCart();

  if (typeof renderBills === "function") renderBills();
  if (typeof renderTodaySales === "function") renderTodaySales();
  if (typeof renderSalesReports === "function") renderSalesReports();

  alert("Sale saved successfully!");
});
