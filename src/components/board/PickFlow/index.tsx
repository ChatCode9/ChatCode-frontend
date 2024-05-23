import styled from 'styled-components';

const BESTS = [
  {
    id: 1,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 2,
    category: '자유',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 3,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 4,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 5,
    category: 'TOPIC',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 6,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
];

function PickFlow() {
  return (
    <Container>
      <Wrapper>
        <Title>WEEKLY BEST</Title>
        <BestList>
          {BESTS.map((best) => (
            <BestItem key={best.id}>
              <div className="category">{best.category}</div>
              <p>{best.title}</p>
            </BestItem>
          ))}
        </BestList>
      </Wrapper>

      <Wrapper>
        <Title>MONTHLY BEST</Title>
        <BestList>
          {BESTS.map((best) => (
            <BestItem key={best.id}>
              <div className="category">{best.category}</div>
              <p>{best.title}</p>
            </BestItem>
          ))}
        </BestList>
      </Wrapper>
    </Container>
  );
}

export default PickFlow;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  max-width: 500px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
`;

const BestList = styled.ul`
  padding-left: 10px;
  padding-right: 10px;

  li + li {
    margin-top: 10px;
  }
`;

const BestItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  .category {
    width: 65px;
    height: 25px;
    background-color: #8d8ba7;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  p {
    flex: 1;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
