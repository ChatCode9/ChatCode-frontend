import styled from 'styled-components';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
}

function Block({ onClick, id }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event, id);
  };

  return (
    <Container>
      <p>블라인드 처리 된 글입니다.</p>
      <button onClick={handleClick}>클릭시 블라인드가 해제됩니다.</button>
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
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //z-index: 1000;

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(69, 64, 64, 0.25); /* 밝게 보이도록 배경색 추가 */
  border-radius: 10px; /* 둥근 테두리 */
  //box-shadow: 0 6px 20px -15px #000; /* 그림자 효과 */
  //border-width: 1px 1px 0 0; /* 입체감 흰색 테두리 */
  border-color: #9a9eae;
  border-style: solid;

  p {
    font-size: 25px;
    font-weight: bold;
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
