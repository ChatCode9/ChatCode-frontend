import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putUser } from '../../services/user/putUser';

export const usePutUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: userMutate } = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      console.log('content api success');
    },
    onError: (error) => {
      console.error('content api error:', error);
    },
  });

  return { userMutate };
};
