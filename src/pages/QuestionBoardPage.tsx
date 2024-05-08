import styled from 'styled-components';
import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import Divider from '../components/board/Divider';
import QuestionBoardList from '../components/board/QuestionBoardList';
import PaginationRounded from '../components/board/Pagination';

const filters = ['전체', '최신순', '인기순', '해결 대기', '해결 완료'];

function QuestionBoardPage() {
  return (
    <Container>
      <PickFlow />
      <BoardInfo
        title="Q&A 게시판"
        description="질문은 정중하게~~ 어쩌고 저쩌고 이용 수칙을 따르지 않을 경우 제재할 수 있습니다."
      />
      <BoardController filters={filters} />
      <Divider />
      <QuestionBoardList />
      <PaginationRounded />
    </Container>
  );
}

export default QuestionBoardPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
