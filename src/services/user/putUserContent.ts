import client from '../client';

//유저 content 보내는 API
export const putUserContent = async (Content: { content: string }) => {
  try {
    const response = await client.put('/avatars/9', Content);
    // console.log('PutContent response:', response.data);
    return response.data;
  } catch (error) {
    console.log('PutContent error:', error);
    throw error;
  }
};
