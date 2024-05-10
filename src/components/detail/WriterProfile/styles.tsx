import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #bcbacd;
    border-radius: 15px;
    width: 478px;
    padding: 35px 0;
  }

  .avatar {
    border-radius: 100%;
    overflow: hidden;
  }

  .info {
    margin-left: 20px;

    .writer {
      font-size: 18px;
      font-weight: 700;
    }

    .tags {
      margin-top: 5px;
      display: flex;

      li {
        background-color: #d9d9d9;
        padding: 5px;
        font-size: 12px;
      }

      li + li {
        margin-left: 10px;
      }
    }

    .desc {
      margin-top: 8px;
    }
  }
`;
