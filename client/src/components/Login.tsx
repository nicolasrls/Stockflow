import React, { useState } from 'react';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [twoFactorToken, setTwoFactorToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email && senha) {
            try {
                // Enviar dados de login para o back-end
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password: senha,
                        twoFactorToken, // Se você estiver implementando 2FA, envie o token
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Sucesso - Armazenar o token JWT no localStorage ou no estado
                    alert('Login bem-sucedido!');
                    localStorage.setItem('token', data.token); // Exemplo de armazenamento de token
                } else {
                    // Mostrar erro
                    setErrorMessage(data.message || 'Erro ao fazer login');
                }
            } catch (error) {
                setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
            }
        } else {
            setErrorMessage('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <form onSubmit={handleLogin}>
                    <h3>Login</h3>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Código 2FA" 
                        value={twoFactorToken} 
                        onChange={(e) => setTwoFactorToken(e.target.value)} 
                    />
                    <button type="submit">Entrar</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p>Não tem uma conta? <a href="/">Cadastro</a></p>
            </div>
        </div>
    );
};

export default Login;
