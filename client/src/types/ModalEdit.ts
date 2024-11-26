import { ComponentProps } from "react";

export type ModalEdit = ComponentProps<"div"> & {
  modalEdit: boolean;
  setModalEdit: (modalEdit: boolean) => void;
  idSale: string;
  nameSale: string;
};
