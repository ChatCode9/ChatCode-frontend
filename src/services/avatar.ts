import client from './client';

// 아바타 정보 불러오기
export const getAvatar = async (userId: number) => {
  const response = await client.get(`avatars/${userId}`);
  console.log(response.data);
  return response.data;
}