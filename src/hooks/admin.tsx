import { fetchPostTag } from '../services/admin';
import { useMutation } from '@tanstack/react-query';
import { fetchPutTag } from '../services/admin';
import { fetchDeleteTag } from '../services/admin';

export const usePostTag = () => {
  const mutation = useMutation({
    mutationFn: fetchPostTag,
    onSuccess: () => {
      console.log('성공');
    },
  });
  return mutation;
};
export const usePutTag = () => {
  const mutation = useMutation({
    mutationFn: fetchPutTag,
    onSuccess: () => {
      console.log('태그 수정 성공');
    },
  });
  return mutation;
};

export const useDeleteTag = () => {
  const mutation = useMutation({
    mutationFn: fetchDeleteTag,
    onSuccess: () => {
      console.log('태그 삭제 성공');
      // 성공 후 추가 작업을 수행할 수 있습니다.
    },
  });

  return mutation;
};
