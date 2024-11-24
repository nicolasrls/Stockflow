import React, { useState } from 'react';
import '../styles/Login.css';
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && senha) {
            // Lógica de autenticação (exemplo simplificado)
            alert('Login bem-sucedido!');
        } else {
            alert('Por favor, preencha todos os campos.');
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
                    <button type="submit">Entrar</button>
                </form>
                <p>Não tem uma conta? <a href="/">Cadastro</a></p>
            </div>
        </div>
    );
};

export default Login;
