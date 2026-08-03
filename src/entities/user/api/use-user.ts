import { useQuery } from '@apollo/client/react';

import { USER_QUERY } from './user.queries';

export function useUser(userId?: string) {
  return useQuery(USER_QUERY, {
    variables: {
      userId: userId ?? '',
    },

    skip: !userId,
  });
}
