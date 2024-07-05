import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useToastControl } from '../useToastControl';
import { deleteArticle } from '../../services/post/deleteArticle';

// 게시글 삭제
export const useDeleteArticle = () => {
  const navigate = useNavigate();
  const { showToast } = useToastControl();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      console.log('성공!');
      navigate('/board/question');
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  return { deleteMutate };
};
