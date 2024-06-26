import client from './client';

//admin으로 태그 추가 하기
export const fetchPostTag = async (interest_tag: { name: string }[]) => {
  try {
    const response = await client.post('admin/interest-tags', interest_tag);
    console.log(response.data);
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
//admin으로 태그 수정 하기
export const fetchPutTag = async (interest_tag: { id: number; name: string }[]) => {
  try {
    const response = await client.put('admin/interest-tags', interest_tag);
    console.log('put api', response.data);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};

export const fetchDeleteTag = async (tagId: number) => {
  try {
    const response = await client.delete(`admin/interest-tags/${tagId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};
