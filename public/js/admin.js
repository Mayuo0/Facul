
async function fetchUsers() {
    try {

        const token = localStorage.getItem('token');


        const response = await axios.get('http://localhost:3000/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const users = response.data.body;
        const tableBody = document.getElementById('usersTable');
        tableBody.innerHTML = '';


        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser('${user._id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Excluir</button>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar usuários.');
    }
}

async function deleteUser(userId) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Você não está autenticado.');
            return;
        }


        const response = await axios.delete(`http://localhost:3000/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (response.data.success) {
            alert('Usuário excluído com sucesso!');
            fetchUsers();
        } else {
            alert('Erro ao excluir o usuário.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir o usuário.');
    }
}


async function resetPassword(userId) {
    const newPassword = prompt("Digite a nova senha:");

    if (!newPassword) {
        alert('Senha é obrigatória.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:3000/admin/resetPassword/${userId}`, {
            newPassword,
        });

        if (response.data.success) {
            alert('Senha resetada com sucesso!');
        } else {
            alert('Erro ao resetar a senha.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao resetar a senha.');
    }
}


async function editUser(userId) {
    const fullname = prompt("Digite o novo nome:");
    const email = prompt("Digite o novo email:");

    if (!fullname || !email) {
        alert('Nome e email são obrigatórios.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:3000/admin/editUser/${userId}`, {
            fullname,
            email,
        });

        if (response.data.success) {
            alert('Usuário atualizado com sucesso!');
            fetchUsers();
        } else {
            alert('Erro ao atualizar usuário.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar usuário.');
    }
}

fetchUsers();
