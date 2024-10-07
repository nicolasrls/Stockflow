// src/routes/produtoRouter.ts
import { Router } from 'express';
import { ProdutoController } from '../controllers/produtoController';

const router = Router();
const controller = new ProdutoController();

// Rota para criar um produto
router.post('/', (req, res) => {
  controller.create(req, res)
});

// Rota para obter todos os produtos
router.get('/', (req, res) => {
  controller.getAll(req, res);
});

// Rota para obter um produto por ID
router.get('/:id', (req, res) => {
  controller.getById(req, res);
});

// Rota para atualizar um produto
router.put('/:id', (req, res) => {
  controller.update(req, res);
});

// Rota para deletar um produto
router.delete('/:id', (req, res) => {
  controller.delete(req, res);
});

export default router;
