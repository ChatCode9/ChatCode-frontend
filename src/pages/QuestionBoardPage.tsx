import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/header/NavBar';
import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import Divider from '../components/board/Divider';
import QuestionBoardList from '../components/board/QuestionBoardList';
import { Filters } from '../types/filter';
import { INITIAL_FILTERS } from '../constants/filters';

// const category = ['전체', '최신순', '인기순', '해결 대기', '해결 완료'];

function QuestionBoardPage() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  useEffect(() => {
    console.log('filters 상태 변경:', filters);
    // 여기에 상태 변화에 따른 추가 작업을 수행할 수 있습니다.
  }, [filters]);

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
      <QuestionBoardList filters={filters} />
    </Container>
  );
}

export default QuestionBoardPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
