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

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingUserFullName, setDeletingUserFullName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useUsersSort();

  const filteredUsers = !normalizedSearch
    ? users.data
    : users.data.filter((user) => {
        const fullName = user.profile.full_name?.toLowerCase() ?? '';

        return fullName.includes(normalizedSearch);
      });

  const sortValueGetters = {
    [USERS_SORT_FIELDS.firstName]: (user: UserListItem) => user.profile.first_name ?? '',

    [USERS_SORT_FIELDS.lastName]: (user: UserListItem) => user.profile.last_name ?? '',

    [USERS_SORT_FIELDS.email]: (user: UserListItem) => user.email,

    [USERS_SORT_FIELDS.department]: (user: UserListItem) => user.department_name ?? '',

    [USERS_SORT_FIELDS.position]: (user: UserListItem) => user.position_name ?? '',
  } satisfies Record<UsersSortField, (user: UserListItem) => string>;

  const sortedUsers = [...filteredUsers];

  if (sort.direction) {
    const getValue = sortValueGetters[sort.field];

    sortedUsers.sort((a, b) => {
      const result = getValue(a).localeCompare(getValue(b));

      return sort.direction === 'asc' ? result : -result;
    });
  }

  const currentUserIndex = sortedUsers.findIndex((user) => user.id === currentUser.id);

  if (currentUserIndex > 0) {
    const [user] = sortedUsers.splice(currentUserIndex, 1);

    sortedUsers.unshift(user);
  }

  const rows: UsersTableRowModel[] = sortedUsers.map((user) => ({
    user,
    canEdit: currentUser.role === UserRole.Admin || currentUser.id === user.id,
    canDelete: currentUser.role === UserRole.Admin && currentUser.id !== user.id,
  }));

  return {
    rows,

    loading: users.loading,
    error: users.error,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === UserRole.Admin,
    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingUserId,
    setEditingUserId,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingUserId,
    setDeletingUserId,
    deletingUserFullName,
    setDeletingUserFullName,
  };
}
