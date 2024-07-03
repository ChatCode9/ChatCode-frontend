import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postNewArticle } from '../../services/post/postNewArticle';
import { useToastControl } from '../useToastControl';

// 게시글 생성
export const usePostArticle = () => {
  const navigate = useNavigate();
  const { showToast } = useToastControl();

  const { mutate: createMutate } = useMutation({
    mutationFn: postNewArticle,
    onSuccess: () => {
      console.log('성공!');
      navigate('/board/question');
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  return { createMutate };
};
