import styled from 'styled-components';

import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import PaginationRounded from '../components/board/Pagination';
import Divider from '../components/board/Divider';
import FreeBoardList from '../components/board/FreeBoardList';
import Navbar from '../components/header/NavBar';
import useFilters from '../hooks/useFilters';
import { FILTERS_CATEGORIES_LIST } from '../constants/filters';

function FreeBoardPage() {
  const { filters, setFilters } = useFilters(FILTERS_CATEGORIES_LIST.FREE);

  return (
    <Container>
      <Navbar />
      <PickFlow />
      <BoardInfo
        title="자유 게시판"
        description="욕설 및 정치적 발언은 어쩌고 저쩌고 이용 수칙을 따르지 않을 경우 제재할 수 있습니다."
      />
      <BoardController filters={filters} setFilters={setFilters} />
      <Divider />
      <FreeBoardList filters={filters} />
      <PaginationRounded />
    </Container>
  );
}

export default FreeBoardPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
