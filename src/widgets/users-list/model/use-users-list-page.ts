'use client';

import { useState } from 'react';

import { useCurrentUser, UserListItem, UserRole, useUsersList } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import type { UsersTableRowModel } from '@/widgets/users-table';

import { useUsersSort } from './use-users-sort';
import { USERS_SORT_FIELDS, UsersSortField } from './sort';

export function useUsersListPage() {
  const users = useUsersList();
  const currentUser = useCurrentUser();

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useUsersSort();

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

  const sortValueGetters = {
    [USERS_SORT_FIELDS.department]: (user: UserListItem) => user.department_name ?? '',
  } satisfies Record<UsersSortField, (user: UserListItem) => string>;

  const sortedUsers = [...filteredUsers];

  if (sort.direction) {
    const getValue = sortValueGetters[sort.field];

    sortedUsers.sort((a, b) => {
      const result = getValue(a).localeCompare(getValue(b));

      return sort.direction === 'asc' ? result : -result;
    });
  }

  const rows: UsersTableRowModel[] = sortedUsers.map((user) => ({
    user,
    canManage: currentUser.role === UserRole.Admin || currentUser.id === user.id,
  }));

  return {
    rows,

    searchValue,
    setSearchValue,

    showCreateButton: currentUser.role === UserRole.Admin,

    sort,
    toggleSort,
  };
}
