import { useQuery } from '@tanstack/react-query';

import { getAvatar } from '../../services/user/getAvatar';
import { AvatarData, AvatarName } from '../../types/avatar';

export const useAvatarQuery = ({ name }: AvatarName) => {
  const {
    data: avatarData,
    isLoading: isLoadingAvatar,
    isError: isErrorAvatar,
  } = useQuery<AvatarData>({
    queryKey: ['avatarData', name],
    queryFn: () => getAvatar({ name }),
  });

  return { avatarData, isLoadingAvatar, isErrorAvatar };
};
