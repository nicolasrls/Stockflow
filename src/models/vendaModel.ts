import { Document, model, Schema } from "mongoose";
import { IVenda } from "./interfaces/IVenda";

export interface IVendaModel extends IVenda, Document {};

const VendaSchema: Schema<IVendaModel> = new Schema<IVendaModel>({
    produtoId: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },  // Use Schema.Types.ObjectId
    quantidadeVendida: { type: Number, required: true },
    dataDaVenda: { type: Date, default: Date.now },
    valorTotal: { type: Number, required: true }
});

const Venda = model<IVendaModel>('Venda', VendaSchema);
export default Venda;
