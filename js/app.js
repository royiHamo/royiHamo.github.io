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
    var message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב ב{} לחופשה הקרובה שלי.";
    if (destination === 'main') {
        message = "Hi, I heard you are the best in hotel booking ;), I would like to start a booking"
    } else if (destination === 'ראשי') {
        message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אשמח להתחיל בהזמנה"
    } else {
        message = "היי, שמעתי שאתם הכי טובים בהזמנת מלונות ;), אני מעוניין במלון הכי טוב ב{} לחופשה הקרובה שלי.";
        message = message.replace("{}", destination);
    }
    
    const phoneNumber = "14155238886";
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
        if (newPath === '/' || newPath === '/index.html') {
            window.location.href = "/en/index_en.html";
        } else {
            window.location.href = newPath;
        }
    } else if (lang === 'he') {
        html.setAttribute('lang', 'he');
        html.classList.remove('ltr');
        html.classList.add('rtl');
        document.getElementById('about_us').textContent = "אודות";
        document.getElementById('about_us').href = "/he/about_us_he.html";
        document.getElementById('contact').textContent = "צור קשר";
        document.getElementById('contact').href = "/he/contact_us_he.html";
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/en/', '/he/').replace('_en', '_he');
        if (newPath === '/' || newPath === '/index.html') {
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

document.addEventListener("DOMContentLoaded", function() {
    // Detect browser language or use a preset language selection
    var userLang = navigator.language || navigator.userLanguage; 
    var bannerText, privacyPolicyLink;

    if (userLang.startsWith("he")) {
        // Hebrew content
        bannerText = "אנו משתמשים בקובצי Cookie כדי לשפר את החוויה שלך באתר שלנו ולהציג לך פרסומות מותאמות אישית. על ידי המשך השימוש באתר שלנו, אתה מאשר את השימוש שלנו בקובצי Cookie.";
        privacyPolicyLink = "/he/privacy_policy_he.html";
    } else {
        // Default to English
        bannerText = "We use cookies to improve your experience on our site and to show you personalized advertising. By continuing to use our site, you accept our use of cookies.";
        privacyPolicyLink = "/en/privacy_policy_en.html";
    }

    document.getElementById("cookieConsentMessage").textContent = bannerText;
    document.getElementById("privacyPolicyLink").setAttribute("href", privacyPolicyLink);

    if (!localStorage.getItem("cookiesAccepted")) {
        document.getElementById("cookieConsentBanner").style.display = "block";
    }

    document.getElementById("acceptCookiesBtn").addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        document.getElementById("cookieConsentBanner").style.display = "none";

        // Notify Google Tag Manager about the consent if applicable
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
    });
});
