fetch('/api/user/1')
    .then(response => response.json())
    .then(user => {
        const adminTable = document.getElementById('adminTableBody');
        const roles = user.roles.map(role => role.name.replace("ROLE_", "")).join(' ');
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
        adminTable.innerHTML = row;
    })

