import { useMutation } from '@tanstack/react-query';

import { postTag } from '../../services/admin/postTag';

export const usePostTagMutation = () => {
  const mutation = useMutation({
    mutationFn: postTag,
    onSuccess: () => {
      console.log('성공');
    },
  });
  return mutation;
};
