document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; 

    try {
       
        const response = await axios.post('http://localhost:3000/auth/signup', {
            fullname,
            email,
            password,
            role 
        });

        if (response.data.success) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html'; 
        } else {
            alert('Erro ao realizar o cadastro: ' + response.data.body.text);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao realizar o cadastro. Tente novamente.');
    }
});
