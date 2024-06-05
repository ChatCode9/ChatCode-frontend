import client from './client';
import { Question } from '../responseType/postType.ts';
import { useQuery } from '@tanstack/react-query';
import { Filters } from '../requestType/postType.ts';

const fetchPosts = async (filters: Filters): Promise<Question> => {
  const { search, categories, sortby, pageInfo } = filters;
  let { status } = filters;
  // console.log('status:',status);
  if(status.length == 0){
    // 해결대기, 해결완료 모두 선택 했거나 또는 모두 선택하지 않는다면 API 전송시 데이터를 채워준다
    status = ['wait', 'finish'];
  }
  // console.log('status After:',status);
  const queryParams = new URLSearchParams({
    search,
    categories,
    sortby,
    status: status.join(','), // Assuming the API expects a comma-separated string for status
    page: pageInfo.page.toString(),
    size: pageInfo.size.toString(),
  }).toString();

  const res = await client.get(`http://localhost:3000/board/question?${queryParams}`);
  // 응답전체 데이터
  // console.log(res);
  // 백엔드에서 보내주는 데이터
  console.log(res.data);
  return res.data;
}

export const PostsQuery = (filters: Filters) => {
  return useQuery<Question, Error>({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
  });
};