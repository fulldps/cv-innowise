import { mockUsers } from '../model/mock-users';
import type { User } from '../model/types';

interface UseUsersListResult {
  data: User[];
  loading: boolean;
  error: Error | null;
}

export const useUsersList = (): UseUsersListResult => {
  return {
    data: mockUsers,
    loading: false,
    error: null,
  };
};
