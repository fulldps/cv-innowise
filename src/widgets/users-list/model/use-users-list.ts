import { useCurrentUser, UserRole, useUsersList } from '@/entities/user';

import type { UsersTableRowModel } from '@/widgets/users-table';

export function useUsersListPage() {
  const users = useUsersList();
  const currentUser = useCurrentUser();

  const rows: UsersTableRowModel[] = users.data.map((user) => ({
    id: user.id,
    user,
    canManage: currentUser.role === UserRole.Admin || currentUser.id === user.id,
  }));

  return {
    rows,
  };
}
