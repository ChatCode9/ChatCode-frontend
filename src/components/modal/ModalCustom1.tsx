import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ModalCustom1: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <ModalWrapper ref={modalRef}>
        <DescBox>
          {children}
        </DescBox>
        <ButtonContainer>
          <Button onClick={onConfirm}>확인</Button>
          <Button onClick={onClose}>취소</Button>
          <CloseBox>
            <CloseBtn onClick={onClose}>
              <CloseIcon fontSize="large" color="inherit" />
            </CloseBtn>
          </CloseBox>
        </ButtonContainer>
      </ModalWrapper>
    </Overlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
  width: 650px;
  height: 200px;
  background: rgba(93, 90, 136, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 75px;
  height: 30px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  background-color: transparent;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseBox = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent; /* 투명 배경 */
  border: none;
  color: #ffffff;
`;

const DescBox = styled.div`
  margin-top: 35px;
  height: 35%;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  align-items: center;
  justify-content: center;  

  h3 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  p {
    font-size: 15px;
  }
`;

export default ModalCustom1;