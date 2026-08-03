export const USERS_SORT_FIELDS = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  department: 'department',
  position: 'position',
} as const;

export type UsersSortField = (typeof USERS_SORT_FIELDS)[keyof typeof USERS_SORT_FIELDS];

export type SortDirection = 'asc' | 'desc';

export interface UsersSort {
  field: UsersSortField;
  direction: SortDirection;
}
