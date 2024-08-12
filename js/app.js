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

function trackWhatsAppClick(destination) {
    gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': destination,
        'value': 1
    });
}

function openWhatsApp(destination) {
    // trackWhatsAppClick(destination);
    const phoneNumber = "14155238886";
    var message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב ב{} לחופשה הקרובה שלי.";
    message = message.replace("{}", destination);
    const encodedMessage = encodeURIComponent(message);

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Construct the WhatsApp URL based on the device type
    const whatsappURL = isMobile 
        ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappURL, '_blank');
}


function openWhatsApp(destination) {
    const phoneNumber = "14155238886";
    var message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב ב{} לחופשה הקרובה שלי.";
    message = message.replace("{}", destination);
    const encodedMessage = encodeURIComponent(message);

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Construct the WhatsApp URL based on the device type
    const whatsappURL = isMobile 
        ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappURL, '_blank');
}

function changeLanguage(lang) {
    const html = document.documentElement;

    if (lang === 'en') {
        html.setAttribute('lang', 'en');
        html.classList.remove('rtl');
        html.classList.add('ltr');
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/he/', '/en/').replace('_he', '_en');
        if (newPath === '/') {
            window.location.href = "/en/index_en.html";
        } else {
            window.location.href = newPath;
        }
    } else if (lang === 'he') {
        html.setAttribute('lang', 'he');
        html.classList.remove('ltr');
        html.classList.add('rtl');
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/en/', '/he/').replace('_en', '_he');
        if (newPath === '/') {
            window.location.href = "/he/index_he.html";
        } else {
            window.location.href = newPath;
        }
    }
}


function goHome() {
    const currentPath = window.location.pathname;
    // go to the home page without the language prefix
      window.location.href = window.location.origin;
}

// function changeLanguage(lang) {
//     const currentPath = window.location.pathname;
//     const newPath = currentPath.replace(/(en|he)/, lang);
//     window.location.href = newPath;
// }
