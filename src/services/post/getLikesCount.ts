import client from '../client';

// 좋아요 갯수 불러오기
export const getLikesCount = async (postId: number) => {
  const response = await client.get(`/articles/${postId}/likesCount`);
  console.log(response.data);
  return response.data;
};
