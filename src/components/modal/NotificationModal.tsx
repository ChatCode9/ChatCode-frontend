import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface NotificationModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const NotificationModal = ({ message, isVisible, onClose } : NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달창 띄워지면 1.3초후 꺼지도록 설정
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 1300); // 1.3초 후에 모달을 자동으로 닫기
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // 모달창 띄어진 상태에서 다른 영역 클릭시 바로 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        {message}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
    background-color: #5a5a5a;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: white;
`;