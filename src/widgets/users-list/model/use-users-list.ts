'use client';

import { useState } from 'react';

import { useCurrentUser, UserRole, useUsersList } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import type { UsersTableRowModel } from '@/widgets/users-table';

export function useUsersListPage() {
  const users = useUsersList();
  const currentUser = useCurrentUser();

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const filteredUsers = !normalizedSearch
    ? users.data
    : users.data.filter((user) => {
        const firstName = user.profile.first_name?.toLowerCase() ?? '';
        const lastName = user.profile.last_name?.toLowerCase() ?? '';
        const email = user.email.toLowerCase();

        return (
          firstName.includes(normalizedSearch) ||
          lastName.includes(normalizedSearch) ||
          email.includes(normalizedSearch)
        );
      });

  const rows: UsersTableRowModel[] = filteredUsers.map((user) => ({
    id: user.id,
    user,
    canManage: currentUser.role === UserRole.Admin || currentUser.id === user.id,
  }));

  return {
    rows,

    searchValue,
    setSearchValue,

    showCreateButton: currentUser.role === UserRole.Admin,
  };
}
