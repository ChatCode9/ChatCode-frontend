import { useQuery } from '@tanstack/react-query';

import { getAvatar } from '../../services/user/getAvatar';
import { AvatarData } from '../../types/avatar';

interface Props {
  postId: number;
}

export const useAvatarQuery = ({ postId }: Props) => {
  const {
    data: avatarData,
    isLoading: isLoadingAvatar,
    isError: isErrorAvatar,
  } = useQuery<AvatarData>({
    queryKey: ['avatarData', postId],
    queryFn: () => getAvatar(postId),
  });

  return { avatarData, isLoadingAvatar, isErrorAvatar };
};
