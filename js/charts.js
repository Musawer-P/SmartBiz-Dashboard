// dashboard-charts.js
const DashboardCharts = (() => {
    let chartInstances = {};

    const init = () => {
        updateCharts();
        // Listen for data changes from other scripts
        window.addEventListener('storage', (e) => {
            if (e.key === 'salesReports') updateCharts();
        });
        
        // Listen for internal app updates (if you trigger custom events)
        window.addEventListener('salesUpdated', updateCharts);
    };

    const updateCharts = () => {
        const rawData = localStorage.getItem('salesReports');
        const sales = JSON.parse(rawData) || [];
        
        // Group by Date
        const grouped = {};
        sales.forEach(s => {
            const date = new Date(s.timestamp).toLocaleDateString();
            if (!grouped[date]) grouped[date] = { sales: 0, profit: 0 };
            grouped[date].sales += (Number(s.soldQty) * Number(s.sellPrice));
            grouped[date].profit += Number(s.profit || 0);
        });

        const labels = Object.keys(grouped);
        const salesData = labels.map(d => grouped[d].sales);
        const profitData = labels.map(d => grouped[d].profit);

        render('lineChart', 'line', 'Daily Sales ($)', labels, salesData, '#4e73df');
        render('barChart', 'bar', 'Daily Profit ($)', labels, profitData, '#1cc88a');
    };

       const render = (id, type, label, labels, data, color) => {
        const canvas = document.getElementById(id);
        if (!canvas) return;

        canvas.parentElement.style.height = "300px";

        if (chartInstances[id]) chartInstances[id].destroy();

        chartInstances[id] = new Chart(canvas, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color + '33',
                    borderColor: color,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' } // Makes "Daily Sales" text white
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Faint white lines
                        ticks: { color: '#ffffff' } // White numbers on Y axis
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Faint white lines
                        ticks: { color: '#ffffff' } // White dates on X axis
                    }
                }
            }
        });
    };

    // Run on page load
    document.addEventListener('DOMContentLoaded', init);

    return { refresh: updateCharts };
})();
