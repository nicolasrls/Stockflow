import { Document, model, Schema  } from "mongoose";
import { IProduto } from "./interfaces/IProduto";

export interface IProdutoModel extends IProduto, Document {};

const ProdutoSchema : Schema = new Schema<IProdutoModel> ({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidadeEmEstoque: { type: Number, required: true },
    categoria: { type: String, required: true }
});

const Produto = model<IProdutoModel>('Produto', ProdutoSchema)
export default Produto