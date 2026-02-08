let total = 0;

function addToBill(name, price) {
    const tableBody = document.getElementById('bill-body');
    const totalDisplay = document.getElementById('total-price');

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

    nameCell.textContent = name;
    priceCell.textContent = `$${price}`;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);

    total += price;
    totalDisplay.textContent = total;
}