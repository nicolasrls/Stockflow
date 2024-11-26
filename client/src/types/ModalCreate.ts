import { ComponentProps } from "react";

export type ModalCreate = ComponentProps<"div"> & {
  modalCreate: boolean;
  setModalCreate: (modalCreate: boolean) => void;
};
