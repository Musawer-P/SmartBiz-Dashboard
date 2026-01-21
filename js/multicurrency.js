//SMARTBIZ MULTI-CURRENCY SCRIPT

// Base currency
let baseCurrency = "USD";

// Exchange rates (example – you can update or fetch from API later)
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AFN: 72.5,
  PKR: 278,
  INR: 83,
};

// Currency symbols
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AFN: "؋",
  PKR: "₨",
  INR: "₹",
};

// Current selected currency
let currentCurrency = localStorage.getItem("currency") || "USD";


//SET CURRENCY

function setCurrency(currency) {
  if (!exchangeRates[currency]) return;

  currentCurrency = currency;
  localStorage.setItem("currency", currency);

  updateAllCurrencyValues();
}

//CONVERT AMOUNT

function convertAmount(amount) {
  const converted =
    (amount / exchangeRates[baseCurrency]) *
    exchangeRates[currentCurrency];

  return converted.toFixed(2);
}

//FORMAT CURRENCY

function formatCurrency(amount) {
  return `${currencySymbols[currentCurrency]} ${convertAmount(amount)}`;
}

//UPDATE ALL DASHBOARD VALUES

function updateAllCurrencyValues() {
  document.querySelectorAll("[data-amount]").forEach((el) => {
    const originalAmount = parseFloat(el.getAttribute("data-amount"));
    el.innerText = formatCurrency(originalAmount);
  });
}

//ON PAGE LOAD

document.addEventListener("DOMContentLoaded", () => {
  updateAllCurrencyValues();
});

