document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("productsTable");

  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='9'>No products found</td></tr>";
    return;
  }

  tableBody.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.qty}</td>
      <td>${product.category}</td>
      <td>${product.barcode}</td>
      <td>${product.realPrice}</td>
      <td>${product.salePrice}</td>
      <td>${product.payment}</td>
      <td>${product.supplier}</td>
      <td>Edit</td>
    `;

    tableBody.appendChild(row);
  });
});
