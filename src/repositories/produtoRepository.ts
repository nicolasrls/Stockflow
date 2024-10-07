import { IProduto } from "../models/interfaces/IProduto";
import Produto, { IProdutoModel } from "../models/produtoModel";
import mongoose from "mongoose";


class ProdutoRepository{
    
    public async create(dataProduto: IProduto): Promise<IProdutoModel> {
        try{
        const novoProduto = new Produto(dataProduto);
        return await novoProduto.save(); 
        } catch(error){
            throw new Error(`Erro ao adicionar Produto: ${(error as Error).message}`)
        }  
    };

    public async findById(id : string): Promise<IProdutoModel | null>{
        try{
            return await Produto.findById(id);
        }catch(error){
            throw new Error(`Erro a encontar Produto: ${(error as Error).message} `)
        };
    };

    public async update(id : mongoose.Types.ObjectId, updateData : Partial<IProdutoModel> ): Promise<IProdutoModel | null>{
        try{
            return await Produto.findByIdAndUpdate(id, updateData, { new : true});
        } catch(error){
            throw new Error(`Erro ao editar Produto: ${(error as Error).message}`)
        }
    };

    public async delete(id: string): Promise<boolean>{
        try{
            const result = await Produto.findByIdAndDelete(id);
            return result !== null;
        } catch(error){
            throw new Error(`Erro ao deletar Produto: ${(error as Error).message}`);
        }
    };

    public async findAll(): Promise<IProdutoModel[]>{
        try{
            return await Produto.find()
        }catch(error){
            throw new Error(`Não há Produtos no estoque: ${(error as Error).message}`)
        }
    };
}

export default new ProdutoRepository()