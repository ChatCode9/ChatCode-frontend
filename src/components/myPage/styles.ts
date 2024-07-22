import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  button {
    width: 83px;
    height: 37px;
    border-radius: 10px;
    background-color: #8d8ba7;
    border: none;
    color: #ffffff;
    font-size: 12px;
    &:hover {
      background-color: #6d758f;
      color: #ffffff;
      border: none;
    }
  }
`;

export const ProfileImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
    height: 100%;
    background-color: #6c6b76;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;

export const UserInfoNickname = styled.div`
  height: 32px;
  margin-bottom: 10px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px 0 100px;
  width: 30%;
  height: 150px;
  font-weight: 600;
  input {
    height: 32px;

    border: none;
    outline: none;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    width: 100%;
  }
  span {
    margin-right: 10px;
    background-color: #d9d9d9;
    width: auto;
    height: auto;
    padding: 5px;
    border-radius: 6px;
  }
  p {
    margin-top: 10px;
  }
  input {
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-top: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
