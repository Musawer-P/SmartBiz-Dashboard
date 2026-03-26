const tableBody = document.getElementById("productsTable");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");

function loadProducts() {
  if (!tableBody) return;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  
  const fromValue = fromInput ? fromInput.value : ""; 
  const toValue = toInput ? toInput.value : "";

  tableBody.innerHTML = "";

  // 1. FILTER LOGIC (Time-Sensitive)
  const filtered = products.filter(item => {
    if (!item.date) return true; 

    const itemTime = new Date(item.date).getTime();
    
    if (fromValue && itemTime < new Date(fromValue).getTime()) return false;
    if (toValue && itemTime > new Date(toValue).getTime()) return false;
    
    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='11' style='text-align:center'>No products found</td></tr>";
    return;
  }

  // 2. RENDER ROWS with # numbering
  filtered.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr data-id="${item.id || index}">
        <td>${index + 1}</td> 
        <td class="name">${item.name}</td>
        <td class="qty">${item.qty}</td>
        <td class="category">${item.category}</td>
        <td class="barcode">${item.barcode}</td>
        <td class="realPrice">${item.realPrice}</td>
        <td class="salePrice">${item.salePrice}</td>
        <td class="payment">${item.payment}</td>
        <td class="supplier">${item.supplier}</td>
        <td class="date">${item.date || 'No Date'}</td>
        <td>
          <button class="edit-btn" id = "edit-btn">Edit</button>
          <button class="delete-btn" id = "delete-btn">Delete</button>
        </td>
      </tr>
    `;
  });
}

// 3. TABLE CLICK ACTIONS (Edit/Delete)
tableBody.addEventListener("click", function(e) {
  const row = e.target.closest("tr");
  if (!row) return;

  const rowId = row.dataset.id;
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((p, i) => (p.id == rowId || i == rowId));

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Delete this product?")) {
      products.splice(productIndex, 1);
      localStorage.setItem("products", JSON.stringify(products));
      loadProducts();
    }
  }

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const fields = ["name", "qty", "category", "barcode", "realPrice", "salePrice", "payment", "supplier", "date"];

    fields.forEach(field => {
      const currentVal = products[productIndex][field] || "";
      let promptMsg = field === "date" ? `Enter Date (YYYY-MM-DDTHH:MM):` : `Enter new ${field}:`;
      let newValue = prompt(promptMsg, currentVal);

      if (newValue !== null) {
        // Validation for numbers
        if (["qty", "realPrice", "salePrice"].includes(field)) {
          newValue = isNaN(newValue) ? currentVal : parseFloat(newValue);
        }
        products[productIndex][field] = newValue;
      }
    });

    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
  }
});

// 4. EVENT LISTENERS
if (fromInput) fromInput.addEventListener("input", loadProducts);
if (toInput) toInput.addEventListener("input", loadProducts);

// Initial load
loadProducts();
