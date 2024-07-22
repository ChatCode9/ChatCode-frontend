import axios from 'axios';
import client from '../client';

interface putImageProps {
  id: number;
  picture: string;
}

//S3 URL을 서버에 전송
export const putImage = async ({ id, picture }: putImageProps) => {
  try {
    const response = await client.put(`/avatars/${id}`, { picture });
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
