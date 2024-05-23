import styled from 'styled-components';

export const Wrapper = styled.header`
  position: relative;

  .more {
    position: absolute;
    right: -10px;
    top: -10px;
  }
`;

export const Title = styled.h1`
  width: 80%;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.2;
`;

export const Sub = styled.div`
  font-size: 13px;

  span + span {
    &:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 1px;
      background-color: #000;
      opacity: 0.5;
      border-radius: 100%;
      padding: 1px;
      margin: 0px 5px 3px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    font-size: 25px;
  }

  .ico-share {
    transform: scaleX(-1);
  }
`;
