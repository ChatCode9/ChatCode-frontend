import axios from 'axios';
import client from '../client';

//S3 URL을 서버에 전송
export const putImage = async (picture: { picture: string }) => {
  try {
    const response = await client.put('/avatars/9', picture);
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
