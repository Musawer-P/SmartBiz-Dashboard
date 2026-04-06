function renderTodaySales() {
  const tbody = document.getElementById("today-sales-body");
  if (!tbody) return;

  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  let todaySales = JSON.parse(localStorage.getItem("todaySales")) || [];
  
  // 1. Filter: Keep only sales from the last 24 hours
  todaySales = todaySales.filter(sale => {
    const saleTime = typeof sale.timestamp === "string" ? new Date(sale.timestamp).getTime() : sale.timestamp;
    return (now - saleTime < twentyFourHours) && !isNaN(saleTime);
  });

  // Save filtered list back to storage
  localStorage.setItem("todaySales", JSON.stringify(todaySales));

  tbody.innerHTML = "";

  if (todaySales.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;">No sales in the last 24 hours.</td></tr>`;
    return;
  }

  // 2. Render Rows (Matches your requested columns)
  todaySales.forEach((sale, index) => {
    const row = document.createElement("tr");

    // Math safety
    const mainP = Number(sale.mainPrice || 0);
    const sellP = Number(sale.sellPrice || 0);
    const prof = Number(sale.profit || 0);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sale.product}</td>
      <td>${sale.stockQty || 0}</td>
      <td>${sale.soldQty}</td>
      <td>$${mainP.toFixed(2)}</td>
      <td>$${sellP.toFixed(2)}</td>
      <td>$${prof.toFixed(2)}</td>
      <td>${new Date(sale.timestamp).toLocaleDateString()} ${new Date(sale.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", renderTodaySales);




const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");

const input = document.getElementById("searchInput");
const matchCount = document.getElementById("matchCount");

const content = document.getElementById("mainContent");

let matches = [];
let currentIndex = 0;


// OPEN SEARCH
searchIcon.addEventListener("click", () => {

    searchBox.classList.add("active");

    searchIcon.style.display = "none";

    input.focus();

});


// CLOSE SEARCH
closeSearch.addEventListener("click", () => {

    clearHighlights();

    searchBox.classList.remove("active");

    setTimeout(() => {

        searchIcon.style.display = "block";

        input.value = "";

        matchCount.textContent = "0/0";

    }, 300);

});


// SEARCH INPUT
input.addEventListener("input", () => {

    highlightText(input.value);

});


// ENTER KEY → NEXT MATCH
input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        nextMatch();

    }

});



// HIGHLIGHT TEXT
function highlightText(keyword) {

    clearHighlights();

    if (!keyword) return;

    const regex = new RegExp(keyword, "gi");

    walkNodes(content);

    matches = document.querySelectorAll(".highlight");

    if (matches.length > 0) {

        currentIndex = 0;

        setActiveMatch();

    }

}



// WALK THROUGH TEXT NODES
function walkNodes(node) {

    if (node.nodeType === 3) {

        const text = node.nodeValue;

        const keyword = input.value;

        const regex = new RegExp(keyword, "gi");

        if (regex.test(text)) {

            const span = document.createElement("span");

            span.innerHTML =
                text.replace(regex,
                    match =>
                    `<span class="highlight">${match}</span>`
                );

            node.replaceWith(span);

        }

    }

    else if (
        node.nodeType === 1 &&
        node.childNodes &&
        !["SCRIPT","STYLE","INPUT"].includes(node.tagName)
    ) {

        node.childNodes.forEach(child =>
            walkNodes(child)
        );

    }

}



// CLEAR HIGHLIGHTS
function clearHighlights() {

    document
        .querySelectorAll(".highlight")
        .forEach(span => {

            span.outerHTML = span.innerHTML;

        });

    matches = [];

    currentIndex = 0;

}



// NEXT MATCH
function nextMatch() {

    if (matches.length === 0) return;

    currentIndex++;

    if (currentIndex >= matches.length) {

        currentIndex = 0;

    }

    setActiveMatch();

}



// SET ACTIVE MATCH
function setActiveMatch() {

    matches.forEach(el =>
        el.classList.remove("active")
    );

    const active = matches[currentIndex];

    active.classList.add("active");

    active.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

    updateCounter();

}



// UPDATE COUNTER
function updateCounter() {

    if (matches.length === 0) {

        matchCount.textContent = "0/0";

    }

    else {

        matchCount.textContent =
            `${currentIndex + 1}/${matches.length}`;

    }

}



const profileImg = document.getElementById('profile-img');
const profileUpload = document.getElementById('profile-upload');

// 1. Load saved image on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        profileImg.src = savedImage;
    }
});

// 2. Open file picker on double click
profileImg.addEventListener('dblclick', () => {
    profileUpload.click();
});

// 3. Handle the new image selection
profileUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const base64Image = e.target.result;
            
            // Update the image on the screen
            profileImg.src = base64Image;
            
            // Save to localStorage so it stays after refresh
            localStorage.setItem('userProfileImage', base64Image);
        };

        reader.readAsDataURL(file);
    }
});
