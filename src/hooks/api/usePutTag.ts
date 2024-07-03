import { useMutation } from '@tanstack/react-query';

import { putTag } from '../../services/admin/putTag';

export const usePutTag = () => {
  const mutation = useMutation({
    mutationFn: putTag,
    onSuccess: () => {
      console.log('태그 수정 성공');
    },
  });
  return mutation;
};
