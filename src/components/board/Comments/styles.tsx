import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  margin-top: 80px;
  padding-left: 20px;
  padding-right: 20px;

  .inner {
    width: 1024px;
    margin: 0 auto;
  }
`;

export const Header = styled.header`
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-weight: 700;

    h2 {
      font-size: 18px;
      color: #000;
    }

    .count {
      font-size: 17px;
      color: #8d8ba7;
    }
  }
`;
