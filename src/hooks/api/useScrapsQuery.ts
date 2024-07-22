import { useQuery } from '@tanstack/react-query';

import { Avatars } from '../../types/avatar';
import getScraps from '../../services/user/getScrpas';
import { ScrapData } from '../../types/scrap';

export const useScrapsQuery = ({ id }: Pick<Avatars, 'id'>) => {
  const { data: scrapsData } = useQuery<ScrapData>({
    queryKey: ['scraps'],
    queryFn: () => getScraps({ id }),
  });

  return { scrapsData };
};
