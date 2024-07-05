import client from '../client';

//admin으로 태그 추가 하기
export const postTag = async (interest_tag: { name: string }[]) => {
  try {
    const response = await client.post('/admin/interest-tags', interest_tag);
    console.log(response.data);
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
