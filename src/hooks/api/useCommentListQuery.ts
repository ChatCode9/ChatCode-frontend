import { useQuery } from '@tanstack/react-query';

import { getCommentList } from '../../services/getCommentList';

interface Props {
  postId: number;
}

export const useCommentListQuery = ({ postId }: Props) => {
  const {
    data: commentListData,
    isLoading: isLoadingComment,
    isError: isErrorComment,
  } = useQuery({
    queryKey: ['commentListData', postId],
    queryFn: () => getCommentList(postId),
  });

  return { commentListData, isLoadingComment, isErrorComment };
};
