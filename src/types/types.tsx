import { ReactNode } from 'react';

export interface ModalsContextTypeInterface {
  modalOpen: { [key: string]: boolean };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

export interface ModalProviderPropsInterface {
  children: ReactNode;
}
