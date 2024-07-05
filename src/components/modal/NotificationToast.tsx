import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { toastMessageState, isToastVisibleState } from '../../atoms/toastState';

interface NotificationToastProps {
  onClose: () => void;
}

export const NotificationToast = ({ onClose }: NotificationToastProps) => {
  const toastMessage = useRecoilValue(toastMessageState);
  const isToastVisible = useRecoilValue(isToastVisibleState);
  const toastRef = useRef<HTMLDivElement>(null);

  // 모달창 띄워지면 1.3초후 꺼지도록 설정
  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(onClose, 1300); // 1.3초 후에 모달을 자동으로 닫기
      return () => clearTimeout(timer);
    }
  }, [isToastVisible, onClose]);

  // 모달창 띄어진 상태에서 다른 영역 클릭시 바로 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toastRef.current && !toastRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isToastVisible) return null;

  return (
    <ToastOverlay>
      <ToastContent ref={toastRef}>{toastMessage}</ToastContent>
    </ToastOverlay>
  );
};

const ToastOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ToastContent = styled.div`
  background-color: #5a5a5a;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
`;
