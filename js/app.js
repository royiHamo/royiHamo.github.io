document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Hardcoded credentials
    const adminUsername = 'admin';
    const adminPassword = 'NIRO8799!';

    if (username === adminUsername && password === adminPassword) {
        window.location.href = 'dashboard.html'; // Redirect to dashboard page
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
