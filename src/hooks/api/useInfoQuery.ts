import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../../services/user/getUserInfo';

interface Props {
  id: number;
}

export const useInfoQuery = ({ id }: Props) => {
  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo({ id }),
  });

  return query;
};
