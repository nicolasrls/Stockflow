import { ComponentProps } from "react";
import "./ModalCreateSale.css";

export type Modal = ComponentProps<"div"> & {
  modalCreate: boolean;
  setModalCreate: (modalCreate: boolean) => void;
};

export const ModalCreateSale = ({ modalCreate, setModalCreate }: Modal) => {
  return (
    <dialog className="containerModal">
      <div
        className="transparency"
        onClick={() => setModalCreate(!modalCreate)}
      ></div>

      <article className="modalMain">
        <h2>Crie sua venda</h2>

        <form action="" method="post" className="form">
          <div className="containerInputs">
              <div className="containerInput">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Insira o nome do produto"
                />
              </div>
              <div className="containerInput">
                <label htmlFor="date">Data</label>
                <input type="date" name="date" id="date" />
              </div>
              <div className="containerInput">
                <label htmlFor="pay">Meio de Pagamento</label>
                <select name="pay" id="pay">
                  <option value="none">Selecione uma forma de pagar</option>
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="ticket">Boleto</option>
                  <option value="pix">Pix</option>
                </select>
              </div>
              <div className="containerInput">
                <label htmlFor="val">Valor</label>
                <input type="number" name="val" id="val" placeholder="Insira o valor em dinheiro" />
              </div>
          </div>

          <button type="submit" className="btn">Criar Venda!</button>
        </form>
      </article>
    </dialog>
  );
};
