import { useMutation } from '@tanstack/react-query';

import { putNickname } from '../../services/user/putNickname';

export const usePutNicknameMutation = () => {
  const mutation = useMutation({
    mutationFn: putNickname,
    onSuccess: () => {
      console.log('닉네임 변경 성공');
    },
    onError: (error) => {
      console.error('닉네임 변경 오류:', error);
    },
  });

  return mutation;
};
