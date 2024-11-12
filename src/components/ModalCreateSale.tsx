import { ComponentProps } from "react";
import { FormCreateSale } from "./FormCreateSale";
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

        <FormCreateSale modalCreate={modalCreate} setModalCreate={setModalCreate} />
      </article>
    </dialog>
  );
};
