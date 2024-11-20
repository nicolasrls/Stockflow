import { ModalEdit } from "../../types/ModalEdit"
import { FormEditSale } from "./FormEditSale"

export const ModalEditSale = ({ setModalEdit, modalEdit, idSale, nameSale }: ModalEdit) => {
  return (
    <dialog className="containerModal">
      <div
        className="transparency"
        onClick={() => setModalEdit(!modalEdit)}
      ></div>

      <article className="modalMain">
        <h2>Edite o produto {nameSale} </h2>

        <FormEditSale
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          idSale={idSale}
          nameSale={nameSale}
        />
      </article>
    </dialog>
  )
}
