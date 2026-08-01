import type { UserQuery, UsersQuery } from '@/shared/api/graphql/graphql';

export type { UserRole, CreateUserInput, UpdateProfileInput } from '@/shared/api/graphql/graphql';


export type UserListItem = UsersQuery['users'][number];

export type User = NonNullable<UserQuery['user']>;
