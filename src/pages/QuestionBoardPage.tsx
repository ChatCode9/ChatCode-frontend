import styled from 'styled-components';

import Navbar from '../components/header/NavBar';
import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import Divider from '../components/board/Divider';
import QuestionBoardList from '../components/board/QuestionBoardList';
import useFilters from '../hooks/useFilters';
import { FILTERS_CATEGORIES_LIST } from '../constants/filters';

function QuestionBoardPage() {
  const { filters, setFilters } = useFilters(FILTERS_CATEGORIES_LIST.QUESTION);

  return (
    <Container>
      <Navbar />
      <PickFlow />
      <BoardInfo
        title="Q&A 게시판"
        description="질문은 정중하게~~ 어쩌고 저쩌고 이용 수칙을 따르지 않을 경우 제재할 수 있습니다."
      />
      <BoardController filters={filters} setFilters={setFilters} />
      <Divider />
      <QuestionBoardList filters={filters} setFilters={setFilters} />
    </Container>
  );
}

export default QuestionBoardPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
