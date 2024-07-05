import { useMutation } from '@tanstack/react-query';

import { postUserTags } from '../../services/user/postUserTags';

export const usePostTags = () => {
  const mutation = useMutation({
    mutationFn: postUserTags,
    onSuccess: () => {
      console.log('태그 보내는 훅');
    },
    onError: (error) => {
      console.error('태그 보내는 훅 오류:', error);
    },
  });

  return mutation;
};
