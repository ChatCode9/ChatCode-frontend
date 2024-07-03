import client from '../client';

// 게시글 수정
export const putArticle = async (
  postId: number,
  updateArticle: {
    category: string | undefined;
    title: string;
    tagList: string[];
    contentText: string;
  },
) => {
  try {
    const response = await client.put(`/articles/${postId}`, updateArticle);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
