import { createContext, useMemo, useState } from 'react';

interface ModalData {
  title: string;
  message: string;
  confirm1: string;
  confirm2: string;
  top: number,
  left: number,
  position?: string
}

export const ModalsStateContext = createContext<ModalData | null>(null);

export const ModalsDispatchContext = createContext<{
  showModal(modalData: ModalData): void;
  hideModal(): void;
} | null>(null);

export function ModalProvider(props: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const actions = useMemo(
    () => ({
      showModal(modalData: ModalData) {
        console.log("showModal called", modalData);
        setActiveModal(modalData);
      },
      hideModal() {
        console.log("hideModal called");
        setActiveModal(null);
      },
    }),
    [],
  );

  console.log("Current activeModal:", activeModal);

  return (
    <ModalsDispatchContext.Provider value={actions}>
      <ModalsStateContext.Provider value={activeModal}>{props.children}</ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
}
