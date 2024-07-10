import client from '../client';
import { Question } from '../../types/question';
import { RequestFilters } from '../../types/filter';

export const getPosts = async (filters: RequestFilters): Promise<Question> => {
  const { search, categories, sortBy, pageInfo } = filters;
  let { status } = filters;

  console.log(status);

  // console.log('status After:',status);
  const queryParams = new URLSearchParams({
    search,
    category: categories,
    sortBy,
    status,
    page: pageInfo.page.toString(),
    size: pageInfo.size.toString(),
  });

  const res = await client.get(`/articles`, {
    params: queryParams,
  });

  // 응답전체 데이터
  // console.log(res);
  console.log(res.data);
  return res.data;
};
