let editRow = null;

const submitBtn = document.getElementById("submitBtn-vendor");

submitBtn.addEventListener("click", function () {
    const campaignName = document.getElementById("campaign-name").value;
    const platform = document.getElementById("platform").value;
    const startDate = document.getElementById("start-date").value;
    const budget = document.getElementById("budget").value;
    const period = document.getElementById("period").value;
    const endDate = document.getElementById("end-date").value;

    if (!campaignName || !platform || !budget) {
        alert("Please fill required fields");
        return;
    }

    const table = document.getElementById("ads-table").querySelector("tbody");

    // EDIT MODE
    if (editRow) {
        editRow.cells[0].innerText = campaignName;
        editRow.cells[1].innerText = platform;
        editRow.cells[2].innerText = budget;
        editRow.cells[3].innerText = period;
        editRow.cells[4].innerText = startDate;
        editRow.cells[5].innerText = endDate;

        editRow = null;
        submitBtn.innerText = "Submit";
    } 
    // ADD MODE
    else {
        const row = table.insertRow();

        row.innerHTML = `
            <td>${campaignName}</td>
            <td>${platform}</td>
            <td>${budget}</td>
            <td>${period}</td>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
    }

    clearInputs();
});

// CLEAR INPUTS
function clearInputs() {
    document.getElementById("campaign-name").value = "";
    document.getElementById("platform").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("budget").value = "";
    document.getElementById("period").value = "";
    document.getElementById("end-date").value = "";
}

// TABLE ACTIONS (Edit / Delete)
document.getElementById("ads-table").addEventListener("click", function (e) {
    const target = e.target;
    const row = target.closest("tr");

    // DELETE
    if (target.classList.contains("delete-btn")) {
        row.remove();
    }

    // EDIT
    if (target.classList.contains("edit-btn")) {
        document.getElementById("campaign-name").value = row.cells[0].innerText;
        document.getElementById("platform").value = row.cells[1].innerText;
        document.getElementById("budget").value = row.cells[2].innerText;
        document.getElementById("period").value = row.cells[3].innerText;
        document.getElementById("start-date").value = row.cells[4].innerText;
        document.getElementById("end-date").value = row.cells[5].innerText;

        editRow = row;
        submitBtn.innerText = "Update";
    }
});
