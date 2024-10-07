import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import produtoRouter from './routes/produtoRouter';
import vendaRouter from './routes/vendaRouter';

const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Habilitar CORS para permitir requisições do Django
app.use(cors());

// Conecta ao MongoDB
connectDB();

// Usa as rotas definidas para produtos
app.use('/produtos', produtoRouter);
app.use('/vendas', vendaRouter);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://127.0.0.1:${PORT}/`);
});
