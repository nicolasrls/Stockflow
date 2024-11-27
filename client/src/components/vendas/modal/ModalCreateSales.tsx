import { ModalCreate } from "../../../types/ModalCreate";
import { FormCreateSales } from "./FormCreateSales";
import "../../../styles/estoque/modal/ModalCreateSale.css";

export const ModalCreateSales = ({ modalCreate, setModalCreate }: ModalCreate) => {
  return (
    <dialog className="containerModal">
      <div
        className="transparency"
        onClick={() => setModalCreate(!modalCreate)}
      ></div>

      <article className="modalMain">
        <h2>Crie sua venda</h2>

        <FormCreateSales
          modalCreate={modalCreate}
          setModalCreate={setModalCreate}
        />
      </article>
    </dialog>
  );
};
