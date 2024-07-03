import client from '../client';

//admin으로 태그 수정 하기
export const putTag = async (interest_tag: { id: number; name: string }[]) => {
  try {
    const response = await client.put('/admin/interest-tags', interest_tag);
    console.log('put api', response.data);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
