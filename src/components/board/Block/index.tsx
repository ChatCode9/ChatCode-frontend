import styled from 'styled-components';

function Block() {
  return (
    <Container>
      <p>블라인드 처리 된 글입니다.</p>
      <button>클릭시 블라인드가 해제됩니다.</button>
    </Container>
  );
}

export default Block;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #8d8ba7;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  p {
    font-size: 20px;
  }

  button {
    margin-top: 5px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }
`;
