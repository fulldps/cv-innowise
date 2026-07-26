import { useQuery } from '@apollo/client/react';

import { USERS_QUERY } from '@/entities/user/api/user.queries';
import { UserListItem } from '../model';

interface UseUsersListResult {
  data: UserListItem[];
  loading: boolean;
  error: Error | null;
}

export const useUsersList = (): UseUsersListResult => {
  const { data, loading, error } = useQuery(USERS_QUERY);

  return {
    data: data?.users ?? [],
    loading,
    error: error ?? null,
  };
};
