import { useMutation } from '@tanstack/react-query';

import { postFile } from '../../services/image/postFile';

const usePostFileMutation = () => {
  const { mutateAsync: postImgMutate, error: mutationError } = useMutation({
    mutationFn: postFile,
    onSuccess: () => {
      console.log('이미지 s3에 보내기 성공!');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  return { postImgMutate, mutationError };
};

export default usePostFileMutation;
