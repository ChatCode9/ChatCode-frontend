import styled from 'styled-components';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface Props {
  filters: string[];
}

function BoardController({ filters }: Props) {
  return (
    <Container>
      <Wrapper>
        <WriteButton>
          <span>POST</span>
          <CreateOutlinedIcon className="icon" />
        </WriteButton>
        <ReloadButton>
          <RefreshOutlinedIcon />
        </ReloadButton>
      </Wrapper>

      <Wrapper>
        <FilterList>
          {filters.map((filter) => (
            <FilterItem key={filter}>
              <div className="dot" />
              <div>{filter}</div>
            </FilterItem>
          ))}
        </FilterList>

        <SearchForm>
          <SearchInput type="text" placeholder="find in Q&A" />
          <SearchButton type="submit">
            <SearchOutlinedIcon />
          </SearchButton>
        </SearchForm>
      </Wrapper>
    </Container>
  );
}

export default BoardController;

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WriteButton = styled.button`
  width: 85px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #6d758f;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 6px;
  }

  .icon {
    font-size: 20px;
    margin-bottom: 4px;
    margin-left: 5px;
  }
`;

const ReloadButton = styled.button`
  border: none;
  outline: none;
  margin-left: 10px;
  background-color: transparent;
`;

const FilterList = styled.ul`
  display: flex;

  li + li {
    margin-left: 20px;
  }
`;

const FilterItem = styled.li`
  display: flex;
  align-items: center;
  color: #8d8ba7;
  font-weight: 700;
  cursor: pointer;

  .dot {
    width: 10px;
    height: 10px;
    background-color: #8d8ba7;
    border-radius: 100%;
    margin-right: 5px;
    margin-bottom: 3px;
  }
`;

const SearchForm = styled.form`
  position: relative;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 20px;
  width: 240px;
  border-bottom: 1px solid #e1e4ed;
  font-size: 15px;
  padding-bottom: 8px;
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  right: 0;
  color: #e1e4ed;
`;
