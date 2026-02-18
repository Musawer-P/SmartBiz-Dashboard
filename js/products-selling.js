const products = document.querySelectorAll(".product-cart");
const cartTable = document.querySelector("#cart-table tbody");
const totalDisplay = document.getElementById("cart-total");
const amountDisplay = document.getElementById("payment-amount");

const cashBtn = document.getElementById("cash");
const creditBtn = document.getElementById("credit");
const submitBtn = document.getElementById("payment-submit");

let cart = {};
let selectedPayment = "";

// ---------------------------
// ADD TO CART
// ---------------------------
products.forEach(product => {
  product.addEventListener("click", () => {
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    if(cart[name]){
      cart[name].qty += 1;
    } else {
      cart[name] = { price: price, qty: 1 };
    }

    renderCart();
  });
});

// ---------------------------
// RENDER CART
// ---------------------------
function renderCart(){
  cartTable.innerHTML = "";
  let total = 0;

  for(let item in cart){
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

// ---------------------------
// PAYMENT SELECT
// ---------------------------
cashBtn.addEventListener("click", () => {
  selectedPayment = "Cash";
  cashBtn.style.background = "green";
  creditBtn.style.background = "";
});

creditBtn.addEventListener("click", () => {
  selectedPayment = "Credit";
  creditBtn.style.background = "blue";
  cashBtn.style.background = "";
});

// ---------------------------
// SUBMIT CART
// ---------------------------
submitBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) { alert("Cart is empty!"); return; }
  if (!selectedPayment) { alert("Select payment method!"); return; }

  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];

  for (let item in cart) {
    const soldQty = cart[item].qty;
    const sellPrice = cart[item].price;
    const mainPrice = sellPrice - 2; // example
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

  localStorage.setItem("bills", JSON.stringify(bills));
  localStorage.setItem("todaySales", JSON.stringify(todaySales));
  localStorage.setItem("salesReports", JSON.stringify(salesReports));

  cart = {};
  selectedPayment = "";
  cashBtn.style.background = "";
  creditBtn.style.background = "";
  renderCart();

  renderBills();
  renderTodaySales();
  renderSalesReports();

  alert("Sale saved successfully!");
});