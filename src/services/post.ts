import client from './client';
import { Question } from '../responseType/postType.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Filters } from '../requestType/postType.ts';

const fetchPosts = async (filters: Filters): Promise<Question> => {
  const { search, categories, sortby, pageInfo } = filters;
  let { status } = filters;
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

  const res = await client.get(`board/question?${queryParams}`);
  // 응답전체 데이터
  // console.log(res);
  console.log(res.data);
  return res.data;
}

// Search 데이터를 활용한 Question Post List 데이터 호출
export const PostsQuery = (filters: Filters) => {
  return useQuery<Question, Error>({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
  });
};

// 북마크 업데이트
export const updateBookmark = async (data : {postId : number; bookmark : boolean}) => {
  try {
    const response = await client.post('bookmark', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 글 블라인드 업데이트
export const updateBlind = async (data : {postId : number; blind : boolean}) => {
  try {
    const response = await client.post('blind', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}