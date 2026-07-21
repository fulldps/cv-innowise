import { mockUsers } from '../model/mock-users';
import type { User } from '../model/types';

export const useCurrentUser = (): User => {
  return mockUsers[0];
};
