import { Router } from 'express';
import { VendaController } from '../controllers/vendaController';

const router = Router();
const vendaController = new VendaController();

// Rota para criar uma nova venda
router.post('/',  (req, res) => {
    vendaController.create(req, res)
});

// Rota para obter todas as vendas
router.get('/', (req, res) => {
    vendaController.getAll(req, res)
});

export default router;
