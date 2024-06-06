import styled from 'styled-components';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filters } from '../../../requestType/postType.ts';


interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function BoardController({ filters, setFilters }: Props) {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('전체');
  const [isAscending, setIsAscending] = useState<boolean | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedValue, setSelectedValue] = useState('10');
  const [inputValue, setInputValue] = useState('');

  // 데이터 재호출
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  // 필터
  const handleFilterChange = (newSortby: string) => {
    // console.log('handleFilterChange');
    setFilters(prevFilters => ({
      ...prevFilters,
      sortby: newSortby,
    }));
    if (newSortby === 'latest') {
      setIsAscending(true);
    } else if (newSortby === 'earliest') {
      setIsAscending(false);
    }
    setActiveButton(newSortby);
  };

  const handleStatusChange = (status: string) => {
    // console.log('handleStatusChange');
    setFilters(prevFilters => {
      const newStatus = prevFilters.status.includes(status)
        ? prevFilters.status.filter(s => s !== status)
        : [...prevFilters.status, status];
      return { ...prevFilters, status: newStatus };
    });
    if (status === 'wait') {
      setIsPending(!isPending);
    } else if (status === 'finish') {
      setIsCompleted(!isCompleted);
    }
    setActiveButton(status);
  };

  const handleResetFilters = () => {
    // console.log('handleResetFilters');
    const initialFilters = {
      search: '',
      categories: 'question',
      sortby: 'latest',
      status: ['wait', 'finish'],
      pageInfo: {
        page: 1,
        size: 10,
      },
    };
    setFilters(initialFilters);
    setActiveButton('전체');
    setIsAscending(null);
    setIsPending(false);
    setIsCompleted(false);
    setInputValue('');
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      pageInfo: {
        ...prevFilters.pageInfo,
        size: Number(event.target.value)
      }
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      search: event.target.value
    }));
  };

  // 게시글 클릭 할 때
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
          <RefreshOutlinedIcon onClick={handleRefetch}/>
        </ReloadButton>
      </Wrapper>

      <Wrapper>
        <CategoryList>
          <FilterItem className={activeButton === '전체' ? 'active' : ''} onClick={handleResetFilters}>
            <div className="dot" />
            <div>전체</div>
          </FilterItem>
          <FilterItem
            className={isAscending === false ? 'active' : ''}
            onClick={() => handleFilterChange('earliest')}
          >
            <div className="dot" />
            <div>오름차순</div>
          </FilterItem>
          <FilterItem
            className={isAscending === true ? 'active' : ''}
            onClick={() => handleFilterChange('latest')}
          >
            <div className="dot" />
            <div>내림차순</div>
          </FilterItem>
          {/*<FilterItem onClick={() => handleFilterChange('popularity')}>*/}
          {/*  <div className="dot" />*/}
          {/*  <div>인기순</div>*/}
          {/*</FilterItem>*/}
          <FilterItem
            className={isPending ? 'active' : ''}
            onClick={() => handleStatusChange( 'wait')}
          >
            <div className="dot" />
            <div>해결 대기</div>
          </FilterItem>
          <FilterItem
            className={isCompleted ? 'active' : ''}
            onClick={() => handleStatusChange('finish')}
          >
            <div className="dot" />
            <div>해결 완료</div>
          </FilterItem>
        </CategoryList>
        {/*{extra && <div className="extra">{extra}</div>}*/}
        <SelectWrapper>
          <Select value={selectedValue} onChange={handleSelectChange}>
            <option value="10">10개씩 보기</option>
            <option value="15">15개씩 보기</option>
            <option value="30">30개씩 보기</option>
          </Select>
          <Icon  />
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

  &.active {
      color: #353E5C; /* 활성화된 항목의 텍스트 색상 변경 */
  }

  &.active .dot {
      background-color: #353E5C; /* 활성화된 항목의 점 색상 변경 */
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