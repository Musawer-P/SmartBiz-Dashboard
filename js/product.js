// Add this to the top of product.js
let selectedPayment = "";
document.getElementById("cash-btn").onclick = () => selectedPayment = "Cash";
document.getElementById("loan-btn").onclick = () => selectedPayment = "Loan";
document.getElementById("bank-btn").onclick = () => selectedPayment = "Bank";

document.getElementById("submitBtn").addEventListener("click", () => {
    const name = document.getElementById("p-name").value.trim();
    const qty = Number(document.getElementById("p-qty").value.trim());
    const category = document.getElementById("p-category").value.trim();
    const barcode = document.getElementById("p-barcode").value.trim();
    const realPrice = Number(document.getElementById("p-real-price").value.trim());
    const salePrice = Number(document.getElementById("p-sale-price").value.trim());
    const supplier = document.getElementById("vendor").value.trim();

    if (!name || !qty || !category || !barcode || !realPrice || !salePrice || !selectedPayment || !supplier) {
        alert("Please fill all fields");
        return;
    }

    const product = {
        id: Date.now(),
        name, qty, category, barcode, realPrice, salePrice,
        payment: selectedPayment,
        supplier,
        date: new Date().toISOString().split("T")[0]
    };

    // A. SAVE TO products LOCALSTORAGE
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    // B. HANDLE LOAN SPECIFIC LOGIC
    if (selectedPayment.toLowerCase() === "loan") {
        let totalAmount = qty * realPrice;
        const loanRecord = {
            id: product.id,
            vendor: supplier,
            amount: totalAmount,
            status: "get-loan"
        };

        // SAVE TO payment-supplier LOCALSTORAGE
        let payments = JSON.parse(localStorage.getItem("payment-supplier")) || [];
        payments.push(loanRecord);
        localStorage.setItem("payment-supplier", JSON.stringify(payments));

        // ADD TO UI TABLE
        addLoanToPaymentTable(loanRecord.id, loanRecord.vendor, loanRecord.amount, loanRecord.status);
    }
    calculateTotal();

    // C. RESET FORM (Done AFTER processing logic)
    ["p-name", "p-qty", "p-category", "p-barcode", "p-real-price", "p-sale-price"].forEach(id => {
        document.getElementById(id).value = "";
    });
    selectedPayment = ""; 
    alert("Product added successfully ✅");

    // D. HANDLE STOCK TABLE LOGIC
let stock = JSON.parse(localStorage.getItem("stock")) || [];

// Check if product already exists in stock
let stockItem = stock.find(s => s.name === name);

if (stockItem) {
    stockItem.totalStock += qty;
    stockItem.availableQty += qty;
} else {
    stock.push({
        id: product.id,
        name: name,
        totalStock: qty,      // Total ever added
        soldQty: 0,           // Starts at 0
        availableQty: qty,    // Current physical stock
        realPrice: realPrice,
        salePrice: salePrice,
        date: product.date
    });
}
localStorage.setItem("stock", JSON.stringify(stock));
});



