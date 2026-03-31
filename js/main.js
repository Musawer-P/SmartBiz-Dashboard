document.addEventListener("DOMContentLoaded", () => {
  const globe = document.getElementById("globeIcon2");
  const menu = document.getElementById("languageMenu");

  // Default language
  let currentLang = localStorage.getItem("lang") || "en";

  // Apply translations
  const applyTranslations = (lang) => {
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.dataset.key;

      if (translations[lang] && translations[lang][key]) {
        const icon = el.querySelector("i");

        if (icon && icon.nextSibling) {
          // Replace text only after icon
          icon.nextSibling.textContent = " " + translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    // RTL for Persian & Arabic
    if (lang === "ar" || lang === "fa") {
      document.body.style.direction = "rtl";
    } else {
      document.body.style.direction = "ltr";
    }
  };

  // Run on page load
  applyTranslations(currentLang);

  // Toggle dropdown
  globe.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Select language
  menu.querySelectorAll("p").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      localStorage.setItem("lang", lang);
      applyTranslations(lang);
      menu.style.display = "none";
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", e => {
    if (!e.target.closest(".language-dropdown")) menu.style.display = "none";
  });
});

if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}document.addEventListener("DOMContentLoaded", () => {
    const setupModal = (btnClass, modalId, xId) => {
        const buttons = document.querySelectorAll(btnClass); // all matching buttons
        const modal = document.getElementById(modalId);
        const closeX = document.getElementById(xId);

        if (buttons.length && modal && closeX) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => modal.style.display = "flex");
            });

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

