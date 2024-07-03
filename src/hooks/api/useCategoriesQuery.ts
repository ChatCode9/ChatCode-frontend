import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../../services/getCategories';

export const useCategoriesQuery = () => {
  const {
    data: tagListData,
    isLoading: isLoadingTagListData,
    isError: isErrorTagListData,
  } = useQuery({
    queryKey: ['tagListData'],
    queryFn: getCategories,
  });

  return { tagListData, isLoadingTagListData, isErrorTagListData };
};
