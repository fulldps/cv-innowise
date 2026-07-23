import { UsersTable } from '@/widgets/users-table';

import { useUsersListPage } from '../model/use-users-list';

export function UsersList() {
  const { rows } = useUsersListPage();

  return (
    <div className="flex flex-col gap-6 bg-primary-foreground">
      {/* UsersToolbar появится в следующей ветке */}

      <UsersTable rows={rows} />
    </div>
  );
}