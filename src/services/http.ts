import client from './client';

export const createNewArticle = async (newArticle: { title: string; contentText: string }) => {
  try {
    const response = await client.post('articles', newArticle);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const postFile = async (file: { base64File: string; targetId: number }) => {
  try {
    const response = await client.post('files', file);

    console.log(response.data);
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const fetchUserNickname = async () => {
  try {
    const response = await client.get('avatars/me');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
