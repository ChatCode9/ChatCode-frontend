import styled from 'styled-components';

interface Props {
  title: string;
  description: string;
}

function BoardInfo({ title, description }: Props) {
  return (
    <Container>
      <div className="title">{title}</div>
      <p>{description}</p>
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
    font-weight: 700;
  }
`;
