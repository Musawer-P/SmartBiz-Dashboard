document.getElementById("submitBtn-customer").addEventListener("click", () => {
  const customer = {
    id: Date.now(),
    name: document.getElementById("customer-name").value,
    number: document.getElementById("p-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    gender: document.getElementById("gender").value,
    discount: document.getElementById("discount").value
  };


  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));

  alert("Customer added successfully ✅");
});
