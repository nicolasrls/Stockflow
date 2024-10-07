import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ProdutoService } from '../services/produtoService';
import mongoose from 'mongoose';

const service = new ProdutoService();

export class ProdutoController {
  public async create(req: Request, res: Response): Promise<Response>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const produto = await service.createProduto(req.body);
    return res.status(201).json(produto);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const produtos = await service.getAllProdutos();
    return res.json(produtos);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const produto = await service.getProdutobyId(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.json(produto);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = new mongoose.Types.ObjectId(req.params.id);
    const produto = await service.updateProduto(id, req.body);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.json(produto);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id  = req.params.id;
    const produto = await service.deleteProduto(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.json({ message: 'Produto deletado com sucesso' });
  }
}
