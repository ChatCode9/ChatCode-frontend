import { useQuery } from '@tanstack/react-query';

import { getPost } from '../../services/post/getPost';

interface Props {
  postId: number;
}

export const usePostQuery = ({ postId }: Props) => {
  const {
    data: postData,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery({
    queryKey: ['postData', postId],
    queryFn: () => getPost(postId),
  });

  return { postData, isLoadingPost, isErrorPost };
};
