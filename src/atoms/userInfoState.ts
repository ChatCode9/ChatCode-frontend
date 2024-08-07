import { atom } from 'recoil';

export const nickNameState = atom({
  key: 'nickName',
  default: '',
});

export const tagState = atom<number[]>({
  key: 'selectedTags',
  default: [],
});
export const clickedListState = atom<boolean[]>({
  key: 'clickedListState',
  default: [],
});

export const ContentState = atom<string>({
  key: 'userContent',
  default: '',
});
