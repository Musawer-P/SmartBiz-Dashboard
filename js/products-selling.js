
const products = document.querySelectorAll(".product-cart");
const cartTable = document.querySelector("#cart-table tbody");
const totalDisplay = document.getElementById("cart-total");
const amountDisplay = document.getElementById("payment-amount");

const cashBtn = document.getElementById("cash");
const creditBtn = document.getElementById("credit");
const submitBtn = document.getElementById("payment-submit");
const billTable = document.querySelector("#bill-table tbody");
const todaySalesBody = document.getElementById("today-sales-body");


let cart = {};
let selectedPayment = "";

// =======================
// ADD PRODUCT TO CART
// =======================

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


// =======================
// RENDER CART
// =======================

function renderCart(){
  cartTable.innerHTML = "";
  let total = 0;

  for(let item in cart){
    let row = document.createElement("tr");

    let nameCell = `<td>${item}</td>`;
    let qtyCell = `<td>${cart[item].qty}</td>`;
    let priceCell = `<td>${cart[item].price * cart[item].qty} $</td>`;

    row.innerHTML = nameCell + qtyCell + priceCell;
    cartTable.appendChild(row);

    total += cart[item].price * cart[item].qty;
  }

  totalDisplay.textContent = total;
  amountDisplay.textContent = "Amount: " + total + " $";
}


// =======================
// PAYMENT SELECT
// =======================

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


// =======================
// SUBMIT BILL
// =======================
submitBtn.addEventListener("click", () => {

  if(Object.keys(cart).length === 0){
    alert("Cart is empty!");
    return;
  }

  if(selectedPayment === ""){
    alert("Select payment method!");
    return;
  }

  for(let item in cart){
    const soldQty = cart[item].qty;
    const sellPrice = cart[item].price;
    const mainPrice = sellPrice - 2; // example cost
    const profit = sellPrice - mainPrice;

    // Add to Bills
    if(window.addToBill) {
      addToBill({
        name: item,
        soldQty: soldQty,
        sellPrice: sellPrice,
        payment: selectedPayment
      });
    }

    // Add to Today Sales
    if(window.addToTodaySales) {
      addToTodaySales({
        name: item,
        stockQty: "-",
        soldQty: soldQty,
        mainPrice: mainPrice,
        sellPrice: sellPrice,
        profit: profit
      });
    }

    // Add to Sales Reports (Modal)
    if(window.addToSalesReports) {
      addToSalesReports({
        name: item,
        stockQty: "-",
        soldQty: soldQty,
        mainPrice: mainPrice,
        sellPrice: sellPrice,
        profit: profit
      });
    }
  }

  // Reset cart
  cart = {};
  renderCart();
  selectedPayment = "";
  cashBtn.style.background = "";
  creditBtn.style.background = "";

  alert("Sale Saved Successfully!");
});