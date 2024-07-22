import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postNewArticle } from '../../services/post/postNewArticle';
import { useToastControl } from '../useToastControl';

// 게시글 생성
export const usePostArticleMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToastControl();

  const { mutate: createMutate } = useMutation({
    mutationFn: postNewArticle,
    onSuccess: () => {
      console.log('성공!');
      navigate(-1);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      }, 100);
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  return { createMutate };
};
