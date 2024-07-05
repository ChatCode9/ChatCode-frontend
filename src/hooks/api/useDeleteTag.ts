import { useMutation } from '@tanstack/react-query';

import { deleteTag } from '../../services/admin/deleteTag';

export const useDeleteTag = () => {
  const mutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      console.log('태그 삭제 성공');
      // 성공 후 추가 작업을 수행할 수 있습니다.
    },
  });

  return mutation;
};
