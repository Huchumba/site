const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});





document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    signUpForm.addEventListener('submit', registerUser);
    signInForm.addEventListener('submit', loginUser);

    function registerUser(event) {
        event.preventDefault();

        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('User already exists!');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('User registered successfully!');
        signUpForm.reset();
    }

    function loginUser(event) {
        event.preventDefault();

        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert(`Welcome back, ${user.name}!`);
            signInForm.reset();
            window.location.href = 'peofile.html'; // Перенаправление на index.html
        } else {
            alert('Invalid email or password!');
        }
    }
});