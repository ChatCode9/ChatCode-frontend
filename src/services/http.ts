import axios, { AxiosError } from 'axios';
import client from './client';



// 이미지를 S3에 업로드
export const postFile = async (file: { base64File: string; targetId: number }) => {
  try {
    const response = await client.post('files', file);

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
//S3 URL을 서버에 전송
export const fetchPutImage = async (picture: { picture: string }) => {
  try {
    const response = await client.put('avatars/9', picture);
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

// 유저 정보 불러오는 API(이름,내용,사진)
export const fetchUserInfo = async () => {
  try {
    const response = await client.get('avatars/9');
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
// 닉네임 수정하는 API
export const fetchPutNickname = async (nickname: { nickname: string }) => {
  try {
    const response = await client.put('avatars/9', nickname);
    console.log('PutNickname response:', response.data);
    return response.data;
  } catch (error) {
    console.log('PutNickname error:', error);
    throw error;
  }
};
// 전체 태그 불러오는 API
export const fetchGetTags = async () => {
  try {
    const response = await client.get('avatars/interest-tags');
    console.log('tags', response.data);
    return response.data;
  } catch (error) {
    console.log(' GetTags API error:', error);
    throw error;
  }
};
//유저의 관심 태그 목록 불러오는 API
export const fetchGetUserTags = async () => {
  try {
    const response = await client.get('avatars/9/interest-tags');
    console.log('Usertags', response.data);
    return response.data;
  } catch (error) {
    console.log(' GetTags API error:', error);
    throw error;
  }
};

export const fetchPostUserTags = async (UserTags: { id: number }[]) => {
  try {
    const response = await client.post('avatars/interest-tags', UserTags);
    console.log('PostUserTags', response.data);
    return response.data;
  } catch (error) {
    console.log(' PostUserTags error:', error);
    throw error;
  }
};
//유저 content 보내는 API
export const fetchPutContent = async (Content: { content: string }) => {
  try {
    const response = await client.put('avatars/9', Content);
    // console.log('PutContent response:', response.data);
    return response.data;
  } catch (error) {
    console.log('PutContent error:', error);
    throw error;
  }
};
