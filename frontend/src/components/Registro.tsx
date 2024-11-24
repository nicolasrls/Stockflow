import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const [codigoAutenticacao, setCodigoAutenticacao] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar os campos
        if (nome && email && senha && senha === senhaConfirmada) {
            setQrCodeVisible(true);
            // Gerar um código de autenticação (simples exemplo)
            setCodigoAutenticacao(Math.random().toString(36).substring(2, 15));
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h3>Cadastro</h3>
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                    />
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
                        type="password" 
                        placeholder="Confirmar Senha" 
                        value={senhaConfirmada} 
                        onChange={(e) => setSenhaConfirmada(e.target.value)} 
                    />

                    {qrCodeVisible && (
                        <div className="qrcode-container">
                            
                            <input type="text" placeholder="Código do QR Code" />
                        </div>
                    )}

                    <button type="submit">Cadastrar</button>
                </form>
                <p>Já tem uma conta? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default Registro;
