import client from '../client';

// 게시글 상세 내용 불러오기
export const getPost = async (postId: number) => {
  try {
    const response = await client.get(`/articles/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
