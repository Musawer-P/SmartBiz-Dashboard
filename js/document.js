// Initial load
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    
    // Add listeners to date inputs to filter automatically when they change
    document.getElementById('from').addEventListener('change', renderTable);
    document.getElementById('to').addEventListener('change', renderTable);
});

let editingId = null;

// --- CREATE ---
async function addDocument() {
    const name = document.getElementById('doc-name').value;
    const description = document.getElementById('doc-description').value;
    const fileInput = document.getElementById('doc-file');
    
    if (!name) return alert("Please enter a name");

    let fileData = "No file";
    if (fileInput.files.length > 0) {
        fileData = await toBase64(fileInput.files[0]);
    }

    const newDoc = {
        id: Date.now(),
        name: name,
        description: description,
        file: fileData,
        date: new Date().toISOString()
    };

    const docs = JSON.parse(localStorage.getItem('documents') || '[]');
    docs.push(newDoc);
    localStorage.setItem('documents', JSON.stringify(docs));
    
    // Clear inputs
    document.getElementById('doc-name').value = '';
    document.getElementById('doc-description').value = '';
    fileInput.value = '';
    
    renderTable();
}

// --- READ / FILTER ---
function renderTable() {
    const tableBody = document.getElementById('documentsTable');
    const fromDate = document.getElementById('from').value;
    const toDate = document.getElementById('to').value;
    
    let docs = JSON.parse(localStorage.getItem('documents') || '[]');

    // Filter by Date Range if dates are selected
    if (fromDate || toDate) {
        docs = docs.filter(doc => {
            const docTime = new Date(doc.date).getTime();
            const start = fromDate ? new Date(fromDate).getTime() : 0;
            const end = toDate ? new Date(toDate).getTime() : Infinity;
            return docTime >= start && docTime <= end;
        });
    }

    tableBody.innerHTML = '';

    docs.forEach((doc, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${doc.name}</td>
                <td>${doc.description}</td>
                <td>${doc.file !== "No file" ? `<a href="${doc.file}" download="file">Download</a>` : 'None'}</td>
                <td>${new Date(doc.date).toLocaleString()}</td>
                <td>
                    <button onclick="openEditModal(${doc.id})" id = "edit-btn">Edit</button>
                    <button onclick="deleteDoc(${doc.id})" id = "delete-btn">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
// --- UPDATE (Using Browser Prompts) ---
function openEditModal(id) {
    let docs = JSON.parse(localStorage.getItem('documents') || '[]');
    const index = docs.findIndex(d => d.id === id);

    if (index !== -1) {
        const d = docs[index];

        // Browser prompt popups
        const newName = prompt("Edit Document Name:", d.name);
        const newDesc = prompt("Edit Description:", d.description);
        const newDate = prompt("Edit Date (YYYY-MM-DDTHH:MM):", d.date);

        // If the user didn't click 'Cancel'
        if (newName !== null && newDesc !== null) {
            docs[index] = {
                ...d,
                name: newName,
                description: newDesc,
                date: newDate || d.date
            };

            localStorage.setItem('documents', JSON.stringify(docs));
            renderTable();
        }
    }
}

// --- DELETE ---
function deleteDoc(id) {
    if (confirm("Are you sure you want to delete this document?")) {
        let docs = JSON.parse(localStorage.getItem('documents') || '[]');
        docs = docs.filter(doc => doc.id !== id);
        localStorage.setItem('documents', JSON.stringify(docs));
        renderTable();
    }
}

// --- REAL-TIME FILTERING ---
// Use 'input' instead of 'change' for instant results as you type/select
document.getElementById('from').addEventListener('input', renderTable);
document.getElementById('to').addEventListener('input', renderTable);
