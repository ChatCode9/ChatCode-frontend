import client from './client.ts';

// 카테고리 목록 호출
export const getCategories = async () => {
  const response = await client.get(`categories`);
  console.log(response.data);
  return response.data;
}
