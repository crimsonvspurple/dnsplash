function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('notifyMe');
    const emailInput = document.getElementById('cta-email').value;
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        showSnackbar('Please enter a valid email');
        return;
    }
    if (emailInput) { 
        fetch("https://user.api.dobbersports.com/v1/user/subscribe/"+emailInput, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                showSnackbar('You have been subscribed successfully!');
                form.reset();
            }else if(response.status == 400){
                showSnackbar('You have been subscribed successfully!');
                form.reset();
            }
            throw new Error('Network response was not ok');
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