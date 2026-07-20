import { mockUsers } from '../model/mock-users';
import { UserRole } from '../model/types';

interface UseCurrentUserResult {
  id: string;
  role: UserRole;
}

export const useCurrentUser = (): UseCurrentUserResult => {
  return {
    id: mockUsers[0].id,
    role: mockUsers[0].role,
  };
};
