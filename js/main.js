if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}
// SIDEBAR TOGGLE
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});


// DASHBOARD STATS (Top Cards)

const stats = {
  revenue: 12540,
  expenses: 5340,
  profit: 7200,
  customers: 183
};

document.getElementById("revenue").innerText = `$${stats.revenue}`;
document.getElementById("expenses").innerText = `$${stats.expenses}`;
document.getElementById("profit").innerText = `$${stats.profit}`;
document.getElementById("customers").innerText = stats.customers;


// STATUS COLOR AUTO-DETECT

document.querySelectorAll(".status").forEach(statusEl => {
  const value = statusEl.innerText.toLowerCase();

  if (value === "success") statusEl.classList.add("status-success");
  else if (value === "failed") statusEl.classList.add("status-failed");
  else statusEl.classList.add("status-pending");
});


// RECENT TRANSACTIONS (Table)

const transactions = [
  { name: "Invoice #1023", amount: 450, status: "Success" },
  { name: "Invoice #1024", amount: 120, status: "Pending" },
  { name: "Invoice #1025", amount: 300, status: "Failed" }
];

const tbody = document.getElementById("transactionsBody");

transactions.forEach(t => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${t.name}</td>
    <td>$${t.amount}</td>
    <td><span class="status">${t.status}</span></td>
  `;

  tbody.appendChild(row);
});


// DATE & TIME (Header)

function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").innerText =
    now.toLocaleDateString() + " • " + now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();


// DARK / LIGHT MODE

const themeBtn = document.getElementById("themeToggle");

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});




// Line Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');

new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 8, 15, 22, 18],
      borderWidth: 2,
      tension: 0.4,
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});





// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');

new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      label: 'Stock',
      data: [30, 50, 20, 40],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});



document.addEventListener("DOMContentLoaded", function () {

    function setupPaymentSystem(tableId, buttonId, totalId, storageKey) {

      
        const table = document.getElementById(tableId);
        const tableBody = table.querySelector("tbody");
        const totalElement = document.getElementById(totalId);
        const payBtn = document.getElementById(buttonId);

        if (!table || !tableBody || !totalElement || !payBtn) return;

        // LOAD FROM LOCALSTORAGE
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            tableBody.innerHTML = savedData;
        }

        calculateTotal();

        // ======================
        // ADD PAYMENT
        // ======================
        payBtn.addEventListener("click", function () {
            let payAmount = prompt("Enter payment amount:");
            if (payAmount === null) return;

            payAmount = parseFloat(payAmount);
            if (isNaN(payAmount) || payAmount <= 0) {
                alert("Invalid amount!");
                return;
            }

            const newRow = `
                <tr>
                    <td>${tableBody.rows.length + 1}</td>
                    <td class="amount">${payAmount}</td>
                    <td><p>Cash</p></td>
                    <td>
                        <button class="edit-btn-payment">Edit</button>
                        <button class="delete-btn-payment">Delete</button>
                    </td>
                </tr>
            `;

            tableBody.insertAdjacentHTML("beforeend", newRow);
            save();
            calculateTotal();
        });

        // ======================
        // EDIT & DELETE (EVENT DELEGATION)
        // ======================
        tableBody.addEventListener("click", function (e) {
            const row = e.target.closest("tr");
            if (!row) return;

            // DELETE
            if (e.target.classList.contains("delete-btn-payment")) {
                row.remove();
                reorderRows();
                save();
                calculateTotal();
            }

            // EDIT
            if (e.target.classList.contains("edit-btn-payment")) {
                const amountCell = row.querySelector(".amount");
                let currentAmount = parseFloat(amountCell.textContent);
                let newAmount = prompt("Edit amount:", currentAmount);

                if (newAmount === null) return;

                newAmount = parseFloat(newAmount);
                if (isNaN(newAmount) || newAmount <= 0) {
                    alert("Invalid amount!");
                    return;
                }

                amountCell.textContent = newAmount;
                save();
                calculateTotal();
            }
        });

        // ======================
        // CALCULATE TOTAL
        // ======================
        function calculateTotal() {
            let total = 0;

            tableBody.querySelectorAll("tr").forEach(row => {
                const status = row.querySelector("td:nth-child(3) p").textContent.trim().toLowerCase();
                const rawAmount = row.querySelector(".amount").textContent.replace("$", "").trim();
                const amount = parseFloat(rawAmount) || 0;

                if (status === "loan") total -= amount;
                else total += amount;
            });

            totalElement.textContent = total + "$";

            totalElement.classList.remove("negative", "positive", "zero");
            if (total < 0) totalElement.classList.add("negative");
            else if (total > 0) totalElement.classList.add("positive");
            else totalElement.classList.add("zero");
        }

        // ======================
        // SAVE
        // ======================
        function save() {
            localStorage.setItem(storageKey, tableBody.innerHTML);
        }

        // ======================
        // REORDER BILL NUMBERS
        // ======================
        function reorderRows() {
            tableBody.querySelectorAll("tr").forEach((row, index) => {
                row.children[0].textContent = index + 1;
            });
        }


        
    }

    // SUPPLIER TABLE
    setupPaymentSystem(
        "payment-table",
        "pay-btn",
        "total-amount",
        "supplierPayments"
    );

    // CUSTOMER TABLE
    setupPaymentSystem(
        "payment-table-c",
        "pay-btn-c",
        "total-amount-c",
        "customerPayments"
    );

});

  


    const openDivVendor = document.querySelector(".openModal-vendor");
    const modalVendor = document.getElementById("modalOverlay-vendor");
    const xBtnVendor = document.getElementById("x-vendor");

    openDivVendor.addEventListener("click", () => {
      modalVendor.style.display = "flex";
    });

    xBtnVendor.addEventListener("click", () => {
      modalVendor.style.display = "none";
    });

    modalVendor.addEventListener("click", (e) => {
      if (e.target === modalVendor) {
        modalVendor.style.display = "none";
      }
    });




    const openDiv = document.querySelector(".openModal-product");
    const modal = document.getElementById("modalOverlay");
    const xBtn = document.getElementById("x");

    openDiv.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    xBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });


    const openDivCustomer = document.querySelector(".openModal-customer");
    const modalCustomer = document.getElementById("modalOverlay-customer");
    const xBtnCustomer = document.getElementById("x-customer");

    openDivCustomer.addEventListener("click", () => {
      modalCustomer.style.display = "flex";
    });

    xBtnCustomer.addEventListener("click", () => {
      modalCustomer.style.display = "none";
    });

    modalCustomer.addEventListener("click", (e) => {
      if (e.target === modalCustomer) {
        modalCustomer.style.display = "none";
      }
    });




    const openDivReport = document.querySelector(".openModal-sales-reports");
    const modalReport = document.getElementById("modalOverlay-reports");
    const xBtnReport = document.getElementById("x-reports");

    openDivReport.addEventListener("click", () => {
      modalReport.style.display = "flex";
    });

    xBtnReport.addEventListener("click", () => {
      modalReport.style.display = "none";
    });

    modalReport.addEventListener("click", (e) => {
      if (e.target === modalReport) {
        modalReport.style.display = "none";
      }
    });






    const openDivPayemnt = document.querySelector(".openModal-payments");
    const modalPayemnt = document.getElementById("modalOverlay-payments");
    const xBtnPayemnt = document.getElementById("x-payments");

    openDivPayemnt.addEventListener("click", () => {
      modalPayemnt.style.display = "flex";
    });

    xBtnPayemnt.addEventListener("click", () => {
      modalPayemnt.style.display = "none";
    });

    modalPayemnt.addEventListener("click", (e) => {
      if (e.target === modalPayemnt) {
        modalPayemnt.style.display = "none";
      }
    });



    const openDivchart = document.querySelector(".openModal-chart");
    const modalchart = document.getElementById("modalOverlay-chart");
    const xBtnchart = document.getElementById("x-chart");

    openDivchart.addEventListener("click", () => {
      modalchart.style.display = "flex";
    });

    xBtnchart.addEventListener("click", () => {
      modalchart.style.display = "none";
    });

    modalchart.addEventListener("click", (e) => {
      if (e.target === modalchart) {
        modalchart.style.display = "none";
      }
    });


    const openDivads = document.querySelector(".openModal-ads");
    const modalads = document.getElementById("modalOverlay-ads");
    const xBtnads = document.getElementById("x-ads");

    openDivads.addEventListener("click", () => {
      modalads.style.display = "flex";
    });

    xBtnads.addEventListener("click", () => {
      modalads.style.display = "none";
    });

    modalads.addEventListener("click", (e) => {
      if (e.target === modalads) {
        modalads.style.display = "none";
      }
    });





    const openDivsetting = document.querySelector(".openModal-setting");
    const modalsetting = document.getElementById("modalOverlay-setting");
    const xBtnsetting = document.getElementById("x-setting");

    openDivsetting.addEventListener("click", () => {
      modalsetting.style.display = "flex";
    });

    xBtnsetting.addEventListener("click", () => {
      modalsetting.style.display = "none";
    });

    modalsetting.addEventListener("click", (e) => {
      if (e.target === modalsetting) {
        modalsetting.style.display = "none";
      }
    });





    const openDivexpenses = document.querySelector(".openModal-expenses");
    const modalexpenses = document.getElementById("modalOverlay-expenses");
    const xBtnexpenses = document.getElementById("x-expenses");

    openDivexpenses.addEventListener("click", () => {
      modalexpenses.style.display = "flex";
    });

    xBtnexpenses.addEventListener("click", () => {
      modalexpenses.style.display = "none";
    });

    modalexpenses.addEventListener("click", (e) => {
      if (e.target === modalexpenses) {
        modalexpenses.style.display = "none";
      }
    });

    

    const openDivrecords = document.querySelector(".openModal-records");
    const modalrecords = document.getElementById("modalOverlay-records");
    const xBtnrecords = document.getElementById("x-records");

    openDivrecords.addEventListener("click", () => {
      modalrecords.style.display = "flex";
    });

    xBtnrecords.addEventListener("click", () => {
      modalrecords.style.display = "none";
    });

    modalrecords.addEventListener("click", (e) => {
      if (e.target === modalrecords) {
        modalrecords.style.display = "none";
      }
    });


    document.addEventListener("DOMContentLoaded", () => {
      const bestSellerContainer = document.querySelector(".best-seller-cards");

      let salesReports = JSON.parse(localStorage.getItem("salesReports")) || [];

      if (salesReports.length === 0) {
        bestSellerContainer.innerHTML = "<p>No sales yet</p>";
        return;
      }

      const productMap = {};

      salesReports.forEach(sale => {
        if (!productMap[sale.product]) {
          productMap[sale.product] = {
            name: sale.product,
            soldQty: 0,
            sellPrice: sale.sellPrice
          };
        }
        productMap[sale.product].soldQty += Number(sale.soldQty || 0);
      });

      const productsArray = Object.values(productMap).sort((a, b) => b.soldQty - a.soldQty);

      const topProducts = productsArray.slice(0, 5);

      bestSellerContainer.innerHTML = "";

      topProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="top">
                <span class="name">${product.name}</span>
                <span class="qty">Sold Qty: ${product.soldQty}</span>
            </div>
            <div class="profit">$${Number(product.sellPrice).toFixed(2)}</div>
        `;

        bestSellerContainer.appendChild(card);
      });
    });


    const globeIcon2 = document.getElementById("globeIcon2");
    const languageMenu = document.getElementById("languageMenu");

    globeIcon2.addEventListener("click", (e) => {
      e.stopPropagation();
      languageMenu.style.display = languageMenu.style.display === "block" ? "none" : "block";
    });

    languageMenu.querySelectorAll("p").forEach(p => {
      p.addEventListener("click", () => {
        // Trigger your existing changeLanguage function
        changeLanguage(p.dataset.lang);
        languageMenu.style.display = "none";
      });
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
      languageMenu.style.display = "none";
    });



    if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}


// SECURITY SETTINGS
document.querySelectorAll(".security-setting p").forEach(item => {
  item.addEventListener("click", () => {
    if (item.innerText.includes("Delete")) {
      const confirmDelete = confirm("Are you sure you want to delete your account?");
      if (confirmDelete) {
        alert("Account deleted (connect backend)");
      }
    } else {
      alert("Change password (open password modal)");
    }
  });
});

// COMPANY SETTINGS 
document.querySelectorAll(".company-setting p").forEach(item => {
  item.addEventListener("click", () => {
    if (item.innerText.trim() !== "") {
      alert(`Edit company field: ${item.innerText}`);
    }
  });
});

// HELP SETTINGS
document.querySelectorAll(".help-setting p").forEach(item => {
  item.addEventListener("click", () => {
    alert(`Open: ${item.innerText}`);
  });
});



