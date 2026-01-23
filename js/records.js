
//RECORD TYPES & STORAGE

const RECORDS = {
  products: "records_products",
  suppliers: "records_suppliers",
  customers: "records_customers",
  ads: "records_ads"
};
//CORE HELPERS

function getRecords(type) {
  return JSON.parse(localStorage.getItem(RECORDS[type])) || [];
}

function setRecords(type, data) {
  localStorage.setItem(RECORDS[type], JSON.stringify(data));
}

function newID(list) {
  return list.length ? list[list.length - 1].id + 1 : 1;
}

function today() {
  return new Date().toISOString().split("T")[0];
}

//ONE UNIVERSAL SAVE FUNCTION
function saveRecord(type, data) {
  if (!RECORDS[type]) {
    console.error("Invalid record type:", type);
    return;
  }

  const records = getRecords(type);

  records.push({
    id: newID(records),
    ...data,
    date: today()
  });

  setRecords(type, records);
}

//RECORDS PAGE RENDER

function renderRecords(type) {
  const tbody = document.querySelector(`#${type} tbody`);
  if (!tbody) return;

  tbody.innerHTML = "";

  getRecords(type).forEach(item => {
    const tr = document.createElement("tr");

    switch (type) {
      case "products":
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.stock}</td>
          <td>${item.date}</td>
        `;
        break;

      case "suppliers":
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${item.company}</td>
          <td>${item.date}</td>
        `;
        break;

      case "customers":
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
          <td>${item.date}</td>
        `;
        break;

      case "ads":
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.platform}</td>
          <td>${item.budget}</td>
          <td>${item.date}</td>
        `;
        break;
    }

    tbody.appendChild(tr);
  });
}
//AUTO LOAD RECORDS PAGE

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(RECORDS).forEach(renderRecords);
});

//TAB SWITCHING

document.addEventListener("click", e => {
  if (!e.target.classList.contains("tab")) return;

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  e.target.classList.add("active");

  document.querySelectorAll("table").forEach(t => t.classList.add("hidden"));
  document.getElementById(e.target.dataset.type)?.classList.remove("hidden");
});
