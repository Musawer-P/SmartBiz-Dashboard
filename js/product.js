let selectedPayment = "";

// payment buttons
document.getElementById("cash-btn").onclick = () => selectedPayment = "Cash";
document.getElementById("loan-btn").onclick = () => selectedPayment = "Loan";
document.getElementById("bank-btn").onclick = () => selectedPayment = "Bank";

document.getElementById("submitBtn").addEventListener("click", () => {
  const product = {
    id: Date.now(),
    name: document.getElementById("p-name").value,
    qty: document.getElementById("p-qty").value,
    category: document.getElementById("p-category").value,
    barcode: document.getElementById("p-barcode").value,
    realPrice: document.getElementById("p-real-price").value,
    salePrice: document.getElementById("p-sale-price").value,
    payment: selectedPayment,
    supplier: document.getElementById("vendor").value
  };

  if (
    !product.name ||
    !product.qty ||
    !product.category ||
    !product.barcode ||
    !product.realPrice ||
    !product.salePrice ||
    !product.payment ||
    !product.supplier
  ) {
    alert("Please fill all fields");
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added successfully ✅");
});
