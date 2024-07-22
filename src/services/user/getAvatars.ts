import client from '../client';

// 아바타 전체 정보 불러오기
export const getAvatars = async () => {
  const response = await client.get(`/avatars`);
  console.log(response.data);
  return response.data;
};
