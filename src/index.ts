import express from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));


// Definir rota para a página HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));

});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

const SECRET_KEY = 'seu_segredo_jwt';

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/stockflow');

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Valide as credenciais (no momento, fictícias para o exemplo)
    const user = { id: 1, username: 'test', password: await bcrypt.hash('password', 10) };

    if (username !== user.username || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Função para gerar o QR code
app.post('/generate-2fa', (req, res) => {
  const secret = speakeasy.generateSecret({ name: 'Stockflow' });
  if (!secret.otpauth_url) {
    return res.status(500).json({ message: 'Erro ao gerar o URL OTPAuth' });
  }
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao gerar o QR Code' });
    }
    res.json({
      secret: secret.base32,
      qrCodeUrl: data_url
    });
  });
});

app.post('/verify-2fa', (req, res) => {
    const { token, secret } = req.body;
    if (!token || !secret) {
        return res.status(400).json({ message: 'Token e segredo são necessários.' });
    }
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token
    });
    if (verified) {
        res.json({ success: true, message: '2FA verificado com sucesso' });
    } else {
        res.status(400).json({ success: false, message: 'Código 2FA inválido' });
    }
});