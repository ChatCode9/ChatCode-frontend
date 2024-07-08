import client from '../client';
import { Question } from '../../types/question';
import { RequestFilters } from '../../types/filter';

export const getPosts = async (filters: RequestFilters): Promise<Question> => {
  const { search, categories, sortBy, pageInfo } = filters;
  let { status } = filters;
  // if (status === '' || status === 'wait,finish' || status === 'finish,wait') {
  //   // 해결대기, 해결완료 모두 선택 했거나 또는 모두 선택하지 않는다면 API 전송시 데이터를 채워준다
  //   status = 'emptyString';
  // }

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

  // const pageInfoParams = {
  //   page: pageInfo.page,
  //   size: pageInfo.size,
  // };

  // queryParams.append('pageInfo', JSON.stringify(pageInfo));

  const res = await client.get(`/articles`, {
    params: queryParams,
  });

  // 응답전체 데이터
  // console.log(res);
  console.log(res.data);
  return res.data;
};
