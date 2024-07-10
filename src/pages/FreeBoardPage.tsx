import { useState } from 'react';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import PickFlow from '../components/board/PickFlow';
import BoardInfo from '../components/board/BoardInfo';
import BoardController from '../components/board/BoardController';
import PaginationRounded from '../components/board/Pagination';
import Divider from '../components/board/Divider';
import FreeBoardList from '../components/board/FreeBoardList';
import { Filters } from '../types/filter';

import Navbar from '../components/header/NavBar';
import { INITIAL_FILTERS } from '../constants/filters';


// const filters = ['전체', '최신순', '인기순'];

function FreeBoardPage() {


  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  return (
    <Container>
      <Navbar />
      <PickFlow />
      <BoardInfo
        title="자유 게시판"
        description="욕설 및 정치적 발언은 어쩌고 저쩌고 이용 수칙을 따르지 않을 경우 제재할 수 있습니다."
      />
      <BoardController
        filters={filters}
        setFilters={setFilters}
        extra={
          <Select
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            size="small"
            value={15}
            onClick={() => {}}
          >
            <MenuItem value={15}>15개씩 보기</MenuItem>
            <MenuItem value={30}>30개씩 보기</MenuItem>
            <MenuItem value={50}>50개씩 보기</MenuItem>
            <MenuItem value={100}>100개씩 보기</MenuItem>
          </Select>
        }
      />
      <Divider />
      <FreeBoardList />
      <PaginationRounded />
    </Container>
  );
}

export default FreeBoardPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
