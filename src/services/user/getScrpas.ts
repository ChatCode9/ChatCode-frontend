import { Avatars } from '../../types/avatar';
import client from '../client';

// 스크랩 목록 조회
export const getScraps = async ({ id }: Pick<Avatars, 'id'>) => {
  try {
    const response = await client.get(`/avatars/${id}/scraps`);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};

export default getScraps;
