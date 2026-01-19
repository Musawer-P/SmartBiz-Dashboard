let documents = JSON.parse(localStorage.getItem("documents")) || [];

function uploadDocument() {
  const fileInput = document.getElementById("fileInput");
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;

  if (!fileInput.files.length) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];

  const doc = {
    id: Date.now(),
    name: file.name,
    category,
    note,
    date: new Date().toLocaleDateString()
  };

  documents.push(doc);
  localStorage.setItem("documents", JSON.stringify(documents));

  fileInput.value = "";
  document.getElementById("note").value = "";

  renderDocuments();
}

function deleteDocument(id) {
  documents = documents.filter(doc => doc.id !== id);
  localStorage.setItem("documents", JSON.stringify(documents));
  renderDocuments();
}

function renderDocuments() {
  const search = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("documentList");
  list.innerHTML = "";

  documents
    .filter(doc => doc.name.toLowerCase().includes(search))
    .forEach(doc => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${doc.name}</td>
        <td>${doc.category}</td>
        <td>${doc.date}</td>
        <td>
          <button onclick="deleteDocument(${doc.id})">Delete</button>
        </td>
      `;

      list.appendChild(row);
    });
}

renderDocuments();
