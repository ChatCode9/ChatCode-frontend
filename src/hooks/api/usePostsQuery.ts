import { useQuery } from '@tanstack/react-query';

import { Filters } from '../../types/filter';
import { Question } from '../../types/question';
import { transformFilters } from '../../utils/transformFilters';
import { getPosts } from '../../services/post/getPosts';

// Search 데이터를 활용한 Question Post List 데이터 호출
export const usePostsQuery = (filters: Filters) => {
  const requestFilters = transformFilters(filters);

  return useQuery<Question, Error>({
    queryKey: ['posts', filters],
    queryFn: () => getPosts(requestFilters),
    // 사용자가 다른 창이나 탭으로 이동했다가 다시 돌아왔을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnWindowFocus: false,
    // 인터넷 연결이 끊어졌다가 다시 연결되었을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnMount: false,
  });
};
