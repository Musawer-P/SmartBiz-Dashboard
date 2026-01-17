// SmartBiz Notifications System

// Storage key
const NOTIF_KEY = "smartbiz_notifications";

// Get notifications from localStorage
function getNotifications() {
  return JSON.parse(localStorage.getItem(NOTIF_KEY)) || [];
}

// Save notifications to localStorage
function saveNotifications(notifications) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
}

// Add a new notification
function addNotification(message, type = "info") {
  const notifications = getNotifications();

  const newNotification = {
    id: Date.now(),
    message,
    type, // info | success | warning | error
    read: false,
    time: new Date().toLocaleString()
  };

  notifications.unshift(newNotification);
  saveNotifications(notifications);
  renderNotifications();
}

// Mark notification as read
function markAsRead(id) {
  const notifications = getNotifications().map(n =>
    n.id === id ? { ...n, read: true } : n
  );

  saveNotifications(notifications);
  renderNotifications();
}

// Mark all as read
function markAllAsRead() {
  const notifications = getNotifications().map(n => ({
    ...n,
    read: true
  }));

  saveNotifications(notifications);
  renderNotifications();
}

// Get unread count
function getUnreadCount() {
  return getNotifications().filter(n => !n.read).length;
}

// Render notifications in UI
function renderNotifications() {
  const container = document.getElementById("notificationList");
  const badge = document.getElementById("notificationCount");

  if (!container) return;

  const notifications = getNotifications();
  container.innerHTML = "";

  notifications.forEach(n => {
    const item = document.createElement("div");
    item.className = `notification-item ${n.read ? "read" : "unread"} ${n.type}`;

    item.innerHTML = `
      <p>${n.message}</p>
      <small>${n.time}</small>
      ${!n.read ? `<button onclick="markAsRead(${n.id})">Mark as read</button>` : ""}
    `;

    container.appendChild(item);
  });

  if (badge) {
    badge.textContent = getUnreadCount();
    badge.style.display = getUnreadCount() > 0 ? "inline-block" : "none";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  renderNotifications();

  // Example demo notifications
  if (getNotifications().length === 0) {
    addNotification("Welcome to SmartBiz Dashboard", "success");
    addNotification("New payment received", "info");
    addNotification("Low stock warning", "warning");
  }
});