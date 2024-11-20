import { FormEvent, useEffect, useState } from "react";
import { PayWays } from "../../types/PayWays";
import { saleFetch } from "../../api/config";
import { ModalEdit } from "../../types/ModalEdit";

export const FormEditSale = ({
  setModalEdit,
  modalEdit,
  idSale,
}: ModalEdit) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [payWay, setPayWay] = useState<PayWays | null>(null);
  const [payWays, setPayWays] = useState<PayWays[]>([]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os meios de pagamento
        const payWaysResponse = await saleFetch.get("/payWays");
        const payWaysData: PayWays[] = payWaysResponse.data;
        setPayWays(payWaysData);

        // Carregar os dados da venda
        const saleResponse = await saleFetch.get(`/sales/${idSale}`);
        const saleData = saleResponse.data;

        setName(saleData.name);
        setDate(saleData.date);
        setPrice(saleData.price);

        // Encontrar o meio de pagamento da venda
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

  const editSale = async (e: FormEvent) => {
    e.preventDefault();

    const saleData: object = {
      name,
      date,
      payWay: payWay?.id,
      price,
    };

    try {
      await saleFetch.put(`/sales/${idSale}`, saleData);

      setModalEdit(!modalEdit);
    } catch (error) {
      console.error(`Erro ao editar venda: ${error}`);
    }
  };

  return (
    <form className="form" onSubmit={editSale}>
      <div className="containerInputs">
        <div className="containerInput">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Insira o nome do produto"
          />
        </div>

        <div className="containerInput">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
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
            {payWays.map((pay) => (
              <option key={pay.id} value={pay.id}>
                {pay.name}
              </option>
            ))}
          </select>
        </div>

        <div className="containerInput">
          <label htmlFor="price">Valor</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price || 0}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            required
            placeholder="Insira o valor em dinheiro"
          />
        </div>
      </div>

      <button type="submit" className="btn">
        Editar Venda!
      </button>
    </form>
  );
};
