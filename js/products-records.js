// Get table body
const tableBody = document.getElementById("productsTable");

// Load products from localStorage
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  tableBody.innerHTML = "";

  products.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr data-index="${index}">
        <td class="name">${item.name}</td>
        <td class="qty">${item.qty}</td>
        <td class="category">${item.category}</td>
        <td class="barcode">${item.barcode}</td>
        <td class="realPrice">${item.realPrice}</td>
        <td class="salePrice">${item.salePrice}</td>
        <td class="payment">${item.payment}</td>
        <td class="supplier">${item.supplier}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Handle table clicks
tableBody.addEventListener("click", function(e) {
  const row = e.target.closest("tr");
  if (!row) return;

  const index = parseInt(row.dataset.index);
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // --- DELETE ---
  if (e.target.classList.contains("delete-btn")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
  }

  // --- EDIT ---
  if (e.target.classList.contains("edit-btn")) {

    const fields = ["name", "qty", "category", "barcode", "realPrice", "salePrice", "payment", "supplier"];

    fields.forEach(field => {
      const cell = row.querySelector(`.${field}`);
      let newValue = prompt(`Enter new ${field}:`, cell.textContent);

      if (newValue !== null) {
        // Convert numeric fields to proper numbers
        if (field === "qty" || field === "realPrice" || field === "salePrice") {
          if (!isNaN(newValue)) {
            newValue = parseFloat(newValue);
          } else {
            alert(`${field} must be a number! Skipping update for this field.`);
            return;
          }
        }

        // Update table cell
        cell.textContent = newValue;

        // Update localStorage
        products[index][field] = newValue;
      }
    });

    localStorage.setItem("products", JSON.stringify(products));
  }
});

// Initial load
loadProducts();