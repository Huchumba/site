<<<<<<< HEAD
function checkUsernameExists(username) {
    return fetch(`https://666143d063e6a0189fe90cbf.mockapi.io/users?username=${username}`, {
        method: 'GET', // Используйте GET для запроса проверки
        headers: {
            'Content-Type': 'application/json'
        }
    })
   .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with an error status');
        }
        return response.json();
    })
   .then(data => {
        // Проверяем, содержит ли ответ поле, указывающее на существование пользователя
        console.log(data[0]["username"])
        if (username == data[0]["username"]) { // Изменено на более общее условие
            alert('Пользователь с таким именем уже существует.');
            return false;
        } 
        else{return true}
    })
   .catch(error => { 
        return true;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');

    // Регулярное выражение для проверки латинских символов
    const latinLettersOnlyRegex = /^[A-Za-z]+$/;

    usernameInput.addEventListener('input', function() {
        // Проверяем, соответствует ли введенное значение только латинским буквам
        if (!latinLettersOnlyRegex.test(this.value)) {
            alert('Имя пользователя должно содержать только латинские буквы.');
            this.value = ''; // Сбрасываем значение поля
        }
    });

    usernameInput.addEventListener('blur', function() {
        checkUsernameExists(this.value).then(canRegister => {
            if (!canRegister) {
                this.setCustomValidity('Пользователь с таким именем уже существует.');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        fetch("https://666143d063e6a0189fe90cbf.mockapi.io/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
            localStorage.setItem('userId', data.id); // Сохраняем ID пользователя в localStorage
            window.location.href = 'profile.html'; // Перенаправляем пользователя на страницу профиля
        }).catch((error) => {
            console.error('Error:', error);
        });
    });
});
=======
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
>>>>>>> 6c51c1e5d8f8cd9b7bc5279cdaddde817ab52bd2
