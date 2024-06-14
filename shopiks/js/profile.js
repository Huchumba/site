document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get the form data
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    const username = usernameInput.value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

    // Send the updated data to the server
    fetch('https://666143d063e6a0189fe90cbf.mockapi.io/users/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Update the form fields with the new data
        localStorage.getItem("UserId", data.id)
        document.getElementById('username').value = data.username;
        document.getElementById('password').value = data.password;
        document.getElementById('email').value = data.email;
        alert('Profile updated successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update profile');
    });
});