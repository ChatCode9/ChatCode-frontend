import client from '../client';

// 글 블라인드 업데이트
export const postBlind = async (data: { postId: number; blind: boolean }) => {
  try {
    const response = await client.post('/blind', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
