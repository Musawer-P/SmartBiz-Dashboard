let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

const supplierForm = document.getElementById("supplierForm");
const supplierTableBody = document.getElementById("supplierTableBody");

// Add Supplier
function addSupplier(name, phone, company) {
    const supplier = {
        id: Date.now(),
        name,
        phone,
        company
    };
    suppliers.push(supplier);
    localStorage.setItem("suppliers", JSON.stringify(suppliers)); // SAVE
    renderSuppliers();
}

// Render Supplier List
function renderSuppliers() {
    supplierTableBody.innerHTML = "";

    suppliers.forEach((supplier, index) => {
        supplierTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${supplier.name}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.company}</td>
                <td>
                    <button onclick="deleteSupplier(${supplier.id})" class="btn-delete">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Delete Supplier
function deleteSupplier(id) {
    suppliers = suppliers.filter(supplier => supplier.id !== id);
    localStorage.setItem("suppliers", JSON.stringify(suppliers)); // UPDATE STORAGE
    renderSuppliers();
}

// Form Submit
if (supplierForm) {
    supplierForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("supplierName").value;
        const phone = document.getElementById("supplierPhone").value;
        const email = document.getElementById("supplierEmail").value;
        const address = document.getElementById("supplierAddress").value;

        addSupplier(name, phone, email, address);
        supplierForm.reset();
    });
}

// Render on page load
renderSuppliers();
