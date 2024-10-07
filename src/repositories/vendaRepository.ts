import Venda from "../models/vendaModel";
import { IVenda } from "../models/interfaces/IVenda";


class VendaRepository{

    public async create(dataVenda: IVenda): Promise<IVenda> {
        try{
            const novaVenda = new Venda(dataVenda);
            return await novaVenda.save();
        } catch(error){
            throw new Error(`Erro ao relizar Venda: ${(error as Error).message}`);
        }

    };

    public async findAll(): Promise<IVenda[]> {
        try{
            return await Venda.find().populate('produtoId');
        } catch(error){
            throw new Error(`Não há Vendas: ${(error as Error).message}`)
        }
    };
};

export default new VendaRepository();