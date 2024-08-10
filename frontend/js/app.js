document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", function() {
            window.location.href = "login.html";
        });
    } else {
        console.info("Element with id 'loginButton' not found.");
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

document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", function(event) {
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
            }).then(response => {
                if (response.ok) {
                    console.info("Comment added to the database successfully.");
                } else {
                    console.info("Failed to add comment to the database.");
                }
            }).catch(error => {
                console.info("Error occurred while adding comment to the database:", error);
            });
        });
    } else {
        console.info("Element with id 'commentForm' not found.");
    }
});

function openWhatsApp() {
    const phoneNumber = "14155238886";
    const message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב בפריז לחופשה הקרובה שלי.";
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}