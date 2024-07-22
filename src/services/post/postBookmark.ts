import client from '../client';

// 북마크 업데이트
export const postBookmark = async (data: { postId: number }) => {
  try {
    const response = await client.post(`/articles/${data.postId}/scraps`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
