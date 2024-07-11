document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // This is where you'd normally make an AJAX request to your backend to handle the password reset process.
    // For this example, we'll just simulate this with a message.
    fetch('https://your-backend-api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('A password reset link has been sent to your email address.');
            } else {
                alert('There was an error. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error. Please try again.');
        });
});