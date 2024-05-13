import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { ModalsStateContext, ModalsDispatchContext } from '../context/ModalsContext';

export const SolveModal = () => {
  const Modals = useContext(ModalsStateContext); // Modals 상태를 가져옴
  const dispatch = useContext(ModalsDispatchContext);

  console.log(Modals);
  if (!Modals) {
    return null;
  }
  const handleClickOk = () => {
    if (dispatch) {
      dispatch.hideModal();
    }
  };
  return (
    <Container>
      <ModalBox>
        <CloseBox>
          <CloseBtn onClick={handleClickOk}>
            <CloseIcon fontSize="large" color="inherit" />
          </CloseBtn>
        </CloseBox>

        <ContentBox>
          <DescBox>
            <h3>{Modals?.title}</h3>
            <p>{Modals?.message}</p>
          </DescBox>
          {/* Todo 확인 버튼 누르면 전환 되도록 */}
          <BtnBox>
            <button>확인</button>
            <button onClick={handleClickOk}>취소</button>
          </BtnBox>
        </ContentBox>
      </ModalBox>
    </Container>
  );
};

const Container = styled.div`
  width: 764px;
  height: 297px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
const ModalBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: #5d5a88;
`;
const CloseBox = styled.div`
  height: 20%;
  width: 100%;
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  top: 20px;
  left: 680px;
  background-color: #5d5a88;
  border: none;
  color: #ffffff;
`;
const ContentBox = styled.div`
  width: 100%;
  height: 80%;
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
    font-size: 35px;
    font-weight: bold;
  }
  p {
    font-size: 15px;
  }
`;
const BtnBox = styled.div`
  display: flex;
  width: 228px;
  height: 30%;
  margin-bottom: 15px;

  button {
    width: 75px;
    height: 41px;
    border: 2px solid #ffffff;
    border-radius: 10px;
    background-color: #5d5a88;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    margin: 20px;
  }
`;
