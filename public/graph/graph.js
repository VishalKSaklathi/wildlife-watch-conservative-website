const ctx = document.getElementById('wildlifeChart').getContext('2d');
const wildlifeChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'bar', 'pie', etc.
    data: {
        labels: ['Tiger', 'Elephant', 'Panther', 'Bear', 'Wild bear', 'Deer', 'Bison', 'Sambar', 'Fox'],
        datasets: [
            {
                label: 'Population',
                data: [395, 6185, 817, 2324, 15760, 25850, 8484, 4998, 957],
                borderColor: 'rgba(84, 153, 199, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            },
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Animals'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Population'
                }
            }
        }
    }
});

const ctx2 = document.getElementById('wildlifeChart2').getContext('2d');
const wildlifeChart2 = new Chart(ctx2, {
    type: 'pie', // You can change this to 'bar', 'pie', etc.
    data: {
        labels: ['Tiger', 'Black panther ', 'Dhole (Wild Dog)', 'Gaur', 'Deer', 'Arboreal Mammals ', 'Birds(Speies)', 'Reptiles(Species)'],
        datasets: [
            {
                label: 'Population',
                data: [40, 10, 55, 130, 300, 150, 200, 50],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(99, 255, 132, 1)',
                    'rgba(132, 99, 255, 1)'
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(99, 255, 132, 0.2)',
                    'rgba(132, 99, 255, 0.2)'
                ],
                fill: true
            },
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Animals'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Population'
                }
            }
        }
    }
});
