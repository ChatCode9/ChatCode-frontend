import client from './client';

// 게시판 댓글 리스트 불러오기
export const getCommentList = async (postId: number) => {
  const response = await client.get(`comments/${postId}`);
  console.log(response.data);
  return response.data;
}