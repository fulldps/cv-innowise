import type { User } from '@/entities/user';

export interface UsersTableRowModel {
  id: string;
  user: User;
  canManage: boolean;
}
