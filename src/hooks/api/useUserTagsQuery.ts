import { useQuery } from '@tanstack/react-query';

import { getUserTags } from '../../services/user/getUserTags';

export const useUserTagsQuery = () => {
  const query = useQuery({
    queryKey: ['userTags'],
    queryFn: getUserTags,
  });

  return query;
};
