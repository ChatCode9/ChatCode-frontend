import client from '../client';

export const deleteTag = async (tagId: number) => {
  try {
    const response = await client.delete(`/admin/interest-tags/${tagId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
