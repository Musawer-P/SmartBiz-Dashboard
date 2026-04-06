/**
 * NOTIFICATION.JS
 * Simple sales notification system
 */

const notificationCenter = document.querySelector(".notification-center");
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// Render notifications
function renderNotifications() {
    if (!notificationCenter) return;
    notificationCenter.innerHTML = "";

    notifications.forEach((note, i) => {
        const div = document.createElement("div");
        div.className = "notification-item";
        div.innerHTML = `
            <span>${note}</span>
            <button class="clear-btn" data-index="${i}">×</button>
        `;
        notificationCenter.appendChild(div);
    });

    if (notifications.length > 0) {
        const clearAllBtn = document.createElement("button");
        clearAllBtn.className = "clear-all-btn";
        clearAllBtn.textContent = "Clear All";
        notificationCenter.appendChild(clearAllBtn);

        clearAllBtn.addEventListener("click", () => {
            notifications = [];
            localStorage.setItem("notifications", JSON.stringify(notifications));
            renderNotifications();
        });
    }
}

// Add a notification
function addNotification(message) {
    notifications.push(message);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    renderNotifications();
}

// Handle single notification clear
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-btn")) {
        const idx = parseInt(e.target.dataset.index);
        notifications.splice(idx, 1);
        localStorage.setItem("notifications", JSON.stringify(notifications));
        renderNotifications();
    }
});

// Initial render
renderNotifications();