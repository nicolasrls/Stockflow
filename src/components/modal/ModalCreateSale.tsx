import { ModalCreate } from "../../types/ModalCreate";
import { FormCreateSale } from "./FormCreateSale";
import "./ModalCreateSale.css";

export const ModalCreateSale = ({ modalCreate, setModalCreate }: ModalCreate) => {
  return (
    <dialog className="containerModal">
      <div
        className="transparency"
        onClick={() => setModalCreate(!modalCreate)}
      ></div>

      <article className="modalMain">
        <h2>Crie sua venda</h2>

        <FormCreateSale
          modalCreate={modalCreate}
          setModalCreate={setModalCreate}
        />
      </article>
    </dialog>
  );
};
