const ModalChart = (() => {
    let modalChartInstance = null;

    const update = () => {
        const startDate = document.getElementById('modal-start-date').value;
        const endDate = document.getElementById('modal-end-date').value;
        
        const rawData = localStorage.getItem('salesReports');
        const sales = JSON.parse(rawData) || [];

        // 1. Filter data based on input dates
        const filteredSales = sales.filter(item => {
            const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
            const start = startDate || '1900-01-01';
            const end = endDate || '2100-12-31';
            return itemDate >= start && itemDate <= end;
        });

        // 2. Group filtered data by date
        const grouped = {};
        filteredSales.forEach(s => {
            const date = new Date(s.timestamp).toLocaleDateString();
            if (!grouped[date]) grouped[date] = 0;
            grouped[date] += (Number(s.soldQty) * Number(s.sellPrice));
        });

        const labels = Object.keys(grouped);
        const data = Object.values(grouped);

        render(labels, data);
    };

   const render = (labels, data) => {
    const ctx = document.getElementById('modalSalesChart').getContext('2d');
    
    if (modalChartInstance) modalChartInstance.destroy();

    modalChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Selected Range Sales ($)',
                data: data,
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.3)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#ffffff' } // White legend text
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Faint white grid
                    ticks: { color: '#ffffff' } // White numbers
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Faint white grid
                    ticks: { color: '#ffffff' } // White dates
                }
            }
        }
    });
};

    return { update };
})();

// Initialize empty or with full data on load
document.addEventListener('DOMContentLoaded', () => ModalChart.update());
