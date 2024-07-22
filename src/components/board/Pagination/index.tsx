import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { Filters } from '../../../types/filter';

interface Props {
  pagesCount: number;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function PaginationRounded({ pagesCount, setFilters }: Props) {
  const [page, setPage] = useState<number>(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      pageInfo: {
        ...prevFilters.pageInfo,
        page: Number(value - 1),
      },
    }));
  };

  return (
    <Wrapper>
      <Stack spacing={2}>
        <Pagination count={pagesCount} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
      </Stack>
    </Wrapper>
  );
}

export default PaginationRounded;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;
