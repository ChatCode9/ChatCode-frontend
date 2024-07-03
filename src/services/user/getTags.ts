import client from '../client';

// 전체 태그 불러오는 API
export const getTags = async () => {
  try {
    const response = await client.get('/avatars/interest-tags');
    console.log('tags', response.data);
    return response.data;
  } catch (error) {
    console.log(' GetTags API error:', error);
    throw error;
  }
};
