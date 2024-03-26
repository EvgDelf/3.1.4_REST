document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            data.splice(0,1);
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
});
const editModalEl = new bootstrap.Modal(document.getElementById("editModal"), {});
const deleteModalEl = new bootstrap.Modal(document.getElementById("deleteModal"), {});
function openEditModal(id) {
    editModalEl.show();
    fetch('/api/user/' + id)
        .then(response => response.json())
        .then(user => {

            document.getElementById("idEdit").value = user.id;
            document.getElementById("usernameEdit").value = user.username;
            document.getElementById("lastnameEdit").value = user.lastName;
            document.getElementById("ageEdit").value = user.age;
            document.getElementById("emailEdit").value = user.email;
        });
}
function openDeleteModal(id) {
    deleteModalEl.show();
    fetch('/api/user/' + id)
        .then(response => response.json())
        .then(user => {

            document.getElementById("idDelete").value = user.id;
            document.getElementById("usernameDelete").value = user.username;
            document.getElementById("lastnameDelete").value = user.lastName;
            document.getElementById("ageDelete").value = user.age;
            document.getElementById("emailDelete").value = user.email;
        });
}