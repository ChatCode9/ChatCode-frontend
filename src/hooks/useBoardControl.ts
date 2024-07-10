import { useState, ChangeEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { FILTERS_POST_LIST } from '../constants/filters';
import { BoardControlType, PostStatus, SortByStatus } from '../types/filter';

const useBoardControl = ({ filters, setFilters }: BoardControlType) => {
  const [selectedValue, setSelectedValue] = useState<string>('10');

  console.log(filters);
  // 데이터 재호출
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  // 필터 (오름차순, 내림차순)
  const handleFilterChange = (newSortby: SortByStatus) => {
    // console.log('handleFilterChange');
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: newSortby,
    }));
  };

  // 필터 (해결대기, 해결완료)
  const handleStatusChange = (newStatus: PostStatus) => {
    // console.log(`isPendingBefore : ${isPending}`)
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: newStatus,
    }));
  };

  // 전체(검색 조건 리셋)
  const handleResetFilters = () => {
    // console.log('handleResetFilters');
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: FILTERS_POST_LIST.ALL,
    }));
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

  return {
    selectedValue,
    handleRefetch,
    handleResetFilters,
    handleFilterChange,
    handleStatusChange,
    handleSelectChange,
  };
};

export default useBoardControl;
