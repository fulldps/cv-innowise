import type { UserListItem } from '@/entities/user';

export interface UsersTableRowModel {
  user: UserListItem;
  canEdit: boolean;
  canDelete: boolean;
}
