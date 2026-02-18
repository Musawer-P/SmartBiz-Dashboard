let total = 0;

function addToBill(product) {
  const tbody = document.querySelector("#bill-table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.soldQty}</td>
    <td>${(product.soldQty * product.sellPrice).toFixed(2)} $</td>
    <td>${product.payment}</td>
  `;
  tbody.appendChild(row);
}
