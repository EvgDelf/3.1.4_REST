document.getElementById('userDelete').addEventListener('click', function () {
    const userId = document.getElementById('idDelete').value;

    fetch(`/api/delete/${userId}`, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                const row = document.getElementById(`userRow${userId}`);
                row.remove();
            } else {
                console.error('Ошибка при удалении пользователя');
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении пользователя:', error);
        });
});