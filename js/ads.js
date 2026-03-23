const submitBtn = document.getElementById('submitBtn-ads');
const adsTableBody = document.querySelector('#ads-table tbody');

let adsData = JSON.parse(localStorage.getItem('adsData')) || [];
let editIndex = null;

// 1. Handle Form Submission
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('campaign-name').value;
        const platform = document.getElementById('platform').value;

        if (!name || !platform) {
            alert("Please fill in the Campaign Name and Platform");
            return;
        }

        const newData = {
            name: name,
            platform: platform,
            start: document.getElementById('start-date').value,
            budget: document.getElementById('budget').value,
            period: document.getElementById('period').value,
            end: document.getElementById('end-date').value,
            status: "Active" 
        };

        if (editIndex !== null) {
            newData.status = adsData[editIndex].status || "Active";
            adsData[editIndex] = newData;
            editIndex = null;
            submitBtn.innerText = "Submit";
        } else {
            adsData.push(newData);
        }

        saveAndRender();
        clearInputs();
    });
}

// 2. Cycle Status
window.toggleStatus = (index) => {
    const current = adsData[index].status || "Active";
    let next;
    if (current === "Active") next = "Stopped";
    else if (current === "Stopped") next = "Waiting";
    else next = "Active";

    adsData[index].status = next;
    saveAndRender();
};

// 3. Save and Render
function saveAndRender() {
    localStorage.setItem('adsData', JSON.stringify(adsData));
    renderTable();
}

// 4. Draw Table (Fixed with safety checks)
function renderTable() {
    // If this console log says "null", your HTML <tbody> is missing or the ID is wrong
    console.log("Table Body Found:", adsTableBody); 
    
    if (!adsTableBody) return;
    adsTableBody.innerHTML = '';

    adsData.forEach((ad, index) => {
        // Safety: If old data has no status, default to Active
        const currentStatus = ad.status || "Active";
        const statusClass = currentStatus.toLowerCase();
        
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${ad.name}</td>
                <td>${ad.platform}</td>
                <td>${ad.start}</td>
                <td>${ad.budget}</td>
                <td>${ad.period}</td>
                <td>${ad.end}</td>
                <td>
                    <span class="status-btn ${statusClass}" onclick="toggleStatus(${index})" style="cursor:pointer; padding:5px; border-radius:4px;">
                        ${currentStatus}
                    </span>
                </td>
                <td>
                    <button onclick="editAd(${index})" id = "edit-ads">Edit</button>
                    <button onclick="deleteAd(${index})" id = "delete-ads">Delete</button>
                </td>
            </tr>
        `;
        adsTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// 5. Action Functions
window.deleteAd = (index) => {
    if (confirm("Delete this record?")) {
        adsData.splice(index, 1);
        saveAndRender();
    }
};

window.editAd = (index) => {
    const ad = adsData[index];
    document.getElementById('campaign-name').value = ad.name;
    document.getElementById('platform').value = ad.platform;
    document.getElementById('start-date').value = ad.start;
    document.getElementById('budget').value = ad.budget;
    document.getElementById('period').value = ad.period;
    document.getElementById('end-date').value = ad.end;
    
    editIndex = index;
    submitBtn.innerText = "Update Ad";
};

function clearInputs() {
    document.querySelectorAll('.ads-input-div input').forEach(input => input.value = '');
}

// Initial Run
renderTable();
