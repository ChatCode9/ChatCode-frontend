import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useToastControl } from '../useToastControl';
import { putArticle } from '../../services/post/putArticle';

interface ArticleProps {
  postId: number;
  updateArticle: {
    category: string | undefined;
    title: string;
    tagList: string[];
    contentText: string;
  };
}

// 게시글 수정
export const usePutArticle = () => {
  const navigate = useNavigate();
  const { showToast } = useToastControl();

  const { mutate: updateMutate } = useMutation({
    mutationFn: (data: ArticleProps) => putArticle(data.postId, data.updateArticle),
    onSuccess: () => {
      console.log('성공!');
      navigate('/board/question');
    },
    onError: () => {
      showToast('서버 통신 실패');
    },
  });

  return { updateMutate };
};
