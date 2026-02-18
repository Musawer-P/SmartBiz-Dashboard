document.addEventListener("DOMContentLoaded", () => {

  const todaySalesBody = document.getElementById("today-sales-body");
  const modalSalesBody = document.getElementById("modal-sales-body");

  let sales = JSON.parse(localStorage.getItem("todaySales")) || [];
  let validSales = [];

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  // Filter only sales within 24 hours
  sales.forEach(sale => {
    if(now - sale.timestamp < oneDay){
      validSales.push(sale);
    }
  });

  // Save cleaned data back
  localStorage.setItem("todaySales", JSON.stringify(validSales));

  // Clear tables
  todaySalesBody.innerHTML = "";
  modalSalesBody.innerHTML = "";

  validSales.forEach((sale, index) => {

    const saleDate = new Date(sale.timestamp).toISOString().split("T")[0];

    let rowHTML = `
      <td>${index + 1}</td>
      <td>${sale.product}</td>
      <td>${sale.stockQty}</td>
      <td>${sale.soldQty}</td>
      <td>$${sale.mainPrice.toFixed(2)}</td>
      <td>$${sale.sellPrice.toFixed(2)}</td>
      <td>$${sale.profit.toFixed(2)}</td>
      <td>${saleDate}</td>
    `;

    let row1 = document.createElement("tr");
    row1.innerHTML = rowHTML;
    todaySalesBody.appendChild(row1);

    let row2 = document.createElement("tr");
    row2.innerHTML = rowHTML;
    modalSalesBody.appendChild(row2);

  });

});
