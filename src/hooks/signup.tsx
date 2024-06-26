import { useMutation } from '@tanstack/react-query';
import { fetchPutNickname } from '../services/http';
import { fetchPostUserTags } from '../services/http';

export const usePutNickname = () => {
  const mutation = useMutation({
    mutationFn: fetchPutNickname,
    onSuccess: () => {
      console.log('닉네임 변경 성공');
    },
    onError: (error) => {
      console.error('닉네임 변경 오류:', error);
    },
  });

  return mutation;
};

export const usePostTags = () => {
  const mutation = useMutation({
    mutationFn: fetchPostUserTags,
    onSuccess: () => {
      console.log('태그 보내는 훅');
    },
    onError: (error) => {
      console.error('태그 보내는 훅 오류:', error);
    },
  });

  return mutation;
};
