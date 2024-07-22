import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      throwOnError: true,
      gcTime: 5 * 60 * 1000,
    },
  },
});
