import client from '../client';

//유저의 관심 태그 목록 불러오는 API
export const getUserTags = async () => {
  try {
    const response = await client.get('/avatars/9/interest-tags');
    console.log('Usertags', response.data);
    return response.data;
  } catch (error) {
    console.log(' GetTags API error:', error);
    throw error;
  }
};
