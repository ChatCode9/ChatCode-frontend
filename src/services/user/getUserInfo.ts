import client from '../client';

interface Props {
  id: number;
}

// 유저 정보 불러오는 API(이름,내용,사진)
export const getUserInfo = async ({ id }: Props) => {
  try {
    const response = await client.get(`/avatars/${id}`);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
