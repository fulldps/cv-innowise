'use client';

import { useState } from 'react';

import { useCvsList } from '@/entities/cv/api/use-cvs-list';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { UserCvsTableRowModel } from '@/widgets/user-cvs-table';

import { USER_CVS_SORT_FIELDS, type UserCvsSortField } from './user-cvs-sort-fields';

import type { UserCv } from '@/entities/cv/model/types';

export function useUserCvsListPage(userId: string) {
  const { cvs, loading, error } = useCvsList();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCv, setEditingCv] = useState<UserCv | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCvId, setDeletingCvId] = useState<string | null>(null);
  const [deletingCvName, setDeletingCvName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(USER_CVS_SORT_FIELDS.name, 'asc');

  const cvsList = (cvs ?? []).filter((cv): cv is UserCv => cv !== null && cv.user?.id === userId);

  const filteredCvs = !normalizedSearch
    ? cvsList
    : cvsList.filter(
        (cv) =>
          cv.name.toLowerCase().includes(normalizedSearch) ||
          cv.description?.toLowerCase().includes(normalizedSearch),
      );

  const sortValueGetters = {
    [USER_CVS_SORT_FIELDS.name]: (cv: UserCv) => cv.name,
  } satisfies Record<UserCvsSortField, (cv: UserCv) => string>;

  const sortedCvs = [...filteredCvs];

  const getValue = sortValueGetters[sort.field];

  sortedCvs.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: UserCvsTableRowModel[] = sortedCvs.map((cv) => ({
    cv,

    canEdit: currentUser.role === USER_ROLE.Admin || currentUser.id === userId,

    canDelete: currentUser.role === USER_ROLE.Admin || currentUser.id === userId,
  }));

  return {
    rows,

    loading: loading,
    error: error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin || currentUser.id === userId,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingCv,
    setEditingCv,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingCvId,
    setDeletingCvId,

    deletingCvName,
    setDeletingCvName,
  };
}
