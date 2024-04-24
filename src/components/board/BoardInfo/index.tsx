import styled from 'styled-components';

function BoardInfo() {
  return (
    <Container>
      <div className="title">Q&A 게시판</div>
      <p>질문은 정중하게~~ 어쩌고 저쩌고 이용 수칙을 따르지 않을 경우 제재할 수 있습니다.</p>
    </Container>
  );
}

export default BoardInfo;

const Container = styled.div`
  max-width: 100%;
  margin-top: 50px;
  padding: 30px;
  border: 1px solid #bcbacd;

  .title {
    margin-bottom: 20px;
  }
`;
