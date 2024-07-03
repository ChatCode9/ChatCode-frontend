import { AxiosError } from 'axios';
import client from '../client';

// 이미지를 S3에 업로드
export const postFile = async (file: { base64File: string; targetId: number }) => {
  try {
    const response = await client.post('/files', file);

    console.log('사진 응답', response.data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 요청 오류 시 오류 메시지와 서버의 응답 데이터 로그 출력
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Error:', error);
    }
    throw error;
  }
};
