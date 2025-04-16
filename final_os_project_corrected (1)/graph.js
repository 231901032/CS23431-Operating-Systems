
const ctx = document.getElementById('osChart').getContext('2d');
const popup = document.getElementById('osPopup');
const conceptData = {
    labels: ['Startup', 'URL Check', 'File Access', 'Logging', 'Response'],
    datasets: [{
        label: 'OS Concepts Activity',
        data: [2, 5, 3, 4, 3],
        borderColor: 'blue',
        fill: false
    }]
};
const chart = new Chart(ctx, {
    type: 'line',
    data: conceptData,
    options: {
        onClick: (e) => {
            const activePoints = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
            if (activePoints.length) {
                const index = activePoints[0].index;
                const label = conceptData.labels[index];
                const messages = {
                    'Startup': 'OS loads essential modules.',
                    'URL Check': 'Network stack and DNS involved.',
                    'File Access': 'Accessing local phishing feed file.',
                    'Logging': 'Writing result to log.txt.',
                    'Response': 'Generating JSON and returning via Flask.'
                };
                popup.textContent = messages[label];
                popup.style.display = 'block';
                setTimeout(() => popup.style.display = 'none', 3000);
            }
        }
    }
});
