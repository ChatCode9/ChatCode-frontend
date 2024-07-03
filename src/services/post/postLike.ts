import client from '../client';

interface UpdateLikeData {
  isLike: boolean;
}

interface UpdateLikeProps {
  data: UpdateLikeData;
  postId: number;
}

// 게시글 좋아요 업데이트
export const postLike = async ({ data, postId }: UpdateLikeProps) => {
  try {
    const response = await client.post(`/articles/${postId}/like`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
