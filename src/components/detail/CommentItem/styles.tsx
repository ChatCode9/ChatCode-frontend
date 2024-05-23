import styled from 'styled-components';

export const Item = styled.li`
  overflow-wrap: break-word;

  & + li {
    margin-top: 40px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      display: flex;
      align-items: center;
    }

    .avatar {
      margin-right: 5px;
      border-radius: 100%;
    }

    .writer {
      margin-right: 5px;
      font-size: 15px;
      font-weight: 700;
    }

    .timestamp {
      font-size: 13px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 15px;
    }
  }

  .comment {
    margin-top: 15px;
  }
`;
