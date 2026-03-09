window.addEventListener("DOMContentLoaded", () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const select = document.getElementById("customer-select");
    select.innerHTML = `<option value="">Select Customer</option>`;
    customers.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name; // display name
        select.appendChild(option);
    });
});