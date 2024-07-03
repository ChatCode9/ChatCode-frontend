import { useQuery } from '@tanstack/react-query';

import { getAvatar } from '../../services/user/getAvatar';

interface Props {
  postId: number;
}

export const useAvatarQuery = ({ postId }: Props) => {
  const {
    data: avatarData,
    isLoading: isLoadingAvatar,
    isError: isErrorAvatar,
  } = useQuery({
    queryKey: ['avatarData', postId],
    queryFn: () => getAvatar(postId),
  });

  return { avatarData, isLoadingAvatar, isErrorAvatar };
};
