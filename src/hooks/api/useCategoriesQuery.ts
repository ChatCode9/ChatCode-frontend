import { useQuery } from '@tanstack/react-query';

import { getTags } from '../../services/user/getTags';
import { TagsDataType } from '../../types/tags';

export const useCategoriesQuery = () => {
  const {
    data: tagListData,
    isLoading: isLoadingTagListData,
    isError: isErrorTagListData,
  } = useQuery<TagsDataType>({
    queryKey: ['tagListData'],
    queryFn: getTags,
  });

  return { tagListData, isLoadingTagListData, isErrorTagListData };
};
