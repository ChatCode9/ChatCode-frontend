import API from './api.ts';

interface InfoType {
  usernickname: string;
  usertags: string[];
}

export const userInfo = async () => {
  try {
    const { data } = await API.get('/avatars');
    return data;
  } catch (error) {
    console.log('에러남', error);
    return null;
  }
};
