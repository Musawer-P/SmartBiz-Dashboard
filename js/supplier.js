function updateVendorDropdown() {
  const vendorSelect = document.getElementById("vendor");
  if (!vendorSelect) return;

  vendorSelect.innerHTML = `<option selected disabled>Vendors</option>`;

  const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  suppliers.forEach(supplier => {
    const option = document.createElement("option");
    option.value = supplier.id;
    option.textContent = supplier.name;
    vendorSelect.appendChild(option);
  });
}

document.getElementById("submitBtn-vendor").addEventListener("click", () => {
  const supplier = {
    id: Date.now(),
    name: document.getElementById("name").value.trim(),
    number: document.getElementById("p-number").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    date: new Date().toISOString().split('T')[0]
  };

  if (!supplier.name) return alert("Name is required");

  let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
  suppliers.push(supplier);
  localStorage.setItem("suppliers", JSON.stringify(suppliers));

  updateVendorDropdown();

  alert("Supplier added successfully ✅");

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("p-number").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
});

// Load dropdown on page load
window.addEventListener("DOMContentLoaded", () => {
  updateVendorDropdown();
});