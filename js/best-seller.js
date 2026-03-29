 document.addEventListener("DOMContentLoaded", () => {
  const bestSellerContainer = document.querySelector(".best-seller-cards");
  let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];

  if (salesReports.length === 0) {
    bestSellerContainer.innerHTML = "<p>No sales yet</p>";
    return;
  }

  const productMap = {};

  salesReports.forEach(sale => {
    if (!productMap[sale.product]) {
      productMap[sale.product] = {
        name: sale.product,
        soldQty: 0,
        sellPrice: sale.sellPrice
      };
    }
    productMap[sale.product].soldQty += Number(sale.soldQty || 0);
  });

  // --- ADDED FILTER AND SORT ---
  const productsArray = Object.values(productMap)
    .filter(p => p.soldQty >= 10) // Only show if sold quantity is 10 or more
    .sort((a, b) => b.soldQty - a.soldQty); // Sort by highest sales

  const topProducts = productsArray.slice(0, 5);

  bestSellerContainer.innerHTML = "";

  // Handle case where no products have hit the 10-sale limit yet
  if (topProducts.length === 0) {
    bestSellerContainer.innerHTML = "<p>No products have reached 10 sales yet.</p>";
    return;
  }

  topProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="top">
            <span class="name">${product.name}</span>
            <span class="qty">Sold Qty: ${product.soldQty}</span>
        </div>
        <div class="profit">$${Number(product.sellPrice).toFixed(2)}</div>
    `;

    bestSellerContainer.appendChild(card);
  });
});
