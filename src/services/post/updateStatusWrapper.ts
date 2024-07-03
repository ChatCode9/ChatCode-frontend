import client from '../client';

interface UpdateStatusData {
  status: string;
}

// 글 해결 대기에서 완료로 업데이트
const postStatus = async (postId: number, data: UpdateStatusData) => {
  try {
    const response = await client.post(`/articles/${postId}/status`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStatusWrapper = ({ postId, data }: { postId: number; data: UpdateStatusData }) => {
  return postStatus(postId, data);
};
