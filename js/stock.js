function renderStockTable() {
    const stock = JSON.parse(localStorage.getItem("stock")) || [];
    const tableBody = document.getElementById("stock-table");
    tableBody.innerHTML = "";

    stock.forEach((item, index) => {
        const profit = (item.salePrice - item.realPrice) * item.soldQty;
        
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.totalStock}</td>
                <td>${item.soldQty}</td>
                <td>${item.availableQty}</td>
                <td>$${item.realPrice}</td>
                <td>$${item.salePrice}</td>
                <td style="color: ${profit >= 0 ? 'green' : 'red'}">$${profit.toFixed(2)}</td>
                <td>${item.date}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Call this on page load
window.onload = renderStockTable;
