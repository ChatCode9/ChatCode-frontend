import axios from 'axios';
import client from '../client';

export interface putUserProps {
  id: number;
  content?: string;
  picture?: string;
}

//유저 정보 수정하는 API
export const putUser = async ({ id, content, picture }: putUserProps) => {
  try {
    const response = await client.put(`/avatars/${id}`, { content, picture });
    console.log('서버 응답', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
};
