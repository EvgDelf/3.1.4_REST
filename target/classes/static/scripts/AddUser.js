document.getElementById('addUser').addEventListener('click',  function () {
    const selectedRoles = Array.from(document.getElementById('roleNew').selectedOptions).map(option => {
        return {id: option.value, name: "ROLE_".concat(option.text)};
    });

    const userData = {
        username: document.getElementById('usernameNew').value,
        lastName: document.getElementById('lastNameNew').value,
        password: document.getElementById('passwordNew').value,
        age: document.getElementById('ageNew').value,
        email: document.getElementById('emailNew').value,
        roles: selectedRoles
    };

    fetch('/api/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        updateTable();
                    })
                    .catch(error => {
                        console.error('Error', error);
                    });
            }
        });
});

function updateTable() {
    const table = document.getElementById('usersTableBody');
    table.innerHTML = '';

    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const usersTable = document.getElementById('usersTableBody')
                const roles = user.roles.map(role => role.name.replace("ROLE_","")).join(' ');
                const row = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${roles}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="openEditModal(${user.id})">Edit</button>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="openDeleteModal(${user.id})">Delete</button>
                            </td>
                        </tr>
                `;
                usersTable.innerHTML += row;
            });
        });
}
