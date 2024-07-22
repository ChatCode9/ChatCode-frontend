import { useQuery } from '@tanstack/react-query';

import { getUserTags } from '../../services/user/getUserTags';
import { TagsDataType } from '../../types/tags';

export const useUserTagsQuery = () => {
  const query = useQuery<TagsDataType>({
    queryKey: ['userTags'],
    queryFn: getUserTags,
  });

  return query;
};
