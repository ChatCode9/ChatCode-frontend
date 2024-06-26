import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px;

  .inner {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 100px;
    height: 100px;
    border: 2px solid #8d8ba7;
    border-radius: 10px;
    font-size: 70px;
    color: #8d8ba7;
    outline: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-like,
  .btn-dislike {
    background: none;
    border: 1px solid #8d8ba7;
    cursor: pointer;
    //font-size: 24px;
    margin: 0 10px;
  }

  .btn-reverse {
    background-color: #8d8ba7;
    border: 1px solid #8d8ba7;
    color: #fff;      
  }
`;
