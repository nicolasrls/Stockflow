import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { VendaService } from '../services/vendaService';
import { ProdutoService } from '../services/produtoService';
import { IProduto } from '../models/interfaces/IProduto';
import { IVenda } from '../models/interfaces/IVenda'; // Certifique-se de importar IVenda
import mongoose from 'mongoose';

const vendaService = new VendaService();
const produtoService = new ProdutoService();

export class VendaController {
    public async create(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { produtoId, quantidadeVendida } = req.body;

        try {
            // 1. Verificar se o produto existe
            const produto = await produtoService.getProdutobyId(produtoId) as (IProduto & { _id: mongoose.Types.ObjectId });

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            // 2. Verificar se há estoque suficiente
            if (produto.quantidadeEmEstoque < quantidadeVendida) {
                return res.status(400).json({ message: 'Estoque insuficiente para a venda' });
            }

            // 3. Criar a venda
            const valorTotal = produto.preco * quantidadeVendida;

            // Crie um objeto que respeite a interface IVenda
            const novaVendaData: IVenda = {
                produtoId: produto._id,  // Type correto para produtoId
                quantidadeVendida,
                valorTotal,
                dataDaVenda: new Date(),
            };

            const novaVenda = await vendaService.createVenda(novaVendaData);

            // 4. Atualizar o estoque do produto
            produto.quantidadeEmEstoque -= quantidadeVendida;
            await produtoService.updateProduto(produto._id, { quantidadeEmEstoque: produto.quantidadeEmEstoque });

            return res.status(201).json(novaVenda);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao realizar venda: ${(error as Error).message}` });
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const vendas = await vendaService.getAllVendas();
            return res.json(vendas);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar vendas: ${(error as Error).message}` });
        }
    }
}
