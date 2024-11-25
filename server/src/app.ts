import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Alvo permitido (front-end)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));


// Middleware
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

export default app;
