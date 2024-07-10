import { useQuery } from '@tanstack/react-query';

import { getMyInfo } from '../../services/user/getMyInfo';

export const useMyInfoQuery = () => {
  const query = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  });
  return query;
};
