document.getElementById("submitBtn-vendor").addEventListener("click", () => {
  const supplier = {
    id: Date.now(),
    name: document.getElementById("name").value,
    number: document.getElementById("p-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,

  };


  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  suppliers.push(supplier);
  localStorage.setItem("suppliers", JSON.stringify(suppliers));

  alert("Customer added successfully ✅");
});
