import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .inner {
    width: 395px;
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 128px;
    height: 128px;
    border: 2px solid #8d8ba7;
    font-size: 70px;
    color: #8d8ba7;
    outline: none;
    background-color: transparent;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-dislike {
    transform: scaleX(-1);
  }

  .btn-reverse {
    background-color: #8d8ba7;
    border: 1px solid #8d8ba7;
    color: #fff;
  }
`;
