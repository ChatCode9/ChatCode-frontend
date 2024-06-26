import { useQuery } from '@tanstack/react-query';
import { fetchGetTags } from '../services/http';

export const useGetTags = () => {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: fetchGetTags,
  });
  return query;
};
