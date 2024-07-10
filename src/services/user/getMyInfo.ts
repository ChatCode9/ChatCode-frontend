import client from '../client';

// 내 정보 불러오는 API(이름,내용,사진)
export const getMyInfo = async () => {
  try {
    const response = await client.get('/avatars/me');
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
