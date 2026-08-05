import { useQuery } from '@apollo/client/react';

import { PROFILE_QUERY } from './profile.query';

export function useProfile(userId: string) {
  return useQuery(PROFILE_QUERY, {
    variables: { userId },
  });
}
