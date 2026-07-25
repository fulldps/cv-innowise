'use client';

import { UsersTable } from '@/widgets/users-table';
import { UsersToolbar } from '@/widgets/users-toolbar';

import { useUsersListPage } from '../model/use-users-list';

export function UsersList() {
  const { rows, searchValue, setSearchValue, showCreateButton, sort, toggleSort } =
    useUsersListPage();

  return (
    <div className="flex flex-col gap-2 bg-primary-foreground">
      <UsersToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        canCreateUser={showCreateButton}
      />

      <UsersTable rows={rows} sort={sort} onSortChange={toggleSort} />
    </div>
  );
}
