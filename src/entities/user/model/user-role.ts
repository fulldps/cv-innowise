import type { UserRole } from '@/shared/api/graphql/graphql';

export const USER_ROLE = {
  Admin: 'Admin',
  Employee: 'Employee',
} as const satisfies Record<string, UserRole>;

export const USER_ROLES = Object.values(USER_ROLE);

export const USER_ROLE_OPTIONS = USER_ROLES.map((role) => ({
  id: role,
  name: role,
}));
