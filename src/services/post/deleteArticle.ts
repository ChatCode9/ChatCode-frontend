import client from '../client';

// 게시글 삭제
export const deleteArticle = async (postId: number) => {
  try {
    const response = await client.delete(`/articles/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
