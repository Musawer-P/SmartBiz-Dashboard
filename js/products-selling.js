
const products = document.querySelectorAll(".product-cart");
const cartTable = document.querySelector("#cart-table tbody");
const totalDisplay = document.getElementById("cart-total");
const amountDisplay = document.getElementById("payment-amount");

const cashBtn = document.getElementById("cash");
const creditBtn = document.getElementById("credit");
const submitBtn = document.getElementById("payment-submit");
const billTable = document.querySelector("#bill-table tbody");

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
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${item}</td>
      <td>${cart[item].qty}</td>
      <td>${cart[item].price * cart[item].qty} $</td>
      <td>${selectedPayment}</td>
    `;

    billTable.appendChild(row);
  }

  // Clear cart
  cart = {};
  renderCart();
  selectedPayment = "";
  cashBtn.style.background = "";
  creditBtn.style.background = "";

  alert("Bill Created Successfully!");

});