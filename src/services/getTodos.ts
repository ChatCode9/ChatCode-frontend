import client from './client';

export const getTodos = async () => {
  try {
    const response = await client.get('https://jsonplaceholder.typicode.com/todos/1');

    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
