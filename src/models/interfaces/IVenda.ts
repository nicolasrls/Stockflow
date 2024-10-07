import { Types } from 'mongoose';

export interface IVenda {
    produtoId: Types.ObjectId;
    quantidadeVendida: number;
    valorTotal: number;
    dataDaVenda: Date;
}
