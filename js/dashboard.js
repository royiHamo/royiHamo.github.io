document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(data => {
            populateUsersTable(data);
            createUserStatesChart(data);
        });
});

function populateUsersTable(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.phone_number}</td>
            <td>${user.name}</td>
            <td>${user.state}</td>
            <td>${JSON.stringify(user.data)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function createUserStatesChart(users) {
    const states = {};
    users.forEach(user => {
        states[user.state] = (states[user.state] || 0) + 1;
    });

    const ctx = document.getElementById('userStatesChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(states),
            datasets: [{
                data: Object.values(states),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'User States Distribution'
            }
        }
    });
}
