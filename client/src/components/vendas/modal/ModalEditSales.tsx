import { ModalEdit } from "../../../types/ModalEdit"
import { FormEditSales } from "./FormEditSales"

export const ModalEditSales = ({ setModalEdit, modalEdit, idSale, nameSale }: ModalEdit) => {
  return (
    <dialog className="containerModal">
      <div
        className="transparency"
        onClick={() => setModalEdit(!modalEdit)}
      ></div>

      <article className="modalMain">
        <h2>Edite a venda {nameSale} </h2>

        <FormEditSales
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          idSale={idSale}
          nameSale={nameSale}
        />
      </article>
    </dialog>
  )
}
