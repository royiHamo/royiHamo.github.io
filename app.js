document.getElementById("loginButton").addEventListener("click", function() {
    window.location.href = "login.html";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "NIRO8799!") {
        window.location.href = "dashboard.html"; // Replace with the actual dashboard page
    } else {
        document.getElementById("errorMessage").textContent = "שם משתמש או סיסמה שגויים.";
    }
});

//on first page load use api/comments to get all the comments from the db bototel.db in backend folder
fetch("http://localhost:3000/api/comments")
    .then(response => response.json())
    .then(comments => {
        const commentList = document.getElementById("comment-list");
        comments.forEach(comment => {
            const commentElement = document.createElement("li");
            commentElement.textContent = comment.comment;
            commentList.appendChild(commentElement);
        });
    });

// write the submit logic of commentForm, insert every comment to the db bototel.db in backend folder
document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const comment = document.getElementById("comment").value;
    const commentList = document.getElementById("comment-list");

    const commentElement = document.createElement("li");
    commentElement.textContent = comment;
    commentList.appendChild(commentElement);

    // Insert the comment to the database
    fetch("http://localhost:3000/api/add_comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment })
    });
});

function openWhatsApp() {
    const phoneNumber = "14155238886";
    const message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב בפריז לחופשה הקרובה שלי.";
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}