import styled from 'styled-components';

export const Container = styled.div`
  width: 856px;
  margin: 0 auto;
  padding-top: 100px;

  .tags {
    display: flex;
    color: #586bae;
    margin-bottom: 20px;

    li + li {
      margin-left: 5px;
    }
  }
`;
