import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';
import { ModalsStateContext, ModalsDispatchContext } from '../context/ModalsContext';

interface SolveModalProps {
  onConfirm: () => void;
}

export const SolveModal = ({ onConfirm }: SolveModalProps) => {
  const Modals = useContext(ModalsStateContext); // Modals 상태를 가져옴
  const dispatch = useContext(ModalsDispatchContext);

  useEffect(() => {
    console.log("Modal Data Updated:", Modals);
  }, [Modals]);

  if (!Modals) {
    return null;
  }

  const handleClickSend = () => {
    if (dispatch) {
      dispatch.hideModal();
      onConfirm();
    }
  }

  return (
    <Container $top={Modals.top} $left={Modals.left}>
      <ModalBox>
        <ContentBox>
          <DescBox>
            <h3>{Modals?.title}</h3>
            <p>{Modals?.message}</p>
          </DescBox>
          {/* Todo 확인 버튼 누르면 전환 되도록 */}
          <BtnBox>
            <button onClick={handleClickSend}>{Modals?.confirm1}</button>
            <button onClick={dispatch?.hideModal}>{Modals?.confirm2}</button>
          </BtnBox>
        </ContentBox>
        <CloseBox>
          <CloseBtn onClick={dispatch?.hideModal}>
            <CloseIcon fontSize="large" color="inherit" />
          </CloseBtn>
        </CloseBox>
      </ModalBox>
    </Container>
  );
};

interface ContainerProps {
  $top: number;
  $left: number;
}

const Container = styled.div<ContainerProps>`
    position: absolute;
    top: ${(props) => props.$top-60}px;
    left: ${(props) => props.$left}px;
    width: 650px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(93, 90, 136, 0.7);
    backdrop-filter: blur(3px);
    border-radius: 30px;
    z-index: 30;
`;

const ModalBox = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: column;
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

const ContentBox = styled.div`
  width: 100%;
  //height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DescBox = styled.div`
  margin-top: 15px;
  height: 70%;
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

const BtnBox = styled.div`
  display: flex;
  width: 228px;
  height: 30px;
  margin-bottom: 15px;

  button {
    width: 75px;
    height: 30px;
    border: 2px solid #ffffff;
    border-radius: 10px;
    background-color: transparent;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    margin: 20px;
  }
`;
