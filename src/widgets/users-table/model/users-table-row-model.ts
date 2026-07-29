import type { UserListItem } from '@/entities/user';

export interface UsersTableRowModel {
  user: UserListItem;
  canManage: boolean;
  canDelete: boolean;
}
