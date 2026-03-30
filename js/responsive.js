const menuToggle = document.getElementById('menuToggle');
const menuIcon = menuToggle.querySelector('i');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    // 1. Open/Close Sidebar
    sidebar.classList.toggle('active');

    // 2. Swap Icon: bars <-> times (X)
    if (sidebar.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});
