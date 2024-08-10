document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "NIRO8799!") {
                window.location.href = "dashboard.html"; // Replace with the actual dashboard page
            } else {
                const errorMessage = document.getElementById("errorMessage");
                if (errorMessage) {
                    errorMessage.textContent = "שם משתמש או סיסמה שגויים.";
                } else {
                    console.info("Element with id 'errorMessage' not found.");
                }
            }
        });
    } else {
        console.info("Element with id 'loginForm' not found.");
    }
});