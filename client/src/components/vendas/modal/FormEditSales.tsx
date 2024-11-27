import { FormEvent, useEffect, useState } from "react";
import { PayWays } from "../../../types/PayWays";
import { saleFetch } from "../../../api/config";
import { ModalEdit } from "../../../types/ModalEdit";

export const FormEditSales = ({
  setModalEdit,
  modalEdit,
  idSale,
}: ModalEdit) => {
  const [produtoId, setProdutoId] = useState<string>(""); // Changed from name to produtoId
  const [dataDaVenda, setDataDaVenda] = useState<string>(""); // Changed from date to dataDaVenda
  const [payWay, setPayWay] = useState<PayWays | null>(null);
  const [payWays, setPayWays] = useState<PayWays[]>([]);
  const [quantidadeVendida, setQuantidadeVendida] = useState<number>(0); // New state for quantity
  const [valorTotal, setValorTotal] = useState<number>(0); // Changed from price to valorTotal

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load payment methods
        const payWaysResponse = await saleFetch.get("/payWays");
        const payWaysData: PayWays[] = payWaysResponse.data;
        setPayWays(payWaysData);

        // Load sale data
        const saleResponse = await saleFetch.get(`/sales/${idSale}`);
        const saleData = saleResponse.data;

        // Populate form fields with sale data
        setProdutoId(saleData.produtoId);
        setDataDaVenda(saleData.dataDaVenda);
        setQuantidadeVendida(saleData.quantidadeVendida);
        setValorTotal(saleData.valorTotal);

        // Find the selected payment method
        const selectedPayWay = payWaysData.find((pay) => pay.id === saleData.payWay);
        setPayWay(selectedPayWay || null);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchData();
  }, [idSale]);

  const handlePayWayChange = (id: string) => {
    const selectedPayWay = payWays.find((pay) => pay.id === id) || null;
    setPayWay(selectedPayWay);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const saleData = {
      produtoId,
      quantidadeVendida,
      dataDaVenda,
      valorTotal,
      payWay: payWay?.id,
    };

    try {
      await saleFetch.put(`/sales/${idSale}`, saleData);

      setModalEdit(!modalEdit); // Close modal after submitting
    } catch (error) {
      console.error(`Error editing sale: ${error}`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="containerInputs">
        <div className="containerInput">
          <label htmlFor="produtoId">Produto ID</label>
          <input
            type="text"
            name="produtoId"
            id="produtoId"
            value={produtoId || ""}
            onChange={(e) => setProdutoId(e.target.value)}
            required
            placeholder="Insira o ID do produto"
          />
        </div>

        <div className="containerInput">
          <label htmlFor="dataDaVenda">Data da Venda</label>
          <input
            type="date"
            name="dataDaVenda"
            id="dataDaVenda"
            value={dataDaVenda || ""}
            onChange={(e) => setDataDaVenda(e.target.value)}
            required
          />
        </div>

        <div className="containerInput">
          <label htmlFor="pay">Meio de Pagamento</label>
          <select
            name="pay"
            id="pay"
            value={payWay?.id || ""}
            onChange={(e) => handlePayWayChange(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {payWays.map((pay) => (
              <option key={pay.id} value={pay.id}>
                {pay.name}
              </option>
            ))}
          </select>
        </div>

        <div className="containerInput">
          <label htmlFor="quantidadeVendida">Quantidade Vendida</label>
          <input
            type="number"
            name="quantidadeVendida"
            id="quantidadeVendida"
            value={quantidadeVendida || 0}
            onChange={(e) => setQuantidadeVendida(e.target.valueAsNumber)}
            required
            placeholder="Insira a quantidade vendida"
          />
        </div>

        <div className="containerInput">
          <label htmlFor="valorTotal">Valor Total</label>
          <input
            type="number"
            name="valorTotal"
            id="valorTotal"
            value={valorTotal || 0}
            onChange={(e) => setValorTotal(e.target.valueAsNumber)}
            required
            placeholder="Insira o valor total"
          />
        </div>
      </div>

      <button type="submit" className="btn">
        Editar Venda!
      </button>
    </form>
  );
};
