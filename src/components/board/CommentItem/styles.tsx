import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .profile {
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 100%;
      overflow: hidden;
      margin-right: 8px;
    }

    .username {
      font-size: 15px;
      font-weight: 700;
      margin-right: 8px;
    }

    .timestamp {
      position: relative;
      font-size: 12px;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -5px;
        width: 2px;
        height: 2px;
        background-color: #000;
        opacity: 0.5;
        border-radius: 100%;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      background-color: transparent;

      .ico {
        color: #8d8ba7;
        font-size: 20px;
      }

      .count {
        color: #5d5a88;
        margin-left: 5px;
      }
    }

    .btn-dislike .ico {
      transform: scaleX(-1);
    }
  }
`;

export const Content = styled.p`
  margin-top: 15px;
  line-height: 1.3;
`;

export const ToggleBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  margin-top: 20px;
`;
