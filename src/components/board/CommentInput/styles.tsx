import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;

  textarea {
    resize: none;
    outline: none;
    margin-right: 15px;
  }

  button {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: none;
    outline: none;
    background-color: #6d758f;
    color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
  }
`;
