document.addEventListener("DOMContentLoaded", function () {
    const userId = window.location.pathname.split('/').pop();
    fetch('/api/user/' + userId)
        .then(response => response.json())
        .then(data => {
            const roles = data.roles.map(role => role.name.replace("ROLE_","")).join(' ');

            // Проверяем наличие элементов на странице
            const userDataEmailEl = document.getElementById('userDataEmail');
            const userDataRoleEl = document.getElementById('userDataRole');

            if(userDataEmailEl && userDataRoleEl) {
                userDataEmailEl.innerText = data.email;
                userDataRoleEl.innerText = roles;
            } else {
                console.error('Элементы userDataEmail или userDataRole не найдены');
            }
        })
        .catch(error => {
            console.error('Произошла ошибка при загрузке данных', error);
        });
});
