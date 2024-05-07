import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

function PaginationRounded() {
  return (
    <Wrapper>
      <Pagination count={1} shape="rounded" />
    </Wrapper>
  );
}

export default PaginationRounded;

const Wrapper = styled.div`
  margin-top: 20px;
`;
