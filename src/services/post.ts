import client from './client';
import { Question } from '../responseType/postType.ts';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async (): Promise<Question> => {
  const res = await client.get('http://localhost:3000/board/question');
  // 응답전체 데이터
  // console.log(res);
  // 백엔드에서 보내주는 데이터
  // console.log(res.data);
  return res.data;
}

export const PostsQuery = () => {
  return useQuery<Question, Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};