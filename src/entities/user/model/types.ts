import type { UserRole, UserQuery, UsersQuery } from '@/shared/api/graphql/graphql';

export type { UserRole, CreateUserInput, UpdateProfileInput } from '@/shared/api/graphql/graphql';

export type CurrentUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type UserListItem = UsersQuery['users'][number];

export type UpdateUserData = NonNullable<UserQuery['user']>;
