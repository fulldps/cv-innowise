import type { UsersQuery } from '@/shared/api/graphql/graphql';

export type UserListItem = UsersQuery['users'][number];
