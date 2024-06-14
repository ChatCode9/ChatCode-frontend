import styled from 'styled-components';
import React, { ChangeEvent, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  handelCancelAction: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, value: string) => void;
  commentId: number;
}

function ReplayInput({ handelCancelAction, onClick, commentId } : Props) {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.target.value);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handelCancelAction(event, commentId);
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(event, value);
    setValue('');
  };

  return (
    <Container>
      <VertiBar/>
      <InputBox>
        <Input value={value} onChange={handleChange} />
        <ButtonContainer>
          <CancelButton onClick={(event ) => handleCancel(event)}>
            <span>취소</span>
          </CancelButton>
          <SubmitButton onClick={(event) => handleSubmit(event)}>
            <span>등록</span>
            <ArrowForwardIcon sx={{fontSize : '20px'}}/>
          </SubmitButton>
        </ButtonContainer>
      </InputBox>
    </Container>
  );
}

export default ReplayInput;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
`;

const VertiBar = styled.div`
  width: 5px;
  height: 130px;
  border: 1px solid gray;
  background-color: gray;
  border-radius: 5px;
  margin-left: 25px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: flex-start;  /* Align items to the top */
  width: 100%;
  margin-left: 20px;
  flex-direction: column;
`;

const Input = styled.textarea`
  flex-grow: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  resize: none;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-left: auto;
`;

const CancelButton = styled.button`
    display: flex;
    padding: 7px 12px;
    background-color: #F8FAFF;
    border: 1px solid #E1E4ED;
    border-radius: 6px;
    color: #6D758F;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;

    &:hover {
        background-color: #B1B1B1;
    }

    span {
        margin-top: -3px;
    }
`;


const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  background-color: #6D758F;
  border: 1px solid #E1E4ED;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
      background-color: #717171;
  }

  span {
      margin-right: 5px;
  }
`;
