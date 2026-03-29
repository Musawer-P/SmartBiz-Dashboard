function renderStockTable() {
    const stock = JSON.parse(localStorage.getItem("stock")) || [];
    const tableBody = document.getElementById("stock-table");
    
    // Get date input values
    const fromDate = document.getElementById("stock-from")?.value;
    const toDate = document.getElementById("stock-to")?.value;

    if (!tableBody) return;
    tableBody.innerHTML = "";

    let filteredStock = stock;

    // 1. FILTER LOGIC
    if (fromDate && toDate) {
        const start = new Date(fromDate).getTime();
        const end = new Date(toDate).getTime();

        filteredStock = stock.filter(item => {
            const itemTime = new Date(item.date).getTime();
            return itemTime >= start && itemTime <= end;
        });
    }

    // 2. EMPTY STATE
    if (filteredStock.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color: gray; padding: 20px;">No stock records found for this time frame.</td></tr>`;
        return;
    }

    // 3. RENDER ROWS
    filteredStock.forEach((item, index) => {
        // Profit calculation based on current sold quantity
        const realP = Number(item.realPrice || 0);
        const saleP = Number(item.salePrice || 0);
        const soldQ = Number(item.soldQty || 0);
        const profit = (saleP - realP) * soldQ;
        
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.totalStock}</td>
                <td>${soldQ}</td>
                <td>${item.availableQty}</td>
                <td>$${realP.toFixed(2)}</td>
                <td>$${saleP.toFixed(2)}</td>
                <td style="color: ${profit >= 0 ? 'green' : 'red'}">$${profit.toFixed(2)}</td>
                <td>${item.date}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. EVENT LISTENERS
document.getElementById("stock-from")?.addEventListener("change", renderStockTable);
document.getElementById("stock-to")?.addEventListener("change", renderStockTable);

// Call on page load
window.onload = renderStockTable;
