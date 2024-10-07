import vendaRepository from "../repositories/vendaRepository";
import { IVenda } from "../models/interfaces/IVenda";
import { IProduto } from "../models/interfaces/IProduto";
import produtoRepository from "../repositories/produtoRepository";


export class VendaService{
    private repository = vendaRepository;

    async createVenda(vendaData: IVenda): Promise<IVenda> {
        // Verifica se o produto existe e se tem estoque suficiente
        const produto = await produtoRepository.findById(vendaData.produtoId.toString());

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        if (produto.quantidadeEmEstoque < vendaData.quantidadeVendida) {
            throw new Error('Estoque insuficiente para esta venda');
        }

        // Atualiza o estoque do produto
        produto.quantidadeEmEstoque -= vendaData.quantidadeVendida;
        await produtoRepository.update(produto.id, { quantidadeEmEstoque: produto.quantidadeEmEstoque });

        // Cria a venda
        return this.repository.create(vendaData);
    }

    async getAllVendas(): Promise<IVenda[]> {
        return this.repository.findAll();
    }
}