function submitContactForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('contactEmail').value;
    const subjectInput = document.getElementById('contactSubject').value;
    const messageInput = document.getElementById('contactMessage').value;
    if (emailInput && subjectInput && messageInput) { 
        fetch("https://core.api.dobbersports.com/v1/feedback/contact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": emailInput, "subject": subjectInput, "message": messageInput}),

        })
        .then(response => {
            if (response.ok) {
                showSnackbar('We\'ve got your message!');
                form.reset();
            }else if(response.status == 400){
                showSnackbar('Something Wrong!');
                throw new Error('Network response was not ok');
            }
        })
    } else {
        showSnackbar('Please enter a valid email');
    }
}

function showSnackbar(message) {
    if(message == null) message = "You have been subscribed successfully!";
    var snackbar = document.getElementById("snackbar");
    var messageSpan = document.getElementById("snackbar-message");
    
    messageSpan.textContent = message; // Set the message
    snackbar.classList.remove("hidden");
    snackbar.classList.add("show");

    setTimeout(function() {
        snackbar.classList.remove("show");
        snackbar.classList.add("hidden");
    }, 6000);
}