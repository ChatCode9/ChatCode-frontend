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
