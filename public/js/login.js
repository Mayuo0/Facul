
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        
        const response = await axios.post('http://localhost:3000/auth/login', { email, password });

        if (response.data.success) {
           
            localStorage.setItem('token', response.data.body.token);
            alert('Login realizado com sucesso!');
            window.location.href = 'admin.html'; 
        } else {
            alert('Erro ao fazer login: ' + response.data.body.text);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao fazer login. Tente novamente.');
    }
});
