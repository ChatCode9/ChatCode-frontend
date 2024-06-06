import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

function PaginationRounded() {
  return (
    <Wrapper>
      <Stack spacing={2}>
        <Pagination count={10}
                    variant="outlined"
                    shape="rounded"/>
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
