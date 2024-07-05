import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Filters } from '../../../types/filter';
import FilterItem from './FilterItem';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  extra?: JSX.Element;
}

function BoardController({ filters, setFilters, extra }: Props) {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('전체');
  const [isAscending, setIsAscending] = useState<boolean | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedValue, setSelectedValue] = useState('10');
  const [inputValue, setInputValue] = useState('');

  console.log(filters);
  console.log(extra);
  // 데이터 재호출
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  // 필터 (오름차순, 내림차순)
  const handleFilterChange = (newSortby: string) => {
    // console.log('handleFilterChange');
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: newSortby,
    }));
    if (newSortby === 'latest') {
      setIsAscending(true);
    } else if (newSortby === 'earliest') {
      setIsAscending(false);
    }
    setActiveButton(newSortby);
  };

  // 필터 (해결대기, 해결완료)
  const handleStatusChange = (status: string) => {
    // console.log(`isPendingBefore : ${isPending}`)
    if (status === 'wait') {
      setIsPending(!isPending);
    } else if (status === 'finish') {
      setIsCompleted(!isCompleted);
    }
    setActiveButton(status);
  };

  // 해결대기와 해결완료 데이터 변경시 setFilters 에 데이터 반영
  useEffect(() => {
    let newStaus;
    if (isPending && isCompleted) {
      newStaus = ['wait', 'finish'];
    } else if (!isPending && isCompleted) {
      newStaus = ['finish'];
    } else if (isPending && !isCompleted) {
      newStaus = ['wait'];
    } else {
      newStaus = ['wait', 'finish'];
    }
    // console.log(`newStaus : ${newStaus}`)
    setFilters((prevFilters) => {
      return { ...prevFilters, status: newStaus };
    });
  }, [isPending, isCompleted, setFilters]);

  // 전체(검색 조건 리셋)
  const handleResetFilters = () => {
    // console.log('handleResetFilters');
    const initialFilters = {
      search: '',
      categories: 'question',
      sortBy: 'latest',
      status: ['wait', 'finish'],
      pageInfo: {
        page: 1,
        size: 15,
        offset: 10,
      },
    };
    setFilters(initialFilters);
    setActiveButton('전체');
    setIsAscending(null);
    setIsPending(false);
    setIsCompleted(false);
    setInputValue('');
  };

  // 1페이지 몇개 볼 것인지 선택
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      pageInfo: {
        ...prevFilters.pageInfo,
        size: Number(event.target.value),
      },
    }));
  };

  // 검색창에 입력되는 값
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: event.target.value,
    }));
  };

  // 게시글 글쓰기 클릭 할 때
  const handlePostWriteClick = () => {
    navigate(`/write`);
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
          <FilterItem isActive={activeButton === '전체'} onClick={handleResetFilters}>
            전체
          </FilterItem>
          <FilterItem isActive={isAscending === false} onClick={() => handleFilterChange('earliest')}>
            오름차순
          </FilterItem>
          <FilterItem isActive={isAscending === true} onClick={() => handleFilterChange('latest')}>
            내림차순
          </FilterItem>
          <FilterItem isActive={isPending} onClick={() => handleStatusChange('wait')}>
            해결 대기
          </FilterItem>
          <FilterItem isActive={isCompleted} onClick={() => handleStatusChange('finish')}>
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
        <SearchForm>
          <SearchInput value={inputValue} onChange={handleInputChange} type="text" placeholder="find in Q&A" />
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
