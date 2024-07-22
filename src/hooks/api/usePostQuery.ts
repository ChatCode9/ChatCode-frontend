import { useSuspenseQuery } from '@tanstack/react-query';

import { getPost } from '../../services/post/getPost';
import { PostData } from '../../types/post';

interface Props {
  postId: number;
}

export const usePostQuery = ({ postId }: Props) => {
  const { data: postData } = useSuspenseQuery<PostData>({
    queryKey: ['postData', postId],
    queryFn: () => getPost(postId),
  });

  return { postData };
};
