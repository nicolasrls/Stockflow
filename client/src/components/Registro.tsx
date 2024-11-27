import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [qrCodeVisible, setQrCodeVisible] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [twoFactorSecret, setTwoFactorSecret] = useState('');
    const [codigoAutenticacao, setCodigoAutenticacao] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar os campos
        if (nome && email && senha && senha === senhaConfirmada) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {  // Verifique a URL do seu back-end
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: nome,
                        email,
                        password: senha,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    // Mostrar QR Code
                    setQrCodeUrl(data.qrCodeDataUrl);
                    setQrCodeVisible(true);
                } else {
                    setErrorMessage(data.message || 'Erro no cadastro');
                }
            } catch (error) {
                setErrorMessage('Erro de comunicação com o servidor');
                console.error(error);
            }
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                {!qrCodeVisible ? (
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

                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <button type="submit">Cadastrar</button>
                    </form>
                ) : (
                    <div className="qrcode-container">
                        <p className="qrcode-message">Escaneie o QR Code com seu aplicativo escaneador</p>
                        <img src={qrCodeUrl} alt="QR Code" />
                        <p>Já tem uma conta? <a href="/">Login</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Registro;
