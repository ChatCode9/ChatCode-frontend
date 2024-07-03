import client from '../client';

export const postUserTags = async (UserTags: { id: number }[]) => {
  try {
    const response = await client.post('/avatars/interest-tags', UserTags);
    console.log('PostUserTags', response.data);
    return response.data;
  } catch (error) {
    console.log(' PostUserTags error:', error);
    throw error;
  }
};
