

// selected payment type
let selectedPayment = "";

// payment buttons
document.getElementById("cash-btn").onclick = () => selectedPayment = "Cash";
document.getElementById("loan-btn").onclick = () => selectedPayment = "Loan";
document.getElementById("bank-btn").onclick = () => selectedPayment = "Bank";


window.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach(product => {
        if (product.payment.toLowerCase() === "loan") {
            let totalAmount = Number(product.qty) * Number(product.realPrice);
            addLoanToPaymentTable(product.id, product.supplier, product.payment, totalAmount);
        }
    });
});


// Submit new product

document.getElementById("submitBtn").addEventListener("click", () => {

    // Get input values
    const name = document.getElementById("p-name").value.trim();
    const qty = Number(document.getElementById("p-qty").value.trim());
    const category = document.getElementById("p-category").value.trim();
    const barcode = document.getElementById("p-barcode").value.trim();
    const realPrice = Number(document.getElementById("p-real-price").value.trim());
    const salePrice = Number(document.getElementById("p-sale-price").value.trim());
    const supplier = document.getElementById("vendor").value.trim();

    // Validate
    if (!name || !qty || !category || !barcode || !realPrice || !salePrice || !selectedPayment || !supplier) {
        alert("Please fill all fields");
        return;
    }

    // Create product object
    const product = {
        id: Date.now(),
        name,
        qty,
        category,
        barcode,
        realPrice,
        salePrice,
        payment: selectedPayment,
        supplier,
        date: new Date().toISOString().split("T")[0]
    };

    // Save to localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    // Add to payment table if Loan
    if (selectedPayment.toLowerCase() === "loan") {
        let totalAmount = qty * realPrice;
        addLoanToPaymentTable(product.id, supplier, selectedPayment, totalAmount);
    }

    // Reset form
    document.getElementById("p-name").value = "";
    document.getElementById("p-qty").value = "";
    document.getElementById("p-category").value = "";
    document.getElementById("p-barcode").value = "";
    document.getElementById("p-real-price").value = "";
    document.getElementById("p-sale-price").value = "";
    selectedPayment = "";

    alert("Product added successfully ✅");
});

function addLoanToPaymentTable(id, supplier, type, totalAmount) {
    const tbody = document.querySelector("#payment-table tbody");

    const row = document.createElement("tr");
    row.setAttribute("data-id", id);

    row.innerHTML = `
        <td></td>
        <td class="amount">${totalAmount.toFixed(2)}</td>
        <td><p>${type}</p></td>
        <td>
            <button class="edit-btn-payment">Edit</button>
            <button class="delete-btn-payment">Delete</button>
        </td>
    `;

    tbody.appendChild(row);

    // Recalculate total and reorder rows
    if (typeof calculateTotal === "function") calculateTotal();
    if (typeof reorderRows === "function") reorderRows();
}
// Delete button
row.querySelector(".delete-btn-payment").addEventListener("click", () => {
    row.remove();
    // Remove from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    if (typeof calculateTotal === "function") calculateTotal();
    if (typeof reorderRows === "function") reorderRows();
});

// Edit button
tbody.addEventListener("click", function(e){
    const row = e.target.closest("tr");
    if(!row) return;

    // DELETE
    if(e.target.classList.contains("delete-btn-payment")){
        row.remove();
        if(typeof calculateTotal === "function") calculateTotal();
        if(typeof reorderRows === "function") reorderRows();
    }

    // EDIT
    if(e.target.classList.contains("edit-btn-payment")){
        const amountCell = row.querySelector(".amount");
        let currentAmount = parseFloat(amountCell.textContent);
        let newAmount = prompt("Edit amount:", currentAmount.toFixed(2));
        if(newAmount === null) return;
        newAmount = parseFloat(newAmount);
        if(isNaN(newAmount) || newAmount <= 0){
            alert("Invalid amount");
            return;
        }
        amountCell.textContent = newAmount.toFixed(2);
        if(typeof calculateTotal === "function") calculateTotal();
    }
});