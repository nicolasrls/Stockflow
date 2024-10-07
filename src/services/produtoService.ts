import produtoRepository from "../repositories/produtoRepository";
import { IProduto } from "../models/interfaces/IProduto";
import mongoose from "mongoose";


export class ProdutoService{

    private repository = produtoRepository; // acesso direto ao repositorio

    async getAllProdutos(): Promise<IProduto[]>{
        return this.repository.findAll();
    };

    async getProdutobyId(id : string): Promise<IProduto | null>{
        return this.repository.findById(id);
    };

    async createProduto(produto: IProduto): Promise<IProduto | null>{
        return this.repository.create(produto);
    };

    async updateProduto(id: mongoose.Types.ObjectId, update: Partial<IProduto>): Promise<IProduto | null>{
        return this.repository.update(id, update);
    };

    async deleteProduto(id: string): Promise<boolean>{
        return this.repository.delete(id);
    };


};