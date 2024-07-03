import { atom } from 'recoil';

export const toastMessageState = atom<string>({
  key: 'toastMessagesState',
  default: '',
});

export const isToastVisibleState = atom<boolean>({
  key: 'isToastVisibleState',
  default: false,
});
