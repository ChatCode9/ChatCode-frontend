import { createContext, useMemo, useState } from 'react';

interface ModalData {
  title: string;
  message: string;
  confirm1: string;
  confirm2: string;
  postId: number;
}

export const ModalsStateContext = createContext<ModalData | null>(null);

export const ModalsDispatchContext = createContext<{
  showModal(ModalData: ModalData): void;
  hideModal(): void;
} | null>(null);

export function ModalProvider(props: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const actions = useMemo(
    () => ({
      showModal(ModalData: ModalData) {
        setActiveModal(ModalData);
      },
      hideModal() {
        setActiveModal(null);
      },
    }),
    [],
  );
  return (
    <ModalsDispatchContext.Provider value={actions}>
      <ModalsStateContext.Provider value={activeModal}>{props.children}</ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
}
