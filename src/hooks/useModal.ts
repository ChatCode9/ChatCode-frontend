import { useState, useCallback, useContext } from 'react';
import { ModalsDispatchContext } from '../context/ModalsContext';

interface ModalPosition {
  top: number;
  left: number;
  confirm1: string;
  confirm2: string;
  postId: number;
}

const useModal = () => {
  const dispatch = useContext(ModalsDispatchContext);
  const [position, setPosition] = useState<ModalPosition | null>(null);

  const createModalData = (rect: DOMRect, id: number) => ({
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    confirm1: '전환',
    confirm2: '취소',
    postId: id,
  });

  const showModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, status: string, id: number) => {
      event.stopPropagation();
      if (status === 'wait') {
        const rect = event.currentTarget.getBoundingClientRect();
        const newPosition = createModalData(rect, id);

        console.log(newPosition.top, ' / ', newPosition.left);

        setPosition(newPosition);

        if (dispatch) {
          dispatch.showModal({
            title: '해결 완료로 전환 하시겠습니까?',
            message: '"해결 완료"로 전환 시 "해결 대기"로 재 전환은 불가 합니다.',
            ...newPosition,
          });
        }
      } else {
        console.log('이미 해결된 질문입니다');
      }
    },
    [dispatch],
  );

  return {
    position,
    showModal,
    setPosition,
  };
};

export default useModal;
