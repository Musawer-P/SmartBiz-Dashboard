document.getElementById("submitBtn-vendor").addEventListener("click", () => {
  const supplier = {
    id: Date.now(),
    name: document.getElementById("name").value,
    number: document.getElementById("p-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    date: new Date().toISOString().split('T')[0] // Saves YYYY-MM-DD
  };

  if (!supplier.name) return alert("Name is required");

  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  suppliers.push(supplier);
  localStorage.setItem("suppliers", JSON.stringify(suppliers));

  alert("Supplier added successfully ✅");
  // Clear inputs
  document.querySelectorAll(".expenses-input-div input").forEach(i => i.value = "");
});
