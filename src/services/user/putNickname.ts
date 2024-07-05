import client from '../client';

// 닉네임 수정하는 API
export const putNickname = async (nickname: { nickname: string }) => {
  try {
    const response = await client.put('/avatars/9', nickname);
    console.log('PutNickname response:', response.data);
    return response.data;
  } catch (error) {
    console.log('PutNickname error:', error);
    throw error;
  }
};
