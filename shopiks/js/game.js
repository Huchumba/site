document.addEventListener("DOMContentLoaded", function() {
    // Функция для выполнения запроса к API
    async function updateUserData() {
        const userId = localStorage.getItem('id');

        let points = 0.00;
        const pointsElement = document.getElementById('points');
        const clickButton = document.getElementById('clickButton');
        
        clickButton.addEventListener('click', () => {
            points++;
            pointsElement.textContent = points;

            const data = {
                point: points.toFixed(2)
            };
        
        


    fetch(`https://666143d063e6a0189fe90cbf.mockapi.io/users/${userId}`, {
        method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            });
            if (response.ok) {
                console.log('Данные пользователя успешно обновлены');
            } else {
                console.log('Произошла ошибка при обновлении данных пользователя');
            }
        });
    }

    document.getElementById("saveButton").addEventListener("click", function() {
        updateUserData();
    });
});