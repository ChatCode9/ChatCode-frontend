import { AvatarName, AvatarsData } from '../../types/avatar';
import client from '../client';
import { getAvatars } from './getAvatars';

// 아바타 정보 불러오기
export const getAvatar = async ({ name }: AvatarName) => {
  const allAvatar: AvatarsData = await getAvatars();
  const writer = allAvatar.data.find((avatar) => avatar.nickname === name);

  const response = await client.get(`/avatars/${writer?.id}`);
  console.log(response.data);
  return response.data;
};
