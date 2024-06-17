
document.addEventListener("DOMContentLoaded", function() {
    // Функция для выполнения запроса к API
    async function fetchUserData() {
        try {
            const response = await fetch('https://666143d063e6a0189fe90cbf.mockapi.io/users');
            const data = await response.json();
            if (data.length > 0) {
                const userId = localStorage.getItem('id'); // Предполагается, что вы хотите получить данные только первого пользователя
                const user = data.find(user => user.id === userId);
                if (user) {
                    document.getElementById("username").value = user.username;
                    document.getElementById("email").value = user.email;
                    document.getElementById("password").value = user.password;
                }
                else {
                    console.log('Пользователь не найден');
                }
            } else {
                console.log('База данных пуста');
            }
        } catch (error) {
            console.error('Произошла ошибка при получении данных:', error);
        }
    }

    async function updateUserData() {
        const userId = localStorage.getItem('id');

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value


    fetch(`https://666143d063e6a0189fe90cbf.mockapi.io/users/${userId}`, {
        method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email, 
                    password
                })
            });
            if (response.ok) {
                console.log('Данные пользователя успешно обновлены');
            } else {
                console.log('Произошла ошибка при обновлении данных пользователя');
            }
    }

    // Вызов функции для получения данных пользователя
    fetchUserData();

    document.getElementById("saveButton").addEventListener("click", function() {
        updateUserData();
    });
});