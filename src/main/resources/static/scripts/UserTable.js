document.addEventListener("DOMContentLoaded", function () {
    const userId = window.location.pathname.split('/').pop();
    fetch('/api/user/' + userId)
        .then(response => response.json())
        .then(data => {
            const user = data;
            const roles = user.roles.map(role => role.name.replace("ROLE_","")).join(', ');
            const userTableBody = document.getElementById('userTableBody');
            const row = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${roles}</td>
                        </tr>
                    `;
            userTableBody.innerHTML = row;
        });
});
