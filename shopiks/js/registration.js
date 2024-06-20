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
            window.location.href = 'login.html'; // Перенаправляем пользователя на страницу профиля
        }).catch((error) => {
            console.error('Error:', error);
        });
    });
});
