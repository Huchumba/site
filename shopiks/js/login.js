// Функция для проверки существования имени пользователя
// Функция для проверки существования имени пользователя
function checkUsernameExists(username) {
    return fetch(`https://666143d063e6a0189fe90cbf.mockapi.io/users?username=${username}`, {
        method: 'GET',
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
        if (username === data[0]["username"]) {
            return { exists: true, id: data[0].id }; // Возвращаем объект с флагом и ID
        } else {
            alert('Пользователь с таким именем не существует.');
            return { exists: false };
        }
    })
   .catch(error => {
        return { exists: false };
    });
}

// Функция для проверки существования пароля
function checkPasswordExists(password, id) {
    return fetch(`https://666143d063e6a0189fe90cbf.mockapi.io/users/${id}`, {
        method: 'GET',
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
        if (password === data["password"]) {
            return true; // Пароль верный
        } else {
            alert('Пароль неверный.');
            return false;
        }
    })
   .catch(error => {
        return false;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    usernameInput.addEventListener('blur', function() {
        checkUsernameExists(this.value).then(result => {
            if (!result.exists) {
                this.setCustomValidity('Пользователь с таким именем не существует.');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        checkUsernameExists(usernameInput.value).then(result => {
            if (result.exists) {
                checkPasswordExists(passwordInput.value, result.id).then(isValid => {
                    if (isValid) {
                        localStorage.setItem('id', result.id); // Сохраняем ID пользователя в localStorage
                        window.location.href = 'profile.html'; // Перенаправляем пользователя на страницу профиля
                    } else {
                        alert('Ошибка входа.'); // Можно заменить на более подходящее сообщение об ошибке
                    }
                });
            } else {
                alert('Пользователь с таким именем не существует.');
            }
        });
    });
});