import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../../services/user/getUserInfo';

export const useInfoQuery = () => {
  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  return query;
};
