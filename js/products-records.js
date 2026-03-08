const tableBody = document.getElementById("productsTable");

function loadProducts() {

  const products = JSON.parse(localStorage.getItem("products")) || [];

  tableBody.innerHTML = "";

  products.forEach(item => {

    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.category}</td>
        <td>${item.barcode}</td>
        <td>${item.realPrice}</td>
        <td>${item.salePrice}</td>
        <td>${item.payment}</td>
        <td>${item.supplier}</td>
        <td><button>Edit</button></td>
      </tr>
    `;

  });

}

loadProducts();