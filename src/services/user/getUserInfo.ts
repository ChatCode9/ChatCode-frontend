import client from '../client';

// 유저 정보 불러오는 API(이름,내용,사진)
export const getUserInfo = async () => {
  try {
    const response = await client.get('/avatars/9');
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
