// import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Modal } from "./ModalCreateSale";
import axios from "axios";
import "./ModalCreateSale.css";
import { PayWays } from "../types/PayWays";

export const FormCreateSale = ({ setModalCreate, modalCreate }: Modal) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("00-00-0000");
  const [payWay, setPayWay] = useState<PayWays | null>(null);
  const [payWays, setPayWays] = useState<PayWays[]>([]);
  const [price, setPrice] = useState<number>(0);

  const getPaysWay = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payWays");
      const data: PayWays[] = response.data;
      setPayWays(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getPaysWay()
  }, []);

  const handlePayWayChange = (id: string) => {
    const selectedPayWay = payWays.find((pay) => pay.id === id) || null;
    setPayWay(selectedPayWay); // Atualiza com o objeto inteiro
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const saleData: object = {
      name,
      date,
      payWay: payWay?.id,
      price,
    };

    console.table(saleData)

    try {
      await axios
        .post("http://localhost:3000/sales", {
          ...saleData,
        })
        .then((response) => response.data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }

    setModalCreate(!modalCreate);
  };

  return (
    <form action="" method="post" className="form" onSubmit={handleSubmit}>
      <div className="containerInputs">
        <div className="containerInput">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insira o nome do produto"
          />
        </div>

        <div className="containerInput">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="containerInput">
          <label htmlFor="pay">Meio de Pagamento</label>

          <select
            name="pay"
            id="pay"
            value={payWay?.id || ""}
            onChange={(e) => handlePayWayChange(e.target.value)}
          >
            <option value="">Selecione</option>
            {payWays.map((pay) => (
              <option key={pay.id} value={pay.id}>{pay.name}</option>
            ))}
          </select>
        </div>

        <div className="containerInput">
          <label htmlFor="price">Valor</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            placeholder="Insira o valor em dinheiro"
          />
        </div>
      </div>

      <button type="submit" className="btn">
        Criar Venda!
      </button>
    </form>
  );
};
