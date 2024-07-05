import client from '../client';

// 북마크 업데이트
export const postBookmark = async (data: { postId: number; bookmark: boolean }) => {
  try {
    const response = await client.post('/bookmark', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
