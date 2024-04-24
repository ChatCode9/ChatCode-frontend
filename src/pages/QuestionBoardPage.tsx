import styled from 'styled-components';
import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import Divider from '../components/board/Divider';
import QuestionBoardList from '../components/board/QuestionBoardList';

const filters = ['전체', '최신순', '인기순', '해결 대기', '해결 완료'];

function QuestionBoardPage() {
  return (
    <Container>
      <PickFlow />
      <BoardInfo />
      <BoardController filters={filters} />
      <Divider />
      <QuestionBoardList />
    </Container>
  );
}

export default QuestionBoardPage;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;
