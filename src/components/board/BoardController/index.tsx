import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BoardControlType } from '../../../types/filter';
import FilterItem from './FilterItem';
import useBoardControl from '../../../hooks/useBoardControl';
import { FILTERS_POST_LIST, FILTERS_SORT_LIST } from '../../../constants/filters';
import { FormEvent, useRef } from 'react';

function BoardController({ filters, setFilters }: BoardControlType) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    selectedValue,
    handleRefetch,
    handleResetFilters,
    handleFilterChange,
    handleStatusChange,
    handleSelectChange,
  } = useBoardControl({ filters, setFilters });

  // 게시글 글쓰기 클릭 할 때
  const handlePostWriteClick = () => {
    navigate(`/write`);
  };

  const handleSearchPosts = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = inputRef.current?.value || '';
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  };

  return (
    <Container>
      <Wrapper>
        <WriteButton onClick={handlePostWriteClick}>
          <span>POST</span>
          <CreateOutlinedIcon className="icon" />
        </WriteButton>
        <ReloadButton>
          <RefreshOutlinedIcon onClick={handleRefetch} />
        </ReloadButton>
      </Wrapper>

      <Wrapper>
        <CategoryList>
          <FilterItem isActive={filters.status === FILTERS_POST_LIST.ALL} onClick={handleResetFilters}>
            전체
          </FilterItem>
          <FilterItem
            isActive={filters.sortBy === FILTERS_SORT_LIST.LATEST}
            onClick={() => handleFilterChange(FILTERS_SORT_LIST.LATEST)}
          >
            최신순
          </FilterItem>
          <FilterItem
            isActive={filters.sortBy === FILTERS_SORT_LIST.OLDEST}
            onClick={() => handleFilterChange(FILTERS_SORT_LIST.OLDEST)}
          >
            오래된순
          </FilterItem>
          <FilterItem
            isActive={filters.status === FILTERS_POST_LIST.WAIT}
            onClick={() => handleStatusChange(FILTERS_POST_LIST.WAIT)}
          >
            해결 대기
          </FilterItem>
          <FilterItem
            isActive={filters.status === FILTERS_POST_LIST.FINISH}
            onClick={() => handleStatusChange(FILTERS_POST_LIST.FINISH)}
          >
            해결 완료
          </FilterItem>
        </CategoryList>
        <SelectWrapper>
          <Select value={selectedValue} onChange={handleSelectChange}>
            <option value="15">15개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </Select>
          <Icon />
        </SelectWrapper>
        <SearchForm onSubmit={handleSearchPosts}>
          <SearchInput ref={inputRef} type="text" placeholder="find in Q&A" />
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

  .extra {
    margin-left: 10px;
  }
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

const CategoryList = styled.ul`
  display: flex;

  li + li {
    margin-left: 20px;
  }
`;

const SearchForm = styled.form`
  position: relative;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 3px;
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

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 130px; // 원하는 크기로 변경하세요
  margin-left: 10px;
`;

const Select = styled.select`
  width: 92%;
  padding: 8px 14px;
  border: 1px solid #8d8ba7;
  border-radius: 10px;
  background-color: white;
  color: #8d8ba7;
  font-weight: bold;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  outline: none;
`;

const Icon = styled(KeyboardArrowDownIcon)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #8d8ba7;
`;
