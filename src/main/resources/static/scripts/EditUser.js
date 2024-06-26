document.getElementById('saveChanges').addEventListener('click', function () {
    const id = document.getElementById('idEdit').value;
    const username = document.getElementById('usernameEdit').value;
    const lastName = document.getElementById('lastnameEdit').value;
    const age = document.getElementById('ageEdit').value;
    const password = document.getElementById('passEdit').value;
    const email = document.getElementById('emailEdit').value;
    const selectedRoles = Array.from(document.getElementById('roleEdit').selectedOptions).map(option => {
        return { id: option.value, name: option.text };
    });


    const userData = {
        id: id,
        username: username,
        lastName: lastName,
        age: age,
        password : password,
        email: email
    };

    if(selectedRoles.length > 0){
        userData.roles = selectedRoles;
    }

    fetch('/api/edit', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {

            document.getElementById("id").innerText = data.id;
            document.getElementById("username").innerText = data.username;
            document.getElementById("lastname").innerText = data.lastName;
            document.getElementById("age").innerText = data.age;
            document.getElementById("password").innerText = data.password;
            document.getElementById("email").innerText = data.email;
            document.getElementById("role").innerText = data.role;
        })
        .catch(error => {
            console.error('Error', error);
        });
});