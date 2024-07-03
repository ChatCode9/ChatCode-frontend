import { useQuery } from '@tanstack/react-query';

import { getTags } from '../../services/user/getTags';

export const useTagsQuery = () => {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
  return query;
};
