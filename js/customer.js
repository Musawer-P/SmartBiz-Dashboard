document.getElementById("submitBtn-customer").addEventListener("click", () => {
    // 1. Capture values using your specific HTML IDs
    const customer = {
        id: Date.now(),
        name: document.getElementById("customer-name").value,
        number: document.getElementById("customer-p-number").value, // Matches ID
        email: document.getElementById("customer-email").value,
        address: document.getElementById("customer-address").value,
        gender: document.getElementById("customer-gender").value,
        discount: document.getElementById("customer-discount").value,
        date: new Date().toISOString().split('T')[0] // Saves as YYYY-MM-DD for filtering
    };

    // 2. Validation
    if (!customer.name) {
        alert("Please enter a name");
        return;
    }

    // 3. Save to LocalStorage
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Customer added successfully ✅");

    // 4. Clear the form
    document.querySelectorAll(".p-row input").forEach(input => input.value = "");
});
