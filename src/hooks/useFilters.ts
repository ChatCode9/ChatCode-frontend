import { useEffect, useState } from 'react';
import { INITIAL_FREE_FILTERS, INITIAL_QUESTION_FILTERS } from '../constants/filters';
import { Filters } from '../types/filter';

const useFilters = (categories: string) => {
  const [filters, setFilters] = useState<Filters>(
    categories === 'question' ? INITIAL_QUESTION_FILTERS : INITIAL_FREE_FILTERS,
  );

  useEffect(() => {
    console.log('filters 상태 변경:', filters);
    // 여기에 상태 변화에 따른 추가 작업을 수행할 수 있습니다.
  }, [filters]);

  return { filters, setFilters };
};

export default useFilters;
