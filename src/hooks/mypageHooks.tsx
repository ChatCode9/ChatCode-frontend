import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchPutContent } from '../services/http';
import { fetchUserInfo } from '../services/http';
import { fetchGetUserTags } from '../services/http';

export const useGetInfo = () => {
  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  return query;
};

export const usePutContent = () => {
  const mutation = useMutation({
    mutationFn: fetchPutContent,
    onSuccess: () => {
      console.log('content api success');
    },
    onError: (error) => {
      console.error('content api error:', error);
    },
  });

  return mutation;
};

export const useGetUserTags = () => {
  const query = useQuery({
    queryKey: ['userTags'],
    queryFn: fetchGetUserTags,
  });

  return query;
};
