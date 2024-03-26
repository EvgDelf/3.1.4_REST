document.getElementById('addUser').addEventListener('click', function () {
    const selectedRoles = Array.from(document.getElementById('roleNew').selectedOptions).map(option => {
        return {id: option.value, name: option.text};
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
        .then(response => response.json())
        .then(data => {
            updateTable();
        })
        .catch(error => {
            console.error('Error', error);
        });
});