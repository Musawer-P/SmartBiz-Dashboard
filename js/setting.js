document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("settingsForm");
    const statusMsg = document.getElementById("status-msg");

    // Load existing data on startup
    const savedData = JSON.parse(localStorage.getItem("smartbiz_settings")) || {
        compName: "Tusqa",
        compEmail: "contact@tusqa.com",
        compAddress: "Madina",
        currency: "USD",
        fullName: "Mike",
        username: "admin", // Default
        password: "123"    // Default
    };

    // Fill inputs with saved data
    document.getElementById("comp-name").value = savedData.compName;
    document.getElementById("comp-email").value = savedData.compEmail;
    document.getElementById("comp-address").value = savedData.compAddress;
    document.getElementById("currency").value = savedData.currency;
    document.getElementById("user-fullname").value = savedData.fullName;
    document.getElementById("set-username").value = savedData.username;
    document.getElementById("set-password").value = savedData.password;

    // 2. Save Data
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedData = {
            compName: document.getElementById("comp-name").value,
            compEmail: document.getElementById("comp-email").value,
            compAddress: document.getElementById("comp-address").value,
            currency: document.getElementById("currency").value,
            fullName: document.getElementById("user-fullname").value,
            username: document.getElementById("set-username").value,
            password: document.getElementById("set-password").value
        };

        localStorage.setItem("smartbiz_settings", JSON.stringify(updatedData));
        
        statusMsg.innerText = "Settings Saved!";
        statusMsg.style.color = "green";

        setTimeout(() => { statusMsg.innerText = ""; }, 3000);
    });

    // Close Modal Logic
    document.getElementById("x-setting").onclick = () => {
        document.getElementById("modalOverlay-setting").style.display = "none";
    };
});
