import { Filters, RequestFilters } from '../types/filter';

// Filters -> RequestFilters 변환 함수
export const transformFilters = (filters: Filters): RequestFilters => {
  return {
    ...filters,
    status: filters.status.join(','), // 배열을 문자열로 변환
  };
};
