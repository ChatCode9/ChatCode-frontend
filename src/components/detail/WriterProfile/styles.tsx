import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;

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
    max-width: 350px;

    .writer {
      font-size: 18px;
      font-weight: 700;
    }

    .tags {
      max-width: 100%;
      white-space: wrap;
      overflow: hidden;
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      margin-left: -5px;

      li {
        display: inline-block;
        background-color: #d9d9d9;
        padding: 5px;
        font-size: 12px;
        margin: 5px;
      }
    }

    .desc {
      margin-top: 8px;
    }
  }
`;
