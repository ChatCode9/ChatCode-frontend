import { useMutation } from '@tanstack/react-query';

import { putUserContent } from '../../services/user/putUserContent';

export const usePutUserContent = () => {
  const mutation = useMutation({
    mutationFn: putUserContent,
    onSuccess: () => {
      console.log('content api success');
    },
    onError: (error) => {
      console.error('content api error:', error);
    },
  });

  return mutation;
};
