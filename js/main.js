if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const setupModal = (btnClass, modalId, xId) => {
        const btn = document.querySelector(btnClass);
        const modal = document.getElementById(modalId);
        const closeX = document.getElementById(xId);

        // This 'if' check prevents errors if an element is missing on a specific page
        if (btn && modal && closeX) {
            btn.addEventListener("click", () => modal.style.display = "flex");
            closeX.addEventListener("click", () => modal.style.display = "none");
            modal.addEventListener("click", (e) => {
                if (e.target === modal) modal.style.display = "none";
            });
        }
    };

    // List all your modals here
    setupModal(".openModal-vendor", "modalOverlay-vendor", "x-vendor");
    setupModal(".openModal-product", "modalOverlay", "x");
    setupModal(".openModal-customer", "modalOverlay-customer", "x-customer");
    setupModal(".openModal-sales-reports", "modalOverlay-reports", "x-reports");
    setupModal(".openModal-payments", "modalOverlay-payments", "x-payments");
    setupModal(".openModal-chart", "modalOverlay-chart", "x-chart");
    setupModal(".openModal-ads", "modalOverlay-ads", "x-ads");
    setupModal(".openModal-setting", "modalOverlay-setting", "x-setting");
    setupModal(".openModal-expenses", "modalOverlay-expenses", "x-expenses");
    setupModal(".openModal-records", "modalOverlay-records", "x-records");
    setupModal(".openModal-stock", "modalOverlay-stock", "x-stock");
    setupModal(".openModal-freight-cost", "modalOverlay-freight-cost", "x-freight-cost");
});


